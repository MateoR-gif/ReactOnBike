import React, { Fragment } from 'react'
import loading from "./media/bikeAnimation.gif"

function Loading({ text }) {
  return (
    <div className="animation__gif__div">
      <Fragment>
          <img className="animation__gif" src={loading} alt="Cargando..."></img>
          <span>{text}</span>
      </Fragment>
    </div>
  )
}

export default Loading