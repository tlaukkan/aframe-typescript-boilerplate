import {AbstractFeature} from "../feature/AbstractFeature";
import {Entity, Component} from "aframe";
import {AbstractComponentController} from "./AbstractComponentController";

/**
 * Enabled composing one component from many features which can encapsulate same functionality as components.
 */
export class CompositeComponentController extends AbstractComponentController {

    features: Array<AbstractFeature> = [];

    constructor(component: Component, entity: Entity, data: any) {
        super(component, entity, data);
    }

    init(): void {
        this.features.forEach(controller => {
            controller.init();
        });
    }

    update(data: any, oldData: any): void {
        this.features.forEach(controller => {
            controller.update(data, oldData);
        });
    }

    remove(): void {
        this.features.forEach(controller => {
            controller.remove();
        });
    }

    pause(): void {
        this.features.forEach(controller => {
            controller.pause();
        });
    }

    play(): void {
        this.features.forEach(controller => {
            controller.play();
        });
    }

    tick(time: number, timeDelta: number): void {
        this.features.forEach(controller => {
            controller.tick(time, timeDelta);
        });
    }

    addFeature(feature: AbstractFeature) {
        this.features.push(feature);
    }

}


