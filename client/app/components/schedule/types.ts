export type EventType = 'scrim' | 'coaching' | 'official' | 'meeting'
export type RsvpStatus = 'yes' | 'maybe' | 'no'
export type ViewLayout = 'week' | 'agenda'

export interface RosterMember {
  id: string
  name: string
  role: string
  initials: string
}

export interface CalEvent {
  id: string
  start: Date
  end: Date
  type: EventType
  title: string
  tentative?: boolean
  recurrence?: 'weekly'
  rsvps?: Record<string, RsvpStatus>
  opponent?: string
  notes?: string
  roster?: RosterMember[]
}
