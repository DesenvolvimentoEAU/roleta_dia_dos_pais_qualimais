const products = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  src: `/products/product-${String(index + 1).padStart(2, "0")}.webp`,
  alt: `Produto prêmio ${index + 1}`
}));

function CarouselTrack() {
  return (
    <div className="carousel-track">
      {[...products, ...products].map((product, index) => (
        <div
          key={`${product.id}-${index}`}
          className="min-w-[220px] max-w-[220px] rounded-[1.8rem] border border-[#FFFFFF]/10 bg-[#0A0A0A] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
        >
          <div className="overflow-hidden rounded-[1.4rem] border border-[#395BA7]/20 bg-[#050505]">
            <img
              src={product.src}
              alt={product.alt}
              className="h-[260px] w-full object-cover"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <strong className="text-sm font-black uppercase tracking-[0.14em] text-[#FFFFFF]">
              Prêmio {product.id}
            </strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductCarousel() {
  return (
    <section className="overflow-hidden border-y border-[#FFFFFF]/6 bg-[#030303] py-8">
      <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#89A6EA]">
            Produtos em destaque
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#FFFFFF] sm:text-4xl">
            Prêmios da roleta.
          </h2>
        </div>
      </div>
      <div className="carousel-mask">
        <CarouselTrack />
      </div>
    </section>
  );
}
