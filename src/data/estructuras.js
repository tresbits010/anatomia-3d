// Huesos, nervios y arterias del prototipo (miembro superior derecho).
// Coordenadas en metros aproximados: y = arriba, z = hacia adelante.
// Son formas esquemáticas: más adelante se reemplazan por modelos anatómicos reales.

export const HUESOS = [
  { id: 'clavicula', nombre: 'Clavícula', tipo: 'largo', inicio: [-0.025, 1.435, 0.075], fin: [-0.19, 1.465, 0.012], radio: 0.007 },
  { id: 'escapula', nombre: 'Escápula', tipo: 'escapula' },
  { id: 'escapula', nombre: 'Escápula', tipo: 'largo', inicio: [-0.08, 1.385, -0.1], fin: [-0.19, 1.46, -0.025], radio: 0.006, parte: 'espina' },
  { id: 'escapula', nombre: 'Escápula', tipo: 'largo', inicio: [-0.19, 1.46, -0.025], fin: [-0.197, 1.466, 0.014], radio: 0.009, parte: 'acromion' },
  { id: 'escapula', nombre: 'Escápula', tipo: 'largo', inicio: [-0.158, 1.418, -0.01], fin: [-0.163, 1.412, 0.03], radio: 0.006, parte: 'coracoides' },
  { id: 'esternon', nombre: 'Esternón', tipo: 'caja', posicion: [0, 1.32, 0.095], tamano: [0.04, 0.18, 0.015] },
  { id: 'humero', nombre: 'Húmero', tipo: 'esfera', posicion: [-0.19, 1.4, 0], radio: 0.033, parte: 'cabeza' },
  { id: 'humero', nombre: 'Húmero', tipo: 'largo', inicio: [-0.19, 1.4, 0], fin: [-0.212, 1.105, -0.002], radio: 0.012 },
  { id: 'humero', nombre: 'Húmero', tipo: 'largo', inicio: [-0.19, 1.095, 0], fin: [-0.238, 1.095, 0], radio: 0.011, parte: 'cóndilos' },
  { id: 'cubito', nombre: 'Cúbito', tipo: 'largo', inicio: [-0.205, 1.11, -0.02], fin: [-0.212, 0.85, 0], radio: 0.008 },
  { id: 'radio', nombre: 'Radio', tipo: 'largo', inicio: [-0.228, 1.085, 0.008], fin: [-0.248, 0.85, 0.012], radio: 0.008 },
]

// Puntos de la escápula (lámina triangular con algo de espesor)
export const PUNTOS_ESCAPULA = [
  [-0.075, 1.445, -0.095],
  [-0.1, 1.23, -0.09],
  [-0.158, 1.4, -0.015],
  [-0.15, 1.36, -0.04],
  [-0.075, 1.445, -0.087],
  [-0.1, 1.23, -0.082],
  [-0.162, 1.4, -0.005],
  [-0.146, 1.36, -0.032],
]

export const NOMBRES_HUESOS = {
  clavicula: 'Clavícula',
  escapula: 'Escápula',
  esternon: 'Esternón',
  humero: 'Húmero',
  cubito: 'Cúbito',
  radio: 'Radio',
}

