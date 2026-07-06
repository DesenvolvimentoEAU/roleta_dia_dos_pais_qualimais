export default function BrandStory() {
  return (
    <section className="bg-[#050505] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.22em] text-[#89A6EA]">
            Expreso Bodeguero
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-[#FFFFFF] sm:text-5xl">
            Uma campanha voltada para presentear.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              title: "Comprovante obrigatório",
              text: "O participante precisa enviar o comprovante da compra junto com o cadastro para validação manual da equipe."
            },
            {
              title: "Validação antes da entrega",
              text: "Informamos ao usuário que todos os dados e o comprovante serão conferidos antes do envio de qualquer prêmio."
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-[#FFFFFF]/8 bg-[#0D0D0D] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
            >
              <h3 className="text-xl font-black text-[#FFFFFF]">{item.title}</h3>
              <p className="mt-3 leading-7 text-[#FFFFFF]/68">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
