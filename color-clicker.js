(function($) {
  var ColorClicker = function(element, options) {
    this.element = $(element);

    this.defaults = {};

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
      this.element.addClass('color-clicker');
      this.element.on('click', $.proxy(this._changeColors, this)).click();
    },

    _changeColors: function(e) {
      this._setColor();

      this.element.css('background', this.color);
      this.element.css('color', invertColor(this.color));
      this.element.html('<span>Current color = ' + this.color + '</span>');
    },

    _setColor: function(){
      if(this.colors) {
        if(this.color) this.colors.unshift(this.color);
        this.color = this.colors.pop();
      } else {
        this.color = randomColor();
      }
    }
  }

  $.fn.colorClicker = function(options){
    return this.each(function(){
      new ColorClicker(this, options);
    });
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
}(jQuery));