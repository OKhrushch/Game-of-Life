﻿var a = 30;
var test = 10;
var seed = new Array(a);
var neighbours = 0;
var generation = new Array(a);
var emptyCells = 0;


for (var i = 0; i < seed.length; i++) {
    seed[i] = new Array(a);
    generation[i] = new Array(a);
}
for (var i = 0; i < seed.length; i++) {
    for (var j = 0; j < seed[i].length ; j++) {
        seed[i][j] = 0;
        generation[i][j] = 0;
    }
}

seed[0][1] = 1;
seed[1][2] = 1;
seed[2][0] = 1;
seed[2][1] = 1;
seed[2][2] = 1;





// Calculate next generation
calcNextGen = function (seed) {
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
            var actNeighb = neighbours;
            if (seed[i][j] == 1) {
                if (actNeighb < 2) {
                    generation[i][j] = 0;
                }
                else if (actNeighb > 3) {
                    generation[i][j] = 0;
                }
                else if (actNeighb == 2 || actNeighb == 3) {
                    generation[i][j] = 1;
                }
            }
            else if (seed[i][j] == 0) {
                if (actNeighb == 3) {
                    generation[i][j] = 1;
                }
            }
        }
    }
}

function getElement(x, y, arr) {
    var x_len = arr.length;
    var tmp = arr[(x_len + x) % x_len];
    var y_len = tmp.length;
    return tmp[(y_len + y) % y_len];
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

function onClick() {
    calcNextGen(seed);
    display(generation);
    copy(generation, seed);
    clear(generation);
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

window.onload = function () { display(seed); }