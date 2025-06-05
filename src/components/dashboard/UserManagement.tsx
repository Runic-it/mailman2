import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  Download,
  Upload,
  RefreshCw,
  UserPlus,
  UserX,
  Shield,
  Key,
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface User {
  id: string;
  name: string;
  email: string;
  domain: string;
  role: string;
  status: "active" | "disabled" | "pending";
  mfaEnabled: boolean;
  lastLogin: string;
  created: string;
}

const UserManagement = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Mock data
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      domain: "example.com",
      role: "Admin",
      status: "active",
      mfaEnabled: true,
      lastLogin: "2023-06-15 14:30",
      created: "2023-01-10",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      domain: "example.com",
      role: "User",
      status: "active",
      mfaEnabled: false,
      lastLogin: "2023-06-14 09:15",
      created: "2023-02-22",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@acme.org",
      domain: "acme.org",
      role: "Admin",
      status: "active",
      mfaEnabled: true,
      lastLogin: "2023-06-10 11:45",
      created: "2023-03-05",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@acme.org",
      domain: "acme.org",
      role: "User",
      status: "disabled",
      mfaEnabled: false,
      lastLogin: "2023-05-20 16:22",
      created: "2023-03-15",
    },
    {
      id: "5",
      name: "Michael Wilson",
      email: "michael@example.com",
      domain: "example.com",
      role: "User",
      status: "pending",
      mfaEnabled: false,
      lastLogin: "Never",
      created: "2023-06-12",
    },
  ];

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsEditUserDialogOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "disabled":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-background p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Dialog
            open={isAddUserDialogOpen}
            onOpenChange={setIsAddUserDialogOpen}
          >
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. All fields marked with * are
                  required.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="domain" className="text-sm font-medium">
                    Domain *
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="example.com">example.com</SelectItem>
                      <SelectItem value="acme.org">acme.org</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role *
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password *
                  </label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password *
                  </label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="requireMfa" />
                  <label htmlFor="requireMfa" className="text-sm font-medium">
                    Require MFA setup on first login
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sendWelcome" />
                  <label htmlFor="sendWelcome" className="text-sm font-medium">
                    Send welcome email with login instructions
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddUserDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name, email, or domain..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="disabled">Disabled</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={
                          selectedUsers.length === users.length &&
                          users.length > 0
                        }
                        onCheckedChange={handleSelectAllUsers}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>MFA</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleSelectUser(user.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.domain}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.mfaEnabled ? (
                          <Badge variant="default" className="bg-green-500">
                            Enabled
                          </Badge>
                        ) : (
                          <Badge variant="outline">Disabled</Badge>
                        )}
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>{user.created}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditUser(user)}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1-{users.length}</strong> of{" "}
                <strong>{users.length}</strong> users
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p>Active users will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="disabled" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p>Disabled users will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p>Pending users will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedUsers.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg p-4 flex items-center space-x-2">
          <span className="text-sm font-medium">
            {selectedUsers.length} users selected
          </span>
          <Button size="sm" variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Change Role
          </Button>
          <Button size="sm" variant="outline">
            <Key className="h-4 w-4 mr-2" />
            Reset Password
          </Button>
          <Button size="sm" variant="outline">
            <UserX className="h-4 w-4 mr-2" />
            Disable
          </Button>
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      )}

      <Dialog
        open={isEditUserDialogOpen}
        onOpenChange={setIsEditUserDialogOpen}
      >
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="editFirstName"
                    className="text-sm font-medium"
                  >
                    First Name
                  </label>
                  <Input
                    id="editFirstName"
                    defaultValue={currentUser.name.split(" ")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="editLastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input
                    id="editLastName"
                    defaultValue={currentUser.name.split(" ")[1] || ""}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="editEmail" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="editEmail"
                  type="email"
                  defaultValue={currentUser.email}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="editDomain" className="text-sm font-medium">
                  Domain
                </label>
                <Select defaultValue={currentUser.domain}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="example.com">example.com</SelectItem>
                    <SelectItem value="acme.org">acme.org</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="editRole" className="text-sm font-medium">
                  Role
                </label>
                <Select defaultValue={currentUser.role.toLowerCase()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="editStatus" className="text-sm font-medium">
                  Status
                </label>
                <Select defaultValue={currentUser.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="editMfa"
                  defaultChecked={currentUser.mfaEnabled}
                />
                <label htmlFor="editMfa" className="text-sm font-medium">
                  MFA Enabled
                </label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
