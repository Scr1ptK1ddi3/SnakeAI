console.time("main.js");
require(["build/GameEngine"], (GameEngineModule) => {
    this.GameEngine = GameEngineModule.GameEngine;
    init();
});

const displayDebugInfoOnInit = false;
let gameEngine;
function init() {
    controlInputHandlersInit();
    cssInit();

    gameEngine = GameEngine.newDisplayInstance($("#gameDiv")[0], 45, 45, 5, 20, displayDebugInfoOnInit);
    gameEngine.initializeHumanController();

    console.timeLog("main.js");
    // gameEngine.update();
}

function cssInit() {
    $("td > label").each((i, e) => $(e).parent().css("text-align", "right"));
    $("td > span").each((i, e) => $(e).parent().css("text-align", "left"));
}

controlInputHandlersInit = () => {
    debugInfoCheckboxInit();
    isRunningCheckboxInit();
};

let $debugInfoCheckbox;
function debugInfoCheckboxInit() {
    $debugInfoCheckbox = $("#debugInfoCheckbox");
    displayDebugInfoOnInit ? $debugInfoCheckbox.attr("checked", "true") : $debugInfoCheckbox.removeAttr("checked");
    $debugInfoCheckbox.off("change");
    $debugInfoCheckbox.on("change", handleDebugInfoCheckboxChange);
}

handleDebugInfoCheckboxChange = () => gameEngine.debugInfo = !!$debugInfoCheckbox.prop("checked");

let $isRunningCheckbox;
function isRunningCheckboxInit() {
    $isRunningCheckbox = $("#isRunningCheckbox");
    $isRunningCheckbox.off("change");
    $isRunningCheckbox.on("change", handleIsRunningCheckboxChange);
}

handleIsRunningCheckboxChange = () => gameEngine.isRunning = !!$isRunningCheckbox.prop("checked");

