import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import FechaFormateada from './FechaFormateada'

const Farmacias = () => {
  const [ listaFarmacias, setListaFarmacias ] = useState([])
  const [ ocultarDias, setOcultarDias ] = useState(true) 
  useEffect(() => {
    // axios.get('http://194.164.162.139:3004/api/farmacias')
    // axios.get('http://18.197.118.217:3004/api/farmacias')
    // axios.get('https://back2.dev.elitedanza.com:3004/api/farmacias')
    axios.get('https://back2.dev.elitedanza.com:3004/api/farmacias/Lucena-14900/4')
    // axios.get('http://localhost:3004/api/farmacias/Lucena-14900/7')
      .then(result => {
        setListaFarmacias(result.data)
      })
  }, [])

  ////////////////////////////////////// ENVIAR TAMAÑO /////////////////////// 
  // con useRef, añadimos refContainerRef al div general y aqui enlazamos con containerRef 
  const containerRef = useRef(null);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // console.log(`El contenedor ha cambiado de tamaño a ${width}px de ancho y ${height}px de alto`);
        // Aquí puedes enviar los datos de tamaño al padre utilizando postMessage
        window.parent.postMessage(
          {
            type: 'tamañoIframe',
            height: height + 100,
            width: width
          },
          '*'
        );
      }
    });
    resizeObserver.observe(containerRef.current);
    // Devuelve una función de limpieza para desconectar el observador cuando el componente se desmonta
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  ////////////////////////////////////// ENVIAR TAMAÑO ///////////////////////


  const NIGHT_HOUR = 22
  const MORNING_HOUR = 8
  let nocturnidad = (new Date().getHours() >= NIGHT_HOUR) || (new Date().getHours() <= MORNING_HOUR)
    ? true
    : false
  const diaActual = new Date().getDate()
  // console.log('Fecha atcual: ', diaActual)
  // console.log('Hora actual: ', new Date().getHours())

  const comprobarAbierto = (guardia, dia) => {
    const ahora = new Date()
    const fechaApertura = guardia.fechaFormateada.split('T')[0]
    const horaApertura = dia
    ? guardia.horaAperturaDia.padStart(5, '0') + ':00'
    : guardia.horaAperturaNoche.padStart(5, '0') + ':00'
    const apertura = new Date(fechaApertura + 'T' + horaApertura)

    const horaCierre = dia
      ? guardia.horaCierreDia.padStart(5, '0')
      : guardia.horaCierreNoche.padStart(5, '0')
    let cierre = new Date(fechaApertura + 'T' + horaCierre)
    if(!dia)
      cierre.setDate(cierre.getDate() +1)
   
    return (
      ahora >= apertura && ahora <= cierre
        ? <p className='farm-status'>abierto</p>
        : ''
    )
  }

  const handleShowMore = () => {
    setOcultarDias(false)
  }
  
  // Para ajustar el array resultado, filtrar, etc...
  // const listaFarmaciasPintar = [listaFarmacias[diaActual-1], listaFarmacias[diaActual]]

  return (
    <div ref={containerRef} className='farm-contenedor'>
      {
        listaFarmacias.length == 0
          ? (<div className='farm-dia'><p className='farm-cargando'>Buscando farmacias ...</p></div>)
          : listaFarmacias
            .map( (farmacia, index) => {
              return (
                <div 
                  className={`farm-dia ${index > 0 && ocultarDias ? 'farm-dia-ocultar' : ''}`}
                  key={farmacia.id}
                >
                  <FechaFormateada fecha={farmacia.fecha.split(' ')[1]}/>
                  
                  {
                    nocturnidad
                      ? nocturnidad = false
                      : (
                        <div className='farm-diurno'>
                          <p className='farm-tipo'>Farmacias de Guardia Diurnas</p>
                          <p className='farm-horario'>({farmacia.horarioDia.toLowerCase()})</p>
                          <div className='farm-listado'>
                            {
                              farmacia.fondoDia
                                .map(elem => {
                                  return (
                                    <div key={Math.random()} className='farm'>
                                      {
                                        comprobarAbierto(farmacia, true)
                                      }
                                      <p className='farm-name'>{elem.name}</p>
                                      <p className='farm-address'>
                                        <span className="material-symbols-outlined">location_on</span>
                                        {elem.direction}, {elem.number}
                                      </p>
                                      <div className='farm-links'>
                                        <a className='farm-phone' href={'tel:+34'+elem.phone}>
                                          <span className="material-symbols-outlined">call</span>
                                          {elem.phone}
                                        </a>
                                        <a href={elem.location} className='farm-buttom' target="_blank">
                                          <span className="material-symbols-outlined">my_location</span>
                                          Cómo llegar
                                        </a>
                                      </div>
                                    </div>
                                  )
                                })
                            }
                          </div>
                        </div>
                      )
                  }


                  <div className='farm-nocturno'>
                    <p className='farm-tipo'>Farmacias de Guardia Nocturnas</p>
                    <p className='farm-horario'>({farmacia.horarioNoche.toLowerCase()})</p>
                    <div className='farm-listado'>
                      {
                        farmacia.fondoNoche
                          .map(elem => {
                            return (
                              <div key={Math.random()} className='farm'>
                                {
                                  comprobarAbierto(farmacia, false)
                                }
                                <p className='farm-name'>{elem.name}</p>
                                <p className='farm-address'>
                                  <span className="material-symbols-outlined">location_on</span>
                                  {elem.direction}, {elem.number}</p>
                                <div className='farm-links'>
                                  <a className='farm-phone' href={elem.phone}>
                                    <span className="material-symbols-outlined">call</span>
                                    {elem.phone}
                                  </a>
                                  <a href={elem.location} className='farm-buttom' target="_blank">
                                    <span className="material-symbols-outlined">my_location</span>
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
      {
        ocultarDias && (
          <div className='div-button-showmore'>
            <button
            className='farm-button-showmore'
            onClick={handleShowMore}
            >
              Mostrar más días
            </button>
          </div>
        )
      }
    </div>
  )
}

export default Farmacias