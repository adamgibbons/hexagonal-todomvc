angular.module('todomvc-ionic', ['ionic'])
  .constant('storageType', 'local')

  .factory('storage', function($window, storageType) {
    var storage = {
      'local': function() { return $window.HexagonalLocalStorage('hexagonal-angular-todo') }
    }

    return storage[storageType]();
  })

  .factory('todomvc', function($window, storage) {
    var todomvc = new $window.HexagonalTodo();
    todomvc.storage = storage;
    return todomvc;
  })

  .controller('TodoCtrl', function($scope, todomvc) {
    function refresh() {
      $scope.todos = todomvc.get();

      $scope.remainingCount = $scope.todos.reduce(function(count, todo) {
        if(!todo.completed) {
          count++;
        }
        return count;
      }, 0);
      $scope.completedCount = $scope.todos.length - $scope.remainingCount;
    }

    // Initialize data
    refresh();

    $scope.newTodo = {title: '', show: false};
    $scope.editedTodo = null;
    $scope.optionButtons = [{
      onTap: function(todo) { $scope.removeTodo(todo); },
      type: 'button-assertive',
      text: 'Delete'
    }, {
      type: 'button-balanced',
      text: 'Complete'
    }]

    // Monitor the current route for changes and adjust the filter accordingly.
    $scope.$on('$routeChangeSuccess', function () {
      var status = $scope.status = $routeParams.status || '';
      $scope.statusFilter = (status === 'active') ?
        { completed: false } : (status === 'completed') ?
        { completed: true } : null;
    });

    $scope.addTodo = function() {
      todomvc.addTodo($scope.newTodo.title);
      $scope.newTodo = {title: '', show: false};
      refresh();
    }

    $scope.clearCompletedTodos = function() {
      todomvc.clearCompleted();
      refresh();
    }

    $scope.editTodo = function(todo) {
      $scope.editedTodo = todo;
      // Clone the original todo to restore it on demand.
      $scope.originalTodo = angular.extend({}, todo);
    }

    $scope.doneEditing = function (todo) {
      $scope.editedTodo = null;
      todomvc.editTodo(todo);
      refresh();
    }

    $scope.removeTodo = function(todo) {
      todomvc.removeTodo(todo);
      refresh();
    }

    $scope.markAll = function(done) {
      todomvc.markAll(done);
      refresh();
    }
  });
