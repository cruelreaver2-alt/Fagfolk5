import { useState } from "react";
import { Link } from "react-router";
import {
  Hammer,
  Wrench,
  Zap,
  Paintbrush,
  Star,
  ChevronLeft,
  ChevronRight,
  Mail,
  Home,
  Wind,
  Construction,
  CheckCircle,
  Shield,
  Award,
  ClipboardList,
  Users,
  ThumbsUp
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Header } from "../components/Header";

const categories = [
  { name: "Tømrer", icon: Hammer, color: "#E07B3E" },
  { name: "Rørlegger", icon: Wrench, color: "#17384E" },
  { name: "Elektro", icon: Zap, color: "#E07B3E" },
  { name: "Maling", icon: Paintbrush, color: "#17384E" },
  { name: "Entreprenør", icon: Construction, color: "#E07B3E" },
  { name: "Garasjeport", icon: Home, color: "#17384E" },
  { name: "Varmepumpe", icon: Wind, color: "#E07B3E" },
];

const professionals = [
  {
    id: 1,
    name: "Ole Hansen",
    rating: 4.9,
    reviews: 47,
    specialty: "Tømrer",
    image: "https://images.unsplash.com/photo-1667922578520-61558e79aa7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW4lMjBjYXJwZW50ZXIlMjB3b3JraW5nfGVufDF8fHx8MTc3MzA3NzEwMXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: "Kari Johansen",
    rating: 5.0,
    reviews: 62,
    specialty: "Rørlegger",
    image: "https://images.unsplash.com/photo-1764328165995-0624c280a6d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMwNzcxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "Erik Nilsen",
    rating: 4.8,
    reviews: 38,
    specialty: "Elektriker",
    image: "https://images.unsplash.com/photo-1659353588580-8da374e328a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbCUyMG1hbGV8ZW58MXx8fHwxNzczMDc3MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
];

export function Landing() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [currentProfessional, setCurrentProfessional] = useState(0);

  const nextProfessional = () => {
    setCurrentProfessional((prev) => (prev + 1) % professionals.length);
  };

  const prevProfessional = () => {
    setCurrentProfessional((prev) => (prev - 1 + professionals.length) % professionals.length);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Pilot Banner */}
      <div className="bg-gradient-to-r from-[#E07B3E] to-[#d16f35] text-white py-3 px-4">
        <div className="max-w-[1366px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="text-2xl">🚀</span>
            <p className="text-sm sm:text-base font-medium">
              <strong>Bli testpilot!</strong> Kostnadsfri pilot-fase – De 20 første leverandørene får 40% rabatt i 6 mnd
            </p>
          </div>
          <Link
            to="/pilot"
            className="h-10 px-6 bg-white text-[#E07B3E] rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2 touch-manipulation whitespace-nowrap text-sm sm:text-base"
          >
            Les mer →
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="pt-6 pb-8 px-4 sm:px-6 lg:px-24 max-w-[1366px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8">
          <div className="flex-1">
            <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-[#111827] mb-3">
              Finn lokale fagfolk — raskt, trygt og fagmessig.
            </h1>
            <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#6B7280] leading-[1.47] mb-6">
              Få kuraterte, fastpris- eller detaljtilbud fra godkjente håndverkere i ditt område.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/registrer"
                className="flex items-center justify-center h-12 sm:h-14 px-6 bg-[#E07B3E] text-white rounded-lg font-semibold hover:bg-[#d16f35] transition-colors touch-manipulation"
              >
                Bli kunde - Gratis
              </Link>
              <Link
                to="/pilot"
                className="flex items-center justify-center h-12 sm:h-14 px-6 border-2 border-[#17384E] text-[#17384E] rounded-lg font-semibold hover:bg-[#17384E] hover:text-white transition-colors touch-manipulation"
              >
                🚀 Bli testpilot
              </Link>
            </div>
          </div>
          
          <div className="flex-1 lg:max-w-[500px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1771122453274-d3270e73cf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwd29yayUyMHRvb2xzfGVufDF8fHx8MTc3MzA3NzEwMnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Fagfolk på arbeid"
              className="w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
        
        {/* Trust Strip */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-12 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#17384E]" />
            <span className="text-[12px] sm:text-[13px] text-[#6B7280]">Verifiserte fagfolk</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#17384E]" />
            <span className="text-[12px] sm:text-[13px] text-[#6B7280]">Sikker betaling</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#17384E]" />
            <span className="text-[12px] sm:text-[13px] text-[#6B7280]">Lovpålagte godkjenninger</span>
          </div>
        </div>
      </section>

      {/* Verification Requirements Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-[1366px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-[24px] sm:text-[28px] lg:text-[36px] font-bold text-[#111827] mb-3">
              ✅ Bare verifiserte håndverkere
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#6B7280] max-w-3xl mx-auto">
              Alle leverandører på Håndtverkeren må dokumentere og inneha alle lovpålagte 
              godkjenninger og sertifiseringer for sitt fagområde. Vi godkjenner <strong>IKKE</strong> noen 
              uten korrekt dokumentasjon.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
            <h3 className="text-xl font-bold text-[#111827] mb-6 text-center">
              📋 Krav for godkjenning
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Generelle krav */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Generelle krav (alle fagområder)
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 text-sm">Ansvarsforsikring</p>
                      <p className="text-xs text-green-700">Gyldig yrkesskadeforsikring minimum 10 mill. kr</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 text-sm">Organisasjonsnummer</p>
                      <p className="text-xs text-green-700">Registrert i Brønnøysundregistrene</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 text-sm">ID-verifisering</p>
                      <p className="text-xs text-green-700">BankID eller tilsvarende godkjent ID</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fagspesifikke krav */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
                <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Fagspesifikke krav (avhenger av fagområde)
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 text-sm">Fagbrev / Svennebrev</p>
                      <p className="text-xs text-amber-700">Dokumentert kompetanse i fagområdet</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 text-sm">Offentlige godkjenninger</p>
                      <p className="text-xs text-amber-700">DSB, kommunal godkjenning, etc.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900 text-sm">HMS-kurs</p>
                      <p className="text-xs text-amber-700">Påkrevde sikkerhetskurs for fagområdet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Eksempler på fagspesifikke krav */}
            <div className="border-t-2 border-gray-200 pt-6">
              <h4 className="font-bold text-[#111827] mb-4 text-center">
                Eksempler på fagspesifikke krav:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-900 text-sm mb-2">⚡ Elektriker</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• DSB Elvirksomhetsregistrering</li>
                    <li>• Fagbrev elektriker</li>
                    <li>• Autorisasjon fra DSB</li>
                  </ul>
                </div>
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                  <p className="font-semibold text-cyan-900 text-sm mb-2">🔧 Rørlegger</p>
                  <ul className="text-xs text-cyan-700 space-y-1">
                    <li>• Kommunal godkjenning</li>
                    <li>• Fagbrev rørlegger</li>
                    <li>• VA-autorisasjon</li>
                  </ul>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="font-semibold text-orange-900 text-sm mb-2">🏠 Tømrer / Tak</p>
                  <ul className="text-xs text-orange-700 space-y-1">
                    <li>• HMS-kort</li>
                    <li>• Fallsikring A og B</li>
                    <li>• Fagbrev (anbefalt)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Process */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-[#111827] mb-6 text-center">
              🔍 Vår verifiseringsprosess
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-semibold text-[#111827] mb-2 text-sm">
                  Registrering
                </h4>
                <p className="text-xs text-[#6B7280]">
                  Leverandør oppretter konto og laster opp alle påkrevde dokumenter
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-amber-600">2</span>
                </div>
                <h4 className="font-semibold text-[#111827] mb-2 text-sm">
                  Automatisk sjekk
                </h4>
                <p className="text-xs text-[#6B7280]">
                  Systemet sjekker automatisk om alle obligatoriske dokumenter er lastet opp
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-semibold text-[#111827] mb-2 text-sm">
                  Manuell verifisering
                </h4>
                <p className="text-xs text-[#6B7280]">
                  Vårt team gjennomgår og verifiserer alle dokumenter manuelt
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-green-600">4</span>
                </div>
                <h4 className="font-semibold text-[#111827] mb-2 text-sm">
                  Godkjenning
                </h4>
                <p className="text-xs text-[#6B7280]">
                  Kun leverandører med gyldige dokumenter får tilgang til plattformen
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-red-900 mb-2">
                    ⚠️ Ingen snarveier – kun profesjonelle håndverkere
                  </h4>
                  <p className="text-sm text-red-800 mb-3">
                    Vi godkjenner <strong>IKKE</strong> leverandører som mangler lovpålagte 
                    sertifiseringer eller godkjenninger. Dette er et ufravikelig krav for å 
                    sikre kvalitet og trygghet for våre kunder.
                  </p>
                  <p className="text-xs text-red-700">
                    <strong>Automatisk avslag:</strong> Søknader uten fullstendige dokumenter 
                    avslås automatisk av systemet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-24 bg-white">
        <div className="max-w-[1366px] mx-auto">
          <h2 className="text-[22px] sm:text-[24px] lg:text-[32px] font-bold text-center text-[#111827] mb-6 sm:mb-8">
            Hvordan det fungerer
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: ClipboardList,
                title: "1. Beskriv jobben",
                description: "Fyll ut et enkelt skjema om hva du trenger hjelp til."
              },
              {
                icon: Users,
                title: "2. Motta tilbud",
                description: "Få tilbud fra kvalifiserte fagfolk i ditt område innen 24 timer."
              },
              {
                icon: ThumbsUp,
                title: "3. Velg og fullfør",
                description: "Sammenlign, velg det beste tilbudet og få jobben gjort."
              }
            ].map((step, index) => (
              <div
                key={index}
                onClick={() => setSelectedStep(index)}
                className="bg-white rounded-lg p-5 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow touch-manipulation"
                style={{ boxShadow: '0 6px 18px rgba(23, 56, 78, 0.08)' }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E07B3E] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#111827] mb-2">{step.title}</h3>
                <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secure Payment Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-[1366px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-[24px] sm:text-[28px] lg:text-[36px] font-bold text-[#111827] mb-3">
              💰 Sikker betaling via Håndtverkeren
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#6B7280] max-w-2xl mx-auto">
              Vi beskytter både kunder og leverandører med vår trygge escrow-løsning.
              Ingen betaler før jobben er godkjent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* For Customers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">
                    For kunder
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    Full trygghet når du bestiller arbeid
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#111827] mb-1">
                      Pengene holdes sikret
                    </h4>
                    <p className="text-sm text-[#6B7280]">
                      Når du godkjenner et tilbud, betaler du til en sperret konto. 
                      Leverandøren får ikke pengene før du godkjenner arbeidet.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#111827] mb-1">
                      Godkjenn når du er fornøyd
                    </h4>
                    <p className="text-sm text-[#6B7280]">
                      Først når du markerer jobben som fullført, frigjøres pengene
                      automatisk til leverandøren.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#111827] mb-1">
                      Beskyttelse ved uenigheter
                    </h4>
                    <p className="text-sm text-[#6B7280]">
                      Hvis noe går galt, har vi tvisteløsning som sikrer begge parter
                      får en rettferdig behandling.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Service-gebyr:</strong> 1% av totalprisen (inkludert i betalingen)
                  </p>
                </div>
              </div>
            </div>

            {/* For Suppliers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Hammer className="w-6 h-6 text-[#E07B3E]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">
                    For leverandører
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    Garantert betaling når jobben er ferdig
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#111827] mb-1">
                      Vit at pengene er på plass
                    </h4>
                    <p className="text-sm text-[#6B7280]">
                      Når kunden godkjenner tilbudet ditt, er pengene allerede sikret.
                      Du kan starte arbeidet trygt.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#111827] mb-1">
                      Automatisk utbetaling
                    </h4>
                    <p className="text-sm text-[#6B7280]">
                      Når kunden markerer jobben som fullført, får du pengene
                      automatisk utbetalt - ingen jakt på betaling.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#111827] mb-1">
                      Beskyttelse mot svindel
                    </h4>
                    <p className="text-sm text-[#6B7280]">
                      Escrow-systemet sikrer at du alltid får betalt for arbeidet du
                      utfører, med full dokumentasjon.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Service-gebyr:</strong> 1% av totalprisen (trekkes fra utbetalingen)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How Escrow Works Timeline */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-[#111827] mb-6 text-center">
              Slik fungerer betalingen i praksis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-semibold text-[#111827] mb-2">
                  Godkjenn tilbud
                </h4>
                <p className="text-sm text-[#6B7280]">
                  Kunden godkjenner tilbudet og betaler til sperret konto
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <h4 className="font-semibold text-[#111827] mb-2">
                  Arbeidet utføres
                </h4>
                <p className="text-sm text-[#6B7280]">
                  Leverandøren starter og fullfører arbeidet som avtalt
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-semibold text-[#111827] mb-2">
                  Kunden godkjenner
                </h4>
                <p className="text-sm text-[#6B7280]">
                  Kunden inspiserer arbeidet og markerer det som fullført
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-amber-600">4</span>
                </div>
                <h4 className="font-semibold text-[#111827] mb-2">
                  Automatisk utbetaling
                </h4>
                <p className="text-sm text-[#6B7280]">
                  Pengene frigjøres og utbetales til leverandøren
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-900 mb-2">
                    100% sikker betaling for alle parter
                  </h4>
                  <p className="text-sm text-green-800">
                    Vår escrow-løsning er godkjent og sikker. Alle transaksjoner er
                    kryptert og dokumentert. Ved eventuelle uenigheter har vi
                    profesjonell tvisteløsning som sikrer en rettferdig behandling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-24">
        <div className="max-w-[1366px] mx-auto">
          <h2 className="text-[22px] sm:text-[24px] lg:text-[32px] font-bold text-[#111827] mb-4 sm:mb-6">
            Populære kategorier
          </h2>
          
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white rounded-lg flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer hover:shadow-lg transition-all touch-manipulation"
                style={{ boxShadow: '0 6px 18px rgba(23, 56, 78, 0.08)' }}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: category.color }}>
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-[13px] sm:text-[14px] font-medium text-[#111827] text-center px-2">{category.name}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-[13px] sm:text-[14px] text-[#17384E] font-semibold hover:underline touch-manipulation">
              Se alle kategorier →
            </button>
          </div>
        </div>
      </section>

      {/* Featured Professionals Carousel */}
      <section className="py-12 px-4 lg:px-24 bg-white">
        <div className="max-w-[1366px] mx-auto">
          <h2 className="text-[24px] lg:text-[32px] font-bold text-[#111827] mb-6">
            Utvalgte fagfolk
          </h2>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex gap-4 transition-transform duration-300" style={{ transform: `translateX(-${currentProfessional * 100}%)` }}>
                {professionals.map((professional) => (
                  <div
                    key={professional.id}
                    className="flex-shrink-0 w-full md:w-[260px] bg-white rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    style={{ boxShadow: '0 6px 18px rgba(23, 56, 78, 0.08)' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <ImageWithFallback
                        src={professional.image}
                        alt={professional.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-[16px] font-semibold text-[#111827]">{professional.name}</h3>
                        <p className="text-[13px] text-[#6B7280]">{professional.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-[14px] font-semibold text-[#111827]">{professional.rating}</span>
                      <span className="text-[13px] text-[#6B7280]">({professional.reviews} anmeldelser)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={prevProfessional}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hidden lg:flex"
            >
              <ChevronLeft className="w-6 h-6 text-[#17384E]" />
            </button>
            <button
              onClick={nextProfessional}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hidden lg:flex"
            >
              <ChevronRight className="w-6 h-6 text-[#17384E]" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 lg:px-24 bg-[#17384E] text-white">
        <div className="max-w-[1366px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Om Fagfolk</h4>
              <ul className="space-y-2 text-[13px] text-gray-300">
                <li><a href="#" className="hover:text-white">Om oss</a></li>
                <li><a href="#" className="hover:text-white">Hvordan det fungerer</a></li>
                <li><a href="#" className="hover:text-white">Karriere</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For kunder</h4>
              <ul className="space-y-2 text-[13px] text-gray-300">
                <li><Link to="/opprett-forespørsel" className="hover:text-white">Opprett forespørsel</Link></li>
                <li><a href="#" className="hover:text-white">Finn fagfolk</a></li>
                <li><Link to="/priser-og-vilkår" className="hover:text-white">Vilkår</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For leverandører</h4>
              <ul className="space-y-2 text-[13px] text-gray-300">
                <li><Link to="/registrering?role=leverandor" className="hover:text-white">Bli leverandør</Link></li>
                <li><Link to="/pris" className="hover:text-white">Våre tilbud</Link></li>
                <li><Link to="/priser-og-vilkår" className="hover:text-white">Priser og vilkår</Link></li>
                <li><a href="#" className="hover:text-white">Ressurser</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Nyhetsbrev</h4>
              <p className="text-[13px] text-gray-300 mb-3">Få tips og tilbud på epost</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Din epost"
                  className="flex-1 h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-sm"
                />
                <button className="h-10 w-10 bg-[#E07B3E] rounded-lg flex items-center justify-center hover:bg-[#d16f35]">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/20 text-center text-[13px] text-gray-400">
            <p>© 2026 Fagfolk. Alle rettigheter reservert.</p>
          </div>
        </div>
      </footer>

      {/* How It Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowHowItWorks(false)}>
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[24px] font-bold text-[#111827] mb-4">Hvordan Fagfolk fungerer</h2>
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#E07B3E] rounded-lg flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827] mb-1">Beskriv jobben din</h3>
                  <p className="text-[14px] text-[#6B7280]">Fortell oss hva du trenger hjelp til ved å fylle ut et enkelt skjema. Ta gjerne bilder og gi detaljerte beskrivelser for de beste tilbudene.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#E07B3E] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827] mb-1">Motta tilbud fra kvalifiserte fagfolk</h3>
                  <p className="text-[14px] text-[#6B7280]">Vi matcher deg med verifiserte håndverkere i ditt område. Du mottar flere tilbud innen 24 timer som du kan sammenligne.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#E07B3E] rounded-lg flex items-center justify-center flex-shrink-0">
                  <ThumbsUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827] mb-1">Velg og få jobben gjort</h3>
                  <p className="text-[14px] text-[#6B7280]">Sammenlign priser, vurderinger og profiler. Velg den håndverkeren som passer best for deg og få jobben gjort trygt og effektivt.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowHowItWorks(false)}
              className="w-full h-12 bg-[#17384E] text-white rounded-lg font-semibold hover:bg-[#1a4459] transition-colors"
            >
              Lukk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}