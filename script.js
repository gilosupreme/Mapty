'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent;

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      map = L.map('map').setView([latitude, longitude], 16);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (e) {
        mapEvent = e; //reassigning the global event object to match the one passed in this callback
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    () => console.log('Location Not available')
  ),
    {
      maximumAge: 0,
      timeout: 3000,
      enableHighAccuracy: true,
    };
} else {
  console.log('Geolocation is not supported by your browser.');
}

form.addEventListener('submit', fe => {
  fe.preventDefault();

  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      ''; //clearing the field values after submit

  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('You worked out here')
    .openPopup();
});

inputType.addEventListener('change', () => {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});
