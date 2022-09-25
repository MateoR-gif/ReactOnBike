import React, { useState } from 'react'
import Loading from './loading'

function ListadoEstaciones() {
    const [isLoading, setIsLoading] = useState(true)

    if (isLoading) {
        return (
            <div className='listado__estaciones'>
                <Loading></Loading>
            </div>
        )
    }
    return (
        <div className='listado__estaciones'>listado-estaciones</div>
    )
}

export default ListadoEstaciones