import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenAI;

  constructor() {
    // Inicialização correta com objeto de configuração e chave do ambiente
    this.genAI = new GoogleGenAI({ apiKey: process.env['API_KEY']! });
  }

  async generateDocument(userContent: string, template: string): Promise<string> {
    const prompt = `
Você é um especialista em geração de documentos HTML institucionais. Sua tarefa é gerar documentos oficiais completos mantendo o padrão visual e estrutural de um template pré-definido.

**Instruções:**
1. O template base é fornecido abaixo.
2. O conteúdo do usuário a ser inserido é fornecido abaixo.
3. Você deve gerar o HTML completo substituindo apenas a seção \`[INSERIR CONTEÚDO AQUI]\` pelo conteúdo fornecido, formatado corretamente em HTML.
4. **Formatação de Texto:**
   * Envolva cada parágrafo do texto em tags \`<p></p>\`. Não use quebras de linha \`<br>\` para separar parágrafos.
   * Se o usuário inserir nomes próprios em letras maiúsculas, formate-os com a primeira letra maiúscula e o restante em minúsculas (Ex: 'JOÃO DA SILVA' -> 'João da Silva').
5. **Formatação de Tabelas:**
   * Use a classe CSS \`data-table\` (\`<table class="data-table">\`).
   * Colunas numéricas devem ter \`style="text-align: center;"\`.
6. **Estrutura:** Use as classes \`caixa-assunto\` e \`secao-titulo\` se aplicável.
7. **Fechos:** "Respeitosamente," para superiores, "Atenciosamente," para os demais.
8. Mantenha intactos: cabeçalho, estilos, assinatura e rodapé.
9. Não altere logos ou referências fixas.
10. Retorne apenas o código HTML válido, sem blocos de markdown.

**Template HTML Base:**
${template}

**Conteúdo do Usuário:**
${userContent}
    `;

    try {
      // Chamada única e direta, conforme a documentação mais recente
      const response = await this.genAI.models.generateContent({
        model: 'gemini-2.5-flash', // Modelo atualizado
        contents: prompt
      });
      
      // Extração correta da resposta via propriedade .text
      let text = response.text || '';
      
      // Limpeza de segurança caso a IA ignore o comando de "apenas HTML"
      text = text.replace(/^```html\s*/i, '').replace(/^```\s*/, '').replace(/```$/, '').trim();
      
      return text;
    } catch (error) {
      console.error('Erro na API Gemini:', error);
      throw error;
    }
  }
}
