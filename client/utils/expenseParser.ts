export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Transporte': [
    'uber', 'taxi', '99', 'onibus', 'ônibus', 'carro',
    'combustível', 'gasolina', 'metro', 'busão', 'alcool', 'álcool'
  ],

  'Alimentação': [
    'restaurante', 'comida', 'pizza', 'hamburguer',
    'sanduíche', 'lanche', 'café', 'marmita',
    'sushi', 'churrasco', 'bolo', 'hamburguer'
  ],

  'Diversão': [
    'cinema', 'filme', 'show', 'teatro', 'jogo',
    'diversão', 'festa', 'boate', 'bar', 'bebida'
  ],

  'Supermercado': [
    'mercado', 'supermercado', 'compras',
    'alimentos', 'atacadão', 'assai'
  ],

  'Compras Online': [
    'shopee', 'mercado livre', 'mercadolivre',
    'amazon', 'aliexpress', 'shein',
    'magalu', 'kabum', 'americanas',
    'compra online', 'pedido', 'encomenda'
  ],

  'Saúde': [
    'farmácia', 'farmacia', 'remédio',
    'medicamento', 'médico', 'medico',
    'dentista', 'hospital'
  ],

  'Educação': [
    'escola', 'curso', 'aula', 'educação',
    'livro', 'universidade', 'faculdade'
  ],

  'Casa': [
    'aluguel', 'alugel', 'conta',
    'água', 'luz', 'internet',
    'condomínio', 'condominio'
  ],

  'Moda': [
    'roupa', 'sapato', 'calça',
    'camiseta', 'tênis', 'bolsa',
    'moda', 'roupas'
  ],

  'Serviços': [
    'corte', 'cabelo', 'cabeleireiro',
    'manicure', 'pedicure', 'massagem'
  ],

  'Pets': [
    'pet', 'ração', 'racao',
    'veterinário', 'veterinario',
    'cachorro', 'gato'
  ],

  'Streaming': [
    'netflix', 'spotify', 'disney',
    'prime video', 'hbo', 'youtube premium'
  ],

  'Assinaturas': [
    'assinatura', 'mensalidade',
    'plano', 'icloud', 'google one'
  ],

  'Viagem': [
    'hotel', 'airbnb', 'passagem',
    'viagem', 'avião', 'aviao'
  ],

  'Trabalho': [
    'empresa', 'escritório',
    'escritorio', 'notebook',
    'office', 'teclado', 'mouse'
  ],

  'Pix / Transferência': [
    'pix', 'transferência', 'transferencia',
    'joao', 'joão', 'maria', 'pedro',
    'lucas', 'ana', 'amigo', 'amiga',
    'khauin', 'alfredo', 'estevao', 'cota'
  ],
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

  const formatLocalDate = (date: Date) => {
    return date.toLocaleDateString('sv-SE', {
      timeZone: 'America/Cuiaba',
    });
  };

  let date = formatLocalDate(new Date());

  if (text.toLowerCase().includes('ontem')) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    date = formatLocalDate(yesterday);
  }

  const category = detectCategory(text);

  return {
    category,
    amount,
    date,
    description: text,
  };
};
