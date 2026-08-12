// Elementos da DOM
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
// --- Adicione isso ao topo do seu arquivo JS (junto com os outros elementos) ---
const themeToggleBtn = document.getElementById('theme-toggle');

// Elementos de exibição de dados
const currentDate = document.getElementById('current-date');
const cityName = document.getElementById('city-name');
const temperatureValue = document.getElementById('temperature-value');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');

// Dicionário de Códigos de Clima da WMO (Open-Meteo) com ícones do Weather Icons
function getWeatherDetails(code, isDay) {
    const time = isDay === 1 ? 'day' : 'night';
    
    const weatherCodes = {
        0: { desc: 'Céu limpo', icon: `wi-${time}-sunny` },
        1: { desc: 'Principalmente limpo', icon: `wi-${time}-cloudy` },
        2: { desc: 'Parcialmente nublado', icon: `wi-${time}-cloudy` },
        3: { desc: 'Nublado', icon: 'wi-cloudy' },
        45: { desc: 'Nevoeiro', icon: `wi-${time}-fog` },
        48: { desc: 'Nevoeiro com geada', icon: `wi-${time}-fog` },
        51: { desc: 'Chuvisco leve', icon: `wi-${time}-showers` },
        53: { desc: 'Chuvisco moderado', icon: `wi-${time}-showers` },
        55: { desc: 'Chuvisco forte', icon: `wi-${time}-showers` },
        61: { desc: 'Chuva leve', icon: `wi-${time}-rain` },
        63: { desc: 'Chuva moderada', icon: `wi-${time}-rain` },
        65: { desc: 'Chuva forte', icon: `wi-${time}-rain` },
        71: { desc: 'Neve leve', icon: `wi-${time}-snow` },
        73: { desc: 'Neve moderada', icon: `wi-${time}-snow` },
        75: { desc: 'Neve forte', icon: `wi-${time}-snow` },
        95: { desc: 'Tempestade', icon: `wi-${time}-thunderstorm` }
    };

    // Caso retorne um código que não está no dicionário, usa um fallback
    return weatherCodes[code] || { desc: 'Clima desconhecido', icon: 'wi-na' };
}

// Formatar a data no estilo exigido
function getFormattedDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date();
    return date.toLocaleDateString('pt-BR', options);
}

// Trocar entre Lado da Força (Dia) e Lado Sombrio (Noite)
function setTheme(isDay) {
    if (isDay === 1) {
        document.body.className = 'light-side';
    } else {
        document.body.className = 'dark-side';
    }
}

// Função principal de busca
async function getWeatherData(city) {
    try {
        // 1. Tratamento de Erros: Falha na API ou Rede na Geocodificação
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt`);
        
        if (!geoResponse.ok) throw new Error("Erro de conexão com o servidor de geocodificação.");
        
        const geoData = await geoResponse.json();

        // 2. Tratamento de Erros: Cidade inválida ou não encontrada
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(`Estrela da Morte não detectou o planeta/cidade: "${city}".`);
        }

        const { latitude, longitude, name, admin1 } = geoData.results[0];

        // 3. Buscar previsão do tempo
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        
        if (!weatherResponse.ok) throw new Error("Erro de conexão com o servidor de clima.");

        const weatherData = await weatherResponse.json();
        const current = weatherData.current_weather;

        // Extrair informações e atualizar a interface
        updateUI(name, admin1, current);

    } catch (error) {
        // Exibir mensagem de erro capturada (seja de rede, API ou cidade não encontrada)
        showError(error.message);
    }
}

function updateUI(city, state, weatherInfo) {
    errorMessage.classList.add('hidden');
    weatherResult.classList.remove('hidden');

    const locationName = state ? `${city} - ${state}` : city;
    const weatherDetails = getWeatherDetails(weatherInfo.weathercode, weatherInfo.is_day);

    // Atualiza o DOM
    currentDate.textContent = getFormattedDate();
    cityName.textContent = locationName;
    temperatureValue.textContent = Math.round(weatherInfo.temperature);
    weatherDescription.textContent = weatherDetails.desc;
    
    // Atualiza o Ícone
    weatherIcon.className = `wi ${weatherDetails.icon}`;

    // SÓ atualiza automaticamente se o usuário não tiver clicado no botão
    if (!isManualTheme) {
        setTheme(weatherInfo.is_day);
    }
}

function showError(message) {
    weatherResult.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorText.textContent = `❌ ${message}`;
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') getWeatherData(city);
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== '') getWeatherData(city);
    }
});

// Criamos uma variável para saber se você assumiu o controle manual
let isManualTheme = false;

// Event Listener para o botão de trocar de tema manualmente
themeToggleBtn.addEventListener('click', () => {
    isManualTheme = true; // A Força agora está sob seu comando!
    
    // Verifica qual classe está no body atualmente e inverte
    if (document.body.classList.contains('light-side')) {
        document.body.className = 'dark-side';
    } else {
        document.body.className = 'light-side';
    }
});