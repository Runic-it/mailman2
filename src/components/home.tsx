import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Shield,
  Users,
  Server,
  Activity,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Database,
  Globe,
  AlertTriangle,
} from "lucide-react";

interface HomeProps {
  children?: React.ReactNode;
}

const Home = ({ children }: HomeProps = {}) => {
  // Mock data for the dashboard
  const serverStatus = {
    status: "Operational",
    uptime: "99.98%",
    lastRestart: "3 days ago",
  };

  const recentEvents = [
    {
      id: 1,
      type: "security",
      message: "Failed login attempt blocked",
      time: "2 minutes ago",
      severity: "warning",
    },
    {
      id: 2,
      type: "mail",
      message: "Mail queue processed successfully",
      time: "15 minutes ago",
      severity: "info",
    },
    {
      id: 3,
      type: "system",
      message: "Automatic backup completed",
      time: "1 hour ago",
      severity: "success",
    },
    {
      id: 4,
      type: "security",
      message: "IP address blacklisted",
      time: "3 hours ago",
      severity: "warning",
    },
  ];

  const quickStats = [
    { title: "Active Domains", value: 12, icon: Globe },
    { title: "Active Users", value: 248, icon: Users },
    { title: "Emails Today", value: "1.4k", icon: Mail },
    { title: "Threats Blocked", value: 37, icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b runic-bg runic-border px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Runic Mailman</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="Admin"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">
                admin@runicmail.com
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r runic-bg runic-border md:flex">
          <nav className="grid gap-2 p-4">
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link to="/">
                <Activity className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link to="/domains">
                <Globe className="h-4 w-4" />
                Domain Management
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link to="/users">
                <Users className="h-4 w-4" />
                User Management
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link to="/security">
                <Shield className="h-4 w-4" />
                Security Settings
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link to="/spam">
                <AlertTriangle className="h-4 w-4" />
                Spam Control
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link to="/monitoring">
                <Server className="h-4 w-4" />
                System Monitoring
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link to="/tenants">
                <Database className="h-4 w-4" />
                Multi-tenant Management
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link to="/api">
                <Server className="h-4 w-4" />
                API Management
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link to="/operations">
                <Settings className="h-4 w-4" />
                Mail Server Operations
              </Link>
            </Button>
          </nav>
          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          {children ? (
            children
          ) : (
            <div className="space-y-6">
              {/* Dashboard Overview */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {quickStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index} className="runic-bg runic-border">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {stat.title}
                        </CardTitle>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Server Status and Recent Events */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="runic-bg runic-border">
                  <CardHeader>
                    <CardTitle>Server Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                      <Badge variant="default" className="bg-green-600">
                        {serverStatus.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Uptime</span>
                      <span className="font-medium">{serverStatus.uptime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Restart</span>
                      <span className="text-sm text-muted-foreground">
                        {serverStatus.lastRestart}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="runic-bg runic-border">
                  <CardHeader>
                    <CardTitle>Recent Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentEvents.map((event) => (
                        <div key={event.id} className="flex items-start gap-3">
                          <div
                            className={`mt-1 h-2 w-2 rounded-full ${
                              event.severity === "warning"
                                ? "bg-yellow-500"
                                : event.severity === "success"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">
                              {event.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {event.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
