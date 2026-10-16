import { NERVIOS, ARTERIAS, NOMBRES_HUESOS } from '../data/estructuras'

export const PESTANAS = [
  { id: 'musculo', titulo: 'Músculo', icono: '💪' },
  { id: 'oseo', titulo: 'Óseo', icono: '🦴' },
  { id: 'nervioso', titulo: 'Nervioso', icono: '⚡' },
  { id: 'circulatorio', titulo: 'Circulatorio', icono: '🩸' },
  { id: 'kine', titulo: 'Kine', icono: '🩺' },
]

function Bloque({ titulo, children, color }) {
  return (
    <section className="bloque">
      <h4 style={color ? { color } : undefined}>{titulo}</h4>
      {children}
    </section>
  )
}

function Contenido({ musculo, pestana }) {
  if (pestana === 'musculo') {
    return (
      <>
        <Bloque titulo="Origen" color="#3fd28b"><p>{musculo.origen}</p></Bloque>
        <Bloque titulo="Inserción" color="#4ba3ff"><p>{musculo.insercion}</p></Bloque>
        <Bloque titulo="Acción">
          <ul>{musculo.accion.map((a) => <li key={a}>{a}</li>)}</ul>
        </Bloque>
      </>
    )
  }
  if (pestana === 'oseo') {
    return (
      <>
        <Bloque titulo="Huesos donde se fija">
          <div className="chips">
            {musculo.huesos.map((h) => <span key={h} className="chip chip-hueso">{NOMBRES_HUESOS[h]}</span>)}
          </div>
        </Bloque>
        <Bloque titulo="Origen" color="#3fd28b"><p>{musculo.origen}</p></Bloque>
        <Bloque titulo="Inserción" color="#4ba3ff"><p>{musculo.insercion}</p></Bloque>
      </>
    )
  }
  if (pestana === 'nervioso') {
    const n = NERVIOS[musculo.nervio]
    return (
      <>
        <Bloque titulo="Inervación" color="#f2d24b">
          <p className="destacado">{n.nombre}</p>
          <p>Raíces: <strong>{n.raiz}</strong></p>
        </Bloque>
        <Bloque titulo="Recorrido"><p>{n.recorrido}</p></Bloque>
      </>
    )
  }
  if (pestana === 'circulatorio') {
    const a = ARTERIAS[musculo.arteria]
    return (
      <>
        <Bloque titulo="Irrigación" color="#ff6b5e"><p>{musculo.irrigacion}</p></Bloque>
        <Bloque titulo={a.nombre}><p>{a.recorrido}</p></Bloque>
      </>
    )
  }
  return (
    <>
      <Bloque titulo="Cómo se evalúa"><p>{musculo.kine.evaluacion}</p></Bloque>
      <Bloque titulo="Estiramiento"><p>{musculo.kine.estiramiento}</p></Bloque>
      <Bloque titulo="Fortalecimiento"><p>{musculo.kine.fortalecimiento}</p></Bloque>
      <Bloque titulo="Lesiones frecuentes"><p>{musculo.kine.lesiones}</p></Bloque>
    </>
  )
}

export default function Panel({ musculo, pestana, onPestana, onVolver }) {
  return (
    <aside className="panel">
      <header className="panel-cabecera">
        <div>
          <span className="panel-region">{musculo.region}</span>
          <h2>{musculo.nombre}</h2>
        </div>
        <button className="boton-volver" onClick={onVolver}>← Volver</button>
      </header>

      <nav className="tarjetas">
        {PESTANAS.map((p) => (
          <button
            key={p.id}
            className={'tarjeta' + (p.id === pestana ? ' activa' : '')}
            onClick={() => onPestana(p.id)}
          >
            <span className="tarjeta-icono">{p.icono}</span>
            {p.titulo}
          </button>
        ))}
      </nav>

      <div className="panel-contenido">
        <Contenido musculo={musculo} pestana={pestana} />
      </div>
    </aside>
  )
}
