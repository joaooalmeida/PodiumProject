export default function Brand({ light = false }) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`} aria-label="PODIUM">
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      PODIUM<span className="brand-dot">®</span>
    </span>
  );
}
