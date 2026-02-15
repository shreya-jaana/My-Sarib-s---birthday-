// Global Variables
let currentScene = 1;
const totalScenes = 5;
let gameInterval;
let hearts = [];
let score = 0;
let gameActive = false;
let openedGifts = 0;
const giftMessages = {
    1: "You are the best person not because you are perfect, but because your heart is pure.",
    2: "I am so proud of you — your struggles, your growth, and the man you are becoming.",
    3: "I love you. Not casually. Not temporarily. I truly, deeply love you.",
    4: "This is our first birthday celebrating like this… but it is only the beginning. We will celebrate countless birthdays together till our last breath."
};
const paragraphText = "My Jana,\n\nEven though miles stand between us, I feel you closer than anyone else in this world. This distance is not breaking us… it is building us. It is teaching us patience, loyalty, and a love that does not fade with time.\n\nEvery day without you feels incomplete, yet every day knowing you are mine feels like the greatest blessing. You are the sweetest soul I have ever known. Your kindness, your calm strength, the way you care, the way you love — everything about you makes me proud.\n\nThis distance is temporary, but what we have is permanent. We are not just waiting… we are growing together. Preparing for a future where we will never have to count kilometers again.\n\nYou are my peace.\nYou are my comfort.\nYou are my forever.\n\nAnd no matter how long the wait is…\nI will always choose you.";

// Scene Transition Function
function transitionToScene(sceneId) {
    document.querySelector('.scene.active').classList.remove('active');
    document.getElementById(`scene${sceneId}`).classList.add('active');
    currentScene = sceneId;
}

// Rain Animation
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let raindrops = [];

function createRaindrop() {
    return {
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 5 + 2
    };
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
            drop.y = 0;
            drop.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawRain);
}

for (let i = 0; i < 100; i++) {
    raindrops.push(createRaindrop());
}
drawRain();

// Password Portal (Scene 1)
document.getElementById('submitPassword').addEventListener('click', () => {
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMessage');
    if (password === '9/3/2009') {
        // Unlock animation: shake and glow
        const button = document.getElementById('submitPassword');
        button.style.animation = 'shake 0.5s';
        setTimeout(() => {
            button.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
            setTimeout(() => transitionToScene(2), 1000);
        }, 500);
    } else {
        errorMsg.textContent = 'Wrong key to my heart...';
        errorMsg.classList.add('error');
    }
});

// Catch My Heart Game (Scene 2)
function startGame() {
    gameActive = true;
    score = 0;
    hearts = [];
    document.getElementById('score').textContent = 'Score: 0';
    document.getElementById('gameOverMessage').classList.add('hidden');
    document.getElementById('restartGame').classList.add('hidden');
    document.getElementById('successMessage').classList.add('hidden');
    document.getElementById('enterGifts').classList.add('hidden');
    gameInterval = setInterval(createHeart, 1000);
}

function createHeart() {
    if (!gameActive) return;
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 80 + '%';
    heart.addEventListener('touchstart', catchHeart);
    document.getElementById('gameArea').appendChild(heart);
    hearts.push(heart);
    setTimeout(() => {
        if (hearts.includes(heart) && gameActive) {
            gameOver();
        }
    }, 3000);
}

function catchHeart(e) {
    e.target.remove();
    hearts.splice(hearts.indexOf(e.target), 1);
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
    if (score >= 10) {
        gameActive = false;
        clearInterval(gameInterval);
        document.getElementById('successMessage').classList.remove('hidden');
        document.getElementById('enterGifts').classList.remove('hidden');
        document.getElementById('enterGifts').classList.add('pulse');
    }
}

function gameOver() {
    gameActive = false;
    clearInterval(gameInterval);
    document.getElementById('gameOverMessage').classList.remove('hidden');
    document.getElementById('restartGame').classList.remove('hidden');
}

document.getElementById('restartGame').addEventListener('click', startGame);
document.getElementById('enterGifts').addEventListener('click', () => transitionToScene(3));

// First Gift Typing Animation (Scene 3)
function typeParagraph(text, element, delay = 50) {
    let i = 0;
    element.textContent = '';
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, delay);
}

document.addEventListener('DOMContentLoaded', () => {
    if (currentScene === 3) {
        typeParagraph(paragraphText, document.getElementById('giftParagraph'));
    }
});

document.getElementById('nextGift').addEventListener('click', () => transitionToScene(4));

// Four Gift Boxes (Scene 4)
document.querySelectorAll('.giftBox').forEach(box => {
    box.addEventListener('click', () => {
        const giftNum = box.dataset.gift;
        box.classList.add('opened');
        box.textContent = `Opened`;
        document.getElementById('giftMessage
