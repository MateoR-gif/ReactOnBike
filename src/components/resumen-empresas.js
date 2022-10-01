import { useCallback, useEffect, useState } from "react"
import { Accordion, Button, Card, ListGroup } from "react-bootstrap"
import Loading from "./loading"
import ListadoEstaciones from "./listado-estaciones"
import ReactCountryFlag from "react-country-flag"

function ResumenEmpresas() {

    const [networks, setNetworks] = useState([])
    const [networkInfo, setNetworkInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const url = "http://api.citybik.es/v2/networks"
    const nullMsg = "Sin Info"

    const fetchData = useCallback(async () => {
        await fetch(url).then((response) => {
            if (response.ok) {
                return response.json();
            }
            setIsLoading(true)
            throw new Error('Hubo un problema con el Consumo de API');
        })
            .then((response) => {
                setNetworks(response.networks)
                setError('Listo')
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            })
            .catch((error) => {
                setTimeout(() => {
                    setError('Hubo un error en la carga de datos, intenta recargar')
                }, 1000)
                console.log(error)
            });
    }, [])

    const fetchData2 = async (href) => {
        let redirect = `http://api.citybik.es${href}`
        const response = await fetch(redirect, { method: 'GET' })
            .then(response => response.json())
            .catch(error => console.log(error))
        setNetworkInfo(response.network)
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])

    if (isLoading) {
        return (
            <div className="loading__gif">
                <Loading></Loading>
                <h1>Cargando...</h1>
                <h5>{error}</h5>
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
                                            <Card className="network__card">
                                                <Card.Header><i>Información</i></Card.Header>
                                                <ListGroup>
                                                    <ListGroup.Item>
                                                        País: {network.location.country}
                                                        <ReactCountryFlag
                                                            countryCode={network.location.country}
                                                            svg />
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className="red">
                                                        Nombre de la Red: {network.name}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        Nombre de la Empresa: {network.company ? network.company : nullMsg}
                                                    </ListGroup.Item>
                                                </ListGroup>
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
