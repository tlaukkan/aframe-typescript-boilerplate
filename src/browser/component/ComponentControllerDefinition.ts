import {ConstructFeature} from "../feature/ConstructFeature";
import {ConstructComponentController} from "./ConstructComponentController";

export class ComponentControllerDefinition {
    readonly componentName: string;
    readonly schema: any;
    readonly multiple: boolean;
    readonly tick: boolean;
    readonly constructComponentController: ConstructComponentController;
    readonly features: Array<ConstructFeature> = [];

    constructor(componentName: string, schema: any, multiple: boolean, tick: boolean, constructComponentController: ConstructComponentController) {
        this.componentName = componentName;
        this.schema = schema;
        this.multiple = multiple;
        this.tick = tick;
        this.constructComponentController = constructComponentController;
    }

    add(feature: ConstructFeature): ComponentControllerDefinition {
        this.features.push(feature);
        return this;
    }
}