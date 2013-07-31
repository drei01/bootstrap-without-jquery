/*!
 * Bootstrap without jQuery v0.3.1
 * By Daniel Davis under MIT License
 * https://github.com/tagawa/bootstrap-without-jquery
 */

!function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else context[name] = definition()
  
  context[name].init();
}('bootstrapnojquery', this, function () {
  return {
		init : function(){
			var self = this;
			// querySelectorAll support for older IE
		    // Source: http://weblogs.asp.net/bleroy/archive/2009/08/31/queryselectorall-on-old-ie-versions-something-that-doesn-t-work.aspx
		    if (!document.querySelectorAll) {
		        document.querySelectorAll = function(selector) {
		            var style = document.styleSheets[0] || document.createStyleSheet();
		            style.addRule(selector, "foo:bar");
		            var all = document.all, resultSet = [];
		            for (var i = 0, l = all.length; i < l; i++) {
		                if (all[i].currentStyle.foo === "bar") {
		                    resultSet[resultSet.length] = all[i];
		                }
		            }
		            style.removeRule(0);
		            return resultSet;
		        };
		    }
		
			// Set event listeners for collapsible menus
		    var collapsibles = document.querySelectorAll('[data-toggle=collapse]');
		    for (var i = 0, len = collapsibles.length; i < len; i++) {
		        collapsibles[i].onclick = doCollapse;
		    }
		
		    // Set event listeners for dropdown menus
		    var dropdowns = document.querySelectorAll('[data-toggle=dropdown]');
		    for (var i = 0, dropdown, len = dropdowns.length; i < len; i++) {
		        dropdown = dropdowns[i];
		        self.initDropdown(dropdown);
		    }
		
		    // Set event listeners for alert boxes
		    var alerts = document.querySelectorAll('[data-dismiss=alert]');
		    for (var i = 0, len = alerts.length; i < len; i++) {
		        alerts[i].onclick = self.closeAlert;
		    }
		},
		initDropdown: function(dropdown){
			var self = this;
			dropdown.setAttribute('tabindex', '0'); // Fix to make onblur work in Chrome
	        dropdown.onclick = self.doDropdown;
	        dropdown.onblur = self.closeDropdown;
		},
	    // Get the "hidden" height of a collapsed element
	    getHiddenHeight : function (el) {
	        var children = el.children;
	        var height = 0;
	        for (var i = 0, len = children.length, child; i < len; i++) {
	            child = children[i];
	            height += Math.max(child['clientHeight'], child['offsetHeight'], child['scrollHeight']);
	        }
	        return height;
	    },
	
	    // Collapse and expand the relevent element 
	    doCollapse : function (event) {
	        event = event || window.event;
	        var evTarget = event.currentTarget || event.srcElement;
	        var dataTarget = evTarget.getAttribute('data-target');
	        var target = document.querySelector(dataTarget);
	        var targetHeight = getHiddenHeight(target);
	        var className = (' ' + target.className + ' ');
	
	        if (className.indexOf(' ' + 'in' + ' ') > -1) {
	            // Hide the element
	            className = className.replace(' in ', ' ');
	            target.className = className;
	            target.style.height = '0';
	        } else {
	            // Show the element
	            target.className += ' in ';
	            target.style.height = targetHeight + 'px';
	        }
	        return false;
	    },
	
	    // Show a dropdown menu
	    doDropdown : function (event) {
	        event = event || window.event;
	        var evTarget = event.currentTarget || event.srcElement;
	        var target = evTarget.parentElement;
	        var className = (' ' + target.className + ' ');
	        
	        if (className.indexOf(' ' + 'open' + ' ') > -1) {
	            // Hide the menu
	            className = className.replace(' open ', ' ');
	            target.className = className;
	        } else {
	            // Show the menu
	            target.className += ' open ';
	        }
	        return false;
	    },
	    
	    // Close a dropdown menu
	    closeDropdown : function (event) {
	        event = event || window.event;
	        var evTarget = event.currentTarget || event.srcElement;
	        var target = evTarget.parentElement;
	        
	        target.className = (' ' + target.className + ' ').replace(' open ', ' ');
	        return false;
	    },
	
	    // Close an alert box by removing it from the DOM
	    closeAlert : function (event) {
	        event = event || window.event;
	        var evTarget = event.currentTarget || event.srcElement;
	        var alertBox = evTarget.parentElement;
	        
	        alertBox.parentElement.removeChild(alertBox);
	        return false;
	    }
	};
});
