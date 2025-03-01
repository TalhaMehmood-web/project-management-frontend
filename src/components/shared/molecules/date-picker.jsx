"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

export default function DatePicker({ label, onChange, value }) {
  const [date, setDate] = useState(value ? new Date(value) : null);

  useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]); // Update when value changes

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    if (onChange) {
      onChange(selectedDate ? selectedDate.getTime() : null);
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="font-bold uppercase text-xs ">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
