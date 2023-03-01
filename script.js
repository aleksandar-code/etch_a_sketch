let container = document.querySelector('#container');
let currentColor = "#000000";
const colorPicker = document.getElementById('colorPicker');
colorPicker.oninput = (e) => setCurrentColor(e.target.value)


const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => newGrid(e.target.value)


function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`
}

function setCurrentColor(color) {
    currentColor = color;
}


let btnClear = document.getElementById('clear');

btnClear.addEventListener('click', (e) => {
      newGrid();
});

let btnEraser = document.getElementById('eraser');

btnEraser.addEventListener('click', (e) => {
    currentColor = "white";
});
let btnColor = document.getElementById('color');

btnColor.addEventListener('click', (e) => {
    currentColor = colorPicker.value
});

let rowDiv;
let columnDiv;


container.addEventListener('mouseover', (e) => {
    if (e.target === container) {
        return;
    }
    else {
    e.target.style.background = currentColor;
    }
});


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
newGrid();