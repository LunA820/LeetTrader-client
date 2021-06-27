import React, {useContext} from 'react'
import {UidContext} from '../context/UidContext';


export default function Home() {
  const {uid} = useContext(UidContext)

  return (
    <div>
      This is the home page after login. <hr />
      User ID: {uid}
    </div>
  )
}