export const NERVIOS = {
  axilar: {
    nombre: 'Nervio axilar',
    raiz: 'C5–C6',
    recorrido:
      'Rama del fascículo posterior del plexo braquial. Pasa por el espacio cuadrangular junto a la arteria circunfleja humeral posterior y rodea por detrás el cuello quirúrgico del húmero.',
    puntos: [[-0.15, 1.36, 0], [-0.17, 1.345, -0.03], [-0.205, 1.35, -0.03], [-0.228, 1.36, -0.01]],
  },
  musculocutaneo: {
    nombre: 'Nervio musculocutáneo',
    raiz: 'C5–C7',
    recorrido:
      'Rama del fascículo lateral. Perfora el coracobraquial y baja entre el bíceps y el braquial, a los que inerva. Termina como nervio cutáneo lateral del antebrazo.',
    puntos: [[-0.13, 1.39, 0.035], [-0.17, 1.33, 0.03], [-0.2, 1.24, 0.025], [-0.215, 1.12, 0.02]],
  },
  radial: {
    nombre: 'Nervio radial',
    raiz: 'C5–T1',
    recorrido:
      'Rama terminal del fascículo posterior. Rodea el húmero por el surco del nervio radial (por eso se lesiona en fracturas de la diáfisis humeral) y llega a la cara lateral del codo.',
    puntos: [[-0.13, 1.38, 0], [-0.17, 1.32, -0.03], [-0.21, 1.22, -0.025], [-0.232, 1.14, 0], [-0.235, 1.05, 0.012]],
  },
  supraescapular: {
    nombre: 'Nervio supraescapular',
    raiz: 'C5–C6',
    recorrido:
      'Nace del tronco superior del plexo braquial. Pasa por la escotadura escapular hacia la fosa supraespinosa y luego rodea la espina por la escotadura espinoglenoidea hasta la fosa infraespinosa.',
    puntos: [[-0.09, 1.47, -0.04], [-0.13, 1.43, -0.085], [-0.165, 1.4, -0.07], [-0.18, 1.34, -0.065]],
  },
  pectorales: {
    nombre: 'Nervios pectorales lateral y medial',
    raiz: 'C5–T1',
    recorrido:
      'Ramas de los fascículos lateral (C5–C7) y medial (C8–T1) del plexo braquial. Llegan a la cara profunda del pectoral mayor; el medial también inerva el pectoral menor.',
    puntos: [[-0.1, 1.42, 0.04], [-0.09, 1.39, 0.08], [-0.07, 1.36, 0.092]],
  },
}

export const ARTERIAS = {
  circunflejaPost: {
    nombre: 'Arteria circunfleja humeral posterior',
    recorrido:
      'Rama de la arteria axilar. Acompaña al nervio axilar por el espacio cuadrangular y rodea el cuello quirúrgico del húmero.',
    puntos: [[-0.15, 1.37, 0.01], [-0.17, 1.35, -0.025], [-0.21, 1.357, -0.026], [-0.226, 1.37, -0.008]],
  },
  braquial: {
    nombre: 'Arteria braquial',
    recorrido:
      'Continuación de la arteria axilar desde el borde inferior del redondo mayor. Baja por la cara medial del brazo y en la fosa del codo se divide en radial y cubital. Es donde se toma la presión arterial.',
    puntos: [[-0.12, 1.4, 0.03], [-0.17, 1.32, 0.036], [-0.2, 1.2, 0.036], [-0.215, 1.09, 0.036]],
  },
  braquialProfunda: {
    nombre: 'Arteria braquial profunda',
    recorrido:
      'Primera rama importante de la braquial. Acompaña al nervio radial por el surco del nervio radial, en la cara posterior del húmero.',
    puntos: [[-0.17, 1.32, 0.02], [-0.19, 1.26, -0.027], [-0.226, 1.17, -0.01]],
  },
  supraescapular: {
    nombre: 'Arteria supraescapular',
    recorrido:
      'Rama del tronco tirocervical (de la arteria subclavia). Pasa por encima del ligamento transverso superior de la escápula e irriga las fosas supraespinosa e infraespinosa.',
    puntos: [[-0.09, 1.48, -0.035], [-0.13, 1.44, -0.08], [-0.165, 1.41, -0.065], [-0.18, 1.35, -0.06]],
  },
  toracoacromial: {
    nombre: 'Arteria toracoacromial',
    recorrido:
      'Tronco corto de la arteria axilar. Da ramas pectorales, deltoidea, acromial y clavicular.',
    puntos: [[-0.11, 1.44, 0.05], [-0.1, 1.41, 0.08], [-0.08, 1.38, 0.096]],
  },
  recurrenteRadial: {
    nombre: 'Arteria recurrente radial',
    recorrido:
      'Rama de la arteria radial que sube por delante del epicóndilo lateral y se une con ramas de la braquial profunda.',
    puntos: [[-0.22, 1.06, 0.03], [-0.236, 1.11, 0.02], [-0.24, 1.16, 0.008]],
  },
}
