/**
 * Constructor.
 * 
 * @param {int} height 
 * @param {int} width 
 * @param {int} positionX 
 * @param {int} positionY 
 * @param {int} blinkInterval
 * @param {string} colour
 */
let Eye = function (height, width, positionX, positionY, blinkInterval, colour) {
    this.height = height;
    this.width = width;
    this.positionX = positionX;
    this.positionY = positionY;
    this.blinkInterval = blinkInterval;
    this.colour = colour;
    this.frameNumber = 0;
    this.animationInMotion = false;
    this.animatingDownwards = true;
    this.eyelidOffset = 0;
    this.mouseX = 0;
};

export default Eye;
