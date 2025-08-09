

import { getDate, getDay, getDaysInMonth, getMonth, format } from 'date-fns'

import { ChevronsDownIcon, ChevronsUpIcon } from "lucide-react"


// Calendar stuff
const currentMonth = getMonth(new Date())
const firstDayOfMonth = getDay(new Date(2025, currentMonth, 1)) // Sunday 0, Monday 1...
const daysInMonth = getDaysInMonth(currentMonth)
const daysInPreviousMonth = getDaysInMonth(currentMonth - 1)

const CalendarHeader = ({ label }: { label: String }) => {
  return (
    <div className="font-bold text-2xl aspect-square content-center ">
      <p className="text-center instrument-serif">{ label }</p>
    </div>
  )
}

const CalendarDay = ({ label, grayed = false }: { label: String, grayed?: Boolean, }) => {
  return (
    <div className={ "overflow-hidden rounded-xl text-xl content-center flex flex-col items-center gap-2 bg-white cursor-pointer py-2" + " " + (grayed ? "text-gray-400" : "text-black") }>
      <p className="text-center rubik">{ label }</p>
      <p className="text-center rubik">
        {
          Math.random() > 0.7
          ? <ChevronsDownIcon strokeWidth={3} color="rgba(255, 0, 0, 0.5)" />
          : <ChevronsUpIcon strokeWidth={3} color="rgba(50, 200, 50, 0.6)" />
        }
      </p>
    </div>
  )
}






/*       <div className="grid grid-flow-col gap-2 overflow-x-scroll pb-2">
        {
          Array.from({ length: daysInMonth }).map((_, i) => {

            const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
            const dayIndex = (getDay(new Date(2025, currentMonth, 1)) + i) % 7

            return (
              <div className="flex flex-col gap-2 bg-gray-200 w-[60px] content-center items-center px-2 py-4 rounded-xl select-none hover:cursor-pointer">
                <p className="instrument-serif text-xl font-bold">{ days[dayIndex] }</p>
                <p className="text-xl">{ i + 1 }</p>
              </div>
            )
          })
        }
      </div> */

      {/* <h1 className="text-4xl mb-3 font-bold">august 3rd 2025</h1> */}


{/*       <div className="relative bg--gradient p-2 rounded-2xl max-w-[400px] select-none overflow-hidden">
        <img className="test"></img>

        <div className="header grid grid-cols-7 gap-2 content-center text-center instrument-serif">
          <CalendarHeader label={"Sun"}/>
          <CalendarHeader label={"Mon"}/>
          <CalendarHeader label={"Tue"}/>
          <CalendarHeader label={"Wed"}/>
          <CalendarHeader label={"Thu"}/>
          <CalendarHeader label={"Fri"}/>
          <CalendarHeader label={"Sat"}/>
        </div>

        <div className="grid grid-cols-7 gap-1 content-center text-center">
          {
            // Empty spaces
            Array.from({ length: firstDayOfMonth }).map((_, i) =>
              <CalendarDay grayed label={(daysInPreviousMonth - i - 1).toString()}/>
            ).reverse()
          }

          {
            // Day numbers
            Array.from({ length: daysInMonth }).map((_, i) =>
              <CalendarDay label={(i + 1).toString()}/>
            )
          }

          {
            // Empty spaces
            Array.from({ length: 42 - daysInMonth - firstDayOfMonth}).map((_, i) =>
              <CalendarDay grayed label={(i + 1).toString()}
            />)
          }

        </div>

      </div> */}




import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react"





const ranks = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster"];
const divisions = ["1", "2", "3", "4", "5"];

const generateRandomEntry = () => {
  const previousSR = Math.floor(Math.random() * 3000) + 1000;
  const newSR = previousSR + Math.floor(Math.random() * 500) - 250; // Random change between -250 and +250
  const srChange = newSR - previousSR;

  const previousRankName = ranks[Math.floor(Math.random() * ranks.length)];
  const previousRankDivision = divisions[Math.floor(Math.random() * divisions.length)];

  const newRankName = ranks[Math.floor(Math.random() * ranks.length)];
  const newRankDivision = divisions[Math.floor(Math.random() * divisions.length)];

  return {
    entry: {
      srChange,
      previousSR,
      newSR,
  timestamp: Date.now(),
    },
    previousRank: {
      name: previousRankName,
      division: previousRankDivision,
    },
    newRank: {
      name: newRankName,
      division: newRankDivision,
}
  };
};




const data = Array.from({ length: 10 }, generateRandomEntry);

import TracerPNG from "./assets/images/heroes/tracer.png"
import SojournPNG from "./assets/images/heroes/sojourn.png"
import WidowmakerPNG from "./assets/images/heroes/widowmaker.png"

import CircuitRoyalPNG from "./assets/images/maps/circuitroyal.webp"

const Entry = ({ data: { entry, previousRank, newRank } }: { data: any}) => {
  
  return (
    <div className="flex items-center gap-4 px-4 bg-gray-50 rounded-lg border border-gray-200 h-20 w-fit ">
      {entry.srChange > 0 ? (
        <TrendingUpIcon strokeWidth={3} className="h-5 w-5 text-green-600" />
      ) : entry.srChange < 0 ? (
        <TrendingDownIcon strokeWidth={3} className="h-5 w-5 text-red-600" />
      ) : (
        <MinusIcon strokeWidth={3} className="h-5 w-5 text-gray-500" />
      )}
      <div>
        <div className="font-medium text-gray-800">
          {previousRank.name} {previousRank.division} → {newRank.name} {newRank.division}
        </div>
        <div className="text-sm text-gray-600">
          {entry.previousSR} SR → {entry.newSR} SR • {format(new Date(entry.timestamp), "h:mm a")}
        </div>

      </div>

      <div className="h-full flex flex-row pl-[20px]  gap-0  transition-all py-3">
        <img src={TracerPNG} className="rounded-full bg-gray-50 border-[1px] h-full z-30 ml-[-20px]"/>
        <img src={SojournPNG} className="rounded-full bg-gray-50 border-[1px] h-full z-20 ml-[-20px]"/>
        <img src={WidowmakerPNG} className="rounded-full bg-gray-50 border-[1px] h-full z-10 ml-[-20px]"/>
      </div>
    </div>
  )