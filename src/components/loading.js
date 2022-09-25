import React, { Fragment } from 'react'
import loadingAnimation from "./bikeAnimation.gif"

function Loading() {
  return (
    <div className="animation__gif__div">
      <Fragment>
          <img className="animation__gif" src={loadingAnimation} alt="Cargando..."></img>
      </Fragment>

    </div>
  )
}

export default Loading