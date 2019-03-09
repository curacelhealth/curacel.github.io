jQuery(document).ready(function($){

  $("#edit-field-kfm-resource-id-und-0-value").attr('readonly', true);
  $('#edit-field-kfm-resource-id-und-0-value').css('background-color' , '#DEDEDE');

  // $(".group-step1").prepand($(".markup2").html());
  // $(".group-step1").prepand($(".markup1").html());
  // $(".markup1").hide();
  // $(".markup2").hide();

  $(".group-step1 > h3").hide();
  $(".group-step2 > h3").hide();


  $(".group-step2").hide();
  $("form.node-kfile-form #edit-actions").hide();
  $(".group-step1").prepend('<div id="next_step_button"><span class="active">1</span><span class="inactive">2</span></div>');
  $(".group-step2").prepend('<div id="back_step_button"><span class="inactive">1</span><span class="active">2</span></div>');

  $(".group-step1").append('<p id="next_step">Next &gt;</p>');
  $(".group-step2").append('<p id="back_step">&lt; Back</p>');

  $("#next_step, #next_step_button span.inactive").click(function(){
    var kfm_value = $("#edit-field-kfile-type-und option:selected").val();
    if(kfm_value == "_none"){
      alert('Please Select Content Type');
    }
    else{
      $(".group-step1").hide();
      $(".group-step2").show();
      $(".markup1").hide();
      $(".markup2").hide();
      $("form.node-kfile-form #edit-actions").show();
      $(".vertical-tabs").show();
    }
  });

  //Get Content Node id With CT
  $('#edit-field-kfile-type-und').change(function () {
    var kfmct_nodeid = $('#hidden_id_node_id').val();
    var resource_id = '#edit-field-kfm-resource-id-und-0-value';
  //var kfm_ct_nodeid = $(resource_id).val();
  var kfm_select_value = "";
  $("#edit-field-kfile-type-und option:selected" ).each(function() {
    kfm_select_value += $(this).html()+ "";
  });

  if(kfm_select_value == "- Select a value -"){
    $(resource_id).val('Please select a valid Content Type');
  }

  if(kfm_select_value == "Case Study"){
    $(resource_id).val('cs_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "White Paper"){
    $(resource_id).val('wp_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Blog Article"){
    $(resource_id).val('ba_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Webinar"){
    $(resource_id).val('we_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Video"){
    $(resource_id).val('vi_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Customer Quote"){
    $(resource_id).val('cq_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "News Articles"){
    $(resource_id).val('na_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Press Releases"){
    $(resource_id).val('pr_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Event"){
    $(resource_id).val('ev_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "e-Book"){
    $(resource_id).val('eb_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Infographic"){
    $(resource_id).val('in_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Survey"){
    $(resource_id).val('su_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Assessment/Quiz"){
    $(resource_id).val('aq_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Award/Recognition"){
    $(resource_id).val('ar_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Success Story"){
    $(resource_id).val('ss_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Learn More"){
    $(resource_id).val('lm_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Partner Collateral"){
    $(resource_id).val('pc_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Link"){
    $(resource_id).val('lk_'+ kfmct_nodeid);
  }  
  if(kfm_select_value == "Marketing Campaign Landing Page"){
    $(resource_id).val('mc_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Checklist"){
    $(resource_id).val('cl_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Guide"){
    $(resource_id).val('gu_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Overview"){
    $(resource_id).val('ov_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Report"){
    $(resource_id).val('re_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Sales Sheet"){
    $(resource_id).val('sa_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Worksheet"){
    $(resource_id).val('ws_'+ kfmct_nodeid);
  }
  if(kfm_select_value == "Newsletter"){
    $(resource_id).val('ne_'+ kfmct_nodeid);
  }  
  if(kfm_select_value == "Tool"){
    $(resource_id).val('to_'+ kfmct_nodeid);
  }
}).change();

$("#back_step, #back_step_button span.inactive").click(function(){
  $(".group-step2").hide();
  $(".group-step1").show();
  $(".markup1").show();
  $(".markup2").show();
  $("form.node-kfile-form #edit-actions").hide();
  $(".vertical-tabs").hide();
});

  $('.kfileblock .form-type-bef-checkbox').click(function(e) {
    $(this).addClass('ajax-progress');
    $(this).prepend('div', '<div class="throbber"></div>');
  });

  $('.kfileblock').load(function() {
    $(".kfileblock li").each(function(index) {
      $(this).delay(100*index).fadeIn();
    });
  });

  $(document).ajaxComplete(function() {
    $(".kfileblock li").each(function(index) {
      $(this).delay(100*index).fadeIn();
    });
  });
});
