import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Instagram,
  MessageCircle,
} from "lucide-react";
import Brand from "./Brand";
import { business } from "../data/catalog";

export function WhatsAppIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M20 11.7a8 8 0 0 1-12 7l-4 1 1-4a8 8 0 1 1 15-4Z" />
      <path d="M8.3 7.8c-.8 1.1-.3 3 1.3 4.6 1.6 1.6 3.5 2.1 4.6 1.3l1-1-2-1-1 .7c-.8-.4-1.6-1.2-2-2l.7-1-1-2Z" />
    </svg>
  );
}

export function ContactSection({ onContact }) {
  return (
    <section id="contato" className="contact-section">
      <div className="contact-icon">
        <WhatsAppIcon size={29} />
      </div>
      <div className="contact-copy">
        <span className="eyebrow">CONVERSA BOA COMEÇA AQUI</span>
        <h2>Precisa falar com a PODIUM?</h2>
        <p>Fale com nossa equipe pelo WhatsApp.</p>
      </div>
      <button className="button contact-button" onClick={onContact}>
        Chamar no WhatsApp <ArrowUpRight size={19} />
      </button>
    </section>
  );
}

export function Footer({ onContact, onInfo }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Brand />
          <p>Seus essenciais. Seu estilo.</p>
          <span className="footer-age">
            18+ <span>Conteúdo exclusivo para maiores de idade.</span>
          </span>
        </div>
        <div className="footer-info">
          <span>
            <Clock3 size={16} />
            <span>
              <strong>Horário de atendimento</strong>
              {business.hours || "Em breve disponível"}
            </span>
          </span>
          <span>
            <MapPin size={16} />
            <span>
              <strong>Região de atendimento</strong>
              {business.region || "Consulte nossa equipe"}
            </span>
          </span>
        </div>
        <div className="footer-social">
          <button onClick={onContact}>
            <WhatsAppIcon size={18} />
            WhatsApp <ArrowUpRight size={14} />
          </button>
          {business.instagram ? (
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={18} />
              Instagram <ArrowUpRight size={14} />
            </a>
          ) : (
            <button onClick={() => onInfo("instagram")}>
              <Instagram size={18} />
              Instagram <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} PODIUM — Todos os direitos reservados.
        </span>
        <div>
          <button onClick={() => onInfo("privacy")}>
            Política de privacidade
          </button>
          <button onClick={() => onInfo("terms")}>Termos de uso</button>
        </div>
        <span className="footer-signature">
          FEITO PARA O SEU RITMO <span>↗</span>
        </span>
      </div>
    </footer>
  );
}
