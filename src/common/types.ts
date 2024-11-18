export interface Note {
  id: string
  title: string
  content: string
  theme: number
  createdAt?: string
  updatedAt?: string
  pinned?: boolean
}
