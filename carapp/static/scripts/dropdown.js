$(document).ready(function () {
  const HOST = 'https://omar.eromo.tech';
  const $citiesDropdownContainer = $('#citiesDropdownContainer');
  const $citiesList = $('#citiesList');
  const $locationsDropdownContainer = $('#locationsDropdownContainer');
  const $locationsList = $('#locationsList');
  const $citiesText = $('.cities');
  const $locationsText = $('.companies');

  $('.state_input').on('change', function () {
    if (this.checked) {
      $citiesDropdownContainer.show();
      const stateId = $(this).data('id');
      const stateName = $(this).data('name');

      // Clear the existing cities and locations text
      $citiesList.empty();
      $locationsDropdownContainer.hide();
      $locationsText.text('');

      // Load cities for the selected state
      $.ajax({
        url: `${HOST}/api/v1/states/${stateId}/cities`,
        method: 'GET',
        dataType: 'json',
        success: function (cities) {
          cities.forEach(city => {
            const $li = $('<li>');
            const $radio = $('<input>', {
              type: 'radio',
              name: 'city',
              'data-id': city.id,
              'data-name': city.name,
              class: 'city_input'
            });
            $li.append($radio).append(` ${city.name}`);
            $citiesList.append($li);

            $radio.on('change', function () {
              if (this.checked) {
                const cityName = $(this).data('name');
                $citiesText.text('');
                $citiesText.text(cityName);

                $locationsDropdownContainer.show();
                const cityId = $(this).data('id');

                // Clear the existing locations
                $locationsList.empty();
                $locationsText.text('');

                // Load locations for the selected city
                $.ajax({
                  url: `${HOST}/api/v1/cities/${cityId}/locations`,
                  method: 'GET',
                  dataType: 'json',
                  success: function (locations) {
                    locations.forEach(location => {
                      const $li = $('<li>');
                      const $checkbox = $('<input>', {
                        type: 'checkbox',
                        'data-id': location.id,
                        'data-name': location.name,
                        class: 'location_input'
                      });
                      $li.append($checkbox).append(` ${location.name}`);
                      $locationsList.append($li);

                      $checkbox.on('change', function () {
                        const selectedLocations = [];
                        $('.location_input:checked').each(function () {
                          selectedLocations.push($(this).data('name'));
                        });
                        $locationsText.text(selectedLocations.join(', '));
                      });
                    });
                  },
                  error: function () {
                    alert('Failed to load locations.');
                  }
                });
              }
            });
          });
        },
        error: function () {
          alert('Failed to load cities.');
        }
      });
    }
  });
});
