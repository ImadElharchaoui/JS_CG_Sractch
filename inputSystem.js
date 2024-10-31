
const keysPressed = {};

// Initializes the input listeners
export function initInputSystem() {
    document.addEventListener("keydown", (event) => {
        keysPressed[event.key.toLowerCase()] = true;
    });

    document.addEventListener("keyup", (event) => {
        keysPressed[event.key.toLowerCase()] = false;
    });
}

// Returns whether a specific key is currently pressed
export function isKeyPressed(key) {
    return keysPressed[key];
}
