import { Component, signal, computed, inject, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GeminiService } from './services/gemini.service';
import { OFFICIAL_DOC_TEMPLATE } from './templates/official-doc.template';

interface Sender {
  id: number;
  name: string;
  role: string;
}

type ViewMode = 'generator' | 'manual' | 'fiscal-system';
type FiscalTab = 'vistoria' | 'infracao' | 'ingresso';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  private geminiService = inject(GeminiService);
  private sanitizer = inject(DomSanitizer);

  // View State
  viewMode = signal<ViewMode>('generator');
  fiscalTab = signal<FiscalTab>('vistoria');

  // --- GENERATOR STATE ---
  refId = signal<string>('Ref: C.I. 001/2026 – DVS');
  docDate = signal<string>(new Date().toLocaleDateString('pt-BR'));
  recipientName = signal<string>('');
  recipientRole = signal<string>('');
  senders = signal<Sender[]>([
    { id: 1, name: 'Rafael Amaro Silvério', role: 'Diretor de Vigilância em Saúde - Perobal/PR' }
  ]);
  subject = signal<string>('');
  textContent = signal<string>('');
  isGenerating = signal<boolean>(false);
  generatedHtml = signal<string | null>(null);
  showTips = signal<boolean>(false);
  previewFrame = viewChild<ElementRef>('previewFrame');

  // --- FISCAL SYSTEM STATE ---
  calcGravidade = signal<string>('');
  calcAgravantes = signal<number>(0);
  calcAtenuantes = signal<number>(0);
  calcValorFinal = signal<string>('');

  safeHtml = computed(() => {
    const html = this.generatedHtml();
    if (!html) return null;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  // Navigation Methods
  toggleView(mode: ViewMode) {
    this.viewMode.set(mode);
  }

  setFiscalTab(tab: FiscalTab) {
    this.fiscalTab.set(tab);
  }

  // --- GENERATOR LOGIC ---

  updateRefId(event: Event) { this.refId.set((event.target as HTMLInputElement).value); }
  updateDocDate(event: Event) { this.docDate.set((event.target as HTMLInputElement).value); }
  updateSubject(event: Event) { this.subject.set((event.target as HTMLInputElement).value); }
  updateTextContent(event: Event) { this.textContent.set((event.target as HTMLTextAreaElement).value); }
  updateRecipientName(event: Event) { this.recipientName.set((event.target as HTMLInputElement).value); }
  updateRecipientRole(event: Event) { this.recipientRole.set((event.target as HTMLInputElement).value); }

  updateSenderName(id: number, event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.senders.update(current => current.map(s => s.id === id ? { ...s, name: val } : s));
  }

  updateSenderRole(id: number, event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.senders.update(current => current.map(s => s.id === id ? { ...s, role: val } : s));
  }

  addSender() {
    const newId = Math.max(...this.senders().map(s => s.id), 0) + 1;
    this.senders.update(current => [...current, { id: newId, name: '', role: '' }]);
  }

  removeSender(id: number) {
    this.senders.update(current => current.filter(s => s.id !== id));
  }

  toggleTips() { this.showTips.update(v => !v); }

  loadExample() {
    this.subject.set('Solicitação de Aquisição de Equipamentos de Proteção Individual (EPIs)');
    this.recipientName.set('Secretária Municipal de Administração');
    this.recipientRole.set('Gestão de Compras');
    this.textContent.set(`Prezados Senhores,\n\nVenho por meio deste solicitar a aquisição urgente de novos Equipamentos de Proteção Individual (EPIs)...`);
  }

  getFormattedTimestamp(): string {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const id = Math.random().toString(36).substr(2, 9).toUpperCase();
    return `EMISSÃO: ${dateStr} - ${timeStr} | ID: ${id}`;
  }

  async generate() {
    if ((!this.textContent() && !this.subject()) || this.isGenerating()) return;
    this.isGenerating.set(true);

    let recipientBlockHtml = '';
    const rName = this.recipientName().trim();
    const rRole = this.recipientRole().trim();
    if (rName || rRole) {
      recipientBlockHtml = `<div class="recipient-block">`;
      if (rName) recipientBlockHtml += `<div class="recipient-line"><strong>PARA:</strong> ${rName}</div>`;
      if (rRole) recipientBlockHtml += `<div class="recipient-line"><strong>CARGO:</strong> ${rRole}</div>`;
      recipientBlockHtml += `</div>`;
    }

    let signaturesBlockHtml = '';
    const validSenders = this.senders().filter(s => s.name.trim() || s.role.trim());
    if (validSenders.length > 0) {
      validSenders.forEach(sender => {
        signaturesBlockHtml += `
          <div class="signature-box">
            <div class="sig-line"></div>
            <p class="sig-name">${sender.name || ''}</p>
            <p class="sig-sub">${sender.role || ''}</p>
          </div>`;
      });
    }

    let preparedTemplate = OFFICIAL_DOC_TEMPLATE
      .replace('{{REF_ID}}', this.refId())
      .replace('{{DOC_DATE}}', `Data: ${this.docDate()}`)
      .replace('{{TIMESTAMP}}', this.getFormattedTimestamp())
      .replace('{{RECIPIENT_BLOCK}}', recipientBlockHtml)
      .replace('{{SIGNATURES_BLOCK}}', signaturesBlockHtml);

    const contentToProcess = this.subject() ? `Assunto: ${this.subject()}\n\n${this.textContent()}` : this.textContent();

    try {
      const result = await this.geminiService.generateDocument(contentToProcess, preparedTemplate);
      this.generatedHtml.set(result);
    } catch (error) {
      console.error('Generation failed', error);
      alert('Erro ao gerar documento.');
    } finally {
      this.isGenerating.set(false);
    }
  }

  downloadHtml() {
    const html = this.generatedHtml();
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `documento-oficial-${Date.now()}.html`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportPdf() {
    let contentToPrint = '';

    if (this.viewMode() === 'fiscal-system') {
      const fiscalElement = document.getElementById('fiscal-print-area');
      if (fiscalElement) {
        contentToPrint = `
          <html>
            <head>
              <title>Impressão Sistema Fiscal</title>
              <style>
                body { font-family: Arial, sans-serif; -webkit-print-color-adjust: exact; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                td, th { border: 1px solid #000; padding: 5px; font-size: 11px; vertical-align: top; }
                th { background-color: #e9ecef; font-weight: bold; }
                .section { background: #f2f2f2; font-weight: bold; padding: 5px; border: 1px solid #000; margin: 10px 0; font-size: 12px; }
                .hidden-print { display: none !important; }
                input[type="text"], textarea { border: none; background: transparent; width: 100%; font-family: inherit; }
                input[type=checkbox], input[type=radio] { appearance: auto; }
              </style>
            </head>
            <body>
              ${fiscalElement.innerHTML}
            </body>
          </html>
        `;
        contentToPrint = contentToPrint.replace(/<button[\s\S]*?<\/button>/g, '');
      }
    } else {
      contentToPrint = this.generatedHtml() || '';
      // Ensure timestamp is up to date if reusing generated HTML
      // Note: In a real scenario, we might want to regenerate the timestamp here, 
      // but modifying the already generated HTML string is risky without parsing.
      // Since generate() sets it, it should be fine.
    }

    if (!contentToPrint) return;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = '-10000px';
    iframe.style.top = '0';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      alert('Erro ao inicializar serviço de impressão.');
      return;
    }

    try {
      doc.open();
      doc.write(contentToPrint);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (err) {
          console.error('Erro ao chamar print():', err);
          alert('Erro ao tentar imprimir.');
        } finally {
          setTimeout(() => {
            if (document.body.contains(iframe)) document.body.removeChild(iframe);
          }, 5000);
        }
      }, 2000);
    } catch (e) {
      console.error('Erro ao escrever no iframe:', e);
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
    }
  }

  // --- FISCAL SYSTEM LOGIC ---

  updateGravidade(val: string) {
    this.calcGravidade.set(val);
  }

  updateAgravantes(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.calcAgravantes.update(v => checkbox.checked ? v + 1 : v - 1);
  }

  updateAtenuantes(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.calcAtenuantes.update(v => checkbox.checked ? v + 1 : v - 1);
  }

  calcularMulta() {
    let baseMulta = 0;
    const gravidade = this.calcGravidade();
    
    if (!gravidade) {
      alert('Selecione a gravidade da infração primeiro.');
      return;
    }
    
    switch(gravidade) {
      case 'leve': baseMulta = 500; break;
      case 'grave': baseMulta = 2000; break;
      case 'gravissima': baseMulta = 5000; break;
    }
    
    const agravantes = this.calcAgravantes();
    const multaAjustada = baseMulta * (1 + (agravantes * 0.2));
    
    const atenuantes = this.calcAtenuantes();
    const reducaoMaxima = 0.3;
    const reducao = Math.min(atenuantes * 0.15, reducaoMaxima);
    
    const multaFinal = multaAjustada * (1 - reducao);
    const multaArredondada = Math.round(multaFinal / 10) * 10;
    
    this.calcValorFinal.set(multaArredondada.toFixed(2));
    
    alert(`Cálculo realizado:\nBase: R$ ${baseMulta}\nAgravantes: +${(agravantes*20)}%\nAtenuantes: -${(reducao*100).toFixed(0)}%\nTotal: R$ ${this.calcValorFinal()}`);
  }

  limparFormularioFiscal(id: string) {
    const container = document.getElementById(id);
    if (container && confirm('Limpar todos os dados deste formulário?')) {
        const inputs = container.querySelectorAll('input, textarea');
        inputs.forEach((input: any) => {
            if (input.type === 'checkbox' || input.type === 'radio') input.checked = false;
            else input.value = '';
        });
        if(id === 'formAutoInfracao') {
            this.calcGravidade.set('');
            this.calcAgravantes.set(0);
            this.calcAtenuantes.set(0);
            this.calcValorFinal.set('');
        }
    }
  }

  // --- DOWNLOADS ---
  downloadTechnicalPlan() {
    const content = `
Plano Diretor do Sistema Argos
Versão 1.0 - Documento Estratégico

1. Visão Filosófica
O Sistema Argos é concebido como uma plataforma de inteligência cívica, destinada a otimizar a gestão pública através da automação, transparência e análise de dados. Acreditamos que a tecnologia deve servir como uma ponte entre a administração e os cidadãos, simplificando processos e garantindo a conformidade com as normativas vigentes.

2. Arquitetura Técnica Futura (Roadmap Q3-Q4)
- Módulo de Gestão de Identidade Visual: Permitir upload dinâmico de logos e personalização de templates por secretaria.
- Motor de Tipografia: Integração com Google Fonts para seleção de fontes oficiais.
- Módulo de Visualização de Dados (DataViz): Utilização de D3.js para gerar gráficos em relatórios.
- Construtor de Relatórios Modulares: Evoluir de um editor de texto único para um sistema de blocos (texto, tabela, gráfico).

3. Stack Tecnológica Proposta
- Frontend: Angular (Standalone Components, Signals)
- Backend (Fase 2): Node.js/Fastify para APIs de gestão de templates.
- Geração de Documentos: Gemini API para processamento de linguagem natural e formatação HTML.
- Geração de PDF: Funções serverless (Cloud Function) utilizando Puppeteer.
    `;
    this.downloadTextFile(content.trim(), 'Plano_Diretor_Argos.txt');
  } 

  downloadStatusReport() {
    const content = `
Relatório de Status do Projeto - Sistema Argos
Data: ${new Date().toLocaleDateString('pt-BR')}

1. Status Geral: Operacional (Fase 1 Concluída)

2. Módulos Implementados:
- [OK] Gerador de Documentos Oficiais (OfícioGen): Funcional, com formatação baseada no Manual da Presidência.
- [OK] Manual de Usuário & Roadmap: Integrado na aplicação.
- [OK] Sistema Fiscal (Simulador de Multas): Módulo de cálculo implementado.

3. Próximos Passos (ver Plano Diretor):
- Iniciar desenvolvimento do Módulo de Gestão de Identidade Visual.
- Coletar feedback dos usuários da Fase 1 para refinar a UX.

4. Riscos e Mitigações:
- Risco: Dependência da API externa (Gemini).
- Mitigação: Implementar cache de gerações e monitoramento de latência.

5. Auditoria e Planejamento:
- O sistema atual cumpre os requisitos da Fase 1. O planejamento para a Fase 2 está alinhado com o Plano Diretor.
    `;
    this.downloadTextFile(content.trim(), 'Status_Report_Argos.txt');
  } 

  private downloadTextFile(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}