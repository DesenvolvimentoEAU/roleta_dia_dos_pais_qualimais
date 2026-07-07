const products = [
  {
    id: 1,
    name: "Espumante Charmat",
    src: "/products/product-01.webp",
    alt: "Espumante Charmat"
  },
  {
    id: 2,
    name: "Torrontes",
    src: "/products/product-02.webp",
    alt: "Torrontes"
  },
  {
    id: 3,
    name: "Chardonnay",
    src: "/products/product-03.webp",
    alt: "Chardonnay"
  },
  {
    id: 4,
    name: "Bonarda",
    src: "/products/product-04.webp",
    alt: "Bonarda"
  },
  {
    id: 5,
    name: "Malbec Rosé",
    src: "/products/product-05.webp",
    alt: "Malbec Rosé"
  },
  {
    id: 6,
    name: "Reserva Cabernet Franc",
    src: "/products/product-06.webp",
    alt: "Reserva Cabernet Franc"
  },
  {
    id: 7,
    name: "Gran Reserva Blend",
    src: "/products/product-07.webp",
    alt: "Gran Reserva Blend"
  },
  {
    id: 8,
    name: "Naranjo",
    src: "/products/product-08.webp",
    alt: "Naranjo"
  },
  {
    id: 9,
    name: "Cabernet Sauvignon",
    src: "/products/product-09.webp",
    alt: "Cabernet Sauvignon"
  },
  {
    id: 10,
    name: "Malbec",
    src: "/products/product-10.webp",
    alt: "Malbec"
  }
];

function CarouselTrack() {
  return (
    <div className="carousel-track">
      {[...products, ...products].map((product, index) => (
        <div
          key={`${product.id}-${index}`}
          className=" text-center min-w-[220px] max-w-[220px] rounded-[1.8rem] border border-[#FFFFFF]/10 bg-[#0A0A0A] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
        >
          <div className="overflow-hidden rounded-[1.4rem] border border-[#395BA7]/20 bg-[#050505]">
            <img
              src={product.src}
              alt={product.alt}
              className="h-[260px] w-full object-contain"
            />
          </div>

          <div className="mt-4 flex items-center justify-center">
            <strong className="text-sm font-black uppercase tracking-[0.14em] text-[#FFFFFF] text-center">
              {product.name}
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