import Button from "@/components/Button";
import type { PlacesByFloor, SelectedPlace } from "@/dummy/places";
import { cn } from "@/utils/cn";

interface PlacePickerProps {
  placesByFloor: PlacesByFloor[];
  selectedPlace?: SelectedPlace;
  onChange: (value: SelectedPlace) => void;
  availablePlaces?: number[];
}

const PlacePicker = ({
  placesByFloor,
  selectedPlace,
  onChange,
  availablePlaces,
}: PlacePickerProps) => {
  const getIsDisabled = (placeId: number) =>
    availablePlaces ? !availablePlaces.includes(placeId) : false;

  return (
    <div className="overflow-auto rounded-sm bg-white px-4">
      {placesByFloor.map(({ floor, places }, index) => (
        <div
          key={floor}
          className={cn(
            "flex gap-4 py-4",
            index !== placesByFloor.length - 1 &&
              "border-b border-b-gray-light",
          )}
        >
          <div className="whitespace-nowrap text-base font-normal text-primary">
            {floor}
          </div>
          <div className="flex flex-wrap gap-4">
            {places.map(({ id, name }) => (
              <Button
                key={id}
                variant="outlined"
                disabled={getIsDisabled(id)}
                className={cn(
                  "text-small",
                  selectedPlace?.id === id &&
                    "border-primary bg-primary text-white",
                )}
                onClick={() => onChange({ id, name, floor })}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlacePicker;
