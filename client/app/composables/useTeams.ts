import { defineStore } from 'pinia'
import { heroData } from '~/lib/heroData'

export interface RosterPlayer {
  name: string
  hero: keyof typeof heroData
  role: string
}

export interface Team {
  id: string
  name: string
  slug: string
  rank: string
  record: { wins: number; losses: number; draws: number }
  roster: RosterPlayer[]
  staff?: RosterPlayer[]
}

const seedTeams: Team[] = [
  {
    id: 'mrg-garnet',
    name: 'MRG Garnet',
    slug: 'mrg-garnet',
    rank: 'GM5',
    record: { wins: 18, losses: 5, draws: 2 },
    roster: [
      { name: 'Poke', hero: 'Reinhardt', role: 'Tank' },
      { name: 'Tempo', hero: 'Sojourn', role: 'Damage' },
      { name: 'Ceisses', hero: 'Tracer', role: 'Damage' },
      { name: 'Kritzkrieg', hero: 'Kiriko', role: 'Support' },
      { name: 'Ruby', hero: 'Lucio', role: 'Support' },
    ],
    staff: [
      { name: 'Dumda', hero: "WreckingBall", role: "Coach"},
      { name: "MoodyRat", hero: "Ana", role: "Manager"},
    ]
  },
  {
    id: 'mock-team',
    name: 'Mock Team',
    slug: 'mock-team',
    rank: 'Plat1',
    record: { wins: 3, losses: 12, draws: 1 },
    roster: [
      { name: 'Tank 1', hero: 'Reinhardt', role: 'Tank' },
      { name: 'Damage 1', hero: 'Hanzo', role: 'Damage' },
      { name: 'Damage 2', hero: 'Reaper', role: 'Damage' },
      { name: 'Damage 3', hero: 'Widowmaker', role: 'Damage' },
      { name: 'Support 1', hero: 'Mercy', role: 'Support' },
      { name: 'Support 2', hero: 'Zenyatta', role: 'Support' },
      { name: 'Support 3', hero: 'Ana', role: 'Support' },
    ],
    staff: [
      { name: 'Coach', hero: "WreckingBall", role: "Coach"},
      { name: "Manager", hero: "Ana", role: "Manager"},
    ]
  },
]

export const useTeams = defineStore('teams', () => {
  const teams = ref<Team[]>(seedTeams)

  const getTeam = (slug: string) => teams.value.find(t => t.slug === slug)

  const createTeam = (data: { name: string; rank: string; roster?: RosterPlayer[] }): string => {
    const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    teams.value = [...teams.value, {
      id: slug,
      name: data.name,
      slug,
      rank: data.rank,
      record: { wins: 0, losses: 0, draws: 0 },
      roster: data.roster ?? [],
    }]
    return slug
  }

  const updateTeam = (id: string, data: Partial<Pick<Team, 'name' | 'rank' | 'roster'>>) => {
    teams.value = teams.value.map(t => t.id === id ? { ...t, ...data } : t)
  }

  const deleteTeam = (id: string) => {
    teams.value = teams.value.filter(t => t.id !== id)
  }

  return { teams, getTeam, createTeam, updateTeam, deleteTeam }
})
