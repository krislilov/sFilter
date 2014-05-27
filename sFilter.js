/*
 * sFilter jQuery plugin
 * Author : Kris 
 * Version : 1.0
 * Date : 27.05.2014
 * Description : This is a simple jQuery plugin that creates filtering functionality to a multiselect dropdown.
 * 
 *	INSTRUCTIONS:
 *	
 *		1. HOW TO USE
 *			Just apply the plugin name to a multiselect : $('#mySelect').sFilter();
 *			
 *		2. OPTIONS
 *			optGroupLabel			 - The label for the <optGroup> containing the search results
 *			searchInput				 - The input where the filtering is happending (if not set, will create a default filter input on top of your multiselect
 *			duplicateContainer		 - The container which holds the default values, used for filtering to preserve the real select options (NOT recommended to change)
 *			searchInputClass		 - Add class/classes to the default search input
 *			searchInputPlaceHolder	 - Place holder attribute for the default search input
 *			
 */

(function($) {

	$.fn.sFilter = function(options) {

		var settings = $.extend({
			optGroupLabel: 'Search results : ',
			duplicateContainer: $('<select id="duplicate" style="display:none"></select>'), 
			searchInput: $('<input type="text" id="defaultFilterInput" role="default"/>'),
			searchInputClass : 'default-class',
			searchInputPlaceHolder : 'Search',
		}, options);

		var sFilter = $(this);
		var defaultSelect = sFilter.html();
		
		// Make a copy of the select	
		settings.duplicateContainer.append(defaultSelect);
		$('body').append(settings.duplicateContainer);

		// If no search input has been declared, create a default one over the select		
		if (settings.searchInput.attr('role') == 'default') {
			sFilter.before(settings.searchInput);
			settings.searchInput.addClass(settings.searchInputClass);
			settings.searchInput.attr('placeholder',settings.searchInputPlaceHolder);
		}

		// Container for the filtered options
		var options = $('<optgroup label="' + settings.optGroupLabel + '"></optgroup>');
		options.attr('label', settings.optGroupLabel);

		// Input type event	
		settings.searchInput.keyup(function() {
			var search = $(this).val().toLowerCase();

			if (search.length < 1) {
				sFilter.html(defaultSelect);
			}
			else {
				options.html('');
				settings.duplicateContainer.find('option').each(function() {

					var string = $(this).text().toLowerCase();

					if (string.search(search) !== -1) {
						options.append($(this).clone());
					}
				})
				sFilter.html(options);
			}
		})

		return this;
	};

}(jQuery));