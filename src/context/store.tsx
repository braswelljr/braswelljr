import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo
} from 'react'
import useSWR from 'swr'
import Toast from '@/components/Toast'

export interface Project {
  name: string
  description: string
}

export interface PinnedProject {
  name: string
  description: string
  url: string
  createdAt: string
  updatedAt: string
  languages: {
    nodes: {
      name: string
      color: string
      percent: number
    }[]
  }
  primaryLanguage: {
    name: string
    color: string
  }
  forks: {
    totalCount: number
  }
  stargazers: {
    totalCount: number
  }
}

export interface GithubProject {
  id: number
  name: string
  description: string
  html_url: string
  languages_url: string
  language: string
  forks_count: number
  stargazers_count: number
  topics: string[]
}

export interface XInterface {
  projects: Project[]
  setProjects: (projects: Project[]) => void
  pinnedProjects: PinnedProject[]
  setPinnedProjects: (pinnedProjects: PinnedProject[]) => void
  projectsLoader: boolean
  setProjectsLoader: (projectsLoader: boolean) => void
  pinnedProjectsLoader: boolean
  setPinnedProjectsLoader: (pinnedProjectsLoader: boolean) => void
}

export const XContext = createContext<XInterface>({
  projects: [],
  setProjects: () => {},
  pinnedProjects: [],
  setPinnedProjects: () => {},
  projectsLoader: false,
  setProjectsLoader: () => {},
  pinnedProjectsLoader: false,
  setPinnedProjectsLoader: () => {}
})

export function XProvider({ children }: { children?: ReactNode }): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoader, setProjectsLoader] = useState<boolean>(false)
  const [pinnedProjects, setPinnedProjects] = useState<PinnedProject[]>([])
  const [pinnedProjectsLoader, setPinnedProjectsLoader] =
    useState<boolean>(false)

  // show toast
  const [showToast, setShowToast] = useState<boolean>(false)

  // fetch projects from github api
  const { data: project_data, error: project_error } = useSWR<Project[]>(
    [`https://api.github.com/users/braswelljr/repos`],
    (url: URL) => fetch(url).then(res => res.json()),
    {
      refreshInterval: 60000,
      shouldRetryOnError: true
    }
  )

  // fetch pinned projects from github api
  const { data: pinned_projects_data, error: pinned_projects_error } = useSWR(
    [`https://api.github.com/graphql`],
    (url: URL) =>
      fetch(url, {
        method: 'post',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `{
            user(login: "braswelljr") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    createdAt
                    updatedAt
                    languages (first: 5) {
                      nodes {
                        name
                        color
                      }
                    }
                    primaryLanguage {
                      name
                      color
                    }
                    forks {
                      totalCount
                    }
                    stargazers {
                      totalCount
                    }
                  }
                }
              }
            }
          }`
        })
      }).then(res => res.json()),
    { refreshInterval: 60000, shouldRetryOnError: true }
  )

  // set loading state
  useEffect(() => {
    if (!project_data && !project_error) setProjectsLoader(true)
    else setProjectsLoader(false)
  }, [project_data, project_error])

  // set projects
  useEffect(() => {
    if (project_data && project_data.length > 0) setProjects(project_data)
  }, [project_data])

  useEffect(() => {
    // set loading state
    if (!pinned_projects_data && !pinned_projects_error)
      setPinnedProjectsLoader(true)
    else setPinnedProjectsLoader(false)
    // set pinned projects
  }, [pinned_projects_data, pinned_projects_error])

  // set pinned projects
  useEffect(() => {
    if (
      pinned_projects_data &&
      pinned_projects_data.data &&
      pinned_projects_data.data.user.pinnedItems.nodes &&
      pinned_projects_data.data.user.pinnedItems.nodes.length > 0
    ) {
      setPinnedProjects(pinned_projects_data.data.user.pinnedItems.nodes)
    } else if (pinned_projects_data && pinned_projects_data.errors) {
      setShowToast(true)
      console.log(pinned_projects_data.errors[0])
    }
  }, [pinned_projects_data])

  const memoizedValue = useMemo(
    () => ({
      projects,
      setProjects,
      pinnedProjects,
      setPinnedProjects,
      projectsLoader,
      setProjectsLoader,
      pinnedProjectsLoader,
      setPinnedProjectsLoader
    }),
    [projects, pinnedProjects, projectsLoader, pinnedProjectsLoader]
  )

  return (
    <XContext.Provider value={memoizedValue}>
      {children}
      {pinned_projects_data && pinned_projects_data.errors && (
        <Toast
          title={pinned_projects_data.errors[0].message}
          description={pinned_projects_data.errors[0].message}
          type="error"
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
    </XContext.Provider>
  )
}

export default function useXStore() {
  return useContext(XContext)
}
