// Author: George Duggal
// Date: 4/04/19
// Game that runs in the background of the home screen. 


// Declare global variables

var pColor;

// Store the score
var score;

// Store whether the game is running
running = false;

// Create an array to hold the enemies
var enemies;

// Store the speeds
var enemySpeed = 3;
var playerSpeed = 7;

// Create a way of storing the enemey spawner timer
var timer;

// Run before the game loop is started
function setup() {
	canvasWidth  = 2500;
    canvasHeight = 1600;        
    createCanvas(windowWidth,windowHeight);
    reset();
    enemies = [];
    running = false;
                
}

// Function to start the game
function startGame() {         
    running = true;
    enemyCreator();
    timer = setInterval(enemyCreator,2000);
                
}

// Game loop
function draw() {
	// Check if the game is running
    if (running) {
		background(0,0,0);
        fill(pColor);
        rect(px,py,pw,ph);
        px += pxspeed;
		py += pyspeed;
		
        // Draw each enemy
        for (var i = 0; i < enemies.length; i++) {                                        
            // Calculate the movement of this enemy
            var angleRad = Math.atan2(px - enemies[i].x, py - enemies[i].y);
            var xMove = enemySpeed * Math.sin(angleRad);
            var yMove = enemySpeed * Math.cos(angleRad);
                                                
            // Draw and move the enemy
            fill(eColor);
            rect(enemies[i].x,enemies[i].y,ew,eh);
            enemies[i].x += xMove;
            enemies[i].y += yMove;
            
        }
    enemyCollisions();
    enemyPlayerCollisions();

    //These are the barriers if the player goes out of bounds
    if (px + pw >= windowWidth) {
        die();
		
		}
	
    if (px - pw < 0) {
        die();
		}
                               
	if (py >= windowHeight) {
        die();
		
		}

    if (py <= 0) {
        die();
		
		}
    }

}

//Contains all the variables and info for resetting
function reset() {
    score = 0;
    px = 600;
    pxspeed = playerSpeed;
    py = 450;
    pyspeed = 0;
    pw = 25;
    ph = 25;
    pColor = color(0,255,0);
    ew = 40;
    eh = 40;
    eColor = color(255,0,0);
    // Empty the enemies array
    enemies = [];

}

// Function to die
function die() {
    // Stop the game running
    running = false;

    // Clear the timer
    clearTimeout(timer);
    reset();
                
}

// Directing the player
function keyPressed() {        
                if (keyCode === UP_ARROW) {
                    pxspeed = 0;
                    pyspeed = -playerSpeed;
                }

                if(keyCode === DOWN_ARROW) {
                    pxspeed = 0;
                    pyspeed = playerSpeed;
                }
                
                if (keyCode === LEFT_ARROW) {
                    pxspeed = -playerSpeed;
                    pyspeed = 0;
                }
                
                if (keyCode === RIGHT_ARROW) {
                    pxspeed = playerSpeed;
                    pyspeed = 0;
                }
				
                if(!running && keyCode === 32) {
                   startGame();
                }
}

function enemyCreator() {
                
                score++;
                
                // This works by using the four outer areas for a random spawn in
                areaSpawn = Math.floor(Math.random() * 4);
                
                // Create temporary variables to store the enemy x and y
                var ex;
                var ey;
                
                if (areaSpawn == 0) {
                                ex = Math.floor(Math.random() *1750);
                                ey = Math.floor(Math.random() *150);
                                
                }
                if (areaSpawn == 1) {
                                ex = Math.floor(Math.random() * (1750 - 1550 + 1) ) + 1550;
                                ey = Math.floor(Math.random() * (750 - 50 + 1) ) + 50; 
                                
                }
                if (areaSpawn == 2) {
                                ex = Math.floor(Math.random() * (1750 - 50 + 1) ) + 50;
                                ey = Math.floor(Math.random() * (850 - 750 + 1) ) + 750;
                                
                }
                if (areaSpawn == 3) {
                                ex = Math.floor(Math.random() *150);
                                ey = Math.floor(Math.random() *850);
                }
                
                // Add the enemy
                enemies.push({x:ex, y:ey});

}

function enemyCollisions() {
	
    // This is the for loops used to make the collisions
	
    for (var i = 0; i < enemies.length - 1; i++) {
		
		for(var j = i + 1; j < enemies.length; j++) {
			
            // This calculates the difference between them 
			
            var xDifferenceI = enemies[i].x + ew;
            var yDifferenceI = enemies[i].y + eh;
            var xDifferenceJ = enemies[j].x + ew;
            var yDifferenceJ = enemies[j].y + eh;
			
			// This while loop is essential for working out if the collisons occur
			
            while(xDifferenceI >= enemies[j].x && enemies[i].x <= xDifferenceJ && yDifferenceI >= enemies[j].y && enemies[i].y <= yDifferenceJ) {
				
                // This then separates them from each other
				
                if (xDifferenceI >= enemies[j].x && enemies[i].x <= xDifferenceJ) {
					
					//This decides where the collision is of the four sides and then separates them
					
                     if (enemies[i].x > enemies[j].x) {
                        enemies[i].x++;
                    }
                    else {
                        enemies[j].x++;
                    }
                    if (enemies[i].y > enemies[j].y) {
                       enemies[i].y++;
                    }
                    else {
                        enemies[j].y++;
                        }
                    }
                // This is needed to take another difference
				
                xDifferenceI = enemies[i].x + ew;
                yDifferenceI = enemies[i].y + eh;
                xDifferenceJ = enemies[j].x + ew;
                yDifferenceJ = enemies[j].y + eh;
            }              
        }
    }              
}

function enemyPlayerCollisions() {
	
	for (var i = 0; i < enemies.length; i++) {
		
		// This calculates the difference between them
		
        var xDifferenceOne = px + pw;
        var xDifferenceTwo = enemies[i].x + ew;
        var yDifferenceOne = py + ph;
        var yDifferenceTwo = enemies[i].y + eh
		
        if(xDifferenceOne >= enemies[i].x && px <= xDifferenceTwo && yDifferenceOne >= enemies[i].y && py <= yDifferenceTwo) {
			die();
                                                                
        }
    }
}
