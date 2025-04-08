"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function UserProfile() {
  const user = useQuery(api.users.get);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <img src={user.imageUrl} alt="Profile" />
    </div>
  );
}
