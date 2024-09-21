const token = JSON.parse(localStorage.getItem('sessionToken'));
const messageInput = document.querySelector(".message-input");
const audio = new Audio('media/audio/notification.mp3');

let lastContact;
let userRequested;
let contactsNotifications = {};
let BloquedContacts = {};

if (token == null) {
	window.location.href = "login"
}

const socket = io({
	auth: {
		serverOffset: 0,
		userData: token.userData
	}
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function openAppWindow() {
	const socialWindow = document.querySelector('.social-window');
	const shopWindow = document.querySelector('.shop-window');
		
	if (socialWindow != null) {
		socialWindow.style.display = 'none';
		document.querySelector(".chat-container").style.display = "block";
	}

	if (shopWindow != null) {
		shopWindow.style.display = 'none';
		document.querySelector(".chat-container").style.display = "block";
	}
}

function moveContactToTop(contactId) {
    const contactList = document.querySelector(".contact-list");
    const contactItem = document.getElementById(contactId);

    if (contactItem && contactList) {
        // Elimina el contacto de su posición actual
        contactList.removeChild(contactItem);

        // Vuelve a insertar el contacto al principio de la lista
        contactList.insertBefore(contactItem, contactList.firstChild);
    }
}

function filterContacts() {
	var searchText = document.querySelector('.input').value.toUpperCase();
	var contacts = document.querySelectorAll('.contact-item');
	contacts.forEach(function(contact) {
		var contactName = contact.querySelector('.contact-name').textContent.toUpperCase();
		if (contactName.indexOf(searchText) > -1) {
			contact.style.display = '';
		} else {
			contact.style.display = 'none';
		}
	});
}

function loadProfile(name, image, connected) {
	const chatName = document.querySelector(".chat-header-name");
	const chatImage = document.querySelector(".chat-header-img");
	const chatTag = document.getElementById("ai-status");

	chatTag.classList.replace("chat-header-status-ai", "chat-header-status");
	chatTag.textContent = "";

	if (connected == 1) {
		chatTag.style.backgroundColor = "rgb(4, 183, 4)";
	} else {
		chatTag.style.backgroundColor = "gray";
	}

	messageInput.placeholder = `Send message to ${name}`;
	chatName.textContent = name;
	chatImage.src = image;
}

function convertirURLaHTML(texto) {
    // Expresión regular para encontrar URLs en el texto
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    // Reemplazar las URLs encontradas por enlaces clickeables
    return texto.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
}

function escapeHTML(html) {
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(html));
	return div.innerHTML;
}

function createMessage(message) {
	const sender = document.getElementById(message.sender);
	const chatBox = document.querySelector(".messages-continer");
	const patron = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=[\w-]{11}|youtu\.be\/[\w-]{11}|twitch\.tv\/[\w-]+)/i;
	let float = "left";
	let bgcolor = "#0093FF";
	let color = "";
	let margin = "0px";

	let messageImg = token.userData.avatar;

	if (sender != null) {
		messageImg = sender.querySelector("img").src;
	}

	// Escapar el contenido del mensaje para evitar la interpretación de HTML
	let messageContent = escapeHTML(message.content);
	messageContent = convertirURLaHTML(messageContent);

	if (sender == null) {
		float = "right";
		margin = "25px";
		bgcolor = "#bbbbbb";
		color = "#1f2126";
	}

	if (message.sender == "system") {
		messageImg = "media/img/default.jpg";
	}

	chatBox.insertAdjacentHTML('beforeend', `
		<div class="message-container" id="${message.id}">
			<img class="message-user-icon" src="${messageImg}" style="float:${float}; margin-right: ${margin};">
			<div class="message" style="float:${float}; background-color:${bgcolor};">
				<span class="message-user-name"></span>
				<p style="color:${color};">${messageContent}</p>
			</div>
		</div>`
	);

	if (patron.test(message.content)) {
		const element = chatBox.lastChild.querySelector(".message");
		element.style.minHeight = "250px";
		element.style.width = "350px";

		let url = extractURL(message.content);
		let urlvideo = "";

		if (url.includes("youtube.com") || url.includes("youtu.be")) {
			let videoId = getYouTubeVideoId(url);
			urlvideo = `https://www.youtube.com/embed/${videoId}`;
		} else if (url.includes("twitch.tv")) {
			let channel = getTwitchChannel(url);
			urlvideo = `https://player.twitch.tv/?channel=${channel}&parent=localhost`;
		}

		if (urlvideo) {
			element.innerHTML += `
				<iframe
					src="${urlvideo}"
					width="350"
					height="250"
					frameborder="0"
				</iframe>
			`;
		}
	}

	chatBox.scrollTop = chatBox.scrollHeight;
}

