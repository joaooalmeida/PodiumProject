import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Brand from "./Brand";
import Dialog from "./Dialog";

export default function AgeGate({ onConfirm }) {
  const [declined, setDeclined] = useState(false);
  return (
    <Dialog
      title="Confirmação de maioridade"
      dismissible={false}
      className="age-gate"
    >
      <Brand />
      <div className="age-emblem">
        <ShieldCheck size={30} />
      </div>
      <span className="eyebrow">UM ESPAÇO PARA ADULTOS</span>
      <h1>
        {declined ? "Nos vemos no futuro." : "Antes de entrar,"}
        <br />
        {!declined && "você tem 18 anos?"}
      </h1>
      <p>
        {declined
          ? "O acesso ao catálogo não é permitido a menores de 18 anos."
          : "Este catálogo é destinado exclusivamente a maiores de 18 anos, conforme a legislação brasileira. Ao continuar, você declara ser maior de idade."}
      </p>
      {!declined ? (
        <>
          <button className="button primary" onClick={onConfirm}>
            Sim, tenho 18 anos ou mais <ArrowRight size={18} />
          </button>
          <button className="age-exit" onClick={() => setDeclined(true)}>
            Tenho menos de 18 anos · Sair
          </button>
        </>
      ) : (
        <>
          <button
            className="button primary"
            onClick={() => window.location.assign("https://www.google.com")}
          >
            Sair do site <ArrowRight size={18} />
          </button>
          <button className="age-exit" onClick={() => setDeclined(false)}>
            Voltar à confirmação
          </button>
        </>
      )}
      <small>Catálogo informativo. Sem vendas on-line.</small>
    </Dialog>
  );
}
