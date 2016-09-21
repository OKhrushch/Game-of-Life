

function drawGame(testArray) {
    var cellBorder = 2.5;
    var canvas = document.getElementById('gameCanvas');
    var cellHeight = 20;
    var cellWidth = 20;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        for (i = 0; i < testArray.length; i++)
            for (j = 0; j < testArray[i].length; j++) {

                if (testArray[i][j] == 1) {
                    ctx.fillStyle = "red";
                }
                else ctx.fillStyle = "blue";
                ctx.fillRect(i * cellWidth + cellBorder,
                               j * cellHeight + cellBorder,
                               cellWidth - cellBorder * 2,
                               cellHeight - cellBorder * 2);
            }
    }
}


function clearCanvas() {
    var canvas = document.getElementById('gameCanvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
}