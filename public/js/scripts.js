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

  // Dashboard Nav Scripts
  $('.fa-square-check').hide();
  $('input').click(function () {
    $('.fa-square-check').show();
  });
  // User profile edit page
  $('#profile-edit').hide();
  $('#shipping-edit').hide();
  $('#billing-edit').hide();
  $('#editprofile').show();
  $('#editshipping').show();
  $('#editbilling').show();
  $('#editprofile').click(function () {
    $('#profile-edit').show();
    $('#profile-view').hide();
  });
  $('#editshipping').click(function () {
    $('#shipping-edit').show();
    $('#shipping-view').hide();
  });
  $('#editbilling').click(function () {
    $('#billing-edit').show();
    $('#billing-view').hide();
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

  //Animated Navigation Dropdowns
  // $('.dropdown').click(function () {
  //   $('.dropdownMenu').css('transform', 'scaleY(0%)');
  // });

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

  //Order form scripts
  $('#other1').hide();
  $('#placement1').on('change', function () {
    $('#other1').hide();
    if ($(this).val() == 'Other') {
      $('#other1').show();
    }
  });

  //Add row to options section
  $('#add-options-div').on('click', function (e) {
    e.preventDefault();
    add_options();
  });

  $('#options-length').val($('.options .options-container').length);

  function add_options() {
    var i = $('.options .options-container').length;
    i++;
    $('#options-length').val(i);
    var row =
      `<div class="options-container"><div class="options-remove"><i class="fa-solid fa-trash"></i></div>
      <div class="column1">
    
    <div class="options-row"><label class="option-label" for="printQty` +
      i +
      `">Quantity:</label></div>
    <div class="options-row"><label class="option-label">Dimensions: </label></div>
    <div class="options-row"><label class="option-label" for="placement` +
      i +
      `">Placement:</label></div>
    <div class="options-row"><label class="option-label">Garment: </label></div>
    <div class="options-row"><label class="option-label"> </label></div>
    <div class="options-row"><label class="option-label">Sizes: </label></div>
</div>
<div class="column2">
<div class="options-row">
        <div class="option"><input id="printQty` +
      i +
      `" name="printQty` +
      i +
      `" type="number" /></div>
    </div>
    <div class="options-row">
        <div class="option"><input id="width` +
      i +
      `" name="width` +
      i +
      `" type="number" placeholder="width" /></div>
        <div class="option"><label class="options-label">x</label><input id="height` +
      i +
      `" name="height` +
      i +
      `" type="number" placeholder="height" /></div>
    </div>
    <div class="options-row">
<div class="option"><select class="form-select" id="placement` +
      i +
      `" name="placement` +
      i +
      `"><option value="Front Center Chest">Front Center Chest</option><option value="Left Chest">Left Chest</option><option value="Right Chest">Right Chest</option><option value="Center Back">Center Back</option><option value="Upper Back">Upper Back</option><option value="Lower Back">Lower Back</option><option value="Left Sleeve">Left Sleeve</option><option value="Right Sleeve">Right Sleeve</option><option value="Other">Other</option></select></div>

<div class="option" id="other` +
      i +
      `"> <label class="options-label"></label><input id="placementOther` +
      i +
      `" name="placementOther` +
      i +
      `" placeholder="Describe other:" /></div></div>
    <div class="options-row">
        <div class="option"><label class="options-label" for="garmentType` +
      i +
      `">Style:</label><input id="garmentType` +
      i +
      `" name="garmentType` +
      i +
      `" type="text" placeholder="e.g. Short Sleeve T-Shirt" /></div>
        <div class="option"><label class="options-label" for="garmentBrand` +
      i +
      `">Brand:</label><input id="garmentBrand` +
      i +
      `" name="garmentBrand` +
      i +
      `" type="text" placeholder="e.g. BELLA+CANVAS" /></div>
    </div>
    <div class="options-row">
        <div class="option"><label class="options-label" for="ItemNumber` +
      i +
      `">Item#:</label><input id="ItemNumber` +
      i +
      `" name="ItemNumber` +
      i +
      `" type="text" /></div>
        <div class="option"><label class="options-label" for="ItemColor` +
      i +
      `">Color:</label><input id="ItemColor` +
      i +
      `" name="ItemColor` +
      i +
      `" type="text" placeholder="e.g. black" /></div>
    </div>
    <div class="options-row">
        <div class="option">
            <table class="size-table">
                <tr>
                    <th>XS</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                    <th>2XL</th>
                    <th>3XL</th>
                </tr>
                <tr>
                    <td><input id="sizeXSqty` +
      i +
      `" name="sizeXSqty` +
      i +
      `" type="number" /></td>
                    <td> <input id="sizeSqty` +
      i +
      `" name="sizeSqty` +
      i +
      `" type="number" /></td>
                    <td> <input id="sizeMqty` +
      i +
      `" name="sizeMqty` +
      i +
      `" type="number" /></td>
                    <td> <input id="sizeLqty` +
      i +
      `" name="sizeLqty` +
      i +
      `" type="number" /></td>
                    <td><input id="sizeXLqty` +
      i +
      `" name="sizeXLqty` +
      i +
      `" type="number" /></td>
                    <td> <input id="size2XLqty` +
      i +
      `" name="size2XLqty` +
      i +
      `" type="number" /></td>
                    <td> <input id="size3XLqty` +
      i +
      `" name="size3XLqty` +
      i +
      `" type="number" /></td>
                </tr>
            </table>
        </div>
    </div>
</div>`;

    $('.options:last-child').append(row);

    $('.options-remove').on('click', function () {
      $(this).parent().remove();
    });

    $('#other' + i).hide();
    $('#placement' + i).on('change', function () {
      $('#other' + i).hide();
      if ($(this).val() == 'Other') {
        $('#other' + i).show();
      }
    });
  }
});
