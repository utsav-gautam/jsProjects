let optionflag = true;
let pencilFlag = false;
let eraserFlag = false;


let pencilToolCont = document.querySelector('.pencil-tool-cont');
let eraserSizeCont = document.querySelector('.eraser-size-cont');
let pencil = document.querySelector('.pencil');
let eraser = document.querySelector('.eraser');
let toolCont = document.querySelector('.tools-cont');
let optionsCont = document.querySelector('.options-cont');
let stickyCont = document.querySelector('.stickynote')
let upload = document.querySelector('.upload')
optionsCont.addEventListener('click', (e) => {
    optionflag = !optionflag;
    if (optionflag) toolOpen()
    else toolClose();
})
pencil.addEventListener('click', (e) => {
    pencilFlag = !pencilFlag;

    if (pencilFlag) {
        pencilToolCont.style.display = 'block';
    } else {
        pencilToolCont.style.display = 'none';
    }
})
eraser.addEventListener('click', (e) => {
    eraserFlag = !eraserFlag;

    if (eraserFlag) {
        eraserSizeCont.style.display = 'flex';
    } else {
        eraserSizeCont.style.display = 'none';
    }
})

upload.addEventListener('click', (e) => {
    let input = document.createElement('input');
    input.setAttribute('type', 'file')
    input.click();

    input.addEventListener('change', (e) => {
        let file = input.files[0];
        let filePath = URL.createObjectURL(file);
        let stickyTemplate=`<div class="header-cont">
            <i class="minimise fa-solid fa-window-minimize"></i>
            <i class="close fa-solid fa-xmark"></i>
            </div>
            <div class="note-cont">
                <img src="${filePath}"/>
            </div>`;
        createSticky(stickyTemplate);

    })
})
stickyCont.addEventListener('click', (e) => {
    let stickyTemplate = `<div class="header-cont">
            <i class="minimise fa-solid fa-window-minimize"></i>
            <i class="close fa-solid fa-xmark"></i>
            </div>
            <div class="note-cont">
                <textarea class='textarea' spellcheck='false'></textarea>
            </div>`;
    createSticky(stickyTemplate);
    
    
})
function toolOpen() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove('fa-times');
    iconElem.classList.add('fa-bars');
    toolCont.style.display = 'flex';
}

function toolClose() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.add('fa-times');
    iconElem.classList.remove('fa-bars');
    toolCont.style.display = 'none';
    pencilToolCont.style.display = 'none';
    eraserSizeCont.style.display = 'none';
}

function dragAndDrop(element, event) {
        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;

        element.style.position = 'absolute';
        element.style.zIndex = 1000;

        moveAt(event.pageX, event.pageY);

        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the ball, remove unneeded handlers
        element.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            element.onmouseup = null;
        };
}

function noteActions(minimise, close, stickyContDiv) {
    close.addEventListener('click', (e)=>{
        stickyContDiv.remove();
    })
    minimise.addEventListener('click', (e)=>{
        let noteCont = stickyContDiv.querySelector('.note-cont');
        let display = getComputedStyle(noteCont).getPropertyValue('display')
        if (display==='none')
            noteCont.style.display ='block'
        else
            noteCont.style.display='none'
    })
}

function createSticky(stickyTemplate) {
        let stickyContDiv = document.createElement('div');
        stickyContDiv.setAttribute('class', 'sticky-cont');
        stickyContDiv.innerHTML = stickyTemplate;
        document.body.appendChild(stickyContDiv);

        let minimise = stickyContDiv.querySelector('.minimise');
        let close = stickyContDiv.querySelector('.close');

        noteActions(minimise, close, stickyContDiv);

        stickyContDiv.onmousedown = function (event) {
            dragAndDrop(stickyContDiv, event);
        }

        stickyContDiv.ondragstart = function () {
            return false;
        }
}