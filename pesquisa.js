let allCities = [];
var cidade = "";
// Função para carregar todas as cidades da API do IBGE ao carregar a página
async function preloadCities() {
  const requestURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios';
  
  try {
    const response = await fetch(requestURL);
    allCities = await response.json();
    //console.log("Todas as cidades foram carregadas:", allCities);
  } catch (error) {
    console.error('Erro ao carregar as cidades:', error);
  }
}

// Função para remover acentos de uma string
function removeAcentos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Chama a função de preload quando a página for carregada
window.onload = preloadCities;

// Função para filtrar e mostrar as sugestões à medida que o usuário digita
document.getElementById('search').addEventListener('input', function() {
  const inputValue = removeAcentos(this.value.toUpperCase()); // Remove os acentos do valor digitado
  const suggestionsList = document.getElementById('suggestions'); // Referência para a lista de sugestões

  if (inputValue.length >= 2 && allCities.length > 0) { // Só busca após 2 caracteres e se as cidades já foram carregadas
    // Filtra as cidades que começam com os caracteres digitados, ignorando acentos
    const filteredCities = allCities.filter(city => 
      removeAcentos(city.nome.toUpperCase()).startsWith(inputValue)
    );

    // Limpa as sugestões anteriores
    suggestionsList.innerHTML = '';

    // Mostra as novas sugestões ou esconde a lista se não houver resultados
    if (filteredCities.length > 0) {
      suggestionsList.classList.remove('hidden');
      filteredCities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city.nome.toUpperCase() + " - " + String(city.microrregiao.mesorregiao.UF.sigla).toUpperCase();
        
        // Evento ao clicar na sugestão
        li.addEventListener('click', function() {
          document.getElementById('search').value = city.nome.toUpperCase();
          
          cidade = city.nome;
          buscar_clima();
          suggestionsList.classList.add('hidden'); 
        });
        suggestionsList.appendChild(li);
      });
    } else {
      suggestionsList.classList.add('hidden');
    }
  } else {
    suggestionsList.classList.add('hidden');
  }
});
