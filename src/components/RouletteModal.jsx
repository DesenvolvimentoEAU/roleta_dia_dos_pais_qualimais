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

  const spinDisabled = loadingSpin || mustSpin || pendingPrize || revealedPrize || wheelData.length === 0;

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
            <span className="inline-flex rounded-full border border-[#395BA7]/35 bg-[#395BA7]/14 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#BBD0FF]">
              Roleta Qualimais
            </span>

            <h2 className="mt-5 max-w-3xl text-2xl font-black leading-tight tracking-[-0.04em] text-[#FFFFFF] sm:text-4xl lg:text-5xl">
              {participant?.nome ? `${participant.nome}, gire para revelar seu prêmio.` : "Gire para revelar seu prêmio."}
            </h2>
          </div>

          <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-stretch">
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

            <aside className="roulette-info-card">
              {!pendingPrize && !revealedPrize && (
                <div className="flex h-full flex-col">
                  <div>
                    <span className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#89A6EA]">
                      Prêmios disponíveis
                    </span>
                    <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#FFFFFF]">
                      Confira a probabilidade de cada prêmio e gire a roleta para tentar a sorte.
                    </h3>
                  </div>

                  <div className="roulette-prize-list mt-5">
                    {prizes.map((prize, index) => (
                      <div key={prize.id || index} className="roulette-prize-item">
                        <span>{getPrizeLabel(index)}</span>
                        <div>
                          <strong>{getPrizeName(prize, index)}</strong>
                          <small>{Number(prize.probabilidade || 0).toFixed(0)}% de chance</small>
                        </div>
                      </div>
                    ))}
                  </div>

                  {message && (
                    <div className="mt-5 rounded-2xl border border-[#395BA7]/25 bg-[#395BA7]/10 px-4 py-3 text-sm font-bold text-[#BBD0FF]">
                      {message}
                    </div>
                  )}

                  <Button
                    onClick={handleSpin}
                    disabled={loadingSpin || mustSpin || wheelData.length === 0 || pendingPrize || revealedPrize}
                    className="mt-6 w-full"
                  >
                    {loadingSpin ? "Preparando..." : "Girar agora"}
                  </Button>
                </div>
              )}

              {pendingPrize && !revealedPrize && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#395BA7]/35 bg-[#395BA7]/14 text-2xl font-black text-[#BBD0FF]">
                    ...
                  </span>

                  <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-[#FFFFFF]">
                    Roleta em movimento
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-7 text-[#FFFFFF]/62">
                    Aguarde a roleta terminar para revelar seu prêmio.
                  </p>
                </div>
              )}

              {revealedPrize && (
                <div className="animate-resultIn">
                  <span className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#89A6EA]">
                    Seu prêmio
                  </span>

                  <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-[#FFFFFF] sm:text-4xl">
                    {revealedPrize.nome}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#FFFFFF]/66 sm:text-base">
                    {revealedPrize.entrega || "Nossa equipe validará as informações e entrará em contato para confirmar o envio do prêmio."}
                  </p>

                  <div className="mt-4 rounded-2xl border border-[#FFFFFF]/10 bg-[#000000]/35 p-4 text-sm leading-7 text-[#FFFFFF]/68">
                    Antes do envio, a equipe irá validar os dados do cadastro e o comprovante da compra.
                  </div>

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
        </div>
      </div>
    </Modal>
  );
}
