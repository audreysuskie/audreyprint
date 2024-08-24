const taxNote = document.getElementById('exempt');
const notaxNote = document.getElementById('notexempt');

if (taxNote) {
  document.getElementById('tax-note').style.display = 'none';
  taxNote.addEventListener('click', function () {
    const notax = document.getElementById('exempt').checked;
    if (notax === true) {
      document.getElementById('tax-note').style.display = 'none';
    }
  });
}
if (notaxNote) {
  document.getElementById('tax-note').style.display = 'none';
  notaxNote.addEventListener('click', function () {
    const tax = document.getElementById('notexempt').checked;
    if (tax === true) {
      document.getElementById('tax-note').style.display = 'block';
    }
  });
}

const quoteCalculator = document.getElementById('quote-calc-form');
if (quoteCalculator) {
  quoteCalculator.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('results').style.display = 'block';
    const quantity = document.getElementById('quantity').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const notax = document.getElementById('exempt').checked;

    let taxRate = 0.0775;
    if (notax === true) {
      taxRate = 0;
    }

    const totalSqInches = width * height;

    let discount = 0;
    if (quantity < 20) {
      discount = 0;
    } else if (quantity > 19 && quantity < 50) {
      discount = 0.35;
    } else if (quantity > 49 && quantity < 100) {
      discount = 0.448;
    } else if (quantity > 99) {
      discount = 0.53;
    }

    let pricePerSqInch = 0.07;
    if (totalSqInches < 5) {
      pricePerSqInch = 0.24;
    } else if (totalSqInches >= 5 && totalSqInches < 15) {
      pricePerSqInch = 0.22;
    } else if (totalSqInches >= 15 && totalSqInches < 25) {
      pricePerSqInch = 0.16;
    } else if (totalSqInches >= 25 && totalSqInches < 49) {
      pricePerSqInch = 0.13;
    } else if (totalSqInches >= 49 && totalSqInches < 64) {
      pricePerSqInch = 0.11;
    } else if (totalSqInches >= 64 && totalSqInches < 81) {
      pricePerSqInch = 0.1;
    } else if (totalSqInches >= 81 && totalSqInches < 168) {
      pricePerSqInch = 0.08;
    } else if (totalSqInches >= 168 && totalSqInches < 204) {
      pricePerSqInch = 0.07;
    }

    const discountedPricePerSqInch = pricePerSqInch - pricePerSqInch * discount;
    const pricePerTransfer = totalSqInches * discountedPricePerSqInch;
    const subtotal = pricePerTransfer * quantity;
    const tax = subtotal * taxRate;
    const totalPrice = subtotal + tax;

    document.getElementById('cost').textContent = pricePerTransfer.toFixed(2);
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = '$' + totalPrice.toFixed(2);
    document.getElementById('totalQuantity').textContent = quantity;
    document.getElementById('dimensions').textContent =
      width + '" wide x ' + height + '" tall Single Image Transfers';
    document.getElementById('tax-rate').textContent = taxRate * 100;
    document.getElementById('resultsDiv').scrollIntoView();
  });
}

const sheetquoteCalculator = document.getElementById('sheetquote-calc-form');
if (sheetquoteCalculator) {
  sheetquoteCalculator.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('results').style.display = 'block';
    const quantity = document.getElementById('quantity').value;
    const sheetsize = document.getElementById('sheetsize').value;
    const notax = document.getElementById('exempt').checked;

    let taxRate = 0.0775;
    if (notax === true) {
      taxRate = 0;
    }

    let sheetprice = 0.0;
    if (quantity < 10 && sheetsize === '22 x 12') {
      sheetprice = 14;
    } else if (quantity < 10 && sheetsize === '22 x 24') {
      sheetprice = 23;
    } else if (quantity < 10 && sheetsize === '22 x 60') {
      sheetprice = 51;
    } else if (quantity < 10 && sheetsize === '22 x 120') {
      sheetprice = 90;
    } else if (quantity < 10 && sheetsize === '22 x 144') {
      sheetprice = 101;
    } else if (quantity < 10 && sheetsize === '22 x 180') {
      sheetprice = 119;
    } else if (quantity > 9 && sheetsize === '22 x 12') {
      sheetprice = 12;
    } else if (quantity > 9 && sheetsize === '22 x 24') {
      sheetprice = 20;
    } else if (quantity > 9 && sheetsize === '22 x 160') {
      sheetprice = 44;
    } else if (quantity > 9 && sheetsize === '22 x 120') {
      sheetprice = 76;
    } else if (quantity > 9 && sheetsize === '22 x 144') {
      sheetprice = 86;
    } else if (quantity > 9 && sheetsize === '22 x 180') {
      sheetprice = 101;
    }

    const subtotal = sheetprice * quantity;
    const tax = subtotal * taxRate;
    const totalPrice = subtotal + tax;

    document.getElementById('cost').textContent = sheetprice.toFixed(2);
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent =
      '$' + totalPrice.toFixed(0) + '.00';
    document.getElementById('totalQuantity').textContent = quantity;
    document.getElementById('description').textContent =
      sheetsize + ' Transfer Sheet';
    document.getElementById('tax-rate').textContent = taxRate * 100;
    document.getElementById('resultsDiv').scrollIntoView();
  });
}

