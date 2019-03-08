import {Component, Entity} from "aframe";
import {ComponentController} from "./ComponentController";

export interface ConstructComponentController {
    (component: Component, entity: Entity, data: any): ComponentController
}