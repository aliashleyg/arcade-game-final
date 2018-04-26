//fix chosen character becoming this.sprite
//stop canvas functionality during open modal








var snack = new Audio('sounds/bite.wav');
var reachedBoat = new Audio('sounds/bell.wav');
const modal = $('#chooseChar');
var divers = ['images/boy.png', 'images/girl.png'];
var timer;
var counter = 60;
// const endGameModal = $('#endGame');


function chooseChar() {
    setTimeout(function() {
      $('#chooseChar').modal({ 
            backdrop: 'static', 
            keyboard: false,
            'show': true});
    }, 500);
  };

let character = function() {
    let diver = $('.diver');
    $(diver).on('click', function() {
        $('#chooseChar').modal('hide');
        gameTimer();    
    });
}

/*************************************************
 GAME TIMER FUNCTION
*************************************************/
function gameTimer() {
    if (!timer){
        timer = setInterval (function () {
            if (counter != 50) {
                counter--;
                document.querySelector('#timer').innerHTML = counter + " seconds";

            } else {
                endGame();                
            }
        }, 1000);
    }
    return counter;
}

function endGame() {
    var message = document.querySelector('#endGameMessage');
    var didYouWinMessage = document.querySelector('#winOrLoseMessage');
    $('#gameOver').modal({
            backdrop: 'static', 
            keyboard: true,
            'show': true});
        if (boatTouch > score) {
            didYouWinMessage.textContent = "Congratulations, Diver! You earned your open water certification!";
        } else if  (score > boatTouch) {
            didYouWinMessage.textContent = "We need to rush you to hospital for all of those injuries!";
        } else {
            didYouWinMessage.textContent = "It looks like you have met your match with the sea creatures, as you had a tied score!";
        }
     message.innerHTML = "Successful Boat Trips: " + boatTouch + "<br />" + "Animal Bites: " + score;
replay();
}

function replay() {
    const replayBtn = $('#replayBtn');
    $(replayBtn).on('click', function() {
        counter = 60;
        boatTouch = 0;
        score = 0;
        diverCount.innerHTML = "Diver: " + boatTouch + "<br />";
        scoreText.innerHTML = "Sea Animals: " + score;
        $('#gameOver').modal('hide');
    });
}


chooseChar();
character();

// Enemies our player must avoid
var Enemy = function(latitude, src, speedInterval, len) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.speed = Math.round(Math.random() * speedInterval) + 400;
    this.x;
    this.y = latitude; //function here to set math.random speed;
    this.sprite = src;
    this.length = len;
};

var enemyOne = new Enemy(70,'images/shark.png', (600 - 500), 161);
var enemyTwo = new Enemy(162, 'images/narwhal.png', (650 - 500), 237);
var enemyThree = new Enemy(244, 'images/anglerfish.png', (625 - 500), 76);


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 600) {
        this.x = this.x + this.speed * dt;

    } else {
        this.x = -120;
    }   

    if (player.x < this.x + this.length &&
        player.x + 100 > this.x &&
        player.y < this.y + 65 &&
        player.y + 65 > this.y) {
        player.x = 200;
        player.y = 470;
        snack.play();
        enemyScore();
    }


};

let score = 0;
function enemyScore(){
    score++
    scoreText.innerHTML = "Sea Animals: " + score;

}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(character) {
    this.sprite = 'images/boy.png';
    this.x = 200;
    this.y = 485;
    console.log(this.sprite);
};

//player touches boat; gets a point
Player.prototype.update = function(dt) {
       if (this.x >= 300 && this.y < 0) {

        this.x = 200;
        this.y = 485;
        reachedBoat.play();
        diverScore();

    }
};
var boatTouch = document.createElement('span');
boatTouch.id ='boatTouch';
boatTouch = 0;
function diverScore(){
    boatTouch++;
    diverCount.innerHTML = "Diver: " + boatTouch + "<br />";
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [enemyOne, enemyTwo, enemyThree];
let player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x > 0) {
        this.x = this.x - 100;
    } 

    if (key == 'right' && this.x < 400) {
        this.x = this.x + 100;
    }

    if (key == 'up' && this.y > 0) {
        this.y = this.y - 98;
    }

    if (key == 'down' && this.y < 405) {
        this.y = this.y + 98;
    }
   
}



