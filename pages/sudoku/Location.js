/**
 * Node的坐标
 * 整个9*9宫格区域从左上角(0,0)到右下角(8,8)
 * row：横坐标
 * col：纵坐标
 */
function Location(row, col) {
  this.row = row;
  this.col = col;
}

module.exports = Location;