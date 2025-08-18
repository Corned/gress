export interface IMapData {
  name: string;
  thumbnail: string;
  type: string;
  displayName: string;
}

export type MapData = typeof mapData;

import AntarcticPeninsulaThumbnail from "@/assets/images/maps/antarctic_peninsula.webp";
import BusanThumbnail from "@/assets/images/maps/busan.webp";
import IliosThumbnail from "@/assets/images/maps/ilios.webp";
import LijiangTowerThumbnail from "@/assets/images/maps/lijiang_tower.webp";
import NepalThumbnail from "@/assets/images/maps/nepal.webp";
import OasisThumbnail from "@/assets/images/maps/oasis.webp";
import SamoaThumbnail from "@/assets/images/maps/samoa.webp";
import CircuitRoyalThumbnail from "@/assets/images/maps/circuit_royal.webp";
import DoradoThumbnail from "@/assets/images/maps/dorado.webp";
import HavanaThumbnail from "@/assets/images/maps/havana.webp";
import JunkertownThumbnail from "@/assets/images/maps/junkertown.webp";
import RialtoThumbnail from "@/assets/images/maps/rialto.webp";
import Route66Thumbnail from "@/assets/images/maps/route_66.webp";
import ShambaliMonasteryThumbnail from "@/assets/images/maps/shambali_monestary.webp";
import WatchpointGibraltarThumbnail from "@/assets/images/maps/watchpoint_gibraltar.webp";
import SuravasaThumbnail from "@/assets/images/maps/suravasa.webp";
import NewJunkCityThumbnail from "@/assets/images/maps/new_junk_city.webp";
import AatlisThumbnail from "@/assets/images/maps/aatlis.webp";
import BlizzardWorldThumbnail from "@/assets/images/maps/blizzard_world.webp";
import EichenwaldeThumbnail from "@/assets/images/maps/eichenwalde.webp";
import HollywoodThumbnail from "@/assets/images/maps/hollywood.webp";
import KingsRowThumbnail from "@/assets/images/maps/kings_row.webp";
import MidtownThumbnail from "@/assets/images/maps/midtown.webp";
import NumbaniThumbnail from "@/assets/images/maps/numbani.webp";
import ParaisoThumbnail from "@/assets/images/maps/paraiso.webp";
import ColosseoThumbnail from "@/assets/images/maps/colosseo.webp";
import EsperancaThumbnail from "@/assets/images/maps/esperanca.webp";
import NewQueenStreetThumbnail from "@/assets/images/maps/new_queens_street.webp";
import RunasapiThumbnail from "@/assets/images/maps/runasapi.webp";
import HanaokaThumbnail from "@/assets/images/maps/hanaoka.webp";
import ThroneOfAnubisThumbnail from "@/assets/images/maps/throne_of_anubis.webp";

import ControlIcon from "@/assets/images/maps/Control.webp";
import FlashpointIcon from "@/assets/images/maps/Flashpoint.webp";
import EscortIcon from "@/assets/images/maps/Escort.webp";
import HybridIcon from "@/assets/images/maps/Hybrid.webp";
import PushIcon from "@/assets/images/maps/Push.webp";

export const mapTypeIcons = {
  Control: ControlIcon,
  Flashpoint: FlashpointIcon,
  Escort: EscortIcon,
  Hybrid: HybridIcon,
  Push: PushIcon
};

