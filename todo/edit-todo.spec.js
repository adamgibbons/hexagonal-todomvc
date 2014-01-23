var todomvc = new HexagonalTodo();
todomvc.storage = window.HexagonalLocalStorage('edit-todo-test')

describe('Edit Todo', function() {
  beforeEach(function() {
    todomvc.storage.clear();
  });

  after(function() {
    todomvc.storage.clear();
  });

  describe('when todo exists', function() {
    beforeEach(function() {
      var todo = {title: 'Find a unicorn', completed: false}
      todomvc.storage.push(todo);

      todo.title = 'Find a full stack developer';
      todo.completed = true;
      todomvc.editTodo(todo);
    });

    it('changes the title', function() {
      var todo = todomvc.storage.first();
      expect(todo.title).to.be('Find a full stack developer');
    });

    it('changes the completed state', function() {
      var todo = todomvc.storage.first();
      expect(todo.completed).to.be(true);
    })
  });

  describe('when todo has no title', function() {
    beforeEach(function() {
      var todo = {title: 'Find a unicorn', completed: false}
      todomvc.storage.push(todo);

      todo.title = '';
      todomvc.editTodo(todo);
    });

    it('removes the todo', function() {
      expect(todomvc.storage.all()).to.have.length(0);
    });
  });
});
