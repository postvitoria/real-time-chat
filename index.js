const express = require('express');
const { createServer } = require('http'); // Cambiado de 'node:http' a 'http'
const { join } = require('path'); // Cambiado de 'node:path' a 'path'
const { Server } = require('socket.io');
const mysql = require('mysql2/promise'); // Usando mysql2
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function main() {
	// Conexión a la base de datos MySQL
	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'dreikyzdb'
	});

	const app = express();
	const server = createServer(app);
	const io = new Server(server, {
		connectionStateRecovery: {},
	});

	app.use(express.urlencoded({ extended: true }));
	app.use(express.static(__dirname + '/public'));
	app.use(express.json()); // Agregar este middleware para analizar el cuerpo de las solicitudes como JSON

	app.get('/', (req, res) => {
		res.sendFile(join(__dirname, 'public/index.html'));
	});

	app.get('/login', (req, res) => {
		res.sendFile(join(__dirname, 'public/login.html'));
	});

	app.get('/signup', (req, res) => {
		res.sendFile(join(__dirname, 'public/signup.html'));
	});

	app.post('/login', async (req, res) => {
		const { username, password } = req.body;
	
		try {
			// Buscar el usuario en la base de datos por su correo electrónico
			const [rows] = await connection.execute(
				'SELECT * FROM users WHERE username = ?',
				[username]
			);
		
			if (rows.length === 0) {
				res.status(200).json({message: "User or password are incorrect", logged: false});
				return; // Importante: salir de la función después de enviar la respuesta
			}
		
			const user = rows[0];
	
			// Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
			const passwordMatch = await bcrypt.compare(password, user.password);
	
			if (!passwordMatch) {
				res.status(200).json({message: "User or password are incorrect", logged: false});
				return; // Importante: salir de la función después de enviar la respuesta
			}
	
			delete user.password;

			res.status(200).json({message: "Welcome! " + user.username, user: user, logged: true});
		} catch (error) {
			console.error('Error al iniciar sesión:', error);
			res.status(500).json({message: "Internal server error"});
		}
	});

	app.post('/signup', async (req, res) => {
		const { username, email, password } = req.body;
	
		try {
			// Encriptar la contraseña antes de almacenarla en la base de datos
			const hashedPassword = await bcrypt.hash(password, 10);
		
			query = await connection.execute(
				'INSERT INTO users (id, username, email, password) VALUES (UUID(), ?, ?, ?)',
				[username, email, hashedPassword]
			);

			// Verificamos si el usuario se insertó correctamente
			if (query && query[0].affectedRows === 1) {
				res.status(200).json({message: "Se ha creado el usuario satisfactoriamente", logged: true});
			} else {
				console.error('Error al crear el usuario:', query);
				res.status(200).json({message: "Error al crear el usuario", logged: false});
			}

		} catch (error) {
			console.error('Error al encriptar la contraseña:', error);
			res.status(200).json({message: "Error al crear el usuario", logged: false});
		}
	});
  
	io.on('connection', async (socket) => {
		socket.on('requestUserData', async (userId) => {
			try {
				const [rows] = await connection.execute(
					'SELECT id, username, avatar, status, connected FROM users WHERE id = ?',
					[userId]
				);
				
				socket.join(userId);
				socket.join("chatbotai" + userId);

				socket.emit('requestUserData', rows[0]);
			} catch (error) {
				console.log(error);
			}
		});

		socket.on('loadMessages', async (userId, friendId) => {
			try {
				const [rows] = await connection.execute(
					'SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY timestamp ASC LIMIT 100',
					[userId, friendId, friendId, userId]
				);
	
				socket.emit('loadMessages', rows);
			} catch (error) {
				console.log(error);
			}
		});

		socket.on('chat message', async (sender, receiver, content) => {
			const messageId = uuidv4(); // Generar UUID para el mensaje
		
			try {
				// Insertar datos en la tabla
				await connection.execute(
					'INSERT INTO messages (id, sender, receiver, content) VALUES (?, ?, ?, ?)',
					[messageId, sender, receiver, content]
				);
		
				// Emitir datos a través del socket
				//socket.emit("chat receive", messageId, sender, content);
				io.to(receiver).emit("chat receive", messageId, sender, content);
			} catch (e) {
				console.log(e);
				return;
			}
		});

		socket.on('getNonReadedMessages', async (userId) => {	
			try {
				const [rows] = await connection.execute(
					'SELECT * FROM messages WHERE receiver = ? AND read_status = 0 ORDER BY timestamp ASC LIMIT 100',
					[userId]
				);

				socket.emit("getNonReadedMessages", rows);
			} catch (error) {
				console.log(error);
			}
		});

		socket.on('readMessages', async (sender, receiver) => {	
			try {
				query = await connection.execute(
					'UPDATE messages SET read_status = 1 WHERE ((sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)) AND read_status = 0',
					[sender, receiver, receiver, sender]
				);


			} catch (error) {
				console.log(error);
			}
		});

		socket.on('readMessage', async (messageId) => {	
			try {
				query = await connection.execute(
					'UPDATE messages SET read_status = 1 WHERE messages.id = ?',
					[messageId]
				);
			} catch (error) {
				console.log(error);
			}
		});

		socket.on('getUserFriends', async (userId) => {
			try {
				const [rows, fields] = await connection.execute(
					'SELECT id, username, avatar, status, connected FROM users u ' +
					'INNER JOIN friends f ON u.id = f.friend ' +
					'WHERE f.user = (SELECT id FROM users WHERE id = ?)',
				[userId]);

				const [grows] = await connection.execute(
					'SELECT * FROM groups WHERE id = ?', //arreglar esta query
					[userId]
				);

				rows.forEach(friend => {
					socket.join(friend.id);
				});

				grows.forEach(group => {
					socket.join(group.id);
				});

				socket.emit('getUserFriends', rows);
				socket.emit('getUserGroups', grows);
			} catch (error) {
				console.log(error);
			}
		});

		socket.on('deleteFriend', async (userId, friendId) => {
			const [rows] = await connection.execute(
				"DELETE FROM friends WHERE (user = ? AND friend = ?) AND (user = ? AND friend = ?)", //INSERT INTO friends (user, friend) VALUES ('id_usuario', 'id_amigo'), ('id_amigo', 'id_usuario');
				[userId, friendId, friendId, userId]
			);

			socket.emit('deleteFriend', friendId)
		});

		socket.on('ai response', async (senderId, content) => {
			try {
				socket.emit("ai response", content);
			} catch (error) {
				console.error(error);
			}
		});

		socket.on("client connect", async (userId) => {
			try {
				query = await connection.execute(
					'UPDATE users SET connected = 1 WHERE id = ?',
					[userId]
				);

				io.to(userId).emit("client connect", userId);
			} catch (error) {
				console.log(error);
			}
		})

		socket.on("client disconnect", async (userId) => {
			try {
				query = await connection.execute(
					'UPDATE users SET connected = 0 WHERE id = ?',
					[userId]
				);

				io.to(userId).emit("client disconnect", userId);
			} catch (error) {
				console.log(error);
			}
		});

		socket.on("search friend request", async (userId, content) => {
			try {
				const [rows] = await connection.execute(
					"SELECT avatar, username, status FROM users WHERE username LIKE '?%'",
					[content]
				);

				io.to(userId).emit("search friend request", content);
			} catch (error) {
				console.log(error);
			}
		});
	});

	server.listen(8080, () => {
		console.log(`server running at http://localhost:8080`);
	});
}

main();