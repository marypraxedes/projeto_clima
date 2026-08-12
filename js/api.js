// Mapeando os elementos do HTML
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');
const cityName = document.getElementById('city-name');
const temperatureValue = document.getElementById('temperature-value');

// Adicionando evento de clique no botão de busca
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeatherData(city);
    }
});

// Permitir também a busca apertando "Enter" no teclado
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== '') getWeatherData(city);
    }
});

// Função assíncrona para buscar os dados
async function getWeatherData(city) {
    try {
        // PASSO 1: Descobrir as coordenadas (Latitude e Longitude) da cidade
        const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt`;
        const geoResponse = await fetch(geocodingUrl);
        const geoData = await geoResponse.json();

        // Se a API não retornar resultados, a cidade não foi encontrada
        if (!geoData.results || geoData.results.length === 0) {
            showError();
            return;
        }

        // Extraindo os dados do primeiro resultado
        const { latitude, longitude, name, admin1 } = geoData.results[0];

        // PASSO 2: Com as coordenadas em mãos, buscar a previsão do tempo atual
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // PASSO 3: Jogar os dados na tela
        showWeather(name, admin1, weatherData.current_weather.temperature);

    } catch (error) {
        console.error("Erro na requisição:", error);
        showError();
    }
}

// Função para exibir o container de clima e preencher as informações
function showWeather(name, state, temp) {
    // Esconde o erro e mostra o resultado
    errorMessage.classList.add('hidden');
    weatherResult.classList.remove('hidden');

    // Preenche os dados no HTML (usando Estado/admin1 se existir para ficar mais completo)
    const locationInfo = state ? `${name} - ${state}` : name;
    cityName.textContent = locationInfo;
    temperatureValue.textContent = temp;
}

// Função para mostrar a mensagem de erro
function showError() {
    weatherResult.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}