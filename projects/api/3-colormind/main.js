// Authorization

class Colormind {

  constructor() {
    this.getMethods();
    generateButton.onclick = () => this.getPalette();
  }

  async getMethods() {

    let response = await fetch("http://colormind.io/list/");
    console.log(response);

    let data = await response.json();
    console.log(data);

    this.methods = data.result;
    console.log(this.methods);

    for (let method of this.methods) {
      methodSelect.innerHTML += `<option>${method}</option>`;
    }
  }

  async getPalette() {
    const mainColor = this.gerRGB(mainColorInput.value);
    const secondColor = this.gerRGB(secondColorInput.value);
    const input = [mainColor, secondColor, "N", "N", "N"];
    console.log(input);
    const method = methodSelect.value;
    const url = `http://colormind.io/api/`;
    const data = {
      model: method,
      input: input,
    };
    const request = {
      headers: {},
      method: 'POST',
      body: JSON.stringify(data),
    };
    const response = await fetch(url, request).catch(err => console.error(err));
    console.log(response);

    const json = await response.json();
    console.log(json);

    this.showPalette(json.result);
  }

  showPalette(palette) {
    paletteMain.innerHTML = '';
    for (let color of palette) {
      let div = document.createElement('div');
      let rgb = color.join(',');
      div.style.backgroundColor = `rgb(${rgb})`;
      div.innerHTML = rgb;
      paletteMain.appendChild(div);
    }
  }

  gerRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

}

let app = new Colormind();