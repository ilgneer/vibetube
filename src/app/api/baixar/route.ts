import { NextResponse } from "next/server";

// Função mágica para fazer o código "esperar" em milissegundos
const esperar = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function POST(request: Request) {
  try {
    const corpo = await request.json();
    const urlCompleta = corpo.url;

    // Extrai o ID do vídeo
    const match = urlCompleta.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*[?&]v=))([^"&?\/\s]{11})/);
    const videoId = match ? match[1] : null;

    if (!videoId) {
      return NextResponse.json({ status: "error", text: "Link do YouTube inválido." }, { status: 400 });
    }

    const urlRapidApi = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;

    let dados;
    let tentativas = 0;
    const maxTentativas = 20; // Vamos perguntar até 20 vezes (dá uns 30 segundos)

    // O Loop de Checagem
    while (tentativas < maxTentativas) {
      const resposta = await fetch(urlRapidApi, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY || "" // Puxando do arquivo invisível
        }
      });

      dados = await resposta.json();
      console.log(`🕵️ Tentativa ${tentativas + 1}: Status da API = ${dados.status}`);

      // Se a API disse "ok" e o link de download apareceu, paramos de perguntar!
      if (dados.status === "ok" && dados.link) {
        break;
      }

      // Se a API der um erro definitivo
      if (dados.status === "fail") {
        return NextResponse.json({ status: "error", text: "A API bloqueou este vídeo específico." }, { status: 500 });
      }

      // Espera 1.5 segundos antes de perguntar novamente
      await esperar(1500);
      tentativas++;
    }

    // Quando o loop terminar, verificamos se o link realmente chegou
    if (dados && dados.link) {
      return NextResponse.json({ status: "success", url: dados.link });
    } else {
      return NextResponse.json({ status: "error", text: "Demorou demais para processar. Tente novamente." }, { status: 500 });
    }

  } catch (erro) {
    console.error(erro);
    return NextResponse.json({ status: "error", text: "Erro na comunicação com o servidor." }, { status: 500 });
  }
}