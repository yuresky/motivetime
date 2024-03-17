// Variáveis para mapa e marcadores
var mapa, marcadorUsuario, marcadorDestino;

// Função para obter a localização do usuário
function obterLocalizacao() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // Criar marcador do usuário
    marcadorUsuario = L.marker([lat, lon]).addTo(mapa);

    // Centralizar o mapa na localização do usuário
    mapa.setView([lat, lon], 13);
  });
}

// Função para adicionar marcador no clique do mapa
function adicionarMarcador(e) {
  var lat = e.latlng.lat;
  var lon = e.latlng.lng;

  // Remover marcador de destino anterior
  if (marcadorDestino) {
    mapa.removeLayer(marcadorDestino);
  }

  // Criar novo marcador de destino
  marcadorDestino = L.marker([lat, lon]).addTo(mapa);

  // Calcular e mostrar a distância
  var distancia = calcularDistancia(lat, lon);
  document.getElementById("distancia").innerHTML = "Distância: " + distancia.toFixed(2) + " km";
}

// Função para calcular a distância
function calcularDistancia(latDestino, lonDestino) {
  var latUsuario = marcadorUsuario.getLatLng().lat;
  var lonUsuario = marcadorUsuario.getLatLng().lng;

  // Fórmula de Haversine para calcular a distância em linha reta
  var dLat = (latDestino - latUsuario) * Math.PI / 180;
  var dLon = (lonDestino - lonUsuario) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(latUsuario * Math.PI / 180) * Math.cos(latDestino * Math.PI / 180) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var distancia = 6371 * c; // Raio da Terra em km

  return distancia;
}

// Inicialização do mapa
mapa = L.map('mapa').setView([0, 0], 1);

// Adicionar camada de tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);

// Obter localização do usuário
obterLocalizacao();

// Adicionar evento de clique no mapa
mapa.on('click', adicionarMarcador);

// Elemento para mostrar a distância
var distanciaElement = document.createElement("p");
distanciaElement.id = "distancia";
document.body.appendChild(distanciaElement);
