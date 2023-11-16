// a js library file containing methods that can be useful in many apps


export async function loadTextFile(url) {
  let response = await fetch(url).catch(e => console.error(e));
  let data = await response.text();
  return data;
}


export function parseCSVData(data) {
  // The data is a long string of text where each row is a line
  // '\r\n' is the code for a return of enter that reparates de lines in a string
  let rows = data.split('\r\n');

  // The first row has the headings, which will become the keys for each object (row).
  let keys = rows.shift();
  keys = keys.split(',');
  keys = keys.map(key => key.replaceAll(' ', '_'));

  let items = [];
  for (let row of rows) {
    // exception for commas inside quotation marks (see data source)
    while(row.includes('",')){
      let quoteEnd = row.indexOf('",');
      let quote = row.substring(0, quoteEnd).replaceAll(',','`');
      row = quote.replace('"', '') + row.substring(quoteEnd + 1);
    }
    
    let cols = row.split(',');
    let item = {};
    for (let i = 0; i < cols.length; i += 1) {
      let key = keys[i];
      let value = cols[i];
      item[key] = value.replaceAll('`', ','); // convert ` found in the exception back to , 
    }
    items.push(item);
  }
  return items;
}