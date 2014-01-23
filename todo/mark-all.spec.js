var todomvc = new HexagonalTodo();
todomvc.storage = window.HexagonalLocalStorage('mark-todo-test')

describe('Mark All Todos', function() {
  beforeEach(function() {
    todomvc.storage.clear();
  });

  after(function() {
    todomvc.storage.clear();
  });

  describe('when marking completed', function() {
    beforeEach(function() {
      todomvc.storage.push({title: 'Incompletd #1', completed: false});
      todomvc.storage.push({title: 'Incompletd #1', completed: false});
      todomvc.storage.push({title: 'Incompletd #1', completed: false});
      todomvc.markAll(true);
    });

    it('sets completed to true', function() {
      todomvc.storage.all().forEach(function(todo) {
        expect(todo.completed).to.be.ok();
      });
    });
  });

  describe('when marking incompleted', function() {
    beforeEach(function() {
      todomvc.storage.push({title: 'Completd #1', completed: true});
      todomvc.storage.push({title: 'Completd #1', completed: true});
      todomvc.storage.push({title: 'Completd #1', completed: true});
      todomvc.markAll(true);
    });

    it('sets completed to true', function() {
      todomvc.storage.all().forEach(function(todo) {
        expect(todo.completed).to.be.ok();
      });
    });
  });
});
