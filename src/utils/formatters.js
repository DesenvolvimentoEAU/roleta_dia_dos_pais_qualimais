export function formatPhone(value) {
  const numbers = String(value || "").replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 10) {
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numbers
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function formatCep(value) {
  return String(value || "")
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, "$1-$2");
}

export function validateCampaignForm(form) {
  if (!form.nome.trim()) return "Informe seu nome.";
  if (!form.telefone.trim()) return "Informe seu telefone.";
  if (!form.email.trim()) return "Informe seu e-mail.";
  if (!form.cep.trim()) return "Informe seu CEP.";
  if (!form.logradouro.trim()) return "Informe seu endereço.";
  if (!form.numero.trim()) return "Informe o número.";
  if (!form.bairro.trim()) return "Informe seu bairro.";
  if (!form.cidade.trim()) return "Informe sua cidade.";
  if (!form.uf.trim()) return "Informe o estado.";
  if (!form.comprovante) return "Envie o comprovante da compra.";
  if (!form.lgpd_aceite) return "Você precisa aceitar os termos da campanha.";
  return "";
}
