import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ZoomIn,
  ZoomOut,
  Layers,
  Settings,
  Database,
  Code,
  HelpCircle,
  Info,
} from "lucide-react";
import CellVisualization from "./CellVisualization";
import ControlPanel from "./ControlPanel";
import DataDashboard from "./DataDashboard";
import RuleEditor from "./RuleEditor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Home = () => {
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(true);
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("visualization");
  const [isRuleEditorOpen, setIsRuleEditorOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Cell Simulation Model</h1>
          <span className="text-sm text-muted-foreground">v1.0</span>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help & Documentation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>About this simulation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="p-2 bg-background border-b">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
              <TabsTrigger value="data">Data Analysis</TabsTrigger>
              <TabsTrigger value="validation">Validation</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Control Panel */}
            {isControlPanelOpen && (
              <>
                <ResizablePanel
                  defaultSize={20}
                  minSize={15}
                  maxSize={30}
                  className="bg-background border-r"
                >
                  <div className="p-4 h-full overflow-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Control Panel</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsControlPanelOpen(false)}
                      >
                        &times;
                      </Button>
                    </div>
                    <ControlPanel />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
              </>
            )}

            {/* Main Visualization/Content Area */}
            <ResizablePanel
              defaultSize={isControlPanelOpen ? 80 : 100}
              className="bg-background"
            >
              <div className="h-full flex flex-col">
                <TabsContent value="visualization" className="flex-1 relative">
                  <div className="absolute top-2 left-2 z-10 flex flex-col space-y-2">
                    {!isControlPanelOpen && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setIsControlPanelOpen(true)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>Open Control Panel</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <ZoomIn className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Zoom In</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <ZoomOut className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Zoom Out</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Layers className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Toggle Layers</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Separator className="my-2" />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsRuleEditorOpen(true)}
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Open Rule Editor</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CellVisualization />
                </TabsContent>
                <TabsContent value="data" className="flex-1">
                  <div className="h-full p-4">
                    <h2 className="text-lg font-semibold mb-4">
                      Data Analysis
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Analyze simulation data and compare with experimental
                      results.
                    </p>
                    {/* Data analysis content would go here */}
                    <div className="border rounded-md p-4 h-[80%] flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Data analysis visualization would appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="validation" className="flex-1">
                  <div className="h-full p-4">
                    <h2 className="text-lg font-semibold mb-4">Validation</h2>
                    <p className="text-muted-foreground mb-4">
                      Compare simulation results with experimental cell biology
                      datasets.
                    </p>
                    {/* Validation content would go here */}
                    <div className="border rounded-md p-4 h-[80%] flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Validation tools would appear here
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Dashboard Toggle Button */}
                <div className="border-t p-2 flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                    className="flex items-center"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    {isDashboardOpen ? "Hide Dashboard" : "Show Dashboard"}
                  </Button>
                </div>

                {/* Data Dashboard */}
                {isDashboardOpen && (
                  <div className="h-64 border-t bg-background">
                    <div className="p-2 border-b flex justify-between items-center">
                      <h3 className="text-sm font-medium">Data Dashboard</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsDashboardOpen(false)}
                      >
                        &times;
                      </Button>
                    </div>
                    <div className="p-2 h-[calc(100%-36px)] overflow-auto">
                      <DataDashboard />
                    </div>
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      {/* Rule Editor Dialog */}
      <RuleEditor
        isOpen={isRuleEditorOpen}
        onClose={() => setIsRuleEditorOpen(false)}
      />
    </div>
  );
};

export default Home;
