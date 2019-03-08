import {Scene, System} from "aframe";
import {SystemController} from "./SystemController";

export interface ConstructSystemController {
    (system: System, scene: Scene, data: any): SystemController
}