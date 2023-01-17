import React, { Suspense,useRef, useState } from 'react'
import { Canvas,useFrame } from '@react-three/fiber';
import Dice from './Components/Dice';
import { OrbitControls } from '@react-three/drei'

const Box = (props) => {
  const boxRef = useRef();

  useFrame(() => {
    boxRef.current.rotation.y += props.rotation;
  });

  return (
    <mesh ref={boxRef}  rotation-x={Math.PI * Math.random()} rotation-y={Math.PI * Math.random()} rotation-z={Math.PI * Math.random()}>
      <Dice/>
    </mesh>
  );
};

export default function App() {
  let [rotation,setRotation] = useState(0);
  let [btntext,setBtntext] = useState("Click To Rotate");

  const changeRotation = ()=>{
    rotation?setRotation(0):setRotation(Math.random());
    btntext==="Click To Rotate"?setBtntext("Click To Stop"):setBtntext("Click To Rotate");
  }
  return (<>
    <br />
      <Canvas style={{width:'100%',height:'70vh'}}>
        <OrbitControls />
        <Suspense>
          <Box rotation={rotation} />
        </Suspense>
        <ambientLight intensity={1} />
        <directionalLight intensity={1} position={[-2, 5, 2]} />
      </Canvas>
      <div className='text-center'>
        <button type="button" class="btn btn-outline-dark" onClick={()=> changeRotation() }>{btntext}</button>
      </div>   
    </>
  )
}
