import React, { useRef } from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scae={10}
      rotation={[360, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight 
        amount={4}
        radius={9}
        intensity={2}
        ambient={10}
        position={[5, 5, -10]}
      />
      <RandomizedLight 
        amount={4}
        radius={5}
        intensity={2}
        ambient={10}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop