"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "employee-ac" | "employee-nac" | "team-lead" | "employee-w" | "external"  | null;

type AuthContextType = {
  role: Role;
  setRole: (role: Role) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null); // set from login later
  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
