"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfile() {
  const user = useQuery(api.users.get);

  if (user === undefined) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img 
            src={user.imageUrl} 
            alt="Profile" 
            className="rounded-full h-32 w-32 object-cover border-4 border-primary-100"
          />
        </div>
        <div>
          <p className="text-lg"><span className="font-medium">Email:</span> {user.email}</p>
          <p className="text-lg"><span className="font-medium">Role:</span> {user.role}</p>
          {user.phone && <p className="text-lg"><span className="font-medium">Phone:</span> {user.phone}</p>}
        </div>
      </div>
    </div>
  );
}
