<script>
  window.addEventListener('message', (event) => { 
    // Verificar que el mensaje proviene del dominio correcto
    // console.log('paso 1: detectado')
    if (event.origin !== 'https://farmacias.cubiseo.es') {
      // console.log('paso 2: rechazado')
      return '' // Reemplaza con el dominio correcto de tu página React
    }
    // console.log('paso 3: aceptado', event.data.type)
    if (event.data.type === 'tamañoIframe') {
      // console.log('paso 4: procesando')
      const iframe = document.getElementById('miIframe')
      iframe.style.height = event.data.height + 'px'
      // iframe.style.width = event.data.width + 'px'
    }
  });
</script>
