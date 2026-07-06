import { useState } from "react";
import { getCepData } from "../api/campaignApi";
import { formatCep, formatPhone, validateCampaignForm } from "../utils/formatters";
import Button from "./Button";
import Modal from "./Modal";

const initialForm = {
  nome: "",
  telefone: "",
  email: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  comprovante: null,
  lgpd_aceite: false
};

export default function CampaignFormModal({
  open,
  onClose,
  onSubmit,
  onOpenLgpd
}) {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleCepBlur() {
    const cleanCep = form.cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      return;
    }

    setLoadingCep(true);
    setMessage("");

    try {
      const data = await getCepData(cleanCep);

      setForm((current) => ({
        ...current,
        logradouro: data.logradouro || current.logradouro,
        bairro: data.bairro || current.bairro,
        cidade: data.localidade || current.cidade,
        uf: data.uf || current.uf
      }));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoadingCep(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateCampaignForm(form);

    if (validation) {
      setMessage(validation);
      return;
    }

    const formData = new FormData();
    formData.append("nome", form.nome);
    formData.append("telefone", form.telefone);
    formData.append("email", form.email);
    formData.append("cep", form.cep);
    formData.append("logradouro", form.logradouro);
    formData.append("numero", form.numero);
    formData.append("complemento", form.complemento);
    formData.append("bairro", form.bairro);
    formData.append("cidade", form.cidade);
    formData.append("uf", form.uf);
    formData.append("lgpd_aceite", String(form.lgpd_aceite));
    formData.append("comprovante", form.comprovante);

    setLoadingSubmit(true);
    setMessage("");

    try {
      await onSubmit(formData);
      setForm(initialForm);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="grid overflow-hidden rounded-[2rem] lg:grid-cols-[0.78fr_1.22fr]">
        <div className="relative hidden min-h-full bg-[linear-gradient(135deg,#050505_0%,#0F172A_55%,#395BA7_100%)] p-8 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_80%_90%,rgba(0,0,0,0.25),transparent_30%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <span className="rounded-full border border-[#FFFFFF]/20 bg-[#FFFFFF]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#FFFFFF]">
                Cadastro
              </span>

              <h2 className="mt-8 text-4xl font-black leading-tight tracking-[-0.04em] text-[#FFFFFF]">
                Sua chance começa aqui.
              </h2>

              <p className="mt-5 leading-7 text-[#FFFFFF]/78">
                Preencha seus dados, envie o comprovante da compra e libere a roleta. Todas as informações serão validadas antes do envio dos prêmios.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#FFFFFF]/12 bg-[#FFFFFF]/8 p-5 backdrop-blur-xl">
              <strong className="block text-xl font-black text-[#FFFFFF]">Atenção</strong>
              <p className="mt-2 text-sm leading-6 text-[#FFFFFF]/75">
                Aceitamos comprovantes em formatos como JPG, JPEG, PNG, WEBP e PDF.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#F7F9FF] p-6 text-[#0A0A0A] sm:p-8">
          <div className="pr-10">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#395BA7]">
              Participação
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
              Preencha seus dados
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#334155]">
              Seus dados e o comprovante da compra serão analisados pela equipe antes da confirmação do prêmio.
            </p>
          </div>

          <div className="mt-7 grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-black">Nome</label>
              <input
                value={form.nome}
                onChange={(event) => updateField("nome", event.target.value)}
                className="form-input"
                placeholder="Seu nome completo"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-black">Telefone</label>
                <input
                  value={form.telefone}
                  onChange={(event) => updateField("telefone", formatPhone(event.target.value))}
                  className="form-input"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-black">E-mail</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="form-input"
                  placeholder="seuemail@email.com"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[0.55fr_1.45fr]">
              <div className="grid gap-2">
                <label className="text-sm font-black">CEP</label>
                <input
                  value={form.cep}
                  onChange={(event) => updateField("cep", formatCep(event.target.value))}
                  onBlur={handleCepBlur}
                  className="form-input"
                  placeholder="00000-000"
                />
                {loadingCep && (
                  <span className="text-xs font-bold text-[#395BA7]">
                    Consultando CEP...
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-black">Endereço</label>
                <input
                  value={form.logradouro}
                  onChange={(event) => updateField("logradouro", event.target.value)}
                  className="form-input"
                  placeholder="Rua, avenida..."
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[0.45fr_1.55fr]">
              <div className="grid gap-2">
                <label className="text-sm font-black">Número</label>
                <input
                  value={form.numero}
                  onChange={(event) => updateField("numero", event.target.value)}
                  className="form-input"
                  placeholder="123"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-black">Complemento</label>
                <input
                  value={form.complemento}
                  onChange={(event) => updateField("complemento", event.target.value)}
                  className="form-input"
                  placeholder="Apto, bloco, referência..."
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_90px]">
              <div className="grid gap-2">
                <label className="text-sm font-black">Bairro</label>
                <input
                  value={form.bairro}
                  onChange={(event) => updateField("bairro", event.target.value)}
                  className="form-input"
                  placeholder="Bairro"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-black">Cidade</label>
                <input
                  value={form.cidade}
                  onChange={(event) => updateField("cidade", event.target.value)}
                  className="form-input"
                  placeholder="Cidade"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-black">UF</label>
                <input
                  value={form.uf}
                  onChange={(event) => updateField("uf", event.target.value.toUpperCase().slice(0, 2))}
                  className="form-input"
                  placeholder="SP"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-black">Comprovante da compra</label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={(event) => updateField("comprovante", event.target.files?.[0] || null)}
                className="form-file"
              />
              <span className="text-xs leading-6 text-[#475569]">
                Envie o comprovante da compra. O nome do arquivo será organizado automaticamente para facilitar a conferência pela equipe.
              </span>
            </div>

            <label className="mt-2 grid grid-cols-[22px_1fr] gap-3 rounded-2xl border border-[#395BA7]/10 bg-[#FFFFFF] p-4 text-sm leading-6 text-[#334155]">
              <input
                type="checkbox"
                checked={form.lgpd_aceite}
                onChange={(event) => updateField("lgpd_aceite", event.target.checked)}
                className="mt-1 h-4 w-4 accent-[#395BA7]"
              />
              <span>
                Confirmo que li e aceito o uso dos meus dados para participação na campanha, análise do comprovante, contato sobre o prêmio e recebimento de comunicações promocionais.
              </span>
            </label>

            <button
              type="button"
              onClick={onOpenLgpd}
              className="justify-self-start text-sm font-black uppercase tracking-[0.14em] text-[#395BA7] underline underline-offset-4"
            >
              Ler regras de uso dos dados
            </button>

            {message && (
              <div className="rounded-2xl border border-[#395BA7]/15 bg-[#395BA7]/10 px-4 py-3 text-sm font-bold text-[#395BA7]">
                {message}
              </div>
            )}

            <Button type="submit" disabled={loadingSubmit} className="w-full">
              {loadingSubmit ? "Enviando..." : "Liberar minha roleta"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