function extractURL(text) {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	let match = text.match(urlRegex);
	return match ? match[0] : null;
}

function getYouTubeVideoId(url) {
	let videoId = '';
	if (url.includes("youtu.be")) {
		videoId = url.split("youtu.be/")[1];
	} else {
		const urlParams = new URLSearchParams(new URL(url).search);
		videoId = urlParams.get("v");
	}
	return videoId;
}

function getTwitchChannel(url) {
	const parts = url.split("twitch.tv/");
	return parts.length > 1 ? parts[1].split("/")[0] : null;
}

async function blockFriend(id) {
	socket.emit("requestUserData", id);
	const deleteContext = document.querySelector(".small-context-menu");
	const confirmButtom = deleteContext.querySelector(".delete-confirm");
	const cancelButton = deleteContext.querySelector(".delete-cancel");

	await new Promise(r => setTimeout(r, 150));

	deleteContext.style.display = "flex";
	deleteContext.querySelector(".delete-title").innerHTML = `Block ${userRequested.username}?`;
	deleteContext.querySelector("p").innerHTML = `Are you sure you want to block <b>${userRequested.username}</b>? By blocking this user, you will also remove them from your contact list`;

	confirmButtom.addEventListener('click', async function (event) {
		socket.emit('deleteFriend', token.userData.id, id);
		socket.emit('blockFriend', token.userData.id, id);

		// deleteContext.style.animation = "zoomOut 0.35s forwards";
		// await new Promise(r => setTimeout(r, 350));
		deleteContext.style.display = "none";
		deleteContext.style.animation = "zoomIn 0.35s forwards";
	}, {once: true});

	cancelButton.addEventListener('click', async function (event) {
		// deleteContext.style.animation = "zoomOut 0.35s forwards";
		// await new Promise(r => setTimeout(r, 350));
		deleteContext.style.display = "none";
		deleteContext.style.animation = "zoomIn 0.35s forwards";
	}, {once: true});
}

async function deleteFriend(id) {
	socket.emit("requestUserData", id);
	const deleteContext = document.querySelector(".small-context-menu");
	const confirmButtom = deleteContext.querySelector(".delete-confirm");
	const cancelButton = deleteContext.querySelector(".delete-cancel");

	await new Promise(r => setTimeout(r, 150));

	deleteContext.style.display = "flex";
	deleteContext.querySelector(".delete-title").innerHTML = `Delete ${userRequested.username}?`;
	deleteContext.querySelector("p").innerHTML = `Are you sure you want to permanently remove <b>${userRequested.username}</b> from your contacts?`;

	confirmButtom.addEventListener('click', async function (event) {
		socket.emit('deleteFriend', token.userData.id, id);

		// deleteContext.style.animation = "zoomOut 0.35s forwards";
		// await new Promise(r => setTimeout(r, 350));
		deleteContext.style.display = "none";
		deleteContext.style.animation = "zoomIn 0.35s forwards";
	}, {once: true});

	cancelButton.addEventListener('click', async function (event) {
		// deleteContext.style.animation = "zoomOut 0.35s forwards";
		// await new Promise(r => setTimeout(r, 350));
		deleteContext.style.display = "none";
		deleteContext.style.animation = "zoomIn 0.35s forwards";
	}, {once: true});
}

