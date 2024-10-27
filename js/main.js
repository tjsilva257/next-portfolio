console.log('Main loaded'); // Logt een bericht naar de console wanneer het script wordt geladen

// mijn variabelen
let gameStarted = false; // Houdt bij of het spel gestart is
let playerCredits = 0; // Houdt de punten van de speler bij
let computerCredits = 0; // Houdt de punten van de computer bij
let playerDice1, playerDice2, computerDice1, computerDice2; // Variabelen voor de waarden van de dobbelstenen
let correctGuessesInARow = 0; // Teller voor opeenvolgende juiste gokken van de speler

function changePlayerHeader() {
    // Prompt voor nieuwe naam
    let newName = prompt("Enter de naam voor de 'Speler'");
    
    // als de gebruiker een naam Entert dan verandert het
    if (newName) {
        // Selecteert het element met de classe 'player-header' en verandert de text
        document.querySelector('.player-header').textContent = newName;
    }
}

// Functie om het spel te starten
function startGame() {
    gameStarted = true; // Zet de gameStarted-variabele op true om aan te geven dat het spel is gestart
    document.querySelector('.dice-button').disabled = false; // Maakt de knop om de dobbelstenen te gooien actief
    document.querySelector('.message-box p').innerText = "Speler, gooi je dobbelstenen!"; // Update het bericht voor de speler
    console.log('Spel gestart!'); // Logt naar de console dat het spel is gestart
}

// Functie voor het gooien van de dobbelstenen van de speler
function rollPlayerDice() {
    if (!gameStarted) { // Controleert of het spel is gestart
        console.log('Het spel is nog niet gestart. Druk eerst op GO!'); // Logt een foutmelding als het spel niet is gestart
        return; // Verlaat de functie als het spel niet is gestart
    }

    // Genereert random waarden voor de dobbelstenen
    playerDice1 = Math.floor(Math.random() * 6) + 1; // Genereert een waarde tussen 1 en 6 voor dobbelsteen 1
    playerDice2 = Math.floor(Math.random() * 6) + 1; // Genereert een waarde tussen 1 en 6 voor dobbelsteen 2

    // Update de weergave van de dobbelsteenwaarden in de interface
    document.querySelector('.player-dice-one').innerHTML = getDiceCharacter(playerDice1); // Update de eerste dobbelsteenwaarde
    document.querySelector('.player-dice-two').innerHTML = getDiceCharacter(playerDice2); // Update de tweede dobbelsteenwaarde

    console.log('Speler gooide:', playerDice1, playerDice2); // Logt de gegooide waarden van de speler naar de console

    document.querySelector('.dice-button').disabled = true; // Zet de knop om te gooien uit, zodat de speler niet opnieuw kan gooien
    document.querySelector('.message-box p').innerText = "Kies Hoger of Lager."; // Update het bericht voor de speler

    document.querySelector('.higher-button').disabled = false; // Maakt de knop 'Hoger' actief
    document.querySelector('.lower-button').disabled = false; // Maakt de knop 'Lager' actief
}

// Functie om de dobbelstenen van de computer te gooien
function rollComputerDice() {
    computerDice1 = Math.floor(Math.random() * 6) + 1; // Genereert een waarde tussen 1 en 6 voor dobbelsteen 1 van de computer
    computerDice2 = Math.floor(Math.random() * 6) + 1; // Genereert een waarde tussen 1 en 6 voor dobbelsteen 2 van de computer

    // Update de weergave van de dobbelsteenwaarden in de interface
    document.querySelector('.computer-dice-one').innerHTML = getDiceCharacter(computerDice1); // Update de eerste dobbelsteenwaarde van de computer
    document.querySelector('.computer-dice-two').innerHTML = getDiceCharacter(computerDice2); // Update de tweede dobbelsteenwaarde van de computer

    console.log('Computer gooide:', computerDice1, computerDice2); // Logt de gegooide waarden van de computer naar de console

    document.querySelector('.message-box p').innerText = "De computer heeft gegooid."; // Update het bericht voor de speler
}

