import Button from "./Button";

export default function LandingHero({ onOpenForm, onOpenLgpd }) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#000000]">
      <div className="absolute inset-0 -z-20 bg-[#000000]" />
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-85"
        style={{
          backgroundImage: "url('/hero/hero-dia-dos-pais.jpeg')"
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_38%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(57,91,167,0.28),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(76,115,202,0.22),transparent_20%)]" />

      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#FFFFFF]/10 bg-[#FFFFFF]/6 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#FFFFFF] backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-[#395BA7]" />
            Campanha especial Dia dos Pais
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-[#FFFFFF] sm:text-6xl lg:text-8xl">
            Uma roleta de brindes para brindar grandes pais.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#FFFFFF]/78 sm:text-xl">
            Participe da campanha, gire a roleta e descubra seu presente especial. Uma experiência criada para aproximar nossos clientes do universo Importadora Qualimais.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button onClick={onOpenForm}>Participar agora</Button>
            <Button variant="secondary" onClick={onOpenLgpd}>
              Regras e LGPD
            </Button>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {[
              ["10", "prêmios teste"],
              ["1x", "giro por pessoa"],
              ["100%", "cadastro seguro"]
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-[#FFFFFF]/10 bg-[#FFFFFF]/6 p-4 backdrop-blur-xl"
              >
                <strong className="block text-3xl font-black text-[#FFFFFF]">
                  {value}
                </strong>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-[#FFFFFF]/58">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="absolute -left-4 top-10 h-24 w-24 rounded-full bg-[#395BA7]/30 blur-2xl" />
          <div className="absolute -right-4 bottom-10 h-32 w-32 rounded-full bg-[#4C73CA]/20 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
