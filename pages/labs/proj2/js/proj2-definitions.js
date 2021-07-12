//Author: Liam Andrade
//Date: 11-Nov-2020
//Purpose: Consolidate the locations of class definitions and any constants/functions that do not depend on global variables or the document

//Vector2 is a class for any values that act on a cartesian plane
//i.e. anything that has x,y coordinates, such as position and size
function Vector2 (x, y) 
{
    this.x = x;
    this.y = y;
}

//Add 2 vectors
Vector2.prototype.add = function (otherVector) 
{
    this.x += otherVector.x;
    this.y += otherVector.y;
};

//Multiply this vector by another
Vector2.prototype.times = function (factor)
{
    this.x *= factor;
    this.y *= factor;
}

//Multiply a vector by a factor
Vector2.prototype.mult = function (vector, factor) {
    return new Vector2 (vector.x * factor, vector.y * factor);
}

//Copy a vector
Vector2.prototype.copy = function () {
    return new Vector2(this.x, this.y);
}

//Zero vector
Vector2.prototype.ZERO = new Vector2(0, 0);

//Constant is here because bullet needs it.
const BULLETSIZE = 3;

class Bullet 
{
    constructor (direction, position, velocity, acceleration, id) 
    {
        this.dir = direction;
        //The holy trinity
        this.pos = position;
        this.vel = velocity;
        this.acc = acceleration;
        
        this.id = id;
        this.size = new Vector2 (BULLETSIZE, BULLETSIZE);
    }
}

//Checks if the bullet is overlapping something
//Can be used for any other object with a pos and size but in this program is just used to check collision with the player
Bullet.prototype.isOverlapping = checkOverlap;

//Launches bullets in a specified pattern
class Pattern {
    //d means delta
    constructor (numBullets, dir, ddir, pos, dpos, vel, dvel, acc, dacc, delay, randomization)
    {
        this.numBullets = numBullets;
        //In radians
        this.randomization = randomization;
        this.dir = dir;
        this.ddir = ddir;
        //As a % of screenspace per frame
        this.pos = pos;
        this.dpos = dpos;
        //As a % of screenspace per frame
        this.vel = vel;
        this.dvel = dvel;
        //As a % of screenspace per frame
        this.acc = acc;
        this.dacc = dacc;
        //Milliseconds
        this.delay = delay;
        //Bullets fired so far
        this.iterator = 1;
    }
    
    //Launch a projectile
    fire(index) 
    {
        //Return nothing if there are no more bullets to be fired
        if (this.iterator > this.numBullets) {
            return null;
        }
        
        //Create a new bullet object
        let bullet = new Bullet(this.dir, this.pos.copy(), this.vel, this.acc, index);
        
        //Advance each of the pattern values by their deltas
        this.dir += this.ddir;
        this.pos.add(this.dpos);
        this.vel += this.dvel;
        this.acc += this.dacc;
        
        this.iterator++;
        
        return bullet;
    }
    
    //Copy a pattern
    //cuz objects are passed by reference
    copy() {
        let rand = Math.random() * this.randomization;
        return new Pattern(this.numBullets, this.dir + rand, this.ddir, this.pos.copy(), this.dpos.copy(), this.vel, this.dvel, this.acc, this.dacc, this.delay);
    }
}

//The player object
function Player(pos, vel) {
    this.pos = pos;
    this.vel = vel;
    this.input = new Vector2(0,0);
    this.size = new Vector2(2,2);
    this.left = 0;
    this.right = 0;
    this.up = 0;
    this.down = 0;
}

//Check if 2 boxes are overlapping
function checkOverlap(other) 
{
    
    //I tried to make this algorithm work for any rectangles but this thing copied verbatim from online didn't work
    //Leaving this here to show that I tried :(
//    //Rectangles will be represented by their bottom-left and top-right corners.
//    let thisBottomLeft = new Vector2 (this.pos.x, this.pos.y + this.size.y);
//    let thisTopRight   = new Vector2 (this.pos.x + this.size.x, this.pos.y);
//    
//    let otherBottomLeft = new Vector2 (other.pos.x, other.pos.y + other.size.y);
//    let otherTopRight = new Vector2 (other.pos.x + other.size.x, other.pos.y);
//    
//    //The only times that the rectangles will not overlap will be when 
//    //1. One of the two rectangles is above the top edge of the other rectangle
//    //2. One of the two rectangles is on the left side of the left edge of the other rectangle
//    return (!
//           ((otherTopRight.x <= thisBottomLeft.x) ||
//           (otherBottomLeft.x >= thisTopRight.x) ||
//           (otherTopRight.y <= thisBottomLeft.y) ||
//           (otherBottomLeft.y >= thisTopRight.y)));
    
    //Takes advantage of the fact that the player and the bullets are the same shape
    //Finds the distance between the centers of the 2 boxes. if the distance between them is less than their radii added together, they overlap.
    
    //Finds the center of each object
    let thisCenter = new Vector2(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
    let otherCenter = new Vector2(other.pos.x + other.size.x / 2, other.pos.y + other.size.y / 2);
    
    //Distance formula
    //d=sqrt(x^2+y^2)
    let distX = (otherCenter.x - thisCenter.x) * (otherCenter.x - thisCenter.x);
    let distY = (otherCenter.y - thisCenter.y) * (otherCenter.y - thisCenter.y);
    let distance = Math.sqrt(distX + distY);
    
    return (distance < (this.size.x/2 + other.size.x/2));
    
}

