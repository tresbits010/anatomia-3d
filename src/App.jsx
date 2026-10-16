import { useMemo, useState } from 'react'
import Escena, { VISTA_GENERAL, destinoMusculo } from './components/Escena'
import Panel from './components/Panel'
import { MUSCULOS } from './data/musculos'
import './App.css'

const CAPAS = [
  { id: 'musculos', titulo: 'Músculos' },
  { id: 'huesos', titulo: 'Huesos' },
  { id: 'nervios', titulo: 'Nervios' },
  { id: 'vasos', titulo: 'Vasos' },
  { id: 'silueta', titulo: 'Silueta' },
]

export default function App() {
  const [seleccion, setSeleccion] = useState(null)
  const [pestana, setPestana] = useState('musculo')
  const [capas, setCapas] = useState({ musculos: true, huesos: true, nervios: false, vasos: false, silueta: true })

  const musculo = MUSCULOS.find((m) => m.id === seleccion)

  // A dónde va la cámara: al músculo elegido o a la vista general
  const destino = useMemo(() => (musculo ? destinoMusculo(musculo) : { ...VISTA_GENERAL }), [musculo])

  const seleccionar = (id) => {
    setSeleccion(id)
    setPestana('musculo')
  }

  return (
    <div className={'app' + (musculo ? ' con-panel' : '')}>
      <Escena
        seleccion={seleccion}
        pestana={pestana}
        capas={capas}
        destino={destino}
        onSeleccionar={seleccionar}
      />

      <header className="barra">
        <h1>
          Anatomía <span>3D</span>
        </h1>
        {!musculo && (
          <div className="capas">
            {CAPAS.map((c) => (
              <button
                key={c.id}
                className={'capa' + (capas[c.id] ? ' activa' : '')}
                onClick={() => setCapas({ ...capas, [c.id]: !capas[c.id] })}
              >
                {c.titulo}
              </button>
            ))}
          </div>
        )}
      </header>

      {musculo ? (
        <Panel
          musculo={musculo}
          pestana={pestana}
          onPestana={setPestana}
          onVolver={() => setSeleccion(null)}
        />
      ) : (
        <div className="ayuda">
          <p>Tocá un músculo para entrar · Arrastrá para girar · Pellizcá para hacer zoom</p>
          <div className="lista-musculos">
            {MUSCULOS.map((m) => (
              <button key={m.id} className="chip" onClick={() => seleccionar(m.id)}>
                {m.nombre}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
