console.log('Main loaded');

// mijn variabelen
let gameStarted = false; // Houdt bij of het spel gestart is
let playerCredits = 0; // punten voor de speler
let computerCredits = 0; // punten voor de computer
let playerDice1, playerDice2, computerDice1, computerDice2; // waarden dobbelsteen

function startGame() {
    gameStarted = true; 
    document.querySelector('.dice-button').disabled = false; 
    document.querySelector('.message-box p').innerText = "Speler, gooi je dobbelstenen!";
    console.log('Spel gestart!');
}

function rollPlayerDice() {
    if (!gameStarted) {
        console.log('Het spel is nog niet gestart. Druk eerst op GO!');
        return; 
    }

    playerDice1 = Math.floor(Math.random() * 6) + 1;
    playerDice2 = Math.floor(Math.random() * 6) + 1;

    document.querySelector('.player-dice-one').innerHTML = getDiceCharacter(playerDice1);
    document.querySelector('.player-dice-two').innerHTML = getDiceCharacter(playerDice2);

    console.log('Speler gooide:', playerDice1, playerDice2);

    document.querySelector('.dice-button').disabled = true;
    document.querySelector('.message-box p').innerText = "Kies Hoger of Lager.";

    document.querySelector('.higher-button').disabled = false;
    document.querySelector('.lower-button').disabled = false;
}

// Functie om de computer dobbelstenen te gooien
function rollComputerDice() {
    computerDice1 = Math.floor(Math.random() * 6) + 1;
    computerDice2 = Math.floor(Math.random() * 6) + 1;

    document.querySelector('.computer-dice-one').innerHTML = getDiceCharacter(computerDice1);
    document.querySelector('.computer-dice-two').innerHTML = getDiceCharacter(computerDice2);

    console.log('Computer gooide:', computerDice1, computerDice2);

    document.querySelector('.message-box p').innerText = "De computer heeft gegooid.";
}

// Functie om te bepalen wie wint en punten toe te wijzen
function determineWinner(guess) {
    // Totaal van de dobbelstenen berekenen
    const playerTotal = playerDice1 + playerDice2;
    const computerTotal = computerDice1 + computerDice2;

    // Vergelijk de totale waarden en bepaal de winnaar
    if ((guess === 'hoger' && playerTotal > computerTotal) ||
        (guess === 'lager' && playerTotal < computerTotal)) {
        playerCredits += 5; // Speler wint
        document.querySelector('.message-box p').innerText = "Je hebt gewonnen! Je krijgt 5 punten.";
    } else if (playerTotal === computerTotal) {
        document.querySelector('.message-box p').innerText = "Gelijkspel!";
    } else {
        computerCredits += 5; // Computer wint
        document.querySelector('.message-box p').innerText = "Computer wint! Computer krijgt 5 punten.";
    }

    // Werk de credits in de HTML bij
    updateCredits();

    // Schakel de Hoger en Lager knoppen weer uit
    document.querySelector('.higher-button').disabled = true;
    document.querySelector('.lower-button').disabled = true;

    // Laat de speler weer gooien
    document.querySelector('.dice-button').disabled = false;
    document.querySelector('.message-box p').innerText = "Speler, gooi opnieuw!";
}

// Functie om het juiste Unicode-teken voor het dobbelsteenoppervlak terug te geven
function getDiceCharacter(number) {
    switch (number) {
        case 1: return '&#9856;'; 
        case 2: return '&#9857;';
        case 3: return '&#9858;'; 
        case 4: return '&#9859;'; 
        case 5: return '&#9860;';
        case 6: return '&#9861;';
        default: return ''; // Zou nooit moeten gebeuren
    }
}

// Functie om de credits bij te werken in de HTML
function updateCredits() {
    document.querySelector('.player-credits').innerText = playerCredits;
    document.querySelector('.computer-credits').innerText = computerCredits;
}

// Koppel de functie startGame aan de klikgebeurtenis van de "GO" knop
document.querySelector('.go-button').addEventListener('click', startGame);

// Koppel de functie rollPlayerDice aan de klikgebeurtenis van de "Gooi dobbelsteen" knop, maar zet de knop eerst uit
document.querySelector('.dice-button').addEventListener('click', rollPlayerDice);
document.querySelector('.dice-button').disabled = true; // Zet de gooi-knop van de speler uit tot het spel gestart is

// Koppel de "Hoger" en "Lager" knoppen aan functies die de gok van de speler registreren
document.querySelector('.higher-button').addEventListener('click', () => {
    rollComputerDice();
    determineWinner('hoger');
});
document.querySelector('.lower-button').addEventListener('click', () => {
    rollComputerDice();
    determineWinner('lager');
});

// Zet de Hoger en Lager knoppen uit totdat de speler heeft gegooid
document.querySelector('.higher-button').disabled = true;
document.querySelector('.lower-button').disabled = true;
