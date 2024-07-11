import { BitmapText, Application } from 'pixi.js';

export class Score {
    private text: BitmapText;
    private value: number;

    constructor(app: Application) {
        this.value = 0;

        this.text = new BitmapText({
            text: `Score: 0`,
            style: {
                fontSize: 25,
            },
            tint: 0x000000
        });

        this.text.anchor.set(0.5, 0);
        this.text.x = app.screen.width / 2;

        app.stage.addChild(this.text);
    }

    public increment(): void {
        this.value += 1;
        this.text.text = `Score: ${this.value}`;
    }
}
