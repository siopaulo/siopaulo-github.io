/* --------------------------------------------------------- Globals ------------------------------------------------------------------------------------------------------------------  */
let lifeCost = 100;
let playerBudget;
let playerLives = 3;
let currentBet = 0;
let remainingBetAmount = 0;
let deck = [];
let playerHand = [];
let dealerHand = [];
let isPlayerTurn = true;

/* --------------------------------------------------------- Starting Page ------------------------------------------------------------------------------------------------------------------  */
function startGame() {
    document.getElementById('startContainer').style.display = 'none';
    document.getElementById('initialBudgetPrompt').style.display = 'flex';
}

function createRaindrop() {
    var raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.left = Math.random() * window.innerWidth + 'px';
    raindrop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
    document.getElementById('rainContainer').appendChild(raindrop);

    raindrop.addEventListener('animationend', function() {
        raindrop.remove();
    });
}

function startRaining() {
    createRaindrop();
    requestAnimationFrame(startRaining); 
}

window.addEventListener('load', startRaining);

function startRaining() {
    if (document.querySelectorAll('.raindrop').length < 100) { 
        createRaindrop();
    }
    requestAnimationFrame(startRaining);
}

/* --------------------------------------------------------- set Budget Page ------------------------------------------------------------------------------------------------------------------  */
function setBudget() {
    let enteredBudget = parseInt(document.getElementById('initialBudget').value);
    let minBudgetElement = document.getElementById('minBudget');

    if (isNaN(enteredBudget) || enteredBudget < 10) {
        minBudgetElement.classList.add('minBudgetError');
        return; 
    }

    minBudgetElement.classList.remove('minBudgetError');

    playerBudget = enteredBudget;
    maxBet = Math.floor(playerBudget / playerLives); 
    remainingBetAmount = maxBet; 
    updateUI();
    document.getElementById('initialBudgetPrompt').style.display = 'none';
    document.getElementById('gameWrapper').style.display = 'flex'; 
    document.getElementById('bettingControls').style.display = 'block';
    document.getElementById('messageBox').style.display = 'block';

    initializeGame();
}

document.getElementById('initialBudget').addEventListener('input', function() {
    let minBudgetElement = document.getElementById('minBudget');
    let enteredBudget = parseInt(document.getElementById('initialBudget').value);

    if (!isNaN(enteredBudget) && enteredBudget >= 10) {
        minBudgetElement.classList.remove('minBudgetError');
    }
    else{
        minBudgetElement.classList.add('minBudgetError');
    }
});

/* --------------------------------------------------------- Game Page ------------------------------------------------------------------------------------------------------------------  */

function initializeGame() {
    drawLives();
    enableGameControls(); 
}

function createDeck() {
    let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    let newDeck = [];
    for (let suit of suits) {
        for (let value of values) {
            newDeck.push({ suit, value });
        }
    }
    return newDeck;
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function drawCard(hand) {
    if (deck.length === 0) {
        deck = createDeck();
        shuffle(deck);
    }
    let card = deck.pop();
    hand.push(card);

    updateUI();

    const totalValue = calculateScore(hand);
    document.getElementById('stand').disabled = false;

    if (hand.length === 2 && totalValue === 22) {
        endGame(true); // Royal eye
    } else if (totalValue > 21) {
        simulateDealerHand(); 
        endGame(false); 
    }
}

function stand() {
    isPlayerTurn = false;
    let dealerScore = calculateScore(dealerHand);
    let playerScore = calculateScore(playerHand);
    // d = 10 p = 5
    while (dealerScore < playerScore && dealerScore < 17) {
        drawCard(dealerHand);
        dealerScore = calculateScore(dealerHand);

        updateUI(); 
        
        if (dealerScore > 21) {
            endGame(true); 
            return; 
        }
    }
    
    endGame(playerScore > dealerScore);

    disableGameControls();
    document.getElementById('newRound').hidden = false; 
    document.getElementById('newRound').disabled = false; 
    document.getElementById('resetGame').disabled = false; 
}

function resetGame() {
    playerBudget = parseInt(document.getElementById('initialBudget').value); 
    playerLives = 3;
    currentBet = 0;
    document.getElementById('currentBet').innerText = currentBet;
    bet= 0;
    maxBet = Math.floor(playerBudget / playerLives);
    remainingBetAmount = maxBet;
    playerHand = [];
    dealerHand = [];
    deck = createDeck();
    shuffle(deck);
    updateUI();
    enableGameControls();
    messageBox.innerText = '';
}

function placeBet() {
    let betInput, bet;

    while (true) {
        betInput = prompt(`Enter your bet (Maximum bet: ${remainingBetAmount}):`);

        if (betInput === null) { 
            break;
        }

        bet = parseInt(betInput, 10);

        if (!isNaN(bet) && bet > 0 && bet <= remainingBetAmount) {
            document.getElementById('currentBet').innerText = bet;
            currentBet = bet;
            playerBudget -= currentBet; 
            remainingBetAmount -= currentBet; 

            updateUI();
            document.getElementById('placeBet').disabled = true;
            document.getElementById('drawCard').disabled = false;
            document.getElementById('stand').disabled = true;
            break;
        } else {
            alert('Invalid bet. Please enter a valid amount.');
        }
    }
}

function newRound() {
    playerHand = [];
    dealerHand = [];

    currentBet = 0;
    document.getElementById('currentBet').innerText = currentBet;
    bet= 0;

    updateUI();

    document.getElementById('placeBet').disabled = false; 
    document.getElementById('drawCard').disabled = true;  
    document.getElementById('stand').disabled = true;     
    document.getElementById('newRound').hidden = true;    
    messageBox.innerText = '';
}

function simulateDealerHand() {
    let dealerScore = calculateScore(dealerHand);
    while (dealerScore < 17) {
        if (deck.length === 0) {
            deck = createDeck();
            shuffle(deck);
        }
        let card = deck.pop();
        dealerHand.push(card);
        dealerScore = calculateScore(dealerHand);
    }
    updateUI();
}

function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;
    for (let card of hand) {
        if (card.value === 'Ace') {
            aceCount++;
            score += 11;
        } else if (['Jack', 'Queen', 'King'].includes(card.value)) {
            score += 2;
        } else {
            score += parseInt(card.value);
        }
    }
    return score;
}

