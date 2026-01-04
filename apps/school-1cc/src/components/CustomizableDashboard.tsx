import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  WidgetContainer,
  StatsWidget,
  RecentActivityWidget,
  QuickActionsWidget,
  WelcomeWidget,
  ChartWidget,
  CalendarWidget,
  TasksWidget,
} from "@/components/widgets";
import {
  LayoutGrid,
  Save,
  Plus,
  Settings2,
  User,
  BarChart3,
  Activity,
  Zap,
  Calendar,
  ListTodo,
  LineChart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface Widget {
  id: string;
  type: string;
  title: string;
}

const WIDGET_TYPES = {
  welcome: { title: "Bienvenue", icon: User, component: WelcomeWidget },
  stats: { title: "Statistiques", icon: BarChart3, component: StatsWidget },
  activity: { title: "Activité récente", icon: Activity, component: RecentActivityWidget },
  quickActions: { title: "Actions rapides", icon: Zap, component: QuickActionsWidget },
  chart: { title: "Graphique", icon: LineChart, component: ChartWidget },
  calendar: { title: "Calendrier", icon: Calendar, component: CalendarWidget },
  tasks: { title: "Tâches", icon: ListTodo, component: TasksWidget },
};

const DEFAULT_WIDGETS: Widget[] = [
  { id: "widget-1", type: "welcome", title: "Bienvenue" },
  { id: "widget-2", type: "stats", title: "Statistiques" },
  { id: "widget-3", type: "quickActions", title: "Actions rapides" },
  { id: "widget-4", type: "activity", title: "Activité récente" },
  { id: "widget-5", type: "chart", title: "Graphique" },
  { id: "widget-6", type: "tasks", title: "Tâches" },
];

export const CustomizableDashboard = () => {
  const { user, dashboard, setDashboard } = useUserStore();
  const { toast } = useToast();
  const [widgets, setWidgets] = useState<Widget[]>(DEFAULT_WIDGETS);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load widgets from dashboard config
  useEffect(() => {
    if (dashboard?.widgets) {
      try {
        let savedWidgets: Widget[];
        if (typeof dashboard.widgets === "string") {
          savedWidgets = JSON.parse(dashboard.widgets);
        } else {
          savedWidgets = dashboard.widgets as unknown as Widget[];
        }
        if (Array.isArray(savedWidgets) && savedWidgets.length > 0) {
          setWidgets(savedWidgets);
        }
      } catch (e) {
        console.error("Error parsing widgets:", e);
      }
    }
  }, [dashboard]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addWidget = (type: string) => {
    const widgetConfig = WIDGET_TYPES[type as keyof typeof WIDGET_TYPES];
    if (!widgetConfig) return;

    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      type,
      title: widgetConfig.title,
    };

    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  const saveLayout = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("user_dashboards")
        .update({ widgets: JSON.stringify(widgets) })
        .eq("user_id", user.id);

      if (error) throw error;

      // Update local state
      if (dashboard) {
        setDashboard({ ...dashboard, widgets: JSON.stringify(widgets) });
      }

      toast({
        title: "Disposition sauvegardée",
        description: "Votre dashboard a été personnalisé avec succès",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving layout:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la disposition",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderWidget = (widget: Widget) => {
    const widgetConfig = WIDGET_TYPES[widget.type as keyof typeof WIDGET_TYPES];
    if (!widgetConfig) return null;

    const WidgetComponent = widgetConfig.component;
    const Icon = widgetConfig.icon;

    return (
      <WidgetContainer
        key={widget.id}
        id={widget.id}
        title={widget.title}
        icon={<Icon className="h-4 w-4 text-primary" />}
        onRemove={() => removeWidget(widget.id)}
        isEditing={isEditing}
      >
        <WidgetComponent />
      </WidgetContainer>
    );
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Dashboard personnalisable</h2>
        </div>
        <div className="flex items-center gap-2">
          {isEditing && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter widget
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Widgets disponibles</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.entries(WIDGET_TYPES).map(([type, config]) => {
                    const Icon = config.icon;
                    return (
                      <DropdownMenuItem key={type} onClick={() => addWidget(type)}>
                        <Icon className="h-4 w-4 mr-2" />
                        {config.title}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="neumorphism"
                size="sm"
                onClick={saveLayout}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-1" />
                {isSaving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </>
          )}
          <Button
            variant={isEditing ? "secondary" : "outline"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings2 className="h-4 w-4 mr-1" />
            {isEditing ? "Terminer" : "Personnaliser"}
          </Button>
        </div>
      </div>

      {isEditing && (
        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          Glissez-déposez les widgets pour réorganiser votre dashboard. Cliquez sur le X pour supprimer un widget.
        </p>
      )}

      {/* Widgets Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {widgets.map((widget) => renderWidget(widget))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
