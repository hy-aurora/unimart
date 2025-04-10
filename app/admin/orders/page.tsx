"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  MoreHorizontal,
  Search,
  Package,
  CheckCircle,
  Truck,
  XCircle,
  ClipboardList,
  Eye,
} from "lucide-react";
import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  // Query for orders with pagination and status filtering
  const ordersResult = useQuery(api.orders.getAllOrders, {
    status: statusFilter as any,
    page: currentPage,
    limit: 10
  });
  
  // Query for the details of the selected order
  const selectedOrder = useQuery(
    api.orders.getOrderById,
    selectedOrderId ? { orderId: selectedOrderId as any } : "skip"
  );
  
  // Mutation for updating order status
  const updateOrderStatus = useMutation(api.orders.updateStatus);
  
  // Function to open the details modal
  const handleViewOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailsModalOpen(true);
  };
  
  // Function to handle status updates
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({
        orderId: orderId as any,
        status: newStatus as any
      });
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };
  
  // Helper for rendering status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "paid":
        return <Badge className="bg-blue-500">Paid</Badge>;
      case "shipped":
        return <Badge className="bg-indigo-500">Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>
              View and manage all customer orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 md:items-center justify-between">
              <div className="flex items-center gap-2">
                <Select 
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Search orders..." 
                  className="pl-8" 
                />
              </div>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersResult?.orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order._id.slice(-6).toUpperCase()}</TableCell>
                      <TableCell>{order.userName}</TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>£{order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewOrderDetails(order._id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order._id, "paid")}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order._id, "shipped")}>
                              <Truck className="mr-2 h-4 w-4" />
                              Mark as Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order._id, "delivered")}>
                              <Package className="mr-2 h-4 w-4" />
                              Mark as Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order._id, "cancelled")}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {ordersResult && (
              <div className="flex items-center justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage + 1} of {ordersResult.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(ordersResult.totalPages - 1, currentPage + 1))}
                  disabled={currentPage >= ordersResult.totalPages - 1}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Modal isOpen={isDetailsModalOpen} onOpenChange={(open) => setIsDetailsModalOpen(open)} size="3xl">
          <ModalContent>
            {() => (
              <>
                <ModalHeader>
                  <h3 className="text-xl font-semibold">
                    Order Details - #{selectedOrder._id.slice(-6).toUpperCase()}
                  </h3>
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Order Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status</span>
                          <span>{getStatusBadge(selectedOrder.status)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Date</span>
                          <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total Amount</span>
                          <span className="font-medium">£{selectedOrder.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-medium mt-6 mb-2">Customer Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Name</span>
                          <span>{selectedOrder.user?.name || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email</span>
                          <span>{selectedOrder.user?.email || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Phone</span>
                          <span>{selectedOrder.user?.phone || "N/A"}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-medium mt-6 mb-2">Shipping Address</h4>
                      <p className="text-gray-600">{selectedOrder.shippingAddress}</p>
                      
                      <h4 className="font-medium mt-6 mb-2">Update Status</h4>
                      <Select 
                        defaultValue={selectedOrder.status}
                        onValueChange={(value) => handleStatusChange(selectedOrder._id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Order Items</h4>
                      <div className="space-y-4">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-gray-600">x{item.quantity}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Price per item</span>
                              <span>£{item.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Total</span>
                              <span>£{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            {item.size && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Size</span>
                                <span>{item.size}</span>
                              </div>
                            )}
                            {item.customSize && (
                              <div className="mt-2">
                                <span className="text-sm text-gray-500">Custom Size:</span>
                                <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                                  {item.customSize.chest && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">Chest</span>
                                      <span>{item.customSize.chest} cm</span>
                                    </div>
                                  )}
                                  {item.customSize.waist && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">Waist</span>
                                      <span>{item.customSize.waist} cm</span>
                                    </div>
                                  )}
                                  {item.customSize.height && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">Height</span>
                                      <span>{item.customSize.height} cm</span>
                                    </div>
                                  )}
                                </div>
                                {item.customSize.notes && (
                                  <div className="mt-1">
                                    <span className="text-sm text-gray-500">Notes:</span>
                                    <p className="text-sm">{item.customSize.notes}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailsModalOpen(false)}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </AdminLayout>
  );
}