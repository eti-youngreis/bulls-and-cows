const colors = ["red", "blue", "pink", "green", "yellow", "orange", "purple", 
"brown", "lightblue", "lightgreen"];
let colorsNum = 8,
    colorsDivs = [],
    circle,
    isWin = false,
    randColor = [],
    div;
let colorsDiv = document.createElement('div');
const rowsNum = 10;
function init() {
    resetGame();
    randColors();
}
function boardAndColors() {
    const brdAndClr = document.createElement('div');
    document.getElementById('con').appendChild(brdAndClr);
    brdAndClr.id = "brdAndClr";
}
function createBoard() {
    let board = document.createElement('div');
    board.id = "board";
    document.getElementById("brdAndClr").appendChild(board);
    for (let i = 0; i < rowsNum; i++) {
        board.appendChild(createRow());
    }
}
function createRow() {
    let row = document.createElement('div'), square;
    row.classList.add("row");
    createDivs("rowcircle", 4, row);
    square = document.createElement('div');
    square.className = "rowsquare";
    row.appendChild(square);
    createDivs("point", 4, square);
    return row;
}

function createDivs(cl, j, father) {
    for (let i = 0; i < j; i++) {
        circle = document.createElement('div');
        circle.classList.add("circle", cl);
        father.appendChild(circle);
    }
}

function createButtons() {
    let buttonsDiv = document.createElement('div');
    let buttons = document.createElement('div');
    buttons.id = "buttons";
    document.getElementById("con").appendChild(buttons);
    buttons.appendChild(buttonsDiv);
    buttonsDiv.id = "buttonsDiv";
    for (let i = 0; i < 3; i++) {
        div = document.createElement('div');
        buttonsDiv.appendChild(div);
        div.classList.add('buttonsDivs');
    }
    let children = buttonsDiv.children;
    options(children[1]);
    startGame(children[0]);
    children[2].innerHTML = "שיאים גבוהים";
    children[2].addEventListener('click', () => {
        resetGame();
        printScores();
    })
}

function options(div) {
    createOptions();
    div.innerHTML = "אפשרויות משחק";
    div.addEventListener("click", () => {
        document.getElementById('buttons').style.display = "none";
        document.getElementById('options').style.display = 'block';
    })
}

function createOptions() {
    let options = document.createElement('div');
    options.style.display = "none";
    options.id = "options";
    document.getElementById('con').appendChild(options);
    let chooseLevel = document.createElement('div');
    options.appendChild(chooseLevel);
    chooseLevel.classList.add('buttonsDivs');
    chooseLevel.innerHTML = "בחר רמת קושי";
    chooseLevel.addEventListener('click',
       createRadioInput);
}

function createRadioInput() {
    let level = document.createElement('div');
    level.classList.add('level', 'buttonsDivs');
    document.querySelector('#options').appendChild(level);
    let chooseLevel, radioButton, label;
    for (let i = 1; i < 4; i++) {

        chooseLevel = document.createElement('div');
        level.appendChild(chooseLevel);
        radioButton = document.createElement("input");
        radioButton.setAttribute("id", `רמה ${i}`);
        label = document.createElement('label');
        label.innerHTML = radioButton.id;
        label.setAttribute("for", radioButton.id);
        radioButton.setAttribute("type", "radio");
        radioButton.addEventListener('click', () => {
            colorsNum = 7 + i;
            document.getElementById('options').style.display = 'none';
            document.getElementById('buttons').style.display = "block";

        })
        radioButton.setAttribute('name', "level");
        chooseLevel.appendChild(radioButton);
        chooseLevel.appendChild(label);
    }
    this.removeEventListener('click',createRadioInput);
}

function startGame(div) {
    div.innerHTML = "התחל משחק חדש";
    div.addEventListener('click', () => {
        resetGame();
       createBoard();
       createColors();
        randColors();
    })
}
function resetGame() {
    document.getElementById('con').innerHTML = "";
    Irow = 0;
    Icol = 0;
    boardAndColors();
    gameButtons();
    document.getElementById('gameButtons').style.display = 'block';
    createButtons();
    colorsDiv.innerHTML = "";
}
function randColors() {
    let tempColors = [colors.length],
        rand;
    for (let i = 0; i < 4; i++) {
        rand = Math.floor(Math.random() * colorsNum);
        while (tempColors[rand] === true)
            rand = Math.floor(Math.random() * colorsNum);
        randColor[i] = colors[rand];
        tempColors[rand] = true;
    }
}
function gameButtons() {
    let gameButtons = document.createElement('div');
    gameButtons.id = "gameButtons";
    gameButtons.style.display = 'none';
    document.getElementById('brdAndClr').appendChild(gameButtons);
}

