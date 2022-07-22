# Como ver el Código Fuente de una página web en nuestra Terminal:

En este artículo vamos a ver como utilizando el comando `Curl` vamos a poder ver el código fuente de una página web en nuestra terminal y como utilizarlo 
junto a las herramientas `htmlq` y `grep`.

Esto es muy útil cuando queremos trabajar con el código, cuando necesitamos parte de él para otra tarea o simplemente para visualizarlo de forma más
cómoda (por ejemplo, en caso de mostrarse todo el código en una línea, en nuestra terminal lo podremos separar y estructurar para que sea más visual).

    curl -s -X GET "[Dirección Web]"
    
    curl -s -X GET "http://ejemplo.com"
    
* `-s`: Mostrar código de estado de respuesta.

`Ejemplo:`
Para estos ejemplos emplearemos la máquina Horizontall de Hack the Box y vamos a tratar de visualizar el código fuente de la página http://horizontall.htb.
Realizamos la petición mediante `Curl`:

    curl -s -X GET "http://horizontall.com"
    
![Captura de pantalla 2022-07-22 092440](https://user-images.githubusercontent.com/103068924/180386416-91a4c482-ad96-4f25-91c0-622707abf0c9.png)

![Captura de pantalla 2022-07-22 092523](https://user-images.githubusercontent.com/103068924/180386501-be981aec-3fc5-49dc-bccd-6aafb5343247.png)

Como podéis ver nos muestra el código en una sola línea. Para que podamos verlo de forma más cómoda vamos a usar la herramienta `htmlq`.

## Instalar htmlq:

Para instalar la herramienta `htmlq` simplemente ejecutamos estos dos comandos, primero instalamos `cargo`:

    sudo apt install cargo
    
Y ahora procedemos a la instalación de `htmlq`:

    cargo install htmlq
   
## Ver Código Fuente con Curl y HTMLQ:

Finalmente, parta poder visualizar el código, lo ejecutamos de la siguiente manera:

    curl -s -X GET "http://ejemplo/" | htmlq -p
        
![Captura de pantalla 2022-07-22 102441](https://user-images.githubusercontent.com/103068924/180397239-a42518f3-86cc-480f-acfc-1ef98b5a3528.png)

Actualmente, `htmlq` está dando muchos problemas con sus librerías, en caso de no funcionar, otra alternativa para visualizarlo de manera más práctica (ya que distingue las sentencias por colores)
es empleando la herramienta `bat` que básicamente es una mejora que sustituye al `cat` que viene predeterminado en Linux. 


## Ver Código Fuente con Curl y Grep

Otra forma de evitarnos visualizar todo el código en una sola línea es filtrando los `<>` con `grep`, ya que en html, cada sentencia viene entre corchetes.
Para filtrar con la herramienta `grep` añadimos el siguiente comando `grep -oP '<.*?>'` concatenado con `Curl`:

    curl -s -X GET "http://ejemplo.com/" | grep -oP '<.*?>'

![Captura de pantalla 2022-07-22 111245](https://user-images.githubusercontent.com/103068924/180406443-60f1a95a-fcd4-4b66-9f69-16e8f223db73.png)





   
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



 
