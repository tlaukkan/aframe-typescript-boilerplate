import {Component, Entity} from "aframe";
import {AbstractComponentController} from "./AbstractComponentController";
import {ComponentControllerDefinition} from "../index";

export class ExampleController extends AbstractComponentController {

    public static DEFINITION = new ComponentControllerDefinition(
        /* Name */ "example",
        /* Schema */ {},
        /* Multiple */ false,
        /* Receive ticks */ false,
        /* Factory function */ (component: Component, entity: Entity, data: any) =>
            new ExampleController(component, entity, data));

    constructor(component: Component, entity: Entity, data: any) {
        super(component, entity, data);
    }

    init(): void {}

    update(data: any, oldData: any): void {}

    remove(): void {}

    pause(): void {}

    play(): void {}

    tick(time: number, timeDelta: number): void {}

}


