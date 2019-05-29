/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2015 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

 /*!
 * Hux Blog v1.6.0 (http://startbootstrap.com)
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0 
 */

// Tooltip Init
// Unuse by Hux since V1.6: Titles now display by default so there is no need for tooltip
// $(function() {
//     $("[data-toggle='tooltip']").tooltip();
// });


// make all images responsive
/* 
 * Unuse by Hux
 * actually only Portfolio-Pages can't use it and only post-img need it.
 * so I modify the _layout/post and CSS to make post-img responsive!
 */
// $(function() {
//  $("img").addClass("img-responsive");
// });

// responsive tables
$(document).ready(function() {
    $("table").wrap("<div class='table-responsive'></div>");
    $("table").addClass("table");
});

// responsive embed videos
$(document).ready(function() {
    $('iframe[src*="youtube.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="youtube.com"]').addClass('embed-responsive-item');
    $('iframe[src*="vimeo.com"]').wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
    $('iframe[src*="vimeo.com"]').addClass('embed-responsive-item');
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height(),
            bannerHeight  = $('.intro-header .container').height();     
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop(),
                    $catalog = $('.side-catalog');

                //check if user is scrolling up by mouse or keyborad
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;


                //adjust the appearance of side-catalog
                $catalog.show()
                if (currentTop > (bannerHeight + 41)) {
                    $catalog.addClass('fixed')
                } else {
                    $catalog.removeClass('fixed')
                }
            });
    }
});

// // Search Settings
//  $(document).ready(function() {
//    $('.search-icon').on('click', function(e){
//      e.preventDefault();
//      $('.search-box').toggleClass('search-active');

//       if ($('.search-box').hasClass('search-active')) {
//        $('.search-icon-close').on('click', function(e){
//          e.preventDefault();
//          $('.search-box').removeClass('search-active');
//        });
//        $('#search-input').focus();
//      }
//    });
//  });

// Search Settings
let results = document.getElementById('results-container');

// override enter event to do nothing but flesh the page
function _keyDownDefault(){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){ // enter 键
    }
}

$(document).ready(function() {
    document.onkeydown = _keyDownDefault;
    // handle search event
  $('.search-icon').on('click', function(e){
      // e.preventDefault();
      if ($('.search-box').hasClass('hidden')) {
          $('.search-box').removeClass('hidden');
          setTimeout(function () {
              $('.search-box').addClass('search-active');
              if ($('.search-box').hasClass('search-active')) {
                  // search-box enable;
                  $('#search-input').val("");
                  results.innerHTML = "";
                  if (window.innerWidth > 932){
                      // desktop
                      $(document).on('click', function (e) {
                          var x = e.pageX;
                          var y = e.pageY - document.body.scrollTop || document.documentElement.scrollTop;
                          if (x < 100 || x > 550 || y > 500){
                              // closing search box
                              // e.preventDefault();
                              $('.search-box').removeClass('search-active');
                              setTimeout(function () {
                                  $('.search-box').addClass('hidden');
                              },400)
                          }
                      });
                  }else {
                      // hide scorebar on mobile
                      setTimeout(function () {
                          document.body.style.overflow = "hidden";
                      },500);
                  }
                  $('.search-icon-close').on('click', function(e){
                      // click close btn
                      // e.preventDefault();
                      $('.search-box').removeClass('search-active');
                      setTimeout(function () {
                          $('.search-box').addClass('hidden');
                      },400);
                      document.body.style.overflow = "auto";
                  });
                  setTimeout(function () {
                      $('#search-input').focus;
                  },1000)
                  // $('#search-input').focus();
              }
          },100)
      }else {
          $('.search-box').addClass('hidden');
          $('.search-box').removeClass('search-active');
      }
  });
});
