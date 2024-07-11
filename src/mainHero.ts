import { Application, Graphics } from 'pixi.js';
import { Yard } from './yard';

export class MainHero {
    private mainHero: Graphics;
    private speed: number;
    private targetX: number;
    private targetY: number;

    constructor(app: Application, yard: Yard) {
        this.mainHero = new Graphics()
            .circle(0, 0, 50)
            .fill(0xFF0000);

        const { width, height } = app.screen;
        const { width: mainHeroWidth, height: mainHeroHeight } = this.mainHero.getSize()

        this.mainHero.x = Math.min(yard.right , Math.random() * width) + mainHeroWidth;
        this.mainHero.y = Math.min(yard.bottom , Math.random() * height) + mainHeroHeight;

        app.stage.addChild(this.mainHero);

        this.speed = 2.5;
        this.targetX = this.mainHero.x;
        this.targetY = this.mainHero.y;
    }

    public moveTo(x: number, y: number): void {
        this.targetX = x;
        this.targetY = y;
    }

    public update(): void {
        const dx = this.targetX - this.mainHero.x;
        const dy = this.targetY - this.mainHero.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.speed) {
            this.mainHero.x += (dx / distance) * this.speed;
            this.mainHero.y += (dy / distance) * this.speed;
        }
    }

    public get x(): number {
        return this.mainHero.x;
    }

    public get y(): number {
        return this.mainHero.y;
    }
}
