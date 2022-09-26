import { useEffect, useState } from "react"
import { Accordion, Button, Card } from "react-bootstrap"
import Loading from "./loading"
import ListadoEstaciones from "./listado-estaciones"
import './App.css'
import ReactCountryFlag from "react-country-flag"

function ResumenEmpresas() {

    const [networks, setNetworks] = useState([])
    const [networkInfo, setNetworkInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const url = "http://api.citybik.es/v2/networks"

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        const response = await fetch(url, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))

        setNetworks(response.networks)
        setIsLoading(false)
    }

    const fetchData2 = async (href) => {
        let url2 = `http://api.citybik.es${href}`
        const response = await fetch(url2, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))
        console.log(href)
        setNetworkInfo(response.network)
        console.log(response.network)
    }

    if (isLoading) {
        return (
            <div className="loading__gif">
                <Loading></Loading>
                <h1>Cargando...</h1>
            </div>
        )
    }
    return (
        <div className="content">
            <ListadoEstaciones data={networkInfo} />
            <div className="resumen__empresas">
                {networks.map((network, index) => {
                    return (
                        <div key={network.id}>
                            <Accordion className="accordion" defaultActiveKey={0}>
                                <center>
                                    <Accordion.Item eventKey={index} className="accordion__item">
                                        <Accordion.Header>{network.company} ({network.location.city})</Accordion.Header>
                                        <Accordion.Body>
                                            <Card>
                                                <Card.Title>Información</Card.Title>
                                                <Card.Text>Nombre de la Red: {network.name}</Card.Text>
                                                <Card.Text>Nombre de la Empresa: {network.company}</Card.Text>
                                                <Card.Text>País: {network.location.country} <ReactCountryFlag countryCode={network.location.country} svg/></Card.Text>
                                            </Card>
                                            <br></br>
                                            <Button onClick={() => fetchData2(network.href)}>Mostrar Estaciones</Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </center>
                            </Accordion>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ResumenEmpresas
