import React from "react"
import ReactDOM from "react-dom/client"

import "./globals.css"
import "./index.css"

import { heroData } from "./lib/heroData"
import HeroPicker from "./components/HeroPicker"
import { Card } from "./components/ui/card"

import { useState } from "react"
import { IHeroDataEntry } from "./lib/heroData"
import CompositionPicker from "./components/CompositionPicker"

const Thumbnail = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="rounded-full bg-white border-2 border-gray-200 overflow-hidden h-full">
      <img src={src} alt={alt} className="h-full" />
    </div>
  )
}

let selected = heroData.Dva
const setSelected = (hero: any) => { }





const App = () => {
  const [ tank1, setTank1 ] = useState<IHeroDataEntry | null>(null);
  const [ damage1, setDamage1 ] = useState<IHeroDataEntry | null>(null);
  const [ damage2, setDamage2 ] = useState<IHeroDataEntry | null>(null);
  const [ support1, setSupport1 ] = useState<IHeroDataEntry | null>(null);
  const [ support2, setSupport2 ] = useState<IHeroDataEntry | null>(null);

  return (
    <div className="container mt-20">
      <h1 className="text-6xl mb-10 font-bold instrument-serif text-center">scrim companion</h1>

      <Card className="p-2">
        <div className="flex flex-col gap-2 max-w-[400px]">
          <HeroPicker selected={tank1} setSelected={setTank1} roleFilter="Tank"/>
          <HeroPicker selected={damage1} setSelected={setDamage1} roleFilter="Damage"/>
          <HeroPicker selected={damage2} setSelected={setDamage2} roleFilter="Damage"/>
          <HeroPicker selected={support1} setSelected={setSupport1} roleFilter="Support"/>
          <HeroPicker selected={support2} setSelected={setSupport2} roleFilter="Support"/>
        </div>

      </Card>

      <Card className="p-2">
        <div className="flex flex-col gap-2 max-w-[400px]">
          <CompositionPicker selected={tank1} setSelected={setTank1} roleFilter="Tank"/>
        </div>

      </Card>


{/*       <div className="flex flex-col gap-2">

        <div className="grid grid-cols-10 items-center gap-2  bg-gray-50 rounded-lg border border-gray-200 p-2">
          <Thumbnail src={heroData.Dva.thumbnail} alt="D.Va" />
          <Thumbnail src={heroData.Doomfist.thumbnail} alt="Doomfist" />
          <Thumbnail src={heroData.Hazard.thumbnail} alt="Hazard" />
          <Thumbnail src={heroData.Junkerqueen.thumbnail} alt="Junkerqueen" />
          <Thumbnail src={heroData.Mauga.thumbnail} alt="Mauga" />
          <Thumbnail src={heroData.Orisa.thumbnail} alt="Orisa" />
          <Thumbnail src={heroData.Ramattra.thumbnail} alt="Ramattra" />
          <Thumbnail src={heroData.Reinhardt.thumbnail} alt="Reinhardt" />
          <Thumbnail src={heroData.Roadhog.thumbnail} alt="Roadhog" />
          <Thumbnail src={heroData.Sigma.thumbnail} alt="Sigma" />
          <Thumbnail src={heroData.Winston.thumbnail} alt="Winston" />
          <Thumbnail src={heroData.Wreckingball.thumbnail} alt="Wreckingball" />
          <Thumbnail src={heroData.Zarya.thumbnail} alt="Zarya" />
        </div>

        <div className="grid grid-cols-10 items-center gap-2  bg-gray-50 rounded-lg border border-gray-200 p-2">
          <Thumbnail src={heroData.Ashe.thumbnail} alt="Ashe" />
          <Thumbnail src={heroData.Bastion.thumbnail} alt="Bastion" />
          <Thumbnail src={heroData.Cassidy.thumbnail} alt="Cassidy" />
          <Thumbnail src={heroData.Echo.thumbnail} alt="Echo" />
          <Thumbnail src={heroData.Freja.thumbnail} alt="Freja" />
          <Thumbnail src={heroData.Genji.thumbnail} alt="Genji" />
          <Thumbnail src={heroData.Hanzo.thumbnail} alt="Hanzo" />
          <Thumbnail src={heroData.Junkrat.thumbnail} alt="Junkrat" />
          <Thumbnail src={heroData.Mei.thumbnail} alt="Mei" />
          <Thumbnail src={heroData.Pharah.thumbnail} alt="Pharah" />
          <Thumbnail src={heroData.Reaper.thumbnail} alt="Reaper" />
          <Thumbnail src={heroData.Sojourn.thumbnail} alt="Sojourn" />
          <Thumbnail src={heroData.Soldier76.thumbnail} alt="Soldier: 76" />
          <Thumbnail src={heroData.Sombra.thumbnail} alt="Sombra" />
          <Thumbnail src={heroData.Symmetra.thumbnail} alt="Symmetra" />
          <Thumbnail src={heroData.Torbjorn.thumbnail} alt="Torbjörn" />
          <Thumbnail src={heroData.Tracer.thumbnail} alt="Tracer" />
          <Thumbnail src={heroData.Venture.thumbnail} alt="Venture" />
          <Thumbnail src={heroData.Widowmaker.thumbnail} alt="Widowmaker" />
        </div>

        <div className="grid grid-cols-10 items-center gap-2  bg-gray-50 rounded-lg border border-gray-200 p-2">
          <Thumbnail src={heroData.Ana.thumbnail} alt="Ana" />
          <Thumbnail src={heroData.Baptiste.thumbnail} alt="Baptiste" />
          <Thumbnail src={heroData.Brigitte.thumbnail} alt="Brigitte" />
          <Thumbnail src={heroData.Illari.thumbnail} alt="Illari" />
          <Thumbnail src={heroData.Kiriko.thumbnail} alt="Kiriko" />
          <Thumbnail src={heroData.Lifeweaver.thumbnail} alt="Lifeweaver" />
          <Thumbnail src={heroData.Lucio.thumbnail} alt="Lúcio" />
          <Thumbnail src={heroData.Mercy.thumbnail} alt="Mercy" />
          <Thumbnail src={heroData.Moira.thumbnail} alt="Moira" />
          <Thumbnail src={heroData.Zenyatta.thumbnail} alt="Zenyatta" />
        </div>

      </div> */}



    </div>
  )
}



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
