export interface IMapData {
  name: string;
  thumbnail: string;
  type: string;
  displayName: string;
}

export type MapData = typeof mapData;

export const mapTypeIcons = {
  Control: "/assets/images/maps/Control.webp",
  Escort: "/assets/images/maps/Escort.webp",
  Hybrid: "/assets/images/maps/Hybrid.webp",
  Push: "/assets/images/maps/Push.webp",
  Flashpoint: "/assets/images/maps/Flashpoint.webp",
};

export const mapData = {
  AntarcticPeninsula: {
    name: "AntarcticPeninsula",
    thumbnail: "/assets/images/maps/antarctic_peninsula.webp",
    type: "Control",
    displayName: "Antarctic Peninsula",
  },
  Busan: {
    name: "Busan",
    thumbnail: "/assets/images/maps/busan.webp",
    type: "Control",
    displayName: "Busan",
  },
  Ilios: {
    name: "Ilios",
    thumbnail: "/assets/images/maps/ilios.webp",
    type: "Control",
    displayName: "Ilios",
  },
  LijiangTower: {
    name: "LijiangTower",
    thumbnail: "/assets/images/maps/lijiang_tower.webp",
    type: "Control",
    displayName: "Lijiang Tower",
  },
  Nepal: {
    name: "Nepal",
    thumbnail: "/assets/images/maps/nepal.webp",
    type: "Control",
    displayName: "Nepal",
  },
  Oasis: {
    name: "Oasis",
    thumbnail: "/assets/images/maps/oasis.webp",
    type: "Control",
    displayName: "Oasis",
  },
  Samoa: {
    name: "Samoa",
    thumbnail: "/assets/images/maps/samoa.webp",
    type: "Control",
    displayName: "Samoa",
  },
  CircuitRoyal: {
    name: "CircuitRoyal",
    thumbnail: "/assets/images/maps/circuit_royal.webp",
    type: "Escort",
    displayName: "Circuit Royal",
  },
  Dorado: {
    name: "Dorado",
    thumbnail: "/assets/images/maps/dorado.webp",
    type: "Escort",
    displayName: "Dorado",
  },
  Havana: {
    name: "Havana",
    thumbnail: "/assets/images/maps/havana.webp",
    type: "Escort",
    displayName: "Havana",
  },
  Junkertown: {
    name: "Junkertown",
    thumbnail: "/assets/images/maps/junkertown.webp",
    type: "Escort",
    displayName: "Junkertown",
  },
  Rialto: {
    name: "Rialto",
    thumbnail: "/assets/images/maps/rialto.webp",
    type: "Escort",
    displayName: "Rialto",
  },
  Route66: {
    name: "Route66",
    thumbnail: "/assets/images/maps/route_66.webp",
    type: "Escort",
    displayName: "Route 66",
  },
  ShambaliMonastery: {
    name: "ShambaliMonastery",
    thumbnail: "/assets/images/maps/shambali_monestary.webp",
    type: "Escort",
    displayName: "Shambali Monastery",
  },
  WatchpointGibraltar: {
    name: "WatchpointGibraltar",
    thumbnail: "/assets/images/maps/watchpoint_gibraltar.webp",
    type: "Escort",
    displayName: "Watchpoint: Gibraltar",
  },
  Suravasa: {
    name: "Suravasa",
    thumbnail: "/assets/images/maps/suravasa.webp",
    type: "Flashpoint",
    displayName: "Suravasa",
  },
  NewJunkCity: {
    name: "NewJunkCity",
    thumbnail: "/assets/images/maps/new_junk_city.webp",
    type: "Flashpoint",
    displayName: "New Junk City",
  },
  Aatlis: {
    name: "Aatlis",
    thumbnail: "/assets/images/maps/aatlis.webp",
    type: "Flashpoint",
    displayName: "Aatlis",
  },
  BlizzardWorld: {
    name: "BlizzardWorld",
    thumbnail: "/assets/images/maps/blizzard_world.webp",
    type: "Hybrid",
    displayName: "Blizzard World",
  },
  Eichenwalde: {
    name: "Eichenwalde",
    thumbnail: "/assets/images/maps/eichenwalde.webp",
    type: "Hybrid",
    displayName: "Eichenwalde",
  },
  Hollywood: {
    name: "Hollywood",
    thumbnail: "/assets/images/maps/hollywood.webp",
    type: "Hybrid",
    displayName: "Hollywood",
  },
  KingsRow: {
    name: "KingsRow",
    thumbnail: "/assets/images/maps/kings_row.webp",
    type: "Hybrid",
    displayName: "King's Row",
  },
  Midtown: {
    name: "Midtown",
    thumbnail: "/assets/images/maps/midtown.webp",
    type: "Hybrid",
    displayName: "Midtown",
  },
  Numbani: {
    name: "Numbani",
    thumbnail: "/assets/images/maps/numbani.webp",
    type: "Hybrid",
    displayName: "Numbani",
  },
  Paraiso: {
    name: "Paraiso",
    thumbnail: "/assets/images/maps/paraiso.webp",
    type: "Hybrid",
    displayName: "Paraiso",
  },
  Colosseo: {
    name: "Colosseo",
    thumbnail: "/assets/images/maps/colosseo.webp",
    type: "Push",
    displayName: "Colosseo",
  },
  Esperanca: {
    name: "Esperanca",
    thumbnail: "/assets/images/maps/esperanca.webp",
    type: "Push",
    displayName: "Esperança",
  },
  NewQueenStreet: {
    name: "NewQueenStreet",
    thumbnail: "/assets/images/maps/new_queens_street.webp",
    type: "Push",
    displayName: "New Queen Street",
  },
  Runasapi: {
    name: "Runasapi",
    thumbnail: "/assets/images/maps/runasapi.webp",
    type: "Push",
    displayName: "Runasapi",
  },
  Hanaoka: {
    name: "Hanaoka",
    thumbnail: "/assets/images/maps/hanaoka.webp",
    type: "Clash",
    displayName: "Hanaoka",
  },
  ThroneOfAnubis: {
    name: "ThroneOfAnubis",
    thumbnail: "/assets/images/maps/throne_of_anubis.webp",
    type: "Clash",
    displayName: "Throne of Anubis",
  },
};
