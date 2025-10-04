import React from "react";

const CoolButton = ({
  label,
  background,
}: {
  label: string;
  background: string;
}) => {
  return (
    <button className="relative rounded-lg overflow-hidden cursor-pointer p-3">
      <img
        src={`/assets/images/maps/${background}.webp`}
        alt={`${background}-${label}`}
        className="object-cover absolute z-0 top-0 left-0 w-full h-full scale-110 brightness-110"
      />

      <div className="text-center font-medium text-white text-2xl relative backdrop-blur-md bg-black/10 rounded-md p-4">
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{label}</p>
      </div>
    </button>
  );
};

const Page = () => {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-7xl font-bold">gress</h1>
      <p className="text-lg text-gray-600">
        Built to track Overwatch rankings and scrimmage results.
      </p>
      <div className="grid grid-cols-3 gap-4">
        <CoolButton label="5v5" background="kings_row" />
        <CoolButton label="Stadium" background="redwood_dam" />
        <CoolButton label="Scrims" background="lijiang_tower" />
        <CoolButton label="6v6" background="hanamura" />
      </div>
    </div>
  );
};

export default Page;
