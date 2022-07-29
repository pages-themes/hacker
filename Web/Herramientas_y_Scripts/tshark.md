# ¿Qué es Tshark?
  
Thark es una herramienta para realizar análisis de protocolos. Se utiliza a través de línea de comandos. Todo el manejo tiene que realizarse
a través de comandos.

Como herramienta similar encontramos `Tcpdump`. Esta también es muy utilizada en entornos Linux que no disponen de entorno gráfico para trabajar.

Tshark puede realizar análisis en tiempo real o investigar una captura guardada. Estos son los conocidos ficheros pcap o pcapng.
La ventaja que nos ofrece Tshark frente a otras herramientas en línea de comandos es su funcionamiento. Podríamos decir sin equivocarnos 
que es Wireshark, pero en línea de comandos. Esto quiere decir que las personas que estén acostumbradas a trabajar con Wireshark van a poder 
realizar las mismas tareas, pero sin tener que hacerlo a través de ventanas y botones. Lo que permite incluso utilizarlo o incorporarlo en
scripts automatizados.

## Capturar paquetes http:

    tshark -i tun0 -Y "http" 2>/dev/null
    
## Capturar paquetes http y exportalos a un archivo .cap:

    tshark -i tun0 -w Captura.cap 2>/dev/null

* `-i`: Especifica la interfaz. En este caso `tun0`.
* `-w`: Especifica que queremos guardar la información. Los datos se guardarán en el archivo `Captura.cap`.
* `/dev/null`: Es el dispositivo nulo, toma cualquier entrada que desee y la tira. Se puede usar para suprimir cualquier salida.
    
* Más información sobre `/dev/null` --> <a href="https://blog.desdelinux.net/que-es-devnull-y-como-puede-ayudarte/" style="text-decoration:none">Link</a>

## Representar los resutados guardados de un análisis con Tshark:

Ahora, los resultados han quedado guardados en el archivo Captura.cap, para poder representar los archivos sustituimos la opcions `-i` por `-r`:

    tshark -r Captura.cap 2>/dev/null
  
## Filtrar resultados guardados:

Para filtrar y representar por pantalla los resultado guardados de un análisis con Tshark, utilizaremos la opcion  `-Y`:

   tshark -r Captura.cap -Y "[Palabra Filtrada]" 2>/dev/null
   
`Ejemplo:`   
    
    tshark -r Captura.cap -Y "http" 2>/dev/null
    
En este ejemplo, Tshark representará la información que contenga la palabra `http`.

