export interface repo {
  name: string
  description: string
  url: string
  createdAt: string
  updatedAt: string
  primaryLanguage: {
    name: string
    color: string
  }
  stargazers: {
    totalCount: number
  }
}

export interface State {
  name: string
  repositories: repo[]
  setRepositories: (params: repo[]) => void
  blogpagemenutoogle: boolean
  setBlogpagemenutoogle: (params: boolean) => void
}
