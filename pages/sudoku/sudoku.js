var app = getApp();

var SudokuMap = require('./SudokuMap.js');
var Solver = require('./Solver.js');

var config = {
  data : {
    initMap: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],

      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    /*
    initMap : [
      [0, 0, 5, 3, 0, 0, 0, 0, 0],
      [8, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 7, 0, 0, 1, 0, 5, 0, 0],

      [4, 0, 0, 0, 0, 5, 3, 0, 0],
      [0, 1, 0, 0, 7, 0, 0, 0, 6],
      [0, 0, 3, 2, 0, 0, 0, 8, 0],

      [0, 6, 0, 5, 0, 0, 0, 0, 9],
      [0, 0, 4, 0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 9, 7, 0, 0],
    ],*/
    choosingCell : [null, null],
    readyToInput : false,
    solveDone : false
  },

  onLoad : function() {

  },

  onShow : function() {

  },

  goToMenu : function() {
    wx.navigateTo({
      url: '../menu/menu'
    })
  },

  cellClick : function(e) {
    var cellId = e.target.id.split("_");
    this.setData({
      choosingCell : [parseInt(cellId[1]), parseInt(cellId[2])],
      readyToInput : true
    });

  },

  inputNum : function(e) {
    if (!this.data.readyToInput) {
      return;
    }
    var numToBeInput = e.target.dataset.num;
    var newMap = this.data.initMap;
    newMap[this.data.choosingCell[0]][this.data.choosingCell[1]] = numToBeInput;
    this.setData({
      initMap : newMap
    });
  },

  doSolve : function() {
    if (this.data.solveDone) {
      return;
    }
    var allZero = true;
    process : {
      for (var i=0; i<9; i++) {
        for (var j=0; j<9; j++) {
          if (this.data.initMap[i][j] > 0) {
            allZero = false;
            break process;
          }
        }
      }
    }
    if (allZero) {
      return;
    }
    var map = new SudokuMap();
    map.init(this.data.initMap);
    var solver = new Solver(map);
    solver.doSolve();
    this.setData({
      initMap : solver.map.getResult(),
      solveDone : true
    });
  },

  emptyAreaClick : function() {
    this.setData({
      choosingCell: [null, null],
      readyToInput: false
    });
  },

  clean : function() {
    this.setData({
      initMap: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      choosingCell: [null, null],
      readyToInput: false,
      solveDone: false
    });
  }
}

Page(config);