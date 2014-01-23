var todomvc = new HexagonalTodo();
todomvc.storage = window.HexagonalLocalStorage('clear-todo-test')

describe('Clear Completed Todos', function() {
  beforeEach(function() {
    todomvc.storage.clear();
  });

  after(function() {
    todomvc.storage.clear();
  });

  describe('when there are no todos', function() {
    beforeEach(function() {
      todomvc.clearCompleted();
    });

    it('clears', function() {
      expect(todomvc.storage.all()).to.have.length(0);
    });
  });

  describe('when there is one todo', function() {
    beforeEach(function() {
      todomvc.storage.push({title: 'Completed task', completed: true});
      todomvc.clearCompleted();
    });

    it('clears', function() {
      expect(todomvc.storage.all()).to.have.length(0);
    });
  });

  describe('where there is more than one todo', function() {
    beforeEach(function() {
      todomvc.storage.push({title: 'Completed task', completed: true});
      todomvc.storage.push({title: 'Uncompleted task', completed: false});
      todomvc.storage.push({title: 'Completed task', completed: true});
      todomvc.clearCompleted();
    });

    it('clears', function() {
      expect(todomvc.storage.all()).to.have.length(1);
    });
  });
});
