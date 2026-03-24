# 📼✨ VibeTube: Retro Media Extractor

![VibeTube Banner](https://img.shields.io/badge/Status-Online-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Uma aplicação web Full-Stack construída para extração assíncrona de mídias (Vídeo e Áudio) de plataformas de streaming, envelopada em uma interface imersiva Retrowave/Synthwave.

Desenvolvido para agilizar o fluxo de trabalho de criadores de conteúdo e editores que necessitam de downloads de alta fidelidade, resolvendo problemas complexos de infraestrutura como bloqueios de IP e CORS.

## 🚀 Arquitetura e Soluções Técnicas

Durante o desenvolvimento deste projeto, desafios reais de engenharia de software foram solucionados:

* **Bypass de CORS e IP Lock:** Implementação de uma *Serverless API Route* no Next.js (`/api/baixar`). O front-end não se comunica diretamente com a API de extração; o servidor do Next.js age como um proxy seguro, mascarando a origem da requisição e evitando bloqueios de IP (Erro 403) pelo YouTube.
* **Polling Assíncrono (Loop de Checagem):** A conversão de mídia não é instantânea. Foi desenvolvido um sistema inteligente de *polling* que consulta o status do servidor em intervalos regulares até que o arquivo final (MP4/MP3) esteja pronto, evitando falhas por timeout.
* **Segurança de Credenciais:** As chaves da API de terceiros (RapidAPI) são injetadas exclusivamente via Variáveis de Ambiente (`.env`) no lado do servidor, garantindo zero vazamento de chaves públicas no front-end.
* **UX/UI e Animações:** Interface "Glassmorphism" construída com Tailwind CSS e animações complexas baseadas em estados gerenciadas pelo Framer Motion (efeitos de glitch, glow e gradientes responsivos).

## 🎨 Design & UI/UX (Retrowave Theme)

A interface foi projetada com uma estética Synthwave/Retrowave, utilizando a seguinte paleta de cores principal para invocar nostalgia e contraste com elementos em Neon:

* **Deep Space Violet (Fundo):** `#03001C`
* **Darkest Void (Inputs):** `#010008`
* **Fuchsia Neon (Destaques):** `#D946EF`
* **Cyan Electric (Textos e Glow):** `#22D3EE`
* **Purple Grid (Bordas e Sombras):** `#4C1D95`

## 🛠️ Tecnologias Utilizadas
* **Front-end:** React, Next.js (App Router), Tailwind CSS, Framer Motion, Lucide Icons.
* **Back-end:** Next.js Serverless Functions (`route.ts`).
* **Integração:** RapidAPI (YouTube MP3/MP4 Engine).

## 💻 Como rodar o projeto localmente

1. Clone o repositório:
`git clone https://github.com/SEU-USUARIO/vibetube.git`

2. Instale as dependências:
`npm install`

3. Crie um arquivo `.env.local` na raiz do projeto e adicione a sua chave do RapidAPI:
`RAPIDAPI_KEY=sua_chave_secreta_aqui`

4. Inicie o servidor de desenvolvimento:
`npm run dev`

5. Acesse `http://localhost:3000` no seu navegador.

---
**Desenvolvido por Ilgner Mendes** 🚀  
Founder & Developer // [Instagram](https://www.instagram.com/ilgner.mendes/)