function endGame(playerWins) {
    let messageBox = document.getElementById('messageBox');
    let newRoundButton = document.getElementById('newRound');

    if (playerWins) {
        playerBudget += currentBet * 2; 
        messageBox.innerText = 'Congratulations! You won the round!';

        maxBet = Math.floor(playerBudget / playerLives);
        remainingBetAmount = maxBet;
    } else {
        messageBox.innerText = 'Sorry, you lost the round. Better luck next time!';
        
        if (remainingBetAmount <= 0) {
            playerLives--;
            messageBox.innerText += ' You have lost a life.';

            if (playerLives > 0) {
                maxBet = Math.floor(playerBudget / playerLives);
                remainingBetAmount = maxBet;
            }
        }
    }

    if (playerLives <= 0) {
        let gameOverScreen = document.getElementById('gameOverScreen');
        let gameContainer = document.getElementById('gameWrapper');
    
        gameContainer.style.opacity = '0';

        gameOverScreen.style.display = 'flex'; 
        setTimeout(() => {
            gameOverScreen.classList.add('visible');
        }, 0);

        setTimeout(() => {
            gameContainer.style.display = 'none';
            document.getElementById('startNewGame').style.display = 'flex'; 
        }, 5000);

        disableGameControls();
        messageBox.hidden = true; 
        newRoundButton.hidden = true;
    } else {
        newRoundButton.hidden = false; 
        newRoundButton.disabled = false; 
    }
    
    updateUI();
    disableGameControls();
}

function buyLive(){
    if (playerBudget - 100 >= lifeCost && playerLives <= 4) {
        playerBudget -= lifeCost;
        playerLives++;
        updateUI();
        remainingBetAmount = Math.floor(playerBudget / playerLives);
    } else {
        alert("Not enough money or you have max lives (5)");
    }
}

function confirmExit() {
    var playerMoneyText = playerBudget > 0 ? "You won with $" + playerBudget + " in your pocket and see you soon." : "You didn't win any money. Better luck next time!";
    var exitConfirmed = confirm("Are you sure you want to leave the game? If you leave now, " + playerMoneyText);

    if (exitConfirmed) {
        var messageBox = document.getElementById('messageBox');
        messageBox.style.display = 'block';
        messageBox.innerHTML = playerMoneyText + "<br><br>";

        var leaveButton = document.createElement('button');
        leaveButton.innerText = 'Leave';
        leaveButton.className = 'leaveButton';
        messageBox.appendChild(leaveButton);

        document.getElementById('gameWrapper').style.display = 'none';
        document.getElementById('startContainer').style.display = 'flex';
        initializeGame();
        messageBox.innerText = '';
        enableGameControls();
        document.getElementById('newRound').hidden = true;
    }
}

function updateUI() {
    document.getElementById('budgetAmount').innerText = playerBudget;
    document.getElementById('livesCount').innerText = playerLives;
    document.getElementById('remainingBetAmount').innerText = remainingBetAmount;

    updateHand('playerHand', playerHand);
    updateHand('dealerHand', dealerHand);

    document.getElementById('playerScore').innerText = calculateScore(playerHand);
    document.getElementById('dealerScore').innerText = calculateScore(dealerHand);
    drawLives();
}

