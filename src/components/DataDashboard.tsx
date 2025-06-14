import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Download,
  BarChart2,
  LineChart,
  PieChart,
  Activity,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DataDashboardProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  cellularMetrics?: {
    name: string;
    value: number;
    unit: string;
    change?: number;
  }[];
  pathwayActivities?: {
    name: string;
    activity: number;
    trend: "increasing" | "decreasing" | "stable";
  }[];
}

const DataDashboard: React.FC<DataDashboardProps> = ({
  isExpanded = true,
  onToggleExpand = () => {},
  cellularMetrics = [
    { name: "ATP Production", value: 78.4, unit: "μmol/min", change: 2.3 },
    { name: "Membrane Potential", value: -70.2, unit: "mV", change: -0.5 },
    { name: "pH Level", value: 7.2, unit: "", change: 0.1 },
    { name: "Ca²⁺ Concentration", value: 0.12, unit: "μM", change: 0.03 },
    { name: "Reactive Oxygen Species", value: 22.8, unit: "nM", change: 1.7 },
  ],
  pathwayActivities = [
    { name: "MAPK Cascade", activity: 67, trend: "increasing" },
    { name: "G-Protein Signaling", activity: 42, trend: "stable" },
    { name: "Tyrosine Kinase", activity: 83, trend: "decreasing" },
    { name: "Ca²⁺ Signaling", activity: 51, trend: "increasing" },
    { name: "Apoptosis Pathway", activity: 12, trend: "stable" },
  ],
}) => {
  const [activeTab, setActiveTab] = useState("metrics");
  const [chartType, setChartType] = useState("line");
  const [timeRange, setTimeRange] = useState("1h");

  // Placeholder for chart components
  const renderChart = () => {
    return (
      <div className="h-[180px] w-full flex items-center justify-center bg-muted/20 rounded-md">
        {chartType === "line" && (
          <div className="flex flex-col items-center">
            <LineChart className="h-12 w-12 text-primary/60" />
            <p className="text-sm text-muted-foreground mt-2">
              Line Chart Visualization
            </p>
          </div>
        )}
        {chartType === "bar" && (
          <div className="flex flex-col items-center">
            <BarChart2 className="h-12 w-12 text-primary/60" />
            <p className="text-sm text-muted-foreground mt-2">
              Bar Chart Visualization
            </p>
          </div>
        )}
        {chartType === "pie" && (
          <div className="flex flex-col items-center">
            <PieChart className="h-12 w-12 text-primary/60" />
            <p className="text-sm text-muted-foreground mt-2">
              Pie Chart Visualization
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderTrendIndicator = (
    trend: "increasing" | "decreasing" | "stable",
  ) => {
    if (trend === "increasing") {
      return <span className="text-green-500">↑</span>;
    } else if (trend === "decreasing") {
      return <span className="text-red-500">↓</span>;
    }
    return <span className="text-gray-500">→</span>;
  };

  const renderChangeIndicator = (change?: number) => {
    if (!change) return null;
    if (change > 0) {
      return <span className="text-green-500 text-xs ml-1">+{change}</span>;
    } else if (change < 0) {
      return <span className="text-red-500 text-xs ml-1">{change}</span>;
    }
    return <span className="text-gray-500 text-xs ml-1">{change}</span>;
  };

  return (
    <div
      className={`w-full bg-background border-t ${isExpanded ? "h-[250px]" : "h-10"}`}
    >
      <div className="flex justify-between items-center px-4 h-10 border-b">
        <div className="flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          <h3 className="text-sm font-medium">Data Dashboard</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggleExpand}>
          {isExpanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {isExpanded && (
          <>
            <div className="p-4 h-[calc(250px-40px)] overflow-auto">
              <div className="flex justify-end items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Chart Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15m">15 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="6h">6 hours</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Export
                  </Button>
                </div>
              </div>

              <TabsList className="mb-4">
                <TabsTrigger value="metrics">Cellular Metrics</TabsTrigger>
                <TabsTrigger value="pathways">Pathway Activities</TabsTrigger>
                <TabsTrigger value="comparison">Data Comparison</TabsTrigger>
              </TabsList>
            </div>
          </>
        )}

        <TabsContent
          value="metrics"
          className="m-0"
          style={{ display: isExpanded ? "block" : "none" }}
        >
          <div className="px-4">
            <div className="grid grid-cols-5 gap-4 mb-4">
              {cellularMetrics.map((metric, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">{metric.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="text-2xl font-bold">
                      {metric.value}
                      <span className="text-sm font-normal ml-1">
                        {metric.unit}
                      </span>
                      {renderChangeIndicator(metric.change)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {renderChart()}
          </div>
        </TabsContent>

        <TabsContent
          value="pathways"
          className="m-0"
          style={{ display: isExpanded ? "block" : "none" }}
        >
          <div className="px-4">
            <div className="grid grid-cols-5 gap-4 mb-4">
              {pathwayActivities.map((pathway, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">{pathway.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="text-2xl font-bold">
                      {pathway.activity}%{renderTrendIndicator(pathway.trend)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {renderChart()}
          </div>
        </TabsContent>

        <TabsContent
          value="comparison"
          className="m-0"
          style={{ display: isExpanded ? "block" : "none" }}
        >
          <div className="px-4">
            <div className="flex h-[180px] items-center justify-center bg-muted/20 rounded-md">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Select experimental dataset to compare with simulation
                </p>
                <Button variant="outline" className="mt-2">
                  Load Experimental Data
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataDashboard;
