let container = document.querySelector('#container');


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
})
   