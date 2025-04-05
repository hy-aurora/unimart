import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { HeroUIProvider } from "@heroui/system";
import type { AppProps } from "next/app";
import router from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
    <HeroUIProvider navigate={router.push}>
        <Component {...pageProps} />
    </HeroUIProvider>
    </ClerkProvider>
  );
}
