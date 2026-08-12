/**
 * @fileoverview Lógica principal do ForceCast (Intro Star Wars + Open-Meteo + Geolocalização + Temas).
 */

const API_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const API_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

async function fetchWeatherData(city) {
    if (!city || city.trim() === '') throw new Error("Entrada vazia. Informe um planeta ou cidade.");
    try {
        const geoResponse = await fetch(`${API_GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=pt`);
        if (geoResponse.status === 429) throw new Error("Limite de requisições excedido.");
        if (!geoResponse.ok) throw new Error("Falha na conexão com o Império.");
        
        const geoData = await geoResponse.json();
        if (!geoData.results || !Array.isArray(geoData.results) || geoData.results.length === 0) {
            throw new Error(`Setor desconhecido! A Força não detecta: "${city}".`);
        }

        const { latitude, longitude, name, admin1, country } = geoData.results[0];
        
        const weatherUrl = `${API_WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) throw new Error("Falha no servidor de clima.");

        const weatherData = await weatherResponse.json();
        const locationFullName = admin1 ? `${name}, ${admin1}` : `${name} (${country})`;

        return { 
            city: locationFullName, 
            state: '', 
            weatherInfo: weatherData.current,
            dailyInfo: weatherData.daily 
        };
    } catch (error) {
        throw error;
    }
}

function getWeatherDetails(code, isDay) {
    const time = isDay === 1 ? 'day' : 'night';
    const weatherCodes = {
        0: { desc: 'Céu limpo', icon: `wi-${time}-sunny` },
        1: { desc: 'Principalmente limpo', icon: `wi-${time}-cloudy` },
        2: { desc: 'Parcialmente nublado', icon: `wi-${time}-cloudy` },
        3: { desc: 'Nublado', icon: 'wi-cloudy' },
        51: { desc: 'Garoa leve', icon: `wi-${time}-sprinkle` },
        61: { desc: 'Chuva leve', icon: `wi-${time}-rain` },
        95: { desc: 'Tempestade', icon: `wi-${time}-thunderstorm` }
    };
    return weatherCodes[code] || { desc: 'Clima desconhecido', icon: 'wi-na' };
}

let isManualTheme = false;

// Garante que o script só rode após o HTML estar totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    // ===== ÁUDIOS E TELA DE ABERTURA =====
    const themeSong = document.getElementById('audio-theme');
    const saberSith = document.getElementById('audio-sith');
    const saberJedi = document.getElementById('audio-jedi');
    const ambientLight = document.getElementById('ambient-light');
    
    const introScreen = document.getElementById('intro-screen');
    const startIntroBtn = document.getElementById('start-intro-btn');
    const skipIntroBtn = document.getElementById('skip-intro-btn');
    const starWarsIntro = document.getElementById('star-wars-intro');
    const introContent = document.getElementById('intro-content');

    let introTimeout;
    if (themeSong) themeSong.volume = 0.4;

    async function playAudio(audioElement) {
        try { 
            if (audioElement) { 
                audioElement.currentTime = 0; 
                await audioElement.play(); 
            } 
        } catch (err) { 
            console.warn("Áudio bloqueado pelo navegador."); 
        }
    }

    if (startIntroBtn) {
        startIntroBtn.addEventListener('click', () => {
            introContent.classList.add('hidden');
            starWarsIntro.classList.remove('hidden');
            skipIntroBtn.classList.remove('hidden');
            playAudio(themeSong);
            introTimeout = setTimeout(finishIntro, 14000);
        });
    }

    if (skipIntroBtn) {
        skipIntroBtn.addEventListener('click', () => {
            clearTimeout(introTimeout);
            finishIntro();
        });
    }

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

        if (introScreen) introScreen.classList.add('hidden');

        if (ambientLight && document.body.classList.contains('light-side')) {
            ambientLight.volume = 0.2;
            ambientLight.play().catch(e => {});
        }
    }

    // ===== ELEMENTOS DA APLICAÇÃO =====
    const appLogo = document.getElementById('app-logo');
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const geoBtn = document.getElementById('geo-btn');
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Função para trocar a logo da tela e o favicon da aba simultaneamente
function setLogo(isDark) {
    const appLogo = document.getElementById('app-logo');
    const appFavicon = document.getElementById('app-favicon');

    const imagePath = isDark ? 'images/logo-dark.png' : 'images/logo-light.png';

    // Altera a logo do topo esquerdo
    if (appLogo) {
        appLogo.src = imagePath;
    }

    // Altera o ícone da aba do navegador
    if (appFavicon) {
        appFavicon.href = imagePath;
    }
}

    // Atualização da UI
    function updateUI(data) {
        errorMessage.classList.add('hidden');
        weatherResult.classList.remove('hidden');

        const info = data.weatherInfo;
        const details = getWeatherDetails(info.weather_code, info.is_day);

        document.getElementById('current-date').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        document.getElementById('city-name').textContent = data.city;
        document.getElementById('temperature-value').textContent = Math.round(info.temperature_2m);
        document.getElementById('weather-description').textContent = details.desc;
        document.getElementById('weather-icon').className = `wi ${details.icon}`;
        document.getElementById('humidity-value').textContent = info.relative_humidity_2m;
        document.getElementById('wind-value').textContent = info.wind_speed_10m;
        document.getElementById('precip-value').textContent = info.precipitation;

        if (data.dailyInfo) updateForecastUI(data.dailyInfo);

        if (!isManualTheme) {
            const isDark = info.is_day !== 1;
            document.body.className = isDark ? 'dark-side' : 'light-side';
            setLogo(isDark);
        }
    }

    // Busca Manual
   async function handleSearch() {
    try {
        // MOSTRA O CARREGAMENTO IMEDIATAMENTE ANTES DO FETCH
        errorMessage.classList.remove('hidden');
        weatherResult.classList.add('hidden');
        errorText.textContent = "🌌 Vasculhando na galáxia...";

        // Faz a busca na API
        const data = await fetchWeatherData(cityInput.value.trim());
        updateUI(data);
        
    } catch (error) {
        weatherResult.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorText.textContent = `❌ ${error.message}`;
    }
}

    if (searchBtn) searchBtn.addEventListener('click', handleSearch);
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => { 
            if (e.key === 'Enter') handleSearch(); 
        });
    }

    // Geolocalização direta por coordenadas (mais precisa e rápida)
    if (geoBtn) {
        geoBtn.addEventListener('click', () => {
            if ("geolocation" in navigator) {
                geoBtn.textContent = "⏳";
                
                // MOSTRA O CARREGAMENTO ANTES DE PEGAR A POSIÇÃO
                errorMessage.classList.remove('hidden');
                weatherResult.classList.add('hidden');
                errorText.textContent = "🌌 Vasculhando na galáxia...";

                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`);
                        const geoData = await geoRes.json();
                        const cityName = geoData.city || geoData.locality || "Sua Localização";
                        const stateName = geoData.principalSubdivision || "";
                        const locationFullName = stateName ? `${cityName}, ${stateName}` : cityName;

                        const weatherUrl = `${API_WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
                        const weatherRes = await fetch(weatherUrl);
                        if (!weatherRes.ok) throw new Error("Erro ao buscar clima via satélite.");
                        const weatherData = await weatherRes.json();

                        const finalData = {
                            city: locationFullName,
                            state: '',
                            weatherInfo: weatherData.current,
                            dailyInfo: weatherData.daily
                        };

                        updateUI(finalData);
                        geoBtn.textContent = "📍";
                    } catch (e) {
                        geoBtn.textContent = "📍";
                        errorText.textContent = `❌ Falha ao obter dados: ${e.message}`;
                        errorMessage.classList.remove('hidden');
                    }
                }, () => { 
                    geoBtn.textContent = "📍"; 
                    errorMessage.classList.add('hidden');
                    alert("Acesso à localização negado."); 
                });
            } else {
                alert("Geolocalização não suportada.");
            }
        });
    }

    // Troca de Tema Manual com os Áudios do Lado da Força e Lado Sombrio
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isManualTheme = true;
            const isDark = !document.body.classList.contains('dark-side');
            document.body.className = isDark ? 'dark-side' : 'light-side';
            setLogo(isDark);

            // Captura os elementos de áudio específicos do tema
            const ambientLight = document.getElementById('ambient-light');
            const vaderSpeech = document.getElementById('vader-speech-audio'); 
            const ambientDark = document.getElementById('ambient-dark');

            if (isDark) {
                // Tira o sabre de luz Sith
                playAudio(saberSith); 

                // Pausa o som ambiente da nave (luz)
                if (ambientLight) ambientLight.pause();
                
                // Toca a fala do Darth Vader ("I have you now")
                if (vaderSpeech) {
                    vaderSpeech.currentTime = 0; 
                    vaderSpeech.volume = 0.8;    
                    vaderSpeech.play().catch(e => console.log("Áudio bloqueado pelo navegador"));
                }

                // Toca o som ambiente escuro em loop
                if (ambientDark) {
                    ambientDark.volume = 0.2;
                    ambientDark.play().catch(e => console.log("Áudio bloqueado pelo navegador"));
                }
            } else {
                // Tira o som de desligar o sabre de luz
                playAudio(saberJedi); 

                // Para os áudios do lado sombrio
                if (vaderSpeech) vaderSpeech.pause();
                if (ambientDark) ambientDark.pause();
                
                // Retorna o som ambiente da nave (luz)
                if (ambientLight) {
                    ambientLight.volume = 0.2;
                    ambientLight.play().catch(e => console.log("Áudio bloqueado pelo navegador"));
                }
            }
        });
    }

function updateForecastUI(dailyData) {
    for (let i = 0; i < 3; i++) {
        const targetIndex = i + 1;
        const card = document.getElementById(`forecast-${i}`);
        if (card && dailyData && dailyData.time[targetIndex]) {
            const max = Math.round(dailyData.temperature_2m_max[targetIndex]);
            const min = Math.round(dailyData.temperature_2m_min[targetIndex]);
            const day = new Date(dailyData.time[targetIndex] + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'short' });
            card.querySelector('.forecast-day').textContent = day.toUpperCase() + '.';
            card.querySelector('p').textContent = `${max}° / ${min}°`;
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fetchWeatherData };
}
})