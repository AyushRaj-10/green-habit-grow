
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Calculator as CalcIcon, 
  Droplets, 
  Flame,
  Leaf,
  RefreshCcw, 
  Trash
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface UsageItem {
  id: string;
  type: string;
  description: string;
  value: number;
  unit: string;
  co2Equivalent: number;
  waterEquivalent: number;
  moneySaved: number;
}

const Calculator = () => {
  const [activeTab, setActiveTab] = useState("water");
  const [waterUsage, setWaterUsage] = useState([
    { id: "shower", description: "Daily Shower", value: 10, unit: "minutes" },
    { id: "laundry", description: "Laundry Loads (Weekly)", value: 3, unit: "loads" },
    { id: "dishwasher", description: "Dishwasher Cycles (Weekly)", value: 4, unit: "cycles" },
  ]);
  const [energyUsage, setEnergyUsage] = useState([
    { id: "electricity", description: "Monthly Electricity", value: 250, unit: "kWh" },
    { id: "heating", description: "Monthly Heating", value: 60, unit: "therms" },
    { id: "driving", description: "Weekly Driving", value: 100, unit: "km" },
  ]);
  
  const [waterLog, setWaterLog] = useState<UsageItem[]>([]);
  const [energyLog, setEnergyLog] = useState<UsageItem[]>([]);
  
  const [newWaterItem, setNewWaterItem] = useState({ description: "", value: 0, unit: "liters" });
  const [newEnergyItem, setNewEnergyItem] = useState({ description: "", value: 0, unit: "kWh" });
  
  const [waterTotal, setWaterTotal] = useState(0);
  const [co2Total, setCo2Total] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);
  const [treeEquivalent, setTreeEquivalent] = useState(0);

  // Calculate impact on mount and when logs change
  useEffect(() => {
    // Calculate water impact
    const waterLiters = waterLog.reduce((acc, item) => acc + (item.waterEquivalent || 0), 0);
    setWaterTotal(Math.round(waterLiters));
    
    // Calculate CO2 impact
    const co2Kg = energyLog.reduce((acc, item) => acc + (item.co2Equivalent || 0), 0);
    setCo2Total(Math.round(co2Kg * 10) / 10);
    
    // Calculate money saved
    const savedMoney = [...waterLog, ...energyLog].reduce((acc, item) => acc + (item.moneySaved || 0), 0);
    setMoneySaved(Math.round(savedMoney * 100) / 100);
    
    // Calculate tree equivalent (rough estimate: 1 tree absorbs ~25kg CO2 per year)
    setTreeEquivalent(Math.round((co2Total / 25) * 10) / 10);
  }, [waterLog, energyLog, co2Total]);

  const handleAddWaterUsage = () => {
    if (newWaterItem.description && newWaterItem.value > 0) {
      // Calculate water equivalent and impacts
      const waterEquivalent = calculateWaterEquivalent(newWaterItem);
      const moneySaved = waterEquivalent * 0.002; // Rough estimate: $0.002 per liter
      
      const newItem: UsageItem = {
        id: `water-${Date.now()}`,
        type: "water",
        description: newWaterItem.description,
        value: newWaterItem.value,
        unit: newWaterItem.unit,
        co2Equivalent: waterEquivalent * 0.0003, // Rough estimate: 0.3g CO2 per liter of water
        waterEquivalent,
        moneySaved
      };
      
      setWaterLog([...waterLog, newItem]);
      setNewWaterItem({ description: "", value: 0, unit: "liters" });
    }
  };

  const handleAddEnergyUsage = () => {
    if (newEnergyItem.description && newEnergyItem.value > 0) {
      // Calculate CO2 equivalent and impacts
      const co2Equivalent = calculateCO2Equivalent(newEnergyItem);
      const moneySaved = newEnergyItem.unit === "kWh" ? newEnergyItem.value * 0.15 : 0; // Rough estimate: $0.15 per kWh
      
      const newItem: UsageItem = {
        id: `energy-${Date.now()}`,
        type: "energy",
        description: newEnergyItem.description,
        value: newEnergyItem.value,
        unit: newEnergyItem.unit,
        co2Equivalent,
        waterEquivalent: co2Equivalent * 500, // Rough estimate: 500L water per kg CO2
        moneySaved
      };
      
      setEnergyLog([...energyLog, newItem]);
      setNewEnergyItem({ description: "", value: 0, unit: "kWh" });
    }
  };

  const calculateWaterEquivalent = (item: {value: number, unit: string}) => {
    switch(item.unit) {
      case "liters":
        return item.value;
      case "minutes": // shower minutes
        return item.value * 10; // ~10 liters per minute
      case "loads": // laundry loads
        return item.value * 50; // ~50 liters per load
      case "cycles": // dishwasher cycles
        return item.value * 15; // ~15 liters per cycle
      default:
        return item.value;
    }
  };

  const calculateCO2Equivalent = (item: {value: number, unit: string}) => {
    switch(item.unit) {
      case "kWh":
        return item.value * 0.5; // ~0.5kg CO2 per kWh (varies by region)
      case "therms":
        return item.value * 5.3; // ~5.3kg CO2 per therm
      case "km":
        return item.value * 0.12; // ~0.12kg CO2 per km (average car)
      default:
        return item.value;
    }
  };

  const handleDeleteLogItem = (id: string, type: string) => {
    if (type === "water") {
      setWaterLog(waterLog.filter(item => item.id !== id));
    } else {
      setEnergyLog(energyLog.filter(item => item.id !== id));
    }
  };

  const handleResetCalculator = () => {
    setWaterLog([]);
    setEnergyLog([]);
  };

  const pieData = [
    { name: "Water", value: waterTotal, color: "#3b82f6" },
    { name: "CO2", value: co2Total * 100, color: "#ef4444" }, // Scaled for better visualization
  ];

  const barData = [
    { name: "Water Saved (L)", value: waterTotal },
    { name: "CO2 Reduced (kg)", value: co2Total },
    { name: "Money Saved ($)", value: moneySaved },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900/30 dark:to-green-900/10">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="mb-4">
              <span className="green-gradient-text">Environmental Impact Calculator</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Track your water usage, calculate CO₂ emissions, and see the positive impact of your sustainable lifestyle choices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalcIcon className="h-5 w-5" />
                  <span>Usage Calculator</span>
                </CardTitle>
                <CardDescription>
                  Enter your usage details to calculate your environmental impact.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="water">
                      <Droplets className="h-4 w-4 mr-2" /> Water Usage
                    </TabsTrigger>
                    <TabsTrigger value="energy">
                      <Flame className="h-4 w-4 mr-2" /> Energy Usage
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="water" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {waterUsage.map((item) => (
                        <Card key={item.id}>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base">{item.description}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center gap-2">
                              <Input 
                                type="number" 
                                min="0"
                                value={item.value} 
                                onChange={(e) => {
                                  const newValue = parseFloat(e.target.value);
                                  setWaterUsage(
                                    waterUsage.map(usage => 
                                      usage.id === item.id 
                                        ? { ...usage, value: isNaN(newValue) ? 0 : newValue } 
                                        : usage
                                    )
                                  );
                                }} 
                              />
                              <span className="text-sm text-muted-foreground whitespace-nowrap">{item.unit}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-5">
                        <Label htmlFor="waterDesc">Description</Label>
                        <Input 
                          id="waterDesc" 
                          placeholder="e.g. Reduced shower time"
                          value={newWaterItem.description}
                          onChange={(e) => setNewWaterItem({...newWaterItem, description: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Label htmlFor="waterValue">Value</Label>
                        <Input 
                          id="waterValue" 
                          type="number"
                          min="0"
                          placeholder="0"
                          value={newWaterItem.value || ""}
                          onChange={(e) => setNewWaterItem({...newWaterItem, value: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="waterUnit">Unit</Label>
                        <select 
                          id="waterUnit"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          value={newWaterItem.unit}
                          onChange={(e) => setNewWaterItem({...newWaterItem, unit: e.target.value})}
                        >
                          <option value="liters">Liters</option>
                          <option value="minutes">Minutes (Shower)</option>
                          <option value="loads">Loads (Laundry)</option>
                          <option value="cycles">Cycles (Dishwasher)</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <Label>&nbsp;</Label>
                        <Button onClick={handleAddWaterUsage} className="w-full">Add</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="energy" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {energyUsage.map((item) => (
                        <Card key={item.id}>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base">{item.description}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center gap-2">
                              <Input 
                                type="number" 
                                min="0"
                                value={item.value} 
                                onChange={(e) => {
                                  const newValue = parseFloat(e.target.value);
                                  setEnergyUsage(
                                    energyUsage.map(usage => 
                                      usage.id === item.id 
                                        ? { ...usage, value: isNaN(newValue) ? 0 : newValue } 
                                        : usage
                                    )
                                  );
                                }} 
                              />
                              <span className="text-sm text-muted-foreground whitespace-nowrap">{item.unit}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-5">
                        <Label htmlFor="energyDesc">Description</Label>
                        <Input 
                          id="energyDesc" 
                          placeholder="e.g. Energy efficient appliances"
                          value={newEnergyItem.description}
                          onChange={(e) => setNewEnergyItem({...newEnergyItem, description: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <Label htmlFor="energyValue">Value</Label>
                        <Input 
                          id="energyValue" 
                          type="number"
                          min="0"
                          placeholder="0"
                          value={newEnergyItem.value || ""}
                          onChange={(e) => setNewEnergyItem({...newEnergyItem, value: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="energyUnit">Unit</Label>
                        <select 
                          id="energyUnit"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          value={newEnergyItem.unit}
                          onChange={(e) => setNewEnergyItem({...newEnergyItem, unit: e.target.value})}
                        >
                          <option value="kWh">kWh</option>
                          <option value="therms">Therms</option>
                          <option value="km">Kilometers</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <Label>&nbsp;</Label>
                        <Button onClick={handleAddEnergyUsage} className="w-full">Add</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    <span>Your Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{waterTotal.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Liters Saved</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <Flame className="h-8 w-8 text-red-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{co2Total.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">kg CO₂ Reduced</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{treeEquivalent}</div>
                        <div className="text-sm text-muted-foreground">Trees Planted Equivalent</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <svg className="h-8 w-8 text-yellow-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-2xl font-bold">${moneySaved.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Money Saved</div>
                      </div>
                    </div>
                    
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => {
                            if (name === "CO2") return [co2Total.toFixed(1) + " kg", name];
                            return [value.toLocaleString() + " L", name];
                          }} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Usage Log</span>
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={handleResetCalculator}>
                      <RefreshCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-40">
                      {(waterLog.length > 0 || energyLog.length > 0) ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={barData}
                            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#4ade80" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                          No data logged yet
                        </div>
                      )}
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto">
                      <div className="space-y-2">
                        {[...waterLog, ...energyLog]
                          .sort((a, b) => a.type.localeCompare(b.type))
                          .map((item) => (
                            <div 
                              key={item.id}
                              className="flex justify-between items-center p-2 rounded-md text-sm bg-muted/50"
                            >
                              <div>
                                <div className="font-medium">{item.description}</div>
                                <div className="text-xs text-muted-foreground">
                                  {item.type === "water" ? (
                                    <span className="flex items-center gap-1">
                                      <Droplets className="h-3 w-3 text-blue-500" /> 
                                      {item.waterEquivalent.toFixed(1)} liters saved
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1">
                                      <Flame className="h-3 w-3 text-red-500" /> 
                                      {item.co2Equivalent.toFixed(1)} kg CO₂ reduced
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteLogItem(item.id, item.type)}
                              >
                                <Trash className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </div>
                          ))}
                      </div>
                      
                      {waterLog.length === 0 && energyLog.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>Add water and energy usage items to see your impact</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
