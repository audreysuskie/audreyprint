const section = document.getElementById('data-section');
const section2 = document.getElementById('modal-image');
const section3 = document.getElementById('data-section2');
const dataForm = document.getElementById('data-select-form');
const filter = document.getElementById('filter');
const box1 = document.getElementById('brandsCol');
const box2 = document.getElementById('categoryCol');
const button = document.getElementById('resultsBtn');
const buttonDiv = document.getElementById('submitBtn');

if (filter) {
  filter.addEventListener('change', function handleChange(event) {
    buttonDiv.style.display = 'block';
    if (event.target.value === 'View All') {
      button.value = 'Show All';
      box1.style.display = 'none';
      box2.style.display = 'none';
    } else if (event.target.value === 'brand') {
      button.value = 'Show Results By Brand';
      box1.style.display = 'block';
      box2.style.display = 'none';
    } else if (event.target.value === 'category') {
      button.value = 'Show Results By Category';
      box1.style.display = 'none';
      box2.style.display = 'block';
    } else {
      buttonDiv.style.display = 'none';
      box1.style.display = 'none';
      box2.style.display = 'none';
    }
  });
}

if (dataForm) {
  dataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const xhttp = new XMLHttpRequest();

    xhttp.onprogress = (event) => {
      document.getElementById('progress-bar').style.display = 'block';
      const value1 = event.loaded;
      const value2 = event.total;
      let percentage = (value1 / value2) * 100;
      document.getElementById('progress').style.width = percentage + '%';
      let x = Math.trunc(percentage);
      document.getElementById('progressText').innerText = 'Loading...';
    };

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById('progress-bar').style.display = 'none';
        // Typical action to be performed when the document is ready:
        const response = JSON.parse(xhttp.responseText);
        let products = '';

        if (document.getElementById('filter').value == 'brand') {
          const brandSelect = document.getElementById('brands').value;

          if (brandSelect == 'none') {
            alert('Please select a brand name to filter results.');
          } else {
            products = response.products.filter(
              (res) => res.brand == brandSelect
            );
          }
        } else if (document.getElementById('filter').value == 'category') {
          const catSelect = document.getElementById('category').value;

          if (catSelect == 'Tank Tops') {
            products = response.products.filter(
              (res) =>
                res.title.includes('Tank' || 'tank' || 'Sleeveless') === true
            );
          } else {
            products = response.products.filter(
              (res) => res.category == catSelect
            );
          }
        } else if (document.getElementById('filter').value == 'View All') {
          products = response.products;
        }

        let output = '';

        for (let i = 0; i < products.length; i++) {
          output +=
            '<div class="data-container"><div class="data" onclick="getInfo(this)" data-image-src="' +
            products[i].styleImage +
            '" data-style-id="' +
            products[i].styleID +
            '" data-brand="' +
            products[i].brand +
            '" data-style="' +
            products[i].title +
            '"><div class="data-image"><img src="https://cdn.ssactivewear.com/' +
            products[i].styleImage +
            '"></div><div class="data-title">' +
            products[i].styleID +
            '</div><div class="data-title">' +
            products[i].brand +
            '</div><div class="data-subtitle">' +
            products[i].title +
            '</div><div class="data-hidden">' +
            products[i].description +
            '</div></div><i class="fa-solid fa-heart heart" onclick="getSaved(this)"></i></div>';
        }
        section.innerHTML = output;
      }
    };

    xhttp.open('GET', '../styles.json', true);
    xhttp.send();
  });
}

function getSaved(clicked) {
  clicked.style.color = 'var(--red)';
  clicked.style.opacity = '1';
  let saved = [];

  let styleid = clicked.parentNode.firstChild.getAttribute('data-style-id');
  let brand = clicked.parentNode.firstChild.getAttribute('data-brand');
  let style = clicked.parentNode.firstChild.getAttribute('data-style');

  const items = {
    brand: brand,
    item: styleid,
    style: style,
  };

  saved.push(items);
  console.log(saved);
}

function getInfo(source) {
  let output2 = '';
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';
  let styleid = source.getAttribute('data-style-id');
  let brand = source.getAttribute('data-brand');
  let style = source.getAttribute('data-style');
  let description = source.querySelector('.data-hidden').innerHTML;
  let image = source.getAttribute('data-image-src');

  let brandSlug = '';
  if (brand === 'BELLA+CANVAS') {
    brandSlug = 'bella';
  } else if (brand === 'PRIM + PREUX') {
    brandSlug = 'primxpreux';
  } else {
    brandSlug = brand
      .replace("'", '')
      .replace('.', '')
      .split(' ')
      .join('_')
      .toLowerCase();
  }

  output2 +=
    '<div class="data-title">Brand: ' +
    brand +
    '</div><div class="data-title"> Style: ' +
    styleid +
    '</div><div class="data-title">' +
    style +
    '</div><div class="data-spacer"></div><a target="_blank" href="https://www.sportswearcollection.com/p/' +
    brandSlug +
    '/' +
    styleid +
    '?site=SHZJKBDHQF" class="linkURL">Click here for information on colors and sizes available</a><div id="linkNote"></div><div class="data-spacer"></div><div class="data-title">Description: </div><div class="data-text">' +
    description +
    '</div>';

  section3.innerHTML = output2;
  section2.innerHTML = '<img src="https://cdn.ssactivewear.com/' + image + '">';
  document.getElementById('linkNote').innerText =
    'Clicking this link will open a new window to display product information on our affiliated product page from an external site.';
}

function closeInfo() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}
