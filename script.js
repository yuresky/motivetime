
var mapa = L.map('map');
mapa.locate({setView: true, maxZoom: 16});

var marcadorLocalizacaoUsuario;
var marcadoresEscolhidos = [];
var watchId;
var distancia;

function aoEncontrarLocalizacao(e) {
  var raio = e.accuracy / 10;

  if (!marcadorLocalizacaoUsuario) {
    marcadorLocalizacaoUsuario = L.marker(e.latlng).addTo(mapa)
      .bindPopup("Você está aqui!").openPopup();
  } else {
    marcadorLocalizacaoUsuario.setLatLng(e.latlng);
  }

  L.circle(e.latlng, raio).addTo(mapa);

  mapa.on('click', function(e) {
    if (selecionandoPonto) {
      atualizarMarcador(e.latlng);
      selecionandoPonto = false;
      btnSelecionarPonto.innerText = "Selecionar Ponto";
    }
  });

  if (marcadoresEscolhidos.length > 0) {
    marcadoresEscolhidos.forEach(function(marcador) {
      distancia = mapa.distance(marcadorLocalizacaoUsuario.getLatLng(), marcador.getLatLng());
      marcador.bindPopup("Distância: " +  distancia.toFixed(2) + " Metros").openPopup();
    });
  }
}

function atualizarMarcador(latlng) {
  var novoMarcador;
  if (marcadoresEscolhidos.length < 3) { // Define o máximo de três marcadores
    novoMarcador = L.marker(latlng, { draggable: false }).addTo(mapa);
    marcadoresEscolhidos.push(novoMarcador);
  } else {
    alert("Você já atingiu o limite máximo de marcadores.");
    return;
  }

  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
  }

  watchId = navigator.geolocation.watchPosition(function(position) {
    var latlng = L.latLng(position.coords.latitude, position.coords.longitude);
    marcadorLocalizacaoUsuario.setLatLng(latlng);
    L.circle(latlng, position.coords.accuracy / 10).addTo(mapa);

    marcadoresEscolhidos.forEach(function(marcador) {
      distancia = mapa.distance(marcadorLocalizacaoUsuario.getLatLng(), marcador.getLatLng());
      marcador.bindPopup("Distância: " +  distancia.toFixed(2) + " Metros").openPopup();
    });

    var limiteDistancia = 11; // Define o limite de distância em metros
    if (distancia <= limiteDistancia) {
      Notification.requestPermission().then(perm => {
        if (perm === "granted") {
          alert("Próximo do marcador");
        }
      });
    }
  });
}

function aoFalharLocalizacao(e) {
  alert(e.message);
}

var selecionandoPonto = false;
var btnSelecionarPonto = document.getElementById('btnSelecionarPonto');
btnSelecionarPonto.addEventListener('click', function() {
  selecionandoPonto = !selecionandoPonto;
  if (selecionandoPonto) {
    btnSelecionarPonto.innerText = "Cancelar Seleção";
  } else {
    btnSelecionarPonto.innerText = "Selecionar Ponto";
  }
});

mapa.on('locationfound', aoEncontrarLocalizacao);
mapa.on('locationerror', aoFalharLocalizacao);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);