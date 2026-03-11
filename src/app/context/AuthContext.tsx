import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient, Session, User } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userId: string | null;
  userRole: "customer" | "supplier" | null;
  userProfile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string; message?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
  role: "customer" | "supplier";
  company?: string;
  category?: string;
  certifications?: any[];
  orgNumber?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile from backend
  const loadProfile = async (userId: string, role: string) => {
    try {
      const endpoint = role === "supplier" 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-8d200dba/suppliers/${userId}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-8d200dba/customers/${userId}`;

      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.supplier || data.customer || null);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        
        if (existingSession) {
          setSession(existingSession);
          setUser(existingSession.user);
          
          const role = existingSession.user.user_metadata?.role || "customer";
          await loadProfile(existingSession.user.id, role);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event);
      setSession(newSession);
      setUser(newSession?.user || null);

      if (newSession?.user) {
        const role = newSession.user.user_metadata?.role || "customer";
        await loadProfile(newSession.user.id, role);
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        
        const role = data.user.user_metadata?.role || "customer";
        await loadProfile(data.user.id, role);
        
        return { success: true };
      }

      return { success: false, error: "No session returned" };
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error: String(error) };
    }
  };

  const signUp = async (signUpData: SignUpData) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8d200dba/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(signUpData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Registrering feilet" };
      }

      // Auto sign in after signup
      const signInResult = await signIn(signUpData.email, signUpData.password);
      
      return { 
        success: signInResult.success, 
        error: signInResult.error,
        message: data.message 
      };
    } catch (error) {
      console.error("Sign up error:", error);
      return { success: false, error: String(error) };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const role = user.user_metadata?.role || "customer";
      await loadProfile(user.id, role);
    }
  };

  const userId = user?.id || null;
  const userRole = user?.user_metadata?.role || null;

  const value: AuthContextType = {
    user,
    session,
    userId,
    userRole,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}