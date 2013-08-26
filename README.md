bulkselect-table
================

Shift-click to check/uncheck multiple checkboxs

Simplest way:

$('#table').bulkSelectTable();

// For the simplest way. You also need to add 'selectable' class in any checkbox you need to apply shift-Click

// You can also add 'selectall' class for the primary checkbox to select all others checkbox

// Also note that bulkSelectTable look for 'tr' as parent of each row and the 'selected' class will be applied for the row that are checked

Configurable:

$('#table').bulkSelectTable({
  checkboxClass: 'anotherClass', // class name that will be applied Shift-Click Behavior
  selectedClass: 'appliedClass', // class name that will be applied to Container
  parentTag: 'tr.row', // selector that will be used to find as Container
  
  selectAllClass: 'anotherSelectAllClass' // class name that will be applied SelectAll Behavior
});
