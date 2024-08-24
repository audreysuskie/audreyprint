$(document).ready(function () {
  // Dynamic Nav Bar on Scroll
  $(window).on('scroll', function () {
    var header = $('header');
    var logo = $('.header_logo img');
    var links = $('.header_links');
    var links2 = $('.account_links');
    var linkText = $('.text_link');
    var resLinks = $('.res-links');
    header.toggleClass('scrollNav', window.scrollY > 0);
    logo.toggleClass('scrollLogo', window.scrollY > 0);
    links.toggleClass('scrollLogo', window.scrollY > 0);
    resLinks.toggleClass('text-shrink', window.scrollY > 0);
    links2.toggleClass('disappear', window.scrollY > 0);
    linkText.toggleClass('hide', window.scrollY > 0);
  });

  // Dynamic Copyright
  $('#copyright').html('&copy;' + new Date().getFullYear() + ' Audrey Designs');

  // Quote Form Control
  $('.quoteDiv').hide();
  $('#quoteForm').hide();

  $('.open').click(function () {
    $('.quoteDiv').addClass('flex');
    $('.quoteDiv').toggle();
    $('#quoteForm').toggle();
  });

  $('#close').click(function () {
    $('.quoteDiv').toggle();
    $('#quoteForm').toggle();
  });

  // Navigation Animation
  $('.droplink').click(function () {
    $(this > '.dropdown').addClass('dropAni');
  });

  $('.dropdownLink').click(function () {
    $(this > '.dropdown').removeClass('dropAni');
  });

  // Home Page Slides
  var slides = $('.slide');
  var slideIndex = 0;
  $(slides).hide();

  // Show the first slide
  $(slides[slideIndex]).show();

  // Set interval to change slides
  setInterval(function () {
    // Hide the current slide
    $(slides[slideIndex]).fadeOut('slow');

    // Increment index or reset to 0
    slideIndex = (slideIndex + 1) % slides.length;

    // Show the next slide
    $(slides[slideIndex]).fadeIn('slow');
  }, 6000);

  // Home Page Res Slides
  var reslides = $('.reslide');
  var reslideIndex = 0;
  $(reslides).hide();

  // Show the first slide
  $(reslides[reslideIndex]).show();

  // Set interval to change slides
  setInterval(function () {
    // Hide the current slide
    $(reslides[reslideIndex]).fadeOut('slow');

    // Increment index or reset to 0
    reslideIndex = (reslideIndex + 1) % reslides.length;

    // Show the next slide
    $(reslides[reslideIndex]).fadeIn('slow');
  }, 6000);

  $('.res-nav').hide();
  $('.res-links, .res-link').click(function () {
    $('.res-nav').toggle();
  });

  $('.small-icon').hover(
    function () {
      $(this).attr('src', 'images/mailto_icon_hover.png');
    },
    function () {
      $(this).attr('src', 'images/mailto_icon.png');
    }
  );
});
