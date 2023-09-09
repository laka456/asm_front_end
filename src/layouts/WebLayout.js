import React from 'react'
import {Outlet} from 'react-router-dom'

function WebLayout() {
  return (
    <>
        <Outlet/>
    </>
  )
}

export default WebLayout;