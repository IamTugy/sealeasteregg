import Phaser from 'phaser';
var isJump = false;
var timer = null;
var backgroundTile = null;
class GameEnd extends Phaser.Scene {
  constructor() {
    super('GameEnd');
  }


  init(data) {
    console.log("game end init" + data.score + " hs:" + data.highscore);
    this.score = data.score;
    this.highscore = data.highscore;
  }

  preload() {
    this.load.image('logo', 'assets/ecoflow_logo.png');
    this.load.image('play', 'assets/play.png');

    this.load.audio('jump', 'assets/jump.m4a');
    this.load.audio('hit', 'assets/hit.m4a');
    this.load.audio('reach', 'assets/reach.m4a');

    this.load.image('ground', 'assets/ground.png');
    // this.load.image('dino-idle', 'assets/dino-idle.png');
    // this.load.image('dino-hurt', 'assets/dino-hurt.png');
    this.load.image('restart', 'assets/restart.png');
    this.load.image('game-over', 'assets/game-over.png');
    // this.load.image('cloud', 'assets/cloud.png');

    this.load.spritesheet('star', 'assets/stars.png', {
      frameWidth: 9,
      frameHeight: 9,
    });

    this.load.spritesheet('moon', 'assets/moon.png', {
      frameWidth: 20,
      frameHeight: 40,
    });


    // new
    this.load.image('obsticle-1', 'assets/coffe_cup.png');
    this.load.image('obsticle-2', 'assets/spoon.png');
    this.load.image('obsticle-3', 'assets/coffe_cup.png');
    this.load.image('obsticle-4', 'assets/spoon.png');
    this.load.image('obsticle-5', 'assets/coffe_cup.png');
    this.load.image('obsticle-6', 'assets/coffe_cup.png');

    this.load.image('gameover', 'assets/gameover.png');

    this.load.image('background', 'assets/background.jpg');

    this.load.spritesheet('jug_duck', 'assets/jug_duck.png', {
      frameWidth: 315,
      frameHeight: 280,
    });
    this.load.spritesheet('jug_run', 'assets/jug_run.png', {
      frameWidth: 290,
      frameHeight: 352,
    });
  }

  create() {

    const { height, width } = this.game.config;
    console.log("this.highscore:" + this.highscore)
    console.log("this.score:" + this.score)

    this.gameOverScreen = this.add.container(width / 2, height / 2 - 50).setAlpha(1);
    this.gameOverText = this.add.image(0, 0, 'gameover').setScale(0.25).setOrigin(0.5);

    this.highscore = Math.max(this.score, this.highscore)

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;


    this.highScoreText = this.add.text(screenCenterX, 350, 'High Score: ' + this.highscore, { fill: '#535353', font: '900 35px Courier', resolution: 5 }).setOrigin(0.5);
    this.scoreText = this.add.text(screenCenterX, 400, 'Score: ' + this.score, { fill: '#535353', font: '900 35px Courier', resolution: 5 }).setOrigin(0.5);

    this.restart = this.add.image(0, 80, 'restart').setInteractive();
    this.gameOverScreen.add([this.gameOverText, this.restart]);


    this.restart.on('pointerdown', () => {
      this.scene.stop();
      this.game.scene.start('PlayScene', { highscore: this.highscore });
    });
  }

}

export default GameEnd;
