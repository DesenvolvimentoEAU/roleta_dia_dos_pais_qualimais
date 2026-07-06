const API_URL = import.meta.env.VITE_API_URL;
const CAMPAIGN_API_KEY = import.meta.env.VITE_CAMPAIGN_API_KEY;

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "x-campaign-key": CAMPAIGN_API_KEY,
      ...(options.headers || {})
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro na operação.");
  }

  return data;
}

export async function fetchPrizes() {
  const data = await apiFetch("/campaigns/dia-dos-pais/prizes");
  return data.prizes || [];
}

export async function registerParticipant(formData) {
  const data = await apiFetch("/campaigns/dia-dos-pais/register", {
    method: "POST",
    body: formData
  });

  return data.participant;
}

export async function spinRoulette(participantId) {
  const data = await apiFetch("/campaigns/dia-dos-pais/spin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      participant_id: participantId
    })
  });

  return data.prize;
}

export async function getCepData(cep) {
  const cleanCep = String(cep || "").replace(/\D/g, "");
  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }

  return data;
}
