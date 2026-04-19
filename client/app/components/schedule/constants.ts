import type { EventType } from './types'

export const EVENT_TYPES: Record<EventType, { label: string; fill: string; ink: string }> = {
  scrim:    { label: 'Scrim',    fill: 'oklch(0.72 0.18 50)',  ink: '#2a1502' },
  coaching: { label: 'Coaching', fill: 'oklch(0.62 0.22 25)',  ink: '#2a0606' },
  official: { label: 'Official', fill: 'oklch(0.52 0.22 290)', ink: '#1a062a' },
  meeting:  { label: 'Meeting',  fill: 'oklch(0.45 0.03 250)', ink: '#0d1420' },
}

export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
export const DAY_LONG  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const
export const MONTHS    = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

export const DAY_IDX: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }
export const TYPE_MAP: Record<string, EventType> = {
  match: 'official', scrim: 'scrim', coaching: 'coaching', official: 'official', meeting: 'meeting',
}

export const MIN_SNAP     = 15
export const MIN_DURATION = 30
export const HOUR_H       = 48
export const DAY_COUNT    = 7
export const WEEK_DAYS    = [0, 1, 2, 3, 4, 5, 6] as const
