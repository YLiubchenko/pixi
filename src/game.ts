import { Application } from 'pixi.js';
import { Animal } from './animal';
import { Yard } from './yard';
import { Score } from './score';
import { MainHero } from './mainHero';

export class Game {
    private app: Application;
    private mainHero: MainHero;
    private animals: Animal[] = [];
    private yard: Yard;
    private score: Score;
    private animalCount: number;

    constructor(app: Application) {
        this.app = app;
        this.yard = new Yard(this.app);
        this.mainHero = new MainHero(this.app, this.yard);
        this.score = new Score(this.app);

        this.animalCount = Math.ceil(Math.random() * 5 + 5);


        for (let i = 0; i < this.animalCount; i++) {
            this.animals.push(new Animal(this.app));
        }

        this.app.stage.on('pointerdown', (event) => {
            const { clientX, clientY } = event;

            this.mainHero.moveTo(clientX, clientY);
        });
    }

    public start(): void {
        this.app.ticker.add(() => this.update());
    }

    private update(): void {
        this.mainHero.update();

        const followingAnimalsCount = this.animals.filter(animal => animal.isFollowing).length;

        for (let animal of this.animals) {

            if (!animal.isInYard) {
                animal.update(this.mainHero, followingAnimalsCount);

                if (this.yard.checkCollision(animal)) {
                    this.score.increment();

                    animal.isInYard = true;
                    animal.isFollowing = false;

                    const newAnimal = new Animal(this.app);
                    this.animals.push(newAnimal);
                }
            }
        }
    }
}
