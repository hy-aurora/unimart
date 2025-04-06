"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Search, 
    Filter, 
    ArrowUpDown, 
    MoreHorizontal,
    Mail,
    User,
    Phone,
    Eye,
    Pencil,
    UserPlus
} from "lucide-react";
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    orders: number;
    totalSpent: number;
    status: "active" | "inactive" | "new";
    createdAt: string;
    school: string;
};

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    const schools = ["St. Mary's School", "Oakridge Academy", "Westfield High", "Riverside Elementary", "Northside College"];

    useEffect(() => {
        // Mock customer data
        const mockCustomers: Customer[] = Array.from({ length: 50 }, (_, i) => ({
            id: `cust-${i + 1000}`,
            name: `${["John", "Jane", "Robert", "Sarah", "Michael", "Emily", "David", "Emma", "James", "Olivia"][Math.floor(Math.random() * 10)]} ${["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson", "Taylor", "Clark"][Math.floor(Math.random() * 10)]}`,
            email: `customer${i + 1000}@example.com`,
            phone: `+44 ${Math.floor(Math.random() * 1000)}${Math.floor(Math.random() * 1000)} ${Math.floor(Math.random() * 10000)}`,
            orders: Math.floor(Math.random() * 20),
            totalSpent: Math.floor(Math.random() * 2000) + 50,
            status: ["active", "active", "active", "inactive", "new"][Math.floor(Math.random() * 5)] as Customer["status"],
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            school: schools[Math.floor(Math.random() * schools.length)]
        }));

        setCustomers(mockCustomers);
        setLoading(false);
    }, []);

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = 
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.id.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    const getStatusColor = (status: Customer["status"]) => {
        switch (status) {
            case "active": return "bg-green-100 text-green-800";
            case "inactive": return "bg-red-100 text-red-800";
            case "new": return "bg-blue-100 text-blue-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <AdminLayout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full sm:w-auto">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Customer
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add New Customer</DialogTitle>
                                <DialogDescription>
                                    Enter the details to add a new customer to your system.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="customer-name" className="sm:text-right">
                                        Name
                                    </Label>
                                    <Input id="customer-name" className="col-span-1 sm:col-span-3" placeholder="Full name" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="customer-email" className="sm:text-right">
                                        Email
                                    </Label>
                                    <Input id="customer-email" type="email" className="col-span-1 sm:col-span-3" placeholder="email@example.com" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="customer-phone" className="sm:text-right">
                                        Phone
                                    </Label>
                                    <Input id="customer-phone" className="col-span-1 sm:col-span-3" placeholder="Phone number" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                                    <Label htmlFor="customer-school" className="sm:text-right">
                                        School
                                    </Label>
                                    <Input id="customer-school" className="col-span-1 sm:col-span-3" placeholder="Associated school" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
                                    <Label htmlFor="customer-address" className="sm:text-right pt-2">
                                        Address
                                    </Label>
                                    <textarea 
                                        id="customer-address" 
                                        className="col-span-1 sm:col-span-3 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="Full address"
                                    ></textarea>
                                </div>
                            </div>
                            <DialogFooter className="flex flex-col sm:flex-row gap-2">
                                <Button type="submit" className="w-full sm:w-auto">Save Customer</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Directory</CardTitle>
                            <CardDescription>
                                Manage your customers and their details
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                                <div className="flex w-full max-w-sm items-center space-x-2">
                                    <Input
                                        placeholder="Search customers..."
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
                                                All Customers
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onClick={() => setStatusFilter("active")}
                                                className={statusFilter === "active" ? "bg-muted" : ""}
                                            >
                                                Active
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onClick={() => setStatusFilter("inactive")}
                                                className={statusFilter === "inactive" ? "bg-muted" : ""}
                                            >
                                                Inactive
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onClick={() => setStatusFilter("new")}
                                                className={statusFilter === "new" ? "bg-muted" : ""}
                                            >
                                                New
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuLabel>Filter by School</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {schools.map((school) => (
                                                <DropdownMenuItem key={school}>
                                                    {school}
                                                </DropdownMenuItem>
                                            ))}
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
                                    <p>Loading customers...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="rounded-md border overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="whitespace-nowrap">ID</TableHead>
                                                    <TableHead className="whitespace-nowrap">Name</TableHead>
                                                    <TableHead className="whitespace-nowrap">Email</TableHead>
                                                    <TableHead className="whitespace-nowrap">School</TableHead>
                                                    <TableHead className="whitespace-nowrap">Orders</TableHead>
                                                    <TableHead className="whitespace-nowrap">Total Spent</TableHead>
                                                    <TableHead className="whitespace-nowrap">Status</TableHead>
                                                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {currentCustomers.length > 0 ? (
                                                    currentCustomers.map((customer) => (
                                                        <TableRow key={customer.id}>
                                                            <TableCell className="font-medium">{customer.id}</TableCell>
                                                            <TableCell>{customer.name}</TableCell>
                                                            <TableCell>{customer.email}</TableCell>
                                                            <TableCell>{customer.school}</TableCell>
                                                            <TableCell>{customer.orders}</TableCell>
                                                            <TableCell>£{customer.totalSpent.toFixed(2)}</TableCell>
                                                            <TableCell>
                                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(customer.status)}`}>
                                                                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button variant="ghost" size="icon">
                                                                            <MoreHorizontal className="h-4 w-4" />
                                                                            <span className="sr-only">Open menu</span>
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuItem>
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            View Details
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem>
                                                                            <Pencil className="mr-2 h-4 w-4" />
                                                                            Edit
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem>
                                                                            <Mail className="mr-2 h-4 w-4" />
                                                                            Send Email
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem>
                                                                            <Phone className="mr-2 h-4 w-4" />
                                                                            Call
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem>
                                                                            <User className="mr-2 h-4 w-4" />
                                                                            View Orders
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={8} className="text-center py-6">
                                                            No customers found
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-between space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 py-4">
                                        <div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
                                            Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, filteredCustomers.length)} of {filteredCustomers.length} customers
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
