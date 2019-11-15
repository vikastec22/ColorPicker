(function($) {
    $.fn.mdColorPicker = function(options, callback) {
    	var ithis = this;
    	var defaults = $.extend({
            color: "#FFFFFF"
        }, options );

        if (!Array.prototype.forEach) {
		  Array.prototype.forEach = function(callback, thisArg) {
		    var T, k;
		    if (this == null) {
		      throw new TypeError(' this is null or not defined');
		    }
		    var O = Object(this);
		    var len = O.length >>> 0;
		    if (typeof callback !== "function") {
		      throw new TypeError(callback + ' is not a function');
		    }
		    if (arguments.length > 1) {
		      T = thisArg;
		    }
		    k = 0;
		    while (k < len) {
		      var kValue;
		      if (k in O) {
		        kValue = O[k];
		        callback.call(T, kValue, k, O);
		      }
		      k++;
		    }
		  };
		}

        var colorArr = [{
            name: 'Red',
            camel: 'red',
            hex: 'f44336'
        }, {
            name: 'Pink',
            camel: 'pink',
            hex: 'E91E63'
        }, {
            name: 'Purple',
            camel: 'purple',
            hex: '9C27B0'
        }, {
            name: 'Deep Purple',
            camel: 'deepPurple',
            hex: '673AB7'
        }, {
            name: 'Indigo',
            camel: 'indigo',
            hex: '3F51B5'
        }, {
            name: 'Blue',
            camel: 'blue',
            hex: '2196F3'
        }, {
            name: 'Light Blue',
            camel: 'lightBlue',
            hex: '03A9F4'
        }, {
            name: 'Cyan',
            camel: 'cyan',
            hex: '00BCD4'
        }, {
            name: 'Teal',
            camel: 'teal',
            hex: '009688'
        }, {
            name: 'Green',
            camel: 'green',
            hex: '4CAF50'
        }, {
            name: 'Light Green',
            camel: 'lightGreen',
            hex: '8BC34A'
        }, {
            name: 'Lime',
            camel: 'lime',
            hex: 'CDDC39'
        }, {
            name: 'Yellow',
            camel: 'yellow',
            hex: 'FFEB3B'
        }, {
            name: 'Amber',
            camel: 'amber',
            hex: 'FFC107'
        }, {
            name: 'Orange',
            camel: 'orange',
            hex: 'FF9800'
        }, {
            name: 'Deep Orange',
            camel: 'deepOrange',
            hex: 'FF5722'
        }, {
            name: 'Brown',
            camel: 'brown',
            hex: '795548'
        }, {
            name: 'Grey',
            camel: 'grey',
            hex: '9E9E9E'
        }, {
            name: 'Blue Grey',
            camel: 'blueGrey',
            hex: '607D8B'
        }, {
            name: 'White',
            camel: 'white',
            hex: 'FFFFFF'
        }];

        var hexToRgb = function(hex) {
		    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		    return result ? {
		        r: parseInt(result[1], 16),
		        g: parseInt(result[2], 16),
		        b: parseInt(result[3], 16)
		    } : null;
		};
		var cToHex = function(c) {
		    var hex = c.toString(16);
		    return hex.length == 1 ? "0" + hex : hex;
		};
		/*var rgbToHex = function(r, g, b) {
		    return "#" + cToHex(r) + cToHex(g) + cToHex(b);
		};*/
		var rgb2hex = function(rgb) {
		    var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
		    var hex = function(x) {
		        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
		    };
		    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
		var h = function(c) {
		    if (c == '') {
		        return 0;
		    }
		    var t = parseInt(c);
		    return t >= 0 && t <= 255 ? t : 0;
		};

        var _mdColorPicker = document.createElement('div');
        $(_mdColorPicker).addClass('cl-mdcolorpicker');

        $(this).wrap($(_mdColorPicker));

        var _mdColorPickerContainer = document.createElement('div');
        $(_mdColorPickerContainer).addClass('materialpicker-colors');
        $(this).parent().append($(_mdColorPickerContainer));

        colorArr.forEach(function(colorRow) {
		    var _colorDiv = document.createElement('div');
            $(_colorDiv).addClass('item').css({
                'background-color': '#' + colorRow.hex
            }).click(function(e) {
                $(e.target).parent().find(".item").removeClass("selected");
                $(e.target).addClass("selected");
                callback($(e.target).parent().prev(), rgb2hex($(this).css("background-color")));
            });
            if(defaults.color=='#' + colorRow.hex) {
                $(_colorDiv).addClass('selected');
            }
            $(ithis).parent().find('.materialpicker-colors').append($(_colorDiv));
		});

		$(this).click(function(e) {
            $(".cl-mdcolorpicker").find('.materialpicker-colors').not($(e.target).next()).slideUp("slow");
			$(e.target).parent().find('.materialpicker-colors').css({
				left: '0px',
				top: $(this).outerHeight() + 'px'
			}).slideToggle("slow");
		});

		$(document).mouseup(function(e) {
		    var container = $(".cl-mdcolorpicker");
		    if (!container.is(e.target) && container.has(e.target).length === 0) {
		        $(".cl-mdcolorpicker").find('.materialpicker-colors').slideUp("slow");
		    }
		});

        return this;
    };
}(jQuery));