async function viewProfile(id) {
	socket.emit("requestUserData", id);
	const showcase = document.querySelector(".contact-profile-showcase");
	const msgbutton = showcase.querySelector(".showcase-msg");
	const contextMenu = document.getElementById('context-menu-showcase');
	const contextButton = showcase.querySelector(".showcase-options");

	await new Promise(r => setTimeout(r, 150));

	showcase.querySelector(".showcase-username").textContent = userRequested.username;
	showcase.querySelector(".showcase-status").textContent = userRequested.status;
	// Crear un elemento temporal para agregar el texto con saltos de línea
	const descriptionElement = document.createElement('div');
	descriptionElement.textContent = userRequested.description;
	const formattedDescription = descriptionElement.innerHTML.replace(/\n/g, '<br>');

	showcase.querySelector(".showcase-description").innerHTML = convertirURLaHTML(formattedDescription);
	showcase.querySelector("img").src = userRequested.avatar;
	
	const date = new Date(userRequested.created_at);
	// Crear un array con los nombres de los meses
	const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

	// Obtener día, mes y año
	const day = date.getUTCDate(); // Día del mes
	const month = monthNames[date.getUTCMonth()]; // Mes (en palabras)
	const year = date.getUTCFullYear(); // Año

	// Formatear la fecha en el formato deseado
	const formattedDate = `${day} ${month} ${year}`;

	showcase.querySelector(".member-value").textContent = formattedDate;

	showcase.style.background = `linear-gradient(to top, #1f2126 75%, transparent 25%), url('${userRequested.banner}')`;
	showcase.style.backgroundRepeat = "no-repeat";
	showcase.style.backgroundPosition = "top";
	showcase.style.backgroundSize = "contain";  
	showcase.style.display = "flex";

	msgbutton.addEventListener('click', async function (event) {
		// showcase.style.animation = "zoomOut 0.35s forwards";
		// await new Promise(r => setTimeout(r, 350));
		showcase.style.display = "none";
		showcase.style.animation = "zoomIn 0.35s forwards";

		lastContact = id;
		socket.emit('loadUserData', lastContact);
		socket.emit('loadMessages', token.userData.id, lastContact);
	}, { once: true });

	contextButton.addEventListener('click', async function (event) {
		contextMenu.style.display = 'block';
		contextMenu.style.left = `${event.pageX}px`;
		contextMenu.style.top = `${event.pageY}px`;
		
		contextMenu.innerHTML = `
		<li onclick="deleteFriend('${id}'); document.getElementById('context-menu-showcase').style.display = 'none';">Delete friend</li>
		<li onclick="blockFriend('${id}'); document.getElementById('context-menu-showcase').style.display = 'none';">Block</li>`;
	});

	async function closeContextMenu(event) {
		if (showcase.style.display === 'flex' && !showcase.contains(event.target)) {
			// showcase.style.animation = "zoomOut 0.35s forwards";
			// await new Promise(r => setTimeout(r, 350));
			showcase.style.display = "none";
			showcase.style.animation = "zoomIn 0.35s forwards";
			document.removeEventListener('click', closeContextMenu);
		}
	}

	document.addEventListener('click', closeContextMenu);
}

function onContactsLoaded() {
	const firstContact = document.querySelector('.contact-item');
	const allContacts = document.querySelectorAll('.contact-item');
	const contextMenu = document.getElementById('context-menu');

	lastContact = firstContact.id

	socket.emit('loadUserData', lastContact);
	socket.emit('loadMessages', token.userData.id, lastContact);
	socket.emit('readMessages', token.userData.id, lastContact);
	socket.emit('getNonReadedMessages', token.userData.id);

	allContacts.forEach(contact => {
		contact.addEventListener('click', (event) => {
			let notification = contact.querySelector(".contact-notification");
			let username = contact.querySelector(".contact-name").textContent;

			openAppWindow()

			if (lastContact == contact.id) {
				return;
			}

			if (notification != null) {
				notification.remove();
				socket.emit("readMessages", token.userData.id, contact.id);
			}

			lastContact = contact.id;
			socket.emit('loadUserData', lastContact);
			socket.emit('loadMessages', token.userData.id, lastContact);
		});

		// Manejador de clic derecho
		contact.addEventListener('contextmenu', function(event) {
			event.preventDefault();

			// Mostrar el menú contextual
			contextMenu.style.display = 'block';
			contextMenu.style.left = `${event.pageX}px`;
			contextMenu.style.top = `${event.pageY}px`;

            contextMenu.innerHTML = `
            <li onclick="viewProfile('${contact.id}')">View profile</li>
            <li onclick="deleteFriend('${contact.id}')">Delete friend</li>
            <li onclick="blockFriend('${contact.id}')">Block</li>`;

			// Asegurarse de que el menú se cierre cuando se haga clic fuera de él
			document.addEventListener('click', function(event) {
				if (contextMenu.style.display == 'block'){
					contextMenu.style.display = 'none';
				}
			}, { once: true });
		});
	});
}

