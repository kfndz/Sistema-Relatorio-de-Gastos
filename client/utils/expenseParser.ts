export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Transporte': ['uber', 'taxi', 'onibus', 'ônibus', 'carro', 'combustível', 'gasolina', 'metro', 'busão'],
  'Alimentação': ['restaurante', 'comida', 'pizza', 'burguer', 'sanduíche', 'lanche', 'café', 'pizza', 'marmita', 'sushi', 'churrasco', 'bolo'],
  'Diversão': ['cinema', 'filme', 'show', 'teatro', 'jogo', 'diversão', 'festa', 'boate', 'bar', 'bebida'],
  'Supermercado': ['mercado', 'supermercado', 'compras', 'alimentos'],
  'Saúde': ['farmácia', 'farmacia', 'remédio', 'medicamento', 'médico', 'medico', 'dentista', 'hospital'],
  'Educação': ['escola', 'curso', 'aula', 'educação', 'livro', 'universidade', 'faculdade'],
  'Casa': ['aluguel', 'alugel', 'conta', 'água', 'luz', 'internet', 'condomínio', 'condominio'],
  'Moda': ['roupa', 'sapato', 'calça', 'camiseta', 'tênis', 'bolsa', 'moda', 'roupas'],
  'Serviços': ['corte', 'cabelo', 'cabeleireiro', 'manicure', 'pedicure', 'massagem'],
};

export const detectCategory = (text: string): string => {
  const lowerText = text.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return category;
      }
    }
  }

  return 'Outro';
};

export const parseExpense = (text: string) => {
  const amountMatch = text.match(/(\d+(?:[.,]\d+)?)/);
  const amount = amountMatch ? parseFloat(amountMatch[1].replace(',', '.')) : 0;

  let date = new Date().toISOString().split('T')[0];
  if (text.toLowerCase().includes('ontem')) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    date = yesterday.toISOString().split('T')[0];
  }

  const category = detectCategory(text);

  return {
    category,
    amount,
    date,
    description: text,
  };
};
