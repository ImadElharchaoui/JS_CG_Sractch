
const canvas = document.querySelector(".canvas");

canvas.width = 400; 
canvas.height = 400; 


const ctx = canvas.getContext("2d");


function drawSquare(x, y, color, h=2, w=2) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, h, w);
}

// Draw the pixel
drawSquare(5, 2, "black");
