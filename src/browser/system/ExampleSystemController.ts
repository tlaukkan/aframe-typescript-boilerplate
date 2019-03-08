import {Scene, System} from "aframe";
import {AbstractSystemController} from "./AbstractSystemController";
import {SystemControllerDefinition} from "./SystemControllerDefinition";

export class ExampleSystemController extends AbstractSystemController {

    public static DEFINITION = new SystemControllerDefinition(
        "example",
        {},
        (system: System, scene: Scene, data: any) =>
            new ExampleSystemController(system, scene, data)
    );

    constructor(system: System, scene: Scene, data: any) {
        super(system, scene, data);
    }

    init(): void {
    }

    pause(): void {
    }

    play(): void {
    }

    tick(time: number, timeDelta: number): void {
    }

}


