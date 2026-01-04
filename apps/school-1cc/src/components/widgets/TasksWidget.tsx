import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserStore } from "@/store/useUserStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date: string | null;
}

export const TasksWidget = () => {
  const { user } = useUserStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, status, priority, due_date")
        .eq("user_id", user.id)
        .order("due_date", { ascending: true })
        .limit(5);

      if (!error && data) {
        setTasks(data);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [user]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return <div className="text-center text-muted-foreground py-4">Chargement...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        Aucune tâche à afficher
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-3 p-2 bg-background shadow-neu-inset rounded-lg"
        >
          <Checkbox checked={task.status === "done"} />
          <span className={`flex-1 text-sm ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>
            {task.title}
          </span>
          <Badge variant={getPriorityColor(task.priority)} className="text-xs">
            {task.priority}
          </Badge>
        </div>
      ))}
    </div>
  );
};
