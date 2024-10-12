$(document).ready(init);
const HOST = '0.0.0.0';
const locationObj = {};
const stateObj = {};
const cityObj = {};
let obj = {};

function init () {
  $('.location_input').change(function () {
    obj = locationObj;
    checkedObjects.call(this, 1);
  });
  $('.state_input').change(function () {
    obj = stateObj;
    checkedObjects.call(this, 2);
  });
  $('.city_input').change(function () {
    obj = cityObj;
    checkedObjects.call(this, 3);
  });
// Call the searchCars and apiStatus functions when the document is ready

  apiStatus();
  searchCars();
}

function checkedObjects (nObject) {
  if ($(this).is(':checked')) {
    obj[$(this).attr('data-name')] = $(this).attr('data-id');
  } else if ($(this).is(':not(:checked)')) {
    delete obj[$(this).attr('data-name')];
  }
  const names = Object.keys(obj);
  if (nObject === 1) {
    $('.companies').text(names.sort().join(', '));
  } else if (nObject === 2) {
    $('.states').text(names.sort().join(', '));
  } else if (nObject === 3) {
    $('.cities').text(names.sort().join(', '));
  }
}

function apiStatus () {
  const API_URL = `http://${HOST}/api/v1/status/`;
  $.get(API_URL, (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

function searchCars() {
  const CARS_URL = `http://${HOST}/api/v1/cars_search/`;
  $.ajax({
    url: CARS_URL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      locations: Object.values(locationObj),
      states: Object.values(stateObj),
      cities: Object.values(cityObj)
    }),
    success: function (response) {
      $('SECTION.cars').empty();
      for (const car of response) {
        const availabilityText = car.available ? `<strong>Available:</strong> $${car.price_by_day} a day` : `<strong>Not Available</strong>`;
        const article = [
          '<article class="col-sm-12 col-md-6 col-lg-4 mb-4" data-car-id="' + car.id + '">', // car.id is a unique identifier
          '<div class="card h-100 shadow-lg">',
          '<div class="position-relative border h-40">',
          `<img src="${car.image_url.replace(/ /g, '_')}" class="card-img-top" style="height: 180px;" alt="${car.brand} ${car.model} ${car.year}">`,
          '<div class="badge bg-danger position-absolute top-0 start-0" style="margin-left: -2em; margin-top: 1em;">New</div>',
          '</div>',
          '<div class="card-body">',
          `<h5 class="card-title">${car.brand} ${car.model} ${car.year}</h5>`,
          `<p class="card-text text-muted">Experience luxury and performance with the ${car.brand} ${car.model} ${car.year}.</p>`,
          '<div class="d-flex justify-content-between align-items-center">',
          '<p class="card-text mt-2">',
          availabilityText,
          '</p>',
          `<a href="#" class="btn btn-primary btn-sm">Book Now</a>`,
          '</div>',
          '</div>',
          '<div class="card-footer text-muted">',
          '<small>Last updated 3 mins ago</small>',
          '</div>',
          '</div>',
          '</article>'
        ];
        $('SECTION.cars').append(article.join(''));
      }
    },
    error: function (error) {
      console.error(error);
    }
  });

  // Add an event listener for the "Book Now" button click using event delegation
  $('SECTION.cars').on('click', 'a.btn', function(event) {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Retrieve the car ID from the data attribute
    const carId = $(this).closest('article').data('car-id');

    // Redirect to the signup page with the carId in the URL
    window.location.href = `/signup.html?carId=${carId}`;
  });
}
