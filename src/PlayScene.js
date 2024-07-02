import Phaser from 'phaser';
var isJump = false;
var timer = null;
var backgroundTile = null;
class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }


  init(data) {
    this.highscore = data.highscore || 0;
    console.log("game scene init; highscore: " + this.highscore)
  }


  preload() {
    this.load.image('logo', 'assets/ecoflow_logo.png');
    this.load.image('play', 'assets/play.png');

    this.load.audio('jump', 'assets/jump.m4a');
    this.load.audio('hit', 'assets/hit.m4a');
    this.load.audio('reach', 'assets/reach.m4a');

    // this.load.image('ground', 'assets/ground.png');
    // this.load.image('dino-idle', 'assets/dino-idle.png');
    // this.load.image('dino-hurt', 'assets/dino-hurt.png');
    // this.load.image('cloud', 'assets/cloud.png');


    // new
    this.load.image('obsticle-1', 'assets/CVE-2018-12035.png');
    this.load.image('obsticle-2', 'assets/spoon.png');
    this.load.image('obsticle-3', 'assets/coffe_cup.png');
    this.load.image('obsticle-4', 'assets/CVE-2019-9950.png');
    this.load.image('obsticle-5', 'assets/coffe_cup.png');
    this.load.image('obsticle-6', 'assets/coffe_cup.png');


    this.load.image('background', 'assets/seal_bg.png');

    this.load.spritesheet('jug_duck', 'assets/jug_duck.png', {
      frameWidth: 315,
      frameHeight: 280,
    });
    this.load.spritesheet('jug_run', 'assets/seal_character.png', {
      frameWidth: 320,
      frameHeight: 320,
    });
  }

  create() {

    isJump = false;

    const { height, width } = this.game.config;
    this.gameSpeed = 10;
    this.isGameRunning = false;
    this.respawnTime = 0;
    this.score = 0;

    this.jumpSound = this.sound.add('jump', { volume: 0.2 });
    this.hitSound = this.sound.add('hit', { volume: 0.2 });
    this.reachSound = this.sound.add('reach', { volume: 0.2 });

    this.startTrigger = this.physics.add.sprite(0, 10).setOrigin(0, 1).setImmovable();
    this.ground = this.add.tileSprite(0, height, 88, 26).setOrigin(0, 1);
    this.dino = this.physics.add.sprite(0, height, 'jug_run', 0).setCollideWorldBounds(true).setGravityY(3000).setDepth(1).setOrigin(0, 1);
    this.dino.body.setSize(this.dino.width - 100, this.dino.height);
    // console.log(this.dino.body); // 66, 123
    // setBodySize(44, 92)
    this.dino.setScale(0.5);

    const screenTopLeftX = this.cameras.main.worldView.x + this.cameras.main.width - 90;
    const screenTopLeftY = 35;
    this.scoreText = this.add.text(screenTopLeftX, screenTopLeftY, this.score, { fill: '#535353', font: '900 35px Courier', resolution: 5 }).setOrigin(0.5);

    backgroundTile = this.add.tileSprite(640, 300, 1280, 600, 'background').setScale(1).setDepth(-1);
    // background.setScrollFactor(20, 1);
    this.environment = this.add.group();
    this.environment.addMultiple([this.add.image(width / 2, 170, 'cloud'), this.add.image(width - 80, 80, 'cloud'), this.add.image(width / 1.3, 100, 'cloud')]);
    this.environment.setAlpha(0);


    this.obsticles = this.physics.add.group();

    this.initAnims();
    this.initStartTrigger();
    this.initColliders();
    this.handleInputs();
    this.handleScore();
  }

  initColliders() {
    this.physics.add.collider(
      this.dino,
      this.obsticles,
      () => {
        this.scene.stop();
        var payload = { score: this.score, highscore: this.highscore }
        console.log("score: " + payload.score)
        this.game.scene.start('GameEnd', payload);
        return;

        // console.log("collided")
        // this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;

        // const highScore = this.highScoreText.text.substr(this.highScoreText.text.length - 5);
        // const newScore = Number(this.scoreText.text) > Number(highScore) ? this.scoreText.text : highScore;

        // this.highScoreText.setText('HIGH SCORE ' + newScore);
        // this.highScoreText.setAlpha(1);

        // this.physics.pause();
        // this.isGameRunning = false;
        // this.anims.pauseAll();
        // // this.dino.setTexture('dino-hurt');
        // this.respawnTime = 0;
        // this.gameSpeed = 10;
        // this.gameOverScreen.setAlpha(1);
        // this.score = 0;
        // this.hitSound.play();
      },
      null,
      this
    );
  }

  initStartTrigger() {
    // const { width, height } = this.game.config;
    // this.physics.add.overlap(
    //   this.startTrigger,
    //   this.dino,
    //   () => {
    //     if (this.startTrigger.y === 10) {
    //       this.startTrigger.body.reset(0, height);
    //       return;
    //     }

    //     this.startTrigger.disableBody(true, true);

    //     const startEvent = this.time.addEvent({
    //       delay: 1000 / 60,
    //       loop: true,
    //       callbackScope: this,
    //       callback: () => {
    //         this.dino.setVelocityX(80);
    //         this.dino.play('dino-run', true);

    //         this.isGameRunning = true;
    //         this.dino.setVelocityX(0);
    //         startEvent.remove();
    //       },
    //     });
    //   },
    //   null,
    //   this
    // );

  }

  initAnims() {
    this.anims.create({
      key: 'dino-run',
      frames: this.anims.generateFrameNumbers('jug_run', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: 'dino-down-anim',
      frames: this.anims.generateFrameNumbers('jug_duck', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  handleScore() {
    this.time.addEvent({
      delay: 1000 / 10,
      loop: true,
      callbackScope: this,
      callback: () => {
        if (!this.isGameRunning) {
          return;
        }

        this.score++;
        console.log("new score: " + this.score)
        this.gameSpeed += 0.01;

        if (this.score % 100 === 0) {
          this.reachSound.play();

          this.tweens.add({
            targets: this.scoreText,
            duration: 100,
            repeat: 3,
            alpha: 0,
            yoyo: true,
          });
        }

        const score = Array.from(String(this.score), Number);
        for (let i = 0; i < 5 - String(this.score).length; i++) {
          score.unshift(0);
        }

        this.scoreText.setText(this.score);
      },
    });
  }

  handleInputs() {

    this.input.keyboard.on('keydown_SPACE', () => {
      if (!this.isGameRunning) {
        this.isGameRunning = true
      }

      if (!this.dino.body.onFloor() || this.dino.body.velocity.x > 0) {
        return;
      }

      this.jumpSound.play();
      this.isJump = true;
      // this.dino.body.setSize(this.dino.width - 100, this.dino.height);
      this.dino.body.offset.y = 0;
      this.dino.setVelocityY(-1200);
      // this.dino.setTexture('jug_run', 0);
    });
    this.down_jump = false
    // TODO: add sprite and support 
    //   this.input.keyboard.on('keydown_DOWN', () => {
    //     if (!this.dino.body.onFloor() || !this.isGameRunning) {
    //       return;
    //     }
    //     // this.dino.play('dino-down-anim', true);
    //     this.down_jump = true
    //     // this.dino.body.height = 90;
    //     // this.dino.body.offset.y = 24;
    //   });

    //   this.input.keyboard.on('keyup_DOWN', () => {
    //     if (!this.isGameRunning) {
    //       return;
    //     }
    //     this.down_jump = false
    //     // this.dino.body.setSize(this.dino.width - 100, 124);
    //     // this.dino.body.offset.y = 0;
    //   });
  }

  placeObsticle() {
    const obsticleNum = Math.floor(Math.random() * 7) + 1;
    const distance = Phaser.Math.Between(600, 900);

    let obsticle;
    if (obsticleNum > 5) {
      console.log('flying dino');
      const enemyHeight = [80, 100];
      obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - enemyHeight[Math.floor(Math.random() * 2)], 'obsticle-4').setOrigin(0, 1);
      obsticle.body.height = obsticle.body.height / 1.5;
      obsticle.setScale(0.2);
    } else {
      obsticle = this.obsticles.create(this.game.config.width + distance, this.game.config.height - 10, 'obsticle-1').setOrigin(0, 1).setScale(4);
      // obsticle.body.offset.y = +10;
      obsticle.setScale(0.2);
      // obsticle.setImmovable();
    }
    if (this.score > 333) {
      // haha
      obsticle.setScale(1);
    }
    obsticle.setImmovable();
  }

  on_update_remove_passed_obstacles() {
    this.obsticles.getChildren().forEach((obsticle) => {
      if (obsticle.getBounds().right < 0) {
        this.obsticles.killAndHide(obsticle);
      }
    });
  }

  on_update_insert_obstacle() {
    if (this.respawnTime >= 1500) {
      this.placeObsticle();
      this.respawnTime = 0;
    }
  }

  on_update_change_animation() {
    console.log("update anims")
    if (this.down_jump) {
      console.log('dino down animation');
      this.dino.play('dino-down-anim', true);
    } else {
      this.dino.play('dino-run', true);
    }
  }

  update(time, delta) {
    if (!this.isGameRunning) {
      console.log("update is running")
      return;
    }

    backgroundTile.tilePositionX += 0.75;
    this.ground.tilePositionX += this.gameSpeed;
    Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.environment.getChildren(), -0.5);

    this.respawnTime += delta * this.gameSpeed * 0.08;
    this.on_update_insert_obstacle()

    this.on_update_remove_passed_obstacles()

    this.environment.getChildren().forEach((env) => {
      if (env.getBounds().right < 0) {
        env.x = this.game.config.width + 30;
      }
    });

    this.on_update_change_animation()
  }
}

export default PlayScene;
