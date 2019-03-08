import {ComponentController} from "../component/ComponentController";
import {Entity} from "aframe";
import {AbstractFeature} from "./AbstractFeature";

export interface ConstructFeature {
    (controller: ComponentController, entity: Entity): AbstractFeature
}