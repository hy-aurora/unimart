"use client";

import SchoolList from "@/components/SchoolList";
import { AdminLayout } from "@/components/admin-layout";

export default function SchoolsPage() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">Schools</h1>
        <SchoolList />
      </div>
    </AdminLayout>
  );
}
