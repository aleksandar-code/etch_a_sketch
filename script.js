let container = document.querySelector('#container');

let btnStart = document.createElement('div');

let colorChanged = 0;

let newColor = 0;

const btnContainer = document.createElement("div");

btnContainer.style.cssText = "display: flex; flex-direction: column; border: none; justify-content:center; gap: 15px;"

document.body.appendChild(btnContainer);

btnContainer.appendChild(btnStart);
btnStart.setAttribute('id','btnStart');

let xByY;

let btnStartText = document.createElement('p');
btnStartText.textContent = "New grid";
btnStart.appendChild(btnStartText);


btnStart.addEventListener('click', (e) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      xByY = prompt("New Grid, choose between 16 and 100: ");
      if (xByY < 101){
           newGrid(xByY);
        }
});


    for (i = 0; i < 16; i++) {
            let columnDiv = document.createElement('div');
            container.appendChild(columnDiv);
            columnDiv.style.border = "none";
        for (j = 0; j < 16; j++) {
            let rowDiv = document.createElement('div');
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

    
    e.target.style.background = 'red';
    }
    else if (newColor === 1) {
        e.target.style.background = 'blue';
    }
});
   

function newGrid (xy) {
    
    for (i = 0; i < xy; i++) {
        let columnDiv = document.createElement('div');
        container.appendChild(columnDiv);
        columnDiv.style.border = "none";
    for (j = 0; j < xy; j++) {
        let rowDiv = document.createElement('div');
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

function changeColorBlue(e) {
    if (e)
    newColor++;
}

let btnResetColor = document.createElement('div');
btnContainer.appendChild(btnResetColor);

let btnResetColorText = document.createElement('p');
btnResetColorText.textContent = "Red";
btnResetColor.appendChild(btnResetColorText);

btnResetColor.setAttribute('id','btnResetColor');

btnResetColor.addEventListener('click', resetColor);


function resetColor(e) {
    if (e)
    newColor = 0;
}