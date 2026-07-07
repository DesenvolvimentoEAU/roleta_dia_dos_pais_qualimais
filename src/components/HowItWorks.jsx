export default function HowItWorks({ onOpenForm }) {
  const steps = [
    {
      number: "01",
      title: "Preencha seus dados",
      text: "Nome, CPF, telefone, e-mail e endereço para validar sua participação. Aceite os termos e condições e a política de privacidade."
    },
    {
      number: "02",
      title: "Envie a foto do comprovante",
      text: "O comprovante da compra é obrigatório e será salvo em nossa base de dados."
    },
    {
      number: "03",
      title: "Apenas 1 chance por comprovante válido de compra",
      text: "Após o cadastro, a roleta é liberada para que você veja seu prêmio."
    },
    {
      number: "04",
      title: "Aguarde a conferência",
      text: "A equipe validará os dados e o comprovante antes de confirmar o envio do prêmio. Enviaremos mensagem por e-mail"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#020202] px-5 py-24 text-[#FFFFFF] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(57,91,167,0.18),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(76,115,202,0.2),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#89A6EA]">
              Como funciona
            </span>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Uma jornada rápida, elegante e segura.
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenForm}
            className="rounded-2xl bg-[#395BA7] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#FFFFFF] transition hover:-translate-y-1 hover:bg-[#4C73CA]"
          >
            Abrir formulário
          </button>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-[2rem] border border-[#FFFFFF]/8 bg-[#0B0B0B] p-6 transition hover:-translate-y-2 hover:border-[#395BA7]/40"
            >
              <span className="text-5xl font-black text-[#395BA7]">
                {step.number}
              </span>
              <h3 className="mt-8 text-2xl font-black text-[#FFFFFF]">{step.title}</h3>
              <p className="mt-4 leading-7 text-[#FFFFFF]/65">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
