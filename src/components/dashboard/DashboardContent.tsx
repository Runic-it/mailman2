import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  AlertTriangleIcon,
  ShieldIcon,
  ServerIcon,
  MailIcon,
  UsersIcon,
  ActivityIcon,
  RefreshCwIcon,
} from "lucide-react";

interface ServerMetric {
  name: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  change?: number;
}

interface SecurityEvent {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  timestamp: string;
  message: string;
}

interface MailStats {
  delivered: number;
  queued: number;
  bounced: number;
  spam: number;
  total: number;
}

interface DashboardContentProps {
  metrics?: ServerMetric[];
  securityEvents?: SecurityEvent[];
  mailStats?: MailStats;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  metrics = [
    { name: "CPU Usage", value: 24, unit: "%", status: "normal", change: -2 },
    { name: "Memory Usage", value: 42, unit: "%", status: "normal", change: 5 },
    { name: "Disk Usage", value: 68, unit: "%", status: "warning", change: 3 },
    {
      name: "Network Traffic",
      value: 12.4,
      unit: "MB/s",
      status: "normal",
      change: -1,
    },
  ],
  securityEvents = [
    {
      id: "1",
      type: "Authentication Failure",
      severity: "medium",
      source: "192.168.1.105",
      timestamp: "2023-06-15T14:32:10Z",
      message: "Multiple failed login attempts detected",
    },
    {
      id: "2",
      type: "Spam Detection",
      severity: "low",
      source: "mail-server.example.com",
      timestamp: "2023-06-15T13:45:22Z",
      message: "Increased spam volume from external domain",
    },
    {
      id: "3",
      type: "TLS Certificate",
      severity: "high",
      source: "mail.runicmail.com",
      timestamp: "2023-06-15T12:15:05Z",
      message: "Certificate expiration in 5 days",
    },
    {
      id: "4",
      type: "Firewall Block",
      severity: "medium",
      source: "45.132.192.55",
      timestamp: "2023-06-15T11:22:18Z",
      message: "IP address blocked after multiple SMTP auth failures",
    },
  ],
  mailStats = {
    delivered: 15420,
    queued: 42,
    bounced: 156,
    spam: 2345,
    total: 17963,
  },
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-500";
      case "warning":
        return "text-orange-500";
      case "normal":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-6 bg-background">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <ActivityIcon className="h-4 w-4 mr-2" />
            View All Metrics
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Mail Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {mailStats.total.toLocaleString()}
              </div>
              <MailIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,248</div>
              <UsersIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +3% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Spam Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {mailStats.spam.toLocaleString()}
              </div>
              <ShieldIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              13.1% of total mail volume
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Server Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">99.98%</div>
              <ServerIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              30 days without incidents
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Mail Flow Statistics</CardTitle>
            <CardDescription>
              Overview of mail processing in the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Delivered</p>
                  <p className="text-2xl font-bold">
                    {mailStats.delivered.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center text-green-500">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">8%</span>
                </div>
              </div>
              <Progress value={85} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Queued</p>
                  <p className="text-2xl font-bold">
                    {mailStats.queued.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center text-yellow-500">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">2%</span>
                </div>
              </div>
              <Progress value={5} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Bounced</p>
                  <p className="text-2xl font-bold">
                    {mailStats.bounced.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center text-red-500">
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">3%</span>
                </div>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Detailed Mail Logs
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current server metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{metric.name}</p>
                    <div className="flex items-center">
                      <span
                        className={`text-lg font-bold ${getStatusColor(metric.status)}`}
                      >
                        {metric.value}
                        {metric.unit}
                      </span>
                      {metric.change !== undefined && (
                        <span
                          className={`ml-2 text-xs ${metric.change > 0 ? "text-red-500" : "text-green-500"}`}
                        >
                          {metric.change > 0 ? "+" : ""}
                          {metric.change}%
                        </span>
                      )}
                    </div>
                  </div>
                  <Progress
                    value={
                      metric.name.includes("%")
                        ? metric.value
                        : (metric.value / 20) * 100
                    }
                    className={`h-2 w-24 ${metric.status === "warning" ? "bg-orange-200" : metric.status === "critical" ? "bg-red-200" : ""}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View System Monitor
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Security Events</CardTitle>
            <CardDescription>
              Last 24 hours of security-related activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-4 p-3 rounded-md bg-muted/50"
                >
                  <div
                    className={`p-2 rounded-full ${getSeverityColor(event.severity)}`}
                  >
                    <AlertTriangleIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{event.type}</p>
                      <Badge
                        variant={
                          event.severity === "high" ||
                          event.severity === "critical"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {event.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {event.message}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{event.source}</span>
                      <span>{new Date(event.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Security Events
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <UsersIcon className="mr-2 h-4 w-4" />
              Add New User
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ServerIcon className="mr-2 h-4 w-4" />
              Restart Mail Services
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ShieldIcon className="mr-2 h-4 w-4" />
              Update Security Rules
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ActivityIcon className="mr-2 h-4 w-4" />
              View Mail Queue
            </Button>
          </CardContent>
          <CardFooter>
            <Alert>
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Attention Required</AlertTitle>
              <AlertDescription>
                TLS certificate for mail.runicmail.com expires in 5 days.
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
