export interface Repo {
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
  repositories: Repo[]
  setRepositories: (params: Repo[]) => void
  blogpagemenutoogle: boolean
  setBlogpagemenutoogle: (params: boolean) => void
}
