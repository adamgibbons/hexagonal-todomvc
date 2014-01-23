window.HexagonalTodo.prototype.markAll = function(done) {
  this.storage.all().forEach(function(todo) {
    todo.completed = done;
    this.storage.save(todo);
  }, this);
}
