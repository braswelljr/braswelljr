export type Primitive = string | number | boolean | bigint | symbol | undefined | null

export type Career = {
  role: string
  company: string
  companyLink: string
  date: string
  description: string[]
}

export type Education = {
  name: string
  degree: string
  date: Date
  school: string
  description: string[]
}
