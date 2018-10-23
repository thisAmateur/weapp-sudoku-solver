/**
 * 解分支的存档，存在栈上
 * node：解分支 分叉点，类型为Node
 * map：分叉前的map存档，类型为SudokuMap
 */
function Memory(node, map) {
  this.node = node;
  this.map = map;
}

module.exports = Memory;