export default function Footer() {
  return (
    <footer className="bg-[#000000] px-5 py-12 text-[#FFFFFF] sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-[#FFFFFF]/10 pt-8 md:flex-row md:items-center">
        <div>
          <strong className="text-xl font-black">Importadora Qualimais</strong>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.instagram.com/importadoraqualimais/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#FFFFFF]/10 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#FFFFFF]/75 transition hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]"
          >
            Instagram
          </a>
        </div>

        <a href="https://www.instagram.com/tomholanda/" target="_blank" rel="noopener noreferrer" className="linkMinhasRedes"> Desenvolvido por{' '}
          TomHolanda
        </a>
      </div>
      <h3 className="mt-6 text-center text-sm text-[#FFFFFF]/50">
      Qualimais Distribuidora e Comercio de bebidas LTDA, CNPJ: 09.506.555/0001-84. Todos os direitos reservados Importadora Qualimais
      </h3>
    </footer>
  );
}
