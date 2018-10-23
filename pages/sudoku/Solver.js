var SolveUtils = require('./SolveUtils.js');
var Memory = require('./Memory.js');
var Const = require('./Const.js');

/**
 * 解题者
 * map：要解的目标map，类型为SudokuMap
 * stack：用来放Memory的栈，这里用数组来模拟
 */
function Solver(map) {
  this.map = map;
  this.stack = new Array();
}

Solver.prototype = {
  /**
   * 根据当前map中候选值个数最少的待定点，创建新的解分支存档
   * 创建完push到栈中
   */
  createMemoryAndPush: function (map) {
    var nodeNext = SolveUtils.prototype.findNodeHasMinCandidates(map);
    var guessValue = nodeNext.candidates[0];
    nodeNext.killCandidate(guessValue);
    nodeNext.value = guessValue;
    var memNext = new Memory(nodeNext, map);
    this.stack.push(memNext);
  },

  /**
   * 当发现当前解分支是错误的时候，需要回溯栈顶的存档，并开始新的分支
   * 如果当前栈顶的存档的分支点的每个候选值都尝试完了，需要递归处理
   */
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

  /**
   * 递归处理'解分支栈'上的memory
   */
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

  /**
   * 处理刚初始化的map
   */
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

  /**
   * 求解入口
   */
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
    return useTime;
  }
}

module.exports = Solver;