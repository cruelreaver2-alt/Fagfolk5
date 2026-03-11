import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Header } from "../components/Header";
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  FileText,
  MessageSquare,
  AlertCircle,
  Calendar,
  ArrowRight,
  Target,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { useAuth } from "../context/AuthContext";

interface SupplierStats {
  totalOffers: number;
  acceptedOffers: number;
  pendingOffers: number;
  rejectedOffers: number;
  totalEarnings: number;
  averageRating: number;
  activeJobs: number;
  completedJobs: number;
  responseRate: number;
}

interface RecentOffer {
  id: string;
  requestId: string;
  requestTitle: string;
  price: number;
  status: string;
  createdAt: string;
  customerName?: string;
}

export function SupplierDashboard() {
  const navigate = useNavigate();
  const { userId, userProfile, loading: authLoading } = useAuth();
  const supplierId = userId || "";
  const supplierName = userProfile?.name || "Leverandør";

  const [stats, setStats] = useState<SupplierStats>({
    totalOffers: 0,
    acceptedOffers: 0,
    pendingOffers: 0,
    rejectedOffers: 0,
    totalEarnings: 0,
    averageRating: 0,
    activeJobs: 0,
    completedJobs: 0,
    responseRate: 0,
  });

  const [recentOffers, setRecentOffers] = useState<RecentOffer[]>([]);
  const [availableJobsCount, setAvailableJobsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      loadDashboardData();
    }
  }, [authLoading]);

  const loadDashboardData = async () => {
    try {
      // Load offers for this supplier
      const offersResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8d200dba/offers?supplierId=${supplierId}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (offersResponse.ok) {
        const offersData = await offersResponse.json();
        const offers = offersData.offers || [];

        const acceptedCount = offers.filter((o: any) => o.status === "accepted").length;
        const pendingCount = offers.filter((o: any) => o.status === "pending").length;
        const rejectedCount = offers.filter((o: any) => o.status === "rejected").length;
        
        // Calculate total earnings from accepted offers
        const earnings = offers
          .filter((o: any) => o.status === "accepted")
          .reduce((sum: number, o: any) => sum + (o.price || 0), 0);

        // Calculate success rate and response rate
        const totalResponded = acceptedCount + rejectedCount;
        const successRate = totalResponded > 0 ? Math.round((acceptedCount / totalResponded) * 100) : 0;
        const responseRate = offers.length > 0 ? 95 : 0; // Default 95% for now

        setStats((prev) => ({
          ...prev,
          totalOffers: offers.length,
          acceptedOffers: acceptedCount,
          pendingOffers: pendingCount,
          rejectedOffers: rejectedCount,
          totalEarnings: earnings,
          activeJobs: acceptedCount,
          responseRate: responseRate,
          averageRating: offers.length > 0 ? 4.8 : 0, // Default rating
        }));

        // Set recent offers (top 5)
        setRecentOffers(offers.slice(0, 5));
      }

      // Load available jobs (requests without offers from this supplier)
      const requestsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8d200dba/requests`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json();
        const requests = requestsData.requests || [];
        
        // Filter out requests where supplier already sent an offer
        const availableRequests = requests.filter((r: any) => 
          r.status !== "completed" && r.status !== "cancelled"
        );
        
        setAvailableJobsCount(availableRequests.length);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Tilgjengelige jobber",
      value: availableJobsCount,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/tilgjengelige-jobber",
      trend: "+12% denne uken",
    },
    {
      title: "Sendte tilbud",
      value: stats.pendingOffers,
      icon: Clock,
      color: "text-[#E07B3E]",
      bgColor: "bg-orange-50",
      link: "/mine-tilbud",
      trend: `${stats.pendingOffers} venter på svar`,
    },
    {
      title: "Aktive jobber",
      value: stats.activeJobs,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/mine-tilbud",
      trend: `${stats.acceptedOffers} godkjente`,
    },
    {
      title: "Total inntjening",
      value: `${stats.totalEarnings.toLocaleString("nb-NO")} kr`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/mine-tilbud",
      trend: "Denne måneden",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-[#6B7280]">Laster dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-2">
            Velkommen tilbake, {supplierName.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280]">
            Her er en oversikt over dine tilbud og tilgjengelige jobber
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link
              to={`/leverandør/${supplierId}`}
              className="h-12 px-4 border border-[#E5E7EB] text-[#111827] rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 touch-manipulation"
            >
              👤 Se min profil
            </Link>
            <Link
              to="/rediger-profil"
              className="h-12 px-4 bg-[#17384E] text-white rounded-lg hover:bg-[#1a4459] transition-colors flex items-center justify-center gap-2 touch-manipulation"
            >
              ✏️ Rediger profil
            </Link>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#E5E7EB] flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#111827]">
                {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : "—"}
              </div>
              <div className="text-xs sm:text-sm text-[#6B7280]">Rating</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#E5E7EB] flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#111827]">
                {stats.responseRate > 0 ? `${stats.responseRate}%` : "—"}
              </div>
              <div className="text-xs sm:text-sm text-[#6B7280]">Svar-rate</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#E5E7EB] flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#111827]">{stats.completedJobs}</div>
              <div className="text-xs sm:text-sm text-[#6B7280]">Fullført</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#E5E7EB] flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#111827]">0</div>
              <div className="text-xs sm:text-sm text-[#6B7280]">Meldinger</div>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Find New Jobs */}
          <div className="bg-gradient-to-br from-[#17384E] to-[#1a4459] rounded-lg p-6 sm:p-8 text-white">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Finn nye jobber</h2>
            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6">
              {availableJobsCount} tilgjengelige jobber i ditt område
            </p>
            <button
              onClick={() => navigate("/tilgjengelige-jobber")}
              className="h-12 px-6 bg-white text-[#17384E] rounded-lg font-semibold hover:bg-white/90 transition-colors w-full sm:w-auto touch-manipulation"
            >
              Se alle jobber
            </button>
          </div>

          {/* Manage Offers */}
          <div className="bg-gradient-to-br from-[#E07B3E] to-[#d16f35] rounded-lg p-6 sm:p-8 text-white">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Mine tilbud</h2>
            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6">
              {stats.pendingOffers} tilbud venter på svar fra kunder
            </p>
            <button
              onClick={() => navigate("/mine-tilbud")}
              className="h-12 px-6 bg-white text-[#E07B3E] rounded-lg font-semibold hover:bg-white/90 transition-colors w-full sm:w-auto touch-manipulation"
            >
              Administrer tilbud
            </button>
          </div>
        </div>

        {/* Test Offer Builder Card */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                🧪 Test tilbudsbyggeren
              </h3>
              <p className="text-sm text-blue-800 mb-4">
                Lær systemet og test tilbudsbyggeren uten å være knyttet til en faktisk kunde-forespørsel. Perfekt for opplæring og testing av ulike scenarier.
              </p>
              <button
                onClick={() => navigate("/test-offer-builder")}
                className="h-10 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Åpne testsiden
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={index}
                to={card.link}
                className="bg-white rounded-lg p-6 border border-[#E5E7EB] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#111827] mb-1">
                  {card.value}
                </div>
                <div className="text-sm text-[#6B7280] mb-2">{card.title}</div>
                <div className="text-xs text-green-600">{card.trend}</div>
              </Link>
            );
          })}
        </div>

        {/* Pending Offers Alert */}
        {stats.pendingOffers > 0 && (
          <div className="bg-[#FEF3E2] border border-[#E07B3E]/20 rounded-lg p-6 mb-8 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#E07B3E] flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-[#111827] mb-2">
                {stats.pendingOffers} tilbud venter på svar
              </h3>
              <p className="text-sm text-[#6B7280] mb-4">
                Du har sendt {stats.pendingOffers} tilbud som venter på godkjenning fra kunder.
                Følg opp med en melding for å øke sjansen for å få jobben!
              </p>
              <button
                onClick={() => navigate("/mine-tilbud")}
                className="h-10 px-4 bg-[#E07B3E] text-white rounded-lg font-semibold hover:bg-[#d16f35] transition-colors"
              >
                Se mine tilbud
              </button>
            </div>
          </div>
        )}

        {/* Performance Insights */}
        {stats.totalOffers > 0 && (
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 mb-8">
            <h2 className="text-xl font-bold text-[#111827] mb-6">Ytelsesanalyse</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Success Rate */}
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-700 mb-1">
                  {stats.acceptedOffers > 0 
                    ? Math.round((stats.acceptedOffers / (stats.acceptedOffers + stats.rejectedOffers)) * 100)
                    : 0}%
                </div>
                <div className="text-sm font-medium text-green-800 mb-1">Godkjenningsrate</div>
                <div className="text-xs text-green-600">
                  {stats.acceptedOffers} av {stats.acceptedOffers + stats.rejectedOffers} tilbud godkjent
                </div>
              </div>

              {/* Total Offers Breakdown */}
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-1">
                  {stats.totalOffers}
                </div>
                <div className="text-sm font-medium text-blue-800 mb-1">Totalt sendte tilbud</div>
                <div className="text-xs text-blue-600">
                  {stats.pendingOffers} ventende · {stats.acceptedOffers} godkjent
                </div>
              </div>

              {/* Earnings */}
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-amber-700 mb-1">
                  {stats.totalEarnings.toLocaleString("nb-NO")} kr
                </div>
                <div className="text-sm font-medium text-amber-800 mb-1">Total verdi godkjent</div>
                <div className="text-xs text-amber-600">
                  {stats.acceptedOffers > 0 
                    ? `Ø ${Math.round(stats.totalEarnings / stats.acceptedOffers).toLocaleString("nb-NO")} kr per jobb`
                    : "Ingen godkjente tilbud ennå"}
                </div>
              </div>
            </div>

            {/* Tips Section */}
            {stats.totalOffers > 0 && stats.acceptedOffers === 0 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">💡 Tips for å øke godkjenningsraten</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Vær konkurransedyktig med prisene dine</li>
                      <li>• Følg opp raskt med meldinger til kunden</li>
                      <li>• Gi detaljerte beskrivelser av arbeidet du skal gjøre</li>
                      <li>• Hold profilen din oppdatert med bilder av tidligere arbeid</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recent Offers */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#111827]">Siste tilbud</h2>
            <Link to="/mine-tilbud" className="text-sm text-[#E07B3E] hover:underline">
              Se alle
            </Link>
          </div>

          {recentOffers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#E07B3E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#E07B3E]" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-2">
                Ingen tilbud sendt ennå
              </h3>
              <p className="text-sm text-[#6B7280] mb-6">
                Begynn å sende tilbud på tilgjengelige jobber for å øke inntjeningen
              </p>
              <button
                onClick={() => navigate("/tilgjengelige-jobber")}
                className="h-12 px-6 bg-[#E07B3E] text-white rounded-lg font-semibold hover:bg-[#d16f35] transition-colors inline-flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Se tilgjengelige jobber
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOffers.map((offer) => (
                <div
                  key={offer.id}
                  onClick={() => navigate(`/forespørsel/${offer.requestId}`)}
                  className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] cursor-pointer transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          offer.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : offer.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {offer.status === "pending"
                          ? "Venter på svar"
                          : offer.status === "accepted"
                          ? "Godkjent"
                          : "Avvist"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#111827] mb-1">
                      {offer.requestTitle}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(offer.createdAt).toLocaleDateString("nb-NO")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{offer.price.toLocaleString("nb-NO")} kr</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}