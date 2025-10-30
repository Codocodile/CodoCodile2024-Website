"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authAPI, challengerAPI } from "@/lib/api";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface Challenger {
  id: number;
  user: User;
  first_name_persian: string;
  last_name_persian: string;
  phone_number: string;
  status: "J" | "S" | "P";
  gender: "M" | "F";
  profile_pic?: string;
  bio?: string;
  university?: string;
  national_code?: string;
  is_confirmed: boolean;
  cv_file?: string;
  shirt_size?: string;
}

interface AuthContextType {
  user: Challenger | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
  confirmAccount: (code: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (
    email: string,
    token: string,
    password: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Challenger | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const userData = await challengerAPI.getProfile();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);

      const userData = await challengerAPI.getProfile();
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      await authAPI.register(data);
      // After successful registration, user needs to confirm their account
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  const updateProfile = async (data: any) => {
    try {
      const updatedUser = await challengerAPI.updateProfile(data);
      setUser(updatedUser);
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  };

  const confirmAccount = async (code: string) => {
    try {
      await authAPI.confirmAccount(code);
      // Refresh user data after confirmation
      const userData = await challengerAPI.getProfile();
      setUser(userData);
    } catch (error) {
      console.error("Account confirmation failed:", error);
      throw error;
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      await authAPI.requestPasswordReset(email);
    } catch (error) {
      console.error("Password reset request failed:", error);
      throw error;
    }
  };

  const resetPassword = async (
    email: string,
    token: string,
    password: string
  ) => {
    try {
      await authAPI.resetPassword(email, token, password);
    } catch (error) {
      console.error("Password reset failed:", error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    confirmAccount,
    requestPasswordReset,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