socket.on('getUserFriends', async (friends) => {
	var contactList = document.querySelector(".contact-list");
	contactList.innerHTML = ``;


	friends.forEach(friend => {
		contactList.innerHTML += `
		<li class="contact-item" id="`+ friend.id +`"> 
			<img src="`+ friend.avatar +`">
			
			<div class="contact-details">
				<span class="contact-name">`+ friend.username +`</span>
				<span class="contact-desc">`+ friend.status +`</span>
			</div>

			<!--<ion-icon class="contact-icon" name="ellipsis-vertical-outline"></ion-icon>-->
		</li>`
	});
	
	onContactsLoaded();
});

socket.on('requestUserData', async (userData) => {
	userRequested = userData
});

socket.on('getContactRequests', async (requests) => {
	const socialContainer = document.querySelector(".social-window-container");
	socialContainer.innerHTML = "";

	requests.forEach(function(user) {
		// Crear el HTML del usuario
		const userDiv = document.createElement('div');
		
		userDiv.className = 'social-window-user';
		userDiv.id = user.id;
		userDiv.innerHTML = `
			<img src="${user.avatar}" alt="media/img/default.jpg">
			<div class="social-window-user-info">
				<span class="social-window-username">${user.username}</span>
				<span class="social-window-status">${user.status}</span>
			</div>
			<div class="social-window-icons">
				<ion-icon name="checkmark-outline" style="color: green;" class="accept-icon"></ion-icon>
				<ion-icon name="close-outline" style="color: red;" class="reject-icon"></ion-icon>
			</div>
		`;

		// Agregar los event listeners para los iconos
		const acceptIcon = userDiv.querySelector('.accept-icon');
		const rejectIcon = userDiv.querySelector('.reject-icon');

		acceptIcon.addEventListener('click', () => {
			socialContainer.removeChild(userDiv);
			socket.emit("removeContactRequest", token.userData.id, userDiv.id);
			socket.emit("addFriend", token.userData.id, userDiv.id);
			socket.emit('getUserFriends', token.userData.id);
		});

		rejectIcon.addEventListener('click', () => {
			socialContainer.removeChild(userDiv);
			socket.emit("removeContactRequest", token.userData.id, userDiv.id);
		});

		// Añadir el div del usuario al contenedor
		socialContainer.appendChild(userDiv);
	});
});

socket.on('getNonReadedMessages', async (messages) => {
	for (let i = 0; i < messages.length; i++) {
		const userContact = document.getElementById(messages[i].sender);
		let notification = userContact.querySelector(".contact-notification");

		if (notification == null) {
			notification = document.createElement("div");
			notification.classList.add("contact-notification");
			userContact.appendChild(notification);
		}

		contactsNotifications[messages[i].sender] = i;
		notification.textContent = contactsNotifications[messages[i].sender] + 1;

		if (contactsNotifications[messages[i].sender] > 9) {
			notification.textContent = "+9";
		}
	}
});

socket.on('loadUserData', async (userData) => {
	if (userData.id == token.userData.id) {
		const profileName = document.querySelector(".profile-self-username");
		const profileStatus = document.querySelector(".profile-self-desc");
		const profileImage = document.querySelector(".profile-self-img");
		
		profileName.textContent = userData.username;
		profileStatus.textContent = userData.status;
		profileImage.src = userData.avatar;
	} else {
		loadProfile(userData.username, userData.avatar, userData.connected)
	}
});

socket.on('deleteFriend', async (friendId) => {
	const friendObject = document.getElementById(friendId);
	friendObject.remove();

	
});

socket.on('loadMessages', async (messages) => {
	const chatBox = document.querySelector(".messages-continer");
	const input = document.querySelector(".message-input");

	chatBox.innerHTML = "";
	input.focus();

	messages.forEach(message => {
		createMessage(message);
	});
});

