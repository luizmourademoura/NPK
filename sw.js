<link rel="manifest" href="manifest.json">
<link rel="icon" href="icons/icon-192.png" type="image/png">
<meta name="theme-color" content="#2e7d32">

<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker registrado com sucesso'))
      .catch(error => console.error('Erro ao registrar o Service Worker:', error));
  }
</script>
