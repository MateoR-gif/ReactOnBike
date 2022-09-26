import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Loading from './loading'


function ListadoEstaciones({ data }) {
    const [isLoading, setIsLoading] = useState(true)
    const [stations, setStations] = useState([])

    useEffect(() => {
        if (data.length === 0) {
            setIsLoading(true)
        } else {
            setStations(data.stations)
            console.log(stations)
            setIsLoading(false)
        }
    }, [data.length, data.stations, stations])


    if (isLoading) {
        return (
            <div className='listado__estaciones'>
                <Loading></Loading>
            </div>
        )
    }
    return (
        <div className='listado__estaciones'>
            <center>
                {stations.map(station => {
                    return (
                        <div className='listado' key={station.id}>
                            <Card>
                                <Card.Title>{station.name}</Card.Title>
                                <Card.Text>Bicicicletas Libres: {station.free_bikes}</Card.Text>
                                <Card.Text>Espacios Libres: {station.empty_slots}</Card.Text>
                                <Card.Text>Última Actualización: {station.timestamp}</Card.Text>
                                <Card.Text></Card.Text>
                            </Card>
                            <br></br>
                        </div>
                    )
                })}
            </center>
        </div>
    )
}

export default ListadoEstaciones