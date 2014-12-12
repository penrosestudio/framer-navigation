Framer.Defaults.Animation =
  curve: "spring(400,40,0)"

Framer.Navigation =
    history: []

Framer.Navigation.initialize = (layers) ->
    Framer.Navigation.layers = layers
    Framer.Navigation.makeLayerShortcuts()
    Framer.Navigation.setupBackButtons()
    Framer.Navigation.setupScreenNavigation()
    Framer.Navigation.setupHamburgerMenus()
    
Framer.Navigation.makeLayerShortcuts = ->
    for layer of Framer.Navigation.layers
        window[layer] = Framer.Navigation.layers[layer]

Framer.Navigation.everyLayer = (fn, currentLayer) ->
    if currentLayer
        fn currentLayer
        for subLayer in currentLayer.subLayers
            Framer.Navigation.everyLayer fn, subLayer
    else
        for layerName of Framer.Navigation.layers
            layer = Framer.Navigation.layers[layerName]
            Framer.Navigation.everyLayer fn, layer

Framer.Navigation.setupBackButtons = ->
    Framer.Navigation.everyLayer (layer) ->
        layer.onClickSlideBack() if layer.name.endsWith 'Back_Button'

Framer.Navigation.setupScreenNavigation = ->
    Framer.Navigation.everyLayer (layer) ->
        match = layer.name.match(/Goto_(.*)/)
        if match and match[1] and match[1].length isnt 0
            layer.onClickSlideTo Framer.Navigation.layers[match[1]]

Framer.Navigation.setupHamburgerMenus = ->
    Framer.Navigation.everyLayer (layer) ->
        if layer.name.endsWith 'Hamburger'  
            layer.on Events.Click, showAppDrawer
            
String::endsWith = (suffix) ->
  @indexOf(suffix, @length - suffix.length) isnt -1

# getScreen - returns the Screen layer containing this layer
Layer::getScreen = ->
    superLayer = @_superLayer
    if (superLayer is null)
        return null
    else if (superLayer.name.endsWith 'Screen')
        superLayer
    else
        superLayer.getScreen()

Layer::slideOffLeft = ->
    @animate
        properties:
            x: -640

Layer::slideFromRight = ->
    @bringToFront()
    @x = 640
    @visible = true
    @opacity = 1
    @animate
        properties:
            x: 0

Layer::slideOffRight = ->
    @animate
        properties:
            x: 640

Layer::slideFromLeft = ->
    @bringToFront()
    @x = -640
    @visible = true
    @opacity = 1
    @animate
        properties:
            x: 0
            
hideAppDrawer = (event, layer) ->
    Framer.Navigation.hamburgerVisible = false  
    layer.animate
        properties:
            x: 0
    layer.off Events.Click, hideAppDrawer
    
showAppDrawer = (event, layer) ->
    currentScreen = @getScreen()
    unless Framer.Navigation.hamburgerVisible
        Hamburger_Drawer.opacity = 1
        Hamburger_Drawer.visible = true
        Hamburger_Drawer.x = 0
        Framer.Navigation.hamburgerVisible = true
        Hamburger_Drawer.placeBehind currentScreen
        currentScreen.animate
            properties:
                x: -540
        setTimeout ( ->
            currentScreen.on Events.Click, hideAppDrawer
        ), 100

Layer::onClickSlideTo = (newScreen) ->
    @on Events.Click, ->
        currentScreen = @getScreen()
        if currentScreen isnt newScreen
            currentScreen.slideOffLeft()
            newScreen.slideFromRight()
            Framer.Navigation.history.push currentScreen

Layer::onClickSlideBack = ->
    @on Events.Click, ->
        if history.length isnt 0
            currentScreen = @getScreen()
            currentScreen.slideOffRight()
            backScreen = Framer.Navigation.history.pop()
            backScreen.slideFromLeft()
