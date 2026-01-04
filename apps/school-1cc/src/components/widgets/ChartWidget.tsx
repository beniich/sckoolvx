import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const generateData = () => {
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  return days.map((day) => ({
    name: day,
    requetes: Math.floor(Math.random() * 50) + 10,
    incidents: Math.floor(Math.random() * 10),
  }));
};

export const ChartWidget = () => {
  const data = generateData();

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="requetes"
            stackId="1"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary) / 0.3)"
            name="Requêtes IA"
          />
          <Area
            type="monotone"
            dataKey="incidents"
            stackId="2"
            stroke="hsl(var(--destructive))"
            fill="hsl(var(--destructive) / 0.3)"
            name="Incidents"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
