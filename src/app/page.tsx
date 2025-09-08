"use client";

import React, { useState } from "react";
import { mapData, IMapData } from "@/lib/mapData";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [selectedMode, setSelectedMode] = useState<string>("Control");
  const maps = Object.values(mapData);
  const filteredMaps = maps
    .filter((map) => map.type === selectedMode)
    .sort((a: IMapData, b: IMapData) => a.displayName.localeCompare(b.displayName));

  return (
    <div className="mx-auto max-w-[1000px] flex flex-col gap-10 items-center">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row flex-wrap gap-2 w-full">
          <Button onClick={() => setSelectedMode("Control")}>Control</Button>
          <Button onClick={() => setSelectedMode("Escort")}>Escort</Button>
          <Button onClick={() => setSelectedMode("Hybrid")}>Hybrid</Button>
          <Button onClick={() => setSelectedMode("Push")}>Push</Button>
          <Button onClick={() => setSelectedMode("Flashpoint")}>Flashpoint</Button>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-[repeat(3,1fr)] gap-2">
            <AnimatePresence mode="popLayout">
              {filteredMaps.map((map) => (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0, type: "tween" }}
                  className="relative hover:cursor-pointer hover:[&>img]:scale-110 overflow-hidden transition-all rounded-lg drop-shadow-[0_1.2px_2px_rgba(50,50,50,0.4)]"
                  key={map.name}
                >
                  <img
                    src={map.thumbnail}
                    alt={map.displayName}
                    className="transition-all object-cover aspect-video"
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
