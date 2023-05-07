'use client'

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import CommandBar from '~/components/CommandBar'

export interface Project {
  name: string
  description: string
}

export interface PinnedProject {
  name: string
  description: string
  url: string
  homepageUrl: string
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
  watchers: {
    totalCount: number
  }
}

export interface GithubProject {
  id: number
  name: string
  description: string
  html_url: string
  url: string
  languages_url: string
  language: string
  forks_count: number
  stargazers_count: number
  topics: string[]
}

export interface XInterface {
  allProjects: GithubProject[]
  setProjects: (projects: GithubProject[]) => void
  pinnedProjects: PinnedProject[]
  setPinnedProjects: (pinnedProjects: PinnedProject[]) => void
  projectsLoader: boolean
  setProjectsLoader: (projectsLoader: boolean) => void
  pinnedProjectsLoader: boolean
  setPinnedProjectsLoader: (pinnedProjectsLoader: boolean) => void
}

export const XContext = createContext<XInterface>({
  allProjects: [],
  setProjects: () => {},
  pinnedProjects: [],
  setPinnedProjects: () => {},
  projectsLoader: false,
  setProjectsLoader: () => {},
  pinnedProjectsLoader: false,
  setPinnedProjectsLoader: () => {}
})

export function XProvider({ children }: { children?: ReactNode }): JSX.Element {
  const [projects, setProjects] = useState<GithubProject[]>([])
  const [projectsLoader, setProjectsLoader] = useState<boolean>(false)
  const [pinnedProjects, setPinnedProjects] = useState<PinnedProject[]>([])
  const [pinnedProjectsLoader, setPinnedProjectsLoader] = useState<boolean>(false)

  // fetch projects from github api
  const { data: project_data, error: project_error } = useSWR<GithubProject[]>(
    `https://api.github.com/users/braswelljr/repos`,
    (url: URL) => fetch(url).then(res => res.json()),
    {
      refreshInterval: 60000,
      shouldRetryOnError: true
    }
  )

  // fetch pinned projects from github api
  const { data: pinned_projects_data, error: pinned_projects_error } = useSWR(
    `https://api.github.com/graphql`,
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
                    homepageUrl
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
                    watchers {
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
    if (!pinned_projects_data && !pinned_projects_error) setPinnedProjectsLoader(true)
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
      console.log(pinned_projects_data.errors[0])
    }
  }, [pinned_projects_data])

  const memoizedValue = useMemo(
    () => ({
      allProjects: projects,
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
      <CommandBar>{children}</CommandBar>
    </XContext.Provider>
  )
}

export default function useXStore() {
  return useContext(XContext)
}
