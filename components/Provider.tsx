"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { HeroUIProvider } from "@heroui/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}
      >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <HeroUIProvider>{children}</HeroUIProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </ClerkProvider>
  );
}