function createColors() {
    colorsDiv.classList.add("colorsDiv");
    document.getElementById("gameButtons").innerHTML = "";
    document.getElementById("gameButtons").appendChild(colorsDiv);
    createColorsButtons('color', colorsDiv);
    colorsDivs = colorsDiv.children;
   colorButtons(colorsDivs);
}

function createColorsButtons(cl, father) {
    for (let i = 0; i < colorsNum; i++) {
        circle = document.createElement('button');
        circle.classList.add('circle', cl);
        father.appendChild(circle);
    }
}

function colorButtons(colorsDivs) {
    for (let i = 0; i < colorsNum; i++) {
        colorsDivs[i].style.background = colors[i];
        colorsDivs[i].addEventListener("click", turn);
    }
}

function enable(coll) {
    for (let i = 0; i < coll.length; i++) {
        coll[i].disabled = false;
    }
}

function turn() {
    let div = document.getElementById("board").children;
    let child = div[Irow].children;
    let value = this.style.background;
    child[Icol].style.background = value;
    if (Icol === 3) {
        result(child);
        if (isWin)
            finish();
        else {
            Icol = 0;
            enable(colorsDivs);
            if (Irow === rowsNum - 1) {
                finish()
            }
            else {
                Irow++;
            }
        }
    } else {
        this.disabled = true;
        Icol++;
    }
}

function result(child) {
    let j = 0;
    isWin = true;
    for (let i = 0; i < randColor.length; i++) {
        for (let k = 0; k < child.length - 1; k++) {
            if (randColor[i] === child[k].style.background) {
                if (i === k) {
                    child[4].children[j].style.background = "red";

                } else {
                    child[4].children[j].style.background = "black";
                }
                j++;
                break;
            }
        }
    }
    for (let i = 0; i < 4; i++)
        if (child[4].children[i].style.background != 'red')
            isWin = false;
}

function finish() {
    let button = document.createElement('button');
    button.innerHTML = "חזור לעמוד הבית";
    button.addEventListener('click', () => { window.location.href = 'bulls_and_cows.html'; })
    button.classList.add('finish');
    let finishDiv = document.createElement('div');
    finishDiv.appendChild(button);
    finishDiv.id = 'finishDiv';
    document.body.appendChild(finishDiv);
    let finish = document.createElement('h3');
    finishDiv.appendChild(finish);
    document.getElementById('con').style.display = 'none';
    if (isWin) {
        finish.innerHTML = "You Win!!!!";
        saveHighScore();
    } else
        finish.innerHTML = 'Game Over';

    printScores();
}
function saveHighScore() {
    let playerName = localStorage.getItem('a') || 'no_name';
    let score = 1000 - Irow * 100;
    let playerScore = { name: playerName, score: score }
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(playerScore);
    if (highScores.sort())
        highScores.sort((a, b) => b.score - a.score);
    else
        console.log("sort is undefined");
    highScores = highScores.slice(0, 5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
function getHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    let formattedScores = [];
    for (let i = 0; i < highScores.length; i++) {
        let playerScoreStr = `${highScores[i].name}_ _ _ _ _ _ _ _ _ _${highScores[i].score}`;
        formattedScores.push(playerScoreStr);
    }
    return formattedScores;
}
function printScores() {
    const myDiv = document.createElement('div');
    const startScores = document.createElement('div');
    myDiv.id = 'myDiv';
    myDiv.classList.add('animate');
    myDiv.classList.add('finish');
    document.getElementById('con').appendChild(startScores);
    (document.getElementById('finishDiv') || startScores).appendChild(myDiv);

    const myList = document.createElement('ul');
    myDiv.appendChild(myList);
    let formattedScores = getHighScores();

    for (let i = 0; i < formattedScores.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = formattedScores[i];
        myList.appendChild(listItem);
    }
}


