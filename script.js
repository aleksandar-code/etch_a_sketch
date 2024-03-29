let rowDiv;
let columnDiv;
let mouseDown = false;
let currentMode = 'color';
let btnClear = document.getElementById('clear');
let btnEraser = document.getElementById('eraser');
let btnColor = document.getElementById('color');
let btnRainbow = document.getElementById('rainbow');
let btnShader = document.getElementById('shader');
let container = document.querySelector('#container');
let currentColor = "#000000";
let hslColor = "";
const shaderSlider = document.getElementById('shaderSlider');
const shaderValue = document.getElementById('shaderValue');
shaderSlider.onmousemove = (e) => updateShaderValue(e.target.value)
shaderSlider.onchange = () => setCurrentColor(colorPicker.value)
const colorPicker = document.getElementById('colorPicker');
colorPicker.oninput = (e) => setCurrentColor(e.target.value)
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => newGrid(e.target.value)
btnColor.addEventListener('click', () => {
  setCurrentColor(colorPicker.value)
  setCurrentMode('color')
});
btnShader.addEventListener('click', () => {
  setCurrentColor(colorPicker.value)
  setCurrentMode('shader')
});
btnRainbow.onclick = () => setCurrentMode('rainbow')
btnEraser.onclick = () => setCurrentMode('eraser')
btnShader.onclick = () => setCurrentMode('shader')
btnClear.onclick = () => newGrid()
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
container.addEventListener('mouseover', colorCell);
container.addEventListener('mousedown', colorCell);


function setCurrentMode(newMode) {
    currentMode = newMode;
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function updateShaderValue(value) {
    shaderValue.innerHTML = `Shade ${value}%`
}

function setCurrentColor(color) {
    currentColor = color;
}

function newGrid() {
    xy = sizeSlider.value;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (i = 0; i < xy; i++) {
        columnDiv = document.createElement('div');
        container.appendChild(columnDiv);
        columnDiv.style.border = "none";

        for (j = 0; j < xy; j++) {
            rowDiv = document.createElement('div');
            columnDiv.appendChild(rowDiv);
            rowDiv.style.borderTop = "0px";
            rowDiv.style.borderLeft = "0px";
        }
    }
}

function colorCell(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
      e.target.style.backgroundColor = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = '#fefefe'
    } else if (currentMode === 'shader') {

        if (currentColor.split("")[0] === '#') hslColor = hexToHSL(currentColor);
        getDarkerColor()
        currentColor = hslColor;
        e.target.style.backgroundColor = currentColor;
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 256);
}

function getDarkerColor() {
    arrayHsl = hslColor.split(",",).reverse();
    let numberL = +arrayHsl[0].replace(/[^0-9.]+/g, '');
    numberL -= shaderSlider.value;
    arrayHsl[0] = numberL + "%)";
    hslColor = arrayHsl.reverse().join()
}

function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return "hsl(" + h + "," + s + "%," + l + "%)";
  }

newGrid();
