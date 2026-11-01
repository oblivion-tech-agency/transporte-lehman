import { Motion } from "@/components/Motion";
import { Base } from "@/components/sections/Base";
import { Bitren } from "@/components/sections/Bitren";
import { Clients } from "@/components/sections/Clients";
import { CompanyStats } from "@/components/sections/CompanyStats";
import { Fleet } from "@/components/sections/Fleet";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Quote } from "@/components/sections/Quote";
import { Route } from "@/components/sections/Route";
import { Services } from "@/components/sections/Services";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";
import { INSTAGRAM_URL, PHONE_E164, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "@id": `${SITE_URL}/#empresa`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  image: `${SITE_URL}/img/l.jpg`,
  telephone: PHONE_E164,
  sameAs: [INSTAGRAM_URL],
  founder: { "@type": "Person", name: "Matías José Lehman" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "José Giamberardino y Bahía Blanca",
    addressLocality: "Juan Cousté, Estación Algarrobo",
    addressRegion: "Buenos Aires",
    postalCode: "8136",
    addressCountry: "AR",
  },
  areaServed: [
    "Buenos Aires",
    "Río Negro",
    "Chubut",
    "Santa Cruz",
    "Tierra del Fuego",
  ].map((name) => ({ "@type": "AdministrativeArea", name })),
  knowsAbout: ["Carga paletizada", "Carga suelta", "Rastreo satelital", "Transporte a la Patagonia"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <Hero />
      <main className="mx-auto max-w-[1200px] px-[clamp(20px,5vw,72px)]">
        <CompanyStats />
        <Services />
        <Route />
      </main>
      <Bitren />
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,5vw,72px)]">
        <Fleet />
        <Base />
        <Clients />
        <Quote />
      </div>
      <Footer />
      <WhatsAppFab />
      <Motion />
    </>
  );
}
