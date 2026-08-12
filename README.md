# ⛅ Previsão do Tempo - Star Wars Edition ⚔️

Este é um aplicativo web interativo de previsão do tempo desenvolvido com HTML5, CSS3 e JavaScript puro (Vanilla), construído como projeto prático para o Bootcamp da Generation Brasil. O app consome a **Open-Meteo API** para fornecer dados meteorológicos em tempo real e apresenta uma imersão completa no universo de **Star Wars**.

---

## 🚀 Funcionalidades e Diferenciais

- **Abertura Cinemática (Star Wars Crawl):** Tela de introdução com a clássica trilha sonora da Marcha Imperial e o letreiro subindo pelo espaço.
- **Efeitos Sonoros Interativos:** Sons dinâmicos de sabres de luz (Jedi e Sith) ao alternar temas e o grunhido clássico do Chewbacca ao realizar buscas.
- **Busca Galáctica Avançada:** Pesquisa por qualquer planeta ou cidade da Terra, com tratamento de erros customizado para setores desconhecidos.
- **Métricas Meteorológicas Completas (Opção 4):** Exibição de temperatura atual (°C), umidade relativa do ar, velocidade do vento e índice de precipitação (chuva).
- **Tema Dinâmico e Manual:** Alternância automática baseada no horário da cidade consultada (Lado da Força / Dia vs. Lado Sombrio / Noite) ou controle manual via botão com efeitos de neon.
- **Testes Automatizados:** Suíte completa de testes unitários desenvolvida com **Jest** e Mocks de rede.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5 semântico, CSS3 (com variáveis de tema e efeitos de vidro fosco/holográfico) e JavaScript (ES6+).
- **Requisições HTTP:** `Fetch API` assíncrona (`async/await`).
- **Testes:** [Jest](https://jestjs.io/) (Testes Unitários).
- **Bibliotecas Externas:** [Weather Icons](https://erikflowers.github.io/weather-icons/) para representação visual do clima.
- **Documentação:** Padrão **JSDoc**.

---

## 📂 Estrutura do Projeto

```text
projeto_clima/
│
├── audio/
│   └── imperial_march.mp3  # Trilha sonora de abertura
├── css/
│   └── style.css           # Estilos, variáveis galácticas e animações 3D
├── js/
│   └── api.js              # Lógica de consumo de API e manipulação da DOM
├── tests/
│   └── api.test.js         # Testes automatizados com Jest
├── .gitignore              # Arquivos ignorados pelo Git
├── index.html              # Interface principal e tela de abertura
├── package.json            # Dependências e scripts do Node.js
├── SECURITY.md             # Política de segurança da aplicação
├── NOTICE.md               # Atribuições e créditos de terceiros
├── LICENSE                 # Licença de uso e conformidade (Bilingue)
└── README.md               # Documentação oficial do projeto

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

🔒 Privacidade e Segurança (Auditoria)
Dados de Localização: A aplicação não armazena permanentemente nenhum dado de localização ou histórico de busca dos usuários (utiliza apenas processamento em memória volátil durante a sessão).

Sem Chaves de API Expostas: O serviço utilizado (Open-Meteo) é de acesso público aberto e não requer tokens de autenticação ou chaves privadas (API Keys), eliminando riscos de vazamento de credenciais.

Tratamento de Exceções: Validação rigorosa de entradas para mitigar comportamentos inesperados do usuário.

Desenvolvido com dedicação para o Bootcamp da Generation Brasil. 🌌🚀