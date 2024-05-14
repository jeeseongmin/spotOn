import Button from "@/components/Button";
import { cn } from "@/utils/cn";

type PlacesByFloor = {
  floor: string;
  places: string[];
};

interface PlaceSelectProps {
  placesByFloor: PlacesByFloor[];
  selectedPlace?: string;
  onChange: (value: string) => void;
}

const PlaceSelect = ({
  placesByFloor,
  selectedPlace,
  onChange,
}: PlaceSelectProps) => (
  <div className="overflow-auto rounded-sm bg-white px-4">
    {placesByFloor.map(({ floor, places }, index) => (
      <div
        key={floor}
        className={cn(
          "flex gap-4 py-4",
          index !== placesByFloor.length - 1 && "border-b border-b-gray-light",
        )}
      >
        <div className="whitespace-nowrap text-base font-normal text-primary">
          {floor}
        </div>
        <div className="flex flex-wrap gap-4">
          {places.map(place => (
            <Button
              key={place}
              variant="outlined"
              className={cn(
                "text-small",
                selectedPlace === place &&
                  "border-primary bg-primary text-white",
              )}
              onClick={() => onChange(place)}
            >
              {place}
            </Button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default PlaceSelect;
