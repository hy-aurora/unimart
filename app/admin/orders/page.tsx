"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Search, Filter, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { AdminLayout } from "@/components/admin-layout";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Order = {
    id: string;
    orderNumber: string;
    customer: string;
    date: string;
    total: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    items: number;
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    useEffect(() => {
        // In a real application, you would fetch data from an API
        // This is mock data for demonstration
        const mockOrders: Order[] = Array.from({ length: 50 }, (_, i) => ({
            id: `ord-${i + 1000}`,
            orderNumber: `ORD-${Math.floor(Math.random() * 10000)}`,
            customer: `Customer ${i + 1}`,
            date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            total: Math.floor(Math.random() * 500) + 50,
            status: ["pending", "processing", "shipped", "delivered", "cancelled"][Math.floor(Math.random() * 5)] as Order["status"],
            items: Math.floor(Math.random() * 10) + 1,
        }));

        setOrders(mockOrders);
        setLoading(false);
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                 order.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const getStatusColor = (status: Order["status"]) => {
        switch (status) {
            case "pending": return "bg-yellow-100 text-yellow-800";
            case "processing": return "bg-blue-100 text-blue-800";
            case "shipped": return "bg-purple-100 text-purple-800";
            case "delivered": return "bg-green-100 text-green-800";
            case "cancelled": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <AdminLayout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                    <Button className="w-full sm:w-auto">
                        View Order Reports
                    </Button>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Management</CardTitle>
                            <CardDescription>
                                View and manage all customer orders placed on your store.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                                <div className="flex w-full max-w-sm items-center space-x-2">
                                    <Input
                                        placeholder="Search by order # or customer"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full"
                                    />
                                    <Button type="submit" size="icon" variant="ghost">
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full sm:w-auto">
                                                <Filter className="mr-2 h-4 w-4" />
                                                Filter
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem 
                                                onClick={() => setStatusFilter("all")}
                                                className={statusFilter === "all" ? "bg-muted" : ""}
                                            >
                                                All Statuses
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onClick={() => setStatusFilter("pending")}
                                                className={statusFilter === "pending" ? "bg-muted" : ""}
                                            >
                                                Pending
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onClick={() => setStatusFilter("processing")}
                                                className={statusFilter === "processing" ? "bg-muted" : ""}
                                            >
                                                Processing
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onClick={() => setStatusFilter("shipped")}
                                                className={statusFilter === "shipped" ? "bg-muted" : ""}
                                            >
                                                Shipped
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onClick={() => setStatusFilter("delivered")}
                                                className={statusFilter === "delivered" ? "bg-muted" : ""}
                                            >
                                                Delivered
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onClick={() => setStatusFilter("cancelled")}
                                                className={statusFilter === "cancelled" ? "bg-muted" : ""}
                                            >
                                                Cancelled
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        <ArrowUpDown className="mr-2 h-4 w-4" />
                                        Sort
                                    </Button>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex justify-center p-6">
                                    <p>Loading orders...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="rounded-md border overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="whitespace-nowrap">Order #</TableHead>
                                                    <TableHead className="whitespace-nowrap">Customer</TableHead>
                                                    <TableHead className="whitespace-nowrap">Date</TableHead>
                                                    <TableHead className="whitespace-nowrap">Items</TableHead>
                                                    <TableHead className="whitespace-nowrap">Total</TableHead>
                                                    <TableHead className="whitespace-nowrap">Status</TableHead>
                                                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {currentOrders.length > 0 ? (
                                                    currentOrders.map((order) => (
                                                        <TableRow key={order.id}>
                                                            <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                                            <TableCell>{order.customer}</TableCell>
                                                            <TableCell>{order.date}</TableCell>
                                                            <TableCell>{order.items}</TableCell>
                                                            <TableCell>£{order.total.toFixed(2)}</TableCell>
                                                            <TableCell>
                                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <Button size="sm" variant="outline" asChild className="whitespace-nowrap">
                                                                    <Link href={`/admin/orders/${order.id}`}>
                                                                        <Eye className="h-4 w-4 mr-2" />
                                                                        View
                                                                    </Link>
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={7} className="text-center py-6">
                                                            No orders found
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-between space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 py-4">
                                        <div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
                                            Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                className="w-full sm:w-auto"
                                            >
                                                Previous
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                disabled={currentPage === totalPages}
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                className="w-full sm:w-auto"
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}