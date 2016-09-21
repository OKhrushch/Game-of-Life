window.onload = function () {
    var button = document.getElementById("nextGenerationButton");
    button.onclick = onButtonClick;
    var canvas = document.getElementById("gameCanvas");
    canvas.onclick = onCanvasClick;
    display(currentGeneration);


    var startButton = document.getElementById("startButton");
    startButton.onclick = onStartButtonClick;

    var stopButton = document.getElementById("stopButton");
    stopButton.onclick = onStopButtonClick;

}

//WE ARE TRYING TO RESIZE CANVAS HERE


//var gameArea = document.getElementById('gameArea');
//var widthToHeight = 4 / 3;
//var newWidth = window.innerWidth;
//var newHeight = window.innerHeight;
//var newWidthToHeight = newWidth / newHeight;

//if (newWidthToHeight > widthToHeight) {
//    // window width is too wide relative to desired game width
//    newWidth = newHeight * widthToHeight;
//    gameArea.style.height = newHeight + 'px';
//    gameArea.style.width = newWidth + 'px';
//} else { // window height is too high relative to desired game height
//    newHeight = newWidth / widthToHeight;
//    gameArea.style.width = newWidth + 'px';
//    gameArea.style.height = newHeight + 'px';
//}
//gameArea.style.marginTop = (-newHeight / 2) + 'px';
//gameArea.style.marginLeft = (-newWidth / 2) + 'px';
//gameArea.style.fontSize = (newWidth / 400) + 'em';
//var gameCanvas = document.getElementById('gameCanvas');
//gameCanvas.width = newWidth;
//gameCanvas.height = newHeight;

//window.addEventListener('resize', resizeGame, false);
//window.addEventListener('orientationchange', resizeGame, false);

//THE GAME STARTS HERE

function generateEmpty2dSquareArray(height, width) {
    var arr = new Array(height);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(width);
        for (var j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}


function calcNextGeneneration(currentGeneration) {
    for (var i = 0; i < currentGeneration.length; i++) {
        for (var j = 0; j < currentGeneration[i].length; j++) {
            var neighbours = 0;
            for (k = i - 1; k <= i + 1; k++) {
                for (p = j - 1; p <= j + 1; p++) {
                    if (k == i && p == j) continue;
                    if (getElement(k, p, currentGeneration) == 1) {
                        neighbours++;
                    }
                }
            }
            if (currentGeneration[i][j] == 1) {
                if (neighbours == 2 || neighbours == 3)
                    nextGeneration[i][j] = 1;
                else {
                    nextGeneration[i][j] = 0;
                }
            }
            else if (currentGeneration[i][j] == 0 && neighbours == 3) {
                nextGeneration[i][j] = 1;
            }
        }
    }
}


function getElement(x, y, arr) {
    var xLen = arr.length;
    var tmp = arr[(xLen + x) % xLen];
    var yLen = tmp.length;
    return tmp[(yLen + y) % yLen];
}


function display(src) {
    drawGame(src);
}


function clearContent(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}


function copy(source, destination) {
    for (var i = 0; i < source.length; i++) {
        for (var j = 0; j < source[i].length; j++) {
            destination[i][j] = source[i][j];
        }
    }
}

function clear(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            array[i][j] = 0;
        }
    }
}




var field_height = 5;
var field_width = 5;




var currentGeneration = generateEmpty2dSquareArray(field_height, field_width);
var nextGeneration = generateEmpty2dSquareArray(field_height, field_width);


currentGeneration[0][1] = 1;
currentGeneration[1][2] = 1;
currentGeneration[2][0] = 1;
currentGeneration[2][1] = 1;
currentGeneration[2][2] = 1;

function onButtonClick() {
    calcNextGeneneration(currentGeneration);
    display(nextGeneration);
    copy(nextGeneration, currentGeneration);
    clear(nextGeneration);
}

function onCanvasClick(args) {
    var canvas = args.target;
    var cellHeight = 20; //canvas.clientHeight / currentGeneration.length;
    var cellWidth = 20; //canvas.clientWidth / currentGeneration[0].length;
    var cellX = Math.floor(args.offsetX / cellWidth);
    var cellY = Math.floor(args.offsetY / cellHeight);
    currentGeneration[cellX][cellY] == 0 ? currentGeneration[cellX][cellY] = 1 : currentGeneration[cellX][cellY] = 0; 
    display(currentGeneration);
}

// start button function 
var counter = 0;
var timer;
function onStartButtonClick() {
    timer = setInterval(function () {
        document.getElementById("nextGenerationButton").click();
        counter++;
    }, 700);
}

//stop button function
function onStopButtonClick() {
    clearInterval(timer);
    document.getElementById("counterDisplay").innerHTML = "Generation number:" + counter;
}


//
function clearArray(name) {
    for (i = 0; i < name.length; i++)
        for (j = 0; j < name[i].length; j++)
            name[i].pop()
    for (i = 0; i < name.length; i++)
        name.pop;
}

function clearCanvas() {
    var canvas = document.getElementById('gameCanvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
}

function generateCustomField(height, width) {
    var height = parseInt(document.getElementById('fieldHeight').value);
    var width = parseInt(document.getElementById('fieldWidth').value);
    
    clearArray(currentGeneration)
    clearArray(nextGeneration)
    currentGeneration = generateEmpty2dSquareArray(height, width);
    nextGeneration = generateEmpty2dSquareArray(height, width);
     
    clearCanvas();
    drawGame(currentGeneration);
}


function generateRandomField() {
    var width = Math.round(Math.random() * 20);
    var height = Math.round(Math.random() * 20);

    clearArray(currentGeneration)
    clearArray(nextGeneration)
    currentGeneration = generateEmpty2dSquareArray(width, height);
    nextGeneration = generateEmpty2dSquareArray(width, height);

    clearCanvas();
    drawGame(currentGeneration);
}

function fillRandomCells() {
    for (a = 0; a < currentGeneration.length * currentGeneration[0].length ; a++) {
        i = Math.round(Math.random() * (currentGeneration.length -1));
        j = Math.round(Math.random() * (currentGeneration[i].length -1));
        currentGeneration[i][j] = Math.round(Math.random())
        drawGame(currentGeneration)
    }
}

//document.getElementById('fieldHeight').value
//document.getElementById('fieldWidth').value