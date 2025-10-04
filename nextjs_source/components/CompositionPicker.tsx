import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

import {
  ShapesIcon as RiShapesLine,
  ChevronDownIcon as RiArrowDropDownLine,
} from "lucide-react";

import { heroData, IHeroData } from "../lib/heroData";

const compositions = [
  {
    name: "Monkey Dive",
    tank: ["Winston"],
    damage: ["Tracer", "Genji"],
    support: ["Ana", "Brigitte"],
  },
  {
    name: "Monkey Rush",
    tank: ["Winston"],
    damage: ["Sojourn", "Genji"],
    support: ["Juno", "Kiriko"],
  },
  {
    name: "Classic Poke",
    tank: ["Sigma"],
    damage: ["Hanzo", "Widowmaker"],
    support: ["Baptiste", "Zenyatta"],
  },
  {
    name: "Untouchables",
    tank: ["WreckingBall"],
    damage: ["Tracer", "Echo"],
    support: ["Mercy", "Lucio"],
  },
];

export interface IComposition {
  name: string;
  tank: string[];
  damage: string[];
  support: string[];
}

export interface CompositionSelected {
  hero: keyof typeof compositions;
}

interface HeroPickerProps {
  selected: IComposition | null;
  setSelected: (hero: IComposition) => void;
}

const Thumbnail = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-full bg-white border-2 border-gray-200 overflow-hidden  ${className}`}
    >
      <img src={src} alt={alt} className="h-full" />
    </div>
  );
};

const Composition = ({
  name,
  heroes,
}: {
  name: string;
  heroes: IHeroData[];
}) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="flex flex-row items-start justify-start gap-[-5px] py-2">
        {heroes.map((hero, index) => (
          <Thumbnail
            key={hero.name}
            src={hero.thumbnail}
            alt={hero.displayName}
            className={`h-16 w-16 z-[${heroes.length - index}]  ${index === 0 ? "ml-0" : "ml-[-20px]"}`}
          />
        ))}
      </div>
    </div>
  );
};

const CompositionPicker: React.FC<HeroPickerProps> = ({
  selected,
  setSelected,
}) => {
  const [filter, setFilter] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);

  const pickerRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelection = (composition: IComposition) => {
    setSelected(composition);
    setOpen(false);
  };

  // Register event listener for clicking so
  // you can close the menu by clicking outside
  // of it.
  useEffect(() => {
    const clickEventHandler = (event: MouseEvent) => {
      if (!event.target) return;
      if (!pickerRef.current) return;
      const contains = pickerRef.current.contains(event.target as Node);
      if (contains) return;
      setOpen(false);
    };

    if (pickerRef.current) {
      document.addEventListener("click", clickEventHandler);
    }

    return () => {
      document.removeEventListener("click", clickEventHandler);
    };
  }, [pickerRef, isOpen]);

  // Focus on filter ref when isOpen changes.
  useEffect(() => {
    if (filterRef.current) {
      filterRef.current.focus();
      setFilter("");
    }
  }, [isOpen]);

  // Move dropdownmenu up if it is outside of screen.
  useEffect(() => {
    if (dropdownRef.current) {
      const a = dropdownRef.current.getBoundingClientRect().bottom;
      const b = window.innerHeight;

      if (a > b) {
        dropdownRef.current.style.top = `-${a - b + 20}px`;
      } else {
        dropdownRef.current.style.top = `0px`;
      }
    }
  }, [isOpen]);

  const setOpenState = (newState: boolean) => () => setOpen(newState);
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div ref={pickerRef} className="relative w-full bg-white  h-14 ">
      <button
        className="w-full h-full flex gap-4 items-center py-2 px-4 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
        onClick={setOpenState(true)}
        tabIndex={0}
      >
        {selected && selected.name in heroData ? (
          <img
            src={heroData[selected.name as keyof typeof heroData].thumbnail}
            alt={selected.name}
            className="inline aspect-square h-full rounded-full bg-gray-300"
          />
        ) : (
          <RiShapesLine />
        )}
        {selected?.name ? (
          <span className="text-lg">{selected.name}</span>
        ) : (
          <span>Select a Composition</span>
        )}
        <RiArrowDropDownLine className="ml-auto" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="z-10 w-full bg-white grid grid-rows-[auto_1fr] rounded-lg border border-gray-300 overflow-hidden absolute top-0 shadow-[0_3px_12px_rgba(0,0,0,0.09)]"
        >
          <div className="p-2">
            <input
              value={filter}
              onChange={handleFilter}
              placeholder="e.g. Pulled Pork"
              ref={filterRef}
              className="pl-2 bg-[#ece8e8] rounded-lg border-none py-2 block w-full"
            />
          </div>

          <div className="h-px w-full bg-black/10" />

          <div className="max-h-[400px] overflow-y-auto p-2.5">
            {compositions.map(composition => {
              const heroes = [
                ...composition.tank,
                ...composition.damage,
                ...composition.support,
              ].map(heroName => heroData[heroName as keyof typeof heroData]);
              return (
                <button
                  className="flex flex-col gap-4 w-full rounded-md bg-white hover:bg-gray-200 transition-colors justify-center"
                  onClick={() => handleSelection(composition)}
                  key={composition.name}
                  tabIndex={0}
                >
                  <Composition name={composition.name} heroes={heroes} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompositionPicker;