const quoteForm = document.getElementById('calc-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('results').style.display = 'block';
    const quantity = document.getElementById('quantity').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const notax = document.getElementById('exempt').checked;
    const blanks = document.getElementById('blanks').value;

    const blanksPrice = parseFloat(blanks);

    let taxRate = 0.0775;
    if (notax === true) {
      taxRate = 0;
    }
    let location = '';
    var ele = document.getElementsByClassName('location');
    for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        location = ele[i].value;
      }
    }

    const totalSqInches = width * height;

    let discount = 0;
    if (quantity < 20) {
      discount = 0;
    } else if (quantity > 19 && quantity < 50) {
      discount = 0.35;
    } else if (quantity > 49 && quantity < 100) {
      discount = 0.448;
    } else if (quantity > 99) {
      discount = 0.53;
    }

    let pricePerSqInch = 0.07;
    if (totalSqInches < 6) {
      pricePerSqInch = 0.24;
    } else if (totalSqInches >= 6 && totalSqInches < 15) {
      pricePerSqInch = 0.22;
    } else if (totalSqInches >= 15 && totalSqInches < 25) {
      pricePerSqInch = 0.16;
    } else if (totalSqInches >= 25 && totalSqInches < 49) {
      pricePerSqInch = 0.13;
    } else if (totalSqInches >= 49 && totalSqInches < 64) {
      pricePerSqInch = 0.11;
    } else if (totalSqInches >= 64 && totalSqInches < 81) {
      pricePerSqInch = 0.1;
    } else if (totalSqInches >= 81 && totalSqInches < 168) {
      pricePerSqInch = 0.08;
    } else if (totalSqInches >= 168 && totalSqInches < 204) {
      pricePerSqInch = 0.07;
    }

    const discountedPricePerSqInch = pricePerSqInch - pricePerSqInch * discount;
    const pricePerTransfer = totalSqInches * discountedPricePerSqInch;
    const discountedTransfers = pricePerTransfer - pricePerTransfer * 0.25;
    const transferCost = discountedTransfers * quantity;
    const impressionsCost = 1.0 * quantity;
    const garmentTotal = blanksPrice * quantity;
    const subtotal = transferCost + impressionsCost + garmentTotal;
    const tax = subtotal * taxRate;
    const totalPrice = subtotal + tax;

    document.getElementById('transferQty').value = quantity;
    document.getElementById('impressionsQty').value = quantity;
    document.getElementById('location').value =
      location + ' - Transfer Applications';
    document.getElementById('garmentsQty').value = quantity;
    document.getElementById('transferEach').value =
      discountedTransfers.toFixed(2);
    document.getElementById('transferCost').value = transferCost.toFixed(2);
    document.getElementById('impressionsCost').value =
      impressionsCost.toFixed(2);
    document.getElementById('garmentsEach').value = blanksPrice.toFixed(2);
    document.getElementById('garmentsCost').value = garmentTotal.toFixed(2);
    document.getElementById('subtotal').value = subtotal.toFixed(2);
    document.getElementById('tax').value = tax.toFixed(2);
    document.getElementById('total').value = '$' + totalPrice.toFixed(2);
    document.getElementById('dimensions').value =
      width +
      '" wide x ' +
      height +
      '" tall Single Image Transfers (includes 25% discount)';
    document.getElementById('tax-rate').textContent = taxRate * 100;
    document.getElementById('resultsDiv').scrollIntoView();
  });
}
