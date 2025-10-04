import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

import {
  ShapesIcon as RiShapesLine,
  ChevronDownIcon as RiArrowDropDownLine,
} from "lucide-react";

import { heroData, IHeroData } from "../lib/heroData";

export interface HeroSelected {
  hero: keyof typeof heroData;
}

interface HeroPickerProps {
  selected: IHeroData | null;
  setSelected: (hero: IHeroData) => void;
  roleFilter?: string;
}

const HeroPicker: React.FC<HeroPickerProps> = ({
  selected,
  setSelected,
  roleFilter,
}) => {
  const [filter, setFilter] = useState<string>("");
  const [isOpen, setOpen] = useState<boolean>(false);

  const pickerRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelection = (herodataEntry: IHeroData) => {
    setSelected(herodataEntry);
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

  const filteredHeroes = Object.values(heroData)
    .filter((hero: IHeroData) => {
      return hero.role === roleFilter || !roleFilter;
    })
    .filter((hero: IHeroData) => {
      return (
        hero.name.toLowerCase().includes(filter.toLowerCase()) ||
        hero.displayName.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .sort((a: IHeroData, b: IHeroData) => {
      if (a.displayName < b.displayName) return -1;
      if (a.displayName > b.displayName) return 1;
      return 0;
    });

  return (
    <div ref={pickerRef} className="relative w-full h-14">
      <button
        className="w-full h-full flex gap-4 items-center py-2 px-4 bg-white rounded-lg border border-gray-300 focus:outline-none"
        onClick={setOpenState(true)}
        tabIndex={0}
      >
        {selected && selected.name in heroData ? (
          <img
            src={heroData[selected.name as keyof typeof heroData].thumbnail}
            alt={selected.displayName}
            className="inline aspect-square h-full rounded-full bg-gray-300"
          />
        ) : (
          <RiShapesLine />
        )}
        {selected?.name ? (
          <span className="text-lg">{selected.displayName}</span>
        ) : (
          <span>Select a Hero</span>
        )}
        <RiArrowDropDownLine className="ml-auto" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="z-10 w-full bg-white grid grid-rows-[auto_1fr] rounded-lg border border-gray-300 overflow-hidden absolute top-0"
        >
          <div className="p-2">
            <input
              value={filter}
              onChange={handleFilter}
              placeholder="e.g. Tracer"
              ref={filterRef}
              className="pl-2 bg-[#ece8e8] rounded-lg border-none py-2 block w-full"
            />
          </div>

          <div className="h-px w-full bg-black/10" />

          <div className="p-2 grid gap-2 grid-cols-[repeat(auto-fill,minmax(80px,1fr))] [&>*]:aspect-square">
            {filteredHeroes.map(hero => (
              <button
                className={cn(
                  "flex bg-gray-200 hover:bg-gray-300 shadow-[0px_2px_9px_2px_rgba(0,_0,_0,_0.05)]",
                  "flex-col gap-4 rounded-full overflow-hidden border-1 border-gray-300 hover:scale-105 transition-transform",
                )}
                onClick={() => handleSelection(hero)}
                key={hero.name}
                tabIndex={0}
              >
                <img src={hero.thumbnail} alt={hero.displayName} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroPicker;
