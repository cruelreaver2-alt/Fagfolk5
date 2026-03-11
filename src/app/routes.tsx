import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { Landing } from "./pages/Landing";
import { Registration } from "./pages/Registration";
import { CreateRequest } from "./pages/CreateRequest";
import { MyRequests } from "./pages/MyRequests";
import { PricesAndTerms } from "./pages/PricesAndTerms";
import { EscrowPayment } from "./pages/EscrowPayment";
import { JobDetails } from "./pages/JobDetails";
import { JobApproval } from "./pages/JobApproval";
import { Pricing } from "./pages/Pricing";
import { AdminPanel } from "./pages/AdminPanel";
import { Messages } from "./pages/Messages";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { SupplierDashboard } from "./pages/SupplierDashboard";
import { AvailableJobs } from "./pages/AvailableJobs";
import { OfferBuilder } from "./pages/OfferBuilder";
import { OfferBuilderRouter } from "./pages/OfferBuilderRouter";
import { MyOffers } from "./pages/MyOffers";
import { NotificationCenter } from "./pages/NotificationCenter";
import { NotificationPreferences } from "./pages/NotificationPreferences";
import { SupplierProfile } from "./pages/SupplierProfile";
import { EditSupplierProfile } from "./pages/EditSupplierProfile";
import { CustomerProfile } from "./pages/CustomerProfile";
import { EditCustomerProfile } from "./pages/EditCustomerProfile";
import { SubscriptionSettings } from "./pages/SubscriptionSettings";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Unauthorized } from "./pages/Unauthorized";
import { OnboardingKunde } from "./pages/OnboardingKunde";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { TestOfferBuilder } from "./pages/TestOfferBuilder";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      // Public routes
      { index: true, Component: Landing },
      { path: "onboarding-kunde", Component: OnboardingKunde },
      { path: "logg-inn", Component: Login },
      { path: "registrer", Component: Signup },
      { path: "registrering", Component: Registration },
      { path: "priser-og-vilkår", Component: PricesAndTerms },
      { path: "sperret-konto", Component: EscrowPayment },
      { path: "pris", Component: Pricing },
      { path: "admin", Component: AdminPanel },
      { path: "ingen-tilgang", Component: Unauthorized },
      
      // Protected routes - Customer only
      { 
        path: "opprett-forespørsel", 
        element: <ProtectedRoute requireRole="customer"><CreateRequest /></ProtectedRoute> 
      },
      { 
        path: "mine-forespørsler", 
        element: <ProtectedRoute requireRole="customer"><MyRequests /></ProtectedRoute> 
      },
      { 
        path: "dashboard", 
        element: <ProtectedRoute requireRole="customer"><CustomerDashboard /></ProtectedRoute> 
      },
      { 
        path: "forespørsel/:id", 
        element: <ProtectedRoute requireRole="customer"><JobDetails /></ProtectedRoute> 
      },
      { 
        path: "godkjenn-arbeid", 
        element: <ProtectedRoute requireRole="customer"><JobApproval /></ProtectedRoute> 
      },
      { 
        path: "kunde/:id", 
        element: <ProtectedRoute requireRole="customer"><CustomerProfile /></ProtectedRoute> 
      },
      { 
        path: "rediger-kundeprofil", 
        element: <ProtectedRoute requireRole="customer"><EditCustomerProfile /></ProtectedRoute> 
      },
      { 
        path: "abonnement-innstillinger", 
        element: <ProtectedRoute requireRole="customer"><SubscriptionSettings /></ProtectedRoute> 
      },
      
      // Protected routes - Supplier only
      { 
        path: "leverandør-dashboard", 
        element: <ProtectedRoute requireRole="supplier"><SupplierDashboard /></ProtectedRoute> 
      },
      { 
        path: "tilgjengelige-jobber", 
        element: <ProtectedRoute requireRole="supplier"><AvailableJobs /></ProtectedRoute> 
      },
      { 
        path: "bygg-tilbud/:jobId", 
        element: <ProtectedRoute requireRole="supplier"><OfferBuilderRouter /></ProtectedRoute> 
      },
      { 
        path: "bygg-tilbud-pro/:jobId", 
        element: <ProtectedRoute requireRole="supplier"><OfferBuilder /></ProtectedRoute> 
      },
      { 
        path: "mine-tilbud", 
        element: <ProtectedRoute requireRole="supplier"><MyOffers /></ProtectedRoute> 
      },
      { 
        path: "leverandør/:id", 
        element: <ProtectedRoute requireRole="supplier"><SupplierProfile /></ProtectedRoute> 
      },
      { 
        path: "rediger-profil", 
        element: <ProtectedRoute requireRole="supplier"><EditSupplierProfile /></ProtectedRoute> 
      },
      { 
        path: "test-offer-builder", 
        element: <ProtectedRoute requireRole="supplier"><TestOfferBuilder /></ProtectedRoute> 
      },
      
      // Protected routes - Any authenticated user
      { 
        path: "meldinger", 
        element: <ProtectedRoute><Messages /></ProtectedRoute> 
      },
      { 
        path: "varslinger", 
        element: <ProtectedRoute><NotificationCenter /></ProtectedRoute> 
      },
      { 
        path: "varslinger/innstillinger", 
        element: <ProtectedRoute><NotificationPreferences /></ProtectedRoute> 
      },
    ],
  },
]);