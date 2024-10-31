import { Colour, Vector3D } from "./Types";
import { Scene } from "./scenes";
import { Cube } from "./objectsItems.js";


const Thescene = new Scene();




const AcubePosition = new Vector3D(0, 0, 5);
const AcubeColor = new Colour(255, 0, 0);
const AcubeScale = 2;
const AcubeRotation = new Vector3D(0, 0, 0);

//Thescene.AddItem(new Cube(AcubePosition, AcubeColor, AcubeScale, AcubeRotation));


export default Thescene;



