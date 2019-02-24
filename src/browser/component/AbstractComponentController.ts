import {ComponentController} from "./ComponentController";
import {Component, Entity, Scene} from "aframe";
import {SystemController} from "../system/SystemController";

/**
 * Abstract base class for component implementations.
 */
export abstract class AbstractComponentController implements ComponentController {
    readonly componentName: string;
    readonly entity: Entity;
    readonly scene: Scene;
    readonly component: Component;
    data: any;

    protected constructor(component: Component, entity: Entity, data: any) {
        this.componentName = component.name;
        this.entity = entity;
        this.scene = entity.sceneEl!;
        this.data = data;
        this.component = component;
    }

    setData(data: any): void {
        this.data = data;
    }

    abstract init(): void;

    abstract update(data: any, oldData: any): void;

    abstract remove(): void;

    abstract pause(): void;

    abstract play(): void;

    abstract tick(time: number, timeDelta: number): void;

    getSystemController<C extends SystemController>(systemName: string): C {
        if (!this.entity.sceneEl) {
            throw new Error("Scene is undefined.");
        }

        const system = this.entity.sceneEl.systems[systemName];
        if (!system) {
            throw new Error("System is not registered to scene: " + system);
        }

        return (system as any).controller;
    }

    getComponentController<C extends ComponentController>(componentName: string): C {
        const component = this.entity.components[componentName];
        if (!component) {
            throw new Error("Component is not registered to entity: " + componentName);
        }

        return (component as any).controller;
    }

    addEventListener(type: string, listener: ((detail: any) => void)) {
        this.entity.addEventListener(type, ((e: CustomEvent) => {
            listener(e.detail);
        }) as any);
    }

    dispatchEvent(eventType: string, detail: any) {
        this.entity.dispatchEvent(new CustomEvent(eventType, { detail: detail } ));
    }
}