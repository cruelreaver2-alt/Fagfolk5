import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <RouterProvider router={router} />
      </SubscriptionProvider>
    </AuthProvider>
  );
}