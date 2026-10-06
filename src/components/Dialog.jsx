import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Dialog({
  children,
  title,
  onClose,
  className = "",
  dismissible = true,
}) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!element.open) element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        if (dismissible) onClose();
      }}
      onClick={(event) => {
        if (dismissible && event.target === event.currentTarget) {
          const r = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      {dismissible && (
        <button
          className="icon-button close-dialog"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
      )}
      {children}
    </dialog>
  );
}
