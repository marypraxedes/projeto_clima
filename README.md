# 🌌 Star Wars Weather App — Painel Holográfico

Uma aplicação web interativa de previsão do tempo inspirada no universo de **Star Wars**, combinando dados meteorológicos em tempo real com uma interface futurista de **cockpit espacial e painel holográfico**.

O projeto foi desenvolvido com **HTML5, CSS3 e JavaScript Vanilla**, utilizando a **Open-Meteo API** para consultar dados meteorológicos e explorando recursos de animação, efeitos visuais, áudio e interação para criar uma experiência imersiva.

---

## 🚀 Funcionalidades e Experiência Imersiva

### 📺 Efeito CRT — Scanlines

Uma camada visual de **linhas de varredura horizontais** simula a aparência de monitores CRT, terminais antigos e equipamentos tecnológicos do universo Star Wars.

O efeito contribui para a sensação de estar utilizando um sistema de bordo ou painel de controle espacial.

### 💻 Painel de Telemetria e Diagnóstico

As informações meteorológicas são apresentadas através de cards personalizados inspirados em **painéis de telemetria**.

Os componentes possuem efeitos de brilho interno (*inset glow*) e elementos holográficos para destacar informações como:

* 🌡️ Temperatura;
* 💨 Velocidade do vento;
* 💧 Umidade relativa do ar;
* 🌧️ Dados de precipitação;
* 📊 Informações meteorológicas adicionais.

### 🎯 Targeting Computer — Cursor de Mira

O cursor padrão do navegador foi substituído por um **cursor em formato de mira (*crosshair*)**, inspirado em sistemas de precisão e computadores de navegação militar.

### ⚡ Glitch Hover Effects

Os elementos interativos possuem efeitos de **glitch e oscilação** durante o *hover*, simulando pequenas interferências e falhas de energia em um sistema holográfico.

O efeito é aplicado principalmente aos botões e componentes interativos.

---

## 🌓 Lado da Luz vs. Lado Sombrio

Um dos principais diferenciais da aplicação é a possibilidade de alternar entre dois ambientes completamente diferentes.

### ☀️ Lado da Luz

O modo inspirado no **Lado da Luz** apresenta:

* 🏜️ Fundo animado inspirado em Tatooine;
* ⚔️ Acionamento do sabre de luz Jedi;
* 🔊 Sons ambientes associados à atmosfera de nave e deserto;
* ✨ Interface com elementos visuais mais claros e luminosos.

### 🌑 Lado Sombrio

O modo inspirado no **Lado Sombrio** transforma completamente a atmosfera da aplicação:

* 🖤 Fundo animado inspirado em Darth Vader;
* 🔴 Bordas holográficas com estética Sith;
* 🤖 Aparição de um Chibi Darth Vader;
* 🎙️ Reprodução da fala icônica **"I have you now"**;
* 🎵 Trilha sonora de fundo para aumentar a imersão;
* ⚡ Interface com predominância de elementos vermelhos e escuros.

A alternância de tema não modifica apenas as cores da interface: **ela também altera elementos visuais, animações e recursos sonoros da experiência.**

---

## 📜 Intro Crawl — Abertura Cinemática

Antes de acessar o painel meteorológico, o usuário é apresentado a uma abertura inspirada no clássico *Star Wars Crawl*.

A introdução conta com:

* 🌌 Fundo espacial;
* ⭐ Animação de estrelas;
* 📜 Texto subindo em perspectiva 3D;
* 🎬 Transição cinematográfica para o painel principal;
* 🎵 **Marcha Imperial** como trilha sonora da abertura.

A proposta é transformar o carregamento inicial em uma pequena experiência cinematográfica antes de liberar o acesso ao sistema meteorológico.

---

## 🌡️ Previsão do Tempo

A aplicação utiliza a **Open-Meteo API** para consultar dados meteorológicos em tempo real.

O usuário pode pesquisar uma cidade e visualizar informações como:

* 🌡️ Temperatura atual;
* 💧 Umidade relativa do ar;
* 💨 Velocidade do vento;
* 🌧️ Precipitação;
* 🕐 Informações relacionadas ao horário local.

Além disso, a aplicação possui tratamento de erros para situações como cidades não encontradas, campos vazios e problemas nas requisições.

---

## 🧪 Testes Automatizados

O projeto também conta com uma suíte de **testes unitários utilizando Jest**.

