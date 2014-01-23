window.HexagonalTodo.prototype.clearCompleted = function() {
  var completed = this.storage.filter(function(todo) {
    return todo.completed;
  });

  completed.forEach(function(todo) {
    this.storage.remove(todo);
  }, this);
}
