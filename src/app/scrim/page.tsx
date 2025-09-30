"use client";

import React, { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";

import { mapTypeIcons, mapData, IMapData } from "@/lib/mapData";
import { heroData, IHeroData } from "@/lib/heroData";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { data, filter } from "framer-motion/client";

const Entry = ({ map, heroBans, results, code, winningTeam }: { map: IMapData; heroBans: IHeroData[]; results: number[]; code: string; winningTeam: number; }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const containerClasses = isOpen ? "h-auto" : "h-16";
  const contentClasses = isOpen ? "rounded-t-lg" : "rounded-lg";

  return (
    <div className={`${containerClasses} overflow-hidden`}>
      <div className={`${contentClasses} overflow-hidden relative flex flex-row gap-3 items-center h-16 p-4 z-20 select-none cursor-pointer`} onClick={toggleOpen}>
        <div className="bg-gradient-to-r from-black/60 via-black/20 to-transparent absolute inset-0 z-10 h-16 "></div>
        <img src={map.thumbnail} alt="Map Type Icon" className="absolute object-cover w-full z-0 left-0 scale-105 blur-[1px]" />
        <img src={mapTypeIcons[map.type]} alt="Map Type Icon" className="z-20 h-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]" />
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] font-bold text-xl uppercase text-center text-white z-20 ">
          {map.displayName}
        </p>

        <div className="flex-grow"></div>

        {/* HERO BANS */}
        <div className="flex flex-row gap-2 z-20">
          {
            heroBans.map((hero) => (
              <img key={hero.name} src={hero.thumbnail} alt={hero.name} className="h-12 z-20 relative rounded-lg border-2 border-red-500 saturate-40" />
            ))
          }
        </div>

        {
          // Your team wins
          winningTeam === 0 && (
            <p className="uppercase bg-green-600 z-20 relative text-white font-bold font-mono! p-2 text rounded">
              {results.join("-")}
            </p>
          )
        }

        {
          // Enemy team wins
          winningTeam === 1 && (
            <p className="uppercase bg-red-500 z-20 relative text-white font-bold font-mono! p-2 text rounded">
              {results.join("-")}
            </p>
          )
        }
        {
          // Draw
          winningTeam === 2 && (
            <p className="uppercase bg-gray-500 z-20 relative text-white font-bold font-mono! p-2 text rounded">
              {results.join("-")}
            </p>
          )
        }



        <p className="uppercase bg-orange-500 z-20 relative text-white font-bold font-mono! p-2 text rounded">
          {code}
        </p>
      </div>

      <div className="h-32 border-1 border-t-0 border-gray-300 rounded-b-lg flex items-center justify-center">
        <p>hello world</p>
      </div>
    </div>
  )
}

interface IMatchData {
  map: IMapData;
  heroBans: IHeroData[];
  results: number[];
  code: string;
  winningTeam: number; // 0 = your team, 1 = enemy team, 2 = draw
}


const testMatchData: IMatchData[] = [
  {
    map: mapData.AntarcticPeninsula,
    heroBans: [heroData.Reinhardt, heroData.Brigitte],
    results: [2, 1],
    code: "ABCDEF",
    winningTeam: 0,
  },
  {
    map: mapData.KingsRow,
    heroBans: [heroData.Dva, heroData.Lucio],
    results: [3, 3],
    code: "ABCDEF",
    winningTeam: 2,
  },
  {
    map: mapData.Route66,
    heroBans: [heroData.Zarya, heroData.Tracer],
    results: [3, 3],
    code: "ABCDEF",
    winningTeam: 0,
  },
  {
    map: mapData.Runasapi,
    heroBans: [heroData.WreckingBall, heroData.Wuyang],
    results: [1, 0],
    code: "ABCDEF",
    winningTeam: 0,
  },
  {
    map: mapData.NewJunkCity,
    heroBans: [heroData.Kiriko, heroData.Sigma],
    results: [2, 3],
    code: "ABCDEF",
    winningTeam: 1,
  },
];

const Page = () => {
  const [myTeamName, setMyTeamName] = useState("My Team");
  const [enemyTeamName, setEnemyTeamName] = useState("Enemy Team");
  const [myTeamSR, setMyTeamSR] = useState("3500");
  const [matchData, setMatchData] = useState<IMatchData[]>(testMatchData);




  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (ref.current === null) return;

    try {
      ref.current.classList.remove("transparent")
      const dataUrl = await htmlToImage.toPng(ref.current)
      //
      console.log(dataUrl);
      const link = document.createElement("a");
      link.download = "export.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
    }

    ref.current.classList.add("transparent")
  };

  return (
    <div className="">

      <div
        ref={ref}
        className="flex flex-col gap-2 max-w-[650px] rounded-lg transparent p-2">

        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-0">
            <p className="text-3xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">{myTeamName}</p>
            <p className="text-2xl text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">vs. {enemyTeamName}</p>
          </div>
          <div>
            <p className="text-6xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">{myTeamSR}</p>
          </div>
        </div>

        {
          matchData.map((match, index) => (
            <Entry
              key={index}
              map={match.map}
              heroBans={match.heroBans}
              results={match.results}
              code={match.code}
              winningTeam={match.winningTeam}
            />
          ))
        }


        <p className="w-full text-center text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">gress.tmp.ooo</p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Download as PNG
      </button>
    </div>
  );
};

export default Page;
