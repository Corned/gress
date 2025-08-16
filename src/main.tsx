import React from "react"
import ReactDOM from "react-dom/client"

import "./globals.css"
import "./index.css"

import { heroData } from "./lib/heroData"

import { useState } from "react"
import { IHeroData } from "./lib/heroData"

import CircuitRoyal from "./assets/images/maps/circuitroyal.webp"
import { cn } from "./lib/utils"

const HeroSelectorThumbnail = ({ src, alt, className = "", onClick }: { src: string; alt: string; className?: string; onClick: () => void }) => {
  const classNames = cn(
    "rounded-lg relative bg-white overflow-hidden border border-gray-400/50 select-none",
    "hover:cursor-pointer hover:[&>.hero-image]:scale-110",
    "transition-all duration-75",
    className
  );
  return (
    <div
      className={classNames}
      onClick={onClick}
    >
      <img src={CircuitRoyal} alt={"background"} className="absolute h-[110%] w-[140%] z-10 object-cover blur-sm saturate-80 opacity-60" />
      <img src={src} alt={alt} className="hero-image absolute h-full z-30 object-cover transition-transform duration-50" />
    </div>
  )
}


const HeroSelector = ({ heroes, selectedHeroes, onClickFn, limitReached }: { heroes: IHeroData[], selectedHeroes: IHeroData[], onClickFn: (hero: IHeroData) => void, limitReached: boolean }) => {
  return (
    <div className="grid gap-2 grid-cols-[repeat(8,1fr)] [&>*]:aspect-square">
      {
        heroes.map((hero) => {
          const isSelected = selectedHeroes.some((selectedHero) => selectedHero.name === hero.name)

          const classNames = cn(
            // Every HeroSelectorThumbnail that is not selected after the limit has been reached
            !isSelected && limitReached && "opacity-50 pointer-events-none",
            // Selected HeroSelectorThumbnail style
            isSelected ? "ring-2 ring-blue-400" : " ring-2 ring-transparent saturate-0"
          );

          return (
            <HeroSelectorThumbnail
              key={hero.name}
              src={hero.thumbnail}
              alt={hero.displayName}
              className={classNames}
              onClick={() => onClickFn(hero)}
            />
          )
        })
      }
    </div>
  )
}



const App = () => {
  const [tanks, setTanks] = useState<IHeroData[]>([]);
  const [damage, setDamage] = useState<IHeroData[]>([]);
  const [supports, setSupports] = useState<IHeroData[]>([]);
  const [compositions, setCompositions] = useState<IHeroData[][]>([]);

  const selectedHeroes = [...tanks, ...damage, ...supports];

  const tankHeroes = Object.values(heroData).filter(hero => hero.role === "Tank");
  const damageHeroes = Object.values(heroData).filter(hero => hero.role === "Damage");
  const supportHeroes = Object.values(heroData).filter(hero => hero.role === "Support");


  // Role limits
  const TANK_LIMIT = 1;
  const DAMAGE_LIMIT = 2;
  const SUPPORT_LIMIT = 2;

  const IS_VALID_COMPOSITION = tanks.length === TANK_LIMIT
    && damage.length === DAMAGE_LIMIT
    && supports.length === SUPPORT_LIMIT;

  const toggleHeroInRole = (setFn: React.Dispatch<React.SetStateAction<IHeroData[]>>, hero: IHeroData, limit: number) => {
    setFn((prev) => {
      if (prev.includes(hero)) {
        return prev.filter((h) => h !== hero);
      }
      if (prev.length >= limit) {
        return prev; // Do not add more than allowed
      }
      return [...prev, hero];
    });
  };


  const handleCreateComposition = () => {
    // Only allow if exactly 1 tank, 2 damage, 2 support
    if (tanks.length !== TANK_LIMIT || damage.length !== DAMAGE_LIMIT || supports.length !== SUPPORT_LIMIT) return;
    setCompositions((prev) => [[...tanks, ...damage, ...supports], ...prev]);
    setTanks([]);
    setDamage([]);
    setSupports([]);
  };

  return (
    <div className="container mt-10 flex flex-col gap-10 items-center">
      <h1 className="text-[80px] font-bold instrument-serif text-center">scrim companion</h1>

      <div className="flex flex-col gap-5 max-w-[700px] w-full">

        <HeroSelector
          heroes={tankHeroes}
          selectedHeroes={selectedHeroes}
          onClickFn={(hero) => toggleHeroInRole(setTanks, hero, TANK_LIMIT)}
          limitReached={tanks.length >= TANK_LIMIT}
        />
        <HeroSelector
          heroes={damageHeroes}
          selectedHeroes={selectedHeroes}
          onClickFn={(hero) => toggleHeroInRole(setDamage, hero, DAMAGE_LIMIT)}
          limitReached={damage.length >= DAMAGE_LIMIT}
        />
        <HeroSelector
          heroes={supportHeroes}
          selectedHeroes={selectedHeroes}
          onClickFn={(hero) => toggleHeroInRole(setSupports, hero, SUPPORT_LIMIT)}
          limitReached={supports.length >= SUPPORT_LIMIT}
        />


        <button
          className={
            cn(
              "bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow transition-colors ml-auto my-5",
              {
                "opacity-50 cursor-not-allowed": !IS_VALID_COMPOSITION
              }
            )
          }
          onClick={handleCreateComposition}
          disabled={!IS_VALID_COMPOSITION}
        >
          {IS_VALID_COMPOSITION ? "Create Composition ✅" : "Not a Valid Composition ❌"}
        </button>
        <a href="#step-2" className="text-blue-500 hover:underline ml-auto my-5">Next: What map did your team play?</a>
      </div>

    </div>
  );
}



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
