import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: "customer" | "supplier";
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requireRole,
  redirectTo = "/logg-inn" 
}: ProtectedRouteProps) {
  const { userId, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      // Not logged in - redirect to login
      if (!userId) {
        navigate(redirectTo, { 
          state: { from: location.pathname },
          replace: true 
        });
        return;
      }

      // Wrong role - redirect to unauthorized page
      if (requireRole && userRole !== requireRole) {
        navigate("/ingen-tilgang", { replace: true });
      }
    }
  }, [userId, userRole, loading, navigate, location, requireRole, redirectTo]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#17384E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Laster...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!userId) {
    return null;
  }

  // Wrong role
  if (requireRole && userRole !== requireRole) {
    return null;
  }

  // Authenticated and correct role
  return <>{children}</>;
}