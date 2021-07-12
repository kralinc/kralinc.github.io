//Author: Liam Andrade
//Date: 11-Nov-2020
//Purpose: Collects all of the bullet patterns in one place

//numBullets, direction, position, velocity, acceleration, delay

//Shoots 6 bullets, 60 degrees apart from one another, one at a time
const PATTERN_HEXAGON = new Pattern (6, 
                                     0, Math.PI / 3, 
                                     new Vector2(50, 50), Vector2.prototype.ZERO, 
                                     0.3, 0, 
                                     0, 0, 
                                     200, 0);


//Shoots 8 bullets, 45 degrees apart, one at a time
const PATTERN_OCTAGON = new Pattern (8, 
                                     Math.PI / 4, Math.PI / 4, 
                                     new Vector2(50, 50), Vector2.prototype.ZERO, 
                                     0.31, 0, 
                                     0, 0, 
                                     170, 2*Math.PI);

//Same as PATTERN_OCTAGON but in the other direction
const PATTERN_REVERSE_OCTAGON = new Pattern (8, 
                                     Math.PI / 3.5, -Math.PI / 4, 
                                     new Vector2(50, 50), Vector2.prototype.ZERO, 
                                     0.31, 0, 
                                     0, 0, 
                                     170, 0);

//10 bullets firing left to right, top to bottom
const PATTERN_RAIN = new Pattern (10,
                                 Math.PI / 2, 0,
                                 new Vector2(0,0), new Vector2(10,0),
                                 0.3, 0.01,
                                 0.005, 0,
                                 200, 0);

//Same but shifted slightly to the right
const PATTERN_RAIN_SHIFT = new Pattern (10,
                                 Math.PI / 2, 0,
                                 new Vector2(10-BULLETSIZE,0), new Vector2(10,0),
                                 0.3, 0.01,
                                 0.005, 0,
                                 200, 0);

//10 bullets right to left, bottom to top
const PATTERN_SMOKE = new Pattern (10,
                                 3 * Math.PI / 2, 0,
                                 new Vector2(100-BULLETSIZE,100), new Vector2(-10,0),
                                 0.3, 0.01,
                                 0.005, 0,
                                 200, 0);

//10 bullets left to right, bottom to top
const PATTERN_SMOKE_SHIFT = new Pattern (10,
                                 3 * Math.PI / 2, 0,
                                 new Vector2(BULLETSIZE,100), new Vector2(10,0),
                                 0.3, 0.01,
                                 0.005, 0,
                                 200, 0);

//Fires seemingly erratically in a circular spiral. The erraticness comes from the increasing velocity and acceleration of the bullets as it shoots
const PATTERN_SWORLY = new Pattern (15,
                                   7 * Math.PI / 8, Math.PI / 6,
                                    new Vector2(50, 50), Vector2.prototype.ZERO,
                                   0.35, 0.01,
                                   0.009, 0.001,
                                   190, 2*Math.PI);

//Same as above but swirls in the other direction
const PATTERN_SWORLY_REVERSE = new Pattern (15,
                                   Math.PI / 16, -Math.PI / 7,
                                    new Vector2(50, 50), Vector2.prototype.ZERO,
                                   0.35, 0.01,
                                   0.009, 0.001,
                                   190, 0);

//Same as PATTERN_HEXAGON but with a different initial direction
const PATTERN_FLIPPED_HEXAGON = new Pattern (6, 
                                     Math.PI / 6, Math.PI / 3, 
                                     new Vector2(50, 50), Vector2.prototype.ZERO, 
                                     0.34, 0, 
                                     0, 0, 
                                     200, 0);

//6 bullets, 60 degrees apart, all at once
const PATTERN_HEXASHOTGUN = new Pattern (6, 
                                     Math.PI / 5, Math.PI / 3, 
                                     new Vector2(50, 50), Vector2.prototype.ZERO, 
                                     0.34, 0, 
                                     0.005, 0, 
                                     1, 0);

