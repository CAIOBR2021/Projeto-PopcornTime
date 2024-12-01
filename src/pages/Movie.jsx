import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    BsGraphUp,
    BsWallet2,
    BsFillFileEarmarkTextFill
} from 'react-icons/bs'

import { MdOutlineTimer } from "react-icons/md";

import MovieCard from "../components/MovieCard"
import '../styles/Movies.css'

const moviesURL = import.meta.env.VITE_API;
const apikey = import.meta.env.VITE_API_KEY;
const imageURL = import.meta.env.VITE_IMG


const Movie = () => {

    const { id } = useParams()
    const [movie, setMovie] = useState(null)

    const getMovie = async (url) => {

        const res = await fetch(url)
        const data = await res.json()
        setMovie(data)
    }


    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    useEffect(() => {
        const movieURL = `${moviesURL}${id}?${apikey}&language=pt-BR`
        getMovie(movieURL)
    }, [])
    return (
        <div className="movie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">{movie.tagline}</p>
                    <div className="info">
                        <h3>
                            <BsWallet2 /> Orçamento:
                        </h3>
                        <p>{formatCurrency(movie.budget)}</p>
                        
                    </div>
                    <div className="info">
                        <h3>
                            <BsGraphUp /> Receita:
                        </h3>
                        <p>{formatCurrency(movie.revenue)}</p>

                    </div>
                    <div className="info">
                        <h3>
                            <MdOutlineTimer /> Duração:
                        </h3>
                        <p>{movie.runtime} minutos</p>

                    </div>
                    <div className="info description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Descrição:
                        </h3>
                        <p>{movie.overview}</p>
                    </div>
                </>
            )}
        </div>
    )
};

export default Movie;