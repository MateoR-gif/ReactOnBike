import { useEffect, useState } from "react"
import { Accordion, Button, Card } from "react-bootstrap"
import AccordionBody from "react-bootstrap/esm/AccordionBody"
import AccordionHeader from "react-bootstrap/esm/AccordionHeader"
import AccordionItem from "react-bootstrap/esm/AccordionItem"
import Loading from "./loading"

function ResumenEmpresas() {

    const [networks, setNetworks] = useState([])
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

    if (isLoading) {
        return (
            <div>
                <Loading></Loading>
            </div>
        )
    }
    return (
        <div className="resumen__empresas">
            {networks.map(network => {
                return (
                    <div key={network.id}>
                        <Accordion className="accordion" defaultActiveKey="0">
                            <center>
                                <AccordionItem>
                                    <AccordionHeader>{network.company} ({network.location.city})</AccordionHeader>
                                    <AccordionBody>
                                        <Card>
                                            <Card.Title>Información</Card.Title>
                                            <Card.Text>
                                                <p>Nombre de la Red: {network.name}</p>
                                                <p>Nombre de la Empresa: {network.company}</p>
                                                <p>País: {network.location.country}</p>
                                            </Card.Text>
                                        </Card>
                                        <br></br>
                                        <Button variant="primary">Mostrar Estaciones</Button>
                                    </AccordionBody>
                                </AccordionItem>
                            </center>
                        </Accordion>
                        {/* <p>Nombre de la Compañía: {network.company} ({network.location.city})</p> */}
                    </div>
                )
            })}
        </div>
    )
}

export default ResumenEmpresas
