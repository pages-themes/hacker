# Cómo Listar y Borrar procesos en Linux.

En Linux, una instancia en ejecución de un programa se llama proceso. Ocasionalmente, cuando trabaje en una máquina Linux, 
es posible que necesite averiguar qué procesos se están ejecutando actualmente.

El comando `ps` puede listar todos los procesos que se están ejecutando en un sistema Linux con la opción `-e`:

    ps -e
    
 ![Captura de pantalla 2022-08-24 213151](https://user-images.githubusercontent.com/103068924/186507499-d61e39db-d678-4862-8685-eda22481df0a.png)


Podemos conocer más detalles del comando `ps` accediendo a su manual:

    man ps
    
## Mostrar el uso actual de la CPU y la RAM de cada proceso:

Al igual que la opción anterior, esta opción listará todos los procesos que se estén ejecutando en tu sistema. Pero también 
muestra el uso actual de la CPU y la RAM de cada proceso, así como el comando que lo ha generado.

    ps -aux
    
![Captura de pantalla 2022-08-24 213641](https://user-images.githubusercontent.com/103068924/186507728-0368cf5f-af7f-47fe-af4c-7147ab1b9521.png)
   
## Encontrar un proceso con pgrep:

El comando `pgrep` es una especie de combinación de `ps` y `grep`. Podemos especificar el nombre (o parte del nombre) de un proceso que estemos 
buscando, y pgrep nos devolverá los respectivos ID de los procesos.

Por ejemplo, para buscar cualquier proceso relacionado con `openvpn` en tu sistema, escribirías:

    pgrep openvpn
    
![Captura de pantalla 2022-08-24 213406](https://user-images.githubusercontent.com/103068924/186507552-0004b479-4f5f-457b-8db2-4467b6944100.png)

![Captura de pantalla 2022-08-24 213343](https://user-images.githubusercontent.com/103068924/186507581-d3904fa9-0309-435d-b7fb-a1c4dd3f4ec4.png)

# Matar o Borrar un Proceso en Linux:

Si el comando/proceso se está ejecutando en primer plano, puedes utilizar el atajo de terminal `Ctrl+C`. Sin embargo, si el proceso no es visible (lo que
significa que se ejecuta en segundo plano), puedes emplear comandos dedicados para `matarlo`.

El término `matar un proceso` se refiere a detener un proceso a mitad de su ejecución. Si conoce el ID del proceso (PID), puedes utilizar el comando `kill`
de la siguiente manera:

    kill [Opción] [PID]
    
En la sintaxis anterior, en primer lugar, marcamos la opción que deseamos ejecutar del comando kill y PID se refiere al ID del proceso.
Las opciones del comando kill son las siguientes:

![Captura de pantalla 2022-08-24 214450](https://user-images.githubusercontent.com/103068924/186509188-4eca2092-40d8-4f17-bee3-e0fe6d61aab2.png)

En caso de querer eliminar el proceso anterior `openvpn` utilizaremos la opción `9` para cerrar el proceso inmediatamente.

    kill -9 [PID]
    
![Captura de pantalla 2022-08-24 214756](https://user-images.githubusercontent.com/103068924/186509952-9fd03bd9-8d40-4133-894b-9513fd90353c.png)

En este caso, el PID del proceso `openvpn` es el 151202 y tras ejecutar el comando `kill` vemos como al tratar de volver a listarlo con `pgrep`
ya no lo reporta.

![Captura de pantalla 2022-08-24 214828](https://user-images.githubusercontent.com/103068924/186509968-ba08a751-7d5a-4426-ad7b-57dc88a5e4cc.png)


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

  

  
