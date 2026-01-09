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
      --page-width: 210mm;
      
      /* Ajuste de dimensões conforme solicitado */
      --header-height: 130px; /* Reduzido de 140px */
      --footer-height: 70px;  /* Reduzido de 80px */
      --content-margin: 20mm;
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
      
      /* Inicializa contador de páginas */
      counter-reset: page;
      
      -webkit-font-smoothing: antialiased;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* CONTAINER VISUAL (Tela) */
    .a4-page {
      width: var(--page-width);
      min-height: 297mm;
      background-color: var(--paper);
      padding: 0 var(--content-margin);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      position: relative;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
    }

    /* ESTRUTURA DE REPETIÇÃO PARA IMPRESSÃO */
    table.report-container {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }
    
    tr, td {
      border: none;
      padding: 0;
    }

    /* Espaçadores (Reservam o lugar físico no fluxo do documento) */
    .header-space { 
      height: var(--header-height); 
      display: block;
    }
    
    .footer-space { 
      height: var(--footer-height); 
      display: block;
    }

    /* ELEMENTOS FIXOS (Ficam 'flutuando' sobre os espaçadores em cada página) */
    .page-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--header-height);
      padding: 15mm var(--content-margin) 0 var(--content-margin);
      background: white;
      z-index: 1000;
      overflow: hidden;
    }

    .page-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: var(--footer-height);
      padding: 0 var(--content-margin) 15mm var(--content-margin);
      background: white;
      z-index: 1000;
      overflow: hidden;
    }

    /* Layout Interno do Header */
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
    .header-left .titles h1 { 
      font-size: 13pt; 
      font-weight: 900; 
      text-transform: uppercase; 
      line-height: 1.1;
    }
    .header-left .titles h2 { 
      font-size: 9pt; 
      font-weight: 500; 
      color: #334155; 
      white-space: pre-line;
    }

    .header-right { text-align: right; margin-bottom: 2px; }
    .header-right p { font-size: 8pt; font-weight: 700; color: #64748b; text-transform: uppercase; line-height: 1.4; }

    /* Layout Interno do Footer */
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

    /* Contador de Páginas CSS - Formato PÁGINA 01 */
    .page-count::after {
      counter-increment: page;
      content: "PÁGINA " counter(page, decimal-leading-zero);
    }

    /* Estilos de Conteúdo */
    .document-body {
      font-size: 10.5pt;
      line-height: 1.5;
      text-align: justify;
      padding-top: 10px;
      padding-bottom: 10px;
      word-wrap: break-word; /* FIX: Evita estouro de texto na margem direita. */
    }

    .document-body p {
      text-indent: 2.5cm; /* Ajustado conforme Manual de Redação (item 5.1.6) */
      margin-bottom: 0.5em; /* Espaçamento entre parágrafos */
    }
    
    .recipient-block { margin-bottom: 20px; font-size: 11pt; }
    .recipient-line { margin-bottom: 4px; }

    .caixa-assunto {
      background-color: #f1f5f9;
      border-left: 5px solid var(--accent);
      padding: 12px;
      margin-bottom: 20px;
      font-weight: 700;
      page-break-inside: avoid;
    }

    .secao-titulo {
      font-weight: 800;
      text-transform: uppercase;
      margin-top: 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 11pt;
      page-break-after: avoid;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 9.5pt;
      page-break-inside: auto;
      table-layout: fixed; /* FIX: Força a tabela a respeitar a largura do container. */
    }
    .data-table tr { page-break-inside: avoid; page-break-after: auto; }
    .data-table th {
      background-color: #e2e8f0;
      color: var(--accent);
      font-weight: 800;
      padding: 8px;
      border: 1px solid #cbd5e1;
      text-align: center;
    }
    .data-table td {
      padding: 8px;
      border: 1px solid #cbd5e1;
      vertical-align: middle;
      word-wrap: break-word; /* FIX: Quebra palavras longas dentro das células. */
    }
    .data-table tbody tr:nth-child(even) {
      background-color: #f1f5f9; /* Adiciona fundo em linhas alternadas (zebrado) */
    }

    .signatures-container {
      margin-top: 80px; /* Aumentado de 50px */
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
      page-break-inside: avoid;
    }
    
    .signature-box { text-align: center; min-width: 200px; }
    .sig-line { width: 100%; max-width: 250px; border-top: 1px solid #000; margin: 0 auto 5px auto; }
    .sig-name { font-weight: 800; text-transform: uppercase; font-size: 10pt; }
    .sig-sub { font-size: 8.5pt; color: #475569; }

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

    /* --- REGRAS CRÍTICAS PARA IMPRESSÃO EM MÚLTIPLAS PÁGINAS --- */
    @media print {
      body { 
        background-color: white; 
        padding: 0; 
        display: block;
        margin: 0;
      }
      
      .a4-page { 
        width: 100%; 
        box-shadow: none; 
        margin: 0; 
        padding: 0;
        background: none;
        min-height: auto;
        display: block;
      }
      
      .btn-print { display: none; }
      
      /* Força o navegador a repetir o thead e tfoot em cada página */
      thead.report-header { display: table-header-group !important; }
      tfoot.report-footer { display: table-footer-group !important; }
      
      /* Elementos fixos posicionados relative à janela de impressão */
      .page-header { 
        position: fixed; 
        top: 0; 
        left: 0;
        width: 100%;
        height: var(--header-height);
        background-color: white; 
        /* Padding específico para margens de impressão (3cm esq, 1.5cm dir) */
        padding: 10mm 1.5cm 0 3cm;
        z-index: 1000;
      }
      
      .page-footer { 
        position: fixed; 
        bottom: 0; 
        left: 0;
        width: 100%;
        height: var(--footer-height);
        background-color: white;
        /* Padding específico para margens de impressão (3cm esq, 1.5cm dir) */
        padding: 0 1.5cm 10mm 3cm;
        z-index: 1000;
      }

      /* Margens do conteúdo para alinhar com header/footer */
      .document-body {
        padding-left: 3cm;
        padding-right: 1.5cm;
      }
      
      /* Reset page margins so our CSS controls it */
      @page { 
        size: A4;
        margin: 0mm; 
      }
    }
  </style>
</head>
<body>

  <button class="btn-print" onclick="window.print()">
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2-2v5a2 2 0 0 1-2 2h-2m-2 4H8v-4h8v4z"></path></svg>
    IMPRIMIR
  </button>

  <div class="a4-page">
    
    <!-- HEADER FIXO -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <img src="https://i.postimg.cc/529vS7wJ/brasao-municipio.png" alt="Brasão">
          <div class="titles">
            <h1>Prefeitura Municipal de Perobal</h1>
            <h2>Secretaria Municipal de Saúde<br>Diretoria Vigilância em Saúde</h2>
          </div>
        </div>
        <div class="header-right">
          <p>{{REF_ID}}</p>
          <p>{{DOC_DATE}}</p>
        </div>
      </div>
    </div>

    <!-- FOOTER FIXO -->
    <div class="page-footer">
      <div class="footer-content">
        <div class="footer-left-brand">
          <img src="https://i.ibb.co/4nPDxkqx/Logo-adminstr.png" alt="Logo Administração">
        </div>
        <span style="font-size: 6.5pt;">{{TIMESTAMP}}</span>
        <span class="page-count"></span>
      </div>
    </div>

    <!-- TABELA ESTRUTURAL PARA FLUXO DE CONTEÚDO -->
    <table class="report-container">
      <thead class="report-header">
        <tr>
          <td>
            <!-- Espaço reservado para o header fixo -->
            <div class="header-space">&nbsp;</div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="document-body">
              {{RECIPIENT_BLOCK}}
              
              [INSERIR CONTEÚDO AQUI]
              
              <div class="signatures-container">
                {{SIGNATURES_BLOCK}}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot class="report-footer">
        <tr>
          <td>
            <!-- Espaço reservado para o footer fixo -->
            <div class="footer-space">&nbsp;</div>
          </td>
        </tr>
      </tfoot>
    </table>

  </div>

</body>
</html>`;