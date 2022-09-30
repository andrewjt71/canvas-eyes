import Eye from "./eye";

/**
 * Constructor.
 */
let System = function () {
    this.eyes = [];
    this.cursorX = null;
    this.cursorY = null;
    this.displayTips = true;
};

/**
 * Update eyes.
 */
System.prototype.updateEyes = function () {
    for (var i = 0; i < this.eyes.length; i++) {
        this._updateEye(this.eyes[i]);
    }
};

/**
 * Update the state of an eye.
 * 
 * @param {Object} eye
 */
System.prototype._updateEye = function (eye) {
    // If frames per move have passed set animation to true
    if (eye.frameNumber === eye.blinkInterval) {
        eye.animationInMotion = true;
        eye.animatingDownwards = true;
        eye.frameNumber = 0;
    }

    // If not animating add to frames counter
    if (!eye.animationInMotion) {
        eye.frameNumber++;
    }

    // If animating and eyelidoffset is at a low change to up
    if (eye.animationInMotion && eye.animatingDownwards && eye.eyelidOffset <= -Math.PI/2) {
        eye.animatingDownwards = false;
    }

    // If animating and eyelidoffset is at a high stop animation
    if (eye.animationInMotion && !eye.animatingDownwards && eye.eyelidOffset >= 0) {
        eye.animationInMotion = false;
    }

    if (eye.animationInMotion && eye.animatingDownwards) {
        // If animating and eye is moving downwards, move downwards.
        eye.eyelidOffset = eye.eyelidOffset - 0.02;
    } else if (eye.animationInMotion && !eye.animatingDownwards) {
        // If animating and eye is moving upwards, move upwards.
        eye.eyelidOffset = eye.eyelidOffset + 0.02;
    }

    eye.mouseX = this.cursorX;
};

/**
 * Create a new pair of eyes.
 */
System.prototype.create = function () {
    let randomBetween = function (low, high) {
        return Math.floor(Math.random() * high) + low;
    };

    let eyeHeight = randomBetween(10, 100),
        eyeWidth = eyeHeight / 2,
        blinkInterval = randomBetween(100, 1000),
        colour = this._getRandomColour();

    this.eyes.push(new Eye(eyeHeight, eyeWidth, this.cursorX + eyeWidth, this.cursorY, blinkInterval, colour));
    this.eyes.push(new Eye(eyeHeight, eyeWidth, this.cursorX - eyeWidth, this.cursorY, blinkInterval, colour));
};

/**
 * Generate a random hex colour
 */
System.prototype._getRandomColour = function () {
    let letters = '0123456789ABCDEF',
        color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};

System.prototype.hideTips = function () {
    this.displayTips = false;
};

export default System;
