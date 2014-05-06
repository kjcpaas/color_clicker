(function($) {
  $.fn.colorClicker = function(){
    var element = $(this);

    element.on('click', function() {
      bgColor = randomColor();

      element.css('background', bgColor);
      element.css('color', invertColor(bgColor));
      element.text('Current color = ' + bgColor);
    }).click();

    // For chaining
    return element;
  }

  function randomColor() {
    var color = '#';

    for(i = 0; i < 3; i++){
      component = Math.floor(Math.random() * 256);

      if(component < 16) color += '0';
      // Convert to hex
      color += component.toString(16);
    }

    return color;
  }

  function invertColor(color) {
    var inverse = "#";

    for(i = 1; i < 6; i += 2) {
      inverseComponent = 256 - parseInt(color.substring(i, i + 2), 16);
      if(inverseComponent < 16) inverse += '0';
      // Convert to hex
      inverse += inverseComponent.toString(16);
    }

    return inverse;
  }
}(jQuery));