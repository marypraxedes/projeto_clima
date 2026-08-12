# 🛡️ Relatório de Auditoria de Segurança e Privacidade

**Projeto:** Previsão do Tempo - Star Wars Edition  
**Data da Auditoria:** Agosto de 2026  
**Escopo:** Aplicação Front-end em JavaScript Puro (Vanilla JS), HTML5 e CSS3.

## 1. Análise de Riscos e Pontos Vulneráveis
- **Exposição de Chaves de API (API Keys):** **Nenhum risco detectado.** A API utilizada (Open-Meteo) adota um modelo público sem necessidade de tokens de autenticação, o que impede o vazamento de credenciais sensíveis no código-fonte do cliente.
- **Armazenamento de Dados Sensíveis:** **Conforme.** O aplicativo recolhe apenas o texto digitado pelo usuário para realizar a busca da cidade. Não são utilizados cookies de rastreamento, LocalStorage persistente ou coleta de dados pessoais identificáveis (PII).
- **Comunicação em Rede:** As requisições HTTP são realizadas exclusivamente através do protocolo seguro `HTTPS` provido pelas endpoints oficiais da Open-Meteo e Geocoding API, prevenindo ataques de interceptação (Man-in-the-Middle).

## 2. Recomendações para Ambiente de Produção
- **Políticas de Segurança de Conteúdo (CSP):** Recomenda-se implementar cabeçalhos HTTP de CSP no servidor de hospedagem para restringir a execução de scripts externos não autorizados e o carregamento de fontes/áudios de origens desconhecidas.
- **Validação e Sanitização de Entrada:** O campo de texto do usuário (`city-input`) possui validação estrita para evitar entradas vazias ou parâmetros malformados antes de serem codificados via `encodeURIComponent`.