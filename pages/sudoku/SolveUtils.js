var Const = require('./Const.js');

/**
 * 各种解题方法的工具类
 */
function SolveUtils() {

}

SolveUtils.prototype = {
  /**
   * 判断一个map是否已经解完
   */
  isAllSolved: function (map) {
    var rnt = map.solvedNodesNum == Const.prototype.ALL_NODE_NUM;
    return rnt;
  },

  /**
   * 根据当前map中的各待定点候选值情况来确定某些点的实际值
   * 如果某个待定点的候选值个数为1，则该待定点的实际值就是剩下的最后一个候选值
   * 
   * 返回值：FALSE:没有一个待定点变为确定点；TRUE:有待定点变为确定点；WRONG:当前解分支错误
   */
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

  /**
   * 找到当前map中候选值最少的待定点
   * 用来作为新的解分支的起点
   */
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

  /**
   * 根据一个确定的点，删除该行、该列、该宫格内所有待定点的候选值
   * 被删除的候选值就是确定点的实际值
   * 同时，若某个待定点的候选值个数被删光了，说明当前解分支是错误的
   * 
   * 返回值：是否有某个待定点的候选值被删光了，即当前解分支是否正确
   */
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