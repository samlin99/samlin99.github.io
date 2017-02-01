System.register(["aurelia-dialog"], function (_export, _context) {
  "use strict";

  var DialogController, _class, _temp, Map;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDialog) {
      DialogController = _aureliaDialog.DialogController;
    }],
    execute: function () {
      _export("Map", Map = (_temp = _class = function () {
        function Map(controller) {
          _classCallCheck(this, Map);

          this.tgtLocation = "";

          this.controller = controller;
          this.controller.settings.lock = false;
        }

        Map.prototype.activate = function activate(tgtLocation) {
          this.tgtLocation = encodeURIComponent(tgtLocation);
        };

        return Map;
      }(), _class.inject = [DialogController], _temp));

      _export("Map", Map);
    }
  };
});
//# sourceMappingURL=map.js.map
