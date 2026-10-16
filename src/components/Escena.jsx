import { useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js'
import { MUSCULOS } from '../data/musculos'
import { HUESOS, PUNTOS_ESCAPULA, NERVIOS, ARTERIAS } from '../data/estructuras'
import { transformacion, geometriaMusculo, geometriaHueso, geometriaTubo } from '../lib/geometria'

const COLORES = {
  musculo: '#b4473d',
  musculoActivo: '#e5654f',
  hueso: '#e9e1cf',
  huesoActivo: '#f3c969',
  nervio: '#f2d24b',
  arteria: '#d9302b',
  silueta: '#9fb4c7',
}

// Vista general del hombro y brazo
export const VISTA_GENERAL = {
  posicion: new THREE.Vector3(0.1, 1.28, 1.05),
  objetivo: new THREE.Vector3(-0.13, 1.18, 0),
}

const OBJETIVO_INICIAL = VISTA_GENERAL.objetivo.toArray()

// Calcula a dónde viaja la cámara para "entrar" al músculo
export function destinoMusculo(musculo) {
  const { centro, largo } = transformacion(musculo.forma.inicio, musculo.forma.fin)
  const dir = new THREE.Vector3(...musculo.vista).normalize()
  const distancia = Math.max(0.22, largo * 1.25)
  return { posicion: centro.clone().add(dir.multiplyScalar(distancia)), objetivo: centro }
}

// Mueve la cámara suavemente hasta el destino
function Camara({ destino, animando, controles }) {
  const { camera } = useThree()
  useEffect(() => {
    animando.current = true
  }, [destino, animando])

  useFrame((_, dt) => {
    const c = controles.current
    if (!animando.current || !c) return
    const k = 1 - Math.exp(-dt * 3.2)
    camera.position.lerp(destino.posicion, k)
    c.target.lerp(destino.objetivo, k)
    c.update()
    if (
      camera.position.distanceTo(destino.posicion) < 0.001 &&
      c.target.distanceTo(destino.objetivo) < 0.001
    ) {
      animando.current = false
    }
  })
  return null
}

const sinClick = () => null

function Musculo({ musculo, estado, onSeleccionar }) {
  const ref = useRef()
  const [hover, setHover] = useState(false)
  const { forma } = musculo
  const { centro, largo, rotacion } = useMemo(
    () => transformacion(forma.inicio, forma.fin, forma.normal),
    [forma]
  )
  const geo = useMemo(
    () => geometriaMusculo(largo, forma.grosor, forma.aplanado),
    [largo, forma.grosor, forma.aplanado]
  )

  // Brillo que "late" en el músculo seleccionado
  useFrame(({ clock }) => {
    if (!ref.current) return
    const m = ref.current.material
    if (estado.activo) {
      m.emissiveIntensity = 0.35 + 0.2 * Math.sin(clock.elapsedTime * 3)
    } else {
      m.emissiveIntensity = hover ? 0.3 : 0
    }
  })

  return (
    <mesh
      ref={ref}
      geometry={geo}
      position={centro}
      quaternion={rotacion}
      visible={estado.visible}
      raycast={estado.clickeable ? THREE.Mesh.prototype.raycast : sinClick}
      onClick={(e) => {
        if (e.delta > 6) return // fue un arrastre para girar, no un toque
        e.stopPropagation()
        onSeleccionar(musculo.id)
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHover(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <meshStandardMaterial
        color={estado.activo ? COLORES.musculoActivo : COLORES.musculo}
        emissive={estado.activo ? '#7a1d10' : '#4a1410'}
        roughness={0.55}
        transparent
        opacity={estado.opacidad}
        depthWrite={estado.opacidad > 0.9}
      />
    </mesh>
  )
}

function Hueso({ hueso, resaltado, opacidad }) {
  const datos = useMemo(() => {
    if (hueso.tipo === 'largo') {
      const t = transformacion(hueso.inicio, hueso.fin)
      return { geo: geometriaHueso(t.largo, hueso.radio), posicion: t.centro, rotacion: t.rotacion }
    }
    if (hueso.tipo === 'esfera') {
      return { geo: new THREE.SphereGeometry(hueso.radio, 32, 24), posicion: new THREE.Vector3(...hueso.posicion) }
    }
    if (hueso.tipo === 'caja') {
      return { geo: new THREE.BoxGeometry(...hueso.tamano), posicion: new THREE.Vector3(...hueso.posicion) }
    }
    const geo = new ConvexGeometry(PUNTOS_ESCAPULA.map((p) => new THREE.Vector3(...p)))
    geo.computeVertexNormals()
    return { geo, posicion: new THREE.Vector3(0, 0, 0) }
  }, [hueso])

  return (
    <mesh
      geometry={datos.geo}
      position={datos.posicion}
      {...(datos.rotacion ? { quaternion: datos.rotacion } : {})}
      raycast={sinClick}
    >
      <meshStandardMaterial
        color={resaltado ? COLORES.huesoActivo : COLORES.hueso}
        emissive={resaltado ? '#5c4310' : '#000000'}
        emissiveIntensity={resaltado ? 0.5 : 0}
        roughness={0.8}
        transparent
        opacity={opacidad}
        depthWrite={opacidad > 0.9}
      />
    </mesh>
  )
}

function Tubo({ puntos, radio, color, brillo }) {
  const geo = useMemo(() => geometriaTubo(puntos, radio), [puntos, radio])
  return (
    <mesh geometry={geo} raycast={sinClick}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={brillo ? 0.6 : 0.15} roughness={0.4} />
    </mesh>
  )
}

function Etiqueta({ posicion, texto, color }) {
  return (
    <group position={posicion}>
      <mesh raycast={sinClick}>
        <sphereGeometry args={[0.0065, 20, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
      <Html center distanceFactor={0.35} style={{ pointerEvents: 'none' }}>
        <div className="etiqueta3d" style={{ borderColor: color }}>{texto}</div>
      </Html>
    </group>
  )
}

function Silueta() {
  const material = (
    <meshStandardMaterial color={COLORES.silueta} transparent opacity={0.08} depthWrite={false} roughness={1} />
  )
  return (
    <group>
      <mesh position={[0, 1.25, 0]} scale={[0.17, 0.27, 0.11]} raycast={sinClick}>
        <sphereGeometry args={[1, 40, 30]} />
        {material}
      </mesh>
      <mesh position={[0, 1.66, 0]} raycast={sinClick}>
        <sphereGeometry args={[0.095, 32, 24]} />
        {material}
      </mesh>
      <mesh position={[-0.215, 1.15, 0]} rotation={[0, 0, -0.06]} raycast={sinClick}>
        <capsuleGeometry args={[0.052, 0.55, 8, 24]} />
        {material}
      </mesh>
    </group>
  )
}

function Contenido({ seleccion, pestana, capas, onSeleccionar, destino }) {
  const controles = useRef()
  const animando = useRef(false)
  const musculo = MUSCULOS.find((m) => m.id === seleccion)

  const verNervio = musculo && pestana === 'nervioso'
  const verArteria = musculo && pestana === 'circulatorio'
  const verEtiquetas = musculo && (pestana === 'musculo' || pestana === 'oseo')

  return (
    <>
      <color attach="background" args={['#0d1217']} />
      <hemisphereLight args={['#e8f1ff', '#2a1e1a', 0.9]} />
      <directionalLight position={[1, 2, 1.5]} intensity={1.6} />
      <directionalLight position={[-1.5, 1, -1]} intensity={0.6} />

      <Camara destino={destino} animando={animando} controles={controles} />
      <OrbitControls
        ref={controles}
        makeDefault
        enableDamping
        target={OBJETIVO_INICIAL}
        minDistance={0.1}
        maxDistance={2.5}
        onStart={() => {
          animando.current = false // si la persona gira la cámara, se corta la animación
        }}
      />

      {capas.silueta && !musculo && <Silueta />}

      {(capas.huesos || musculo) &&
        HUESOS.map((h, i) => {
          const resaltado = musculo && pestana === 'oseo' && musculo.huesos.includes(h.id)
          const opacidad = !musculo ? 1 : resaltado ? 1 : 0.25
          return <Hueso key={i} hueso={h} resaltado={resaltado} opacidad={opacidad} />
        })}

      {MUSCULOS.map((m) => {
        const activo = m.id === seleccion
        let opacidad = 1
        if (musculo && !activo) opacidad = 0.07
        if (activo && (verNervio || verArteria)) opacidad = 0.4
        if (activo && pestana === 'oseo') opacidad = 0.55
        return (
          <Musculo
            key={m.id}
            musculo={m}
            onSeleccionar={onSeleccionar}
            estado={{
              activo,
              opacidad,
              visible: capas.musculos || activo,
              clickeable: !musculo && capas.musculos,
            }}
          />
        )
      })}

      {!musculo && capas.nervios &&
        Object.entries(NERVIOS).map(([k, n]) => (
          <Tubo key={k} puntos={n.puntos} radio={0.0032} color={COLORES.nervio} />
        ))}
      {!musculo && capas.vasos &&
        Object.entries(ARTERIAS).map(([k, a]) => (
          <Tubo key={k} puntos={a.puntos} radio={0.004} color={COLORES.arteria} />
        ))}

      {verNervio && <Tubo puntos={NERVIOS[musculo.nervio].puntos} radio={0.004} color={COLORES.nervio} brillo />}
      {verArteria && <Tubo puntos={ARTERIAS[musculo.arteria].puntos} radio={0.005} color={COLORES.arteria} brillo />}

      {verEtiquetas && (
        <>
          <Etiqueta posicion={musculo.forma.inicio} texto="Origen" color="#3fd28b" />
          <Etiqueta posicion={musculo.forma.fin} texto="Inserción" color="#4ba3ff" />
        </>
      )}
    </>
  )
}

export default function Escena(props) {
  return (
    <Canvas
      className="lienzo"
      dpr={[1, 2]}
      camera={{ position: VISTA_GENERAL.posicion.toArray(), fov: 38, near: 0.01, far: 20 }}
    >
      <Contenido {...props} />
    </Canvas>
  )
}
