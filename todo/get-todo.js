window.HexagonalTodo.prototype.get = function(id) {
  if(id) {
    return this.storage.get(id);
  }

  return this.storage.all();
}
