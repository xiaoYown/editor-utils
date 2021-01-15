/*!
* @xv/editor-utils v1.0.0
* (c) 2021 xiaoYown
* @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['@xv/editor-utils'] = {}));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  // effect 为 report 时仅能 update
  function readBeforeData(opts) {
    opts.map(function (item) {
      var opt = {
        id: item.id,
        action: 'update',
        effect: item.effect,
        data: {}
      };

      switch (item.action) {
        case 'insert':
          opt.action = 'delete';
          break;

        case 'delete':
          opt.action = 'insert';
          break;
      }

      return item;
    });
  }

  var OperationHistory = /*#__PURE__*/function () {
    function OperationHistory() {
      _classCallCheck(this, OperationHistory);

      _defineProperty(this, "step", -1);

      _defineProperty(this, "operationList", []);
    }

    _createClass(OperationHistory, [{
      key: "do",
      value: function _do(opts) {
        var before = readBeforeData;
        var after = opts;
        this.operationList.push({
          before: before,
          after: after
        });
        this.step = this.operationList.length - 1;
      }
    }, {
      key: "redo",
      value: function redo() {
        return this.move(1);
      }
    }, {
      key: "undo",
      value: function undo() {
        return this.move(-1);
      }
    }, {
      key: "move",
      value: function move(increment) {
        var opt = null;

        if (this.step < this.total) {
          this.step += increment;
          opt = this.operationList[this.step];
        }

        return opt;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.step = -1;
        this.operationList = [];
      }
    }, {
      key: "total",
      get: function get() {
        return this.operationList.length - 1;
      }
    }]);

    return OperationHistory;
  }();

  exports.OperationHistory = OperationHistory;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
