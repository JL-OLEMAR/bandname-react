import { useContext, useEffect, useState } from 'react'

import { SocketContext } from '../context/SocketContext.js'

export const BandList = () => {
  const [bands, setBands] = useState([])
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands)
    })

    return () => socket.off('current-bands')
  }, [socket])

  const cambioNombre = (e, id) => {
    const nuevoNombre = e.target.value

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre
        }

        return band
      })
    )
  }

  const onPerdioFoco = (id, nombre) => {
    socket.emit('cambiar-nombre-banda', { id, nombre })
  }

  const votar = (id) => {
    socket.emit('votar-banda', id)
  }

  const borrar = (id) => {
    socket.emit('borrar-banda', id)
  }

  const crearRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className='btn btn-primary' onClick={() => votar(band.id)}>
            {' '}
            +1{' '}
          </button>
        </td>
        <td>
          <input
            className='form-control'
            value={band.name}
            onBlur={() => onPerdioFoco(band.id, band.name)}
            onChange={(e) => cambioNombre(e, band.id)} // onBlur es cuando perdie el foco
          />
        </td>
        <td>
          <h3> {band.votes} </h3>
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => borrar(band.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th />
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  )
}
