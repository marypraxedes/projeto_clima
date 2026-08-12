# ⛅ Previsão do Tempo — Star Wars Edition ⚔️

> Uma aplicação web interativa de previsão do tempo inspirada no universo de **Star Wars**, desenvolvida com **HTML5, CSS3 e JavaScript Vanilla** como projeto prático do **Bootcamp da Generation Brasil**.

A aplicação consome a **Open-Meteo API** para consultar dados meteorológicos e combina informações climáticas em tempo real com uma experiência visual inspirada na galáxia muito, muito distante. 🌌

---

## ✨ Demonstração

🔎 Pesquise uma cidade e descubra as condições climáticas atuais enquanto explora uma interface temática de Star Wars.

O projeto conta com:

* 🌡️ Temperatura atual
* 💧 Umidade relativa do ar
* 💨 Velocidade do vento
* 🌧️ Probabilidade/índice de precipitação
* 🌎 Busca por cidades
* 🌞 Tema claro inspirado no **Lado da Luz**
* 🌑 Tema escuro inspirado no **Lado Sombrio**
* 🔊 Efeitos sonoros e animações
* 🚀 Abertura cinematográfica inspirada no clássico *Star Wars Crawl*

---

## 🚀 Funcionalidades

### 🌌 Abertura Cinemática

A aplicação possui uma tela de introdução inspirada na clássica abertura de **Star Wars**, criando uma experiência imersiva antes do acesso à previsão do tempo.

A abertura conta com:

* 🎵 **Marcha Imperial** como trilha sonora;
* ⭐ Animação inspirada no famoso *Star Wars Crawl*;
* 🌌 Fundo espacial com estrelas;
* 🎬 Efeito de perspectiva e movimento do texto;
* 🚀 Transição da abertura para a aplicação principal.

> **"A long time ago in a galaxy far, far away..."** 🌌

A trilha sonora utilizada na abertura é a **Marcha Imperial**, criando uma introdução diretamente inspirada na atmosfera do universo Star Wars.

### ⚔️ Temas da Força

O usuário pode alternar entre diferentes temas visuais.

A aplicação também utiliza o **horário local da cidade pesquisada** para determinar automaticamente o tema correspondente:

* ☀️ **Lado da Luz** — período diurno;
* 🌑 **Lado Sombrio** — período noturno.

Também é possível alterar o tema manualmente através do botão de alternância.

### 🔎 Busca de Cidades

Permite pesquisar cidades e consultar suas condições meteorológicas atuais.

A aplicação possui tratamento personalizado para situações como:

* Campo de busca vazio;
* Cidade não encontrada;
* Erros na comunicação com a API;
* Limitações de requisições.

### 🌡️ Informações Meteorológicas

Após uma pesquisa válida, são apresentados dados como:

| Informação       | Descrição                                 |
| ---------------- | ----------------------------------------- |
| 🌡️ Temperatura  | Temperatura atual em °C                   |
| 💧 Umidade       | Umidade relativa do ar                    |
| 💨 Vento         | Velocidade do vento                       |
| 🌧️ Precipitação | Índice de chuva                           |

### 🔊 Experiência Sonora

A aplicação possui efeitos sonoros integrados à interação do usuário:

* ⚔️ Sons relacionados a sabres de luz;
* 🐾 Efeito sonoro do Chewbacca durante buscas;
* 🎵 Trilha sonora na abertura.

---

## 🧪 Testes Automatizados

O projeto possui uma suíte de **testes unitários utilizando Jest**, incluindo mocks para as requisições externas.

Os testes foram desenvolvidos para validar diferentes cenários da aplicação, como:

* ✅ Requisições bem-sucedidas;
* ✅ Entradas vazias;
* ✅ Tratamento de erros;
* ✅ Respostas inesperadas da API;
* ✅ Limitações de requisições;
* ✅ Comportamentos da lógica de consumo da API.

Os testes podem ser executados localmente com:

```bash
npm install
npm test
```

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* **HTML5** — estrutura semântica da aplicação;
* **CSS3** — responsividade, animações, variáveis CSS e efeitos visuais;
* **JavaScript ES6+** — lógica da aplicação e manipulação do DOM.

### API

* **Open-Meteo API** — fornecimento dos dados meteorológicos;
* **Fetch API** — comunicação assíncrona com os serviços externos;
* **Async/Await** — gerenciamento das requisições assíncronas.

