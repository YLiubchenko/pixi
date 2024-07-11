import { Application } from 'pixi.js';
import { Game } from './game';
import './styles.css';


const app = new Application();

(async () => {
    await app.init({background: 0X97ea97, resizeTo: window});

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;

    document.body.appendChild(app.canvas);

    const game = new Game(app);

    game.start();
})()

