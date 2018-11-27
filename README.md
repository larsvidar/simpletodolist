# Simple ToDo
### A simple todo-app, using task-lists in SharePoint Online.

## simpletodolist

This is a todo app for when you only need the ability to add and remove list items.
Here you can create and delete Task-lists, and add and remove items.

Made using [Yeoman](http://yeoman.io/) SharePoint generator, [React](https://reactjs.org/) and [PnPjs](https://pnp.github.io/pnpjs/).

##TODO
* Let the user choose how many items should be listed on each page.
* Add a choice to cross out an item, instead of deleting it.
* Make the colors more consistent.
  * Let the user choose a color scheme.
* Move all strings to string-file.
  * Add norwegian locale.
* Add mock up functionality for workbench.

## Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
