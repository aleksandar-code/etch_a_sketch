let container = document.querySelector('#container');

let btnStart = document.createElement('div');

let newColor = 0;

let item;

const btnContainer = document.createElement("div");

btnContainer.style.cssText = "display: flex; flex-direction: row; border: none; justify-content:space-between; width:90vh; gap: 8px; flex:1 1 auto; height: 10vh; align-items: stretch;"

document.body.appendChild(btnContainer);

btnContainer.appendChild(btnStart);
btnStart.setAttribute('id','btnStart');

let xByY = 16;

let btnStartText = document.createElement('p');
btnStartText.textContent = "New";
btnStart.appendChild(btnStartText);


btnStart.addEventListener('click', (e) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      xByY = prompt("Choose grid size 2 to 100: ");
      if (xByY < 101){
           newGrid(xByY);
        }
});


let btnResetGrid = document.createElement('div');
btnContainer.appendChild(btnResetGrid);

let btnResetGridText = document.createElement('p');
btnResetGridText.textContent = "Clear";
btnResetGrid.appendChild(btnResetGridText);

btnResetGrid.setAttribute('id','btnClearGrid');

btnResetGrid.addEventListener('click', (e) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      newGrid(xByY);
   
});

let rowDiv;
let columnDiv;
    for (i = 0; i < xByY; i++) {
            columnDiv = document.createElement('div');
            container.appendChild(columnDiv);
            columnDiv.style.border = "none";

        for (j = 0; j < xByY; j++) {
            rowDiv = document.createElement('div');
            columnDiv.appendChild(rowDiv);
            rowDiv.style.borderTop = "0px";
            rowDiv.style.borderLeft = "0px";
           
            
            
        }
    }
    

container.addEventListener('mouseover', (e) => {
    
    if (e.target === container) {
        return;
    }
    else if (newColor === 0) {
    e.target.style.background = 'black';
    }
    else if (newColor === 1) {
        e.target.style.background = 'blue';
    }
    else if (newColor === 2) {
        e.target.style.background = 'red';
    }
    else if (newColor === 3) {
        e.target.style.background = 'white';

    }
});
   

function newGrid (xy) {
    
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


let btnChangeColor = document.createElement('div');
btnContainer.appendChild(btnChangeColor);

let btnChangeColorText = document.createElement('p');
btnChangeColorText.textContent = "Blue";
btnChangeColor.appendChild(btnChangeColorText);

btnChangeColor.setAttribute('id','btnChangeColor');

btnChangeColor.addEventListener('click', changeColorBlue);

let btnDefaultColor = document.createElement('div');
btnContainer.appendChild(btnDefaultColor);

let btnDefaultColorText = document.createElement('p');
btnDefaultColorText.textContent = "Black";
btnDefaultColor.appendChild(btnDefaultColorText);

btnDefaultColor.setAttribute('id', 'btnDefaultColor');

btnDefaultColor.addEventListener('click', resetColor)
function changeColorBlue(e) {
    if (e)
    newColor = 1;
}

let btnResetColor = document.createElement('div');
btnContainer.appendChild(btnResetColor);

let btnResetColorText = document.createElement('p');
btnResetColorText.textContent = "Red";
btnResetColor.appendChild(btnResetColorText);

btnResetColor.setAttribute('id','btnResetColor');

btnResetColor.addEventListener('click', redColor);





let btnEraser = document.createElement('div');
btnContainer.appendChild(btnEraser);

let eraserText = document.createElement('p');
eraserText.textContent = "Eraser";
btnEraser.appendChild(eraserText);

btnEraser.setAttribute('id','btnEraser');

btnEraser.addEventListener('click', eraser);



function resetColor(e) {
    if (e)
    newColor = 0;
}
function redColor(e) {
    if (e) newColor = 2;
}

function eraser(e) {
    if (e) newColor = 3;
}


