var Const = require('./Const.js');

function SolveUtils() {

}

SolveUtils.prototype = {
  isAllSolved: function (map) {
    var rnt = map.solvedNodesNum == Const.prototype.ALL_NODE_NUM;
    return rnt;
  },

  scanForStableNode: function (map) {
    var result = Const.prototype.FALSE;
    process: {
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          var node = map.getNode(i, j);
          if (node.value == 0) {
            if (node.candidates.length == 1) {
              result = Const.prototype.TRUE;
              var value = node.candidates[0];
              node.value = value;
              if (!this.solveByOneNode(map, i, j)) {
                result = Const.prototype.WRONG;
              }
              break process;
            }
          }
        }
      }
    }
    return result;
  },

  findNodeHasMinCandidates: function (map) {
    var min = 9;
    var result = null;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (map.getNode(i, j).value == 0) {
          if (map.getNode(i, j).candidates.length < min) {
            result = map.getNode(i, j);
            min = result.candidates.length;
          }
        }
      }
    }
    return result;
  },

  solveByOneNode: function (map, row, col) {
    var rst = true;
    map.addByOne();
    var value = map.getNode(row, col).value;
    process: {
      var rowNodes = map.getRow(row);
      for (var i = 0; i < 9; i++) {
        var tempNode = rowNodes[i];
        if (tempNode.value == 0) {
          if (!tempNode.killCandidate(value)) {
            rst = false;
            break process;
          }
        }
      }
      var colNodes = map.getCol(col);
      for (var i = 0; i < 9; i++) {
        var tempNode = colNodes[i];
        if (tempNode.value == 0) {
          if (!tempNode.killCandidate(value)) {
            rst = false;
            break process;
          }
        }
      }
      var rowStart = parseInt(row / 3) * 3;
      var colStart = parseInt(col / 3) * 3;
      var node = null;
      for (var i = rowStart; i < rowStart + 3; i++) {
        for (var j = colStart; j < colStart + 3; j++) {
          node = map.getNode(i, j);
          if (node.value == 0) {
            if (!node.killCandidate(value)) {
              rst = false;
              break process;
            }
          }
        }
      }
    }
    return rst;
  }
}

module.exports = SolveUtils;