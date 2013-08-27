(function($){

	$.applyBulkSelectTable = function(obj, settings) {
		
		var lastClickedElement = null,
			lastClickedChecked = false,
			lastClickedIndex = null;
			
		var applyClass = function(obj, className, checked) {
			if(checked)
				obj.addClass(className)
			else
				obj.removeClass(className)
		}
			
		obj.on('click', '.'+settings.selectAllClass, function(e) {
			var checked = $(this).attr('checked'),
				items = obj.find('.'+settings.checkboxClass);
			
			items.attr('checked', checked || null);
			
			if(checked)
				items.addClass(settings.selectedClass);
			else
				items.removeClass(settings.selectedClass);
		})

		obj.on('click', '.'+settings.checkboxClass, function(e) {
			var o = $(e.target);
			clickingElement = o;
			clickingChecked = o.attr('checked');
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

				lastClickedElement.attr('checked', clickingChecked || null);
				applyClass(start, settings.selectedClass, clickingChecked);

				list.find('.'+settings.checkboxClass).attr('checked', clickingChecked || null);
				applyClass(list, settings.selectedClass, clickingChecked);
				
				obj.trigger(clickingChecked ? 'bulk-select' : 'bulk-deselect', {
					'start': start,
					'end': end,
					'list': list,
					'applied': Math.abs(clickingIndex-lastClickedIndex)
				})
			}
			
			lastClickedElement = clickingElement;
			lastClickedChecked = clickingChecked;
			lastClickedIndex = clickingIndex;
		})
	}
	
	$.fn.bulkSelectTable = function(options) {
		var settings = $.extend({
			selectAllClass: 'selectall',
			checkboxClass: 'selectable',
			selectedClass: 'selected',
			parentTag: 'tr'
		}, options);
		
		return this.each(function(){
			$.applyBulkSelectTable($(this), settings);
		})
	}
	
}(jQuery));