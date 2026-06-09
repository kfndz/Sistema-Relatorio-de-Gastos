export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Transporte': [
    'uber', 'uber moto', '99', 'taxi', 'táxi',
    'onibus', 'ônibus', 'metro', 'metrô',
    'busão', 'carro', 'gasolina',
    'combustivel', 'combustível',
    'alcool', 'álcool',
    'estacionamento', 'pedagio', 'pedágio'
  ],

  'Alimentação': [
    'restaurante', 'comida', 'pizza',
    'hamburguer', 'hambúrguer',
    'sanduiche', 'sanduíche',
    'lanche', 'café', 'cafe',
    'marmita', 'sushi',
    'churrasco', 'bolo',
    'padaria', 'lanchonete',
    'açai', 'acai', 'sorvete'
  ],

  'Diversão': [
    'cinema', 'filme', 'show',
    'teatro', 'jogo', 'festa',
    'boate', 'bar', 'bebida',
    'balada', 'evento'
  ],

  'Supermercado': [
    'mercado', 'supermercado',
    'compras', 'alimentos',
    'atacadão', 'assai'
  ],

  'Compras Online': [
    'shopee', 'mercado livre',
    'mercadolivre', 'amazon',
    'aliexpress', 'shein',
    'magalu', 'kabum',
    'americanas',
    'pedido', 'encomenda',
    'compra online'
  ],

  'Saúde': [
    'farmacia', 'farmácia',
    'remedio', 'remédio',
    'medicamento', 'medico',
    'médico', 'dentista',
    'hospital', 'consulta',
    'exame', 'psicologo',
    'psicólogo', 'terapia'
  ],

  'Educação': [
    'escola', 'curso',
    'aula', 'educação',
    'livro', 'universidade',
    'faculdade', 'apostila'
  ],

  'Casa': [
    'aluguel', 'agua', 'água',
    'luz', 'internet',
    'condominio', 'condomínio',
    'energia', 'movel', 'móvel',
    'geladeira', 'fogão',
    'sofa', 'sofá'
  ],

  'Moda': [
    'roupa', 'roupas',
    'sapato', 'calça',
    'camiseta', 'tenis',
    'tênis', 'bolsa',
    'moda', 'perfume'
  ],

  'Serviços': [
    'corte', 'cabelo',
    'cabeleireiro',
    'barbeiro',
    'manicure',
    'pedicure',
    'massagem'
  ],

  'Pets': [
    'pet', 'ração',
    'racao', 'raçao',
    'veterinario',
    'veterinário',
    'cachorro', 'gato',
    'calopsita', 'peixe',
    'thor', 'scott'
  ],

  'Streaming': [
    'netflix', 'spotify',
    'disney', 'prime video',
    'hbo', 'youtube premium',
    'deezer'
  ],

  'Assinaturas': [
    'assinatura',
    'mensalidade',
    'plano',
    'icloud',
    'google one',
    'chatgpt',
    'claude',
    'canva'
  ],

  'Viagem': [
    'hotel', 'airbnb',
    'passagem', 'viagem',
    'aviao', 'avião',
    'turismo'
  ],

  'Trabalho': [
    'empresa', 'escritorio',
    'escritório',
    'notebook',
    'office',
    'teclado',
    'mouse',
    'monitor'
  ],

  'Tecnologia': [
    'iphone', 'samsung',
    'celular', 'pc',
    'computador',
    'fone', 'airpods',
    'tablet', 'ipad',
    'carregador'
  ],

  'Academia': [
    'academia', 'gym',
    'smartfit',
    'smart fit',
    'musculação',
    'musculacao',
    'treino',
    'whey',
    'creatina'
  ],

  'Investimentos': [
    'investimento',
    'ações', 'acao',
    'bitcoin', 'btc',
    'cripto',
    'tesouro direto',
    'cdb',
    'nubank caixinha'
  ],

  'Bancos': [
    'nubank', 'inter',
    'picpay',
    'mercado pago',
    'itau', 'itaú',
    'caixa',
    'bradesco',
    'santander'
  ],

  'Contas': [
    'boleto', 'fatura',
    'telefone',
    'tim', 'vivo',
    'claro',
    'recarga'
  ],

  'Presentes': [
    'presente',
    'aniversario',
    'aniversário',
    'natal',
    'dia das mães',
    'dia dos pais'
  ],

  'Relacionamento': [
    'namorada',
    'namorado',
    'date',
    'encontro',
    'alianca',
    'aliança'
  ],

  'Higiene': [
    'shampoo',
    'sabonete',
    'desodorante',
    'escova',
    'pasta de dente',
    'hidratante'
  ],

  'Delivery': [
    'ifood',
    'delivery',
    'rappi',
    'aiqfome'
  ],

  'Games': [
    'steam',
    'xbox',
    'playstation',
    'psn',
    'gamepass',
    'valorant',
    'fortnite',
    'free fire'
  ],

  'Impostos': [
    'ipva',
    'imposto',
    'taxa',
    'licenciamento',
    'multa'
  ],

  'Manutenção': [
    'oficina',
    'manutenção',
    'manutencao',
    'conserto',
    'reparo',
    'mecanico',
    'mecânico'
  ],

  'Cartão débito/crédito': [
    'cartão',
    'cartao',
    'debito',
    'débito',
    'credito',
    'crédito'
  ],

  'Pix / Transferência': [
    'pix', 'transferência', 'transferencia', 'cota', 'Cota', 'Pix',
    'transferencia',
    'transferência',
    'mãe', 'pai',
    'irmã', 'irmão',
    'vó', 'vô',
    'amigo', 'amiga',
    'joão', 'maria',
    'amanda', 'leandro',
    'melissa',
    'khauin',
    'alfredo',
    'estevão',
    'kauã',
    'cota'
  ],

  'Doações': [
    'doação',
    'doacao',
    'igreja',
    'caridade',
    'ajuda'
  ],
};

