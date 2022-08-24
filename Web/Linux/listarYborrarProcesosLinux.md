# Como listar y borrar procesos en Linux.

El comando `ps` puede listar todos los procesos que se están ejecutando en un sistema Linux con la opción `-e`:

    ps -e
       
## Mostrar el uso actual de la CPU y la RAM de cada proceso:

Al igual que la opción anterior, esta opción listará todos los procesos que se estén ejecutando en tu sistema. Pero también 
muestra el uso actual de la CPU y la RAM de cada proceso, así como el comando que lo ha generado.

    ps -aux
    
## Encontrar un proceso con pgrep:

El comando `pgrep` es una especie de combinación de `ps` y `grep`. Podemos especificar el nombre (o parte del nombre) de un proceso que estemos 
buscando, y pgrep nos devolverá los respectivos ID de los procesos.

Por ejemplo, para buscar cualquier proceso relacionado con `SSH` en tu sistema, escribirías:

    pgrep ssh
    

---
---
  
    
<html lang="en">
<head>
  
</head>
<body>

<script src="https://utteranc.es/client.js"
    repo="F1r0x/gestion-comentarios"
    issue-term="pathname"
    theme="github-light"
    crossorigin="anonymous"
    async>
</script>
          
    
  </body>
</html>
  
  
---
---

  
