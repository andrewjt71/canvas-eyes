/**
 * Constructor
 * 
 * @param {Object} element
 */
let Painter = function (element) {
    // Create a context with a canvas.
    this.context = function () {
        var canvas = document.createElement('canvas');
        element.append(canvas);
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;

        return canvas.getContext('2d');
    }();
};

/**
 * Paint an array of eyes.
 * 
 * @param {array} eyes
 */
Painter.prototype.paintEyes = function (eyes) {
    for (let i = 0; i < eyes.length; i++) {
        let eye = eyes[i];
        this._paintEye(eye);
    }
};

/**
 * Paint an eye based on its current state.
 * 
 * @param {Eye} eye
 */
Painter.prototype._paintEye = function (eye) {
    // Set up tools.
    this.context.lineWidth = 5;
    this.context.strokeStyle = "black";
    this.context.fillStyle = "white";

    // Paint eye outline.
    this.context.beginPath();
    this.context.ellipse(
        eye.positionX,
        eye.positionY - this.context.canvas.offsetTop,
        eye.width,
        eye.height,
        2 * Math.PI,
        0,
        2 * Math.PI
    );

    this.context.fill();
    this.context.closePath();
    this.context.stroke();

    // Calculate pupil dimensions.
    let pupilRadius = eye.width / 1.5,
        mouseFromEyeX = eye.mouseX - eye.positionX,
        mouseLeftOfEye = Math.sign(mouseFromEyeX) === -1,
        absMouseFromEyeX = Math.abs(mouseFromEyeX),
        pupilXPosition;

    // Calculate x position of pupil
    if (mouseLeftOfEye && absMouseFromEyeX + pupilRadius > eye.width) {
        // If mouse position is outside left of the eye.
        pupilXPosition = eye.positionX - (eye.width - pupilRadius);
    } else if (!mouseLeftOfEye && absMouseFromEyeX + pupilRadius > eye.width) {
        // If mouse position is outside right of the eye.
        pupilXPosition = eye.positionX + (eye.width - pupilRadius);
    } else {
        // If mouse position is inside of the eye.
        pupilXPosition = eye.mouseX;
    }

    // Paint pupil.
    this.context.beginPath();
    this.context.arc(pupilXPosition, eye.positionY - this.context.canvas.offsetTop, pupilRadius, 0, 2 * Math.PI);
    this.context.fillStyle = "black";
    this.context.fill();
    this.context.closePath();

    // Paint eyelid.
    this.context.fillStyle = eye.colour;
    this.context.beginPath();
    this.context.ellipse(
        eye.positionX,
        eye.positionY - this.context.canvas.offsetTop,
        eye.width,
        eye.height,
        Math.PI,
        Math.PI - eye.eyelidOffset,
        eye.eyelidOffset,
        true
    );
    this.context.fill();
    this.context.closePath();
    this.context.stroke();
};

/**
 * Clear canvas.
 */
Painter.prototype.clear = function () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
};

/**
 * Paint the canvas background.
 */
Painter.prototype.paintTips = function () {
    let text = '[Click to create some disapproving eyes]';
    this.context.font = "20px Questrial";
    this.context.fillStyle = 'grey';
    this.context.textAlign = 'center';
    this.context.fillText(text, this.context.canvas.width/2, this.context.canvas.height/2);
};

export default Painter
