import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import '../styles/MoviesGrid.css';
import { GiClapperboard } from "react-icons/gi";


const moviesURL = import.meta.env.VITE_API;
const apikey = import.meta.env.VITE_API_KEY;

const Home = () => {
    
    const [topMovies, setTopMovies] = useState([])

    const getTopRatedMovies = async (url) => {

        const res = await fetch(url)
        const data = await res.json()

        setTopMovies(data.results)
    }

    useEffect(() => {

        const topRatedUrl = `${moviesURL}popular?${apikey}&language=pt-BR`
        
        getTopRatedMovies(topRatedUrl)

    }, [])

    return (

        <div className="container">
            <h2 className="title">Destaques da Semana {/* <GiClapperboard /> */}</h2>
            <div className="movies-container">
                {topMovies.length === 0 && <p>Carregando...</p>}
                {topMovies.length > 0 && topMovies.map((movie) => 
                <MovieCard key={movie.id} movie={movie} />)}   
            </div>
        </div>

    )
};

export default Home;

