import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./globals.css";
import "./index.css";

import { mapData, mapTypeIcons, IMapData } from "./mapData";
import CompositionPicker from "@/components/CompositionPicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const MapRow = ({ maps }: { maps: IMapData[] }) => {
  const mapTypeIcon = mapTypeIcons[maps[0].type];

  return (
    <div className="flex flex-col">
      {/* <h1 id={`${maps[0].type}-maps`} className="text-[50px] xl:text-[50px] lg:text-[50px] font-bold instrument-serif">{maps[0].type} Maps</h1> */}
      <div className="grid max-lg:grid-cols-[repeat(1,1fr)] grid-cols-[repeat(3,1fr)] gap-2 max-lg:overflow-x-scroll">
        {maps.map((map) => (
          <div
            className="relative hover:cursor-pointer hover:[&>img]:scale-110 overflow-hidden transition-all rounded-lg drop-shadow-[0_1.2px_2px_rgba(50,50,50,0.4)]"
            key={map.name}
          >
            <img
              src={map.thumbnail}
              alt={map.displayName}
              className="transition-all  object-cover aspect-video"
            />
            <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] absolute right-2 top-2 px-2 z-10 bg-white/10 rounded-full py-1 backdrop-blur-md pointer-events-none text-center text-white text-sm">
              {map.type}
            </p>

            <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] absolute left-1/2 -translate-x-1/2 bottom-2 w-[calc(100%-20px)] z-10 bg-white/10 rounded-sm py-1 backdrop-blur-md pointer-events-none font-bold text-center text-white">
              {map.displayName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [selectedMode, setSelectedMode] = useState<string>("Control");

  const maps = Object.values(mapData);
  const controlMaps = maps.filter((map) => map.type === "Control");
  const escortMaps = maps.filter((map) => map.type === "Escort");
  const hybridMaps = maps.filter((map) => map.type === "Hybrid");
  const pushMaps = maps.filter((map) => map.type === "Push");
  const flashpointMaps = maps.filter((map) => map.type === "Flashpoint");

  const filteredMaps = maps.filter((map) => map.type === selectedMode);

  return (
    <div className="container max-lg:px-2 flex flex-col gap-10 items-center ">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row flex-wrap gap-2 w-full">
          <Button onClick={() => setSelectedMode("Control")}>Control</Button>
          <Button onClick={() => setSelectedMode("Escort")}>Escort</Button>
          <Button onClick={() => setSelectedMode("Hybrid")}>Hybrid</Button>
          <Button onClick={() => setSelectedMode("Push")}>Push</Button>
          <Button onClick={() => setSelectedMode("Flashpoint")}>
            Flashpoint
          </Button>
        </div>

        <div className="flex flex-col">
          {/* <h1 id={`${maps[0].type}-maps`} className="text-[50px] xl:text-[50px] lg:text-[50px] font-bold instrument-serif">{maps[0].type} Maps</h1> */}
          <div className="grid max-lg:grid-cols-[repeat(2,1fr)] grid-cols-[repeat(3,1fr)] gap-2">

            {filteredMaps.map((map) => (
              <div
                className="relative hover:cursor-pointer hover:[&>img]:scale-110 overflow-hidden transition-all rounded-lg drop-shadow-[0_1.2px_2px_rgba(50,50,50,0.4)]"
                key={map.name}
              >
                <img
                  src={map.thumbnail}
                  alt={map.displayName}
                  className="transition-all  object-cover max-lg:aspect-square aspect-video"
                />

                <div className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] absolute right-2 top-2 px-2 z-10 bg-white/10 rounded-full py-1 backdrop-blur-md pointer-events-none text-center text-white text-sm">
                  <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center text-white">
                    {map.type}
                  </p>
                </div>
                <div className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] absolute rounded-sm py-1 backdrop-blur-md left-1/2 -translate-x-1/2 bottom-2 w-[calc(100%-16px)] z-10 bg-gray-400/20 pointer-events-none">
                  <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-center text-white">
                    {map.displayName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
