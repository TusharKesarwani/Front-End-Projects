# 🔊 PeerWave Voice Chat

A simple front-end only voice chat room project using **PeerJS**.
PeerWave allows users to connect with a custom peer ID, call another peer, and use basic mute/unmute voice controls directly from the browser.

## ✨ Features

* Simple peer-to-peer voice calling
* Custom peer ID connection
* Call another user by peer ID
* Mute / unmute voice button
* Front-end only setup
* Uses PeerJS CDN
* Lightweight and beginner-friendly UI
* No backend setup required for basic testing

## 🛠️ Tech Stack

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![PeerJS](https://img.shields.io/badge/PeerJS-WebRTC-blue?style=for-the-badge)

## 📸 Preview

PeerWave has a clean and simple interface with:

* Step 1: Connect using your peer ID
* Step 2: Call another peer ID
* Mute/unmute voice button

## 🚀 How It Works

1. Enter your peer ID.
2. Click **Connect**.
3. Enter another user's peer ID.
4. Click **Call Peer**.
5. Use the mute/unmute button to control your voice.

The project uses PeerJS and WebRTC to create peer-to-peer voice communication between users.

## 📂 Project Structure

```bash
PeerWave/
│
├── index.html
├── client.js
└── README.md
```

## 📦 CDN Used

PeerJS CDN:

```html
<script src="https://unpkg.com/peerjs@1.5.5/dist/peerjs.min.js"></script>
```

PeerWave voice library:

```html
<script src="https://arunmohankml.github.io/PeerWave-server/voice.js"></script>
```

## 🧩 Basic Usage

Add the PeerJS CDN and PeerWave voice script inside your HTML file:

```html
<script src="https://unpkg.com/peerjs@1.5.5/dist/peerjs.min.js"></script>
<script src="https://arunmohankml.github.io/PeerWave-server/voice.js"></script>
<script src="client.js"></script>
```

Then use the buttons to connect and call peers.

## 🖥️ Example UI

```html
<input type="text" id="peer-id" placeholder="Enter your ID">
<button onclick="clicked()">Connect</button>

<input type="text" id="target-peerid" placeholder="Enter target ID">
<button onclick="callclicked()">Call Peer</button>

<button onclick="AllowVoice()">mute/unmute</button>
```

## 🌐 Live Demo

Add your live demo link here:

```bash
https://your-demo-link.com
```

## 📌 Future Improvements

* Room-based voice chat
* Multiple user support
* Better mobile UI
* Push-to-talk mode
* Voice activity detection
* Call disconnect button
* User online/offline status
* Custom PeerJS server support

## ⚠️ Note

This is a front-end only demo project made for learning and testing simple browser-based voice chat using PeerJS and WebRTC.

## 👨‍💻 Author

**Arun Mohan**

GitHub: [Arunmohankml](https://github.com/Arunmohankml)

## ⭐ Support

If you like this project, give it a star on GitHub.
