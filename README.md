⛅ Previsão do Tempo - Star Wars Edition ⚔️

Este é um aplicativo web de previsão do tempo desenvolvido com HTML, CSS e JavaScript puros (Vanilla), criado como projeto prático para o Bootcamp da Generation Brasil. O app consome a Open-Meteo API para fornecer dados climáticos em tempo real de forma ágil e precisa.

O grande diferencial deste projeto é o seu tema dinâmico inspirado no universo de Star Wars. O aplicativo alterna automaticamente entre o Lado da Força (Modo Claro/Dia) e o Lado Sombrio (Modo Escuro/Noite) com base no clima atual do local pesquisado. O usuário também tem a liberdade de assumir o controle e alternar o tema manualmente a qualquer momento!

🚀 Funcionalidades

Busca Precisa: Encontre o clima atual pelo nome da cidade (ou planeta!).

Dados Detalhados: Exibição da temperatura em °C, descrição amigável do clima, data atual e localização (Cidade e Estado).

Feedback Visual Dinâmico: Ícones meteorológicos responsivos fornecidos pela biblioteca Weather Icons.

Tema Inteligente: Transição automática entre Modo Claro (Dia) e Modo Escuro (Noite) baseada no atributo is_day retornado pela API.

Controle do Usuário: Botão para o usuário assumir o controle e fixar o Lado da Força ou Lado Sombrio.

Tratamento de Exceções: Mensagens de erro amigáveis para cidades inválidas, limite de requisições excedido e falhas de conexão/rede.

🛠️ Tecnologias Utilizadas

Frontend: HTML5 semântico, CSS3 (com variáveis de ambiente para temas) e JavaScript (ES6+).

Consumo de API: Fetch API nativa com tratamento de requisições assíncronas (async/await).

Testes Automatizados: Jest para testes unitários simulando (mocking) requisições e respostas HTTP.

Boas Práticas: Código documentado no padrão JSDoc e princípios de Clean Code.

📂 Estrutura do Projeto

projeto_clima/
│
├── css/
│   └── style.css          # Estilos e variáveis de tema (Jedi/Sith)
├── js/
│   └── api.js             # Lógica de consumo de API e manipulação da DOM
├── tests/
│   └── api.test.js        # Bateria de testes unitários com Jest
├── .gitignore             # Arquivos ignorados pelo Git
├── index.html             # Estrutura principal da interface
├── package.json           # Configurações do Node.js e scripts do Jest
└── README.md              # Documentação do projeto
📦 Como rodar o projeto localmente
Para ver a interface funcionando no seu navegador, você não precisa instalar nada complexo:

Clone este repositório no seu terminal:

git clone https://github.com/marypraxedes/projeto_clima.git

Navegue até a pasta do projeto:

cd projeto_clima

Abra o arquivo index.html diretamente no seu navegador de preferência, ou utilize a extensão Live Server no Visual Studio Code.

🧪 Como rodar os testes automatizados

Este projeto conta com uma robusta suíte de testes unitários configurada para testar a lógica da API sem a necessidade de uma rede ativa (usando Mocks). Para executá-los:

Certifique-se de ter o Node.js instalado na sua máquina.

Instale as dependências de desenvolvimento do projeto:

npm install

Rode a bateria de testes:

npm test

Você deverá ver no terminal um relatório do Jest mostrando que todos os cenários (casos de sucesso, entradas vazias, limite de requisições, etc.) passaram com sucesso. ✅

📝 APIs Utilizadas
Open-Meteo Geocoding API: Serviço responsável por transformar o nome da cidade digitada em coordenadas geográficas exatas (Latitude e Longitude).

Open-Meteo Forecast API: Serviço que recebe as coordenadas geográficas e retorna os dados meteorológicos precisos e atuais do local.

Desenvolvido com muita dedicação e Força para o Bootcamp da Generation Brasil. 🌌🚀