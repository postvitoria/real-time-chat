//import OpenAI from "openai";

const token = JSON.parse(localStorage.getItem('sessionToken'));
const sendButton = document.querySelector(".send-button");
const messageInput = document.querySelector(".message-input");
const audio = new Audio('media/audio/notification.mp3');

let lastContact;
let contactsNotifications = {};

if (token == null) {
	window.location.href = "login"
}

const socket = io({
	auth: {
		serverOffset: 0,
		userData: token.userData
	}
});

function OnContactsLoaded () {
	socket.emit('getNonReadedMessages', token.userData.id);
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

	if (lastContact == "chatbotai") {
		chatTag.classList.replace("chat-header-status", "chat-header-status-ai");
		chatTag.style.backgroundColor = "#0093FF";
		chatTag.textContent = "AI";
	} else {
		chatTag.classList.replace("chat-header-status-ai", "chat-header-status");
		chatTag.textContent = "";

		if (connected == 1) {
			chatTag.style.backgroundColor = "rgb(4, 183, 4)";
		} else {
			chatTag.style.backgroundColor = "gray";
		}
	}

	chatName.textContent = name;
	chatImage.src = image;
}

function createMessage(message) {
	const sender = document.getElementById(message.sender);
	const chatBox = document.querySelector(".messages-continer");

	let messageImg = token.userData.avatar;

	if (sender != null) {
		messageImg = sender.querySelector("img").src;
	}

	var messageContainer = document.createElement("div");
	messageContainer.classList.add('message-container');

	var messageName = document.createElement("span");
	messageName.classList.add("message-user-name");
	messageName.textContent = "";

	var newmessage = document.createElement("div");
	newmessage.classList.add('message');

	var parag = document.createElement("p");
	parag.textContent = message.content;
	
	var userIcon = document.createElement("img");
	userIcon.classList.add("message-user-icon");
	userIcon.src = messageImg;

	if (sender == null) {
		userIcon.style.float = "right";
		newmessage.style.float = "right";
		userIcon.style.marginRight = "25px";

		newmessage.style.backgroundColor = "#ECECEC";
		parag.style.color = "#808080";
	}

	newmessage.appendChild(messageName);
	newmessage.appendChild(parag);

	messageContainer.appendChild(userIcon);
	messageContainer.appendChild(newmessage);

	chatBox.appendChild(messageContainer);
	chatBox.scrollTop = chatBox.scrollHeight;
}

socket.on('getUserFriends', async (friends) => {
	var contactList = document.querySelector(".contact-list");

	friends.forEach(friend => {
		var contactItem = document.createElement("li");
		contactItem.classList.add("contact-item");
		contactList.appendChild(contactItem);
		contactItem.id = friend.id;

		var contactImg = document.createElement("img");
		contactItem.appendChild(contactImg);
		contactImg.src = friend.avatar;

		var contactDetails = document.createElement("div");
		contactDetails.classList.add("contact-details");
		contactItem.appendChild(contactDetails);

		var contactName = document.createElement("span");
		contactName.classList.add("contact-name");
		contactDetails.appendChild(contactName);
		contactName.textContent = friend.username;

		var contactDesc = document.createElement("span");
		contactDesc.classList.add("contact-desc");
		contactDetails.appendChild(contactDesc);
		contactDesc.textContent = friend.status;

		var ionicon = document.createElement("ion-icon");
		ionicon.setAttribute("name", "ellipsis-vertical-outline")
		ionicon.classList.add("contact-icon");
		contactItem.appendChild(ionicon);
		ionicon.id = friend.id;

		contactItem.addEventListener('click', (event) => {
			let notification = contactItem.querySelector(".contact-notification");
			openAppWindow()

			if (lastContact == contactItem.id) {
				return;
			}

			if (notification != null) {
				notification.remove();
				socket.emit("readMessages", token.userData.id, contactItem.id)
			}

			lastContact = contactItem.id;
			socket.emit('requestUserData', lastContact);
			socket.emit('loadMessages', token.userData.id, contactItem.id);
		});
		
		ionicon.addEventListener('click', (event) => {
			// Evita que se propague el evento de clic al contacto
			event.stopPropagation();
			// Agrega el código que deseas ejecutar al hacer clic en el icono aquí
		});
	});
	
	OnContactsLoaded()
});

