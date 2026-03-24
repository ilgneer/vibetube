import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 👇 ESTA É A PARTE MÁGICA CONFIGURADA PARA O VIBETUBE 👇
export const metadata: Metadata = {
  // 1. O Título que aparece na aba do navegador
  title: "VibeTube - Retro Media Extractor",
  
  // 2. A descrição genérica para o Google
  description: "Extraia mídias (MP4/MP3) do YouTube instantaneamente com uma estética Retrowave. Bypass de CORS e IP lock profissional.",
  
  // 3. Configuração específica para o WhatsApp, Facebook, LinkedIn (Open Graph)
  openGraph: {
    title: "📼 VibeTube - Retro Media Extractor",
    description: "Baixe vídeos e áudios do YouTube sem anúncios, bloqueios ou static interference. Founder: @ilgner.mendes",
    url: "https://vibetube.vercel.app", // 🔥 TROQUE PELO SEU LINK FINAL DA VERCEL DEPOIS 🔥
    siteName: "VibeTube",
    locale: "pt_BR",
    type: "website",
    // O Next.js vai procurar automaticamente o arquivo opengraph-image.png na pasta app
  },

  // 4. Configuração específica para o Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "VibeTube - Retro Media Extractor",
    description: "Extraia mídias do YouTube com estética Retrowave.",
    // O Next.js vai procurar automaticamente o arquivo opengraph-image.png
  },
  
  // 5. O Favicon (Ícone da aba). O Next.js detecta o arquivo icon.png automaticamente,
  // mas garantimos aqui a compatibilidade com todos os dispositivos.
  icons: {
    icon: "/icon.png",
    apple: "/icon.png", // Para iPhones
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Scanlines sutis (efeito TV antiga) por cima de tudo - Opcional se já tiver no page.tsx */}
        <style>{`
          body::after {
            content: "";
            background-image: url(/scanlines.png);
            opacity: 0.03;
            inset: 0;
            position: fixed;
            pointer-events: none;
            z-index: 999;
          }
        `}</style>
      </head>
      <body className={`${inter.className} bg-[#03001C] antialiased`}>
        {children}
      </body>
    </html>
  );
}