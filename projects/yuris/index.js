/*

const URL = 'https://aztro.sameerkumar.website/?sign=aries&day=today';
fetch(URL, {
    method: 'POST'
})
.then(response => response.json())
.then(json => {
    const date = json.current_date;
    console.log(date);
});

*/

loadData();

async function loadData() {
  const KEY = 'BvQKXqxX7O4mGvGUQC7i9734beoT9fL6Rh3dLrMi';
  const URL = 'https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-1';

  let response = await fetch(URL, {
    method: 'POST'
  });
  console.log(response);

  let json = await response.text();
  console.log(json);

  const date = json.current_date;
  console.log(date);
}