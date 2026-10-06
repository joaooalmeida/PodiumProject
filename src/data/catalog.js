// DADOS DE DEMONSTRAÇÃO: substitua estes itens e imagens pelo catálogo real.
// Nenhum item inicia pedidos ou transações.
export const categories = [
  "Todos",
  "Acessórios",
  "Carvão",
  "Seda",
  "Isqueiros",
  "Essências",
  "Outros",
];

export const products = [
  {
    id: "grinder",
    nome: "Dichavador de metal",
    marca: "PODIUM SELECT",
    categoria: "Acessórios",
    descricao:
      "Acabamento fosco, design compacto e quatro partes para uma organização prática.",
    resumo: "4 partes · Alumínio",
    imagem: "/products/grinder.webp",
    destaque: true,
    tags: ["Popular"],
    disponivel: true,
    detalhes: [
      "Alumínio com acabamento fosco",
      "Diâmetro ilustrativo: 50 mm",
      "Fechamento magnético",
    ],
    palavrasChave: "dichavador grinder triturador metal",
  },
  {
    id: "coal",
    nome: "Carvão de coco",
    marca: "COCO PREMIUM",
    categoria: "Carvão",
    descricao:
      "Carvão de casca de coco em cubos uniformes. Consulte as orientações do fabricante antes de usar.",
    resumo: "Natural · Cubos 26 mm",
    imagem: "/products/coal.webp",
    destaque: true,
    tags: ["Destaque"],
    disponivel: true,
    detalhes: [
      "Embalagem ilustrativa: 1 kg",
      "Cubos de 26 mm",
      "Utilize apenas em local bem ventilado",
    ],
    palavrasChave: "coco carvão natural cubos narguile",
  },
  {
    id: "paper",
    nome: "Seda King Size",
    marca: "RAW",
    categoria: "Seda",
    descricao:
      "Papel fino em formato King Size Slim, em livreto compacto. Imagem e dados ilustrativos.",
    resumo: "King Size Slim · 32 folhas",
    imagem: "/products/paper.webp",
    destaque: true,
    tags: ["Popular"],
    disponivel: true,
    detalhes: [
      "Formato King Size Slim",
      "Livreto com 32 folhas",
      "Papel não branqueado",
    ],
    palavrasChave: "seda papel raw king size slim",
  },
  {
    id: "lighter",
    nome: "Isqueiro Classic",
    marca: "CLIPPER",
    categoria: "Isqueiros",
    descricao:
      "Um clássico de bolso com corpo compacto e acabamento em cores sólidas.",
    resumo: "Recarregável · Cores variadas",
    imagem: "/products/lighter.webp",
    destaque: true,
    tags: ["Novo"],
    disponivel: true,
    detalhes: [
      "Modelo recarregável",
      "Cores sujeitas à consulta",
      "Mantenha longe de crianças e calor",
    ],
    palavrasChave: "isqueiro clipper fogo classic roxo",
  },
  {
    id: "bowl",
    nome: "Rosh de cerâmica",
    marca: "PODIUM SELECT",
    categoria: "Acessórios",
    descricao:
      "Rosh em cerâmica com esmalte acetinado e formato phunnel. Confira a compatibilidade com seu acessório.",
    resumo: "Cerâmica · Modelo phunnel",
    imagem: "/products/bowl.webp",
    destaque: false,
    tags: [],
    disponivel: true,
    detalhes: [
      "Cerâmica esmaltada",
      "Modelo phunnel",
      "Acabamento artesanal: pode apresentar variações",
    ],
    palavrasChave: "rosh bowl cerâmica narguile phunnel",
  },
  {
    id: "tips",
    nome: "Piteiras de papel",
    marca: "RAW",
    categoria: "Seda",
    descricao:
      "Piteiras de papel em livreto, com perfurações que facilitam a dobra.",
    resumo: "Papel · 50 unidades",
    imagem: "/products/tips.webp",
    destaque: false,
    tags: [],
    disponivel: true,
    detalhes: [
      "50 unidades por livreto",
      "Papel com linhas de dobra",
      "Imagem ilustrativa",
    ],
    palavrasChave: "piteira tips filtro papel raw",
  },
  {
    id: "tray",
    nome: "Bandeja Essential",
    marca: "PODIUM SELECT",
    categoria: "Acessórios",
    descricao:
      "Bandeja metálica com bordas arredondadas para organizar pequenos acessórios.",
    resumo: "Metal · Tamanho compacto",
    imagem: "/products/tray.webp",
    destaque: false,
    tags: ["Novo"],
    disponivel: true,
    detalhes: [
      "Metal com acabamento acetinado",
      "Dimensões ilustrativas: 18 × 14 cm",
      "Limpeza com pano macio",
    ],
    palavrasChave: "bandeja metal organização essential",
  },
  {
    id: "case",
    nome: "Estojo Pocket",
    marca: "PODIUM SELECT",
    categoria: "Outros",
    descricao:
      "Estojo compacto com zíper para manter seus acessórios organizados no dia a dia.",
    resumo: "Compacto · Fecho em zíper",
    imagem: "/products/case.webp",
    destaque: false,
    tags: [],
    disponivel: false,
    detalhes: [
      "Tecido resistente",
      "Compartimento único",
      "Disponibilidade a consultar",
    ],
    palavrasChave: "estojo bolsa case pocket acessórios",
  },
];

// Configuração do estabelecimento. Não preencha com dados fictícios.
export const business = {
  whatsapp: null, // Número real com país e DDD, somente dígitos. Ex.: 55 + DDD + número.
  instagram: null, // URL completa do perfil oficial.
  hours: null,
  region: null,
};
