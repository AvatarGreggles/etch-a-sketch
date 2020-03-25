// Select the elements on the page, canvas, shake buttons
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const increasebutton = document.querySelector('.increaseSize');
const decreasebutton = document.querySelector('.decreaseSize');
const MOVE_AMOUNT = 10;
let lineWidth = 10;

// Setup our canvas for drawing
const { width, height } = canvas;

//Create random X and Y coordinates
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = lineWidth;

let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%, 50%)`;
ctx.beginPath();// start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function
function draw({ key }) {
    hue += 10;
    ctx.strokeStyle = `hsl(${hue},100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    // move our x and y values depending on what the user did
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}


// Write a handler for the keys
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key })
    }
}


// Clear / shake function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', function () {
        canvas.classList.remove('shake');
    }, { once: true });
}
//Increase the stroke size
function increaseSize() {
    ctx.lineWidth += 5;
    ctx.stroke();
}

//Decrease the stroke size
function decreaseSize() {
    ctx.lineWidth -= 5;
    ctx.stroke();
}


// listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas)
increasebutton.addEventListener('click', increaseSize)
decreasebutton.addEventListener('click', decreaseSize)
