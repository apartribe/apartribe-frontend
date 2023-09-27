export interface Announce {
  category: string
  protected: boolean
  title: string
  content: string
  startDate: Date
  endDate: Date | null
}

export interface Board {
  category: string
  protected: boolean
  title: string
  content: string
}

export interface GatherPeople {
  category: string
  protected: boolean
  title: string
  explain: string
  startDate: Date
  endDate: Date | null
  time: string
  place: string
  target: string
  dues: string
  content: string
}
