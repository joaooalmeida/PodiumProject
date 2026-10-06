import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Layers3,
  Asterisk,
} from "lucide-react";
import AgeGate from "./components/AgeGate";
import Header, { SearchBar } from "./components/Header";
import {
  CategoryChips,
  FeaturedProducts,
  ProductGrid,
} from "./components/Catalog";
import ProductDetails from "./components/ProductDetails";
import { ContactSection, Footer } from "./components/Contact";
import Dialog from "./components/Dialog";
import { business, products } from "./data/catalog";

const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const informational = {
  contact: {
    title: "Vamos conversar.",
    text: "O contato oficial da PODIUM ainda não foi cadastrado. Em breve você poderá falar com nossa equipe por aqui.",
    extra:
      "Este catálogo é demonstrativo. Nenhum pedido é criado ou enviado pelo site.",
  },
  instagram: {
    title: "PODIUM nas redes.",
    text: "O perfil oficial do Instagram será disponibilizado em breve.",
  },
  privacy: {
    title: "Política de privacidade",
    text: "Este catálogo demonstrativo não solicita cadastro, não utiliza ferramentas de rastreamento e não envia sua busca ou confirmação de idade a um servidor. A confirmação de maioridade é guardada apenas durante a sessão neste navegador.",
    extra:
      "Ao abrir WhatsApp ou Instagram, você acessa um serviço externo, sujeito à política de privacidade do respectivo provedor. Antes da publicação comercial, esta política deve ser revisada e incluir os dados e o canal de privacidade do responsável pelo estabelecimento.",
  },
  terms: {
    title: "Termos de uso",
    text: "Acesso exclusivo para maiores de 18 anos. Este site é um catálogo informativo e demonstrativo: não processa pagamentos, pedidos ou vendas. Produtos, imagens, marcas e disponibilidade apresentados são ilustrativos.",
    extra:
      "A confirmação de idade é uma autodeclaração e não substitui a verificação exigida em eventual atendimento presencial. A venda de produtos de tabaco a menores de 18 anos é proibida. Tabaco causa dependência e danos à saúde. Os dados reais do estabelecimento e estes termos devem ser revisados antes da publicação comercial.",
  },
};

export default function App() {
  const [verified, setVerified] = useState(() => {
    try {
      return sessionStorage.getItem("podium-adult") === "yes";
    } catch {
      return false;
    }
  });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState("recommended");
  const [selected, setSelected] = useState(null);
  const [info, setInfo] = useState(null);
  const filtered = useMemo(() => {
    const result = products.filter(
      (p) =>
        (category === "Todos" || p.categoria === category) &&
        normalize(
          `${p.nome} ${p.marca} ${p.categoria} ${p.palavrasChave}`,
        ).includes(normalize(query.trim())),
    );
    if (sort === "name")
      result.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    if (sort === "new")
      result.sort(
        (a, b) =>
          Number(b.tags.includes("Novo")) - Number(a.tags.includes("Novo")),
      );
    return result;
  }, [query, category, sort]);
  function confirm() {
    try {
      sessionStorage.setItem("podium-adult", "yes");
    } catch {
      /* Access still works without storage. */
    }
    setVerified(true);
  }
  function contact() {
    if (business.whatsapp && /^\d{10,15}$/.test(business.whatsapp))
      window.open(
        `https://wa.me/${business.whatsapp}`,
        "_blank",
        "noopener,noreferrer",
      );
    else setInfo("contact");
  }
  return (
    <>
      {verified && (
        <>
          <Header
            onContact={contact}
            onBrowse={() => {
              setQuery("");
              setCategory("Todos");
            }}
          />
          <main id="inicio" className="page-container">
            <section className="hero">
              <div className="hero-copy">
                <span className="hero-label">
                  <span /> BEM-VINDO À PODIUM
                </span>
                <h1>
                  Tudo em um
                  <br />
                  <span>só lugar.</span>
                </h1>
                <p>
                  Seus essenciais, no seu ritmo.
                  <br /> Uma seleção para descobrir e explorar.
                </p>
                <a className="hero-link" href="#catalogo">
                  Explore o catálogo <ArrowDown size={16} />
                </a>
              </div>
              <div className="hero-art" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="hero-orb" />
                <div className="hero-podium">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="floating-label">
                  <Sparkles size={15} /> SEU ESTILO, SEU PODIUM.
                </div>
                <Asterisk className="hero-star" size={42} strokeWidth={1.5} />
              </div>
              <span className="hero-edition">CATÁLOGO DIGITAL / VOL. 01</span>
            </section>
            <div className="discovery">
              <SearchBar query={query} onChange={setQuery} />
              <CategoryChips category={category} onChange={setCategory} />
            </div>
            <div className="catalog-announcement">
              <span>
                <ShieldCheck size={16} /> Catálogo informativo
              </span>
              <i />
              <span>
                Sem compras on-line. Descubra por aqui, converse com a gente.
              </span>
              <ArrowUpRight size={15} />
            </div>
            {!query && category === "Todos" && (
              <FeaturedProducts products={products} onSelect={setSelected} />
            )}
            <ProductGrid
              products={filtered}
              onSelect={setSelected}
              sort={sort}
              onSort={setSort}
              onReset={() => {
                setQuery("");
                setCategory("Todos");
              }}
            />
            <div className="brand-values">
              <span>
                <Layers3 size={18} />
                Uma seleção, muitas possibilidades.
              </span>
              <span>
                <ShieldCheck size={18} />
                Informação clara, escolha consciente.
              </span>
              <span>
                <Sparkles size={18} />
                Detalhes que fazem a diferença.
              </span>
            </div>
            <ContactSection onContact={contact} />
          </main>
          <Footer onContact={contact} onInfo={setInfo} />
        </>
      )}
      {!verified && (
        <div className="gate-background">
          <span>PODIUM</span>
          <AgeGate onConfirm={confirm} />
        </div>
      )}
      {verified && selected && (
        <ProductDetails product={selected} onClose={() => setSelected(null)} />
      )}
      {verified && info && (
        <Dialog
          title={informational[info].title}
          onClose={() => setInfo(null)}
          className="info-dialog"
        >
          <span className="eyebrow">PODIUM · INFORMAÇÕES</span>
          <h2>{informational[info].title}</h2>
          <p>{informational[info].text}</p>
          {informational[info].extra && (
            <p className="info-extra">{informational[info].extra}</p>
          )}
          <button className="button primary" onClick={() => setInfo(null)}>
            Entendi <ArrowUpRight size={17} />
          </button>
        </Dialog>
      )}
    </>
  );
}
