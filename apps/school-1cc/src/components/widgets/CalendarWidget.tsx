import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { fr } from "date-fns/locale";

export const CalendarWidget = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={fr}
        className="rounded-md"
      />
    </div>
  );
};
