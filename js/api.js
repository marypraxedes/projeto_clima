/**
 * @fileoverview Lógica principal do aplicativo de Previsão do Tempo (Star Wars Theme).
 * Realiza requisições para a API Open-Meteo, trata dados climáticos e manipula a interface.
 */

// Constantes para as APIs (Melhoria de Eficiência e Manutenção)
const API_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const API_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Busca os dados meteorológicos de uma cidade usando a API Open-Meteo.
 *
 * @async
 * @param {string} city - O nome da cidade (ou planeta) a ser pesquisado.
 * @returns {Promise<Object>} Um objeto contendo o nome da cidade, estado e os dados climáticos.
 * @throws {Error} Lança um erro se a entrada for vazia, se a cidade não for encontrada, ou em falhas de rede/API.
 * @example
 * const clima = await fetchWeatherData("São Paulo");
 * console.log(clima.city, clima.weatherInfo.temperature); // Retorna: São Paulo, 24.5
 */
async function fetchWeatherData(city) {
    if (!city || city.trim() === '') {
        throw new Error("Entrada vazia. Informe um planeta ou cidade.");
    }

    try {
        // 1. Geocodificação
        const geoResponse = await fetch(`${API_GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=pt`);
        
        if (geoResponse.status === 429) throw new Error("Limite de requisições excedido.");
        if (!geoResponse.ok) throw new Error("Falha na API: Erro de conexão com o servidor.");
        
        const geoData = await geoResponse.json();

        if (typeof geoData !== 'object' || (!geoData.results && Object.keys(geoData).length > 0)) {
            throw new Error("Formato de resposta inesperado da API.");
        }

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`Estrela da Morte não detectou o planeta/cidade: "${city}".`);
        }

        const { latitude, longitude, name, admin1 } = geoData.results[0];

        // 2. Previsão do Tempo
        const weatherResponse = await fetch(`${API_WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        
        if (!weatherResponse.ok) throw new Error("Falha na API: Erro no servidor de clima.");

        const weatherData = await weatherResponse.json();
        
        return {
            city: name,
            state: admin1,
            weatherInfo: weatherData.current_weather
        };

    } catch (error) {
        if (error.name === 'TypeError' || (error.message && error.message.includes('fetch'))) {
            throw new Error("Conexão de rede lenta ou instável.");
        }
        throw error;
    }
}

// ===== LÓGICA DE INTERFACE (Isolada para não quebrar no Jest) =====

/**
 * Mapeia o código do clima para uma descrição amigável e um ícone.
 * 
 * @param {number} code - Código meteorológico da WMO.
 * @param {number} isDay - 1 para dia, 0 para noite.
 * @returns {Object} Objeto contendo `desc` (descrição) e `icon` (classe do ícone).
 */
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

let isManualTheme = false;

// Função que inicializa a manipulação da tela apenas se estiver rodando no navegador
if (typeof document !== 'undefined') {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const themeToggleBtn = document.getElementById('theme-toggle');

    function updateUI(data) {
        errorMessage.classList.add('hidden');
        weatherResult.classList.remove('hidden');

        const details = getWeatherDetails(data.weatherInfo.weathercode, data.weatherInfo.is_day);
        
        document.getElementById('current-date').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('city-name').textContent = data.state ? `${data.city} - ${data.state}` : data.city;
        document.getElementById('temperature-value').textContent = Math.round(data.weatherInfo.temperature);
        document.getElementById('weather-description').textContent = details.desc;
        document.getElementById('weather-icon').className = `wi ${details.icon}`;

        if (!isManualTheme) document.body.className = data.weatherInfo.is_day === 1 ? 'light-side' : 'dark-side';
    }

    async function handleSearch() {
        try {
            const data = await fetchWeatherData(cityInput.value.trim());
            updateUI(data);
        } catch (error) {
            weatherResult.classList.add('hidden');
            errorMessage.classList.remove('hidden');
            errorText.textContent = `❌ ${error.message}`;
        }
    }

    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });
    
    themeToggleBtn.addEventListener('click', () => {
        isManualTheme = true;
        document.body.className = document.body.classList.contains('light-side') ? 'dark-side' : 'light-side';
    });
}

// Exportação para o Jest
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchWeatherData };
}