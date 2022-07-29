# Tshark

* <a href="#item1" style="text-decoration:none">¿Qué es Tshark?</a>
* <a href="#item2" style="text-decoration:none">Capturar paquetes http.</a>
* <a href="#item3" style="text-decoration:none">Capturar paquetes http y guardar resultados en un archivo `.cap`.</a>
* <a href="#item4" style="text-decoration:none">Representar los resultados guardados de un análisis con Tshark.</a>
* <a href="#item5" style="text-decoration:none">Filtrar resultados guardados.</a>
* <a href="#item6" style="text-decoration:none">Ver atributos de un paquete.</a>
* <a href="#item7" style="text-decoration:none">Filtrar por campos que contenga el archivo.</a>

<a name="item1"></a>
# ¿Qué es Tshark?
  
Thark es una herramienta para realizar análisis de protocolos. Se utiliza a través de línea de comandos. Todo el manejo tiene que realizarse
a través de comandos.

Como herramienta similar encontramos `Tcpdump`. Esta también es muy utilizada en entornos Linux que no disponen de entorno gráfico para trabajar.

Tshark puede realizar análisis en tiempo real o investigar una captura guardada. Estos son los conocidos ficheros pcap o pcapng.
La ventaja que nos ofrece Tshark frente a otras herramientas en línea de comandos es su funcionamiento. Podríamos decir sin equivocarnos 
que es Wireshark, pero en línea de comandos. Esto quiere decir que las personas que estén acostumbradas a trabajar con Wireshark van a poder 
realizar las mismas tareas, pero sin tener que hacerlo a través de ventanas y botones. Lo que permite incluso utilizarlo o incorporarlo en
scripts automatizados.

<a name="item2"></a>
## Capturar paquetes http:

    tshark -i tun0 -Y "http" 2>/dev/null

<a name="item3"></a>
## Capturar paquetes http y guardar resultados en un archivo .cap:

    tshark -i tun0 -w Captura.cap 2>/dev/null

* `-i`: Especifica la interfaz. En este caso `tun0`.
* `-w`: Especifica que queremos guardar la información. Los datos se guardarán en el archivo `Captura.cap`.
* `/dev/null`: Es el dispositivo nulo, toma cualquier entrada que desee y la tira. Se puede usar para suprimir cualquier salida.
    
* Más información sobre `/dev/null` --> <a href="https://blog.desdelinux.net/que-es-devnull-y-como-puede-ayudarte/" style="text-decoration:none">Link</a>

<a name="item4"></a>
## Representar los resultados guardados de un análisis con Tshark:

Ahora, los resultados han quedado guardados en el archivo Captura.cap, para poder representar los archivos sustituimos la opciones `-i` por `-r`:

    tshark -r Captura.cap 2>/dev/null

<a name="item5"></a>
## Filtrar resultados guardados:

Para filtrar y representar por pantalla los resultados guardados de un análisis con Tshark, utilizaremos la opción  `-Y`:

   tshark -r Captura.cap -Y "[Palabra Filtrada]" 2>/dev/null
   
`Ejemplo:`   
    
    tshark -r Captura.cap -Y "http" 2>/dev/null
    
En este ejemplo, Tshark representará la información que contenga la palabra `http`.

<a name="item6"></a>
## Ver atributos de un paquete:

Utilizando la opción `-Tjson` podremos ver por cada paquete filtrado pro la palabra `http` todos sus atributos en `json`.

   tshark -r Captura.cap -Y "http" -Tjson 2>/dev/null

<a name="item7"></a> <a name="item5"></a>  
## Filtrar por campos que contenga el archivo:

En el siguiente ejemplo vamos a ver como extraer toda la data en hexadecimal de un campo especifico. En este caso Tshark mediante la opción
`-Tfields` especifica que queremos exportar un campo y `data.data` es el campo que queremos exportar.  

   tshark -r  Captura.cap -Y "http" -Tfields -e "data.data" 2>/dev/null


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


