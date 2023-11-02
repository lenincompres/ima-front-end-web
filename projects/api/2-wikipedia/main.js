
async function loadWikipedia() {

  let apiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" + queryInput.value;
  let response = await fetch(apiUrl).catch(err => console.error(err));
  let json = await response.json();
  console.log(json);
  let entries = json.query.search;
  
  for(entry of entries){
    let listItem = document.createElement("li");
    listItem.innerHTML = `<h4>${entry.title}</h4>`;
    infoList.appendChild(listItem);

    let iframe = document.createElement("iframe");
    iframe.src= "https://en.wikipedia.org/wiki/" + entry.title.replace(" ", "_");
    listItem.appendChild(iframe);

    let frameVisible = false;
    listItem.onclick = () =>{
      iframe.style.height = frameVisible ? "0" : "20em";
      frameVisible = !frameVisible;
    }

  }

}

searchButton.onclick = () => loadWikipedia();