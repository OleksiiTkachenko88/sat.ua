$(function(){
    var init = function() {
      var boxContainer = document.querySelector('.cube__container'),
          cube = document.getElementById('cube'),
          optionsContainer = document.getElementById('options'),
          perspectiveOrigin = { x: 50, y: 50 },
          // get -vendor- prefix css property
          perspectiveProp = Modernizr.prefixed('perspective'),
          perspectiveOriginProp = Modernizr.prefixed('perspectiveOrigin'),

          updatePerspectiveOrigin = function() {
            boxContainer.style[ perspectiveOriginProp ] =
              perspectiveOrigin.x + '% ' + perspectiveOrigin.y + '%';
          };

      optionsContainer.querySelector('.perspective input').addEventListener( 'change', function( event ){
        boxContainer.style[ perspectiveProp ] = event.target.value + 'px';
      }, false);

      optionsContainer.querySelector('.perspective-origin-x input').addEventListener( 'change', function( event ){
        perspectiveOrigin.x = event.target.value;
        updatePerspectiveOrigin();
      }, false);

      optionsContainer.querySelector('.perspective-origin-y input').addEventListener( 'change', function( event ){
        perspectiveOrigin.y = event.target.value;
        updatePerspectiveOrigin();
      }, false);

      optionsContainer.querySelector('.spinning button').addEventListener( 'click', function(){
        cube.toggleClassName('spinning');
      }, false);

      optionsContainer.querySelector('.backface-visibility button').addEventListener( 'click', function(){
        cube.toggleClassName('panels-backface-invisible');
      }, false);

    };

    window.addEventListener( 'DOMContentLoaded', init, false);
});
