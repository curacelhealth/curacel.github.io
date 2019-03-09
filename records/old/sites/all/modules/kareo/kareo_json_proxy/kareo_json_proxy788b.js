(function($) {

  Drupal.behaviors.webformEmail = {
    attach: function (context, settings) {

      $('#webform-client-form-105', context).submit(function (e) {
        var form = this;
        e.preventDefault();
        var json_data = {
          "json_url": "https://signup.kareo.com/api/referral/create",
          "json_data": {
            "referralSet" : {
              "ReferrerEmail" : e.target[0].value,
              "ReferrerFirst" : e.target[1].value,
              "ReferrerLast" : e.target[2].value,
              "KareoSupportRepresentative" : "",
              "Referees" : [{
                "FirstName" : e.target[3].value,
                "LastName" : e.target[4].value,
                "Email" : e.target[5].value,
                "PhoneNumber" : e.target[6].value,
              }],
            },
          },
        };

        $.ajax({
          url: '/proxy',
          type: 'POST',
          dataType: 'json',
          data: json_data,
          error: function(xhr, msg, error) {
             console.log(xhr, 'xhr');
             console.log(msg, 'msg');
             console.log(error, 'error');
          },
          success: function(response, status) {
            //console.log(response, 'response');
            if(!response.Success) {
              $("#clientsidevalidation-webform-client-form-105-errors").show();
              $("#clientsidevalidation-webform-client-form-105-errors ul").html('<li class="kareo_email"><label class="error" for="edit-submitted-email" style="clear: both; padding: 16px; color: #FFF !important; background-color: #EA4A42; z-index: 9; position: relative; margin:0 0 10px 0">'+response.Message+'</label></li>');

              if(response.Message === 'Email must be associated with a Kareo Account.') {
                $('#webform-client-form-105 input.form-email:eq(0)').val('Please enter the primary email associated with your Kareo account').css('border','2px solid red');
              }
            }
            else {
              $('#webform-client-form-105 .webform-submit').val('SUBMITTING...');
              $('input[name="submitted[promotionalCode]"]').val(response.Data);
              setTimeout(function () { 
                form.submit();
              }, 1250);
            }
          },
        });


      });
    }
  }

}(jQuery));
