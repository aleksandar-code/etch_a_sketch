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



// storage 

function isStorageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function populateStorage(element) {
  console.log(element)
  localStorage.setItem("Cells", JSON.stringify(element));
}

function setStorage() {
  const item = localStorage.getItem("Cells");

  return item;
}

function storageType(element = null) {
  let toReturn;
  if (!(Storage.length || element == null)) {
    populateStorage(element);
  } else {
    toReturn = setStorage();
  }
  return toReturn;
}

function checkStorageAvailability() {
  if (isStorageAvailable("localStorage") === true) {
    return true;
  }
  return false;
}


function setLocaleStorageInDom() {
  const currentContainer = document.querySelector("#container")
  // const projectList = TodoList.getProjectList();
  console.log(currentContainer.firstChild.firstChild.style.backgroundColor)
  console.log(JSON.parse(setStorage()))
  const color = JSON.parse(setStorage())
  currentContainer.firstChild.firstChild.style.backgroundColor = color
  let i = 0
  for (const row of currentContainer.children) {
    console.log(row)
    for (const cell of row.children) {
      i++;
      console.log(cell.style.backgroundColor, i)
    }
  }
}

function saveInLocaleStorage() {
  if (checkStorageAvailability() === true) {
    const currentContainer = document.querySelector("#container");
    console.log("saving in localeStorage");
    let arrayOfCells = [];
    for (const row of currentContainer.children) {
      for (const cell of row.children) {
        arrayOfCells.push(cell)
      }
    }
    storageType(arrayOfCells); // here we save the container html
  }
}

// etch a sketch

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
    console.log(currentColor)
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
      e.target.style.backgroundColor = '#ffffff'
    } else if (currentMode === 'shader') {

        if (currentColor.split("")[0] === '#') hslColor = hexToHSL(currentColor);
        getDarkerColor()
        currentColor = hslColor;
        e.target.style.backgroundColor = currentColor;
    }

    saveInLocaleStorage();
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



if (checkStorageAvailability() === true) {
  if (localStorage.length) {
    console.log("storage loaded")
   setLocaleStorageInDom(); // set it in the dom
  }
  console.log("storage function available");
}
else {
  console.log("storage function not available")
}