import { useMemo, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { spinRoulette } from "../api/campaignApi";
import Button from "./Button";
import Modal from "./Modal";

function getPrizeLabel(index) {
  return String(index + 1).padStart(2, "0");
}

function getPrizeName(prize, index) {
  return prize?.nome || `Prêmio ${getPrizeLabel(index)}`;
}

function getPrizeImageSrc(prize, index) {
  if (prize?.imagem_url) return prize.imagem_url;
  if (prize?.imagem) return prize.imagem;
  if (prize?.image) return prize.image;
  if (prize?.src) return prize.src;

  const safeIndex = index >= 0 ? index : Math.max(Number(prize?.id || 1) - 1, 0);
  return `/products/product-${getPrizeLabel(safeIndex)}.webp`;
}

export default function RouletteModal({
  open,
  onClose,
  prizes = [],
  participant,
  onFinished
}) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [pendingPrize, setPendingPrize] = useState(null);
  const [revealedPrize, setRevealedPrize] = useState(null);
  const [loadingSpin, setLoadingSpin] = useState(false);
  const [message, setMessage] = useState("");

  const wheelData = useMemo(() => {
    return prizes.map((_, index) => ({
      option: getPrizeLabel(index)
    }));
  }, [prizes]);

  const selectedPrize = revealedPrize || pendingPrize;

  const selectedPrizeIndex = useMemo(() => {
    if (!selectedPrize) return -1;
    return prizes.findIndex((item) => item.id === selectedPrize.id);
  }, [prizes, selectedPrize]);

  const revealedPrizeIndex = useMemo(() => {
    if (!revealedPrize) return -1;
    return prizes.findIndex((item) => item.id === revealedPrize.id);
  }, [prizes, revealedPrize]);

  const revealedPrizeImage = revealedPrize
    ? getPrizeImageSrc(revealedPrize, revealedPrizeIndex)
    : "";

  const spinDisabled =
    loadingSpin ||
    mustSpin ||
    pendingPrize ||
    revealedPrize ||
    wheelData.length === 0;

  async function handleSpin() {
    if (!participant?.id || spinDisabled) return;

    setLoadingSpin(true);
    setMessage("");

    try {
      const prize = await spinRoulette(participant.id);
      const index = prizes.findIndex((item) => item.id === prize.id);

      setPendingPrize(prize);
      setPrizeNumber(index >= 0 ? index : 0);
      setMustSpin(true);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoadingSpin(false);
    }
  }

  function handleStopSpinning() {
    setMustSpin(false);
    setRevealedPrize(pendingPrize);
    onFinished?.(pendingPrize);
  }

  return (
    <Modal open={open} onClose={() => !mustSpin && onClose()} size="xl">
      <div className="roulette-modal-card">
        <div className="roulette-modal-bg" />

        <div className="relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="logoERoleta" >
            <span className="inline-flex rounded-full border border-[#395BA7]/35 bg-[#395BA7]/14 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#BBD0FF]">
              Roleta Qualimais
            </span>
            <img
            src="/hero/logoExpreso.webp"
            alt="Importadora Qualimais"
            className="mb-7 h-auto w-[180px] max-w-full sm:w-[220px] lg:w-[260px]"
          />
          </div>

            <h2 className="textoGire">
              {participant?.nome
                ? `${participant.nome}, gire para revelar seu prêmio.`
                : "Gire para revelar seu prêmio."}
            </h2>
          </div>

          <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_410px] xl:items-stretch">
            <section className="roulette-panel">
              <div className="roulette-stage">
                <div className="roulette-pointer" />
                <div className="roulette-glow" />

                <div className="roulette-modern">
                  {wheelData.length > 0 && (
                    <Wheel
                      mustStartSpinning={mustSpin}
                      prizeNumber={prizeNumber}
                      data={wheelData}
                      onStopSpinning={handleStopSpinning}
                      backgroundColors={[
                        "#395BA7",
                        "#0F172A",
                        "#4C73CA",
                        "#101010",
                        "#89A6EA"
                      ]}
                      pointerProps={{
                        style: {
                          display: "none"
                        }
                      }}
                      textColors={["#FFFFFF", "#FFFFFF"]}
                      outerBorderColor="#FFFFFF"
                      outerBorderWidth={6}
                      innerBorderColor="#050505"
                      innerBorderWidth={18}
                      innerRadius={20}
                      radiusLineColor="rgba(255,255,255,0.32)"
                      radiusLineWidth={1}
                      fontFamily="Inter"
                      fontSize={24}
                      textDistance={70}
                      spinDuration={0.75}
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSpin}
                  disabled={spinDisabled}
                  className="roulette-center-badge cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                  aria-label="Girar roleta"
                >
                  <span>{loadingSpin ? "Preparando" : mustSpin ? "Girando" : "Gire"}</span>
                  <strong>{loadingSpin || mustSpin ? "..." : "&"}</strong>
                  <span>{loadingSpin ? "aguarde" : mustSpin ? "boa sorte" : "Brinde"}</span>
                </button>
              </div>
            </section>

            <aside className="roulette-result-card">
              {!pendingPrize && !revealedPrize && (
                <div className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <span className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#89A6EA]">
                      Hora de girar
                    </span>

                    <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#FFFFFF]">
                      Clique no botão central da roleta ou no botão abaixo para descobrir seu prêmio.
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#FFFFFF]/62">
                      O resultado será exibido com o número sorteado, o nome do prêmio e a imagem do produto.
                    </p>
                  </div>

                  {message && (
                    <div className="rounded-2xl border border-[#395BA7]/25 bg-[#395BA7]/10 px-4 py-3 text-sm font-bold text-[#BBD0FF]">
                      {message}
                    </div>
                  )}

                  <Button
                    onClick={handleSpin}
                    disabled={spinDisabled}
                    className="w-full"
                  >
                    {loadingSpin ? "Preparando..." : "Girar agora"}
                  </Button>
                </div>
              )}

              {pendingPrize && !revealedPrize && (
                <div className="roulette-action-state">
                  <span className="roulette-loading-orb">...</span>

                  <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-[#FFFFFF]">
                    Roleta em movimento
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-7 text-[#FFFFFF]/62">
                    Aguarde a roleta parar para revelar o prêmio sorteado.
                  </p>

                </div>
              )}

              {revealedPrize && (
                <div className="animate-resultIn">
                  <span className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#89A6EA]">
                    Seu prêmio
                  </span>

                  <div className="roulette-result-image-card mt-4">
                    <img
                      src={revealedPrizeImage}
                      alt={revealedPrize.nome}
                      loading="lazy"
                    />

                    <div className="roulette-result-number">
                      Número sorteado: {getPrizeLabel(revealedPrizeIndex >= 0 ? revealedPrizeIndex : prizeNumber)}
                    </div>
                  </div>

                  <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.04em] text-[#FFFFFF] sm:text-4xl">
                    {revealedPrize.nome}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#FFFFFF]/66 sm:text-base">
                    {revealedPrize.entrega ||
                      "Nossa equipe validará as informações e entrará em contato para confirmar o envio do prêmio."}
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                    <a
                      href="https://www.instagram.com/importadoraqualimais/"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-[#FFFFFF] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-[#050505] transition hover:-translate-y-1 hover:bg-[#DDE6FF]"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              )}
            </aside>
          </div>

          <section className="roulette-prize-consult">
            <div className="roulette-prize-consult-header">
              <div>
                <span className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#89A6EA]">
                  Prêmios disponíveis
                </span>

                <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#FFFFFF]">
                  Confira a probabilidade de cada prêmio e acompanhe qual item foi sorteado.
                </h3>
              </div>

              {revealedPrize && (
                <div className="roulette-winner-pill">
                  Você ganhou o prêmio {getPrizeLabel(revealedPrizeIndex >= 0 ? revealedPrizeIndex : prizeNumber)}
                </div>
              )}
            </div>

            <div className="roulette-prize-list roulette-prize-list-bottom mt-5">
              {prizes.map((prize, index) => {
                const isPending = pendingPrize?.id === prize.id && !revealedPrize;
                const isWinner = revealedPrize?.id === prize.id;

                return (
                  <div
                    key={prize.id || index}
                    className={[
                      "roulette-prize-item",
                      isPending ? "is-pending" : "",
                      isWinner ? "is-winner" : ""
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span>{getPrizeLabel(index)}</span>

                    <div>
                      <strong>{getPrizeName(prize, index)}</strong>
                      <small>
                        {Number(prize.probabilidade || 0).toFixed(0)}% de chance
                      </small>

                      {isWinner && (
                        <em className="roulette-prize-status">Prêmio sorteado</em>
                      )}

                      {isPending && (
                        <em className="roulette-prize-status">Resultado em processamento</em>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
}
