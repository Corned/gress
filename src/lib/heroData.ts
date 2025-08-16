

import AnaThumbnail from "@/assets/images/icons/ana.png";
import AsheThumbnail from "@/assets/images/icons/ashe.png";
import BaptisteThumbnail from "@/assets/images/icons/baptiste.png";
import BastionThumbnail from "@/assets/images/icons/bastion.png";
import BrigitteThumbnail from "@/assets/images/icons/brigitte.png";
import CassidyThumbnail from "@/assets/images/icons/cassidy.png";
import DoomfistThumbnail from "@/assets/images/icons/doomfist.png";
import DvaThumbnail from "@/assets/images/icons/dva.png";
import EchoThumbnail from "@/assets/images/icons/echo.png";
import FrejaThumbnail from "@/assets/images/icons/freja.png";
import GenjiThumbnail from "@/assets/images/icons/genji.png";
import HanzoThumbnail from "@/assets/images/icons/hanzo.png";
import HazardThumbnail from "@/assets/images/icons/hazard.png";
import IllariThumbnail from "@/assets/images/icons/illari.png";
import JunkerqueenThumbnail from "@/assets/images/icons/junkerqueen.png";
import JunkratThumbnail from "@/assets/images/icons/junkrat.png";
import JunoThumbnail from "@/assets/images/icons/juno.png";
import KirikoThumbnail from "@/assets/images/icons/kiriko.png";
import LifeweaverThumbnail from "@/assets/images/icons/lifeweaver.png";
import LucioThumbnail from "@/assets/images/icons/lucio.png";
import MaugaThumbnail from "@/assets/images/icons/mauga.png";
import MeiThumbnail from "@/assets/images/icons/mei.png";
import MercyThumbnail from "@/assets/images/icons/mercy.png";
import MoiraThumbnail from "@/assets/images/icons/moira.png";
import OrisaThumbnail from "@/assets/images/icons/orisa.png";
import PharahThumbnail from "@/assets/images/icons/pharah.png";
import RamattraThumbnail from "@/assets/images/icons/ramattra.png";
import ReaperThumbnail from "@/assets/images/icons/reaper.png";
import ReinhardtThumbnail from "@/assets/images/icons/reinhardt.png";
import RoadhogThumbnail from "@/assets/images/icons/roadhog.png";
import SigmaThumbnail from "@/assets/images/icons/sigma.png";
import SojournThumbnail from "@/assets/images/icons/sojourn.png";
import Soldier76Thumbnail from "@/assets/images/icons/soldier76.png";
import SombraThumbnail from "@/assets/images/icons/sombra.png";
import SymmetraThumbnail from "@/assets/images/icons/symmetra.png";
import TorbjornThumbnail from "@/assets/images/icons/torbjorn.png";
import TracerThumbnail from "@/assets/images/icons/tracer.png";
import VentureThumbnail from "@/assets/images/icons/venture.png";
import WidowmakerThumbnail from "@/assets/images/icons/widowmaker.png";
import WinstonThumbnail from "@/assets/images/icons/winston.png";
import WreckingBallThumbnail from "@/assets/images/icons/wreckingball.png";
import WuyangThumbnail from "@/assets/images/heroes/wuyang.webp";
import ZaryaThumbnail from "@/assets/images/icons/zarya.png";
import ZenyattaThumbnail from "@/assets/images/icons/zenyatta.png";

// Define the type for a single hero entry
export interface IHeroData {
  name: string;
  thumbnail: string;
  role: string;
  displayName: string;
}

export type HeroData = typeof heroData;

