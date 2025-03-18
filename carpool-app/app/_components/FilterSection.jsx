import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../components/ui/select";
import { Car, UserRound } from "lucide-react";

function FilterSection({ setPassengerCount, setRideFrequency }) {
  const renderOption = (icon, text) => (
    <h2 className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </h2>
  );

  return (
    <div className="px-3 py-2 grid grid-cols-2 md:flex gap-2">
      <Select onValueChange={(value) => setPassengerCount(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Passenger" />
        </SelectTrigger>
        <SelectContent>
          {[1, 2, 3, 4].map((num) => (
            <SelectItem key={num} value={String(num)}>
              {renderOption(<UserRound className="h-5 w-5 text-primary" />, num)}
            </SelectItem>
          ))}
          <SelectItem value="5">
            {renderOption(<UserRound className="h-5 w-5 text-primary" />, "5+")}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => (value === "Any" ? setRideFrequency(null) : setRideFrequency(value))}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Frequency" />
  </SelectTrigger>
  <SelectContent>
    {["Any", "Once", "Weekly", "Daily"].map((freq) => (
      <SelectItem key={freq} value={freq}>
        {renderOption(<Car className="h-5 w-5 text-primary" />, freq)}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

    </div>
  );
}

export default FilterSection;