socket.on('chat receive', async (messageId, sender, content) => {
    if (lastContact == sender || token.userData.id == sender) {            
        let message = {
            id: messageId,
            sender: sender,
            content: content,
            receiver: token.userData.id
        };

        createMessage(message);
        //socket.emit("readMessage", message.id);
    } else if (sender != token.userData.id & sender != "system") {
        const userContact = document.getElementById(sender);
        let notification = userContact.querySelector(".contact-notification");

        if (notification == null) {
            notification = document.createElement("div");
            notification.classList.add("contact-notification");
            userContact.appendChild(notification);

            contactsNotifications[sender] = 1;
        } else {
            contactsNotifications[sender] = contactsNotifications[sender] + 1;
        }
    
        if (contactsNotifications[sender] > 9) {
            notification.textContent = "+9";
        } else {
            notification.textContent = contactsNotifications[sender];
        }

        audio.play();

        // Mueve el contacto al principio de la lista
        moveContactToTop(sender);
    } else if (sender === "system") {
		console.log("PITOOOO", sender, content)

        let message = {
            id: messageId,
            sender: sender,
            content: content,
            receiver: token.userData.id
        };

        createMessage(message);
	}
});

socket.on('search friend request', async (users) => {
	const socialContainer = document.querySelector(".social-window");

	console.log("userss",users);

	users.forEach(function(user) {
		socialContainer.innerHTML += `
		<div class="social-window-user" id="${user.id}">
			<img src="${user.avatar}" alt="media/img/default.jpg">
			<div class="social-window-user-info">
				<span class="social-window-username">${user.username}</span>
				<span class="social-window-status">${user.status}</span>
			</div>

			<div class="social-window-icon"><ion-icon name="add-circle-outline"></ion-icon></div>
		</div>`
	});
});

socket.on('client connect', async (userConnected) => {
	if (lastContact == userConnected) {
		const headerStatus = document.querySelector(".chat-header-status");
		headerStatus.style.backgroundColor = "rgb(4, 183, 4)";
	}
});

socket.on('client disconnect', async (userDisconnected) => {
	if (lastContact == userDisconnected) {
		const headerStatus = document.querySelector(".chat-header-status");
		headerStatus.style.backgroundColor = "gray";
	}
});

messageInput.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();

		if (messageInput.value == "") {
			return;
		}

		socket.emit('chat message', token.userData.id, lastContact, messageInput.value);
		messageInput.value = "";
		moveContactToTop(lastContact);
	}
});

document.addEventListener("keyup", async function (event) {
	if (event.key === "Escape") {
		event.preventDefault()
		const showcase = document.querySelector(".contact-profile-showcase");
		const deleteContext = document.querySelector(".small-context-menu");

		openAppWindow()

		if (showcase.style.display == "flex") {
			// showcase.style.animation = "zoomOut 0.35s forwards";
			// await new Promise(r => setTimeout(r, 350));
			showcase.style.display = "none";
			showcase.style.animation = "zoomIn 0.35s forwards";
		}

		if (deleteContext.style.display == "flex") {
			// deleteContext.style.animation = "zoomOut 0.35s forwards";
			// await new Promise(r => setTimeout(r, 350));
			deleteContext.style.display = "none";
			deleteContext.style.animation = "zoomIn 0.35s forwards";
		}
	}
});

document.addEventListener('DOMContentLoaded', function() {
	const addfriends = document.getElementById("add-friend-button");
	const socialContainer = document.querySelector('.social-window');
	const openshop = document.getElementById("open-shop-button");
	const shopWindow = document.querySelector('.shop-window');

	addfriends.addEventListener('click', function () {
		openAppWindow()

        socialContainer.style.display = 'block';
		document.querySelector(".chat-container").style.display = "none";
		socket.emit("getContactRequests", token.userData.id);
    });

	openshop.addEventListener('click', function () {
		openAppWindow()

        shopWindow.style.display = 'block';
		document.querySelector(".chat-container").style.display = "none";
    });

	socket.emit('loadUserData', token.userData.id);
	socket.emit('getUserFriends', token.userData.id);
	socket.emit('getUserGroups', token.userData.id);
	socket.emit('client connect', token.userData.id);
});

window.addEventListener('beforeunload', function(event) {
	socket.emit("client disconnect", token.userData.id);
});