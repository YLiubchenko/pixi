import { Graphics, Application } from 'pixi.js';
import { Animal } from './animal';
import {YARD_SIZE} from "./constants";

export class Yard {
    private yard: Graphics;

    constructor(app: Application) {
        this.yard = new Graphics()
            .rect(0, 0, YARD_SIZE.width, YARD_SIZE.height)
            .fill(0xEAEA4A);

        app.stage.addChild(this.yard);
    }

    public checkCollision(animal: Animal): boolean {
        const { x: animalX, y: animalY, width: animalWidth, height: animalHeight } = animal;
        const { width: yardWidth, height: yardHeight } = this.yard.getBounds();

        return animalX + animalWidth / 2 < yardWidth && animalY + animalHeight / 2 < yardHeight;
    }

    public get right (): number {
        return this.yard.getBounds().right
    }

    public get bottom (): number {
        return this.yard.getBounds().bottom
    }
}
