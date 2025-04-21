const shapes = ["☼", "⚇", "❀"];
const colors = ["blue", "orange", "yellow"];
const numbers = [1, 2, 3];
const fills = ["solid", "striped", "outline"];
let deck = [];
let selectedCards = [];

function generateDeck() {
    deck = [];
    for (let shape of shapes) {
        for (let color of colors) {
            for (let number of numbers) {
                for (let fill of fills) {
                    deck.push({ shape, color, number, fill });
                }
            }
        }
    }
}

function shuffleAndDeal() {
    console.log("Dealing new cards...");
    generateDeck();
    deck.sort(() => Math.random() - 0.5);
    displayCards(deck.slice(12));
}

function displayCards(cards) {
    const board = document.getElementById("game-board");
    board.innerHTML = "";
    cards.forEach((card, index) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerText = card.shape.repeat(card.number);
        cardDiv.style.color = card.color;
        cardDiv.onclick = () => selectCard(cardDiv, card);
        board.appendChild(cardDiv);
    });
}

function selectCard(cardDiv, card) {
    if (selectedCards.includes(card)) {
        selectedCards = selectedCards.filter(c => c !== card);
        cardDiv.classList.remove("selected");
    } else {
        selectedCards.push(card);
        cardDiv.classList.add("selected");
    }

    if (selectedCards.length === 3) {
        checkSet();
    }
}

function checkSet() {
    const [c1, c2, c3] = selectedCards;
    const isSet = ["shape", "color", "number", "fill"].every(attr =>
        (c1[attr] === c2[attr] && c2[attr] === c3[attr]) ||
        (c1[attr] !== c2[attr] && c2[attr] !== c3[attr] && c1[attr] !== c3[attr])
    );

    if (isSet) {
        alert("Match found! Scroll to the bottom to gain a clue!");
        document.getElementById("clue-image").style.display = "block";
    } else {
        alert("Not a match!");
    }

    selectedCards = [];
    document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
}
window.shuffleAndDeal = shuffleAndDeal;
