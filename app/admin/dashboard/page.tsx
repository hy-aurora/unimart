"use client";

import React from 'react';
import { AdminLayout } from '@/components/admin-layout';
import { AdminBreadcrumbs } from '@/components/ui/admin-breadcrumbs';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const breadcrumbItems = [
    { label: 'Dashboard' }
  ];

  const recentSizingAppointments = useQuery(api.contactQueries.getAllSizingAppointments, { 
    status: "pending" 
  }) || [];
  
  const recentContactQueries = useQuery(api.contactQueries.getAll) || [];
  
  // Format date
  const formatDate = (timestamp: number) => {
    return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
  };
  
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <AdminBreadcrumbs items={breadcrumbItems} />
        
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sizing Appointments Card */}
          <Card>
            <CardHeader>
              <div>
                <h3 className="text-xl font-semibold">Recent Sizing Appointments</h3>
                <p className="text-sm text-gray-500">Latest pending sizing appointment requests</p>
              </div>
            </CardHeader>
            <CardBody>
              {recentSizingAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No pending appointments</p>
              ) : (
                <div className="space-y-4">
                  {recentSizingAppointments.slice(0, 5).map((appointment) => (
                    <div key={appointment._id} className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">{appointment.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">{formatDate(appointment.createdAt)}</p>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700">Pending</span>
                        </div>
                      </div>
                      <Button variant="light" color="primary" size="sm" as={Link} href={`/admin/sizing-appointments?id=${appointment._id}`}>
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
            <CardFooter>
              <Button 
                fullWidth
                color="primary"
                variant="light"
                as={Link} 
                href="/admin/sizing-appointments"
                endContent={<ChevronRight className="h-4 w-4" />}
              >
                View All Appointments
              </Button>
            </CardFooter>
          </Card>
          
          {/* Contact Queries Card */}
          <Card>
            <CardHeader>
              <div>
                <h3 className="text-xl font-semibold">Recent Contact Queries</h3>
                <p className="text-sm text-gray-500">Latest customer inquiries</p>
              </div>
            </CardHeader>
            <CardBody>
              {recentContactQueries.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No contact queries</p>
              ) : (
                <div className="space-y-4">
                  {recentContactQueries.slice(0, 5).map((query) => (
                    <div key={query._id} className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-medium">{query.name}</p>
                        <p className="text-sm text-gray-500">{query.subject || 'No subject'}</p>
                        <p className="text-xs text-gray-400">{formatDate(query.createdAt)}</p>
                      </div>
                      <Button variant="light" color="primary" size="sm" as={Link} href={`/admin/contacts?id=${query._id}`}>
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
            <CardFooter>
              <Button 
                fullWidth
                color="primary"
                variant="light"
                as={Link} 
                href="/admin/contacts"
                endContent={<ChevronRight className="h-4 w-4" />}
              >
                View All Queries
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
