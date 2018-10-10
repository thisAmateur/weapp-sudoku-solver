var Node = require("./Node.js");

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
  getNode: function (row, col) {
    return this.nodeMap[row][col];
  },

  getRow: function (row) {
    var result = new Array();
    for(var i=0; i<9; i++) {
      result[i] = this.nodeMap[row][i];
    }
    return result;
  },

  getCol: function (col) {
    var result = new Array();
    for (var i = 0; i < 9; i++) {
      result[i] = this.nodeMap[i][col];
    }
    return result;
  },

  init: function (input) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        this.nodeMap[i][j] = new Node(input[i][j], i, j);
      }
    }
    this.solvedNodesNum = 0;
  },

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

  addByOne: function() {
    return ++this.solvedNodesNum;
  },

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