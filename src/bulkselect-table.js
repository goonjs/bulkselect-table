(function($){

	$.applyBulkSelectTable = function(obj, settings) {
		
		var lastClickedElement = null,
			lastClickedChecked = false,
			lastClickedIndex = null;
			
		var applyClass = function(obj, className, checked) {
			if(checked)
				obj.addClass(className);
			else
				obj.removeClass(className);
		};
			
		obj.on('click', '.'+settings.selectAllClass, function(e) {
			var checked = $(this).is(':checked'),
				items = obj.find('.'+settings.checkboxClass);
			
			items.prop('checked', checked);
			
			if(checked)
				items.parents(settings.parentTag).addClass(settings.selectedClass);
			else
				items.parents(settings.parentTag).removeClass(settings.selectedClass);
		});

		obj.on('click', '.'+settings.checkboxClass, function(e) {
			var o = $(e.target);
			clickingElement = o;
			clickingChecked = o.is(':checked');
			clickingIndex = o.parents(settings.parentTag).index();
			
			applyClass(clickingElement.parents(settings.parentTag), settings.selectedClass, clickingChecked);
			
			if(e.shiftKey && lastClickedElement!==null) {
				var list,
					start,
					end;

				if(lastClickedIndex < clickingIndex) {
					start = lastClickedElement.parents(settings.parentTag);
					end = clickingElement.parents(settings.parentTag);
					list = start.nextUntil(end);
				}
				else if(lastClickedIndex > clickingIndex) {
					start = lastClickedElement.parents(settings.parentTag);
					end = clickingElement.parents(settings.parentTag);
					list = start.prevUntil(end);
				}

				lastClickedElement.prop('checked', clickingChecked);
				applyClass(start, settings.selectedClass, clickingChecked);

				list.find('.'+settings.checkboxClass).prop('checked', clickingChecked);
				applyClass(list, settings.selectedClass, clickingChecked);
				
				obj.trigger(clickingChecked ? 'bulk-select' : 'bulk-deselect', {
					'start': start,
					'end': end,
					'list': list,
					'applied': Math.abs(clickingIndex-lastClickedIndex+1)
				});
			}
			
			lastClickedElement = clickingElement;
			lastClickedChecked = clickingChecked;
			lastClickedIndex = clickingIndex;
		});
	};
	
	$.fn.bulkSelectTable = function(options) {
		var settings = $.extend({
			selectAllClass: 'selectall',
			checkboxClass: 'selectable',
			selectedClass: 'selected',
			parentTag: 'tr'
		}, options);
		
		return this.each(function(){
			$.applyBulkSelectTable($(this), settings);
		});
	};
	
}(jQuery));