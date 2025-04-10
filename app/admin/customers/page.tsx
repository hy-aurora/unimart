"use client";

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  MoreHorizontal,
  Search,
  User,
  Mail,
  Phone,
  Edit,
  Trash2,
  Eye,
  UserPlus,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { GenericId } from "convex/values";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [confirmActionModalOpen, setConfirmActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"disable" | "delete" | null>(null);
  
  // Query to get all users
  const users = useQuery(api.users.getAllUsers) || [];
  
  // Mutation for disabling/enabling users
  const updateUserStatus = useMutation(api.users.updateStatus);
  
  // Get current admin user
  const currentUser = useQuery(api.users.get);
  
  // Filter users based on search query
  const filteredUsers = users.filter((user: { name: string; email: string; username: string; }) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.username?.toLowerCase().includes(searchLower)
    );
  });
  
  // Selected user details
  const selectedUser = filteredUsers.find((user: { _id: string | null; }) => user._id === selectedUserId);
  
  const handleViewUserDetails = (userId: string) => {
    setSelectedUserId(userId);
    setIsDetailsModalOpen(true);
  };
  
  // Format user role with a badge
  const renderRoleBadge = (role: string) => {
    return role === "admin" ? (
      <Badge className="bg-indigo-600">Admin</Badge>
    ) : (
      <Badge variant="outline">Customer</Badge>
    );
  };
  
  // Generate avatar fallback from user's name
  const getAvatarFallback = (name: string) => {
    if (!name) return "?";
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Handle disable/enable user
  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await updateUserStatus({
        userId: userId as any,
        isActive: !currentStatus
      });
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };
  
  // Open confirmation modal
  const confirmAction = (userId: string, type: "disable" | "delete") => {
    setSelectedUserId(userId);
    setActionType(type);
    setConfirmActionModalOpen(true);
  };
  
  // Execute the confirmed action
  const executeAction = async () => {
    if (!selectedUserId || !actionType) return;
    
    if (actionType === "disable") {
      const user = users.find((u: any) => u._id === selectedUserId);
      if (user) {
        await handleToggleUserStatus(selectedUserId, user.isActive !== false);
      }
    } else if (actionType === "delete") {
      // Delete functionality would go here
      console.log("Delete user:", selectedUserId);
    }
    
    setConfirmActionModalOpen(false);
  };
  
  // Check if user is admin
  const isUserAdmin = (user: any) => user.role === "admin";
  
  // Check if this is the current logged-in user
  const isCurrentUser = (user: any) => currentUser && user._id === currentUser.id;

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <Button className="w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Customer
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
            <CardDescription>
              View and manage all registered users and customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 md:items-center justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Search customers..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user: any) => {
                    const isAdmin = isUserAdmin(user);
                    const isCurrent = isCurrentUser(user);
                    const isActive = user.isActive !== false; // If not explicitly false, consider active
                    
                    return (
                      <TableRow key={user._id} className={!isActive ? "opacity-70" : ""}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.imageUrl} />
                              <AvatarFallback>{getAvatarFallback(String(user.name || ""))}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              {user.username && <p className="text-sm text-gray-500">@{user.username}</p>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{renderRoleBadge(user.role)}</TableCell>
                        <TableCell>
                          <Badge variant={isActive ? "outline" : "destructive"} className={
                            isActive ? "bg-green-50 text-green-700 border-green-200" : ""
                          }>
                            {isActive ? "Active" : "Disabled"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => user._id && handleViewUserDetails(String(user._id))}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              
                              {/* Edit option - disabled for admin accounts except current user */}
                              <DropdownMenuItem 
                                disabled={isAdmin && !isCurrent}
                                title={isAdmin && !isCurrent ? "Cannot modify other admin accounts" : ""}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Customer
                              </DropdownMenuItem>
                              
                              {/* Disable/Enable option - disabled for admins */}
                              <DropdownMenuItem 
                                onClick={() => user._id && !isAdmin && confirmAction(String(user._id), "disable")}
                                disabled={isAdmin}
                                title={isAdmin ? "Cannot disable admin accounts" : ""}
                              >
                                {isActive ? (
                                  <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Disable Account
                                  </>
                                ) : (
                                  <>
                                    <User className="mr-2 h-4 w-4" />
                                    Enable Account
                                  </>
                                )}
                              </DropdownMenuItem>
                              
                              {/* Delete option - disabled for admins */}
                              <DropdownMenuItem 
                                onClick={() => user._id && !isAdmin && confirmAction(String(user._id), "delete")} 
                                className="text-red-600"
                                disabled={isAdmin}
                                title={isAdmin ? "Cannot delete admin accounts" : ""}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Customer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details Modal */}
      {selectedUser && (
        <Modal isOpen={isDetailsModalOpen} onOpenChange={(open) => setIsDetailsModalOpen(open)} size="2xl">
          <ModalContent>
            {() => (
              <>
                <ModalHeader>
                  <h3 className="text-xl font-semibold">Customer Details</h3>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={selectedUser.imageUrl} />
                      <AvatarFallback className="text-lg">{getAvatarFallback(selectedUser.name)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                    <p className="text-gray-500">{renderRoleBadge(selectedUser.role)}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Username</h4>
                        <p>{selectedUser.username || "Not set"}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Email Address</h4>
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {selectedUser.email}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h4>
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          {selectedUser.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Home Address</h4>
                        <p>{selectedUser.address || "No address on file"}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Account Status</h4>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Order history would go here if we had that data */}
                  <div className="mt-8">
                    <h4 className="font-medium mb-2">Recent Orders</h4>
                    <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
                      No order history available for this customer
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
                  <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* Confirmation Modal */}
      <Modal isOpen={confirmActionModalOpen} onOpenChange={(open) => setConfirmActionModalOpen(open)} size="sm">
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <h3 className="text-xl font-semibold">
                  {actionType === "disable" ? "Confirm Account Status Change" : "Confirm Deletion"}
                </h3>
              </ModalHeader>
              <ModalBody>
                {actionType === "disable" && (
                  <p>
                    Are you sure you want to {users.find((u: any) => u._id === selectedUserId)?.isActive !== false ? "disable" : "enable"} this user account? 
                    {users.find((u: any) => u._id === selectedUserId)?.isActive !== false ? 
                      " The user will no longer be able to log in." : 
                      " The user will regain access to their account."}
                  </p>
                )}
                
                {actionType === "delete" && (
                  <p>
                    Are you sure you want to permanently delete this user account? This action cannot be undone.
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  onClick={() => setConfirmActionModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant={actionType === "delete" ? "destructive" : "default"}
                  onClick={executeAction}
                >
                  {actionType === "disable" ? (users.find((u: any) => u._id === selectedUserId)?.isActive !== false ? "Disable Account" : "Enable Account") : "Delete Account"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </AdminLayout>
  );
}
