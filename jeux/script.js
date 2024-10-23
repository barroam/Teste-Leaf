// script.js

const player = document.getElementById('player');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const gameContainer = document.getElementById('gameContainer');

const playerSpeed = 5; // Vitesse de déplacement du joueur
const starSpeed = 2; // Vitesse de chute des étoiles
const starCount = 10; // Nombre d'étoiles affichées en même temps
const targetStars = 10; // Nombre d'étoiles à attraper pour gagner
const gameDuration = 60; // Durée du jeu en secondes

let score = 0;
let startTime;
let gameInterval;
let starElements = [];
let gameActive = false;

// Création des étoiles
function createStars() {
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * -100}vh`;
        gameContainer.appendChild(star);
        starElements.push({
            element: star,
            positionX: parseFloat(star.style.left),
            positionY: parseFloat(star.style.top),
        });
    }
}

function movePlayer(event) {
    if (!gameActive) return; // Ignorer les mouvements si le jeu n'est pas actif
    const containerRect = gameContainer.getBoundingClientRect();
    const mouseX = event.clientX;
    const playerWidth = player.offsetWidth;
    let newLeft = (mouseX - containerRect.left) / containerRect.width * 100;
    newLeft = Math.max(0, Math.min(100 - (playerWidth / containerRect.width * 100), newLeft));
    player.style.left = `${newLeft}vw`;
}

function moveStars() {
    if (!gameActive) return; // Ignorer les mouvements si le jeu n'est pas actif
    starElements.forEach(star => {
        star.positionY += starSpeed;
        if (star.positionY > 100) {
            star.positionY = Math.random() * -100;
            star.positionX = Math.random() * 100;
        }
        star.element.style.top = `${star.positionY}vh`;
        star.element.style.left = `${star.positionX}vw`;
        checkCollision(star.element);
    });
}

function checkCollision(starElement) {
    if (!gameActive) return; // Ignorer les collisions si le jeu n'est pas actif
    const playerRect = player.getBoundingClientRect();
    const starRect = starElement.getBoundingClientRect();
    if (playerRect.left < starRect.right &&
        playerRect.right > starRect.left &&
        playerRect.top < starRect.bottom &&
        playerRect.bottom > starRect.top) {
        score++;
        scoreElement.textContent = 'Étoiles attrapées: ' + score;
        starElement.style.top = `${Math.random() * -100}vh`;
        starElement.style.left = `${Math.random() * 100}vw`;

        if (score >= targetStars) {
            endGame('Gagné');
        }
    }
}

function updateTime() {
    if (!gameActive) return; // Ignorer le temps si le jeu n'est pas actif
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const remainingTime = Math.max(0, gameDuration - elapsedTime);
    timeElement.textContent = 'Temps restant: ' + remainingTime + 's';
    
    if (remainingTime <= 0) {
        endGame('Perdu');
    }
}

function endGame(result) {
    gameActive = false; // Arrêter les mouvements et les mises à jour
    alert(`Jeu terminé ! Vous avez ${result}. Score final: ` + score);
    clearInterval(gameInterval);
    resetGame();
}

function resetGame() {
    // Réinitialiser les étoiles
    starElements.forEach(star => star.element.remove());
    starElements = [];
    score = 0;
    scoreElement.textContent = 'Étoiles attrapées: 0';
    createStars();
    startGame();
}

function startGame() {
    startTime = Date.now();
    gameActive = true;
    gameInterval = setInterval(() => {
        moveStars();
        updateTime();
    }, 30); // Met à jour les étoiles et le temps toutes les 30 millisecondes
}

document.addEventListener('mousemove', movePlayer);
resetGame(); // Démarrer le jeu
