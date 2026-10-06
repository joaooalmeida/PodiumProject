import { Check, CircleHelp, ArrowLeft } from "lucide-react";
import Dialog from "./Dialog";
import ProductImage from "./ProductImage";

export default function ProductDetails({ product, onClose }) {
  return (
    <Dialog
      title={`Detalhes de ${product.nome}`}
      onClose={onClose}
      className="product-dialog"
    >
      <div className="sheet-handle" />
      <div className={`detail-image image-${product.id}`}>
        <ProductImage product={product} lazy={false} />
      </div>
      <div className="detail-content">
        <span className="eyebrow">
          {product.marca} · {product.categoria}
        </span>
        <h2>{product.nome}</h2>
        <p>{product.descricao}</p>
        <ul>
          {product.detalhes.map((detail) => (
            <li key={detail}>
              <Check size={16} />
              {detail}
            </li>
          ))}
        </ul>
        <div className={`availability ${product.disponivel ? "" : "consult"}`}>
          {product.disponivel ? <Check size={16} /> : <CircleHelp size={16} />}
          {product.disponivel
            ? "Disponível no catálogo demonstrativo"
            : "Disponibilidade a consultar"}
        </div>
        <small>
          Produto e informações de demonstração. Este catálogo não realiza
          vendas ou pedidos.
        </small>
        <button className="button secondary" onClick={onClose}>
          <ArrowLeft size={17} />
          Voltar ao catálogo
        </button>
      </div>
    </Dialog>
  );
}
