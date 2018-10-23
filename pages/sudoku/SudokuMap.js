var Node = require("./Node.js");

/**
 * 全部9*9个Node组成的Map
 * nodeMap：Node数组
 * solvedNodesNum：已经填好的点的个数
 */
function SudokuMap() {
  this.nodeMap = new Array();
  for (var i = 0; i < 9; i++) {
    this.nodeMap[i] = new Array();
    for (var j=0; j<9; j++) {
      this.nodeMap[i][j] = new Node(0, i, j, null);
    }
  }
  this.solvedNodesNum = 0;
}

SudokuMap.prototype = {
  /**
   * 根据坐标读Node
   */
  getNode: function (row, col) {
    return this.nodeMap[row][col];
  },

  /**
   * 根据横坐标读一行Node
   */
  getRow: function (row) {
    var result = new Array();
    for(var i=0; i<9; i++) {
      result[i] = this.nodeMap[row][i];
    }
    return result;
  },

  /**
   * 根据纵坐标读一行Node
   */
  getCol: function (col) {
    var result = new Array();
    for (var i = 0; i < 9; i++) {
      result[i] = this.nodeMap[i][col];
    }
    return result;
  },

  /**
   * 根据输入的9*9数组，初始化map
   */
  init: function (input) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        this.nodeMap[i][j] = new Node(input[i][j], i, j);
      }
    }
    this.solvedNodesNum = 0;
  },

  /**
   * 深拷贝
   */
  clone: function() {
    var cloneObj = new SudokuMap();
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        cloneObj.nodeMap[i][j] = this.nodeMap[i][j].clone();
      }
    }
    cloneObj.solvedNodesNum = this.solvedNodesNum;
    return cloneObj;
  },

  /**
   * 已解点个数+1
   */
  addByOne: function() {
    return ++this.solvedNodesNum;
  },

  /**
   * 获取当前map中9*9个Nodes的value
   */
  getResult : function() {
    var rnt = new Array();
    for(var i=0; i<9; i++) {
      rnt.push(new Array());
    }
    for(var i=0; i<9; i++) {
      for(var j=0; j<9; j++) {
        rnt[i][j] = this.nodeMap[i][j].value;
      }
    }
    return rnt;
  }
}

module.exports = SudokuMap;