import System from "./system";
import Painter from "./painter";

/**
 * Constructor.
 * 
 * @param {Object} element 
 */
let DisapprovingEyesApp = function (element) {
    this.system = new System();
    this.painter = new Painter(element);
    this.element = element;
};

/**
 * Initialise application.
 */
DisapprovingEyesApp.prototype.init = function () {
    this._initialiseClickEventListener();
    this._initialiseMouseMoveListener();
    this._initialiseTouchEventListener();
    this._initialiseLoop();
};

/**
 * Set up listener for mouse movement events.
 */
DisapprovingEyesApp.prototype._initialiseMouseMoveListener = function () {
    this.element.onmousemove = function (e) {
        this.system.cursorX = e.pageX;
        this.system.cursorY = e.pageY - this.element.offsetTop;
    }.bind(this);
};

/**
 * Set up listener for click events.
 */
DisapprovingEyesApp.prototype._initialiseClickEventListener = function () {
    this.element.onmousedown = function (e) {
        this.system.create(e.pageX, e.pageY - this.element.offsetTop);
        this.system.hideTips();
    }.bind(this);
};

DisapprovingEyesApp.prototype._initialiseTouchEventListener = function () {
    this.element.ontouchmove = function (e) {
        this.system.cursorX = e.changedTouches[0].pageX;
        this.system.cursorY = e.changedTouches[0].pageY - this.element.offsetTop;
    }.bind(this);
};

/**
 * Refresh the screen and update states.
 */
DisapprovingEyesApp.prototype._loop = function () {
    this.painter.clear();
    this.system.updateEyes();
    this.painter.paintEyes(this.system.eyes);

    if (this.system.displayTips) {
        this.painter.paintTips();
    }
};

/**
 * Initialise the loop.
 */
DisapprovingEyesApp.prototype._initialiseLoop = function () {
    setInterval(this._loop.bind(this), 1000 / 800);
};

export default DisapprovingEyesApp;
