"use client";

import React from 'react';
import { AdminLayout } from '@/components/admin-layout';
import SizingAppointments from '@/components/admin/sizing-appointments';
import { AdminBreadcrumbs } from '@/components/ui/admin-breadcrumbs';
import { Card, CardHeader, CardBody } from '@heroui/react';

export default function SizingAppointmentsPage() {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Sizing Appointments' }
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col p-6 gap-6">
        <AdminBreadcrumbs items={breadcrumbItems} />
        
        <Card>
          <CardHeader>
            <div>
              <h3 className="text-xl font-semibold">Sizing Appointments</h3>
              <p className="text-sm text-gray-500">
                Manage and respond to sizing appointment requests from customers.
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <SizingAppointments />
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  );
}