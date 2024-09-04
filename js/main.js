// Bericht naar de console om aan te geven dat het script is geladen
console.log('Main loaded');

// Functie om alleen de dobbelstenen van de speler te gooien en bij te werken
function rollPlayerDice() {
    // Genereer willekeurige nummers tussen 1 en 6 voor de dobbelstenen van de speler
    const playerDice1 = Math.floor(Math.random() * 6) + 1;
    const playerDice2 = Math.floor(Math.random() * 6) + 1;

    // Werk de dobbelsteen-elementen van de speler in de HTML bij met de nieuwe nummers
    document.querySelector('.player-dice-one').innerHTML = getDiceCharacter(playerDice1);
    document.querySelector('.player-dice-two').innerHTML = getDiceCharacter(playerDice2);

    // Optioneel: log de gegooide nummers van de speler naar de console voor debugging
    console.log('Speler gooide:', playerDice1, playerDice2);
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

// Koppel de functie rollPlayerDice aan de klikgebeurtenis van de "Gooi dobbelsteen" knop
document.querySelector('.dice-button').addEventListener('click', rollPlayerDice);
