import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  Home,
  Globe,
  Users,
  Shield,
  AlertTriangle,
  BarChart3,
  Building,
  Key,
  Server,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/" },
    {
      name: "Domain Management",
      icon: <Globe className="h-5 w-5" />,
      path: "/domains",
    },
    {
      name: "User Management",
      icon: <Users className="h-5 w-5" />,
      path: "/users",
    },
    {
      name: "Security Settings",
      icon: <Shield className="h-5 w-5" />,
      path: "/security",
    },
    {
      name: "Spam Control",
      icon: <AlertTriangle className="h-5 w-5" />,
      path: "/spam",
    },
    {
      name: "System Monitoring",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/monitoring",
    },
    {
      name: "Multi-tenant Management",
      icon: <Building className="h-5 w-5" />,
      path: "/tenants",
    },
    { name: "API Management", icon: <Key className="h-5 w-5" />, path: "/api" },
    {
      name: "Mail Server Operations",
      icon: <Server className="h-5 w-5" />,
      path: "/operations",
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform runic-bg runic-border shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${mobileMenuOpen ? "translate-x-0" : ""}`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <img
              src="/images/runic-logo.jpg"
              alt="Runic Mailman Logo"
              className="h-8 w-8 mr-2 rounded"
            />
            <h1 className="text-xl font-bold">Runic Mailman</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <Separator />
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="space-y-1 px-2 py-4">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"}`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                  {item.name === "Security Settings" && (
                    <Badge variant="destructive" className="ml-auto">
                      2
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="runic-bg runic-border shadow-sm z-30">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-medium ml-2">
                Enterprise Mail Exchange Server
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    You have 3 unread notifications
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block">Admin User</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Security & MFA</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background p-4">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
