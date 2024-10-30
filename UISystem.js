

export class UIElement {
    constructor(name, pathImage, Areas = []){
        this.name = name;
        this.Image = new Image();
        this.Image.src = pathImage;
        this.Areas = Areas;
    }

    handleClick(x, y) {
        for (let region of this.Areas) {
            if (
                x >= region.x && x <= region.x + region.width &&
                y >= region.y && y <= region.y + region.height
            ) {
                region.onClick(); // Call the onClick function if within region
                return true;
            }
        }
        return false;
    }

    addArea(x, y, w, h, callback){
        if(typeof(callback) != "function" ){
            console.error(`${callback} is not a function`)
        }
    }

}













class UISystem{
    constructor(){
        this.UIElements = []
    }
}