// Functie om te bepalen wie de winnaar is en punten toe te wijzen
function determineWinner(guess) {
    const playerTotal = playerDice1 + playerDice2; // Bereken de totale waarde van de dobbelstenen van de speler
    const computerTotal = computerDice1 + computerDice2; // Bereken de totale waarde van de dobbelstenen van de computer

    // Vergelijk de totale waarden en bepaal de winnaar
    if ((guess === 'hoger' && playerTotal > computerTotal) || 
        (guess === 'lager' && playerTotal < computerTotal)) { // Controleer of de gok 'hoger' of 'lager' was en de speler gewonnen heeft
        playerCredits += 5; // Speler wint en krijgt 5 punten
        correctGuessesInARow++; // Verhoog de teller voor opeenvolgende juiste gokken
        if (correctGuessesInARow === 3) { // Controleer of de speler 3 keer achter elkaar juist gokt
            playerCredits += 10; // Voeg 10 bonuspunten toe
            correctGuessesInARow = 0; // Reset de teller voor opeenvolgende juiste gokken
            document.querySelector('.message-box p').innerText = "3 keer goed geraden! Je krijgt 10 bonuspunten."; // Update het bericht
        } else {
            document.querySelector('.message-box p').innerText = "Je hebt gewonnen! Je krijgt 5 punten."; // Update het bericht
        }
    } else if (playerTotal === computerTotal) { // Controleert of er sprake is van gelijkspel
        document.querySelector('.message-box p').innerText = "Het is Gelijkspel!"; // Update het bericht voor gelijkspel
        correctGuessesInARow = 0; // Reset de teller als er geen winnaar is
    } else {
        computerCredits += 5; // Computer wint en krijgt 5 punten
        document.querySelector('.message-box p').innerText = "Computer wint! Computer krijgt 5 punten."; // Update het bericht
        correctGuessesInARow = 0; // Reset de teller als de speler verliest
    }

    checkGameEnd(); // Controleer of het spel moet eindigen
    updateCredits(); // Werk de score bij in de interface

    document.querySelector('.higher-button').disabled = true; // Zet de knop 'Hoger' uit
    document.querySelector('.lower-button').disabled = true; // Zet de knop 'Lager' uit
    document.querySelector('.dice-button').disabled = false; // Maak de gooi-knop weer actief voor een nieuwe ronde
}

// Functie om te controleren of het spel voorbij is (bij 30 punten)
function checkGameEnd() {
    if (playerCredits >= 30 || computerCredits >= 30) { // Controleer of een speler 30 punten heeft bereikt
        document.querySelector('.message-box p').innerText = 
            playerCredits >= 30 ? "Gefeliciteerd, je hebt gewonnen! klik op go om opnieuw te spelen" : "Computer wint het spel!";
        playerCredits = 0; // Reset de punten van de speler
        computerCredits = 0; // Reset de punten van de computer
        correctGuessesInARow = 0; // Reset de reeks juiste gokken
        gameStarted = false; // Zet het spel terug op niet-gestart
    }
}

// Functie om de juiste dobbelsteenkarakter op basis van het nummer terug te geven
function getDiceCharacter(number) {
    switch (number) {
        case 1: return '&#9856;';
        case 2: return '&#9857;';
        case 3: return '&#9858;';
        case 4: return '&#9859;';
        case 5: return '&#9860;';
        case 6: return '&#9861;';
        default: return '';
    }
}

// Functie om de credits van de speler en de computer bij te werken in de interface
function updateCredits() {
    document.querySelector('.player-credits').innerText = playerCredits;
    document.querySelector('.computer-credits').innerText = computerCredits;
}

// Event listener voor de startknop die het spel begint
document.querySelector('.go-button').addEventListener('click', startGame);
document.querySelector('.dice-button').addEventListener('click', rollPlayerDice);
document.querySelector('.dice-button').disabled = true;
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
