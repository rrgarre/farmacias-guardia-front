import axios from 'axios'
import { useEffect, useState } from 'react'
import FechaFormateada from './FechaFormateada'

const Farmacias = () => {
  const [listaFarmacias, setListaFarmacias] = useState([])
  useEffect(() => {
    // axios.get('http://194.164.162.139:3004/api/farmacias')
    // axios.get('http://18.197.118.217:3004/api/farmacias')
    axios.get('https://back2.dev.elitedanza.com:3004/api/farmacias')
      .then(result => {
        setListaFarmacias(result.data)
      })
  }, [])

  const diaActual = new Date().getDate()
  console.log('Fecha atcual: ', diaActual)
  
  // Para ajustar el array resultado, filtrar, etc...
  // const listaFarmaciasPintar = [listaFarmacias[diaActual-1], listaFarmacias[diaActual]]

  return (
    <div className='farm-contenedor'>
      {
        listaFarmacias.length == 0
          ? 'No hay resultados para mostrar.'
          : listaFarmacias
            .map( farmacia => {
              return (
                <div className='farm-dia' key={farmacia.phone}>
                  <FechaFormateada fecha={farmacia.fecha.split(' ')[1]}/>
                  <div className='farm-diurno'>
                    <p className='farm-tipo'>Farmacias de Guardia Diurnas</p>
                    <p className='farm-horario'>({farmacia.horarioDia.toLowerCase()})</p>
                    <div className='farm-listado'>
                      {
                        farmacia.fondoDia
                          .map(elem => {
                            return (
                              <div className='farm'>
                                <p className='farm-name'>{elem.name}</p>
                                <p className='farm-address'>
                                  <span class="material-symbols-outlined">location_on</span>
                                  {elem.direction}, {elem.number}
                                </p>
                                <div className='farm-links'>
                                  <a className='farm-phone' href={'tel:+34'+elem.phone}>
                                    <span class="material-symbols-outlined">call</span>
                                    {elem.phone}
                                  </a>
                                  <a href={elem.location} className='farm-buttom'>
                                    <span class="material-symbols-outlined">my_location</span>
                                    Cómo llegar
                                  </a>
                                </div>
                              </div>
                            )
                          })
                      }
                    </div>
                  </div>
                  <div className='farm-nocturno'>
                    <p className='farm-tipo'>Farmacias de Guardia Nocturnas</p>
                    <p className='farm-horario'>({farmacia.horarioNoche.toLowerCase()})</p>
                    <div className='farm-listado'>
                      {
                        farmacia.fondoNoche
                          .map(elem => {
                            return (
                              <div className='farm'>
                                <p className='farm-name'>{elem.name}</p>
                                <p className='farm-address'>
                                  <span class="material-symbols-outlined">location_on</span>
                                  {elem.direction}, {elem.number}</p>
                                <div className='farm-links'>
                                  <a className='farm-phone' href={elem.phone}>
                                    <span class="material-symbols-outlined">call</span>
                                    {elem.phone}
                                  </a>
                                  <a href={elem.location} className='farm-buttom'>
                                    <span class="material-symbols-outlined">my_location</span>
                                    Cómo llegar
                                  </a>
                                </div>
                              </div>
                            )
                          })
                      }
                    </div>
                  </div>
                </div>
              )
            })
      }
    </div>
  )
}

export default Farmacias