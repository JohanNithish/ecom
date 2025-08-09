import React from 'react'

function Popup(props) {
  return (
    <>
    {props.overlay !== null && <div className="bb-mobile-menu-overlay" onClick={() => props.PopUp(props.overlay)}></div> }
    </>
  )
}

export default Popup