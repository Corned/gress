import { defineStore } from 'pinia'
import { mapData } from '~/lib/mapData'

type MapKey = keyof typeof mapData

export interface MapResult {
  map: MapKey
  team1Ban: string
  team2Ban: string
  team1Score: number
  team2Score: number
}

export interface Match {
  id: string
  date: string
  opponent: string
  maps: MapResult[]
}

const seedMatches: Match[] = [
  {
    id: 'match-1',
    date: 'Mar 28, 2026',
    opponent: 'Crazy Raccoon',
    maps: [
      { map: 'Ilios', team1Ban: 'Widowmaker', team2Ban: 'Tracer', team1Score: 0, team2Score: 3 },
      { map: 'KingsRow', team1Ban: 'Bastion', team2Ban: 'Reaper', team1Score: 3, team2Score: 2 },
      { map: 'Dorado', team1Ban: 'Ana', team2Ban: 'Genji', team1Score: 1, team2Score: 3 },
      { map: 'Runasapi', team1Ban: 'Reinhardt', team2Ban: 'Zarya', team1Score: 2, team2Score: 1 },
      { map: 'NewJunkCity', team1Ban: 'Cassidy', team2Ban: 'Ashe', team1Score: 3, team2Score: 2 },
    ],
  },
  {
    id: 'match-2',
    date: 'Mar 25, 2026',
    opponent: 'SF Shock',
    maps: [
      { map: 'Nepal', team1Ban: 'Symmetra', team2Ban: 'Sombra', team1Score: 3, team2Score: 1 },
      { map: 'CircuitRoyal', team1Ban: 'Freja', team2Ban: 'Sigma', team1Score: 2, team2Score: 3 },
      { map: 'Esperanca', team1Ban: 'Genji', team2Ban: 'Reaper', team1Score: 3, team2Score: 2 },
      { map: 'Colosseo', team1Ban: 'Tracer', team2Ban: 'Cassidy', team1Score: 3, team2Score: 0 },
    ],
  },
  {
    id: 'match-3',
    date: 'Mar 21, 2026',
    opponent: 'Seoul Infernal',
    maps: [
      { map: 'Oasis', team1Ban: 'Bastion', team2Ban: 'Torbjorn', team1Score: 1, team2Score: 3 },
      { map: 'WatchpointGibraltar', team1Ban: 'Pharah', team2Ban: 'Echo', team1Score: 2, team2Score: 3 },
      { map: 'Midtown', team1Ban: 'Sojourn', team2Ban: 'Ashe', team1Score: 3, team2Score: 1 },
      { map: 'Suravasa', team1Ban: 'Widowmaker', team2Ban: 'Hanzo', team1Score: 1, team2Score: 3 },
    ],
  },
]

export const useMatches = defineStore('matches', () => {
  const matches = ref<Match[]>(seedMatches)

  const getMatch = (id: string) => matches.value.find(m => m.id === id)

  const createMatch = (data: Omit<Match, 'id'>): string => {
    const id = `match-${Date.now()}`
    matches.value = [...matches.value, { id, ...data }]
    return id
  }

  const updateMatch = (id: string, data: Partial<Omit<Match, 'id'>>) => {
    matches.value = matches.value.map(m => m.id === id ? { ...m, ...data } : m)
  }

  const deleteMatch = (id: string) => {
    matches.value = matches.value.filter(m => m.id !== id)
  }

  return { matches, getMatch, createMatch, updateMatch, deleteMatch }
})
