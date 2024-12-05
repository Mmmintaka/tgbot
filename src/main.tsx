import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TonConnectUIProvider
      // actionsConfiguration={{
      // twaReturnUrl: "https://t.me/MatzohBot/bgwlitetest",
      // }}
      manifestUrl="https://manifest-lemon.vercel.app/manifest.json"
    >
      <App />
    </TonConnectUIProvider>
  </StrictMode>
);
