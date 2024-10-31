import { WINDOW_HIGH, WINDOW_WIDTH } from "./config";
import Thescene from "./TestScene";
import { initInputSystem, isKeyPressed } from "./inputSystem";
import { Vector3D } from "./Types";
import { SoundSystem } from "./soundSystem";
import { UIElement, UISystem } from "./UISystem";
import { OBJLoader } from "./loadObj"; // Import the OBJLoader

const canvas = document.querySelector(".canvas");
const FPS_display = document.querySelector(".FPS_display");

canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HIGH;

const ctx = canvas.getContext("2d");

const soundSystem = new SoundSystem();
const Uisystem = new UISystem(canvas);

const Healthbar = new UIElement("health", "./materiels/images/healthBar.png", {
    name: "console",
    x: 0,
    y: 0,
    w: 500,
    h: 500,
    onClick: (image) => {
        if (image instanceof Image) {  // Ensure it's an Image object
            image.width *= 0.75;  // Scale down width by 25%
            console.log("New image dimensions:", image.width, image.height);
        } else {
            console.error("onClick did not receive an Image object.");
        }
    }
});

// Wait for the Healthbar image to load before adding to UI system
Healthbar.Image.onload = () => {
    console.log("Healthbar image loaded");
    Uisystem.addUiToSystem(Healthbar);
    Uisystem.draw(); // Draw UI elements after loading the image
};

function drawTriangle([x1, y1], [x2, y2], [x3, y3], color = "#FF0000") {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color;
    ctx.stroke();
}

async function initSoundSystem() {
    await soundSystem.addSound("background", "./materiels/sounds/MusicBackground.mp3");
    soundSystem.playLoop("background");
}

let lastFrameTime = 0;
let frameCount = 0;
let fps = 0;

async function initAll() {
    initInputSystem();
    await initSoundSystem();
    console.log("start loadObj");
    await loadOBJModel();
    console.log("finsih loadObj")
}

async function loadOBJModel() {
    try {
        const item = await OBJLoader.load("./materiels/obj3d/batman.obj", new Vector3D(0,0,100)); // Specify your OBJ file path here
        Thescene.AddItem(item); // Add the loaded item to the scene
        console.log("Loaded OBJ Model:", item);
    } catch (error) {
        console.error("Error loading OBJ model:", error);
    }
}

function update() {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastFrameTime;

    frameCount++;
    if (deltaTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFrameTime = currentTime;
        FPS_display.textContent = `FPS: ${fps}`;
    }

    

    if (isKeyPressed("w")) {
        Thescene.Items[0].applyTransfer(new Vector3D(0, 0, 50));
    }
    if (isKeyPressed("s")) {
        Thescene.Items[0].applyTransfer(new Vector3D(0, 0, -1));
    }
    if (isKeyPressed("d")) {
        Thescene.Items[0].applyTransfer(new Vector3D(1, 0, 0));
    }
    if (isKeyPressed("a")) {
        Thescene.Items[0].applyTransfer(new Vector3D(-1, 0, 0));
    }
    if (isKeyPressed(" ")) {
        Thescene.Items[0].applyTransfer(new Vector3D(0, 1, 0));
    }


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render your 3D scene or other elements
    const Triangles = Thescene.itemsTo2D();
    
    if (Triangles.length > 0) {
        Triangles.forEach(([[x1, y1], [x2, y2], [x3, y3]]) => {
            drawTriangle([x1, y1], [x2, y2], [x3, y3]);
        });
    }


    
  

    // Draw UI elements last to render on top
    Uisystem.draw();

    requestAnimationFrame(update);
}

initAll().then(update);
