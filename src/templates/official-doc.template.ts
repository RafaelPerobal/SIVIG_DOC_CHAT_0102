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
      
      --header-height: 130px; 
      --footer-height: 70px;  
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
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      position: relative;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
      /* Padding removido aqui pois será controlado pelas células da tabela para garantir alinhamento */
      padding: 0; 
    }

    /* ESTRUTURA DE REPETIÇÃO */
    table.report-container {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      table-layout: fixed;
    }
    
    tr, td { border: none; padding: 0; }

    /* ESTILOS DE CABEÇALHO (Repete em todas as páginas) */
    thead.report-header {
      display: table-header-group;
    }

    .header-cell {
      /* Altura fixa para reservar espaço */
      height: var(--header-height);
      vertical-align: top;
    }

    .header-content {
      width: 100%;
      height: 100%;
      padding: 15mm var(--content-margin) 0 var(--content-margin);
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 8px;
      background-color: white;
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


    /* ESTILOS DE RODAPÉ (Repete em todas as páginas) */
    tfoot.report-footer {
      display: table-footer-group;
    }

    .footer-cell {
      height: var(--footer-height);
      vertical-align: bottom;
    }

    .footer-content {
      width: 100%;
      padding: 0 var(--content-margin) 15mm var(--content-margin);
      border-top: 1px solid #e2e8f0;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7pt;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      background-color: white;
    }
    .footer-left-brand img { height: 30px; width: auto; }

    /* CONTADOR DE PÁGINAS ISOLADO (Position Fixed para funcionar o incremento) */
    .fixed-page-number {
      position: absolute;
      bottom: 15mm;
      right: var(--content-margin);
      font-size: 7pt;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      z-index: 2000;
    }
    
    .fixed-page-number::after {
      counter-increment: page;
      content: "PÁGINA " counter(page, decimal-leading-zero);
    }

    /* CONTEÚDO DO CORPO */
    .content-cell {
      padding: 0 var(--content-margin);
      vertical-align: top;
    }

    .document-body {
      font-size: 10.5pt;
      line-height: 1.5;
      text-align: justify;
      padding-top: 20px;
      padding-bottom: 20px;
      
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-word;
      hyphens: auto;
      width: 100%;
    }

    .document-body p {
      text-indent: 2.5cm;
      margin-bottom: 0.5em; 
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
      width: 100% !important;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 9.5pt;
      page-break-inside: auto;
      table-layout: fixed;
    }
    .data-table tr { page-break-inside: avoid; page-break-after: auto; }
    .data-table th {
      background-color: #e2e8f0;
      color: var(--accent);
      font-weight: 800;
      padding: 8px;
      border: 1px solid #cbd5e1;
      text-align: center;
      overflow-wrap: break-word;
    }
    .data-table td {
      padding: 8px;
      border: 1px solid #cbd5e1;
      vertical-align: middle;
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;
    }
    .data-table tbody tr:nth-child(even) { background-color: #f1f5f9; }

    .signatures-container {
      margin-top: 80px; 
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

    /* --- IMPRESSÃO --- */
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
      
      /* Garante repetição */
      thead.report-header { display: table-header-group !important; }
      tfoot.report-footer { display: table-footer-group !important; }
      
      /* Contador de páginas fixo para funcionar corretamente */
      .fixed-page-number {
        position: fixed;
        bottom: 15mm;
        right: 1.5cm; /* Margem direita de impressão */
        z-index: 3000;
      }

      /* Ajuste de margens do conteúdo */
      .content-cell {
         /* Na impressão, o navegador já define margens via @page, então ajustamos o padding interno */
         padding-left: 0;
         padding-right: 0;
      }
      
      /* Importante: Margens da página física */
      @page { 
        size: A4;
        /* Definimos margem 0 e controlamos o espaçamento via CSS da tabela para garantir headers full-width */
        margin: 0mm; 
      }
      
      /* Margem segura interna para o conteúdo não colar na borda do papel, exceto headers que podem ir até a borda */
      .document-body {
        padding-left: 3cm;  /* Margem Esquerda Oficial */
        padding-right: 1.5cm; /* Margem Direita Oficial */
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
    
    <!-- Contador de Páginas (Separado para funcionar o incremento em todas as páginas) -->
    <div class="fixed-page-number"></div>

    <!-- TABELA ESTRUTURAL PRINCIPAL -->
    <table class="report-container">
      
      <!-- CABEÇALHO (Repete automaticamente) -->
      <thead class="report-header">
        <tr>
          <td class="header-cell">
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
          </td>
        </tr>
      </thead>

      <!-- CORPO DO DOCUMENTO -->
      <tbody>
        <tr>
          <td class="content-cell">
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

      <!-- RODAPÉ (Repete automaticamente) -->
      <tfoot class="report-footer">
        <tr>
          <td class="footer-cell">
            <div class="footer-content">
              <div class="footer-left-brand">
                <img src="https://i.ibb.co/4nPDxkqx/Logo-adminstr.png" alt="Logo Administração">
              </div>
              <span style="font-size: 6.5pt;">{{TIMESTAMP}}</span>
              <!-- Espaço reservado para o contador fixo não sobrepor texto -->
              <span style="width: 80px;"></span>
            </div>
          </td>
        </tr>
      </tfoot>

    </table>

  </div>

</body>
</html>`;