export default function ProbabilityGrid({ prizes = [] }) {
  return (
    <section className="bg-[#000000] px-5 py-24 text-[#FFFFFF] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#89A6EA]">
              Transparência
            </span>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Probabilidade DE GANHOS.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {prizes.map((prize) => (
            <article
              key={prize.id}
              className="rounded-[1.7rem] border border-[#FFFFFF]/8 bg-[#0A0A0A] p-5"
            >
              <strong className="block min-h-12 text-lg font-black text-[#FFFFFF]">
                {prize.nome}
              </strong>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#FFFFFF]/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#395BA7] to-[#89A6EA]"
                  style={{
                    width: `${Number(prize.probabilidade || 0)}%`
                  }}
                />
              </div>
              <span className="mt-4 block text-3xl font-black text-[#89A6EA]">
                {Number(prize.probabilidade).toFixed(0)}%
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
