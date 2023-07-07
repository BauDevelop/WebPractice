let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let arr = [];
let animArr = [];
let fieldSize = 4, zoneSize = 2;
let phase = 0;
let xMouse = 0, yMouse = 0;
let cellProp = {size: canvas.clientWidth / fieldSize, margin: 4};

Resize();
window.addEventListener("resize", Resize);
Start();

function Start()
{
    //   fill main array
    let num = 1;
    for (let iy = 0; iy < fieldSize; iy++) {
        for (let ix = 0; ix < fieldSize; ix++) {
            arr[iy * fieldSize + ix] = { value: num, x: ix, y: iy, visible: true, marker: 0};
             num++;
        }
    }

    timer = setInterval(Update, 1000 / 60);
}

function Update()
{
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); //    claer frame

    Tracing();
    DrawField();
}

function Tracing()
{
    let tmpX, tmpY;

    if (xMouse + zoneSize <= fieldSize) tmpX = xMouse;
        else tmpX = xMouse - zoneSize + 1;
    if (yMouse + zoneSize <= fieldSize) tmpY = yMouse;
        else tmpY = yMouse - zoneSize + 1;                  // ограничение позиции мыши

    let squareCells = {one: tmpY * fieldSize + tmpX, 
                       two: tmpY * fieldSize + tmpX + 1, 
                       three: (tmpY + 1) * fieldSize + tmpX, 
                       four: (tmpY + 1) * fieldSize + tmpX + 1}

    arr[squareCells.one].marker = 1; arr[squareCells.two].marker = 1;
    arr[squareCells.three].marker = 1; arr[squareCells.four].marker = 1;

    if (phase == 1) {
        let tmpArr = [];

        animArr[0] = {value: arr[squareCells.one].value, curX: arr[squareCells.one].x, curY: arr[squareCells.one].y};
        animArr[1] = {value: arr[squareCells.two].value, curX: arr[squareCells.two].x, curY: arr[squareCells.two].y};
        animArr[2] = {value: arr[squareCells.three].value, curX: arr[squareCells.three].x, curY: arr[squareCells.three].y};
        animArr[3] = {value: arr[squareCells.four].value, curX: arr[squareCells.four].x, curY: arr[squareCells.four].y};

        tmpArr[0] = arr[squareCells.one].value; tmpArr[1] = arr[squareCells.two].value; 
        tmpArr[2] = arr[squareCells.three].value; tmpArr[3] = arr[squareCells.four].value;

        arr[squareCells.one].value = tmpArr[2];
        arr[squareCells.two].value = tmpArr[0];
        arr[squareCells.three].value = tmpArr[3]; 
        arr[squareCells.four].value = tmpArr[1];
        arr[squareCells.one].visible = false;
        arr[squareCells.two].visible = false;
        arr[squareCells.three].visible = false;
        arr[squareCells.four].visible = false;
        phase = 2;
    }

    if (phase >= 2) {
        animArr[0].curX += 0.1;
        animArr[1].curY += 0.1;
        animArr[2].curY -= 0.1;
        animArr[3].curX -= 0.1;

        phase++;
        if (phase >= 12) {
            phase = 0;
            for (let i = 0; i < arr.length; i++) {
                arr[i].visible = true;
            }
        }
    }
}

function DrawField()
{
    context.font = (0.25 * cellProp.size) + "px Verdana";

    cellProp.size = canvas.clientWidth / fieldSize;
    let size = cellProp.size - cellProp.margin;

    for (let i = 0; i < arr.length; i++) {
        // Draw animation cell
        if (phase >= 2 && i < 4) {
            context.fillStyle = "royalblue";
            context.fillRect( animArr[i].curX * cellProp.size + cellProp.margin / 2, animArr[i].curY * cellProp.size + cellProp.margin / 2, size, size );
            context.fillStyle = "black";
            if (animArr[i].value < 10) 
                context.fillText( animArr[i].value, animArr[i].curX * cellProp.size + cellProp.size / 2.2, animArr[i].curY * cellProp.size + cellProp.size / 1.9);
            else 
                context.fillText( animArr[i].value, animArr[i].curX * cellProp.size + cellProp.size / 2.7, animArr[i].curY * cellProp.size + cellProp.size / 1.9);
        }
        //   Draw game cells
        if (arr[i].marker == 1) 
            context.fillStyle = "royalblue";
        else
            context.fillStyle = "gray";
        if (!arr[i].visible) {
            continue;
        }
        else {
            context.fillRect( arr[i].x * cellProp.size + cellProp.margin / 2, arr[i].y * cellProp.size + cellProp.margin / 2, size, size );

            //   Draw digits
            context.fillStyle = "black";
            if (arr[i].value < 10) 
                context.fillText( arr[i].value, arr[i].x * cellProp.size + cellProp.size / 2.2, arr[i].y * cellProp.size + cellProp.size / 1.9);
            else 
                context.fillText( arr[i].value, arr[i].x * cellProp.size + cellProp.size / 2.7, arr[i].y * cellProp.size + cellProp.size / 1.9);
                arr[i].marker = 0;
        }
    }
    
}

function OnMouse(event)
{
    xMouse = Math.ceil((event.x - canvas.offsetLeft) / cellProp.size) - 1;
    yMouse = Math.ceil((event.y - canvas.offsetTop) / cellProp.size) - 1;

    if (xMouse < 0) xMouse = 0;
    if (xMouse > fieldSize - 1) xMouse = fieldSize - 1;
    if (yMouse < 0) yMouse = 0;
    if (yMouse > fieldSize - 1) yMouse = fieldSize - 1;
}

function OnClick() 
{
    if (phase == 0) phase = 1;
}

function Resize()
{
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}