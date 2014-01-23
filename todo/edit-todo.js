window.HexagonalTodo.prototype.editTodo = function(todo) {
  todo.title = todo.title.trim();
  if(todo.title == null || todo.title == '' || typeof todo.title == 'undefined') {
    this.removeTodo(todo);
  } else {
    this.storage.save(todo);
  }
}

