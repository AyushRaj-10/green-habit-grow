
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Bell,
  Plus,
  X,
  Save,
  Trash2 
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
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface Reminder {
  id: string;
  title: string;
  time: string;
  days: string[];
  type: string;
  active: boolean;
}

const predefinedReminders = [
  {
    id: "1",
    title: "Turn off the tap while brushing",
    time: "08:00",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    type: "water",
    active: true
  },
  {
    id: "2",
    title: "Switch off lights before leaving",
    time: "09:00",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    type: "energy",
    active: true
  },
  {
    id: "3",
    title: "Take a shorter shower",
    time: "18:00",
    days: ["Mon", "Wed", "Fri"],
    type: "water",
    active: true
  }
];

const daysOfWeek = [
  { value: "Mon", label: "M" },
  { value: "Tue", label: "T" },
  { value: "Wed", label: "W" },
  { value: "Thu", label: "T" },
  { value: "Fri", label: "F" },
  { value: "Sat", label: "S" },
  { value: "Sun", label: "S" }
];

const reminderTypes = [
  { value: "water", label: "Water Conservation" },
  { value: "energy", label: "Energy Saving" },
  { value: "waste", label: "Waste Reduction" },
  { value: "other", label: "Other" }
];

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>(predefinedReminders);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newReminder, setNewReminder] = useState<Omit<Reminder, "id">>({
    title: "",
    time: "08:00",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    type: "water",
    active: true
  });
  
  const { toast } = useToast();

  const handleAddReminder = () => {
    if (newReminder.title.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a reminder title",
        variant: "destructive"
      });
      return;
    }

    const reminder: Reminder = {
      ...newReminder,
      id: Date.now().toString()
    };

    setReminders([...reminders, reminder]);
    setIsAddingNew(false);
    setNewReminder({
      title: "",
      time: "08:00",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      type: "water",
      active: true
    });

    toast({
      title: "Success",
      description: "Reminder added successfully!"
    });
  };

  const handleToggleReminder = (id: string) => {
    setReminders(
      reminders.map(reminder =>
        reminder.id === id
          ? { ...reminder, active: !reminder.active }
          : reminder
      )
    );
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast({
      title: "Reminder Deleted",
      description: "The reminder has been removed."
    });
  };

  const handleToggleDay = (day: string) => {
    if (newReminder.days.includes(day)) {
      setNewReminder({
        ...newReminder,
        days: newReminder.days.filter(d => d !== day)
      });
    } else {
      setNewReminder({
        ...newReminder,
        days: [...newReminder.days, day]
      });
    }
  };

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
              <span className="green-gradient-text">Personalized Eco-Reminders</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Set up timely reminders to help you conserve water, save energy, and reduce waste throughout your day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-between items-center mb-6"
          >
            <h2 className="text-2xl font-semibold">Your Reminders</h2>
            {!isAddingNew && (
              <Button onClick={() => setIsAddingNew(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Reminder</span>
              </Button>
            )}
          </motion.div>

          {isAddingNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>New Reminder</CardTitle>
                  <CardDescription>
                    Create a new eco-friendly reminder
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Reminder Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Turn off lights before leaving"
                      value={newReminder.title}
                      onChange={(e) =>
                        setNewReminder({ ...newReminder, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="time">Reminder Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newReminder.time}
                        onChange={(e) =>
                          setNewReminder({ ...newReminder, time: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newReminder.type}
                        onValueChange={(value) =>
                          setNewReminder({ ...newReminder, type: value })
                        }
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          {reminderTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Days</Label>
                    <div className="flex flex-wrap gap-2">
                      {daysOfWeek.map((day) => (
                        <Button
                          key={day.value}
                          type="button"
                          variant={newReminder.days.includes(day.value) ? "default" : "outline"}
                          className="w-10 h-10 p-0 rounded-full"
                          onClick={() => handleToggleDay(day.value)}
                        >
                          {day.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" onClick={() => setIsAddingNew(false)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleAddReminder}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Reminder
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          <div className="space-y-4">
            {reminders.length > 0 ? (
              reminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`transition-opacity ${
                      reminder.active ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Bell
                            className={`h-5 w-5 ${
                              reminder.active ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                          <CardTitle>{reminder.title}</CardTitle>
                        </div>
                        <Switch
                          checked={reminder.active}
                          onCheckedChange={() => handleToggleReminder(reminder.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div>
                          🕙 {reminder.time}
                        </div>
                        <div>
                          📆 {reminder.days.join(", ")}
                        </div>
                        <div>
                          🏷️ {reminderTypes.find(t => t.value === reminder.type)?.label || reminder.type}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/80"
                        onClick={() => handleDeleteReminder(reminder.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center p-12 border border-dashed rounded-lg">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No reminders yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first eco-friendly reminder to get started.
                </p>
                <Button onClick={() => setIsAddingNew(true)}>
                  Add Your First Reminder
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
