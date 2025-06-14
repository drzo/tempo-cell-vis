import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  AlertCircle,
  Search,
  Save,
  Play,
  Plus,
  Trash2,
  FileCode,
  FolderTree,
} from "lucide-react";

interface RuleEditorProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface Rule {
  id: string;
  name: string;
  category: string;
  description: string;
  code: string;
  isValid: boolean;
}

const RuleEditor = ({ isOpen = true, onClose = () => {} }: RuleEditorProps) => {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [editedCode, setEditedCode] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showValidationDialog, setShowValidationDialog] = useState(false);

  // Mock data for rules
  const mockRules: Rule[] = [
    {
      id: "rule1",
      name: "Membrane Transport Rule",
      category: "membrane",
      description: "Defines passive transport across the cell membrane",
      code: `rule membrane_transport {
  molecules(outside) = [Na+, K+, Cl-];
  membrane_potential = -70mV;
  
  transport(Na+) {
    direction: inside -> outside;
    rate: 3.0;
    energy_required: false;
  }
  
  transport(K+) {
    direction: outside -> inside;
    rate: 2.0;
    energy_required: false;
  }
}`,
      isValid: true,
    },
    {
      id: "rule2",
      name: "ATP Synthesis",
      category: "mitochondria",
      description: "Models ATP production in the mitochondrial matrix",
      code: `rule atp_synthesis {
  location: mitochondria.matrix;
  reactants: [ADP, Pi, H+];
  products: [ATP, H2O];
  
  conditions {
    proton_gradient > 15mV;
    ADP_concentration > 0.1mM;
  }
  
  rate_constant: 4.5;
  energy_efficiency: 0.65;
}`,
      isValid: true,
    },
    {
      id: "rule3",
      name: "GPCR Signaling",
      category: "signaling",
      description: "G-protein coupled receptor activation cascade",
      code: `rule gpcr_signaling {
  receptor: GPCR;
  ligand: epinephrine;
  
  binding_affinity: 8.5nM;
  
  activation_cascade {
    step1: GPCR + ligand -> GPCR_active;
    step2: GPCR_active + G_protein -> G_alpha + G_beta_gamma;
    step3: G_alpha + adenylyl_cyclase -> cAMP;
  }
  
  feedback_inhibition: true;
  desensitization_time: 120s;
}`,
      isValid: true,
    },
    {
      id: "rule4",
      name: "Protein Synthesis",
      category: "nucleus",
      description: "Transcription and translation process",
      code: `rule protein_synthesis {
  location: [nucleus, ribosome];
  
  transcription {
    template: DNA;
    product: mRNA;
    enzymes: [RNA_polymerase, transcription_factors];
    energy_cost: 2 ATP per nucleotide;
  }
  
  translation {
    template: mRNA;
    product: protein;
    machinery: ribosome;
    energy_cost: 4 GTP per amino_acid;
  }
}`,
      isValid: false,
    },
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "membrane", name: "Membrane" },
    { id: "mitochondria", name: "Mitochondria" },
    { id: "signaling", name: "Signaling Pathways" },
    { id: "nucleus", name: "Nucleus" },
    { id: "cytoskeleton", name: "Cytoskeleton" },
    { id: "organelles", name: "Other Organelles" },
  ];

  const filteredRules = mockRules.filter((rule) => {
    const matchesSearch =
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || rule.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRuleSelect = (rule: Rule) => {
    setSelectedRule(rule);
    setEditedCode(rule.code);
    setValidationErrors([]);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedCode(e.target.value);
  };

  const validateRule = () => {
    // Mock validation logic
    const errors = [];
    if (!editedCode.includes("rule")) {
      errors.push("Missing 'rule' keyword declaration");
    }
    if (!editedCode.includes("{") || !editedCode.includes("}")) {
      errors.push("Missing opening or closing braces");
    }

    setValidationErrors(errors);
    setShowValidationDialog(true);
    return errors.length === 0;
  };

  const saveRule = () => {
    if (validateRule()) {
      // Mock save functionality
      console.log("Rule saved:", editedCode);
      // In a real app, this would update the rule in the database
      if (selectedRule) {
        // Update the rule in the mock data
        const updatedRule = {
          ...selectedRule,
          code: editedCode,
          isValid: true,
        };
        setSelectedRule(updatedRule);
      }
    }
  };

  const createNewRule = () => {
    const newRule: Rule = {
      id: `rule${mockRules.length + 1}`,
      name: "New Rule",
      category: "membrane",
      description: "Description for new rule",
      code: `rule new_rule {
  // Add your rule definition here
}`,
      isValid: false,
    };

    setSelectedRule(newRule);
    setEditedCode(newRule.code);
    setValidationErrors([]);
    setActiveTab("edit");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            P-System Rule Editor
          </DialogTitle>
          <DialogDescription>
            Create and modify rules for cellular processes and molecular
            interactions
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full h-full"
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="browse" className="flex items-center gap-2">
                  <FolderTree className="h-4 w-4" /> Browse Rules
                </TabsTrigger>
                <TabsTrigger value="edit" className="flex items-center gap-2">
                  <FileCode className="h-4 w-4" /> Edit Rule
                </TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={createNewRule}>
                  <Plus className="h-4 w-4 mr-1" /> New Rule
                </Button>
                {selectedRule && (
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                )}
              </div>
            </div>

            <TabsContent
              value="browse"
              className="h-[calc(100%-40px)] overflow-hidden"
            >
              <div className="grid grid-cols-3 gap-4 h-full">
                <Card className="col-span-1 overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Rule Categories</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search rules..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[400px] p-4">
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <Button
                            key={category.id}
                            variant={
                              selectedCategory === category.id
                                ? "secondary"
                                : "ghost"
                            }
                            className="w-full justify-start text-left"
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            {category.name}
                            {category.id !== "all" && (
                              <Badge variant="outline" className="ml-auto">
                                {
                                  mockRules.filter(
                                    (r) => r.category === category.id,
                                  ).length
                                }
                              </Badge>
                            )}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className="col-span-2 overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {selectedCategory === "all"
                        ? "All Rules"
                        : categories.find((c) => c.id === selectedCategory)
                            ?.name || "Rules"}
                    </CardTitle>
                    <CardDescription>
                      {filteredRules.length} rules found
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[400px]">
                      <div className="grid grid-cols-1 gap-2 p-4">
                        {filteredRules.map((rule) => (
                          <Card
                            key={rule.id}
                            className={`cursor-pointer hover:bg-accent transition-colors ${selectedRule?.id === rule.id ? "border-primary" : ""}`}
                            onClick={() => handleRuleSelect(rule)}
                          >
                            <CardHeader className="p-3 pb-1">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-base">
                                  {rule.name}
                                </CardTitle>
                                {rule.isValid ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />{" "}
                                    Valid
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-red-50 text-red-700 border-red-200"
                                  >
                                    <AlertCircle className="h-3 w-3 mr-1" />{" "}
                                    Invalid
                                  </Badge>
                                )}
                              </div>
                              <CardDescription className="text-xs">
                                {rule.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                        {filteredRules.length === 0 && (
                          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                            <p>No rules found matching your criteria</p>
                            <Button
                              variant="link"
                              onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                              }}
                            >
                              Clear filters
                            </Button>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent
              value="edit"
              className="h-[calc(100%-40px)] overflow-hidden"
            >
              {selectedRule ? (
                <div className="grid grid-cols-1 gap-4 h-full">
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">
                            <Input
                              value={selectedRule.name}
                              className="text-lg font-semibold h-7 px-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              onChange={(e) =>
                                setSelectedRule({
                                  ...selectedRule,
                                  name: e.target.value,
                                })
                              }
                            />
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Select defaultValue={selectedRule.category}>
                              <SelectTrigger className="w-[180px] h-7">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories
                                  .filter((c) => c.id !== "all")
                                  .map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <Input
                              value={selectedRule.description}
                              className="text-sm text-muted-foreground h-7"
                              placeholder="Rule description"
                              onChange={(e) =>
                                setSelectedRule({
                                  ...selectedRule,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={validateRule}
                          >
                            <Play className="h-4 w-4 mr-1" /> Validate
                          </Button>
                          <Button size="sm" onClick={saveRule}>
                            <Save className="h-4 w-4 mr-1" /> Save
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="border rounded-md m-4">
                        <Textarea
                          value={editedCode}
                          onChange={handleCodeChange}
                          className="font-mono text-sm h-[350px] resize-none p-4 rounded-md focus-visible:ring-0 border-0"
                        />
                      </div>

                      {validationErrors.length > 0 && (
                        <Alert variant="destructive" className="mx-4 mb-4">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Validation Errors</AlertTitle>
                          <AlertDescription>
                            <ul className="list-disc pl-5 mt-2">
                              {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <p>No rule selected</p>
                  <Button variant="link" onClick={createNewRule}>
                    Create a new rule
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            <span>P-System Rule Editor v1.0</span>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>

        <Dialog
          open={showValidationDialog}
          onOpenChange={setShowValidationDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {validationErrors.length === 0
                  ? "Rule Validation Successful"
                  : "Rule Validation Failed"}
              </DialogTitle>
              <DialogDescription>
                {validationErrors.length === 0
                  ? "Your rule syntax is valid and can be saved to the simulation."
                  : "Please fix the following errors before saving:"}
              </DialogDescription>
            </DialogHeader>

            {validationErrors.length > 0 && (
              <div className="space-y-2">
                <ul className="list-disc pl-5">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <DialogFooter>
              <Button onClick={() => setShowValidationDialog(false)}>
                {validationErrors.length === 0 ? "Continue" : "Fix Errors"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default RuleEditor;
