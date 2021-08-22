import { useState, useEffect } from 'react'

export const useFetch = (url, options) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const onFetch = async (url, options) =>
    await (await fetch(url, options)).json()

  useEffect(() => {
    if (data === null || typeof data === 'undefined') {
      onFetch(url, options)
        .then(result => setData(result))
        .catch(error => setError(error))
    }
  }, [data, error])

  return data
}
