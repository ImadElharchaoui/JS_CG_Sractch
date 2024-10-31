export class UIElement {
    constructor(name, pathImage, Areas = [{}]) {
        this.name = name;
        this.Image = new Image();
        this.Image.src = pathImage;
        this.Areas = [Areas];
    }

    handleClick(x, y) {
        for (let region of this.Areas) {
            if (
                x >= region.x && x <= region.x + region.w &&
                y >= region.y && y <= region.y + region.h
            ) {
                console.log("a", this.Image.width)
                region.onClick(this.Image); // Call the onClick function if within region
                return true;
            }
        }
        return false;
    }

    addArea(x, y, w, h, name, callback) {
        if (typeof(callback) !== "function") {
            console.error(`${callback} is not a function`);
            return;
        }
        this.Areas.push({ name: name, x: x, y: y, w: w, h: h, onClick: callback });
    }

    draw(ctx) {
        
        ctx.drawImage(this.Image, 5, 5, this.Image.width, this.Image.height);
    }
}

export class UISystem {
    constructor(canvas) {
        this.UIElements = [];
        this.ctx = canvas.getContext("2d");

        // Set up click event listener
        canvas.addEventListener("click", (e) => this.handleCanvasClick(e));
    }

    addUiToSystem(UIElement) {
        this.UIElements.push(UIElement);
    }

    draw() {
        this.UIElements.forEach(element => element.draw(this.ctx));
    }

    handleCanvasClick(event) {
        const rect = this.ctx.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Check each UI element to see if it was clicked
        for (let element of this.UIElements) {
            if (element.handleClick(x, y)) {
                break; // Stop checking once a click is handled
            }
        }
    }
}
