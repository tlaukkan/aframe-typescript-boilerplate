import {Entity, Component, System, Scene} from "aframe";
import {ComponentController} from "./component/ComponentController";
import {SystemController} from "./system/SystemController";
import {AbstractFeature} from "./feature/AbstractFeature";
import {CompositeComponentController} from "./component/CompositeComponentController";
import {Object3D} from "three";

interface ConstructComponentController { (component: Component, entity: Entity, data: any): ComponentController }
interface ConstructSystemController { (system: System, scene: Scene, data: any): SystemController }
interface ConstructFeature{ (controller: ComponentController, entity: Entity): AbstractFeature }

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

export function registerSystemController(definition: SystemControllerDefinition) {
    if (typeof AFRAME !== 'undefined') {
        AFRAME.registerSystem(definition.systemName, {
            schema: definition.schema,
            init: function () {
                (this as any).controller = definition.constructSystemController(this as Component, (this as any)!!.el, this.data);
                //console.log(definition.systemName + " system init");
                (this as any).controller.init();
            },
            tick: function (time: number, timeDelta: number) {  (this as any).controller.tick(time, timeDelta); },
            pause: function () {
                //console.log(definition.systemName + " system pause");
                (this as any).controller.pause();
            },
            play: function () {
                //console.log(definition.systemName + " system play");
                (this as any).controller.play();
            }
        });
    }
}

export function registerComponentController(definition: ComponentControllerDefinition) {
    if (typeof AFRAME !== 'undefined') {
        if (definition.tick) {
            AFRAME.registerComponent(definition.componentName, {
                schema: definition.schema,
                multiple: definition.multiple,
                init: function () {
                    const controller = definition.constructComponentController(this as Component, this.el!!, this.data);

                    (this as any).controller = controller;

                    if ((controller as CompositeComponentController).addFeature) {
                        const compositeController = controller as CompositeComponentController;
                        for (const feature of definition.features) {
                            compositeController.addFeature(feature(compositeController, controller.entity));
                        }
                    } else {
                        if (definition.features.length > 0) {
                            throw new Error("Attempt to add features to non composite component controller: " + definition.componentName);
                        }
                    }

                    (this as any).controller.init();
                },
                update: function (oldData) {
                    (this as any).controller.setData(this.data);
                    (this as any).controller.update(this.data, oldData);
                },
                remove: function () {
                    (this as any).controller.remove();
                },
                tick: function (time: number, timeDelta: number) {
                    (this as any).controller.tick(time, timeDelta);
                },
                pause: function () {
                    (this as any).controller.pause();
                },
                play: function () {
                    (this as any).controller.play();
                }
            });
        } else {
            AFRAME.registerComponent(definition.componentName, {
                schema: definition.schema,
                multiple: definition.multiple,
                init: function () {
                    (this as any).controller = definition.constructComponentController(this as Component, this.el!!, this.data);
                    (this as any).controller.init();
                },
                update: function (oldData) {
                    (this as any).controller.setData(this.data);
                    (this as any).controller.update(this.data, oldData);
                },
                remove: function () {
                    (this as any).controller.remove();
                },
                pause: function () {
                    (this as any).controller.pause();
                },
                play: function () {
                    (this as any).controller.play();
                }
            });
        }
    }
}

export function getSystemController<C extends SystemController>(scene: Scene, systemName: string): C {
    if (!scene) {
        throw new Error("Scene is undefined.");
    }
    if (!scene.systems) {
        throw new Error("Scene systems is undefined.");
    }


    const system = scene.systems[systemName];
    if (!system) {
        throw new Error("System is not registered to scene: " + system);
    }

    return (system as any).controller;
}

export function getComponentController<C extends ComponentController>(entity:Entity, componentName: string): C | undefined {
    const component = entity.components[componentName];

    if (!component) {
       return undefined;
    }

    return (component as any).controller;
}

export function createElement(html: string) : Element {
    const template = document.createElement('div');
    template.innerHTML = html.trim();
    return (template as any).firstChild;
}

export function addEntityEventListener(entity: Entity, type: string, listener: ((detail: any) => void)) {
    entity.addEventListener(type, ((e: CustomEvent) => {
        listener(e.detail);
    }) as any);
}

export function addDocumentEventListener(type: string, listener: ((detail: any) => void)) {
    document.addEventListener(type, ((e: CustomEvent) => {
        listener(e.detail);
    }) as any);
}

export function getEntity(object: Object3D): Entity | undefined {
    if ((object as any).el) {
        return (object as any).el;
    }
    let parentObject: Object3D | undefined = undefined;
    object.traverseAncestors((a: Object3D) => {
        if (parentObject === undefined && (a as any).el) {
            parentObject = a;
        }
    });
    if (parentObject) {
        return (parentObject as any).el
    }
    return undefined;
}