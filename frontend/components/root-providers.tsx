"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export function RootProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <UserNameProvider>
      <NextThemesProvider {...props}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextThemesProvider>
    </UserNameProvider>
  );
}

const UserNameContext = React.createContext<{
  userName: string | null;
  setUserName: (userName: string) => void;
} | null>(null);

export function useUserName() {
  const context = React.useContext(UserNameContext);
  if (!context) {
    throw new Error("useUserName must be used within a UserNameProvider");
  }
  return context.userName;
}

export function useSetUserName() {
  const context = React.useContext(UserNameContext);
  if (!context) {
    throw new Error("useSetUserName must be used within a UserNameProvider");
  }
  return context.setUserName;
}

export function UserNameProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = React.useState<string | null>(null);
  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
}
