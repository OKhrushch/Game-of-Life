﻿function generateEmpty2dSquareArray(size) {
    var arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = new Array(size);
        for (var j = 0; j < size; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}


function calcNextGeneneration(seed) {
    for (var i = 0; i < seed.length; i++) {
        for (var j = 0; j < seed[i].length; j++) {
            var neighbours = 0;
            for (k = i - 1; k <= i + 1; k++) {
                for (p = j - 1; p <= j + 1; p++) {
                    if (k == i && p == j) continue;
                    if (getElement(k, p, seed) == 1) {
                        neighbours++;
                    }
                }
            }
            if (seed[i][j] == 1) {
                if (neighbours == 2 || neighbours == 3)
                    nextGeneration[i][j] = 1;
                else {
                    nextGeneration[i][j] = 0;
                }
            }
            else if (seed[i][j] == 0 && neighbours == 3) {
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
    var field = document.getElementById("field");
    clearContent(field);
    for (var i = 0; i < src.length; i++) {
        var line = "";
        for (var j = 0; j < src[i].length; j++) {
            line += src[i][j] == 1 ? "#" : ".";
        }
        field.appendChild(document.createTextNode(line));
        field.appendChild(document.createElement("br"));
    }
}


function clearContent(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

function onButtonClick() {
    calcNextGeneneration(currentGeneration);
    display(nextGeneration);
    copy(nextGeneration, currentGeneration);
    clear(nextGeneration);
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

window.onload = function () {
    var button = document.getElementById("nextGenerationButton");
    button.onclick = onButtonClick;
    display(currentGeneration);
}

var field_size = 10;
var currentGeneration = generateEmpty2dSquareArray(field_size);
var nextGeneration = generateEmpty2dSquareArray(field_size);


currentGeneration[0][1] = 1;
currentGeneration[1][2] = 1;
currentGeneration[2][0] = 1;
currentGeneration[2][1] = 1;
currentGeneration[2][2] = 1;