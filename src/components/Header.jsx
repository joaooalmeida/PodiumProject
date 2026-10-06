import { ArrowUpRight, Menu, X, Search } from "lucide-react";
import Brand from "./Brand";
import { useState } from "react";

export function SearchBar({ query, onChange }) {
  return (
    <div className="search-box">
      <Search size={20} aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar no catálogo…"
        aria-label="Buscar no catálogo"
      />
      {query ? (
        <button
          className="icon-button"
          aria-label="Limpar busca"
          onClick={() => onChange("")}
        >
          <X size={18} />
        </button>
      ) : (
        <span className="search-hint">Encontre o seu essencial</span>
      )}
    </div>
  );
}

export default function Header({ onContact, onBrowse }) {
  const [menu, setMenu] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#inicio" className="brand-link" aria-label="PODIUM, início">
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#catalogo" className="active" onClick={onBrowse}>
            Catálogo
          </a>
          <a href="#destaques" onClick={onBrowse}>
            Mais procurados
          </a>
          <a href="#contato">Contato</a>
        </nav>
        <div className="header-actions">
          <span className="adult-pill">18+</span>
          <button className="header-contact" onClick={onContact}>
            Fale com a gente <ArrowUpRight size={17} />
          </button>
          <button
            className="icon-button menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {menu && (
        <nav className="mobile-menu" aria-label="Menu mobile">
          {[
            ["Catálogo", "#catalogo"],
            ["Mais procurados", "#destaques"],
            ["Contato", "#contato"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => {
                if (href !== "#contato") onBrowse();
                setMenu(false);
              }}
            >
              {label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
