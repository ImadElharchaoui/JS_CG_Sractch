
const keysPressed = {};

// Initializes the input listeners
export function initInputSystem() {
    document.addEventListener("keydown", (event) => {
        keysPressed[event.key] = true;
    });

    document.addEventListener("keyup", (event) => {
        keysPressed[event.key] = false;
    });
}

// Returns whether a specific key is currently pressed
export function isKeyPressed(key) {
    return keysPressed[key];
}
