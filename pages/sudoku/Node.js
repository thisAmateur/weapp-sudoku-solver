var Location = require('./Location.js');

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

  clone: function () {
    var _obj = JSON.stringify(this);
    var rnt = JSON.parse(_obj);
    var cloneObj = new Node(rnt.value, rnt.location.row, rnt.location.col, rnt.candidates);
    return cloneObj;
  }
}

module.exports = Node;