document.addEventListener('DOMContentLoaded', function () {
  const stateInputs = document.querySelectorAll('.state_input');
  const citiesDropdownContainer = document.getElementById('citiesDropdownContainer');
  const citiesList = document.getElementById('citiesList');

  stateInputs.forEach(input => {
    input.addEventListener('change', function () {
      if (this.checked) {
        citiesDropdownContainer.style.display = 'block';
        const stateId = this.getAttribute('data-id');

        // Clear the existing cities
        citiesList.innerHTML = '';

        // Load cities for the selected state
        fetch(`https://omar.eromo.tech/api/v1/states/${stateId}/cities`)
          .then(response => response.json())
          .then(cities => {
            cities.forEach(city => {
              const li = document.createElement('li');
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.setAttribute('data-id', city.id);
              checkbox.setAttribute('data-name', city.name);
              checkbox.classList.add('city_input');
              li.appendChild(checkbox);
              li.appendChild(document.createTextNode(` ${city.name}`));
              citiesList.appendChild(li);
            });
          });
      }
    });
  });
});
