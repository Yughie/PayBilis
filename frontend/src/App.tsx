import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import LandingPage from "./components/templates/LandingPage";
import { LanguageProvider } from "./lib/i18n";

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <LandingPage />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
