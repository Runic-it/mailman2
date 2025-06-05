import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Edit,
  Copy,
  RefreshCw,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Domain {
  id: string;
  name: string;
  status: "active" | "pending" | "failed";
  users: number;
  created: string;
  dnsVerified: boolean;
  spfVerified: boolean;
  dkimVerified: boolean;
  dmarcVerified: boolean;
}

const DomainManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);
  const [isEditDomainOpen, setIsEditDomainOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for domains
  const mockDomains: Domain[] = [
    {
      id: "1",
      name: "example.com",
      status: "active",
      users: 24,
      created: "2023-05-15",
      dnsVerified: true,
      spfVerified: true,
      dkimVerified: true,
      dmarcVerified: true,
    },
    {
      id: "2",
      name: "acmecorp.org",
      status: "pending",
      users: 8,
      created: "2023-06-22",
      dnsVerified: true,
      spfVerified: false,
      dkimVerified: false,
      dmarcVerified: false,
    },
    {
      id: "3",
      name: "techstart.io",
      status: "failed",
      users: 0,
      created: "2023-07-10",
      dnsVerified: false,
      spfVerified: false,
      dkimVerified: false,
      dmarcVerified: false,
    },
    {
      id: "4",
      name: "globalinc.net",
      status: "active",
      users: 56,
      created: "2023-04-03",
      dnsVerified: true,
      spfVerified: true,
      dkimVerified: true,
      dmarcVerified: true,
    },
    {
      id: "5",
      name: "devteam.co",
      status: "active",
      users: 12,
      created: "2023-08-01",
      dnsVerified: true,
      spfVerified: true,
      dkimVerified: false,
      dmarcVerified: true,
    },
  ];

  const filteredDomains = mockDomains
    .filter((domain) =>
      domain.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((domain) => {
      if (activeTab === "all") return true;
      if (activeTab === "active") return domain.status === "active";
      if (activeTab === "pending") return domain.status === "pending";
      if (activeTab === "failed") return domain.status === "failed";
      return true;
    });

  const handleEditDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setIsEditDomainOpen(true);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getVerificationIcon = (verified: boolean) => {
    return verified ? (
      <Check className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500" />
    );
  };

  return (
    <div className="bg-background p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Domain Management</h1>
        <Dialog open={isAddDomainOpen} onOpenChange={setIsAddDomainOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Domain
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Domain</DialogTitle>
              <DialogDescription>
                Enter the domain name you want to add to Runic Mailman.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="domain-name" className="text-right">
                  Domain Name
                </label>
                <Input
                  id="domain-name"
                  placeholder="example.com"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDomainOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Domain</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search domains..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>DNS</TableHead>
                  <TableHead>SPF</TableHead>
                  <TableHead>DKIM</TableHead>
                  <TableHead>DMARC</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDomains.length > 0 ? (
                  filteredDomains.map((domain) => (
                    <TableRow key={domain.id}>
                      <TableCell className="font-medium">
                        {domain.name}
                      </TableCell>
                      <TableCell>{getStatusBadge(domain.status)}</TableCell>
                      <TableCell>{domain.users}</TableCell>
                      <TableCell>
                        {getVerificationIcon(domain.dnsVerified)}
                      </TableCell>
                      <TableCell>
                        {getVerificationIcon(domain.spfVerified)}
                      </TableCell>
                      <TableCell>
                        {getVerificationIcon(domain.dkimVerified)}
                      </TableCell>
                      <TableCell>
                        {getVerificationIcon(domain.dmarcVerified)}
                      </TableCell>
                      <TableCell>{domain.created}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditDomain(domain)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit Domain</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Domain</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      No domains found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Domain Dialog */}
      <Dialog open={isEditDomainOpen} onOpenChange={setIsEditDomainOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Domain Settings: {selectedDomain?.name}</DialogTitle>
            <DialogDescription>
              Configure settings and view DNS records for this domain.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="dns">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dns">DNS Records</TabsTrigger>
              <TabsTrigger value="settings">Domain Settings</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>

            <TabsContent value="dns" className="space-y-4 mt-4">
              <Alert>
                <AlertTitle>DNS Configuration Required</AlertTitle>
                <AlertDescription>
                  Add these DNS records to your domain's DNS settings to ensure
                  proper mail delivery and security.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      MX Record
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <code className="bg-muted p-2 rounded text-xs">
                        @ IN MX 10 mail.{selectedDomain?.name}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleCopyToClipboard(
                            `@ IN MX 10 mail.${selectedDomain?.name}`,
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      SPF Record
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <code className="bg-muted p-2 rounded text-xs">
                        @ IN TXT "v=spf1 mx a:mail.{selectedDomain?.name} ~all"
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleCopyToClipboard(
                            `@ IN TXT "v=spf1 mx a:mail.${selectedDomain?.name} ~all"`,
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      DKIM Record
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <code className="bg-muted p-2 rounded text-xs overflow-x-auto max-w-[500px]">
                        mail._domainkey IN TXT "v=DKIM1; k=rsa;
                        p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCuLPyGgNvQY+1"
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleCopyToClipboard(
                            `mail._domainkey IN TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCuLPyGgNvQY+1"`,
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      DMARC Record
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <code className="bg-muted p-2 rounded text-xs">
                        _dmarc IN TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@
                        {selectedDomain?.name}"
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleCopyToClipboard(
                            `_dmarc IN TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@${selectedDomain?.name}"`,
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="domain-status" className="text-right">
                    Domain Status
                  </label>
                  <div className="col-span-3">
                    {getStatusBadge(selectedDomain?.status || "unknown")}
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="domain-catchall" className="text-right">
                    Catch-all Address
                  </label>
                  <Input
                    id="domain-catchall"
                    placeholder="catchall@example.com"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="domain-quota" className="text-right">
                    Domain Quota (GB)
                  </label>
                  <Input
                    id="domain-quota"
                    type="number"
                    defaultValue="100"
                    className="col-span-3"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="verification" className="space-y-4 mt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>DNS Verification Status</CardTitle>
                    <CardDescription>
                      Check if your DNS records are properly configured.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>MX Record</span>
                        <div className="flex items-center gap-2">
                          {selectedDomain?.dnsVerified ? (
                            <Badge className="bg-green-500">Verified</Badge>
                          ) : (
                            <Badge className="bg-red-500">Not Verified</Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>SPF Record</span>
                        <div className="flex items-center gap-2">
                          {selectedDomain?.spfVerified ? (
                            <Badge className="bg-green-500">Verified</Badge>
                          ) : (
                            <Badge className="bg-red-500">Not Verified</Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>DKIM Record</span>
                        <div className="flex items-center gap-2">
                          {selectedDomain?.dkimVerified ? (
                            <Badge className="bg-green-500">Verified</Badge>
                          ) : (
                            <Badge className="bg-red-500">Not Verified</Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>DMARC Record</span>
                        <div className="flex items-center gap-2">
                          {selectedDomain?.dmarcVerified ? (
                            <Badge className="bg-green-500">Verified</Badge>
                          ) : (
                            <Badge className="bg-red-500">Not Verified</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Verify DNS Records
                    </Button>
                  </CardFooter>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    DNS Troubleshooting Guide
                  </Button>

                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Email Deliverability Test
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDomainOpen(false)}
            >
              Close
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomainManagement;
