"use client";

import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";

import { mapTypeIcons, mapData, IMapData } from "@/lib/mapData";
import { heroData, IHeroData } from "@/lib/heroData";

const Entry = ({ map, heroBans, results, code, winningTeam }: { map: IMapData; heroBans: IHeroData[]; results: Number[]; code: string; winningTeam: Number; }) => {

  return (
    <div className="rounded-lg overflow-hidden relative h-16 flex flex-row gap-3 items-center p-4 z-20">
      <div className="bg-gradient-to-r from-black/60 via-black/20 to-transparent absolute inset-0 z-10 "></div>
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
            <img key={hero.name} src={hero.thumbnail} alt={hero.name} className="h-12 z-20 relative rounded-full border-2 border-red-500 bg-gray-700 saturate-40" />
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
  )
}

const Page = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (ref.current === null) return;

    try {
      const dataUrl = await htmlToImage.toPng(ref.current);
      const link = document.createElement("a");
      link.download = "export.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div className="">

      <div
        className="flex flex-col gap-4"
      >

        <div
          ref={ref}
          className="flex flex-col gap-2 w-[650px]">

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-0">
              <p className="text-3xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">My Team</p>
              <p className="text-2xl text-white font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">vs. Enemy Team</p>
            </div>
            <div>
              <p className="text-6xl text-white font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">4.0K</p>
            </div>
          </div>

          <Entry
            map={mapData.AntarcticPeninsula}
            heroBans={[heroData.Reinhardt, heroData.Brigitte]}
            results={[2, 1]}
            code={"ABCDEF"}
            winningTeam={1}
          />

          <Entry
            map={mapData.KingsRow}
            heroBans={[heroData.Dva, heroData.Lucio]}
            results={[3, 3]}
            code={"ABCDEF"}
            winningTeam={2}
          />

          <Entry
            map={mapData.Route66}
            heroBans={[heroData.Zarya, heroData.Tracer]}
            results={[3, 3]}
            code={"ABCDEF"}
            winningTeam={1}
          />

          <Entry
            map={mapData.Runasapi}
            heroBans={[heroData.WreckingBall, heroData.Wuyang]}
            results={[1, 0]}
            code={"ABCDEF"}
            winningTeam={0}
          />

          <Entry
            map={mapData.NewJunkCity}
            heroBans={[heroData.Kiriko, heroData.Sigma]}
            results={[2, 3]}
            code={"ABCDEF"}
            winningTeam={1}
          />


        </div>

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
