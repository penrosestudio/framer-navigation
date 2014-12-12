// Generated by CoffeeScript 1.8.0
(function() {
  var hideAppDrawer, showAppDrawer;

  Framer.Defaults.Animation = {
    curve: "spring(400,40,0)"
  };

  Framer.Navigation = {
    history: []
  };

  Framer.Navigation.initialize = function(layers) {
    Framer.Navigation.layers = layers;
    Framer.Navigation.makeLayerShortcuts();
    Framer.Navigation.setupBackButtons();
    Framer.Navigation.setupScreenNavigation();
    return Framer.Navigation.setupHamburgerMenus();
  };

  Framer.Navigation.makeLayerShortcuts = function() {
    var layer, _results;
    _results = [];
    for (layer in Framer.Navigation.layers) {
      _results.push(window[layer] = Framer.Navigation.layers[layer]);
    }
    return _results;
  };

  Framer.Navigation.everyLayer = function(fn, currentLayer) {
    var layer, layerName, subLayer, _i, _len, _ref, _results, _results1;
    if (currentLayer) {
      fn(currentLayer);
      _ref = currentLayer.subLayers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subLayer = _ref[_i];
        _results.push(Framer.Navigation.everyLayer(fn, subLayer));
      }
      return _results;
    } else {
      _results1 = [];
      for (layerName in Framer.Navigation.layers) {
        layer = Framer.Navigation.layers[layerName];
        _results1.push(Framer.Navigation.everyLayer(fn, layer));
      }
      return _results1;
    }
  };

  Framer.Navigation.setupBackButtons = function() {
    return Framer.Navigation.everyLayer(function(layer) {
      if (layer.name.endsWith('Back_Button')) {
        return layer.onClickSlideBack();
      }
    });
  };

  Framer.Navigation.setupScreenNavigation = function() {
    return Framer.Navigation.everyLayer(function(layer) {
      var match;
      match = layer.name.match(/Goto_(.*)/);
      if (match && match[1] && match[1].length !== 0) {
        return layer.onClickSlideTo(Framer.Navigation.layers[match[1]]);
      }
    });
  };

  Framer.Navigation.setupHamburgerMenus = function() {
    return Framer.Navigation.everyLayer(function(layer) {
      if (layer.name.endsWith('Hamburger')) {
        return layer.on(Events.Click, showAppDrawer);
      }
    });
  };

  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };

  Layer.prototype.getScreen = function() {
    var superLayer;
    superLayer = this._superLayer;
    if (superLayer === null) {
      return null;
    } else if (superLayer.name.endsWith('Screen')) {
      return superLayer;
    } else {
      return superLayer.getScreen();
    }
  };

  Layer.prototype.slideOffLeft = function() {
    return this.animate({
      properties: {
        x: -640
      }
    });
  };

  Layer.prototype.slideFromRight = function() {
    this.bringToFront();
    this.x = 640;
    this.visible = true;
    this.opacity = 1;
    return this.animate({
      properties: {
        x: 0
      }
    });
  };

  Layer.prototype.slideOffRight = function() {
    return this.animate({
      properties: {
        x: 640
      }
    });
  };

  Layer.prototype.slideFromLeft = function() {
    this.bringToFront();
    this.x = -640;
    this.visible = true;
    this.opacity = 1;
    return this.animate({
      properties: {
        x: 0
      }
    });
  };

  hideAppDrawer = function(event, layer) {
    Framer.Navigation.hamburgerVisible = false;
    layer.animate({
      properties: {
        x: 0
      }
    });
    return layer.off(Events.Click, hideAppDrawer);
  };

  showAppDrawer = function(event, layer) {
    var currentScreen;
    currentScreen = this.getScreen();
    if (!Framer.Navigation.hamburgerVisible) {
      Hamburger_Drawer.opacity = 1;
      Hamburger_Drawer.visible = true;
      Hamburger_Drawer.x = 0;
      Framer.Navigation.hamburgerVisible = true;
      Hamburger_Drawer.placeBehind(currentScreen);
      currentScreen.animate({
        properties: {
          x: -540
        }
      });
      return setTimeout((function() {
        return currentScreen.on(Events.Click, hideAppDrawer);
      }), 100);
    }
  };

  Layer.prototype.onClickSlideTo = function(newScreen) {
    return this.on(Events.Click, function() {
      var currentScreen;
      currentScreen = this.getScreen();
      if (currentScreen !== newScreen) {
        currentScreen.slideOffLeft();
        newScreen.slideFromRight();
        return Framer.Navigation.history.push(currentScreen);
      }
    });
  };

  Layer.prototype.onClickSlideBack = function() {
    return this.on(Events.Click, function() {
      var backScreen, currentScreen;
      if (history.length !== 0) {
        currentScreen = this.getScreen();
        currentScreen.slideOffRight();
        backScreen = Framer.Navigation.history.pop();
        return backScreen.slideFromLeft();
      }
    });
  };

}).call(this);