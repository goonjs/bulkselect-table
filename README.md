bulkselect-table
================

Shift-click to check/uncheck multiple checkboxs

As easy as:
```js
$('#table').bulkSelectTable();
```

and:
* Add class 'selectable' to any checkbox you need to apply shift-Click
* Add class 'selectall' for the primary checkbox to select all others checkbox
* Also note that bulkSelectTable look for 'tr' as parent of each row and the 'selected' class will be applied for the row that are checked


Configuration:
```js
$('#table').bulkSelectTable({
  checkboxClass: 'anotherClass', // class name for any checkbox to use Shift-Click Behavior
  selectedClass: 'appliedClass', // class name that will be applied to the selected container
  parentTag: 'tr.row', // container selector
  
  selectAllClass: 'anotherSelectAllClass' // class name that will be applied SelectAll Behavior
});
```
