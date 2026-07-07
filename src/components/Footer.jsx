export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#000000] px-5 py-12 text-[#FFFFFF] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(57,91,167,0.16),transparent_28%),radial-gradient(circle_at_90%_80%,rgba(57,91,167,0.10),transparent_25%)]" />
      <div className="validadePromocao">
          <p className="textoPromocao">
               <strong><u>Promoção válida para restaurantes participantes</u></strong> na compra de 1 garrafa Expresso Bodeguero, do dia <strong><u>01/08/2026 a 09/08/2026.</u></strong> <br></br>Participação somente para maiores de 18 anos, válido 1 por cpf. <br></br>Se beber, não dirija.
          </p>
        </div>
      <div className="relative mx-auto max-w-7xl border-t border-[#FFFFFF]/10 pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="flex flex-col items-start">
            <img
              src="/footer/logo_qualimais.webp"
              alt="Importadora Qualimais"
              className="h-auto w-[190px] max-w-full sm:w-[230px]"
            />

            <p className="mt-6 max-w-3xl text-sm leading-7 text-[#FFFFFF]/64 sm:text-base sm:leading-8">
              A Qualimais é uma importadora boutique especializada em rótulos exclusivos e é a responsável por trazer as marcas importadas Expreso Bodeguero e Tres Palacios ao Brasil. Também possui parceria com a Constellation Brands, empresa norte-americana considerada uma das maiores produtoras e comercializadoras de vinhos de luxo no mundo - uma empresa Fortune.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-[2rem] border border-[#FFFFFF]/10 bg-[#FFFFFF]/5 p-5 backdrop-blur-xl sm:p-6 lg:ml-auto lg:w-full lg:max-w-sm">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#89A6EA]">
                Acompanhe a Qualimais
              </span>

              <p className="mt-3 text-sm leading-6 text-[#FFFFFF]/58">
                Fique por dentro das campanhas, novidades e rótulos especiais.
              </p>
            </div>

            <a
              href="https://www.instagram.com/importadoraqualimais/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-[#FFFFFF]/10 bg-[#FFFFFF] px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#050505] transition hover:-translate-y-1 hover:bg-[#DDE6FF]"
            >
              Instagram Qualimais
            </a>

          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#FFFFFF]/10 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <h3 className="text-xs leading-6 text-[#FFFFFF]/45 sm:text-sm">
            Qualimais Distribuidora e Comercio de bebidas LTDA, CNPJ: 09.506.555/0001-84.
          </h3>

          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#FFFFFF]/38">
            Todos os direitos reservados
          </span>
        </div>
            <a href="https://www.instagram.com/tomholanda/" target="_blank" rel="noopener noreferrer" className="linkMinhasRedes"> Desenvolvido por{' '} TomHolanda </a>
      </div>
    </footer>
  );
}