function updateHand(handId, hand) {
    let handDiv = document.getElementById(handId);
    handDiv.innerHTML = ''; 

    for (let card of hand) {
        let cardDiv = document.createElement('div');
        styleCard(cardDiv, card); 
        handDiv.appendChild(cardDiv);
    }
}

function getSuitSymbol(suit) {
    switch(suit) {
        case 'Hearts': return '♥';
        case 'Diamonds': return '♦';
        case 'Clubs': return '♣';
        case 'Spades': return '♠';
        default: return '';
    }
}

function getCardValue(value) {
    const faceValues = { 'Jack': 'J', 'Queen': 'Q', 'King': 'K', 'Ace': 'A' };
    return faceValues[value] || value; 
}

function getSuitColor(suit) {
    return suit === 'Hearts' || suit === 'Diamonds' ? 'red' : 'black';
}

function styleCard(cardDiv, card) {
    cardDiv.classList.add('card');
    cardDiv.style.color = getSuitColor(card.suit);

    cardDiv.innerHTML = '';

    let topLeftElement = document.createElement('div');
    topLeftElement.style.position = 'absolute';
    topLeftElement.style.left = '5px';
    topLeftElement.style.top = '5px';
    topLeftElement.innerHTML = getCardValue(card.value) + '<br>' + getSuitSymbol(card.suit);
    topLeftElement.style.color = getSuitColor(card.suit);

    let bottomRightElement = document.createElement('div');
    bottomRightElement.style.position = 'absolute';
    bottomRightElement.style.right = '5px';
    bottomRightElement.style.bottom = '5px';
    bottomRightElement.style.transform = 'rotate(180deg)';
    bottomRightElement.innerHTML = getCardValue(card.value) + '<br>' + getSuitSymbol(card.suit);
    bottomRightElement.style.color = getSuitColor(card.suit);

    cardDiv.appendChild(topLeftElement);
    cardDiv.appendChild(bottomRightElement);
}

function drawLives() {
    const canvas = document.getElementById('canvasLives');
    const ctx = canvas.getContext('2d');
    const canvasWidth = 50 * playerLives;

    canvas.width = canvasWidth; 
    canvas.height = 50; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';

    for (let i = 0; i < playerLives; i++) {
        drawHeart(ctx, 25 + i * 50, 25);
    }
}

function drawHeart(ctx, x, y) {
    const width = 17;
    const height = 17;
    ctx.beginPath();
    const topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);

    ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight);

    ctx.bezierCurveTo(x - width / 2, y + (height + topCurveHeight) / 2, x, y + (height + topCurveHeight) / 2, x, y + height);

    ctx.bezierCurveTo(x, y + (height + topCurveHeight) / 2, x + width / 2, y + (height + topCurveHeight) / 2, x + width / 2, y + topCurveHeight);

    ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

/* --------------------------------------------------------- Game Over Page ------------------------------------------------------------------------------------------------------------------  */

function startNewGame() {
    playerBudget = 100; 
    playerLives = 3;
    currentBet = 0;
    document.getElementById('currentBet').innerText = currentBet;
    bet= 0;
    maxBet = Math.floor(playerBudget / playerLives); 
    remainingBetAmount = maxBet;
    playerHand = [];
    dealerHand = [];
    deck = createDeck();
    shuffle(deck);
    updateUI();
    enableGameControls();
    messageBox.innerText = '';
    document.getElementById("newRound").hidden = true;
    document.getElementById("initialBudget").value = "";

    let gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'none';
    gameOverScreen.classList.remove('visible'); 
    gameContainer.style.opacity = '1'; 

    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('startNewGame').style.display = 'none';
    document.getElementById('startContainer').style.display = 'flex'; 
    document.getElementById('gameWrapper').style.display = 'none'; 
    document.getElementById('gameWrapper').style.opacity = 1;
}

/* --------------------------------------------------------- Utilities ------------------------------------------------------------------------------------------------------------------  */

function disableAllControls(){
    document.getElementById('drawCard').disabled = true;
    document.getElementById('stand').disabled = true;
    document.getElementById('placeBet').disabled = true;
    document.getElementById('newRound').disabled = true;
    document.getElementById('resetGame').disabled = true;
}

function disableGameControls() {
    document.getElementById('drawCard').disabled = true;
    document.getElementById('stand').disabled = true;
    document.getElementById('placeBet').disabled = true;
}

function enableGameControls() {
    document.getElementById('placeBet').disabled = false; 
    document.getElementById('drawCard').disabled = true; 
    document.getElementById('stand').disabled = true; 
}

/* --------------------------------------------------------- Starters ------------------------------------------------------------------------------------------------------------------  */

drawLives();
initializeGame();
