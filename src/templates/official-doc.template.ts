export const OFFICIAL_DOC_TEMPLATE = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documento Oficial</title>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    :root {
      --primary: #000000;
      --accent: #0f172a; 
      --page-bg: #cbd5e1;
      --paper: #ffffff;
      
      /* Dimensões A4 Exatas para Web */
      --a4-width: 210mm;
      --a4-height: 297mm; /* Aproximadamente 1123px em 96dpi */
      
      /* Áreas Reservadas */
      --header-height: 140px; 
      --footer-height: 80px;
      --margin-side: 20mm;
      
      /* Altura segura para conteúdo = A4 - Header - Footer - Padding de segurança */
      --content-height-limit: 900px; 
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--page-bg);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 0;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }

    /* --- ESTILOS DA PÁGINA FÍSICA --- */
    .a4-page {
      width: var(--a4-width);
      height: var(--a4-height);
      background-color: var(--paper);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      position: relative;
      margin-bottom: 30px;
      overflow: hidden; /* Garante que nada estoure visualmente */
      display: block;
      page-break-after: always; /* Força nova folha na impressão */
    }

    /* Elementos Absolutos na Página */
    .page-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--header-height);
      padding: 15mm var(--margin-side) 0 var(--margin-side);
      background: white;
      z-index: 10;
    }

    .page-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: var(--footer-height);
      padding: 0 var(--margin-side) 15mm var(--margin-side);
      background: white;
      z-index: 10;
    }

    .page-content-area {
      position: absolute;
      top: var(--header-height);
      left: 0;
      width: 100%;
      /* Altura dinâmica preenchida pelo script, mas com limite visual */
      padding: 10px var(--margin-side);
    }

    /* --- LAYOUT DO HEADER/FOOTER --- */
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 8px;
      height: 100%;
    }
    .header-left { display: flex; align-items: center; gap: 15px; }
    .header-left img { height: 60px; width: auto; }
    .header-left .titles h1 { font-size: 13pt; font-weight: 900; text-transform: uppercase; line-height: 1.1; }
    .header-left .titles h2 { font-size: 9pt; font-weight: 500; color: #334155; white-space: pre-line; }
    .header-right { text-align: right; margin-bottom: 2px; }
    .header-right p { font-size: 8pt; font-weight: 700; color: #64748b; text-transform: uppercase; line-height: 1.4; }

    .footer-content {
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7pt;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      height: 100%;
    }
    .footer-left-brand img { height: 30px; width: auto; }

    /* --- ESTILOS DE CONTEÚDO (TIPOGRAFIA) --- */
    p {
      text-indent: 2.5cm;
      margin-bottom: 0.8em;
      font-size: 10.5pt;
      line-height: 1.5;
      text-align: justify;
      word-wrap: break-word;
    }

    .recipient-block { margin-bottom: 20px; font-size: 11pt; }
    .recipient-line { margin-bottom: 4px; text-indent: 0 !important; }

    .caixa-assunto {
      background-color: #f1f5f9;
      border-left: 5px solid var(--accent);
      padding: 12px;
      margin-bottom: 20px;
      font-weight: 700;
      font-size: 10.5pt;
      text-indent: 0;
    }

    .secao-titulo {
      font-weight: 800;
      text-transform: uppercase;
      margin-top: 25px;
      margin-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 11pt;
      text-indent: 0;
    }

    /* Tabelas */
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 9.5pt;
      table-layout: fixed;
    }
    .data-table th, .data-table td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    .data-table th { background-color: #e2e8f0; color: var(--accent); font-weight: 800; text-align: center; }
    .data-table tbody tr:nth-child(even) { background-color: #f1f5f9; }

    /* Assinaturas */
    .signatures-container {
      margin-top: 60px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
      padding-bottom: 20px;
    }
    .signature-box { text-align: center; min-width: 200px; }
    .sig-line { width: 100%; max-width: 250px; border-top: 1px solid #000; margin: 0 auto 5px auto; }
    .sig-name { font-weight: 800; text-transform: uppercase; font-size: 10pt; text-indent: 0; }
    .sig-sub { font-size: 8.5pt; color: #475569; text-indent: 0; }

    /* Botão Imprimir */
    .btn-print {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background-color: var(--accent);
      color: white;
      border: none;
      padding: 15px 25px;
      border-radius: 12px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 10px 15px rgba(15, 23, 42, 0.4);
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 2000;
      text-transform: uppercase;
    }

    /* --- IMPRESSÃO --- */
    @media print {
      body { 
        background-color: white; 
        padding: 0; 
        display: block; 
      }
      .a4-page { 
        box-shadow: none; 
        margin: 0; 
        page-break-after: always;
        width: 100%;
        height: 100%; /* Deixa o navegador controlar, mas o conteúdo já foi fatiado pelo JS */
      }
      .btn-print { display: none; }
      
      /* FIX CRÍTICO: Esconde o container fonte na impressão para evitar duplicação */
      #source-content {
        display: none !important;
        visibility: hidden !important;
        position: absolute !important;
        left: -99999px !important;
      }

      @page { size: A4; margin: 0; }
    }
  </style>
</head>
<body>

  <button class="btn-print" onclick="window.print()">IMPRIMIR DOCUMENTO</button>

  <!-- ÁREA DE RENDEREIZAÇÃO (Vazia no início, preenchida pelo JS) -->
  <div id="print-root"></div>

  <!-- CONTEÚDO FONTE (Invisível, usado como 'banco de dados' para o script) -->
  <div id="source-content" style="position: absolute; left: -9999px; width: 170mm; visibility: hidden;">
     {{RECIPIENT_BLOCK}}
     [INSERIR CONTEÚDO AQUI]
     {{SIGNATURES_BLOCK}}
  </div>

  <!-- TEMPLATES JS (Strings para injeção) -->
  <script>
    const CONFIG = {
       // Altura máxima segura para o conteúdo (A4 px - Header - Footer - Margens)
       // Ajuste fino: 1123px (Total) - 140px (Header) - 80px (Footer) - 40px (Paddings) = ~863px
       MAX_CONTENT_HEIGHT: 860, 
       REF_ID: '{{REF_ID}}',
       DOC_DATE: '{{DOC_DATE}}',
       TIMESTAMP: '{{TIMESTAMP}}'
    };

    function getHeaderHTML() {
      return \`
        <div class="header-content">
          <div class="header-left">
            <img src="https://i.postimg.cc/529vS7wJ/brasao-municipio.png" alt="Brasão">
            <div class="titles">
              <h1>Prefeitura Municipal de Perobal</h1>
              <h2>Secretaria Municipal de Saúde<br>Diretoria Vigilância em Saúde</h2>
            </div>
          </div>
          <div class="header-right">
            <p>\${CONFIG.REF_ID}</p>
            <p>\${CONFIG.DOC_DATE}</p>
          </div>
        </div>\`;
    }

    function getFooterHTML(pageStr) {
      return \`
        <div class="footer-content">
          <div class="footer-left-brand">
            <img src="https://i.ibb.co/4nPDxkqx/Logo-adminstr.png" alt="Logo Administração">
          </div>
          <span style="font-size: 6.5pt;">\${CONFIG.TIMESTAMP}</span>
          <span class="page-count">\${pageStr}</span>
        </div>\`;
    }

    // --- MOTOR DE PAGINAÇÃO ---
    window.onload = function() {
      const source = document.getElementById('source-content');
      const printRoot = document.getElementById('print-root');
      
      // Coletamos todos os elementos de 'primeiro nível' gerados
      // Ex: <p>, <table>, <div class="recipient-block">
      const contentNodes = Array.from(source.children);

      let pages = [];
      let currentPage = createNewPage();
      let currentContentDiv = currentPage.querySelector('.page-content-area');
      
      pages.push(currentPage);
      printRoot.appendChild(currentPage);

      contentNodes.forEach(node => {
        // Clona o nó para testar
        let clone = node.cloneNode(true);
        currentContentDiv.appendChild(clone);

        // Verifica altura
        // scrollHeight nos dá a altura real ocupada pelo conteúdo
        if (currentContentDiv.scrollHeight > CONFIG.MAX_CONTENT_HEIGHT) {
           // Estourou! Remove o nó desta página
           currentContentDiv.removeChild(clone);

           // Cria nova página
           currentPage = createNewPage();
           currentContentDiv = currentPage.querySelector('.page-content-area');
           
           // Adiciona o nó na nova página
           currentContentDiv.appendChild(clone);
           
           pages.push(currentPage);
           printRoot.appendChild(currentPage);
        }
      });

      // Pós-processamento: Atualizar rodapés com "Página X de Y"
      const totalPages = pages.length;
      pages.forEach((page, index) => {
         const pageNum = index + 1;
         const str = 'PÁGINA ' + String(pageNum).padStart(2, '0') + ' DE ' + String(totalPages).padStart(2, '0');
         
         const footerInner = page.querySelector('.page-footer');
         footerInner.innerHTML = getFooterHTML(str);
      });
    };

    function createNewPage() {
      const page = document.createElement('div');
      page.className = 'a4-page';
      
      // Header
      const header = document.createElement('div');
      header.className = 'page-header';
      header.innerHTML = getHeaderHTML();
      page.appendChild(header);

      // Content Container
      const content = document.createElement('div');
      content.className = 'page-content-area';
      page.appendChild(content);

      // Footer (Placeholder)
      const footer = document.createElement('div');
      footer.className = 'page-footer';
      // Será preenchido no final
      page.appendChild(footer);

      return page;
    }
  </script>

</body>
</html>`;