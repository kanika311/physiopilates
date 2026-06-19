"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AdminPageContextValue {
  title: string;
  setTitle: (title: string) => void;
}

const AdminPageContext =
  createContext<AdminPageContextValue | null>(null);

export function AdminPageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [title, setTitle] = useState("Dashboard");

  return (
    <AdminPageContext.Provider value={{ title, setTitle }}>
      {children}
    </AdminPageContext.Provider>
  );
}

export function useAdminPage(pageTitle: string) {
  const context = useContext(AdminPageContext);

  useEffect(() => {
    context?.setTitle(pageTitle);
  }, [context, pageTitle]);
}

export function useAdminPageTitle() {
  const context = useContext(AdminPageContext);
  return context?.title ?? "Dashboard";
}
