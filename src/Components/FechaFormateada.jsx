import React from 'react';

const FechaFormateada = (props) => {
  // const fechaString = "14-02-2024"; 
  const fechaString = props.fecha; 
  const partesFecha = fechaString.split('-');
  const fecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]); // Ajusta los índices para el mes

  const opcionesFecha = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const nombreDia = fecha.toLocaleDateString(undefined, { weekday: 'long' });
  // const fechaFormateada = `${nombreDia}, ${fecha.toLocaleDateString(undefined, opcionesFecha)}`;
  const fechaFormateada = `${fecha.toLocaleDateString(undefined, opcionesFecha)}`;

  return (
    // <div>
    //   <p>{fechaFormateada}</p>
    // </div>
    <p className='farm-fecha'>{fechaFormateada}</p>
  );
};

export default FechaFormateada;