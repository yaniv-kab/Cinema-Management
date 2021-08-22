import react, { createContext, useState } from 'react';

// creating context
export const MoviesContext = createContext()


// creating provider component
export const MoviesContextProvider = (props) => {
    const [moviesData, setMoviesData] = useState([])



    return (
        <MoviesContext.Provider value={[moviesData, setMoviesData]}>
            {props.children}
        </MoviesContext.Provider>
    )
}
