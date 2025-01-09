var chave_api = 'ea8196972a32fb5507db75758750c9a4';
function buscar_local_usuario(){
    navigator.geolocation.getCurrentPosition(posicaoObtidaComSucesso,posicaoNaoPodeSerObtida)
  
    function posicaoObtidaComSucesso(geolocalizacao){
    buscar_cidade (geolocalizacao.coords.latitude,geolocalizacao.coords.longitude)
    }
    
    function posicaoNaoPodeSerObtida(erro) {
      console.error(erro)
    }
  
  }

function buscar_cidade (lat,lon){

    var requestURLCidade = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave_api}`

    var request = new XMLHttpRequest();

    request.open('GET', requestURLCidade);

    request.responseType = 'json';
    request.send();
    
    request.onload = function () {
      if (request.status === 200) {

      var DadosApi = request.response;

      document.getElementById('search').value = DadosApi.name.toUpperCase();

      if (document.getElementById('search').value != ""){
        buscar_clima();
      }
      
}}}

buscar_local_usuario()