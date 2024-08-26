/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop over each item in the games array
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // Create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // Add the class game-card to the div
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal to display game info
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img"/>
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function with the GAMES_JSON data
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);


// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = `${totalGames}`;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // Log the number of unfunded games to the console for verification
    console.log(unfundedGames.length);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);

    // Log the number of funded games to the console for verification
    console.log(fundedGames.length);
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}



// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// Step 1: use filter to count the number of unfunded games
const numberOfUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Step 2: create a string that explains the number of unfunded games using the ternary operator
const message = `A total of $${totalRaised.toLocaleString()} has been raised across ${totalGames} games. There ${numberOfUnfundedGames === 1 ? 'is' : 'are'} ${numberOfUnfundedGames} game${numberOfUnfundedGames === 1 ? '' : 's'} that ${numberOfUnfundedGames === 1 ? 'is' : 'are'} still unfunded.`;

// Step 3: create a new paragraph element containing the template string and append it to the description container
const messageParagraph = document.createElement('p');
messageParagraph.innerHTML = message;
descriptionContainer.appendChild(messageParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// grab the element with the id first-game
const firstGameContainer = document.getElementById("first-game");

// grab the element with the id second-game
const secondGameContainer = document.getElementById("second-game");

// Sort games by pledged amount in descending order
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Destructure the top two games from the sortedGames array
const [topGame, secondTopGame] = sortedGames;

// Create and append the top funded game
const firstGameElement = document.createElement('p');
firstGameElement.textContent = `Top funded game: ${topGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// Create and append the second funded game
const secondGameElement = document.createElement('p');
secondGameElement.textContent = `Second top funded game: ${secondTopGame.name}`;
secondGameContainer.appendChild(secondGameElement);
