import { useMemo, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { spinRoulette } from "../api/campaignApi";
import Button from "./Button";
import Modal from "./Modal";

const wheelSliceColors = [
  "#2528BA",
  "#FA6B05",
  "#8300E0",
  "#FAE900",
  "#00A6FB",
  "#F72585",
  "#06D6A0",
  "#FA0606",
  "#FFB703",
  "#3A0CA3"
];

const wheelTextColors = [
  "#FFFFFF",
  "#000000",
  "#FFFFFF",
  "#000000",
  "#000000",
  "#FFFFFF",
  "#000000",
  "#FFFFFF",
  "#000000",
  "#FFFFFF"
];

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
  const [sharingPrize, setSharingPrize] = useState(false);
  const [shareMessage, setShareMessage] = useState("");


  const wheelData = useMemo(() => {
    return prizes.map((_, index) => ({
      option: getPrizeLabel(index)
    }));
  }, [prizes]);

  const revealedPrizeIndex = useMemo(() => {
    if (!revealedPrize) return -1;
    return prizes.findIndex((item) => item.id === revealedPrize.id);
  }, [prizes, revealedPrize]);

  const revealedPrizeImage = revealedPrize
    ? getPrizeImageSrc(revealedPrize, revealedPrizeIndex)
    : "";

  const revealedPrizeNumber = getPrizeLabel(
    revealedPrizeIndex >= 0 ? revealedPrizeIndex : prizeNumber
  );

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
    if (!pendingPrize) {
      setMustSpin(false);
      return;
    }

    setMustSpin(false);
    setRevealedPrize(pendingPrize);
    onFinished?.(pendingPrize);
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  async function createWinnerShareImage() {
    const canvas = document.createElement("canvas");
    const width = 1080;
    const height = 1920;
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#050505");
    gradient.addColorStop(0.35, "#2528BA");
    gradient.addColorStop(0.68, "#8300E0");
    gradient.addColorStop(1, "#FA6B05");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.arc(150, 180, 260, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(251, 255, 0, 0.12)";
    ctx.beginPath();
    ctx.arc(920, 420, 340, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.arc(900, 1550, 420, 0, Math.PI * 2);
    ctx.fill();

    try {
      const logo = await loadImage("/hero/logoExpreso.webp");
      const logoWidth = 360;
      const logoHeight = (logo.height / logo.width) * logoWidth;
      ctx.drawImage(logo, (width - logoWidth) / 2, 110, logoWidth, logoHeight);
    } catch {
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 54px Arial";
      ctx.textAlign = "center";
      ctx.fillText("EXPRESO BODEGUERO", width / 2, 190);
    }

    ctx.fillStyle = "#FBFF00";
    ctx.font = "900 74px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GANHEI NA ROLETA!", width / 2, 380);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 36px Arial";
    ctx.fillText("Campanha especial Dia dos Pais", width / 2, 435);

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
    ctx.shadowBlur = 35;
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.roundRect(110, 530, 860, 780, 48);
    ctx.fill();
    ctx.restore();

    try {
      const prizeImage = await loadImage(revealedPrizeImage);
      const boxX = 170;
      const boxY = 590;
      const boxW = 740;
      const boxH = 620;

      const imageRatio = prizeImage.width / prizeImage.height;
      const boxRatio = boxW / boxH;

      let drawW = boxW;
      let drawH = boxH;

      if (imageRatio > boxRatio) {
        drawH = boxW / imageRatio;
      } else {
        drawW = boxH * imageRatio;
      }

      const drawX = boxX + (boxW - drawW) / 2;
      const drawY = boxY + (boxH - drawH) / 2;

      ctx.drawImage(prizeImage, drawX, drawY, drawW, drawH);
    } catch {
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 42px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Imagem do prêmio", width / 2, 900);
    }

    ctx.fillStyle = "#FBFF00";
    ctx.font = "900 34px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`PRÊMIO Nº ${revealedPrizeNumber}`, width / 2, 1395);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 54px Arial";
    ctx.textAlign = "center";

    const prizeName = revealedPrize?.nome || "Meu prêmio";
    const words = prizeName.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width > 850 && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    lines.slice(0, 3).forEach((line, index) => {
      ctx.fillText(line, width / 2, 1480 + index * 64);
    });

    ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
    ctx.font = "700 30px Arial";
    ctx.fillText("Eu participei da campanha Expreso Bodeguero", width / 2, 1730);
    ctx.fillText("e girei a roleta especial de Dia dos Pais.", width / 2, 1770);

    ctx.fillStyle = "#FBFF00";
    ctx.font = "900 32px Arial";
    ctx.fillText("www.campanhaexpresobodeguero.com.br", width / 2, 1845);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png", 0.95);
    });
  }

  async function handleShareWinner() {
    if (!revealedPrize) return;

    setSharingPrize(true);
    setShareMessage("");

    try {
      const blob = await createWinnerShareImage();
      const file = new File(
        [blob],
        `roleta-expreso-bodeguero-premio-${revealedPrizeNumber}.png`,
        { type: "image/png" }
      );

      const text = `Ganhei ${revealedPrize.nome} na Roleta Dia dos Pais Expreso Bodeguero! Participe também: https://www.campanhaexpresobodeguero.com.br/`;

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Ganhei na Roleta Dia dos Pais",
          text,
          files: [file]
        });
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: "Ganhei na Roleta Dia dos Pais",
          text,
          url: "https://www.campanhaexpresobodeguero.com.br/"
        });
        return;
      }

      const imageUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `roleta-expreso-bodeguero-premio-${revealedPrizeNumber}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(imageUrl);

      window.open(
        `https://wa.me/?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
      );

      setShareMessage("Imagem baixada. Você pode compartilhar nas redes sociais ou enviar pelo WhatsApp.");
    } catch {
      setShareMessage("Não foi possível gerar a imagem de compartilhamento. Tente novamente.");
    } finally {
      setSharingPrize(false);
    }
  }

  return (
    <Modal open={open} onClose={() => !mustSpin && onClose()} size="xl">
      <div className="roulette-modal-card">
        <div className="roulette-modal-bg" />

        <div className="relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="logoERoleta">
              <span className="inline-flex rounded-full border border-[#395BA7]/35 bg-[#395BA7]/14 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#BBD0FF]">
                Roleta Qualimais
              </span>

              <img
                src="/hero/logoExpreso.webp"
                alt="Importadora Qualimais"
                className="mb-7 h-auto w-[180px] max-w-full sm:w-[220px] lg:w-[260px]"
              />
            </div>
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
                  Você ganhou o prêmio {revealedPrizeNumber}
                </div>
              )}
            </div>

            <div className="roulette-prize-list roulette-prize-list-bottom mt-5">
              {prizes.map((prize, index) => {
                const isWinner = revealedPrize?.id === prize.id;

                return (
                  <div
                    key={prize.id || index}
                    className={[
                      "roulette-prize-item",
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
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {!revealedPrize && (
            <h2 className="textoGire">
              {participant?.nome
                ? `${participant.nome}, gire para revelar seu prêmio.`
                : "Gire para revelar seu prêmio."}
            </h2>
          )}

          {!revealedPrize ? (
            <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_410px] xl:items-stretch">
              <section className="roulette-panel">
                <div className="roulette-stage">
                  <div className="roulette-pointer" />
                  <div className="roulette-glow" />
                  <div className="roulette-rim-aurora" aria-hidden="true" />

                  <div className="roulette-bulb-ring" aria-hidden="true">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <span
                        key={index}
                        style={{ "--bulb-index": index }}
                      />
                    ))}
                  </div>

                  <div className="roulette-confetti-ring" aria-hidden="true">
                    {Array.from({ length: 18 }).map((_, index) => (
                      <span
                        key={index}
                        style={{ "--spark-index": index }}
                      />
                    ))}
                  </div>

                  <div className="roulette-modern">
                    {wheelData.length > 0 && (
                      <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={wheelData}
                        onStopSpinning={handleStopSpinning}
                        backgroundColors={wheelSliceColors}
                        pointerProps={{
                          style: {
                            display: "none"
                          }
                        }}
                        textColors={wheelTextColors}
                        outerBorderColor="#FFFDF2"
                        outerBorderWidth={10}
                        innerBorderColor="#08030F"
                        innerBorderWidth={20}
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
                {!pendingPrize && (
                  <div className="disposicaoGirar">
                    <div>
                      <span className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#89A6EA]">
                        Hora de girar
                      </span>

                      <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#FFFFFF]">
                        Clique no botão central da roleta ou no botão abaixo para descobrir seu prêmio.
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-[#FFFFFF]/62">
                        O resultado só será revelado depois que a roleta parar completamente.
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
              </aside>
            </div>
          ) : (
            <section className="roulette-winner-stage animate-resultIn">
              <div className="roulette-winner-media">
                <div className="roulette-result-image-card">
                  <img
                    src={revealedPrizeImage}
                    alt={revealedPrize.nome}
                    loading="lazy"
                  />

                  <div className="roulette-result-number">
                    Número sorteado: {revealedPrizeNumber}
                  </div>
                </div>
              </div>

              <div className="roulette-winner-content">
                <span className="ganhouAnimado">
                  GANHOU!!
                </span>

                <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em] text-[#FFFFFF] sm:text-5xl">
                  {revealedPrize.nome}
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#FFFFFF] sm:text-base">
                  <u><strong>{revealedPrize.entrega ||
                    "Nossa equipe validará as informações e entrará em contato para confirmar o envio do prêmio."}</strong></u>
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  <a
                    href="https://www.instagram.com/importadoraqualimais/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-[#FFFFFF] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-[#050505] transition hover:-translate-y-1 hover:bg-[#DDE6FF]"
                  >
                    Instagram Importadora Qualimais
                  </a>

                  <button
                    type="button"
                    onClick={handleShareWinner}
                    disabled={sharingPrize}
                    className="rounded-2xl border border-[#FBFF00]/40 bg-[#FBFF00] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-[#050505] transition hover:-translate-y-1 hover:bg-[#FFFFFF] disabled:pointer-events-none disabled:opacity-60"
                  >
                    {sharingPrize ? "Gerando..." : "Compartilhar Minha Vitória"}
                  </button>
                </div>

                {shareMessage && (
                  <div className="mt-4 rounded-2xl border border-[#FBFF00]/20 bg-[#FBFF00]/10 px-4 py-3 text-sm font-bold leading-6 text-[#FBFF00]">
                    {shareMessage}
                  </div>
                )}
              </div>
            </section>
          )}


        </div>
      </div>
    </Modal>
  );
}
