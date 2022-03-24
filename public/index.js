const LUGARES = []

let count = 0

setTimeout(() => {
    fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then(response => {
            response.forEach(element => {
                LUGARES.push(element)
            });
            console.log(LUGARES);
            initMap(LUGARES[0].lat, LUGARES[0].lng, LUGARES[0].name, LUGARES[0].descripcion)
        })
}, 200);

// window.initMap = function (latitud, longitud, name, description) {
function initMap(latitud, longitud, name, description) {
    console.log('coordenada:', latitud, longitud);
    const btnBack = document.getElementById('btnBack')
    const btnNext = document.getElementById('btnNext')
    console.log(count);

    if (count === 0) btnBack.disabled = true
    else btnBack.disabled = false
    if (count === 2) btnNext.disabled = true
    else btnNext.disabled = false

    let mapOptions;
    let marker;

    mapOptions = {
        zoom: 10, center: { lat: latitud, lng: longitud }
    }
    let map = new google.maps.Map(document.getElementById("map"), mapOptions)
    document.getElementById('lugar').innerHTML = name + ' (' + latitud + ', ' + longitud + ')'
    document.getElementById('description').innerHTML = description
    marker = new google.maps.Marker({
        position: { lat: latitud, lng: longitud }, map: map
    })

    const infowindow = new google.maps.InfoWindow({
        content: "<p>Marker Location:" + marker.getPosition() + "</p>"
    })

    google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker)
    })
}

function onClickIzq() {
    count -= 1
    const coordenadas = returnPos(count)
    console.log('Datos:', coordenadas);
    initMap(coordenadas.lat, coordenadas.lng, coordenadas.name, coordenadas.descripcion)
}

function onClickDer() {
    count += 1
    const coordenadas = returnPos(count)
    console.log('Datos:', coordenadas);
    initMap(coordenadas.lat, coordenadas.lng, coordenadas.name, coordenadas.descripcion)
}


function returnPos(contador) {
    let pos = []
    LUGARES.map(element => {
        if (contador === element.id) {
            console.log(LUGARES[element.id]);
            pos = LUGARES[element.id]
        }
    })
    return pos
}