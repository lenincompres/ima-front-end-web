

async function loadAstrosData() {
  let apiUrl = "http://api.open-notify.org/astros.json";
  // get the package
  let response = await fetch(apiUrl).catch(err => console.error(err));
  console.log(response);
  // open the package as a a javascript object
  let json = await response.json();
  console.log(json);
  let people = json.people;
  
  for(person of people){
    let listItem = document.createElement("li");
    listItem.innerHTML = `<b>${person.craft}:</b> ${person.name}`;
    infoList.appendChild(listItem);
  }
}

loadAstrosData();