export const heroData = {
  Ana: { name: "Ana", displayName: "Ana", thumbnail: AnaThumbnail, role: "Support" },
  Ashe: { name: "Ashe", displayName: "Ashe", thumbnail: AsheThumbnail, role: "Damage" },
  Baptiste: { name: "Baptiste", displayName: "Baptiste", thumbnail: BaptisteThumbnail, role: "Support" },
  Bastion: { name: "Bastion", displayName: "Bastion", thumbnail: BastionThumbnail, role: "Damage" },
  Brigitte: { name: "Brigitte", displayName: "Brigitte", thumbnail: BrigitteThumbnail, role: "Support" },
  Cassidy: { name: "Cassidy", displayName: "Cassidy", thumbnail: CassidyThumbnail, role: "Damage" },
  Doomfist: { name: "Doomfist", displayName: "Doomfist", thumbnail: DoomfistThumbnail, role: "Tank" },
  Dva: { name: "Dva", displayName: "D.Va", thumbnail: DvaThumbnail, role: "Tank" },
  Echo: { name: "Echo", displayName: "Echo", thumbnail: EchoThumbnail, role: "Damage" },
  Freja: { name: "Freja", displayName: "Freja", thumbnail: FrejaThumbnail, role: "Damage" },
  Genji: { name: "Genji", displayName: "Genji", thumbnail: GenjiThumbnail, role: "Damage" },
  Hanzo: { name: "Hanzo", displayName: "Hanzo", thumbnail: HanzoThumbnail, role: "Damage" },
  Hazard: { name: "Hazard", displayName: "Hazard", thumbnail: HazardThumbnail, role: "Tank" },
  Illari: { name: "Illari", displayName: "Illari", thumbnail: IllariThumbnail, role: "Support" },
  Junkerqueen: { name: "Junkerqueen", displayName: "Junker Queen", thumbnail: JunkerqueenThumbnail, role: "Tank" },
  Junkrat: { name: "Junkrat", displayName: "Junkrat", thumbnail: JunkratThumbnail, role: "Damage" },
  Juno: { name: "Juno", displayName: "Juno", thumbnail: JunoThumbnail, role: "Support" },
  Kiriko: { name: "Kiriko", displayName: "Kiriko", thumbnail: KirikoThumbnail, role: "Support" },
  Lifeweaver: { name: "Lifeweaver", displayName: "Lifeweaver", thumbnail: LifeweaverThumbnail, role: "Support" },
  Lucio: { name: "Lucio", displayName: "Lúcio", thumbnail: LucioThumbnail, role: "Support" },
  Mauga: { name: "Mauga", displayName: "Mauga", thumbnail: MaugaThumbnail, role: "Tank" },
  Mei: { name: "Mei", displayName: "Mei", thumbnail: MeiThumbnail, role: "Damage" },
  Mercy: { name: "Mercy", displayName: "Mercy", thumbnail: MercyThumbnail, role: "Support" },
  Moira: { name: "Moira", displayName: "Moira", thumbnail: MoiraThumbnail, role: "Support" },
  Orisa: { name: "Orisa", displayName: "Orisa", thumbnail: OrisaThumbnail, role: "Tank" },
  Pharah: { name: "Pharah", displayName: "Pharah", thumbnail: PharahThumbnail, role: "Damage" },
  Ramattra: { name: "Ramattra", displayName: "Ramattra", thumbnail: RamattraThumbnail, role: "Tank" },
  Reaper: { name: "Reaper", displayName: "Reaper", thumbnail: ReaperThumbnail, role: "Damage" },
  Reinhardt: { name: "Reinhardt", displayName: "Reinhardt", thumbnail: ReinhardtThumbnail, role: "Tank" },
  Roadhog: { name: "Roadhog", displayName: "Roadhog", thumbnail: RoadhogThumbnail, role: "Tank" },
  Sigma: { name: "Sigma", displayName: "Sigma", thumbnail: SigmaThumbnail, role: "Tank" },
  Sojourn: { name: "Sojourn", displayName: "Sojourn", thumbnail: SojournThumbnail, role: "Damage" },
  Soldier76: { name: "Soldier76", displayName: "Soldier: 76", thumbnail: Soldier76Thumbnail, role: "Damage" },
  Sombra: { name: "Sombra", displayName: "Sombra", thumbnail: SombraThumbnail, role: "Damage" },
  Symmetra: { name: "Symmetra", displayName: "Symmetra", thumbnail: SymmetraThumbnail, role: "Damage" },
  Torbjorn: { name: "Torbjorn", displayName: "Torbjörn", thumbnail: TorbjornThumbnail, role: "Damage" },
  Tracer: { name: "Tracer", displayName: "Tracer", thumbnail: TracerThumbnail, role: "Damage" },
  Venture: { name: "Venture", displayName: "Venture", thumbnail: VentureThumbnail, role: "Damage" },
  Widowmaker: { name: "Widowmaker", displayName: "Widowmaker", thumbnail: WidowmakerThumbnail, role: "Damage" },
  Winston: { name: "Winston", displayName: "Winston", thumbnail: WinstonThumbnail, role: "Tank" },
  WreckingBall: { name: "WreckingBall", displayName: "Wrecking Ball", thumbnail: WreckingBallThumbnail, role: "Tank" },
  Wuyang: { name: "Wuyang", displayName: "Wuyang", thumbnail: WuyangThumbnail, role: "Support" },
  Zarya: { name: "Zarya", displayName: "Zarya", thumbnail: ZaryaThumbnail, role: "Tank" },
  Zenyatta: { name: "Zenyatta", displayName: "Zenyatta", thumbnail: ZenyattaThumbnail, role: "Support" },
};