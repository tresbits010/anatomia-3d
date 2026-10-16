import * as THREE from 'three'

// Calcula dónde va una pieza que se estira entre dos puntos (inicio y fin):
// su centro, su largo y su rotación. "normal" indica hacia dónde mira la cara plana.
export function transformacion(inicio, fin, normal = [0, 0, 1]) {
  const a = new THREE.Vector3(...inicio)
  const b = new THREE.Vector3(...fin)
  const centro = a.clone().add(b).multiplyScalar(0.5)
  const largo = a.distanceTo(b)
  const ejeY = b.clone().sub(a).normalize()

  let ref = new THREE.Vector3(...normal).normalize()
  if (Math.abs(ref.dot(ejeY)) > 0.95) ref = new THREE.Vector3(1, 0, 0)

  const ejeX = new THREE.Vector3().crossVectors(ejeY, ref).normalize()
  const ejeZ = new THREE.Vector3().crossVectors(ejeX, ejeY).normalize()
  const matriz = new THREE.Matrix4().makeBasis(ejeX, ejeY, ejeZ)
  const rotacion = new THREE.Quaternion().setFromRotationMatrix(matriz)

  return { centro, largo, rotacion }
}

// Forma de músculo: vientre grueso en el medio y tendones finos en las puntas.
export function geometriaMusculo(largo, grosor, aplanado = 1) {
  const puntos = [new THREE.Vector2(0, -largo / 2)]
  const N = 28
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const r = grosor * (0.16 + 0.84 * Math.pow(Math.sin(Math.PI * t), 0.8))
    puntos.push(new THREE.Vector2(r, -largo / 2 + t * largo))
  }
  puntos.push(new THREE.Vector2(0, largo / 2))
  const geo = new THREE.LatheGeometry(puntos, 36)
  geo.scale(1, 1, aplanado)
  geo.computeVertexNormals()
  return geo
}

// Forma de hueso largo: diáfisis fina y extremos más anchos.
export function geometriaHueso(largo, radio) {
  const puntos = [new THREE.Vector2(0, -largo / 2 - radio * 0.5)]
  const N = 24
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const r = radio * (1 + 0.7 * Math.pow(Math.abs(2 * t - 1), 6))
    puntos.push(new THREE.Vector2(r, -largo / 2 + t * largo))
  }
  puntos.push(new THREE.Vector2(0, largo / 2 + radio * 0.5))
  const geo = new THREE.LatheGeometry(puntos, 20)
  geo.computeVertexNormals()
  return geo
}

// Tubo que sigue una curva (nervios y arterias).
export function geometriaTubo(puntos, radio) {
  const curva = new THREE.CatmullRomCurve3(puntos.map((p) => new THREE.Vector3(...p)))
  return new THREE.TubeGeometry(curva, 64, radio, 10, false)
}
