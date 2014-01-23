var todomvc = new HexagonalTodo();
todomvc.storage = window.HexagonalLocalStorage('remove-todo-test')

describe('Remove Todo', function() {
  beforeEach(function() {
    todomvc.storage.clear();
  });

  after(function() {
    todomvc.storage.clear();
  });

  describe('when todo does not exist', function() {
    beforeEach(function() {
      todomvc.storage.push({title: 'Does exist'});
      todomvc.removeTodo({title: 'Does not exist'});
    });

    it('clears', function() {
      expect(todomvc.storage.all()).to.have.length(1);
    });
  });

  describe('when todo exists', function() {
    beforeEach(function() {
      var todo = {title: 'Does exist', completed: true}
      todomvc.storage.push(todo);
      todomvc.removeTodo(todo);
    });

    it('clears', function() {
      expect(todomvc.storage.all()).to.have.length(0);
    });
  });
});
