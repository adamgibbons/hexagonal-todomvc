window.HexagonalLocalStorage = function(STORAGE_ID) {
  function uuid() {
    // http://stackoverflow.com/a/2117523/1141531
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
  }

  function fetch(id) {
    var raw = localStorage.getItem(id);
    if(raw !== null && raw !== undefined) {
      return JSON.parse(raw);
    }
  }

  function remove(id) {
    localStorage.removeItem(id);
  }

  function set(id, obj) {
    localStorage.setItem(id, JSON.stringify(obj));
  }

  if(STORAGE_ID === null) {
    STORAGE_ID = uudi();
  }

  return {
    all: function() {
      return this.filter(function(todo) { return true });
    },
    clear: function() {
      this.index().forEach(function(index) {
        remove(index);
      });

      remove(STORAGE_ID);
    },
    first: function() {
      return this.all()[0];
    },
    filter: function(fn) {
      var collection = [];

      this.index().forEach(function(index) {
        var obj = fetch(index);
        if(obj !== null && obj !== undefined) {
          if(fn(obj)) {
            collection.push(obj);
          }
        }
      });

      return collection;
    },
    get: function(id) {
      return fetch(index)
    },
    index: function() {
      return fetch(STORAGE_ID) || [];
    },
    push: function(obj) {
      this.save(obj);
    },
    remove: function(obj) {
      var id;
      if(typeof obj === 'object' && obj.hasOwnProperty('id')) {
        id = obj.id;
      } else if(typeof obj === 'string') {
        id = obj;
      } else {
        return false;
      }

      var index = this.index();
      var pos = index.indexOf(id);
      if(pos !== -1) {
        index.splice(pos, 1);
        set(STORAGE_ID, index);
      }
      remove(id);
    },
    save: function(obj) {
      if(obj.id === null || obj.id === undefined) {
        obj.id = uuid();
      }

      var index = this.index();
      if(index.indexOf(obj.id) === -1) {
        index.push(obj.id);
        set(STORAGE_ID, index);
      }

      set(obj.id, obj);
    }
  }
}
