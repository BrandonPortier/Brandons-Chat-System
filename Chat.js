let profilePicSrc = '';  // Store the user's profile picture
let selectedColor = 'white';  // Store the selected color

// Send message function
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const usernameInput = document.getElementById('usernameInput');
    const messageText = messageInput.value.trim();
    
    if (messageText) {
        addMessage(usernameInput.value, profilePicSrc, messageText, 'user', selectedColor);
        messageInput.value = '';

        // Handle predefined commands
        switch (messageText.toLowerCase()) {
            case '/hi':
                setTimeout(() => addMessage('Bot', '', 'Hello!', 'bot'), 500);
                break;
            case '/rules':
                setTimeout(() => addMessage('Bot', '', 'Chat Rules', 'bot'), 500);
                break;
            case '/wendys':
                setTimeout(() => addMessage('Bot', '', "Wendy's Menu", 'bot'), 500);
                break;
            case '/help':
                const helpMessage = '/hi: Hello!<br>/rules: Chat Rules<br>/wendys: Wendy\'s Menu<br>/help: List of commands<br>/how attractive: Random attractiveness percentage<br>/coin flip: Heads or Tails';
                setTimeout(() => addMessage('Bot', '', helpMessage, 'bot', '', true), 500);
                break;
            case '/how attractive':
                const attractiveness = Math.floor(Math.random() * 100) + 1;
                setTimeout(() => addMessage('Bot', '', `You are ${attractiveness}% Attractive`, 'bot'), 500);
                break;
            case '/coin flip':
                const coinFlip = Math.random() < 0.5 ? 'Heads' : 'Tails';
                setTimeout(() => addMessage('Bot', '', coinFlip, 'bot'), 500);
                break;
            default:
                // Optionally handle unknown commands here
                break;
        }
    }
}

// Function to add a message to the chat
function addMessage(username, profilePic, text, sender, color = 'white', isHTML = false) {
    const chatBox = document.getElementById('chatBox');
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper');
    messageWrapper.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start'; // Align messages

    // Create the profile picture element
    const profilePicElement = document.createElement('img');
    profilePicElement.classList.add('profile-pic');
    
    // Set default profile picture for bot
    if (sender === 'bot') {
        profilePicElement.src = 'bot.jpg'; // Replace with the bot image URL
    } else {
        profilePicElement.src = profilePic || 'https://via.placeholder.com/40';
    }

    // Create the username element
    const usernameElement = document.createElement('span');
    usernameElement.classList.add('username');
    usernameElement.textContent = username || 'Anonymous';
    usernameElement.style.color = color; // Set username color

    // Create the message bubble
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.style.color = 'white';  // Ensure message text is always white

    if (isHTML) {
        messageElement.innerHTML = text;
    } else {
        messageElement.textContent = text;
    }

    messageWrapper.appendChild(profilePicElement);
    messageWrapper.appendChild(usernameElement);
    messageWrapper.appendChild(messageElement);

    chatBox.appendChild(messageWrapper);
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll
}


// Function to trigger profile picture upload
function triggerProfilePicUpload() {
    document.getElementById('profilePicInput').click();
}

// Function to handle profile picture upload
function uploadProfilePicture() {
    const file = document.getElementById('profilePicInput').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicSrc = e.target.result;  // Store the profile picture data
        };
        reader.readAsDataURL(file);
    }
}

// Function to trigger image upload
function triggerImageUpload() {
    document.getElementById('imageInput').click();
}

// Send image function
function sendImage() {
    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            addImage(e.target.result, 'user');
        };
        reader.readAsDataURL(file);
    }
}

// Function to add an image to the chat
function addImage(src, sender) {
    const usernameInput = document.getElementById('usernameInput');
    const chatBox = document.getElementById('chatBox');
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper');
    messageWrapper.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start'; // Align messages

    const profilePicElement = document.createElement('img');
    profilePicElement.classList.add('profile-pic');
    profilePicElement.src = profilePicSrc || 'https://via.placeholder.com/40';

    const usernameElement = document.createElement('span');
    usernameElement.classList.add('username');
    usernameElement.textContent = usernameInput.value || 'Anonymous';
    usernameElement.style.color = selectedColor; // Set username color

    const imageElement = document.createElement('img');
    imageElement.src = src;
    imageElement.classList.add('message');
    imageElement.style.maxWidth = "90%";  // Increase the maximum width of the image
    imageElement.style.maxHeight = "400px"; // Increase the maximum height of the image

    messageWrapper.appendChild(profilePicElement);
    messageWrapper.appendChild(usernameElement);
    messageWrapper.appendChild(imageElement);

    chatBox.appendChild(messageWrapper);
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll
}

// Function to update the selected color
function updateSelectedColor() {
    selectedColor = document.getElementById('colorSelection').value;
}

// Event listener for Enter key
document.getElementById('messageInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});