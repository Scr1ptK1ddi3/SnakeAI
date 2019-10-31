console.time("main.js");
let gameEngine;
require(["build/GameEngine"], (GameEngineModule) => {
    this.GameEngine = GameEngineModule.GameEngine;
    init();
});

function init() {
    gameEngine = GameEngine.newDisplayInstance($("#gameDiv")[0], 15, 15, 5, 20, true);
    gameEngine.initializeHumanController();
    cssInit();
    console.timeLog("main.js");
    // gameEngine.update();
}

function cssInit() {
    $("td > label").each((i, e) => $(e).parent().css("text-align", "right"));
    $("td > span").each((i, e) => $(e).parent().css("text-align", "left"));
}