export const detectCategory = (text: string): string => {
  const lowerText = text.toLowerCase();

  const entries = Object.entries(CATEGORY_KEYWORDS)
    .flatMap(([category, keywords]) =>
      keywords.map(keyword => ({
        category,
        keyword,
      }))
    )
    .sort((a, b) => b.keyword.length - a.keyword.length);

  for (const item of entries) {
    if (lowerText.includes(item.keyword)) {
      return item.category;
    }
  }

  return 'Outro';
};

export const parseExpense = (text: string) => {
  const lowerText = text.toLowerCase();

  const formatLocalDate = (date: Date) =>
    date.toLocaleDateString("sv-SE", {
      timeZone: "America/Cuiaba",
    });

  let date = formatLocalDate(new Date());

  let cleanText = lowerText;

  // ontem
  if (lowerText.includes("ontem")) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    date = formatLocalDate(yesterday);

    cleanText = cleanText.replace("ontem", "");
  }

  // 30/05 ou 30/05/2025
  const slashDateMatch = lowerText.match(
    /(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/
  );

  if (slashDateMatch) {
    const day = Number(slashDateMatch[1]);
    const month = Number(slashDateMatch[2]);

    let year = Number(slashDateMatch[3]);

    if (!year) {
      year = new Date().getFullYear();
    }

    if (year < 100) {
      year += 2000;
    }

    const customDate = new Date(year, month - 1, day);

    if (!isNaN(customDate.getTime())) {
      date = formatLocalDate(customDate);
    }

    cleanText = cleanText.replace(slashDateMatch[0], "");
  }

  // 30 de maio
  const months: Record<string, number> = {
    janeiro: 1,
    fevereiro: 2,
    março: 3,
    marco: 3,
    abril: 4,
    maio: 5,
    junho: 6,
    julho: 7,
    agosto: 8,
    setembro: 9,
    outubro: 10,
    novembro: 11,
    dezembro: 12,
  };

  const textDateMatch = lowerText.match(
    /(\d{1,2})\s+de\s+(janeiro|fevereiro|março|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/
  );

  if (textDateMatch) {
    const day = Number(textDateMatch[1]);

    const month = months[textDateMatch[2]];

    const year = new Date().getFullYear();

    const customDate = new Date(year, month - 1, day);

    if (!isNaN(customDate.getTime())) {
      date = formatLocalDate(customDate);
    }

    cleanText = cleanText.replace(textDateMatch[0], "");
  }

  // pega primeiro valor monetário
  const amountMatch = cleanText.match(/\d+(?:[.,]\d+)?/);

  const amount = amountMatch
    ? parseFloat(amountMatch[0].replace(",", "."))
    : 0;

  const category = detectCategory(text);

  return {
    category,
    amount,
    date,
    description: text,
  };
};