let canvas = document.querySelector('canvas');
let mousedown = false;
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let pencilColorAll = document.querySelectorAll('.pencil-color');
let pencilWidthElem = document.querySelector('.pencil-width');
let eraserSizeElem = document.querySelector('.eraser-size');
let newPage = document.querySelector('.delete');


let pencilColor = 'black';
let pencilWidth = '3';
let eraserSize = '5';
let eraserColor = 'white';

let tool = canvas.getContext('2d');
tool.strokeStyle = 'black'
tool.lineWidth = '3';

let undoRedoTracker = [];
let track = 0;

    undoRedoTracker.push(tool.getImageData(0, 0, canvas.width, canvas.height));
    track = undoRedoTracker.length - 1;


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
canvas.addEventListener('mouseup', function (e) {
    mousedown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(tool.getImageData(0,0,canvas.width,canvas.height));
    track = undoRedoTracker.length-1;
})

undo.addEventListener('click', function () {
    if (track > 0) {
        track--;
        let trackObj = {
            trackValue: track,
            undoRedoTracker
        }
        undoRedoCanvas(trackObj);
    }

})
redo.addEventListener('click', function () {
    if (track < undoRedoTracker.length - 1)
        track++;
        let trackObj = {
            trackValue: track,
            undoRedoTracker
        }
        undoRedoCanvas(trackObj);
})

function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    tool.putImageData(undoRedoTracker[track], 0, 0);
    // let url = undoRedoTracker[track];
    // let img = new Image();//instance of the image object;
    // img.src = url;
    // img.onload = (e) => {
    //     tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    // }
}

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
        tool.lineWidth = pencilWidth;

        if (pencilColor ==='yellow')
            tool.strokeStyle = '#e68d19';
        else
            tool.strokeStyle = pencilColor;
    })
})

pencilWidthElem.addEventListener('change', function (e) {
    pencilWidth = pencilWidthElem.value;
    tool.lineWidth = pencilWidth;
    tool.strokeStyle = pencilColor;
})

eraserSizeElem.addEventListener('change', function(){
    eraserSize=eraserSizeElem.value;
    tool.lineWidth = eraserSize;
    tool.strokeStyle = eraserColor;
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

download.addEventListener('click', function () {
    let url = canvas.toDataURL();

    let a = document.createElement('a');
    a.href = url;
    a.download ='canvas.jpg';
    a.click();
})

newPage.addEventListener('click', function (e) {
    tool.fillStyle = 'white';
    // tool.clearRect(0, 0, canvas.width, canvas.height);
    tool.fillRect(0, 0, canvas.width, canvas.height);

    undoRedoTracker = [];
    track = 0;

    undoRedoTracker.push(tool.getImageData(0, 0, canvas.width, canvas.height));
    track = undoRedoTracker.length - 1;
})