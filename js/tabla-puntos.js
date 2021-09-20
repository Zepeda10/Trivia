window.onload = function () {
    var localStorageKeyName = 'data';

    loadFromLocalStorage();

    function loadFromLocalStorage() {
        var users = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName),
            gridBody = document.querySelector("#grid tbody");

        if (dataInLocalStorage !== null) {
            users = JSON.parse(dataInLocalStorage);
        }

        // Draw TR from TBODY
        gridBody.innerHTML = '';

        users.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdNombre = document.createElement("td"),
                tdPuntaje = document.createElement("td"),
                tdCategoria = document.createElement("td"),
                tdFecha = document.createElement("td"),
                tdTiempo = document.createElement("td"),
                tdRemove = document.createElement("td"),
                btnRemove = document.createElement("button");

            tdNombre.innerHTML = x.nombre;
            tdPuntaje.innerHTML = x.puntaje;
            tdCategoria.innerHTML = x.categoria;
            tdTiempo.innerHTML = x.tiempo;
            tdFecha.innerHTML = x.fecha;
            
           // btnRemove.textContent = 'Eliminar';
            btnRemove.innerHTML = '<img src="img/eliminar.png" class="img-eliminar" />';
            btnRemove.className = 'btn-eliminar';
            btnRemove.addEventListener('click', function(){
                removeFromLocalStorage(i);
            });

            tdRemove.appendChild(btnRemove);

            tr.appendChild(tdNombre);
            tr.appendChild(tdPuntaje);
            tr.appendChild(tdCategoria);
            tr.appendChild(tdTiempo);
            tr.appendChild(tdFecha);  
            tr.appendChild(tdRemove);      

            gridBody.appendChild(tr);
        });
    }

    function removeFromLocalStorage(index){
        var users = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyName);

        users = JSON.parse(dataInLocalStorage);

        users.splice(index, 1);

        localStorage.setItem(localStorageKeyName, JSON.stringify(users));

        loadFromLocalStorage();
    }
}