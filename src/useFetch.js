import { useState, useEffect } from 'react'
const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [spinner, setSpinner] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController()
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal } )
            .then(res => {
                if(!res.ok) {
                    throw Error('Could not fetch data for this resource')
                }
                return res.json();
            })
            .then(data => {                
                setData(data)
                setSpinner(false)
                setError(null)
            })
            .catch(err => {
                if(err.name === 'AbortError') {
                    // console.log('fetch aborted')
                    // Fetch aborted before component was done rendering
                } else {
                    setError(err.message)
                    setSpinner(false)
                }
            })
        }, 5000)
        return () => abortCont.abort()
    }, [url]) 
    
    return { data, spinner, error }
}

export default useFetch