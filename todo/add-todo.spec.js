var todomvc = new HexagonalTodo();
todomvc.storage = window.HexagonalLocalStorage('add-todo-test')

describe('Add Todo', function() {
  beforeEach(function() {
    todomvc.storage.clear();
  });

  after(function() {
    todomvc.storage.clear();
  });

  describe('when todo is empty', function() {
    beforeEach(function() {
      todomvc.addTodo('');
    });

    it('does not add todo', function() {
      expect(todomvc.storage.all()).to.have.length(0);
    });
  });

  describe('when valid todo', function() {
    beforeEach(function() {
      todomvc.addTodo(' Create gif of kitten ');
    });

    it('adds as uncomplete', function() {
      var todo = todomvc.storage.first();
      expect(todo.completed).to.be(false);
    });

    it('trims the title of whitespace', function() {
      var todo = todomvc.storage.first();
      expect(todo.title).to.be('Create gif of kitten');
    });
  });
});
