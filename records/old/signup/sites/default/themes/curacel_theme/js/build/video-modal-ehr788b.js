!function($){$(document).ready(function(){$(".action-video").on("click",function(e){var ytId=$(this).attr("data-yt-id"),iframeUrl="http://www.youtube.com/embed/"+ytId+"?autoplay=1";e.preventDefault(),$("#video-modal-ehr").css("opacity","1").css("left","0"),$("#ytplayer-ehr").attr("src",iframeUrl),$(".vid_list a.active").removeClass("active"),$(".vid_list [data-yt-id='"+ytId+"']").addClass("active")}),$(".action-video-ehr").on("click",function(e){var ytId=$(this).attr("data-yt-id"),iframeUrl="http://www.youtube.com/embed/"+ytId+"?autoplay=1";e.preventDefault(),$("#video-modal-ehr").css("opacity","1").css("left","0"),$("#ytplayer-ehr").attr("src",iframeUrl),$(".vid_list a.active").removeClass("active"),$(".vid_list [data-yt-id='"+ytId+"']").addClass("active")}),$(".video-dialog-close").on("click",function(e){$("#ytplayer-ehr").attr("src",""),$(".vid_list a.active").removeClass("active"),$("#video-modal-ehr").css("opacity","0").css("left","-100%"),e.preventDefault()})})}(jQuery);