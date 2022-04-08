let canvas = document.querySelector('canvas');
let mousedown = false;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let pencilColorAll = document.querySelectorAll('.pencil-color');
let pencilWidthElem = document.querySelector('.pencil-width');
let eraserSizeElem = document.querySelector('.eraser-size');

let pencilColor = 'black';
let pencilWidth = '3';
let eraserSize = '3';
let eraserColor = 'white';

let tool = canvas.getContext('2d');
tool.strokeStyle = 'black'
tool.lineWidth = '3';

canvas.addEventListener('mousedown', function (e) {
    mousedown = true;
    beginPath({
        x: e.clientX,
        y:e.clientY
    })
})
canvas.addEventListener('mousemove', function (e) {
    if (mousedown)
        drawPath({
            x: e.clientX,
            y: e.clientY
        })
})
canvas.addEventListener('mouseup', function () {
    mousedown = false;
})

function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawPath(strokeObj) {
    tool.lineTo(strokeObj.x, strokeObj.y)
    tool.stroke();
}

pencilColorAll.forEach(function (colorElem) {
    colorElem.addEventListener('click', function (e) {
        let color = colorElem.classList[0];
        pencilColor = color;

        if (pencilColor ==='yellow')
            tool.strokeStyle = '#e68d19';
        else
            tool.strokeStyle = pencilColor;
    })
})

pencilWidthElem.addEventListener('change', function (e) {
    pencilWidth = pencilWidthElem.value;
    tool.lineWidth = pencilWidth;
})

eraserSizeElem.addEventListener('change', function(){
    eraserSize=eraserSizeElem.value;
    tool.lineWidth = eraserSize;
})

eraser.addEventListener('click', function () {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserSize;
    } else {
        tool.strokeStyle = pencilColor;
        tool.lineWidth = pencilWidth;
    }
})
