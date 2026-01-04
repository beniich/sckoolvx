import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, BarChart3, Settings, FileSpreadsheet, Workflow, Users } from "lucide-react";

export const QuickActionsWidget = () => {
  const actions = [
    { icon: Brain, label: "Assistant IA", to: "/ai-assistant" },
    { icon: BarChart3, label: "Analytics", to: "/analytics" },
    { icon: FileSpreadsheet, label: "Tableur", to: "/spreadsheet" },
    { icon: Workflow, label: "Tâches", to: "/tasks" },
    { icon: Users, label: "Clients", to: "/clients" },
    { icon: Settings, label: "Paramètres", to: "/settings" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {actions.map((action, index) => (
        <Button
          key={index}
          asChild
          variant="ghost"
          className="flex flex-col h-auto py-3 gap-1 hover:shadow-neu"
        >
          <Link to={action.to}>
            <action.icon className="h-5 w-5 text-primary" />
            <span className="text-xs">{action.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
};