const PATTERN_HEXASHOTGUN_ROTATED = new Pattern (6, 
                                     Math.PI / 8, Math.PI / 3, 
                                     new Vector2(50, 50), Vector2.prototype.ZERO, 
                                     0.34, 0, 
                                     0.005, 0, 
                                     1, 2*Math.PI);

//8 bullets, 45 degrees apart, all at once
const PATTERN_OCTASHOTGUN = new Pattern (8, 
                                    Math.PI / 7, Math.PI / 4, 
                                    new Vector2(50, 50), Vector2.prototype.ZERO, 
                                    0.31, 0, 
                                    0, 0, 
                                    1, 0);

const PATTERN_OCTASHOTGUN_ROTATED = new Pattern (8, 
                                    Math.PI / 10, Math.PI / 4, 
                                    new Vector2(50, 50), Vector2.prototype.ZERO, 
                                    0.31, 0, 
                                    0, 0, 
                                    1, Math.PI/2);

//Reverse octagon with a different initial position
const PATTERN_REVERSE_OCTAGON_ROTATE = new Pattern (8, 
                                     15 * Math.PI / 16, -Math.PI / 4, 
                                     new Vector2(50, 50), Vector2.prototype.ZERO, 
                                     0.31, 0, 
                                     0, 0, 
                                     170, 2*Math.PI);

//Fires 1 bullet at each corner, all at once. They slow down then reverse once at the corner of the screen.
const PATTERN_DIAMONDBOUNCE = new Pattern (4,
                                           Math.PI / 4, Math.PI / 2,
                                           new Vector2(50,50), Vector2.prototype.ZERO,
                                           1.1, 0,
                                           -0.0085, 0,
                                           5, 0);

//Fires 50 bullets in a complete circle, one at a time. Ensures that there are no safe zones left
const PATTERN_NOMERCY = new Pattern (50,
                                    0, 0.126,
                                     new Vector2(50,50), Vector2.prototype.ZERO,
                                     0.32, 0,
                                     0, 0,
                                     500, 0);


//====Hell patterns ====

//Fires 50 bullets in quick succession in a complete circle. The only way to consistently dodge it is to go around
const HELL_NOMERCY = new Pattern (50,
                                0, -0.126,
                                 new Vector2(50,50), Vector2.prototype.ZERO,
                                 0.35, 0,
                                 0.001, 0,
                                 100, Math.PI);

//same as PATTERN_DIAMONDBOUNCE but the bullets are fired perpendicular to the sides
const HELL_DIAMONDBOUNCE = new Pattern (4,
                                       0, Math.PI / 2,
                                       new Vector2(50,50), Vector2.prototype.ZERO,
                                       1.1, 0,
                                       -0.0121, 0,
                                       5, 0);

//Sam as hex and octagon but with 12 bullets
const HELL_DODECAGON = new Pattern (12, 
                                Math.PI / 12, 0.52359, 
                                new Vector2(50, 50), Vector2.prototype.ZERO, 
                                0.35, 0, 
                                0.001, 0, 
                                100, 2*Math.PI);

//Same as above but all at once
const HELL_DODECASHOTGUN = new Pattern (12, 
                                Math.PI / 14, 0.52359, 
                                new Vector2(50, 50), Vector2.prototype.ZERO, 
                                0.33, 0, 
                                0.003, 0, 
                                1, 2*Math.PI);

//Rain pattern with faster and closer spaced bullets
const HELL_RAIN = new Pattern (10,
                                 Math.PI / 2, 0,
                                 new Vector2(0,0), new Vector2((100-BULLETSIZE)/9,0),
                                 0.39, 0.01,
                                 0.008, 0,
                                 50, 0);

//Fires sideways from the left
const PATTERN_HAIL_LEFT = new Pattern (10,
                                 0, 0,
                                 new Vector2(0,0), new Vector2(0,10),
                                 0.3, 0.01,
                                 0.005, 0,
                                 200, 0);

//Fires sideways from the right
const PATTERN_HAIL_RIGHT = new Pattern (10,
                                 Math.PI, 0,
                                 new Vector2(100 - BULLETSIZE, 100 - BULLETSIZE), new Vector2(0,-10),
                                 0.3, 0.01,
                                 0.005, 0,
                                 200, 0);
