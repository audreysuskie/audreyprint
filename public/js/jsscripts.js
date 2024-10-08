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
    $('.service').prop('checked', false);
    $('#project').val('');
    $('#quantity').val('');
    $('#delivery').val('');
    $('#companyname').val('');
    $('#firstname').val('');
    $('#lastname').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#art').hide();
    $('#garments').hide();
  });

  $('#temp-notice').fadeIn();

  $('#close-temp').click(function () {
    $('#temp-notice').fadeOut();
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

  $('.dashboard-menu-item span').show();

  $('#dash-menu').click(function () {
    $('.dashboard-menu-item span').toggle();
    $('#dash-menu').toggleClass('rotate180');
    $('.dashboard-menu-item').toggleClass('center');
    $('.dashboard-menu-item').toggleClass('left');
  });

  const dashlink = $('.dashboard-menu-item');
  const windowpath = window.location.pathname;

  $(dashlink).each(function () {
    const linkpath = $(this).attr('href');

    if (windowpath === linkpath) {
      $(this).addClass('active');
    }
  });

  // Hide/Show Text Div
  $('#showTextDiv').click(function () {
    $('.textDiv').toggleClass('hidden');
    if ($('.textDiv').hasClass('hidden')) {
      $('#showTextDiv').removeClass('padding-bottom');
      $('#showTextDiv').html('&#43; More Information on Raster/Vector Images');
    } else {
      $('#showTextDiv').addClass('padding-bottom');
      $('#showTextDiv').html(
        '&#8722; Hide Information on Raster/Vector Images'
      );
    }
  });
});
