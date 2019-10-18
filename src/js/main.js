let gameEngine;
require(["build/GameEngine"], (GameEngineModule) => {
    this.GameEngine = GameEngineModule.GameEngine;
    init();
});

function init() {
    gameEngine = new GameEngine(15, 15, 5, $("#planeTable")[0], 20, true);
}
