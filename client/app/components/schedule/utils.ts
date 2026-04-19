import { MONTHS } from './constants'

export function getWeekStart(offset = 0): Date {
  const now = new Date()
  const day = now.getDay()
  const delta = day === 0 ? -6 : 1 - day
  const d = new Date(now)
  d.setDate(d.getDate() + delta + offset * 7)
  d.setHours(0, 0, 0, 0)
  return d
}

export function pad(n: number): string {
  return n < 10 ? '0' + n : String(n)
}

export function fmtTime(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function fmtRange(a: Date, b: Date): string {
  return `${fmtTime(a)}–${fmtTime(b)}`
}

export function toHours(d: Date, ref?: Date): number {
  const h = d.getHours() + d.getMinutes() / 60
  if (ref) {
    const rd = new Date(ref); rd.setHours(0, 0, 0, 0)
    const dd = new Date(d);   dd.setHours(0, 0, 0, 0)
    if (dd > rd) return h + 24
  }
  return h
}

export function snapMins(mins: number, step: number): number {
  return Math.round(mins / step) * step
}

export function getDayEvents<T extends { start: Date }>(events: T[], weekStart: Date, dayIdx: number): T[] {
  const d = new Date(weekStart)
  d.setDate(d.getDate() + dayIdx)
  return events.filter(e => {
    const s = e.start
    return s.getFullYear() === d.getFullYear()
      && s.getMonth() === d.getMonth()
      && s.getDate() === d.getDate()
  })
}

export function getWeekLabel(ws: Date): string {
  const end = new Date(ws)
  end.setDate(end.getDate() + 6)
  const sm = MONTHS[ws.getMonth()]
  const em = MONTHS[end.getMonth()]
  return sm === em
    ? `${sm} ${ws.getDate()}–${end.getDate()}`
    : `${sm} ${ws.getDate()} – ${em} ${end.getDate()}`
}

export function todayDayIndex(weekStart: Date, today: Date): number {
  const ws = new Date(weekStart); ws.setHours(0, 0, 0, 0)
  const td = new Date(today); td.setHours(0, 0, 0, 0)
  const idx = Math.floor((td.getTime() - ws.getTime()) / 86400000)
  return idx >= 0 && idx < 7 ? idx : -1
}
