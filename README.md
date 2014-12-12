# Framer Navigation

Use conventions to name your Sketch layers and Framer Navigation will add navigation to your [Framer.js](http://framerjs.com) prototype automagically.

## How to use
* Open your Framer Studio project folder (e.g. "myapp.framer")
* Add [framer-navigation.js](https://github.com/penrosestudio/framer-navigation/blob/master/framer-navigation.js) to the `framer` subfolder.
* Open `index.html` and add `<script src="framer/framer-navigation.js"></script>` after the line `<script src="framer/init.js"></script>`.
* In Framer Studio, after importing your layers, call initialize:
```
    layers = Framer.Importer.load "..."
    Framer.Navigation.initialize layers
```

## Behaviours

Note: Framer Navigation assumes screen layers (or artboards) are given a name ending in 'Screen'.

### 1. Goto
Clicking on a layer with a name ending 'Goto [X]' will slide in layer [X]. For example, clicking 'Button Goto Cart Screen' will slide in 'Cart Screen'.

### 2. Back
Clicking on a layer with the name 'Back Button' will slide back in the previous screen. (A history stack is kept so you can go back repeatedly).

### 3. Hamburger
Clicking on a layer with the name 'Hamburger' will slide in a layer named 'Hamburger Drawer'. Clicking outside of the hamburger drawer will close it.

### 4. everyLayer and onClickSlideTo
The above behaviours are built from the functions `everyLayer` and `onClickSlideTo`, and you can use them directly to build your own custom behaviour. See the `Framer.Navigation.setup[...]` functions for examples.

## Reporting Issues

- Add an issue, or email chris@penrosestudio.com