import "../css/variables.scss";
import "../css/base.scss";
import "../css/header.scss";
import "../css/disapproving-eyes.scss";
import DisapprovingEyesApp from "./disapproving-eyes/app";

window.onload = function () {
    if (document.getElementsByClassName("disapproving-eyes-app").length) {
        let disapprovingEyesApp = new DisapprovingEyesApp(document.getElementsByClassName("disapproving-eyes-app")[0]);
        disapprovingEyesApp.init();
    }
};
