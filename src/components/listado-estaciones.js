import React, { useCallback, useEffect, useState } from 'react'
import { Card, Toast, ToastContainer, Button } from 'react-bootstrap'
import Loading from './loading'

function ListadoEstaciones({ data }) {

    const [isLoading, setIsLoading] = useState(true)
    const [stations, setStations] = useState([])
    const [show, setShow] = useState(false);
    const [all_free_bikes, setAllFB] = useState()
    const [all_empty_slots, setAllES] = useState()
    const nullMsg = "Sin Info"

    const handleCount = useCallback(() => {
        var temp_stations = stations
        var all_empty_slots = 0
        var all_free_bikes = 0
        for (var i in temp_stations) {
            all_empty_slots = all_empty_slots + temp_stations[i].empty_slots
            all_free_bikes = all_free_bikes + temp_stations[i].free_bikes
        }
        setAllFB(all_free_bikes)
        setAllES(all_empty_slots)
    }, [stations]);

    useEffect(() => {
        if (data.length === 0) {
            setIsLoading(true)
        } else {
            setStations(data.stations)
            handleCount()
            setIsLoading(false)
        }
    }, [data, stations, handleCount])

    if (isLoading) {
        return (
            <div className='listado__loading'>
                <Loading></Loading>
                <h1>Elige una de nuestras compañías...</h1>
                <h5>Ctrl + F para buscar tu ciudad.</h5>
            </div>
        )
    }
    else if (stations.length === 0) {
        return (
            <div className='listado__loading'>
                <Loading></Loading>
                <h1>No se encontraron estaciones :(</h1>
                <h5>Ctrl + F para buscar tu ciudad.</h5>
            </div>
        )
    }
    return (
        <div className='listado__estaciones'>
            <Button onClick={() => setShow(true)} position="top-start"  className="button__toast">Detalles Generales</Button>
            <ToastContainer position="top-start" className="position-fixed p-3">
                <Toast onClose={() => setShow(false)} show={show}>
                    <Toast.Header>
                        <strong className="me-auto"><strong>{data.name} ({data.location.city})</strong></strong>
                    </Toast.Header>
                    <Toast.Body >
                        <center>
                            <Card>
                                <Card.Text className='green'>Total Espacios Libres: {all_empty_slots}</Card.Text>
                                <Card.Text className='blue'>Total Bicicletas Libres: {all_free_bikes}</Card.Text>
                            </Card>
                        </center>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <center>
                {stations.map(station => {
                    let all_slots = station.empty_slots + station.free_bikes
                    return (
                        <div key={station.id}>
                            <Card className='station__card position-static'>
                                <Card.Header><i>Estación</i></Card.Header>
                                <Card.Title>{station.name}</Card.Title>
                                <Card.Text className="red">Total de Espacios: {all_slots}</Card.Text>
                                <Card.Text className='green'>Espacios Libres: {station.empty_slots === null ? nullMsg : station.empty_slots}</Card.Text>
                                <Card.Text className='blue'>Bicicicletas Libres: {station.free_bikes === null ? nullMsg : station.free_bikes}</Card.Text>
                                <Card.Footer>Última Actualización: {station.timestamp}</Card.Footer>
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