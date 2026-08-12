/**
 * @fileoverview Lógica principal do aplicativo de Previsão do Tempo (Star Wars Theme + Extra Metrics).
 */

const API_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const API_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

async function fetchWeatherData(city) {
    if (!city || city.trim() === '') throw new Error("Entrada vazia. Informe um planeta ou cidade da galáxia.");
    try {
        const geoResponse = await fetch(`${API_GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=pt`);
        if (geoResponse.status === 429) throw new Error("Limite de requisições excedido nos computadores da Coruscant.");
        if (!geoResponse.ok) throw new Error("Falha na API: Erro de conexão com o Império.");
        
        const geoData = await geoResponse.json();

        if (!geoData.results || !Array.isArray(geoData.results) || geoData.results.length === 0) {
            throw new Error(`Erro de Navegação: Setor desconhecido! A Força não detecta nenhum planeta chamado "${city}".`);
        }

        const { latitude, longitude, name, admin1, country } = geoData.results[0];
        
        const weatherUrl = `${API_WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,is_day`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) throw new Error("Falha na API: Erro no servidor de clima.");

        const weatherData = await weatherResponse.json();
        
        const locationFullName = admin1 ? `${name}, ${admin1}` : `${name} (${country})`;

        return { city: locationFullName, state: '', weatherInfo: weatherData.current };

    } catch (error) {
        if (error.name === 'TypeError' || (error.message && error.message.includes('fetch'))) {
            throw new Error("Conexão de rede perdida na Orla Exterior.");
        }
        throw error;
    }
}

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

if (typeof document !== 'undefined') {
    // ===== ÁUDIOS CAPTURADOS DO HTML =====
    const themeSong = document.getElementById('audio-theme');
    const saberSith = document.getElementById('audio-sith');
    const saberJedi = document.getElementById('audio-jedi');

    // Configura o volume da música para não estourar o ouvido
    if (themeSong) themeSong.volume = 0.4;

    const introScreen = document.getElementById('intro-screen');
    const startIntroBtn = document.getElementById('start-intro-btn');
    const skipIntroBtn = document.getElementById('skip-intro-btn');
    const starWarsIntro = document.getElementById('star-wars-intro');
    const introContent = document.getElementById('intro-content');
    const appMain = document.getElementById('app-main');

    let introTimeout;

    // Função universal para tocar áudio forçado
    async function playAudio(audioElement) {
        try {
            if (audioElement) {
                audioElement.currentTime = 0;
                await audioElement.play();
            }
        } catch (err) {
            console.warn("O navegador bloqueou o áudio:", err);
        }
    }

    startIntroBtn.addEventListener('click', () => {
        introContent.classList.add('hidden');
        starWarsIntro.classList.remove('hidden');
        skipIntroBtn.classList.remove('hidden');

        playAudio(themeSong); // Toca a música tema

        introTimeout = setTimeout(finishIntro, 14000);
    });

    skipIntroBtn.addEventListener('click', () => {
        clearTimeout(introTimeout);
        finishIntro();
    });

    function finishIntro() {
        if (themeSong) {
            let fadeAudio = setInterval(() => {
                if (themeSong.volume > 0.05) {
                    themeSong.volume -= 0.05;
                } else {
                    themeSong.pause();
                    clearInterval(fadeAudio);
                }
            }, 200);
        }

        introScreen.classList.add('hidden');
        appMain.classList.remove('hidden');

        // ===== ADICIONE ESTE BLOCO AQUI =====
        const ambientLight = document.getElementById('ambient-light');
        if (ambientLight && document.body.classList.contains('light-side')) {
            ambientLight.volume = 0.2;
            ambientLight.play().catch(e => console.log("Áudio ambiente liberado:", e));
        }
        // ===================================
    }

    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const themeToggleBtn = document.getElementById('theme-toggle');

    function updateUI(data) {
        errorMessage.classList.add('hidden');
        weatherResult.classList.remove('hidden');

        const info = data.weatherInfo;
        const details = getWeatherDetails(info.weather_code, info.is_day);

        document.getElementById('current-date').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('city-name').textContent = data.state ? `${data.city} - ${data.state}` : data.city;

        document.getElementById('temperature-value').textContent = Math.round(info.temperature_2m);
        document.getElementById('weather-description').textContent = details.desc;
        document.getElementById('weather-icon').className = `wi ${details.icon}`;

        document.getElementById('humidity-value').textContent = info.relative_humidity_2m;
        document.getElementById('wind-value').textContent = info.wind_speed_10m;
        document.getElementById('precip-value').textContent = info.precipitation;

        if (!isManualTheme) {
            document.body.className = info.is_day === 1 ? 'light-side' : 'dark-side';
        }
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
        const vaderCompanion = document.getElementById('vader-companion');
        
        // Elementos de áudio
        const ambientLight = document.getElementById('ambient-light');
        const vaderSpeech = document.getElementById('vader-speech-audio'); // A fala "I have you now"
        const ambientDark = document.getElementById('ambient-dark');     // O som ambiente escuro

        if (document.body.classList.contains('light-side')) {
            document.body.className = 'dark-side';
            playAudio(saberSith); // Som clássico do sabre Sith

            // Para o som do lado claro
            if(ambientLight) ambientLight.pause();
            
            // 1. Toca a fala do Darth Vader ("I have you now") imediatamente
            if(vaderSpeech) {
                vaderSpeech.currentTime = 0; // Reinicia o áudio caso seja clicado de novo
                vaderSpeech.volume = 0.8;    // Volume bem nítido
                vaderSpeech.play().catch(e => console.log("Áudio bloqueado"));
            }

            // 2. Toca o som ambiente escuro em loop (respiração ou zumbido)
            if(ambientDark) {
                ambientDark.volume = 0.2;
                ambientDark.play().catch(e => console.log("Áudio bloqueado"));
            }

            if (vaderCompanion) {
                vaderCompanion.classList.add('active');
            }
        } else {
            document.body.className = 'light-side';
            playAudio(saberJedi); // Som do sabre Jedi

            // Pausa os sons do lado escuro
            if(vaderSpeech) vaderSpeech.pause();
            if(ambientDark) ambientDark.pause();
            
            // Retoma o som ambiente do lado claro
            if(ambientLight) {
                ambientLight.volume = 0.2;
                ambientLight.play().catch(e => console.log("Áudio bloqueado"));
            }

            if (vaderCompanion) {
                vaderCompanion.classList.remove('active');
            }
        }
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchWeatherData };
}
