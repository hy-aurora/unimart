"use client";
import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Badge,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Chip,
  useDisclosure,
  Select,
  SelectItem,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';

type AppointmentStatus = "pending" | "cancelled" | "confirmed" | "completed" | "all";

export default function SizingAppointments() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [responseText, setResponseText] = useState("");
  const [responseStatus, setResponseStatus] = useState<"confirmed" | "completed" | "cancelled">("confirmed");
  
  // Fetch appointments based on status filter
  const appointments = useQuery(api.contactQueries.getAllSizingAppointments, { 
    status: selectedStatus !== "all" ? selectedStatus : undefined 
  });
  
  const respondToAppointment = useMutation(api.contactQueries.respondToSizingAppointment);
  
  // Handle opening the response modal
  const handleOpenResponseModal = (appointment: any) => {
    setSelectedAppointment(appointment);
    setResponseText(appointment.adminResponse || "");
    setResponseStatus(appointment.status === "pending" ? "confirmed" : appointment.status);
    onOpen();
  };
  
  // Handle sending the response
  const handleSendResponse = async () => {
    if (!selectedAppointment || !responseText) return;
    
    try {
      await respondToAppointment({
        appointmentId: selectedAppointment._id,
        status: responseStatus,
        adminResponse: responseText
      });
      
      toast.success("Response sent successfully", {
        description: `Email sent to ${selectedAppointment.email}`,
        duration: 3000,
      });
      
      onClose();
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error("Failed to send response", {
        description: "Please try again or contact support",
        duration: 3000,
      });
    }
  };
  
  // Generate status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge color="warning">Pending</Badge>;
      case "confirmed":
        return <Badge color="primary">Confirmed</Badge>;
      case "completed":
        return <Badge color="success">Completed</Badge>;
      case "cancelled":
        return <Badge color="danger">Cancelled</Badge>;
      default:
        return <Badge color="default">Unknown</Badge>;
    }
  };
  
  // Format the creation date
  const formatDate = (timestamp: number) => {
    return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
  };
  
  if (!appointments) {
    return (
      <div className="flex justify-center items-center h-64">
        <Icon icon="lucide:loader" className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sizing Appointments</h1>
        <Select 
          className="w-48"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as AppointmentStatus)}
        >
          <SelectItem key="all">All Appointments</SelectItem>
          <SelectItem key="pending">Pending</SelectItem>
          <SelectItem key="confirmed">Confirmed</SelectItem>
          <SelectItem key="completed">Completed</SelectItem>
          <SelectItem key="cancelled">Cancelled</SelectItem>
        </Select>
      </div>
      
      <Card>
        <CardHeader className="px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Appointment Requests</h3>
          <Chip color="primary">{appointments.length} Total</Chip>
        </CardHeader>
        <CardBody className="p-0">
          <Table>
            <TableHeader>
              <TableColumn>CUSTOMER</TableColumn>
              <TableColumn>CONTACT</TableColumn>
              <TableColumn>SCHOOL</TableColumn>
              <TableColumn>REQUESTED</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No appointment requests found.">
              {appointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell className="font-medium">{appointment.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{appointment.email}</span>
                      <span className="text-xs text-gray-500">{appointment.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.school}</TableCell>
                  <TableCell>{formatDate(appointment.createdAt)}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="light"
                        color="primary"
                        onPress={() => handleOpenResponseModal(appointment)}
                        startContent={<Icon icon="lucide:mail" className="w-4 h-4" />}
                      >
                        {appointment.adminResponse ? "Edit Response" : "Respond"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      
      {/* Response Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {selectedAppointment && (
            <>
              <ModalHeader>
                <h3 className="text-xl font-semibold">
                  Respond to {selectedAppointment.name}
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Name</h4>
                        <p>{selectedAppointment.name}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Email</h4>
                        <p>{selectedAppointment.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                        <p>{selectedAppointment.phone}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">School</h4>
                        <p>{selectedAppointment.school}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Status</h4>
                        <p>{getStatusBadge(selectedAppointment.status)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Requested</h4>
                        <p>{formatDate(selectedAppointment.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <Select
                      value={responseStatus}
                      onChange={(e) => setResponseStatus(e.target.value as any)}
                    >
                      <SelectItem key="confirmed">Confirm Appointment</SelectItem>
                      <SelectItem key="completed">Mark as Completed</SelectItem>
                      <SelectItem key="cancelled">Cancel Appointment</SelectItem>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Response</label>
                    <Textarea
                      placeholder="Write your response here..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      rows={6}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary"
                  onPress={handleSendResponse}
                  startContent={<Icon icon="lucide:send" className="w-4 h-4" />}
                >
                  Send Response
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
