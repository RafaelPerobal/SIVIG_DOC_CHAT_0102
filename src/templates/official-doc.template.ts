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
      --a4-height: 297mm;
      
      /* Áreas Reservadas */
      --header-height: 140px; 
      --footer-height: 80px;
      --margin-side: 20mm;
      
      /* Altura segura para conteúdo */
      --content-height-limit: 880px; 
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
      overflow: hidden; 
      display: block;
      page-break-after: always;
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
      z-index: 20;
    }

    .page-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: var(--footer-height);
      padding: 0 var(--margin-side) 15mm var(--margin-side);
      background: white;
      z-index: 20;
    }

    /* MUDANÇA: Usar padding-top/bottom em vez de top/bottom absoluto para o container de conteúdo
       Isso ajuda navegadores a renderizarem o texto corretamente */
    .page-content-area {
      position: relative;
      width: 100%;
      height: 100%;
      padding-top: var(--header-height);
      padding-bottom: var(--footer-height);
      padding-left: var(--margin-side);
      padding-right: var(--margin-side);
      z-index: 10;
    }

    /* Container interno para cálculo de altura do JS */
    .content-flow-wrapper {
        width: 100%;
        display: block;
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
      color: #000;
    }

    .recipient-block { margin-bottom: 20px; font-size: 11pt; color: #000; }
    .recipient-line { margin-bottom: 4px; text-indent: 0 !important; }

    .caixa-assunto {
      background-color: #f1f5f9;
      border-left: 5px solid var(--accent);
      padding: 12px;
      margin-bottom: 20px;
      font-weight: 700;
      font-size: 10.5pt;
      text-indent: 0;
      color: #000;
    }

    .secao-titulo {
      font-weight: 800;
      text-transform: uppercase;
      margin-top: 25px;
      margin-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 11pt;
      text-indent: 0;
      color: #000;
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
      color: #000;
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
    .signature-box { text-align: center; min-width: 200px; color: #000; }
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

    /* --- IMPRESSÃO ROBUSTA --- */
    @media print {
      body, html { 
        background-color: white !important; 
        padding: 0 !important; 
        margin: 0 !important;
        display: block !important; /* CRÍTICO: Remove flex layout na impressão */
        width: 100% !important;
        height: 100% !important;
        overflow: visible !important;
      }

      .a4-page { 
        box-shadow: none !important; 
        margin: 0 !important; 
        padding: 0 !important;
        page-break-after: always !important;
        page-break-inside: avoid !important;
        width: 210mm !important;
        height: 297mm !important; /* Altura fixa A4 */
        position: relative !important;
        display: block !important;
        overflow: hidden !important; /* Mantém header/footer fixos visualmente */
      }

      /* Garante visibilidade do conteúdo */
      .page-content-area, 
      .content-flow-wrapper,
      .page-header, 
      .page-footer,
      p, div, span, table {
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      .btn-print { display: none !important; }
      
      /* FIX CRÍTICO: Esconde o container fonte na impressão */
      #source-content {
        display: none !important;
      }
      
      /* Garante cores sólidas para texto */
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
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
  <!-- Importante: visibility: hidden aqui, mas o JS vai clonar os filhos. -->
  <div id="source-content" style="position: absolute; left: -9999px; width: 170mm; visibility: hidden;">
     {{RECIPIENT_BLOCK}}
     [INSERIR CONTEÚDO AQUI]
     {{SIGNATURES_BLOCK}}
  </div>

  <!-- TEMPLATES JS -->
  <script>
    const CONFIG = {
       // Altura máxima segura para o conteúdo (A4 px - Header - Footer - Margens)
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

    function createNewPage() {
      const page = document.createElement('div');
      page.className = 'a4-page';
      
      // Header
      const header = document.createElement('div');
      header.className = 'page-header';
      header.innerHTML = getHeaderHTML();
      page.appendChild(header);

      // Content Container (Com wrapper para fluxo)
      const contentArea = document.createElement('div');
      contentArea.className = 'page-content-area';
      
      const wrapper = document.createElement('div');
      wrapper.className = 'content-flow-wrapper';
      contentArea.appendChild(wrapper);
      
      page.appendChild(contentArea);

      // Footer
      const footer = document.createElement('div');
      footer.className = 'page-footer';
      page.appendChild(footer);

      return page;
    }

    // --- MOTOR DE PAGINAÇÃO ---
    function runPagination() {
      const source = document.getElementById('source-content');
      if (!source) return;

      const printRoot = document.getElementById('print-root');
      // Limpa caso já tenha rodado
      printRoot.innerHTML = ''; 

      const contentNodes = Array.from(source.children);

      let pages = [];
      let currentPage = createNewPage();
      let currentWrapper = currentPage.querySelector('.content-flow-wrapper');
      
      pages.push(currentPage);
      printRoot.appendChild(currentPage);

      contentNodes.forEach(node => {
        let clone = node.cloneNode(true);
        // Garante visibilidade no clone caso tenha herdado hidden
        if (clone.style) {
            clone.style.visibility = 'visible';
            clone.style.display = 'block';
        }
        
        currentWrapper.appendChild(clone);

        // Verifica altura do wrapper em relação ao limite
        // Usamos offsetHeight para precisão
        if (currentWrapper.offsetHeight > CONFIG.MAX_CONTENT_HEIGHT) {
           currentWrapper.removeChild(clone);

           currentPage = createNewPage();
           currentWrapper = currentPage.querySelector('.content-flow-wrapper');
           
           currentWrapper.appendChild(clone);
           pages.push(currentPage);
           printRoot.appendChild(currentPage);
        }
      });

      // Rodapés
      const totalPages = pages.length;
      pages.forEach((page, index) => {
         const pageNum = index + 1;
         const str = 'PÁGINA ' + String(pageNum).padStart(2, '0') + ' DE ' + String(totalPages).padStart(2, '0');
         const footerInner = page.querySelector('.page-footer');
         footerInner.innerHTML = getFooterHTML(str);
      });
    }

    // Executa quando o DOM estiver pronto e imagens carregadas para cálculo correto
    window.addEventListener('load', runPagination);
    
    // Fallback: Se o load já passou (ex: iframe rápido), tenta rodar imediatamente
    if (document.readyState === 'complete') {
        runPagination();
    }
  </script>

</body>
</html>`;