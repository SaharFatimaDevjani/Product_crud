import React from 'react'
import { NavLink } from 'react-router-dom'

const Button = ({url,text}) => {
  return (
    <div className='buttonStyle'>
      <NavLink className="button blueBack" to={url}>{text}</NavLink>
    </div>
  )
}

export default Button


