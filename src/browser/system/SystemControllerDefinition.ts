import {ConstructSystemController} from "./ConstructSystemController";

export class SystemControllerDefinition {
    readonly systemName: string;
    readonly schema: any;
    readonly constructSystemController: ConstructSystemController;

    constructor(systemName: string, schema: any, constructSystemController: ConstructSystemController) {
        this.systemName = systemName;
        this.schema = schema;
        this.constructSystemController = constructSystemController;
    }
}