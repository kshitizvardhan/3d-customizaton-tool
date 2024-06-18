import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'

import state from '../store'

const CameraRig = ({children}) => {
  // for moving the camera closer.. we will use useRef hook
  const group = useRef();
  // and will use this ref to update state
  const snap =useSnapshot(state);

  // using useFrame hook 

  useFrame((state,delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    
    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro){
      if(isBreakpoint) targetPosition = [0,0,2];
      if(isMobile) targetPosition=[0,0.2,2.5];
    } else {
      if(isMobile) targetPosition=[0,0,2.5];
      else targetPosition=[0,0,2];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // setting the model rotation 
    easing.dampE(
      group.current.rotation,
      [state.pointer.y/10, -state.pointer.x/5, 0],
      0.25,
      delta
    )
  })
  return (
    <group ref={group}>{children}</group>
  )
}

export default CameraRig

/*
  useFrame() hook from react-three fiber
  This hook allows you to execute code on every rendered frame, like running effects, updating controls, and so on. You receive the state (same as useThree) and a clock delta. Your callback function will be invoked just before a frame is rendered. When the component unmounts it is unsubscribed automatically from the render-loop.

*/