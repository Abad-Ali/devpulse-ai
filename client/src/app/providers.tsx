"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import AuthInitializer from "@/lib/redux/features/auth/AuthInitializer";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}