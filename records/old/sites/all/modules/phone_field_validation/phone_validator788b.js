//jQuery wrapper
(function ($) {
  //Define a Drupal behaviour with a custom name
  Drupal.behaviors.potpourriAddPhoneValidator = {
    attach: function (context) {
      //Add an eventlistener to the document reacting on the
      //'clientsideValidationAddCustomRules' event.
      $(document).bind('clientsideValidationAddCustomRules', function(event){
        //Add your custom method with the 'addMethod' function of jQuery.validator
        //http://docs.jquery.com/Plugins/Validation/Validator/addMethod#namemethodmessage
        jQuery.validator.addMethod("phoneField", function(value, element, param) {
          //return true if valid, false if invalid
          var regexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
          return regexp.test(value.replace(' ', ''));
          //Enter a default error message.
        }, jQuery.format('Value must a valid phone number'));
      });
    }
  };
})(jQuery);