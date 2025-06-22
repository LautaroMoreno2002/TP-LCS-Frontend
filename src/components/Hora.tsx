import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface HoraInputProps {
  name?: string;
  value: string; // "HH:mm"
  onChange: (e: { target: { name?: string; value: string } }) => void;
}

export const HoraInput: React.FC<HoraInputProps> = ({ name, value, onChange }) => {
  // Convierte "HH:mm" string a Date objeto con fecha hoy (solo para DatePicker)
  const stringToDate = (timeStr: string): Date | null => {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(":").map(Number);
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  // Convierte Date a "HH:mm" string
  const dateToString = (date: Date | null): string => {
    if (!date) return "";
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const handleChange = (date: Date | null) => {
    const timeStr = dateToString(date);
    if (onChange) {
      onChange({ target: { name, value: timeStr } });
    }
  };

  return (
    <DatePicker
      className="data-item--value"
      selected={stringToDate(value)}
      onChange={handleChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={1} // permite cada minuto
      timeCaption="Hora"
      dateFormat="HH:mm"
      placeholderText="HH:mm"
      name={name}
      autoComplete="off"
    />
  );
};

export default HoraInput;