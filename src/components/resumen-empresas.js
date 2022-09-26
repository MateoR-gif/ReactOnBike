import { useEffect, useState } from "react"
import { Accordion, Button, Card } from "react-bootstrap"
import AccordionBody from "react-bootstrap/esm/AccordionBody"
import AccordionHeader from "react-bootstrap/esm/AccordionHeader"
import AccordionItem from "react-bootstrap/esm/AccordionItem"
import Loading from "./loading"
import ListadoEstaciones from "./listado-estaciones"
import './App.css'

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
        console.log(response.networks)
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
            <div>
                <Loading></Loading>
            </div>
        )
    }
    return (
        <div className="content">
            <ListadoEstaciones data={networkInfo} />
            <div className="resumen__empresas">
                {networks.map(network => {
                    return (
                        <div key={network.id}>
                            <Accordion className="accordion" defaultActiveKey="0">
                                <center>
                                    <AccordionItem className="accordion__item">
                                        <AccordionHeader>{network.company} ({network.location.city})</AccordionHeader>
                                        <AccordionBody>
                                            <Card>
                                                <Card.Title>Información</Card.Title>
                                                <Card.Text>Nombre de la Red: {network.name}</Card.Text>
                                                <Card.Text>Nombre de la Empresa: {network.company}</Card.Text>
                                                <Card.Text>País: {network.location.country}</Card.Text>
                                            </Card>
                                            <br></br>
                                            <Button onClick={() => fetchData2(network.href)}>Mostrar Estaciones</Button>
                                        </AccordionBody>
                                    </AccordionItem>
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
