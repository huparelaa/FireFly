import react, {useState, useEffect} from 'react'
import axios from 'axios'

function Analytics(){
    const [data, setData] = useState(null)
    useEffect (() => {
        async function getAnalytics(){
            const res =  await axios.get(`${process.env.REACT_APP_API_URL}/analytics/more_played_games/`)
            try {
                console.log(res);
                setData(res.data.juegos_populares)
            } catch (err){
                console.log(err);
            }
        }
        getAnalytics()
    }, [])
    if (!data) {
        return <p>Cargando ...</p>;
    }
    return (
        <div>
            <ul className='text-white'>
                {data.map((game) => (
                    <li key={game.id_game}>
                        <h2>{game.title}</h2>
                        <p>Veces seleccionado: {game.count}</p>
                    </li>
                ))}
    </ul>
        </div>
    )
}


export default Analytics