//Variaveis de tela
var resposta = document.getElementById("busca");

function buscar_clima(){
  var cidade = document.getElementById('search').value;
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt_br&appid=${chave_api}`

    var request = new XMLHttpRequest();

    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();
    
    request.onload = function () {
      if (request.status === 200) {

      var DadosApi = request.response;

        resposta.innerHTML = `

        <h1>${cidade}</h1>
        <img src="https://openweathermap.org/img/wn/${DadosApi.weather[0].icon}@2x.png" alt="">
        <h1 class="graus">${Number(DadosApi.main.temp - 273.15).toFixed(1)} ºc</h1>
        <p>${String(DadosApi.weather[0].description).toLocaleUpperCase()}</p>

        <p class="sens_termica">Sensação Termica: ${Number(DadosApi.main.feels_like - 273.15).toFixed(1)} ºc</p>

        <div class="min_max">

            <p class="temp_min">Temp. Minima: ${Number(DadosApi.main.temp_min - 273.15).toFixed(1)} ºc</p>
            
            
            <p class="temp_max">Temp. Maxima: ${Number(DadosApi.main.temp_max - 273.15).toFixed(1)} ºc</p>

        </div>
        

        <section class="out_inf">

            <!-- Velocidade do vento -->
             <img src="https://cdn-icons-png.freepik.com/512/517/517287.png" alt="">
             <h3>${Number(DadosApi.wind.speed * 3.6).toFixed(1)}km/h</h3>

            <!-- Umidade -->
             <img src="https://cdn.iconscout.com/icon/free/png-256/free-humidity-icon-download-in-svg-png-gif-file-formats--water-drop-rain-climate-weather-pack-nature-icons-3796777.png" alt="">
             <h3>${Number(DadosApi.main.humidity).toFixed(0)}%</h3>
        </section>

        <section class="prox_dias">

            <div class="card">
                
            </div>
        </section>
        
        `
    
      }else {
        //console.clear();
        console.log(`Erro na requisição. Status: ${request.status} - ${request.statusText}`);
        //paragrafo.innerText = `Erro na requisição. Status: ${request.status} - ${request.statusText}`
      }
  } 
  
}













