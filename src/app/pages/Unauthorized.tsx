import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { ShieldAlert, Home, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Unauthorized() {
  const navigate = useNavigate();
  const { userRole, signOut } = useAuth();

  const handleGoHome = () => {
    if (userRole === "customer") {
      navigate("/dashboard");
    } else if (userRole === "supplier") {
      navigate("/leverandør-dashboard");
    } else {
      navigate("/");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-[#111827] mb-4">
            Ingen tilgang
          </h1>

          {/* Description */}
          <p className="text-lg text-[#6B7280] mb-8">
            Du har ikke tillatelse til å se denne siden.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-800">
              {userRole === "customer" 
                ? "Dette er en leverandør-side. Du er logget inn som kunde."
                : userRole === "supplier"
                ? "Dette er en kunde-side. Du er logget inn som leverandør."
                : "Du må være logget inn for å se denne siden."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center gap-2 h-12 px-6 bg-[#17384E] text-white rounded-lg font-semibold hover:bg-[#1a4459] transition-colors"
            >
              <Home className="w-5 h-5" />
              Gå til min side
            </button>
            
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 h-12 px-6 border-2 border-[#E5E7EB] text-[#111827] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logg ut
            </button>
          </div>

          {/* Help text */}
          <p className="text-sm text-[#9CA3AF] mt-6">
            Trenger du hjelp? Kontakt support på{" "}
            <a href="mailto:support@handtverkeren.no" className="text-[#E07B3E] hover:underline">
              support@handtverkeren.no
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
