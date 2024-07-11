import { Graphics, Application } from 'pixi.js';
import { MainHero } from './mainHero';
import { MAX_ANIMALS_IN_GROUP } from './constants';

export class Animal {
    private animal: Graphics;
    private app: Application;
    public isFollowing: boolean;
    public isInYard: boolean;

    constructor (app: Application) {
        this.app = app;
        this.animal = new Graphics()
            .circle(0, 0, 30)
            .fill('white');
        this.isFollowing = false;
        this.isInYard = false;

        this.resetPosition();

        app.stage.addChild(this.animal);
    }

    public update(mainHero: MainHero, followingAnimalsCount: number): void {

        if (this.isFollowing || (followingAnimalsCount < MAX_ANIMALS_IN_GROUP && this.shouldFollow(mainHero))) {
            this.isFollowing = true;
            const { x, y } = mainHero;

            const dX = x - this.animal.x;
            const dY = y - this.animal.y;
            const distance = Math.sqrt(dX * dX + dY * dY);

            if (distance > 1) {
                this.animal.x += dX / distance * 2;
                this.animal.y += dY / distance * 2;
            }
        }
    }

    private shouldFollow(mainHero: MainHero): boolean {
        const { x, y } = mainHero;
        const dX = x - this.animal.x;
        const dY = y - this.animal.y;

        const distance = Math.sqrt(dX * dX + dY * dY);

        return distance < 100;
    }

    public resetPosition(): void {
        const {width: animalWidth, height: animalHeight } = this.animal.getSize()

        const {width, height} = this.app.screen
        const [x, y] = [Math.random() * width, Math.random() * height];

        this.animal.x = x + animalWidth > width ? width - animalWidth : x;
        this.animal.y = y + animalHeight > height ? height - animalHeight : y;

        this.isFollowing = false;
        this.isInYard = false;
    }

    get x (): number {
        return this.animal.x;
    }

    get y (): number {
        return this.animal.y;
    }

    get width (): number {
        return this.animal.width;
    }

    get height (): number {
        return this.animal.height;
    }
}