socket.on('getUserGroups', async (groups) => {
	groups.forEach(group => {
		
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
			notification.textContent = "9+";
		}
	}
});

socket.on('requestUserData', async (userData) => {
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
	const oldMessages = document.querySelectorAll(".message-container");

	oldMessages.forEach(element => {
		element.remove();
	});

	messages.forEach(message => {
		createMessage(message);
	});
});

socket.on('chat receive', async (sender, content) => {
	if (lastContact == sender) {		
		let message = []
		message.sender = sender;
		message.content = content;
		message.receiver = token.userData.id;

		createMessage(message)
	} else if (sender != token.userData.id) {
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
			contactsNotifications[sender] = "9+"
		}

		notification.textContent = contactsNotifications[sender]
		audio.play();
	}
});

socket.on('ai response', async (content) => {	
	let message = []
	message.sender = "chatbotai";
	message.content = content;
	message.receiver = token.userData.id;

	createMessage(message)
	//socket.emit('message.sender', "chatbotai", message.receiver, message.content);
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

// socket.on('client disconnect', async (contacts) => {
// 	const contactsContainer = document.querySelector(".add-friend-items");
// 	const existentContacts = document.querySelectorAll(".friend-item");
// });

sendButton.addEventListener('click', (event) => {
	// Evita que se propague el evento de clic al contacto
	event.stopPropagation();
	const input = document.querySelector(".message-input");

	if (input.value == "") {
		return;
	}
	
	let message = []
	message.sender = token.userData.id;
	message.content = input.value;
	message.receiver = lastContact;

	createMessage(message);
	socket.emit('chat message', message.sender, message.receiver, message.content);

	input.value = "";
});

messageInput.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();

		if (messageInput.value == "") {
			return;
		}

		let message = []
		message.sender = token.userData.id;
		message.content = messageInput.value;
		message.receiver = lastContact;

		createMessage(message);
		socket.emit('chat message', message.sender, message.receiver, message.content);
		messageInput.value = "";

		if (lastContact == "chatbotai") {
			socket.emit("ai response", message.sender, message.content)
		}
	}
});

document.addEventListener("keyup", function (event) {
	if (event.key === "Escape") {
		event.preventDefault()
		
		openAppWindow()
	}
});

document.addEventListener('DOMContentLoaded', function() {
	const chatBoxAI = document.getElementById("chatbotai");
	const addfriends = document.getElementById("add-friend-button");
	const socialContainer = document.querySelector('.social-window');
	const openshop = document.getElementById("open-shop-button");
	const shopWindow = document.querySelector('.shop-window');

	addfriends.addEventListener('click', function () {
		openAppWindow()

        socialContainer.style.display = 'block';
		document.querySelector(".chat-container").style.display = "none";
    });

	openshop.addEventListener('click', function () {
		openAppWindow()

        shopWindow.style.display = 'block';
		document.querySelector(".chat-container").style.display = "none";
    });

	socket.emit('requestUserData', token.userData.id);
	socket.emit('getUserFriends', token.userData.id);
	socket.emit('getUserGroups', token.userData.id);

	lastContact = "chatbotai";
	loadProfile("Dreikyzz AI", chatBoxAI.querySelector("img").src, "AI");

	socket.emit('loadMessages', token.userData.id, "chatbotai");
	socket.emit('client connect', token.userData.id);

	chatBoxAI.addEventListener('click', (event) => {
		openAppWindow()
		
		if (lastContact == "chatbotai") {
			return;
		}

		lastContact = "chatbotai";
		loadProfile("Dreikyzz AI", chatBoxAI.querySelector("img").src, "AI");
		socket.emit('loadMessages', token.userData.id, "chatbotai");
	});
});

window.addEventListener('beforeunload', function(event) {
	socket.emit("client disconnect", token.userData.id);
});