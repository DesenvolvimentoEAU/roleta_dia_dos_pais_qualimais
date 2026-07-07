import Button from "./Button";
import Modal from "./Modal";

export default function LgpdModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} size="md">
      <div className="rounded-[2rem] bg-[#F7F9FF] p-7 text-[#0A0A0A] sm:p-9">
        <span className="text-xs font-black uppercase tracking-[0.22em] text-[#395BA7]">
          LGPD e campanha
        </span>

        <h2 className="mt-4 pr-10 text-4xl font-black tracking-[-0.04em]">
          Política de uso dos dados
        </h2>

        <div className="mt-6 space-y-4 leading-8 text-[#334155]">
          <p>
            Ao participar da campanha, você autoriza o armazenamento dos dados informados neste formulário para identificação da participação, validação de participação única, análise do comprovante, contato sobre o prêmio e envio de comunicações promocionais relacionadas aos produtos e campanhas da empresa.
          </p>

          <p>
            Os dados coletados incluem: nome, CPF, telefone, e-mail, endereço e comprovante da compra. A participação depende do aceite desta condição.
          </p>

          <p>
            Antes do envio do prêmio, a equipe fará a conferência das informações cadastradas e do comprovante enviado para validar a participação.
          </p>
        </div>

        <Button onClick={onClose} className="mt-8">
          Entendi
        </Button>
      </div>
    </Modal>
  );
}