### Testes

* **Jest** — testes unitários;
* **Mocks** — simulação das requisições e respostas da API.

### Bibliotecas

* **Weather Icons** — representação visual das condições meteorológicas.

### Documentação

* **JSDoc** — documentação das funções JavaScript.

---

## 📂 Estrutura do Projeto

```text
projeto_clima/
│
├── audio/
│   └── imperial_march.mp3    # Trilha sonora da abertura
│
├── css/
│   └── style.css             # Estilos, temas e animações
│
├── js/
│   └── api.js                # Consumo da API e lógica da aplicação
│
├── tests/
│   └── api.test.js           # Testes automatizados com Jest
│
├── .gitignore                # Arquivos ignorados pelo Git
├── index.html                # Interface principal e abertura
├── package.json              # Dependências e scripts do projeto
├── SECURITY.md               # Política de segurança
├── NOTICE.md                 # Atribuições e créditos
├── LICENSE                   # Licença do projeto
└── README.md                 # Documentação
```

---

## 💻 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/marypraxedes/projeto_clima.git
```

### 2. Entre na pasta do projeto

```bash
cd projeto_clima
```

### 3. Execute a aplicação

Você pode abrir o arquivo `index.html` diretamente no navegador.

Para uma experiência melhor durante o desenvolvimento, recomenda-se utilizar a extensão **Live Server** no Visual Studio Code.

---

## 🧪 Executando os testes

Certifique-se de ter o **Node.js** instalado.

Instale as dependências:

```bash
npm install
```

Execute os testes:

```bash
npm test
```

O Jest exibirá no terminal o resultado da suíte de testes e dos cenários validados.

---

## 🌐 Deploy

Após a conclusão do desenvolvimento e o **merge da branch para a `main`**, o projeto será disponibilizado em ambiente de produção.

### 🚀 Acesso à aplicação

🔗 **Aplicação online:** [LINK_DO_DEPLOY](LINK_DO_DEPLOY)

> O link será atualizado após a realização do deploy da versão final do projeto na branch `main`.

O fluxo de publicação seguirá:

```text
Desenvolvimento
      ↓
Pull Request
      ↓
Code Review
      ↓
Merge → main
      ↓
Deploy
      ↓
Aplicação em produção 🚀
```

Dessa forma, a versão disponível no ambiente de produção estará alinhada com a versão validada e integrada na branch `main`.

---

## 🔒 Privacidade e Segurança

### 📍 Dados de localização

A aplicação não armazena permanentemente a localização ou o histórico de pesquisas dos usuários.

Os dados são utilizados apenas durante a execução da aplicação.

### 🔑 Chaves de API

O projeto utiliza a **Open-Meteo API**, que não exige uma chave privada para as requisições utilizadas pela aplicação.

Dessa forma, não há credenciais sensíveis expostas no código.

### 🛡️ Tratamento de entradas

As entradas fornecidas pelo usuário são validadas antes do processamento, reduzindo comportamentos inesperados durante a utilização da aplicação.

Para mais informações, consulte o arquivo [`SECURITY.md`](SECURITY.md).

---

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, foram praticados conceitos importantes de desenvolvimento web, incluindo:

* Manipulação do DOM;
* JavaScript moderno (ES6+);
* Consumo de APIs REST;
* Requisições assíncronas com `fetch`;
* `async/await`;
* Tratamento de erros;
* Testes unitários;
* Mock de requisições;
* Responsividade;
* Animações com CSS;
* Organização de projetos frontend;
* Documentação de código;
* Git e GitHub.

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como parte do **Bootcamp da Generation Brasil**, com o objetivo de colocar em prática conhecimentos de desenvolvimento web e integração com APIs.

Além da parte funcional, a proposta foi criar uma experiência diferenciada de usuário, combinando **tecnologia, criatividade e a temática de Star Wars**. 🌌

---

## 👩‍💻 Desenvolvido por

**Maryane Praxedes**

Estudante de Engenharia de Software e desenvolvedora em formação, com interesse em **Backend, Java, Spring Boot, Cloud e Cibersegurança**.

🐙 **GitHub:** [@marypraxedes](https://github.com/marypraxedes)

---

## ⭐ Gostou do projeto?

Se este projeto foi útil ou interessante para você, considere deixar uma ⭐ no repositório!

**Que a Força esteja com você.** ⚔️🌌
