"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Eye, Check, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactAdminPage() {
  const contactQueries = useQuery(api.contactQueries.getAll);
  const respondToQuery = useMutation(api.contactQueries.respondToContactQuery);
  
  const [selectedQuery, setSelectedQuery] = useState<any | null>(null);
  const [responseText, setResponseText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle opening the response dialog
  const handleViewQuery = (query: any) => {
    setSelectedQuery(query);
    setResponseText(query.responseText || "");
    setIsDialogOpen(true);
  };
  
  // Handle submitting a response
  const handleSubmitResponse = async () => {
    if (!selectedQuery || !responseText.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await respondToQuery({
        queryId: selectedQuery._id as Id<"admin_queries">,
        response: responseText,
      });
      
      toast.success("Response sent successfully");
      setIsDialogOpen(false);
      setResponseText("");
      setSelectedQuery(null);
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error("Failed to send response");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Filter queries by response status
  const pendingQueries = contactQueries?.filter(q => !q.responded) || [];
  const respondedQueries = contactQueries?.filter(q => q.responded) || [];
  
  if (contactQueries === undefined) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Queries</h1>
        <Badge variant="outline" className="px-3 py-1">
          <Clock className="h-4 w-4 mr-1" />
          {pendingQueries.length} pending
        </Badge>
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">
            Pending ({pendingQueries.length})
          </TabsTrigger>
          <TabsTrigger value="responded">
            Responded ({respondedQueries.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          {renderQueriesTable(pendingQueries, handleViewQuery)}
        </TabsContent>
        
        <TabsContent value="responded">
          {renderQueriesTable(respondedQueries, handleViewQuery)}
        </TabsContent>
      </Tabs>
      
      {/* Response Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Query Details</DialogTitle>
            <DialogDescription>
              Review and respond to this customer query
            </DialogDescription>
          </DialogHeader>
          
          {selectedQuery && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">From</p>
                    <p>{selectedQuery.name} &lt;{selectedQuery.email}&gt;</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p>{new Date(selectedQuery.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Subject</p>
                    <p>{selectedQuery.subject || "General Inquiry"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p>{selectedQuery.phone || "Not provided"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Message</p>
                  <div className="bg-white dark:bg-gray-950 p-3 rounded-md whitespace-pre-wrap">
                    {selectedQuery.message}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Your Response</h4>
                  {selectedQuery.responded && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Check className="h-3 w-3 mr-1" />
                      Responded
                    </Badge>
                  )}
                </div>
                <Textarea
                  value={responseText}
                  onChange={e => setResponseText(e.target.value)}
                  placeholder="Type your response here..."
                  rows={6}
                  disabled={selectedQuery.responded || isSubmitting}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            {!selectedQuery?.responded && (
              <Button 
                onClick={handleSubmitResponse} 
                disabled={!responseText.trim() || isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Response"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper function to render a table of queries
function renderQueriesTable(queries: any[], onViewQuery: (query: any) => void) {
  if (queries.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md border-dashed">
        <Mail className="h-10 w-10 mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500">No queries to display</p>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {queries.map((query) => (
          <TableRow key={query._id}>
            <TableCell className="whitespace-nowrap">
              {new Date(query.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>{query.name}</TableCell>
            <TableCell>{query.email}</TableCell>
            <TableCell>{query.subject || "General Inquiry"}</TableCell>
            <TableCell>
              {query.responded ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Check className="h-3 w-3 mr-1" />
                  Responded
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                  Pending
                </Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewQuery(query)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
