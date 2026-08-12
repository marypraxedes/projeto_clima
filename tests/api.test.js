/**
 * @fileoverview Bateria de testes unitários com Jest para a API do aplicativo de Clima.
 */

const { fetchWeatherData } = require('../js/api');

global.fetch = jest.fn();

// Função utilitária para reduzir redundância nos testes
const mockFetchResponse = (ok, status, data, rejectError = null) => {
    if (rejectError) return fetch.mockRejectedValueOnce(rejectError);
    return fetch.mockResolvedValueOnce({ ok, status, json: async () => data });
};

describe('Bateria de Testes: Aplicativo de Clima (Star Wars Theme)', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // --- TESTES BÁSICOS ---

    test('1. Nome de cidade válido retorna dados meteorológicos', async () => {
        mockFetchResponse(true, 200, { results: [{ latitude: -23.55, longitude: -46.63, name: 'São Paulo', admin1: 'SP' }] });
        mockFetchResponse(true, 200, { current_weather: { temperature: 25, is_day: 1, weathercode: 0 } });

        const data = await fetchWeatherData('São Paulo');
        
        expect(data.city).toBe('São Paulo');
        expect(data.weatherInfo.temperature).toBe(25);
        expect(fetch).toHaveBeenCalledTimes(2); // Garante que chamou Geocoding e Clima
    });

    test('2. Nome de cidade inexistente lança exceção tratada', async () => {
        mockFetchResponse(true, 200, { results: [] });
        await expect(fetchWeatherData('Tatooine')).rejects.toThrow('Estrela da Morte não detectou o planeta/cidade: "Tatooine".');
    });

    test('3. Entrada vazia retorna erro de validação', async () => {
        await expect(fetchWeatherData('')).rejects.toThrow('Entrada vazia. Informe um planeta ou cidade.');
        expect(fetch).not.toHaveBeenCalled();
    });

    test('4. Falha da API gera resposta adequada', async () => {
        mockFetchResponse(false, 500, {});
        await expect(fetchWeatherData('Naboo')).rejects.toThrow('Falha na API: Erro de conexão com o servidor.');
    });

    // --- CASOS EXTREMOS ---

    test('5. Limite de requisições da API excedido', async () => {
        mockFetchResponse(false, 429, {});
        await expect(fetchWeatherData('Coruscant')).rejects.toThrow('Limite de requisições excedido.');
    });

    test('6. Conexão de rede lenta/instável (erro nativo)', async () => {
        mockFetchResponse(false, 0, null, new TypeError('Failed to fetch'));
        await expect(fetchWeatherData('Endor')).rejects.toThrow('Conexão de rede lenta ou instável.');
    });

    test('7. Mudança inesperada no formato da resposta JSON', async () => {
        mockFetchResponse(true, 200, { unexpected_field: true });
        await expect(fetchWeatherData('Hoth')).rejects.toThrow('Formato de resposta inesperado da API.');
    });
});