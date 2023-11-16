// a js library file containing methods that can be useful in many apps

export async function loadTextFile(url) {
  let response = await fetch(url).catch(e => console.error(e));
  let data = await response.text();
  return data;
}

export function parseCSVData(data) {
  let rows = data.split('\r\n');

  let keys = rows.shift();
  keys = keys.split(',');
  keys = keys.map(key => key.replaceAll(' ', '_'));

  let items = [];
  for (let row of rows) {
    let cols = row.split(',');
    let item = {};
    for (let i = 0; i < cols.length; i += 1) {
      let key = keys[i];
      item[key] = cols[i];
    }
    items.push(item);
  }

  return items;
}