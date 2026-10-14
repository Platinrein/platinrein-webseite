/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import LeafPileWind from "./components/LeafPileWind";
import SeasonalLeaves from "./components/SeasonalLeaves";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import SocialComingSoon from "./pages/SocialComingSoon";
import DocumentGenerator from "./pages/DocumentGenerator";
import { SeasonProvider } from "./context/SeasonContext";

function Home() {
  return (
    <>
      <Hero />
      <LeafPileWind />
      <Services />
      <About />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <SeasonProvider>
      <Router>
        <ScrollToTop />
        <SeasonalLeaves />
        <div className="min-h-screen">
          <Navigation />
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/social-bald" element={<SocialComingSoon />} />
              <Route path="/dokumente" element={<DocumentGenerator />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SeasonProvider>
  );
}
