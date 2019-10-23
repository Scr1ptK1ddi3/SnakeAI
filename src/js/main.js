let gameEngine;
require(["build/GameEngine"], (GameEngineModule) => {
    this.GameEngine = GameEngineModule.GameEngine;
    init();
});

function init() {
    gameEngine = GameEngine.newDisplayInstance($("#planeTable")[0], 15, 15, 5, 20, true);
    gameEngine.update();
}
