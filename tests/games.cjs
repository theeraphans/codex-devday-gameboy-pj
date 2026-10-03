const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const element = {
  addEventListener() {},
  classList: { add() {}, remove() {} },
  getContext: () => ({
    fillRect() {},
    fillText() {},
    save() {},
    restore() {},
    beginPath() {},
    rect() {},
    clip() {},
    translate() {},
  }),
};
const sandbox = {
  document: {
    querySelector: () => element,
    querySelectorAll: () => [],
    getElementById: () => element,
    addEventListener() {},
  },
  window: { addEventListener() {} },
  requestAnimationFrame() {},
  console,
};
vm.createContext(sandbox);
const source = fs
  .readFileSync("index.html", "utf8")
  .match(/<script>([\s\S]*?)<\/script>/)[1];
vm.runInContext(
  source +
    "\nthis.api = {Snake, Blocks, Breaker, games, held, draw, input, state:()=>({mode,selected,game})};",
  sandbox,
);
const {
  Snake,
  Blocks,
  Breaker,
  games,
  held,
  draw,
  input,
  state,
} = sandbox.api;
const snake = new Snake();
snake.food = { x: 10, y: 9 };
snake.update(0.2);
assert.equal(snake.score, 10);
assert.equal(snake.body.length, 4);
snake.input("left");
snake.update(0.2);
assert.equal(snake.body[0].x, 11);
snake.body[0].x = 17;
snake.update(0.2);
assert.equal(snake.over, true);
const blocks = new Blocks();
blocks.board[17].fill(1);
blocks.board[17][4] = 0;
blocks.piece = [[1]];
blocks.x = 4;
blocks.y = 17;
blocks.drop();
assert.equal(blocks.score, 100);
assert.equal(
  blocks.board[17].every((v) => v === 0),
  true,
);
blocks.input("a");
blocks.input("b");
assert.equal(blocks.board.flat().some(Boolean), true);
const breaker = new Breaker();
breaker.input("a");
const brick = breaker.bricks[0];
breaker.ball = { x: brick.x + 10, y: brick.y - 2, vx: 0, vy: 50 };
breaker.update(0.04);
assert.equal(brick.on, false);
assert.equal(breaker.score, 10);
breaker.ball.y = 250;
breaker.update(0.04);
assert.equal(breaker.lives, 2);
input("start");
assert.equal(state().mode, "playing");
input("start");
assert.equal(state().mode, "paused");
input("select");
input("down");
input("start");
assert.equal(state().game instanceof Snake, true);
console.log(
  "Passed: Snake food, reversal and collision; blocks line clear and hard drop; breaker collision and lives; menu and pause.",
);


for (let i = 0; i < games.length; i++) {
  input("select");
  while (state().selected !== i) input("down");
  input("start");
  draw();
  assert.equal(state().game instanceof games[i].type, true);
  input("start");
  assert.equal(state().mode, "paused");
  input("start");
  assert.equal(state().mode, "playing");
}
input("select");
while (state().selected !== 0) input("down");
input("up");
assert.equal(state().selected, 2);
input("down");
assert.equal(state().selected, 0);
assert.equal(games.length, 3);
console.log("Passed: all 3 cartridges render/start/pause and menu wraps in both directions.");
