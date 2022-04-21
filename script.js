let container = document.querySelector('#container');


    for (i = 0; i < 16; i++) {
            let columnDiv = document.createElement('div');
            container.appendChild(columnDiv);
            columnDiv.style.border = "none";
        for (j = 0; j < 16; j++) {
            let rowDiv = document.createElement('div');
            columnDiv.appendChild(rowDiv);
        }
    }

   