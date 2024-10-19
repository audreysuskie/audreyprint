// Dynamically populate images for Portfolio
function populateImages() {
  const imageGroup = document.getElementsByClassName('portfolio-container');
  for (let j = 0; j < imageGroup.length; j++) {
    const container = document.getElementById('image-container' + j);
    const containerID = container.getAttribute('data-name');
    const numImages = container.getAttribute('data-count');

    for (let i = 1; i <= numImages; i++) {
      const img = document.createElement('img');
      img.src = `images/${containerID}/${containerID}-${i}.png`;
      img.alt = `${containerID} ${i}`;

      const imageDiv = document.createElement('div');
      imageDiv.className = 'portfolio-image';
      imageDiv.appendChild(img);
      container.appendChild(imageDiv);
    }
  }
}

populateImages();

$(document).ready(function () {
  // Scroll Animation for Portfolio Helper function from: http://stackoverflow.com/a/7557433/274826
  function isInView(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === 'function' && el instanceof jQuery) {
      el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight)) ||
      (rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight))
    );
  }

  var scroll =
    window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  var scrollAnimation = document.querySelectorAll('.portfolio-image');

  function loop() {
    scrollAnimation.forEach(function (element) {
      if (isInView(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });

    scroll(loop);
  }

  loop();

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

  // Portfolio Zoom Control
  $('.portfolio-container img').click(function () {
    $('.zoom-window').removeClass('hidden');
    $('.zoom-window').addClass('flex');
    let source = $(this).attr('src');
    $('#zoom-image').attr('src', source);
  });

  $('#zoom-close, .zoom-window').click(function () {
    $('.zoom-window').addClass('hidden');
    $('#zoom-image').attr('src', '');
  });

  //Scroll to section
  $('.portfolio-menu-text').click(function () {
    var goto = $(this).attr('name');
    $('html, body').animate(
      {
        scrollTop: $('#' + goto).offset().top - 85,
      },
      1300
    );
  });
});