export const mapData = {
  AntarcticPeninsula: {
    name: "AntarcticPeninsula",
    thumbnail: AntarcticPeninsulaThumbnail,
    type: "Control",
    displayName: "Antarctic Peninsula"
  },
  Busan: {
    name: "Busan",
    thumbnail: BusanThumbnail,
    type: "Control",
    displayName: "Busan"
  },
  Ilios: {
    name: "Ilios",
    thumbnail: IliosThumbnail,
    type: "Control",
    displayName: "Ilios"
  },
  LijiangTower: {
    name: "LijiangTower",
    thumbnail: LijiangTowerThumbnail,
    type: "Control",
    displayName: "Lijiang Tower"
  },
  Nepal: {
    name: "Nepal",
    thumbnail: NepalThumbnail,
    type: "Control",
    displayName: "Nepal"
  },
  Oasis: {
    name: "Oasis",
    thumbnail: OasisThumbnail,
    type: "Control",
    displayName: "Oasis"
  },
  Samoa: {
    name: "Samoa",
    thumbnail: SamoaThumbnail,
    type: "Control",
    displayName: "Samoa"
  },
  CircuitRoyal: {
    name: "CircuitRoyal",
    thumbnail: CircuitRoyalThumbnail,
    type: "Escort",
    displayName: "Circuit Royal"
  },
  Dorado: {
    name: "Dorado",
    thumbnail: DoradoThumbnail,
    type: "Escort",
    displayName: "Dorado"
  },
  Havana: {
    name: "Havana",
    thumbnail: HavanaThumbnail,
    type: "Escort",
    displayName: "Havana"
  },
  Junkertown: {
    name: "Junkertown",
    thumbnail: JunkertownThumbnail,
    type: "Escort",
    displayName: "Junkertown"
  },
  Rialto: {
    name: "Rialto",
    thumbnail: RialtoThumbnail,
    type: "Escort",
    displayName: "Rialto"
  },
  Route66: {
    name: "Route66",
    thumbnail: Route66Thumbnail,
    type: "Escort",
    displayName: "Route 66"
  },
  ShambaliMonastery: {
    name: "ShambaliMonastery",
    thumbnail: ShambaliMonasteryThumbnail,
    type: "Escort",
    displayName: "Shambali Monastery"
  },
  WatchpointGibraltar: {
    name: "WatchpointGibraltar",
    thumbnail: WatchpointGibraltarThumbnail,
    type: "Escort",
    displayName: "Watchpoint: Gibraltar"
  },
  Suravasa: {
    name: "Suravasa",
    thumbnail: SuravasaThumbnail,
    type: "Flashpoint",
    displayName: "Suravasa"
  },
  NewJunkCity: {
    name: "NewJunkCity",
    thumbnail: NewJunkCityThumbnail,
    type: "Flashpoint",
    displayName: "New Junk City"
  },
  Aatlis: {
    name: "Aatlis",
    thumbnail: AatlisThumbnail,
    type: "Flashpoint",
    displayName: "Aatlis"
  },
  BlizzardWorld: {
    name: "BlizzardWorld",
    thumbnail: BlizzardWorldThumbnail,
    type: "Hybrid",
    displayName: "Blizzard World"
  },
  Eichenwalde: {
    name: "Eichenwalde",
    thumbnail: EichenwaldeThumbnail,
    type: "Hybrid",
    displayName: "Eichenwalde"
  },
  Hollywood: {
    name: "Hollywood",
    thumbnail: HollywoodThumbnail,
    type: "Hybrid",
    displayName: "Hollywood"
  },
  KingsRow: {
    name: "KingsRow",
    thumbnail: KingsRowThumbnail,
    type: "Hybrid",
    displayName: "King's Row"
  },
  Midtown: {
    name: "Midtown",
    thumbnail: MidtownThumbnail,
    type: "Hybrid",
    displayName: "Midtown"
  },
  Numbani: {
    name: "Numbani",
    thumbnail: NumbaniThumbnail,
    type: "Hybrid",
    displayName: "Numbani"
  },
  Paraiso: {
    name: "Paraiso",
    thumbnail: ParaisoThumbnail,
    type: "Hybrid",
    displayName: "Paraiso"
  },
  Colosseo: {
    name: "Colosseo",
    thumbnail: ColosseoThumbnail,
    type: "Push",
    displayName: "Colosseo"
  },
  Esperanca: {
    name: "Esperanca",
    thumbnail: EsperancaThumbnail,
    type: "Push",
    displayName: "Esperança"
  },
  NewQueenStreet: {
    name: "NewQueenStreet",
    thumbnail: NewQueenStreetThumbnail,
    type: "Push",
    displayName: "New Queen Street"
  },
  Runasapi: {
    name: "Runasapi",
    thumbnail: RunasapiThumbnail,
    type: "Push",
    displayName: "Runasapi"
  },
  Hanaoka: {
    name: "Hanaoka",
    thumbnail: HanaokaThumbnail,
    type: "Clash",
    displayName: "Hanaoka"
  },
  ThroneOfAnubis: {
    name: "ThroneOfAnubis",
    thumbnail: ThroneOfAnubisThumbnail,
    type: "Clash",
    displayName: "Throne of Anubis"
  },
};
