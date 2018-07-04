/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


class Container {


    constructor($homeScreen, $gameOverWrapper, $parent) {

        this.$homeScreen = $homeScreen;
        this.$gameOverWrapper = $gameOverWrapper;
        this.$parent = $parent;
        this.score = 0;
        this.pipePairs = [];
        this.gameStatus = false;
        this.horizontalBackgroundPosition = 0;
    }

    init() {
        this.createContainer();
        document.onkeydown = this.keyDownHandler.bind(this);
    };


    startGame() {
        this.gameStatus = true;

        let pipeInitialLeftPosition = CONTAINER_RIGHT;
        let pipePairSpawnCounter = 0;

        this.createBird();
        this.addScoreWrapper();

        const FPS = 30;

        this.gameLoop = () => {
            setTimeout(() => { //throttle speed of animation

                this.animate = window.requestAnimationFrame(this.gameLoop);

                this.updateBackgroundPosition();

                pipePairSpawnCounter++;
                if (pipePairSpawnCounter > PIPE_SPAWN_DELAY) {
                    pipeInitialLeftPosition += PIPE_SPAWN_GAP;
                    this.pipePairs.push(this.createPipes(pipeInitialLeftPosition));
                    pipePairSpawnCounter = 0;
                }

                if (this.pipePairs.length) {
                    this.updatePipePairs();
                }

                if (this.pipePairs.length) {
                    if (this.checkCollision()) {
                        this.gameOver();
                    }
                }


                this.updateBird();

            }, 1000 / FPS);

        };


        window.requestAnimationFrame(this.gameLoop);

    };


    reset() {
        let pipePairs_temp = this.pipePairs;
        for (let pipePair of pipePairs_temp) {
            pipePair.destroyPipePair();
            pipePairs_temp[pipePairs_temp.indexOf(pipePair)] = null;
        }

        this.pipePairs = clearArray(pipePairs_temp);

        this.horizontalBackgroundPosition = 0;
        this.score = 0;
        this.$elem.remove();
        this.newBird.destroyBird();
        this.$gameOverWrapper.style.display = "none";
        this.$scoreWrapper.style.display = "none";
        this.$homeScreen.style.display = "block";

        this.createContainer();
    }


    createContainer() {
        this.$elem = document.createElement("div");
        this.$elem.className = "container-wrapper";
        this.$parent.appendChild(this.$elem);
    }

    createPipes(x) {
        let pipePair = new PipePair(x, this.$elem);
        pipePair.init();
        return pipePair;
    }


    updatePipePairs() {
        for (let pipe of this.pipePairs) {
            pipe.updatePipePair();

            if (pipe.x < CONTAINER_LEFT - PIPE_WIDTH) {
                pipe.destroyPipePair();
                this.pipePairs.shift();
            }

        }
    }


    createBird() {
        this.newBird = new Bird(BIRD_LEFT_POSITION, BIRD_INITIAL_TOP_POSITION, 1, this.$elem);
        this.newBird.init();
    }


    updateBird() {
        // this.newBird.updateBird(1, BIRD_FALL_SPEED);
        this.newBird.renderBird();

        // this.newBird.$elem.style.transform = "rotate(25deg)";

        if (this.newBird.y > CONTAINER_BOTTOM - BIRD_HEIGHT || this.newBird.y < CONTAINER_TOP + BIRD_HEIGHT) {
            this.gameOver();
        }

    }


    checkCollision() {
        if (this.newBird.x + BIRD_WIDTH > this.pipePairs[0].x && this.newBird.x < this.pipePairs[0].x + PIPE_WIDTH) {

            if (this.newBird.y < this.pipePairs[0].topY + PIPE_HEIGHT ||
                this.newBird.y + BIRD_HEIGHT > this.pipePairs[0].bottomY) {
                return true;
            }

            else {
                let OFFSET = 2;
                if (this.newBird.x > this.pipePairs[0].x + PIPE_WIDTH - OFFSET) {
                    this.updateScore();
                }
            }
        }

    }


    addScoreWrapper() {
        this.$scoreWrapper = document.createElement("div");
        this.$scoreWrapper.className = "score-wrapper";
        this.$elem.appendChild(this.$scoreWrapper);

        this.$scoreWrapper.style.display = "block";
        this.scoreBackground = "url(\"images/0.png\") no-repeat";
        this.$scoreWrapper.style.background = this.scoreBackground;
    }


    updateScore() {
        this.score++;

        //split numbers
        let digits = [];
        let tempScore = this.score;
        while (tempScore > 0) {
            digits.push(tempScore % 10);
            tempScore = Math.floor(tempScore / 10);
        }

        this.scoreBackground = '';
        const SCORE_SPACE = 25;
        let scoreLeft = 0;
        for (let i = digits.length - 1; i >= 0; i--) {
            this.scoreBackground += "url(\"images/" + digits[i] + ".png\") no-repeat " + scoreLeft + "px" + " 0";
            if (i !== 0) {
                scoreLeft += SCORE_SPACE;
                this.scoreBackground += ",";
            }
        }

        this.$scoreWrapper.style.background = this.scoreBackground;

    }


    gameOver() {
        this.gameStatus = false;
        window.cancelAnimationFrame(this.animate);
        this.newBird.$elem.style.background = "url(\"images/bird-dead.png\")";
        this.$gameOverWrapper.style.display = "block";
        $finalScore.style.background = this.scoreBackground;
    }


    updateBackgroundPosition() {
        this.horizontalBackgroundPosition += BACKGROUND_UPDATE_SPEED;
        this.$elem.style.backgroundPosition = "-" + this.horizontalBackgroundPosition + "px" + " 0";
    }

    keyDownHandler(event) {
        if (this.gameStatus === true) {
            if (event.keyCode === 32) {
                //SPACE_BAR
                // this.newBird.$elem.style.transform = "rotate(-25deg)";
                // this.newBird.updateBird(-1, BIRD_JUMP_SPEED);
                this.newBird.renderBirdUp();
                return false;
            }
            else
                return true;
        }
    }

}