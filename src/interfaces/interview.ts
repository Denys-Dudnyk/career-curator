export interface IInterview {
  id: string
  company: string
  vacancyLink: string
  hrName: string
  contactTelegram?: string
  contactWhatsapp?: string
  contactEmail?: string
  createdAt: string
  salaryFrom?: number
  salaryTo?: number
  stages?: IStage[]
  result?:
    | 'reject'
    | 'process'
    | 'offer'
}

export interface IStage {
  id: number
  name: string
  date: Date | string | null
  description: string
}
