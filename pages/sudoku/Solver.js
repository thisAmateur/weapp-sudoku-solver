var SolveUtils = require('./SolveUtils.js');
var Memory = require('./Memory.js');
var Const = require('./Const.js');

function Solver(map) {
  this.map = map;
  this.stack = new Array();
}

Solver.prototype = {
  createMemoryAndPush: function (map) {
    var nodeNext = SolveUtils.prototype.findNodeHasMinCandidates(map);
    var guessValue = nodeNext.candidates[0];
    nodeNext.killCandidate(guessValue);
    nodeNext.value = guessValue;
    var memNext = new Memory(nodeNext, map);
    this.stack.push(memNext);
  },
  popAndPush: function () {
    var mem = this.stack.pop();
    var node = mem.node;
    if (node.candidates.length == 0) {
      this.popAndPush();
      return;
    }
    var guessValue = node.candidates[0];
    node.killCandidate(guessValue);
    node.value = guessValue;
    var memory = new Memory(node, mem.map);
    this.stack.push(memory);
  },
  solveByStack: function () {
    var mem = this.stack[this.stack.length - 1];

    var node = mem.node;
    var map = mem.map.clone();
    var row = node.location.row;
    var col = node.location.col;

    if (!SolveUtils.prototype.solveByOneNode(map, row, col)) {
      //如果解错
      this.popAndPush();
      this.solveByStack();
      return;
    }
    var scanRst = Const.prototype.FALSE;
    do {
      scanRst = SolveUtils.prototype.scanForStableNode(map);
    } while (scanRst == Const.prototype.TRUE);
    if (scanRst == Const.prototype.WRONG) {
      //如果解错
      this.popAndPush();
      this.solveByStack();
      return;
    }
    //判断是否map已经填好了
    if (SolveUtils.prototype.isAllSolved(map)) {
      this.map = map;
      return;
    }
    this.createMemoryAndPush(map);
    this.solveByStack();
  },
  scanInitialMap: function () {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (this.map.getNode(i, j).value != 0) {
          SolveUtils.prototype.solveByOneNode(this.map, i, j);
        }
      }
    }
    var scanRst = Const.prototype.FALSE;
    do {
      scanRst = SolveUtils.prototype.scanForStableNode(this.map);
    } while (scanRst == Const.prototype.TRUE);
    //判断是否map已经填好了
    if (SolveUtils.prototype.isAllSolved(this.map)) {
      return true;
    }
    this.createMemoryAndPush(this.map);
    return false;
  },
  doSolve: function () {
    var start = new Date().getTime();
    if (this.map == null) {
      console.log("No map to be solved");
    }
    if (this.scanInitialMap()) {
      return;
    } else if (this.stack.length > 0) {
      this.solveByStack();
    } else {
      console.log("Something is wrong.");
    }
    var useTime = new Date().getTime() - start;
    console.log("use time: " + useTime + 'ms');
  }
}

module.exports = Solver;