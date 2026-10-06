import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  SlidersHorizontal,
  SearchX,
  Layers3,
  Sparkles,
  Zap,
  Package,
  Circle,
  Wind,
} from "lucide-react";
import { useRef } from "react";
import { categories } from "../data/catalog";
import ProductImage from "./ProductImage";

const categoryIcons = {
  Todos: Layers3,
  Acessórios: Sparkles,
  Carvão: Flame,
  Seda: Wind,
  Isqueiros: Zap,
  Essências: Circle,
  Outros: Package,
};

export function CategoryChips({ category, onChange }) {
  return (
    <div className="category-scroll" aria-label="Filtrar por categoria">
      {categories.map((item) => {
        const Icon = categoryIcons[item];
        return (
          <button
            key={item}
            className={`category-chip ${category === item ? "selected" : ""}`}
            aria-pressed={category === item}
            onClick={() => onChange(item)}
          >
            <Icon size={17} />
            {item}
          </button>
        );
      })}
    </div>
  );
}

export function ProductCard({ product, onSelect, featured = false }) {
  return (
    <article className={`product-card ${featured ? "featured-card" : ""}`}>
      <button
        className="product-image-button"
        onClick={() => onSelect(product)}
        aria-label={`Ver detalhes de ${product.nome}`}
      >
        <div className={`product-image image-${product.id}`}>
          <ProductImage product={product} />
          {!featured && product.tags[0] && (
            <span
              className={`product-tag ${product.tags[0] === "Novo" ? "new-tag" : ""}`}
            >
              {product.tags[0]}
            </span>
          )}
          <span className="image-arrow">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </button>
      <div className="product-info">
        <span className="product-brand">{product.marca}</span>
        <h3>{product.nome}</h3>
        <p>{product.resumo}</p>
        {!featured && (
          <div className="card-bottom">
            <span>{product.categoria}</span>
            <button onClick={() => onSelect(product)}>
              Ver detalhes <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export function FeaturedProducts({ products, onSelect }) {
  const scroller = useRef(null);
  return (
    <section id="destaques" className="featured-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <Flame size={14} /> OS FAVORITOS DA CASA
          </span>
          <h2>
            Mais procurados<span className="purple-dot">.</span>
          </h2>
        </div>
        <div className="carousel-buttons">
          <button
            className="icon-button"
            aria-label="Destaques anteriores"
            onClick={() =>
              scroller.current.scrollBy({ left: -300, behavior: "smooth" })
            }
          >
            <ChevronLeft size={19} />
          </button>
          <button
            className="icon-button"
            aria-label="Próximos destaques"
            onClick={() =>
              scroller.current.scrollBy({ left: 300, behavior: "smooth" })
            }
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
      <div className="featured-grid" ref={scroller}>
        {products
          .filter((p) => p.destaque)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelect}
              featured
            />
          ))}
      </div>
    </section>
  );
}

export function ProductGrid({ products, onSelect, sort, onSort, onReset }) {
  return (
    <section id="catalogo" className="catalog-section">
      <div className="section-heading catalog-heading">
        <div>
          <span className="eyebrow">EXPLORE NO SEU RITMO</span>
          <h2>
            Catálogo<span className="purple-dot">.</span>{" "}
            <span className="product-count">
              {products.length} {products.length === 1 ? "produto" : "produtos"}
            </span>
          </h2>
        </div>
        <label className="sort-select">
          <SlidersHorizontal size={16} />
          <span className="sr-only">Ordenar produtos</span>
          <select value={sort} onChange={(event) => onSort(event.target.value)}>
            <option value="recommended">Recomendados</option>
            <option value="name">Nome: A–Z</option>
            <option value="new">Novidades</option>
          </select>
        </label>
      </div>
      {products.length ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <SearchX size={34} />
          <h3>Nenhum produto por aqui.</h3>
          <p>Tente outra busca ou explore todas as categorias.</p>
          <button className="button primary" onClick={onReset}>
            Limpar filtros <ArrowRight size={17} />
          </button>
        </div>
      )}
      <p className="catalog-note">
        Imagens e produtos ilustrativos. Disponibilidade sujeita à consulta.
      </p>
    </section>
  );
}
