import React from 'react'

function Num(props) {
  return (
    <>
     {
      props.value < 0 ? 
        <span className="neg">{props.value}</span>
        :
        <span className="pos">{props.value}</span>
      } 
    </>
  )
}

export default Num
