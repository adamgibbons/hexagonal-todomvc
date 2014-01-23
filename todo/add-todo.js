window.HexagonalTodo.prototype.addTodo = function(newTodo) {
  newTodo = newTodo.trim();

  if(!newTodo.length) {
    return;
  }

  this.storage.push({
    title: newTodo,
    completed: false
  })
}
