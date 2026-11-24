'use client';

import React, {Component, useEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {CameraControls, RoundedBox} from '@react-three/drei';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

const gold = {color:'#b89a55', metalness:.83, roughness:.24};
const porcelain = {color:'#fffcf3', roughness:.24, metalness:.08};
const glass = {color:'#e4f0ef', metalness:.2, roughness:.08, transparent:true, opacity:.28};
const levels = [-2.85, -1.7, -.55, .6, 1.75, 2.9];

function Box({position, size, color, ...props}) {
  return <mesh position={position} {...props}><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={.65}/></mesh>;
}

function Ring({position, radius, tube=.012, rotation=[-Math.PI/2,0,0]}) {
  return <mesh position={position} rotation={rotation}><torusGeometry args={[radius,tube,8,40]}/><meshStandardMaterial {...gold}/></mesh>;
}

function Candle({height=.65, position}) {
  const flame = useRef();
  useFrame(({clock}) => {
    if (flame.current) flame.current.scale.y = 1 + Math.sin(clock.elapsedTime * 4 + height * 9) * .065;
  });
  return <group position={position}>
    <mesh position={[0,.035,0]}><cylinderGeometry args={[.13,.17,.07,24]}/><meshStandardMaterial {...gold}/></mesh>
    <mesh position={[0,.23,0]}><cylinderGeometry args={[.025,.045,.4,16]}/><meshStandardMaterial {...gold}/></mesh>
    <Ring position={[0,.43,0]} radius={.09}/>
    <mesh position={[0,.45+height/2,0]}><cylinderGeometry args={[.046,.05,height,20]}/><meshStandardMaterial color="#fff0cd" roughness={.8}/></mesh>
    <mesh ref={flame} position={[0,.49+height,0]} scale={[.024,.065,.024]}>
      <sphereGeometry args={[1,12,16]}/><meshBasicMaterial color="#fff4c1" toneMapped={false}/>
    </mesh>
    <pointLight position={[0,.5+height,0]} color="#ffd293" intensity={2.8} distance={2.5} decay={2}/>
  </group>;
}

function PlaceSetting({side, z}) {
  return <group position={[side*.79,1.32,z]} rotation={[0,side===1 ? Math.PI/2 : -Math.PI/2,0]}>
    <mesh><cylinderGeometry args={[.29,.26,.025,48]}/><meshStandardMaterial {...porcelain}/></mesh>
    <Ring position={[0,.018,0]} radius={.275}/>
    <mesh position={[0,.024,0]}><cylinderGeometry args={[.21,.18,.015,40]}/><meshStandardMaterial {...porcelain}/></mesh>
    <RoundedBox args={[.12,.055,.24]} radius={.018} position={[0,.058,0]} rotation={[0,.3,0]}>
      <meshStandardMaterial color="#f2e7d6" roughness={.95}/>
    </RoundedBox>
    <group position={[-.36,.025,0]}>
      <mesh position={[0,0,.08]} rotation={[Math.PI/2,0,0]}>
        <capsuleGeometry args={[.011,.18,4,8]}/><meshStandardMaterial {...gold}/>
      </mesh>
      <mesh position={[0,0,-.055]}><boxGeometry args={[.045,.009,.065]}/><meshStandardMaterial {...gold}/></mesh>
      {[-.018,-.006,.006,.018].map(x=><mesh key={x} position={[x,0,-.115]}>
        <boxGeometry args={[.006,.009,.065]}/><meshStandardMaterial {...gold}/>
      </mesh>)}
    </group>
    <group position={[.36,.025,0]}>
      <mesh position={[0,0,.08]} rotation={[Math.PI/2,0,0]}>
        <capsuleGeometry args={[.013,.18,4,8]}/><meshStandardMaterial {...gold}/>
      </mesh>
      <mesh position={[.006,0,-.085]}><boxGeometry args={[.025,.01,.15]}/><meshStandardMaterial {...gold}/></mesh>
    </group>
    <group position={[-.34,.02,-.36]}>
      <mesh position={[0,.07,0]}><cylinderGeometry args={[.06,.065,.012,20]}/><meshStandardMaterial {...glass}/></mesh>
      <mesh position={[0,.15,0]}><cylinderGeometry args={[.009,.009,.17,10]}/><meshStandardMaterial {...glass}/></mesh>
      <mesh position={[0,.29,0]}><sphereGeometry args={[.075,16,16,0,Math.PI*2,0,Math.PI*.72]}/><meshStandardMaterial {...glass} side={THREE.DoubleSide}/></mesh>
    </group>
  </group>;
}

function Chair({side,z}) {
  return <group position={[side*1.63,0,z]} rotation={[0,side===1 ? -Math.PI/2 : Math.PI/2,0]}>
    <RoundedBox args={[.52,.12,.55]} radius={.05} position={[0,.66,0]}><meshStandardMaterial color="#91846d" roughness={.8}/></RoundedBox>
    <RoundedBox args={[.53,.65,.085]} radius={.055} position={[0,1.04,-.23]}><meshStandardMaterial color="#c5b79a" roughness={.8}/></RoundedBox>
    {[-.21,.21].flatMap(x=>[-.2,.2].map(z=><Box key={x+':'+z} position={[x,.31,z]} size={[.035,.62,.035]} color="#9d7a3a"/>))}
  </group>;
}

function Wall({rotation,position}) {
  return <group rotation={rotation} position={position}>
    <Box position={[0,3.1,0]} size={[17,6.2,.2]} color="#ddd0bb"/>
    {[.14,1.15,5.4,5.6].map(y=><Box key={y} position={[0,y,.13]} size={[17,.065,.1]} color="#b69b62"/>)}
    {[-6,-3,0,3,6].map(x=><group key={x} position={[x,0,.17]}>
      <Box position={[0,3.35,0]} size={[1.85,3.8,.07]} color="#eee5d4"/>
      {[-.95,.95].map(dx=><Box key={dx} position={[dx,3.35,.08]} size={[.025,3.85,.05]} color="#b6a078"/>)}
      {[1.43,5.27].map(y=><Box key={y} position={[0,y,.08]} size={[1.93,.025,.05]} color="#b6a078"/>)}
    </group>)}
  </group>;
}

function BanquetRoom() {
  return <group>
    <Box position={[0,-.12,0]} size={[17,.2,19]} color="#75604b" receiveShadow/>
    {Array.from({length:21},(_,i)=><Box key={i} position={[i*.8-8,0,0]} size={[.015,.005,19]} color="#5a483a"/>)}
    <Wall position={[0,0,-8]}/>
    <Wall position={[-8,0,0]} rotation={[0,Math.PI/2,0]}/>
    <Wall position={[8,0,0]} rotation={[0,-Math.PI/2,0]}/>
    <Wall position={[0,0,8]} rotation={[0,Math.PI,0]}/>
    <Box position={[0,6.3,0]} size={[17,.2,19]} color="#eee5d3"/>
    {[-5,5].map(x=><group key={x} position={[x,0,-7.83]}>
      <Box position={[0,3.4,.1]} size={[1.5,3.8,.12]} color="#bacad0"/>
      <mesh position={[0,3.4,.18]}><planeGeometry args={[1.35,3.65]}/><meshStandardMaterial color="#c7dce5" emissive="#aec8db" emissiveIntensity={.5}/></mesh>
      <Box position={[0,3.4,.22]} size={[.04,3.8,.03]} color="#b39a67"/>
      <Box position={[0,3.4,.22]} size={[1.5,.04,.03]} color="#b39a67"/>
    </group>)}
    <RoundedBox args={[2.65,.14,7.9]} radius={.06} position={[0,1.2,0]} receiveShadow>
      <meshStandardMaterial color="#f3ece0" roughness={.87}/>
    </RoundedBox>
    {[-1,1].map(side=><Box key={side} position={[side*1.31,.95,0]} size={[.035,.5,7.8]} color="#e3d8c5"/>)}
    <Box position={[0,1.281,0]} size={[.5,.016,7.85]} color="#e6d5b4"/>
    {levels.flatMap(z=>[-1,1].map(side=><group key={z+':'+side}><PlaceSetting side={side} z={z}/><Chair side={side} z={z}/></group>))}
    {[-1.85,0,1.85].map(z=><group key={z} position={[0,1.3,z]}>
      <Candle height={.75} position={[0,0,0]}/>
      <Candle height={.48} position={[-.2,0,.19]}/>
      <Candle height={.57} position={[.2,0,-.19]}/>
    </group>)}
    {[-2.75,2.75].map(z=><group key={z} position={[0,1.31,z]}>
      <mesh position={[0,.15,0]}><sphereGeometry args={[.16,20,16]}/><meshStandardMaterial {...gold}/></mesh>
      {Array.from({length:9},(_,i)=><mesh key={i} position={[Math.cos(i*2.4)*.18,.33+(i%3)*.07,Math.sin(i*2.4)*.18]}>
        <sphereGeometry args={[.105,12,12]}/><meshStandardMaterial color={i%2 ? '#fff4df' : '#e2cfad'} roughness={.9}/>
      </mesh>)}
    </group>)}
    {[-3.6,3.6].map(z=><group key={z} position={[0,5.15,z]}>
      <mesh position={[0,.5,0]}><cylinderGeometry args={[.018,.018,1,12]}/><meshStandardMaterial {...gold}/></mesh>
      <Ring position={[0,0,0]} radius={.75} tube={.028}/>
      <Ring position={[0,-.24,0]} radius={.48} tube={.022}/>
      {Array.from({length:12},(_,i)=><mesh key={i} position={[Math.cos(i*Math.PI/6)*.71,-.13,Math.sin(i*Math.PI/6)*.71]}>
        <octahedronGeometry args={[.065]}/><meshStandardMaterial color="#fff4d9" metalness={.35} roughness={.12}/>
      </mesh>)}
      <pointLight position={[0,-.3,0]} intensity={25} color="#ffe2ad" distance={12}/>
    </group>)}
  </group>;
}

function CameraOrbit({scene, reduced, onReady}) {
  const controls = useRef();
  const progress = useRef({value:0});
  const angle = useRef(0);
  const visible = useRef(true);
  const {gl, scene:world, invalidate} = useThree();

  useEffect(() => {
    const environment = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const target = generator.fromScene(environment,.04);
    world.environment = target.texture;
    world.environmentIntensity = .65;
    const trigger = reduced ? null : ScrollTrigger.create({
      trigger:scene, start:'top top', end:'bottom bottom',
      onUpdate:self=>{progress.current.value=self.progress; invalidate();},
      onRefresh:self=>{progress.current.value=self.progress; invalidate();},
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (entry.isIntersecting) invalidate();
    });
    observer.observe(scene);
    const resume = () => { if (!document.hidden) invalidate(); };
    document.addEventListener('visibilitychange', resume);
    onReady();
    return () => {
      trigger?.kill();
      observer.disconnect();
      document.removeEventListener('visibilitychange', resume);
      world.environment = null;
      target.dispose();
      generator.dispose();
      environment.dispose();
    };
  }, [gl,world,scene,reduced,invalidate,onReady]);

  useFrame((_,delta) => {
    if (!visible.current || document.hidden) return;
    angle.current = THREE.MathUtils.damp(angle.current,progress.current.value*Math.PI,5,Math.min(delta,.05));
    const a = -.55+angle.current;
    controls.current?.setLookAt(Math.cos(a)*5.7,3.05,Math.sin(a)*5.7,0,1.95,0,false);
    if (!reduced || Math.abs(angle.current-progress.current.value*Math.PI)>.0001) invalidate();
  });
  return <CameraControls ref={controls} enabled={false} makeDefault/>;
}

function StaticFallback({onFailure}) {
  useEffect(onFailure, [onFailure]);
  return null;
}

class SceneBoundary extends Component {
  state = {failed:false};
  static getDerivedStateFromError() { return {failed:true}; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function mountHeroRoom() {
  const scene = document.querySelector('.hero-scroll-scene');
  const art = scene?.querySelector('.banner-art');
  if (!art || art.querySelector('.banquet-webgl')) return;
  const mount = document.createElement('div');
  mount.className = 'banquet-webgl';
  mount.setAttribute('aria-hidden','true');
  art.appendChild(mount);
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const ready = () => {
    art.classList.add('banquet-webgl-ready');
    scene.classList.toggle('hero-orbit-enabled',!preference.matches);
    ScrollTrigger.refresh();
  };
  const failed = () => {
    art.classList.remove('banquet-webgl-ready');
    scene.classList.remove('hero-orbit-enabled');
  };
  const root = createRoot(mount);
  gsap.registerPlugin(ScrollTrigger);
  function render() {
    root.render(<SceneBoundary onFailure={failed}><Canvas dpr={[1,1.5]} frameloop="demand"
      fallback={<StaticFallback onFailure={failed}/>} camera={{position:[4.85,3.05,-2.98], fov:48, near:.1, far:55}}
      gl={{antialias:true, alpha:false, powerPreference:'high-performance'}}
      onCreated={({gl})=>{gl.toneMapping=THREE.ACESFilmicToneMapping; gl.toneMappingExposure=1.15;}}>
      <color attach="background" args={['#e7dbc8']}/>
      <ambientLight intensity={.7}/>
      <hemisphereLight args={['#f3eddf','#887151',1.1]}/>
      <directionalLight position={[-4,5,-5]} intensity={2.4} color="#fff0d9"/>
      <BanquetRoom/>
      <CameraOrbit scene={scene} reduced={preference.matches} onReady={ready}/>
    </Canvas></SceneBoundary>);
  }
  preference.addEventListener('change',render);
  mount.addEventListener('webglcontextlost',failed,true);
  render();
  return () => {
    preference.removeEventListener('change',render);
    root.unmount();
    mount.remove();
    failed();
  };
}
