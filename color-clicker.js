(function($) {
  var ColorClicker = function(element, options) {
    this.element = $(element);
    this.defaults = {
      // Callbacks
      onInit: function(){},
      onChange: function(){},
      onDestroy: function(){}
    };

    // Combine options with defaults
    this.options = $.extend({}, this.defaults, options);

    if((this.options.colors instanceof Array) && (this.options.colors.length > 0)) {
      // copy the colors so the given array in options is not mutated.
      this.colors = this.options.colors.slice(0, this.options.colors.length);
    }

    this._init();
  }

  ColorClicker.prototype = {
    constructor: ColorClicker,

    _init: function(){
      this.oldBgColor = this.element.css('background');
      this.oldHtml = this.element.html();
      this.oldTextColor = this.element.css('color');

      this.element.addClass('color-clicker')
      // Attach callback. Use proxy because else the this will be the clicked element, not the ClockClicker instance.
                  .on('click', $.proxy(this._changeColors, this)).click();

      this.options.onInit(this.element);
    },

    _changeColors: function(e) {
      this.setColor();
    },

    _applyChange: function(e) {
      this.element.css('background', this.color)
                  .css('color', invertColor(this.color))
                  .html('<span>Current color = ' + this.color + '</span>');
      this.options.onChange(this.element);
    },

    destroy: function() {
      // Cleaning up
      this.options.onDestroy(this.element);
      this.element.css('background', this.oldBgColor)
                  .css('color', this.oldTextColor)
                  .html(this.oldHtml)
                  .removeClass('color-clicker')
                  .off('click');
    },

    setColor: function(color){
      if(this.colors) {
        if(this.options.colors.indexOf(this.color) > -1)
          this.colors.unshift(this.color);
        this.color = color ? color : this.colors.pop();
      } else {
        this.color = color ? color : randomColor();
      }
      this._applyChange();
    },

    getColor: function() {
      return this.color;
    }
  }

  function generateColorHex(components) {
    var color = '#';
    $.each(components, function(index, value){
      if(value < 16) color += '0'
      color += value.toString(16);
    });
    return color; 
  }

  function extractComponents(color) {
    var components = [];
    var initIndex = (color[0] == '#') ? 1 : 0;
    for(i = initIndex; i < 6; i += 2) {
      components.push(parseInt(color.substring(i, i + 2), 16));
    }
    return components;
  }

  function randomColor() {
    var components = [];
    for(i = 0; i < 3; i++){
      components.push(Math.floor(Math.random() * 256));
    }
    return generateColorHex(components);
  }


  function invertColor(color) {
    var inverseComponents = $.map(extractComponents(color), function(value, index){
      return 255 - value;
    });
    return generateColorHex(inverseComponents);
  }



  $.fn.colorClicker = function(options){
    var args = Array.apply(null, arguments);
    //remove method name
    args.shift();
    var returnValue;

    this.each(function(){
      var data;
      // Stores the plugin data so it can be accessed later
      if(!options || (typeof(options) == 'object')) {
        // initialize plugin;
        if(data = $(this).data('color-clicker')) data.destroy();
        $(this).data('color-clicker', new ColorClicker(this, options));
      } else if(typeof(options) == 'string') {
        // Try to access plugin methods
        data = $(this).data('color-clicker');

        if(data && data[options] &&
           (typeof(data[options]) == 'function')) {
          // Call method
          returnValue = data[options].apply(data, args);
        }
      }
    });

    return returnValue ? returnValue : this;
  }
}(jQuery));