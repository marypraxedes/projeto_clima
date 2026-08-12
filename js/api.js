// ===== ELEMENTOS DA DOM =====
const cityInput = typeof document !== 'undefined' ? document.getElementById('city-input') : null;
const searchBtn = typeof document !== 'undefined' ? document.getElementById('search-btn') : null;
const weatherResult = typeof document !== 'undefined' ? document.getElementById('weather-result') : null;
const errorMessage = typeof document !== 'undefined' ? document.getElementById('error-message') : null;
const errorText = typeof document !== 'undefined' ? document.getElementById('error-text') : null;
const currentDate = typeof document !== 'undefined' ? document.getElementById('current-date') : null;
const cityName = typeof document !== 'undefined' ? document.getElementById('city-name') : null;
const temperatureValue = typeof document !== 'undefined' ? document.getElementById('temperature-value') : null;
const weatherDescription = typeof document !== 'undefined' ? document.getElementById('weather-description') : null;
const weatherIcon = typeof document !== 'undefined' ? document.getElementById('weather-icon') : null;
const themeToggleBtn = typeof document !== 'undefined' ? document.getElementById('theme-toggle') : null;

let isManualTheme = false;

// ===== LÓGICA DE NEGÓCIO (TESTÁVEL COM JEST) =====

// Função centralizada apenas para buscar os dados, sem mexer na tela
async function fetchWeatherData(city) {
    if (!city || city.trim() === '') {
        throw new Error("Entrada vazia. Informe um planeta ou cidade.");
    }

    try {
        // 1. Geocodificação
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt`);
        
        if (geoResponse.status === 429) throw new Error("Limite de requisições excedido.");
        if (!geoResponse.ok) throw new Error("Falha na API: Erro de conexão com o servidor.");
        
        const geoData = await geoResponse.json();

        // Verifica formato inesperado (ex: API retorna um objeto vazio em vez de ter o array 'results')
        if (typeof geoData !== 'object' || (!geoData.results && Object.keys(geoData).length > 0)) {
            throw new Error("Formato de resposta inesperado da API.");
        }

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`Estrela da Morte não detectou o planeta/cidade: "${city}".`);
        }

        const { latitude, longitude, name, admin1 } = geoData.results[0];

        // 2. Previsão do Tempo
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        
        if (!weatherResponse.ok) throw new Error("Falha na API: Erro no servidor de clima.");

        const weatherData = await weatherResponse.json();
        
        return {
            city: name,
            state: admin1,
            weatherInfo: weatherData.current_weather
        };

    } catch (error) {
        // Intercepta erros nativos do fetch (rede desligada, DNS, etc)
        if (error.name === 'TypeError' || error.message.includes('fetch')) {
            throw new Error("Conexão de rede lenta ou instável.");
        }
        throw error; // Repassa os nossos erros customizados
    }
}

// ===== INTEGRAÇÃO COM A INTERFACE (DOM) =====

function getWeatherDetails(code, isDay) {
    const time = isDay === 1 ? 'day' : 'night';
    const weatherCodes = {
        0: { desc: 'Céu limpo', icon: `wi-${time}-sunny` },
        1: { desc: 'Principalmente limpo', icon: `wi-${time}-cloudy` },
        3: { desc: 'Nublado', icon: 'wi-cloudy' },
        61: { desc: 'Chuva leve', icon: `wi-${time}-rain` },
        95: { desc: 'Tempestade', icon: `wi-${time}-thunderstorm` }
    };
    return weatherCodes[code] || { desc: 'Clima desconhecido', icon: 'wi-na' };
}

function getFormattedDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('pt-BR', options);
}

function setTheme(isDay) {
    document.body.className = isDay === 1 ? 'light-side' : 'dark-side';
}

function updateUI(data) {
    errorMessage.classList.add('hidden');
    weatherResult.classList.remove('hidden');

    const locationName = data.state ? `${data.city} - ${data.state}` : data.city;
    const weatherDetails = getWeatherDetails(data.weatherInfo.weathercode, data.weatherInfo.is_day);

    currentDate.textContent = getFormattedDate();
    cityName.textContent = locationName;
    temperatureValue.textContent = Math.round(data.weatherInfo.temperature);
    weatherDescription.textContent = weatherDetails.desc;
    weatherIcon.className = `wi ${weatherDetails.icon}`;

    if (!isManualTheme) setTheme(data.weatherInfo.is_day);
}

function showError(message) {
    weatherResult.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorText.textContent = `❌ ${message}`;
}

async function handleSearch() {
    const city = cityInput.value.trim();
    try {
        const data = await fetchWeatherData(city);
        updateUI(data);
    } catch (error) {
        showError(error.message);
    }
}

// Inicializa os eventos apenas se estiver no navegador
if (typeof document !== 'undefined') {
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') handleSearch();
    });
    themeToggleBtn.addEventListener('click', () => {
        isManualTheme = true;
        document.body.className = document.body.classList.contains('light-side') ? 'dark-side' : 'light-side';
    });
}

// Exportando a função para o Jest conseguir testar no terminal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchWeatherData };
}