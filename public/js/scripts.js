$(document).ready(function () {
  // Dynamic Copyright
  $('#copyright').html('&copy;' + new Date().getFullYear() + ' Audrey Designs');

  $('.heart').click(function () {
    $(this).toggleClass('red');
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

  // User profile edit page
  $('#profile-edit').hide();
  $('#update-profile').hide();
  $('#editprofile').show();
  $('#editprofile').click(function () {
    $('#profile-edit').show();
    $('#update-profile').show();
    $('#profile-view').hide();
    $('#editprofile').hide();
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

  // Responsive Menu Controls
  $('#headerMenuLink').click(function () {
    if ($('.headerMenu').hasClass('closed')) {
      $('.headerMenu').removeClass('closed');
      $('.headerMenu').addClass('open');
    } else if ($('.headerMenu').hasClass('open')) {
      $('.headerMenu').removeClass('open');
      $('.headerMenu').addClass('closed');
    }
  });

  $('.headerMenuItem').click(function () {
    $('.headerMenu').removeClass('open');
    $('.headerMenu').addClass('closed');
  });

  //Upload scripts
  $('.form-button-wrapper').hide();
  $('.select-button').click(function () {
    if ($('.select-button').value != '') {
      setInterval(function () {
        $('.form-button-wrapper').show();
      }, 3500);
    }
  });

  //Quote Request Form scripts
  $('#art').hide();
  $('.service').on('change', function () {
    if ($('#print').is(':checked')) {
      $('#art').show();
    } else if ($('#embroidery').is(':checked')) {
      $('#art').show();
    } else if ($('#single').is(':checked')) {
      $('#art').show();
    } else if ($('#gang').is(':checked')) {
      $('#art').show();
    } else {
      $('#art').hide();
    }
  });

  $('#garments').hide();
  $('.service').on('change', function () {
    if ($('#print').is(':checked')) {
      $('#garments').show();
    } else if ($('#embroidery').is(':checked')) {
      $('#garments').show();
    } else {
      $('#garments').hide();
    }
  });
});
