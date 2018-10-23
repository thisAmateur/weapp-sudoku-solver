var Location = require('./Location.js');

/**
 * 宫格节点，总共有9*9个宫格
 * value：实际填的值，范围[0,9]，0表示该点未解
 * location：该点的坐标，横纵坐标从0~8，左上角的(0,0)是原点，类型为Location
 * candidates：剩余可能的值
 */
function Node(value, row, col, candidates) {
  this.value = value;
  this.location = new Location(row, col);
  if (candidates) {
    this.candidates = candidates;
  } else {
    this.candidates = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    if (value != 0) {
      this.candidates.splice(value - 1, 1);
    }
  }
}

Node.prototype = {
  /**
   * 删除候选值
   */
  killCandidate: function (value) {
    var length = this.candidates.length;
    for (var i = 0; i < length; i++) {
      if (this.candidates[i] == value) {
        this.candidates.splice(i, 1);
        break;
      }
    }
    var rnt = this.candidates.length != 0;
    return rnt;
  },

  /**
   * 深拷贝
   */
  clone: function () {
    var _obj = JSON.stringify(this);
    var rnt = JSON.parse(_obj);
    var cloneObj = new Node(rnt.value, rnt.location.row, rnt.location.col, rnt.candidates);
    return cloneObj;
  }
}

module.exports = Node;