let container = document.querySelector('#container');

let btnStart = document.createElement('div');

document.body.appendChild(btnStart);
btnStart.setAttribute('id','btnStart');

let xByY;

let btnStartText = document.createElement('p');
btnStartText.textContent = "Change grid";
btnStart.appendChild(btnStartText);


btnStart.addEventListener('click', (e) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      xByY = prompt("New Grid, choose between 16 and 100: ");
      
      newGrid(xByY);
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
    else
    e.target.style.background = 'red';
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