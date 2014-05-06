(function($) {
  $.fn.colorClicker = function(){
    return this.each(function(){
      element = $(this);
      element.addClass('color-clicker');

      element.on('click', function() {
        bgColor = randomColor();

        $(this).css('background', bgColor);
        $(this).css('color', invertColor(bgColor));
        $(this).html('<span>Current color = ' + bgColor + '</span>');
      }).click();
    });
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