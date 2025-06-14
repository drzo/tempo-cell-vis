import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, ChevronRight, RefreshCw, Save } from "lucide-react";

interface ControlPanelProps {
  onApplyChanges?: (parameters: any) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const ControlPanel = ({
  onApplyChanges = () => {},
  isCollapsed = false,
  onToggleCollapse = () => {},
}: ControlPanelProps) => {
  const [parameters, setParameters] = useState({
    // Reaction rates
    glycolysisRate: 50,
    krebs_cycle_rate: 40,
    electron_transport_rate: 60,
    protein_synthesis_rate: 45,

    // Membrane potentials
    cell_membrane_potential: -70,
    mitochondrial_membrane_potential: -140,
    er_membrane_potential: -60,

    // Transport rates
    sodium_transport_rate: 30,
    potassium_transport_rate: 25,
    calcium_transport_rate: 20,

    // Environmental factors
    temperature: 37,
    ph_level: 7.4,
    oxygen_level: 21,

    // Toggles
    enable_autophagy: true,
    enable_apoptosis_pathway: false,
    enable_stress_response: true,
  });

  const handleSliderChange = (name: string, value: number[]) => {
    setParameters({
      ...parameters,
      [name]: value[0],
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setParameters({
      ...parameters,
      [name]: parseFloat(value) || 0,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setParameters({
      ...parameters,
      [name]: checked,
    });
  };

  const handleApply = () => {
    onApplyChanges(parameters);
  };

  const handleReset = () => {
    setParameters({
      // Reset to default values
      glycolysisRate: 50,
      krebs_cycle_rate: 40,
      electron_transport_rate: 60,
      protein_synthesis_rate: 45,
      cell_membrane_potential: -70,
      mitochondrial_membrane_potential: -140,
      er_membrane_potential: -60,
      sodium_transport_rate: 30,
      potassium_transport_rate: 25,
      calcium_transport_rate: 20,
      temperature: 37,
      ph_level: 7.4,
      oxygen_level: 21,
      enable_autophagy: true,
      enable_apoptosis_pathway: false,
      enable_stress_response: true,
    });
  };

  if (isCollapsed) {
    return (
      <div className="h-full w-12 bg-background border-l flex flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={onToggleCollapse}>
          <ChevronRight className="h-5 w-5" />
        </Button>
        <div className="rotate-90 mt-8 text-sm font-medium text-muted-foreground">
          Control Panel
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-[350px] bg-background border-l overflow-y-auto flex flex-col">
      <div className="p-4 flex items-center justify-between border-b">
        <h2 className="text-lg font-semibold">Control Panel</h2>
        <Button variant="ghost" size="icon" onClick={onToggleCollapse}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Accordion type="single" collapsible className="w-full">
          {/* Reaction Rates Section */}
          <AccordionItem value="reaction-rates">
            <AccordionTrigger className="font-medium">
              Reaction Rates
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="glycolysis-rate">Glycolysis Rate</Label>
                    <span className="text-sm">
                      {parameters.glycolysisRate}%
                    </span>
                  </div>
                  <Slider
                    id="glycolysis-rate"
                    min={0}
                    max={100}
                    step={1}
                    value={[parameters.glycolysisRate]}
                    onValueChange={(value) =>
                      handleSliderChange("glycolysisRate", value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="krebs-cycle-rate">Krebs Cycle Rate</Label>
                    <span className="text-sm">
                      {parameters.krebs_cycle_rate}%
                    </span>
                  </div>
                  <Slider
                    id="krebs-cycle-rate"
                    min={0}
                    max={100}
                    step={1}
                    value={[parameters.krebs_cycle_rate]}
                    onValueChange={(value) =>
                      handleSliderChange("krebs_cycle_rate", value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="electron-transport-rate">
                      Electron Transport Rate
                    </Label>
                    <span className="text-sm">
                      {parameters.electron_transport_rate}%
                    </span>
                  </div>
                  <Slider
                    id="electron-transport-rate"
                    min={0}
                    max={100}
                    step={1}
                    value={[parameters.electron_transport_rate]}
                    onValueChange={(value) =>
                      handleSliderChange("electron_transport_rate", value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="protein-synthesis-rate">
                      Protein Synthesis Rate
                    </Label>
                    <span className="text-sm">
                      {parameters.protein_synthesis_rate}%
                    </span>
                  </div>
                  <Slider
                    id="protein-synthesis-rate"
                    min={0}
                    max={100}
                    step={1}
                    value={[parameters.protein_synthesis_rate]}
                    onValueChange={(value) =>
                      handleSliderChange("protein_synthesis_rate", value)
                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Membrane Potentials Section */}
          <AccordionItem value="membrane-potentials">
            <AccordionTrigger className="font-medium">
              Membrane Potentials
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="cell-membrane-potential">
                      Cell Membrane (mV)
                    </Label>
                    <span className="text-sm">
                      {parameters.cell_membrane_potential}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="cell-membrane-potential"
                      min={-100}
                      max={0}
                      step={1}
                      value={[parameters.cell_membrane_potential]}
                      onValueChange={(value) =>
                        handleSliderChange("cell_membrane_potential", value)
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={parameters.cell_membrane_potential}
                      onChange={(e) =>
                        handleInputChange(
                          "cell_membrane_potential",
                          e.target.value,
                        )
                      }
                      className="w-20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="mitochondrial-membrane-potential">
                      Mitochondrial Membrane (mV)
                    </Label>
                    <span className="text-sm">
                      {parameters.mitochondrial_membrane_potential}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="mitochondrial-membrane-potential"
                      min={-200}
                      max={-50}
                      step={1}
                      value={[parameters.mitochondrial_membrane_potential]}
                      onValueChange={(value) =>
                        handleSliderChange(
                          "mitochondrial_membrane_potential",
                          value,
                        )
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={parameters.mitochondrial_membrane_potential}
                      onChange={(e) =>
                        handleInputChange(
                          "mitochondrial_membrane_potential",
                          e.target.value,
                        )
                      }
                      className="w-20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="er-membrane-potential">
                      ER Membrane (mV)
                    </Label>
                    <span className="text-sm">
                      {parameters.er_membrane_potential}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="er-membrane-potential"
                      min={-90}
                      max={-30}
                      step={1}
                      value={[parameters.er_membrane_potential]}
                      onValueChange={(value) =>
                        handleSliderChange("er_membrane_potential", value)
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={parameters.er_membrane_potential}
                      onChange={(e) =>
                        handleInputChange(
                          "er_membrane_potential",
                          e.target.value,
                        )
                      }
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Transport Rates Section */}
          <AccordionItem value="transport-rates">
            <AccordionTrigger className="font-medium">
              Transport Rates
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="sodium-transport-rate">Na+ Transport</Label>
                    <span className="text-sm">
                      {parameters.sodium_transport_rate} units/s
                    </span>
                  </div>
                  <Slider
                    id="sodium-transport-rate"
                    min={0}
                    max={100}
                    step={1}
                    value={[parameters.sodium_transport_rate]}
                    onValueChange={(value) =>
                      handleSliderChange("sodium_transport_rate", value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="potassium-transport-rate">
                      K+ Transport
                    </Label>
                    <span className="text-sm">
                      {parameters.potassium_transport_rate} units/s
                    </span>
                  </div>
                  <Slider
                    id="potassium-transport-rate"
                    min={0}
                    max={100}
                    step={1}
                    value={[parameters.potassium_transport_rate]}
                    onValueChange={(value) =>
                      handleSliderChange("potassium_transport_rate", value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="calcium-transport-rate">
                      Ca2+ Transport
                    </Label>
                    <span className="text-sm">
                      {parameters.calcium_transport_rate} units/s
                    </span>
                  </div>
                  <Slider
                    id="calcium-transport-rate"
                    min={0}
                    max={100}
                    step={1}
                    value={[parameters.calcium_transport_rate]}
                    onValueChange={(value) =>
                      handleSliderChange("calcium_transport_rate", value)
                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Environmental Factors Section */}
          <AccordionItem value="environmental-factors">
            <AccordionTrigger className="font-medium">
              Environmental Factors
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <span className="text-sm">{parameters.temperature}°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="temperature"
                      min={20}
                      max={45}
                      step={0.1}
                      value={[parameters.temperature]}
                      onValueChange={(value) =>
                        handleSliderChange("temperature", value)
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={parameters.temperature}
                      onChange={(e) =>
                        handleInputChange("temperature", e.target.value)
                      }
                      className="w-20"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="ph-level">pH Level</Label>
                    <span className="text-sm">{parameters.ph_level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="ph-level"
                      min={6.5}
                      max={8.0}
                      step={0.1}
                      value={[parameters.ph_level]}
                      onValueChange={(value) =>
                        handleSliderChange("ph_level", value)
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={parameters.ph_level}
                      onChange={(e) =>
                        handleInputChange("ph_level", e.target.value)
                      }
                      className="w-20"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="oxygen-level">Oxygen Level (%)</Label>
                    <span className="text-sm">{parameters.oxygen_level}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="oxygen-level"
                      min={0}
                      max={100}
                      step={1}
                      value={[parameters.oxygen_level]}
                      onValueChange={(value) =>
                        handleSliderChange("oxygen_level", value)
                      }
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={parameters.oxygen_level}
                      onChange={(e) =>
                        handleInputChange("oxygen_level", e.target.value)
                      }
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Pathway Toggles Section */}
          <AccordionItem value="pathway-toggles">
            <AccordionTrigger className="font-medium">
              Pathway Toggles
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-autophagy" className="cursor-pointer">
                    Enable Autophagy
                  </Label>
                  <Switch
                    id="enable-autophagy"
                    checked={parameters.enable_autophagy}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("enable_autophagy", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-apoptosis" className="cursor-pointer">
                    Enable Apoptosis Pathway
                  </Label>
                  <Switch
                    id="enable-apoptosis"
                    checked={parameters.enable_apoptosis_pathway}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("enable_apoptosis_pathway", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="enable-stress-response"
                    className="cursor-pointer"
                  >
                    Enable Stress Response
                  </Label>
                  <Switch
                    id="enable-stress-response"
                    checked={parameters.enable_stress_response}
                    onCheckedChange={(checked) =>
                      handleSwitchChange("enable_stress_response", checked)
                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="p-4 border-t bg-background sticky bottom-0">
        <div className="flex space-x-2">
          <Button onClick={handleApply} className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            Apply Changes
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
