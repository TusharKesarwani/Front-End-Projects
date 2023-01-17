import React from 'react'
import { useTexture } from "@react-three/drei"


export default function Dice() {
  const textures = useTexture([
 'assets/dice-one.png',
 'assets/dice-two.png',
 'assets/dice-three.png',
 'assets/dice-four.png',
 'assets/dice-five.png',
 'assets/dice-six.png'])
  return (
    <mesh>
    <mesh>
      <boxBufferGeometry args={[3,3,3]} attach="geometry"/>
      {textures.map((texture,id)=>(
        <meshStandardMaterial  map={texture} key={texture.id} attach={`material-${id}`} />
      ))}
    </mesh>
    </mesh>
  )
}
