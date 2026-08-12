// Importa a função que vamos testar
const { fetchWeatherData } = require('../js/api');

// Simulando (Mocking) a função global fetch do JavaScript
global.fetch = jest.fn();

describe('Bateria de Testes: Aplicativo de Clima (Star Wars Theme)', () => {
    
    // Antes de cada teste, limpamos o histórico do nosso "fetch" falso
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ==========================================
    // 3.6. TESTES BÁSICOS
    // ==========================================

    test('1. Nome de cidade válido retorna dados meteorológicos', async () => {
        // Simulando resposta da Geocodificação
        fetch.mockResolvedValueOnce({
            ok: true, status: 200,
            json: async () => ({
                results: [{ latitude: -23.55, longitude: -46.63, name: 'São Paulo', admin1: 'São Paulo' }]
            })
        });
        
        // Simulando resposta do Clima
        fetch.mockResolvedValueOnce({
            ok: true, status: 200,
            json: async () => ({
                current_weather: { temperature: 25, is_day: 1, weathercode: 0 }
            })
        });

        const data = await fetchWeatherData('São Paulo');
        
        expect(data.city).toBe('São Paulo');
        expect(data.weatherInfo.temperature).toBe(25);
        expect(fetch).toHaveBeenCalledTimes(2);
    });

    test('2. Nome de cidade inexistente lança exceção tratada', async () => {
        // Simulando retorno VAZIO da Geocodificação (cidade não existe)
        fetch.mockResolvedValueOnce({
            ok: true, status: 200,
            json: async () => ({ results: [] }) 
        });

        await expect(fetchWeatherData('Tatooine')).rejects.toThrow('Estrela da Morte não detectou o planeta/cidade: "Tatooine".');
    });

    test('3. Entrada vazia retorna erro de validação', async () => {
        await expect(fetchWeatherData('')).rejects.toThrow('Entrada vazia. Informe um planeta ou cidade.');
        // O fetch nem deve ser chamado
        expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('4. Falha da API gera resposta adequada', async () => {
        // Simulando erro interno de servidor (500)
        fetch.mockResolvedValueOnce({
            ok: false, status: 500
        });

        await expect(fetchWeatherData('Naboo')).rejects.toThrow('Falha na API: Erro de conexão com o servidor.');
    });

    // ==========================================
    // 3.7. CASOS EXTREMOS
    // ==========================================

    test('5. Limite de requisições da API excedido', async () => {
        // Simulando status HTTP 429 (Too Many Requests)
        fetch.mockResolvedValueOnce({
            ok: false, status: 429
        });

        await expect(fetchWeatherData('Coruscant')).rejects.toThrow('Limite de requisições excedido.');
    });

    test('6. Conexão de rede lenta/instável', async () => {
        // Simulando erro nativo do fetch (ex: usuário sem internet)
        fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

        await expect(fetchWeatherData('Endor')).rejects.toThrow('Conexão de rede lenta ou instável.');
    });

    test('7. Mudança inesperada no formato da resposta JSON', async () => {
        // Simulando uma resposta bizarra que não tem o array "results"
        fetch.mockResolvedValueOnce({
            ok: true, status: 200,
            json: async () => ({ msg_erro: "Formato modificado aleatoriamente" })
        });

        await expect(fetchWeatherData('Hoth')).rejects.toThrow('Formato de resposta inesperado da API.');
    });
});