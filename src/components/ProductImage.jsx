import { useState } from "react";

export default function ProductImage({ product, lazy = true }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className={`image-frame ${loaded ? "image-loaded" : ""}`}>
      {!loaded && !failed && (
        <span className="image-skeleton" aria-hidden="true" />
      )}
      {failed ? (
        <span className="image-fallback">Imagem indisponível</span>
      ) : (
        <img
          src={product.imagem}
          alt={`Ilustração de ${product.nome}`}
          width="400"
          height="320"
          loading={lazy ? "lazy" : "eager"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setFailed(true);
            setLoaded(true);
          }}
        />
      )}
    </div>
  );
}
