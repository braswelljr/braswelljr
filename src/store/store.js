import { useState, createContext } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayout'

export const Store = createContext()

export const StoreProvider = ({ children }) => {
  const [theme, setTheme] = useState(true)
  const [repos, setRepos] = useState(null)
  const [errors, setError] = useState(null)

  useIsomorphicLayoutEffect(() => {
    if (repos === null || typeof repos === 'undefined') {
      fetch(
        `https://api.github.com/users/braswelljr/repos?&access_token=${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => response.json())
        .then(result => setRepos(result))
        .catch(error => {
          setError(error)
          console.error(error)
        })
    }
  }, [repos])

  return (
    <Store.Provider
      value={{
        theme,
        setTheme: () => setTheme(!theme),
        repos,
        errors
      }}
    >
      {children}
    </Store.Provider>
  )
}
