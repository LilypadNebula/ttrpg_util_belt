import React from 'react'

export default props => {
  let classes = `h-16 mx-2 border-2 border-black rounded ${
    props.filled ? 'bg-red-light' : ''
  } w-${props.width}`
  return (
    <div
      style={{ transition: '.5s background' }}
      className={classes}
      onClick={props.update}
    />
  )
}
