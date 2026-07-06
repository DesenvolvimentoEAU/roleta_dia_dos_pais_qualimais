import { useEffect, useState } from "react";
import { fetchPrizes, registerParticipant } from "./api/campaignApi";
import BrandStory from "./components/BrandStory";
import CampaignFormModal from "./components/CampaignFormModal";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import LandingHero from "./components/LandingHero";
import LgpdModal from "./components/LgpdModal";
import ProbabilityGrid from "./components/ProbabilityGrid";
import ProductCarousel from "./components/ProductCarousel";
import RouletteModal from "./components/RouletteModal";

export default function App() {
  const [prizes, setPrizes] = useState([]);
  const [participant, setParticipant] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [rouletteOpen, setRouletteOpen] = useState(false);
  const [lgpdOpen, setLgpdOpen] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    loadPrizes();
  }, []);

  async function loadPrizes() {
    try {
      const data = await fetchPrizes();
      setPrizes(data);
    } catch (error) {
      setLoadError(error.message);
    }
  }

  async function handleRegister(formData) {
    const createdParticipant = await registerParticipant(formData);
    setParticipant(createdParticipant);
    setFormOpen(false);
    setRouletteOpen(true);
  }

  return (
    <div className="min-h-screen bg-[#000000]">
      {loadError && (
        <div className="fixed left-1/2 top-4 z-[60] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-[#395BA7]/30 bg-[#050505] px-5 py-4 text-center text-sm font-bold text-[#89A6EA] shadow-2xl">
          {loadError}
        </div>
      )}

      <LandingHero
        onOpenForm={() => setFormOpen(true)}
        onOpenLgpd={() => setLgpdOpen(true)}
      />

      <ProductCarousel />

      <BrandStory />

      <HowItWorks onOpenForm={() => setFormOpen(true)} />


      <ProbabilityGrid prizes={prizes} />

      <Footer />

      <CampaignFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleRegister}
        onOpenLgpd={() => setLgpdOpen(true)}
      />

      <RouletteModal
        open={rouletteOpen}
        onClose={() => setRouletteOpen(false)}
        prizes={prizes}
        participant={participant}
      />

      <LgpdModal open={lgpdOpen} onClose={() => setLgpdOpen(false)} />
    </div>
  );
}
