import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Layers,
  Plus,
  Minus,
  Move,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";

interface CellVisualizationProps {
  onOrganelleSelect?: (organelle: string) => void;
}

const CellVisualization = ({
  onOrganelleSelect = () => {},
}: CellVisualizationProps) => {
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>(
    null,
  );
  const [visibleLayers, setVisibleLayers] = useState<Record<string, boolean>>({
    membrane: true,
    cytoplasm: true,
    nucleus: true,
    mitochondria: true,
    endoplasmicReticulum: true,
    golgiApparatus: true,
    lysosomes: true,
    peroxisomes: true,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const organelles = [
    { id: "membrane", name: "Cell Membrane", color: "#8884d8" },
    { id: "nucleus", name: "Nucleus", color: "#82ca9d" },
    { id: "mitochondria", name: "Mitochondria", color: "#ffc658" },
    {
      id: "endoplasmicReticulum",
      name: "Endoplasmic Reticulum",
      color: "#ff8042",
    },
    { id: "golgiApparatus", name: "Golgi Apparatus", color: "#0088fe" },
    { id: "lysosomes", name: "Lysosomes", color: "#ff5252" },
    { id: "peroxisomes", name: "Peroxisomes", color: "#8c44fc" },
  ];

  const handleOrganelleClick = (id: string) => {
    setSelectedOrganelle(id);
    onOrganelleSelect(id);
  };

  const toggleLayer = (layerId: string) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const handleRotationChange = (value: number[]) => {
    setRotation(value[0]);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  // Organelle details for the selected organelle
  const getOrganelleDetails = (id: string | null) => {
    if (!id) return null;

    const details: Record<
      string,
      { description: string; functions: string[] }
    > = {
      membrane: {
        description:
          "The cell membrane is a phospholipid bilayer with embedded proteins that separates the interior of the cell from the outside environment.",
        functions: [
          "Selective permeability",
          "Cell signaling",
          "Cell adhesion",
          "Ion conductivity",
        ],
      },
      nucleus: {
        description:
          "The nucleus contains the cell's genetic material (DNA) and controls cellular activities such as metabolism, growth, and reproduction.",
        functions: [
          "DNA replication",
          "Transcription",
          "RNA processing",
          "Ribosome assembly",
        ],
      },
      mitochondria: {
        description:
          "Mitochondria are the powerhouses of the cell, generating most of the cell's supply of ATP through cellular respiration.",
        functions: [
          "ATP production",
          "Electron transport chain",
          "Oxidative phosphorylation",
          "Calcium storage",
        ],
      },
      endoplasmicReticulum: {
        description:
          "The endoplasmic reticulum is an extensive membrane network that synthesizes proteins and lipids.",
        functions: [
          "Protein synthesis",
          "Lipid metabolism",
          "Detoxification",
          "Calcium storage",
        ],
      },
      golgiApparatus: {
        description:
          "The Golgi apparatus modifies, sorts, and packages proteins and lipids for storage in the cell or release outside the cell.",
        functions: [
          "Protein modification",
          "Lipid transport",
          "Lysosome formation",
          "Secretory vesicle formation",
        ],
      },
      lysosomes: {
        description:
          "Lysosomes contain digestive enzymes that break down waste materials and cellular debris.",
        functions: [
          "Intracellular digestion",
          "Autophagy",
          "Cell membrane repair",
          "Apoptosis",
        ],
      },
      peroxisomes: {
        description:
          "Peroxisomes are small organelles that contain enzymes for oxidation reactions, especially for detoxifying harmful substances.",
        functions: [
          "Fatty acid oxidation",
          "Hydrogen peroxide decomposition",
          "Cholesterol synthesis",
          "Amino acid metabolism",
        ],
      },
    };

    return details[id];
  };

  const selectedDetails = getOrganelleDetails(selectedOrganelle);

  return (
    <div className="flex flex-col w-full h-full bg-background rounded-lg border border-border">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Cell Visualization</h2>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={resetView}>
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.5))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
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
              <TooltipContent>
                <p>Toggle Layers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative overflow-hidden" ref={containerRef}>
          <motion.div
            className="w-full h-full relative"
            style={{
              scale: zoom,
              rotate: rotation,
            }}
            drag={true}
            dragConstraints={containerRef}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            dragElastic={0}
          >
            {/* Cell visualization area */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Cell membrane (outer circle) */}
              {visibleLayers.membrane && (
                <div
                  className={`absolute rounded-full border-4 ${selectedOrganelle === "membrane" ? "border-primary" : "border-blue-300"} w-[80%] h-[80%]`}
                  onClick={() => handleOrganelleClick("membrane")}
                ></div>
              )}

              {/* Cytoplasm */}
              {visibleLayers.cytoplasm && (
                <div className="absolute rounded-full bg-blue-50 opacity-30 w-[78%] h-[78%]"></div>
              )}

              {/* Nucleus */}
              {visibleLayers.nucleus && (
                <div
                  className={`absolute rounded-full ${selectedOrganelle === "nucleus" ? "bg-primary" : "bg-blue-600"} opacity-70 w-[30%] h-[30%]`}
                  onClick={() => handleOrganelleClick("nucleus")}
                ></div>
              )}

              {/* Mitochondria */}
              {visibleLayers.mitochondria && (
                <div
                  className={`absolute rounded-full ${selectedOrganelle === "mitochondria" ? "bg-primary" : "bg-orange-500"} opacity-70 w-[15%] h-[10%]`}
                  style={{ top: "30%", left: "60%" }}
                  onClick={() => handleOrganelleClick("mitochondria")}
                ></div>
              )}

              {/* Endoplasmic Reticulum */}
              {visibleLayers.endoplasmicReticulum && (
                <div
                  className={`absolute ${selectedOrganelle === "endoplasmicReticulum" ? "bg-primary" : "bg-green-400"} opacity-70 w-[25%] h-[15%]`}
                  style={{
                    top: "55%",
                    left: "30%",
                    borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%",
                  }}
                  onClick={() => handleOrganelleClick("endoplasmicReticulum")}
                ></div>
              )}

              {/* Golgi Apparatus */}
              {visibleLayers.golgiApparatus && (
                <div
                  className={`absolute ${selectedOrganelle === "golgiApparatus" ? "bg-primary" : "bg-purple-400"} opacity-70 w-[20%] h-[10%]`}
                  style={{
                    top: "40%",
                    left: "35%",
                    borderRadius: "20% 80% 20% 80% / 50% 50% 50% 50%",
                  }}
                  onClick={() => handleOrganelleClick("golgiApparatus")}
                ></div>
              )}

              {/* Lysosomes */}
              {visibleLayers.lysosomes && (
                <div
                  className={`absolute rounded-full ${selectedOrganelle === "lysosomes" ? "bg-primary" : "bg-red-500"} opacity-70 w-[8%] h-[8%]`}
                  style={{ top: "65%", left: "65%" }}
                  onClick={() => handleOrganelleClick("lysosomes")}
                ></div>
              )}

              {/* Peroxisomes */}
              {visibleLayers.peroxisomes && (
                <div
                  className={`absolute rounded-full ${selectedOrganelle === "peroxisomes" ? "bg-primary" : "bg-yellow-500"} opacity-70 w-[6%] h-[6%]`}
                  style={{ top: "35%", left: "25%" }}
                  onClick={() => handleOrganelleClick("peroxisomes")}
                ></div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="w-64 border-l p-4 bg-muted/10 overflow-y-auto">
          <Tabs defaultValue="layers">
            <TabsList className="w-full">
              <TabsTrigger value="layers" className="flex-1">
                Layers
              </TabsTrigger>
              <TabsTrigger value="controls" className="flex-1">
                Controls
              </TabsTrigger>
            </TabsList>

            <TabsContent value="layers" className="mt-4">
              <div className="space-y-2">
                <h3 className="font-medium">Cell Layers</h3>
                {organelles.map((organelle) => (
                  <div
                    key={organelle.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{organelle.name}</span>
                    <Toggle
                      pressed={visibleLayers[organelle.id]}
                      onPressedChange={() => toggleLayer(organelle.id)}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="controls" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Zoom</span>
                    <span className="text-sm">{(zoom * 100).toFixed(0)}%</span>
                  </div>
                  <Slider
                    value={[zoom]}
                    min={0.5}
                    max={2}
                    step={0.01}
                    onValueChange={handleZoomChange}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Rotation</span>
                    <span className="text-sm">{rotation}°</span>
                  </div>
                  <Slider
                    value={[rotation]}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={handleRotationChange}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {selectedOrganelle && selectedDetails && (
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {organelles.find((o) => o.id === selectedOrganelle)?.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  {selectedDetails.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="text-sm font-medium mb-2">Functions:</h4>
                <ul className="text-xs space-y-1">
                  {selectedDetails.functions.map((func, index) => (
                    <li key={index} className="list-disc ml-4">
                      {func}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CellVisualization;
