// uses two selected colors to generate color palettes using colormind app

async function getModels(){
  let url = "http://colormind.io/list/";
  let response = await fetch(url);
  let data = await response.json();
  let models = data.result;
  for(let model of models){
    let option = document.createElement("option");
    option.innerText = model;
    modelSelect.appendChild(option);
  }
}

async function generatePalette(){
  const mainColor = this.hexToRgb(mainColorInput.value);
  const secondColor = this.hexToRgb(secondColorInput.value);
  const input = [
    [mainColor.r, mainColor.g, mainColor.b], 
    [secondColor.r, secondColor.g, secondColor.b], 
    "N", "N", "N"];
  const model = modelSelect.value;
  const url = `http://colormind.io/api/`;
  const data = {
    model: model,
    input: input,
  };
  const request = {
    headers: {},
    method: 'POST',
    body: JSON.stringify(data),
  };
  const response = await fetch(url, request).catch(err => console.error(err));

  const jsonData = await response.json();
  console.log(jsonData);

  showPalette(jsonData.result);
  console.log(response);

}


function showPalette(colors){
  paletteMain.innerHTML = "";
  for(let color of colors){
    let div  = document.createElement("div");
    let [r, g, b] = color;
    div.innerHTML = color.join(",");
    div.style.backgroundColor = `rgb(${r},${g},${b})`;
    paletteMain.appendChild(div);
  }
}

// Auxiliary functions

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

//

getModels();

generateButton.onclick = () => generatePalette();