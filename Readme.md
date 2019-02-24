# A-Frame Typescript Boilerplate Readme

Provides boilerplate classes for placing A-Frame systems and components logic to Typescript classes called controllers.

# Usage

Example component controller:

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


Registering controller classes:

    registerSystemController(ExampleSystemController.DEFINITION);
    registerComponentController(ExampleController.DEFINITION);
    registerComponentController(ExampleCompositeController.DEFINITION.add(ExampleFeature.DEFINITION));

# Build

## Karma

karma start karma.config.js  --browsers ChromeHeadless

# Publish package

## First publish

---
    npm publish --access public
---

## Update

---
    npm version patch
    npm publish
---