Os testes utilizam **mocks de rede** para validar a lógica da aplicação sem depender de uma conexão real com a API durante a execução.

Entre os cenários testados estão:

* ✅ Requisições bem-sucedidas;
* ✅ Entradas vazias;
* ✅ Tratamento de erros;
* ✅ Respostas inesperadas;
* ✅ Limitações de requisições;
* ✅ Comportamento da lógica de consumo da API.

Para executar os testes:

```bash
npm install
npm test
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* **HTML5** — estrutura da aplicação;
* **CSS3** — responsividade, animações, efeitos visuais e variáveis de tema;
* **JavaScript Vanilla (ES6+)** — lógica, manipulação do DOM, controle de estado e interações.

### API

* **Open-Meteo API** — dados meteorológicos em tempo real;
* **Fetch API** — comunicação com a API;
* **Async/Await** — controle das requisições assíncronas.

### Testes

* **Jest** — testes unitários;
* **Mocks** — simulação das requisições externas.

### Recursos Visuais e Sonoros

* 🎵 Marcha Imperial;
* 🔊 Efeitos sonoros interativos;
* 🌌 Animações CSS;
* 📺 Efeito CRT/Scanlines;
* ⚡ Glitch effects;
* 🎯 Cursor Crosshair;
* 💻 Interface holográfica;
* 🌓 Sistema de temas baseado na estética Star Wars.

---

## 📂 Estrutura do Projeto

```text
projeto_clima/
│
├── audio/
│   ├── imperial_march.mp3
│   └── ...                    # Efeitos sonoros e gifs
│
├── css/
│   └── style.css              # Estilos, temas e animações
│
├── js/
│   └── api.js                 # API, DOM e lógica da aplicação
│
├── tests/
│   └── api.test.js            # Testes automatizados
│
├── .gitignore
├── index.html
├── package.json
├── SECURITY.md
├── NOTICE.md
├── LICENSE
└── README.md
```

---

## 💻 Como executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/marypraxedes/projeto_clima.git
```

### 2. Acesse a pasta

```bash
cd projeto_clima
```

### 3. Execute a aplicação

Abra o arquivo `index.html` diretamente no navegador ou utilize a extensão **Live Server** no Visual Studio Code.

---

## 🌐 Deploy

Após o merge da versão final para a branch `main`, a aplicação será publicada em ambiente de produção.

🔗 **Aplicação online:** `https://marypraxedes.github.io/projeto_clima/`

Fluxo de publicação:

```text
Desenvolvimento
      ↓
Pull Request
      ↓
Testes
      ↓
Code Review
      ↓
Merge → main
      ↓
Deploy
      ↓
Aplicação em produção 🚀
```

---

## 🔒 Privacidade e Segurança

* 📍 A aplicação não mantém permanentemente o histórico de localização ou pesquisas do usuário.
* 🔑 A Open-Meteo API utilizada não exige API Key para as requisições realizadas pelo projeto.
* 🛡️ As entradas do usuário são validadas antes do processamento.
* 🚫 Nenhuma credencial privada é armazenada no código-fonte.

Mais informações podem ser encontradas em [`SECURITY.md`](SECURITY.md).

---

## 📚 Conceitos Praticados

Durante o desenvolvimento foram aplicados conceitos de:

* Manipulação do DOM;
* JavaScript ES6+;
* Consumo de APIs REST;
* `fetch`;
* `async/await`;
* Tratamento de erros;
* Testes unitários;
* Mock de requisições;
* CSS avançado;
* Animações e transições;
* Variáveis CSS;
* Responsividade;
* Controle de temas;
* Manipulação de áudio;
* Git e GitHub;
* Organização de projeto frontend.

---

## 🎯 Objetivo

O projeto foi desenvolvido como atividade prática do **Bootcamp da Generation Brasil**, com o objetivo de aplicar conhecimentos de desenvolvimento web, integração com APIs e testes automatizados.

Além da funcionalidade de previsão do tempo, o projeto busca explorar como **HTML, CSS e JavaScript podem ser utilizados para criar uma experiência de usuário mais interativa e imersiva**.

---

## 👩‍💻 Desenvolvido por

**Maryane Praxedes**

Estudante de Engenharia de Software e desenvolvedora em formação.

🔗 [GitHub — @marypraxedes](https://github.com/marypraxedes)

---

⭐ Se você gostou do projeto, considere deixar uma estrela no repositório!

**Que a Força esteja com você.** ⚔️🌌
