# NMAP


* <a href="#item1" style="text-decoration:none">¿Qué es NMAP?</a>
* <a href="#item2" style="text-decoration:none">Escaneo Básico</a>
* <a href="#item3" style="text-decoration:none">Escaneo Básico Guardando los resultados</a>
* <a href="#item4" style="text-decoration:none">Escaneo exahustivo de Puertos definidos.</a>
* <a href="#item5" style="text-decoration:none">Escaneo Rápido Completo.</a>
* <a href="#item6" style="text-decoration:none">Scripts específicos de Nmap</a>
* <a href="#item7" style="text-decoration:none">Escaneo mediante el script http-enum.</a>
* <a href="#item8" style="text-decoration:none">Escaneo mediante scripts por categorías.</a>
* <a href="#item9" style="text-decoration:none">Escalada de privilegios con Nmap.</a>




<center><img src="https://user-images.githubusercontent.com/103068924/172614528-6ceb9b92-6089-4530-8c16-1dabf3c33b8f.png"></center>


<a name="item1"></a>
# ¿Qué es NMAP?


Nmap es un programa de código abierto que sirve para efectuar rastreo de puertos y cuyo desarrollo se encuentra hoy a cargo de una comunidad. Fue creado originalmente para Linux aunque actualmente es multiplataforma. Se usa para evaluar la seguridad de sistemas informáticos, así como para descubrir servicios o servidores en una red informática, para ello Nmap envía unos paquetes definidos a otros equipos y analiza sus respuestas.


Este software posee varias funciones para sondear redes de computadores, incluyendo detección de equipos, servicios y sistemas operativos. Estas funciones son extensibles mediante el uso de scripts para proveer servicios de detección avanzados, detección de vulnerabilidades y otras aplicaciones. Además, durante un escaneo, es capaz de adaptarse a las condiciones de la red, incluyendo latencia y congestión de la misma.


<a name="item2"></a>
### Escaneo Básico:


    nmap -p- --open -T5 -v -n [Ip]
  
`-p-` : Escanea todo el rango de puertos.
  
`--open` : Solo nos mostrará puertos con el estatus abierto.
             
`-T5` : Controla el tiempo y el rendimiento del escaneo donde 1 es el más lento y 5 el más rápido.
             
`-v` : Verbose. Recopila los puertos abiertos por TCP y los reporta por consola.
             
`-n` : Anula la resolución DNS.
  
 <a name="item3"></a> 
### Escaneo Básico Guardando los resultados:
  
    nmap -p- --open -T5 -v -n [Ip] -oG allPorts
  
`-oG` : Exportar los resultados en formato grepeable.
  
`allPorts` : Nombre del archivo. Si no existe lo creará.
  
De esta manera podremos revisar los puertos que estaban abiertos en cualquier momento.


<a name="item4"></a>
### Escaneo exahustivo de Puertos definidos:


    nmap -sC -sV -n -v -p[Port1,Port2] [Ip Víctima] -oN targed  
   
`-sC` : Lanza scripts básicos de reconocimiento.
 
`-sV` : Localiza la versión y servicio de los puertos definidos. 
 
`-p` : Puertos a escanear.    Ej:  -p22,80
 
`-oN` : Reporta los resultados en formato nmap al archivo `targed`.


<a name="item5"></a>
### Escaneo Rápido Completo:


    nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn [Ip Vícitma] -oG allPorts
     
`-p-` : Escanea todo el rango de puertos.  
  
`--open` : Solo nos mostrará puertos con el estatus abierto.  


`-sS` : El escaneo SYN realizar rápidamente, escaneando miles de puertos por segundo en una red rápida que no se ve obstaculizada por firewalls intrusivos.    


`-oG` : Exportar los resultados en formato grepeable.  


`--min-rate` : Controla directamente la tasa de escaneo. Nmap intentará mantener la velocidad de envío en 5000 paquetes por segundo o más.


`-vvv` : Triple verbose. Recopila los puertos abiertos por TCP y los reporta por consola. Cuanto más verbose más información reporta mientras se realiza el escaneo.


`-n` : Anula la resolución DNS.


`-Pn` : Omite el descubrimiento de Hosts.


<a name="item6"></a>
# Scripts específicos de Nmap:


Nmap contiene un gran número de scripts de reconocimiento, para verlos podemos filtrar las categorías por la extensión `.nse`.


    locate .nse


Para ver el tipo de categoría de cada script de Nmap, podemos concatenar un `xargs`:


    locate .nse | xargs grep "categories"
    
La sintaxis es muy simple, solo debemos añadir la opción `--script` delante del script que queramos utilizar:


    nmap --script [Nombre del Script]


<a name="item7"></a>
## Escaneo mediante el script http-enum:


El script `http-enum` de Nmap actual como un fuzzer, aplicando un pequeño diccionario interno tratando de buscar directorios o archivos de interés.


    nmap --script http-enum [Ip Víctima]
    
Tambien podemos especificar puertos y guardar los resultados en un archivo (en este caso `enumScan`).


    nmap --script http-enum -p [Puerto/s] [Ip Víctima] -oG enumScan
    
`--script`: Especifica que vamos a utilizar un Script.   
`-p`: Especifica los puertos que vamos a escanear.  
`-oG`: Exportar los resultados en formato grepeable.  
`enumScan`: Nombre del archivo donde se guardan los resultados.


<a name="item8"></a>
# Escaneo mediante scripts por categorías:


Con Nmap también podemos especificar por categorías qué tipo de scripts queremos lanzar, recordar que podemos ver los distintos scripts utilizado el comando
`locate .nse | xargs grep "categories"`. La sintaxis básica del comando es la siguiente:


    nmap --script "[Categorias]" [Ip Víctima]


Ejemplo:


    nmap --script "vuln and safe" 10.10.10.10
    
    nmap --script "vuln and safe" -p22,80,445 10.10.10.10


En este ejemplo vemos como estamos lanzando los scripts de las categorías `vuln` y `safe` a la dirección Ip Víctima por los puertos 22, 80 y 445.
Para ver solo las categorías que existen independientemente de los scripts podemos verlas utilizando los siguientes comandos de filtrado:


![Captura de pantalla 2022-08-03 110200](https://user-images.githubusercontent.com/103068924/182569547-c4642134-8921-4fae-a99b-3780ab394cec.png)


Como vemos en la imagen, se nos reporta por consola todas las categorías existentes que podemos emplear.


<a name="item9"></a>
# Escalada de privilegios con Nmap:


En múltiples ocasiones, una vez realizada la intrusión en el sistema, veremos como algunos de los equipos o sistemas tienen `nmap` instalado. En caso de que los
privilegios sean los adecuados, se pueden usar para ganar acceso como root.


Para esto, en primer lugar, debe de tratarse de una versión de nmap que contenga el parámetro `--interactive`. Ahora, mediante el comando `sudo -l` podemos ver los
permisos que tenemos como sudo:


    sudo -l


![Captura de pantalla -2022-05-29 16-19-01](https://user-images.githubusercontent.com/103068924/170876271-0be1555f-58da-4361-b38f-01bbefdc58f4.png)


![Captura de pantalla -2022-05-29 16-20-21](https://user-images.githubusercontent.com/103068924/170876284-b614c5a7-82bc-4a38-8926-ee395408fe4a.png)


Debemos de fijarnos que tengamos permisos sudo sobre `nmap`. En tal caso, utilizaremos el siguiente comando para establecer una shell interna:


    sudo nmap --interactive
    
![Captura de pantalla -2022-05-29 16-21-09](https://user-images.githubusercontent.com/103068924/170876291-8ab391a2-ba8e-41d3-98ed-72a0664dbb6d.png)


Una vez establecida la shell de nmap, usaremos la expresión `!sh` para acceder como `root`.


    !sh


![Captura de pantalla -2022-05-29 16-21-39](https://user-images.githubusercontent.com/103068924/170876304-2e7280f7-623d-49f9-9608-c0b9a1de421d.png)
    
Directamente, pasaremos a estar registrados como el usuario `root` del sistema.    


<center><img src="https://user-images.githubusercontent.com/103068924/172614528-6ceb9b92-6089-4530-8c16-1dabf3c33b8f.png"></center>

---  
---  

### Nmap Options Description
* `10.10.10.0/24` Target network range.
* `-sn`: Disables port scanning.
* `-Pn` Disables ICMP Echo Requests
* `-n` Disables DNS Resolution.
* `-PE` Performs the ping scan by using ICMP Echo Requests against the target.
* `--packet-trace` Shows all packets sent and received.
* `--reason` Displays the reason for a specific result.
* `--disable-arp-ping` Disables ARP Ping Requests.
* `--top-ports=<num>` Scans the specified top ports that have been defined as most frequent.
* `-p-` Scan all ports.
* `-p22-110` Scan all ports between 22 and 110.
* `-p22,25` Scans only the specified ports 22 and 25.
* `-F` Scans top 100 ports.
* `-sS` Performs an TCP SYN-Scan.
* `-sA` Performs an TCP ACK-Scan.
* `-sU` Performs an UDP Scan.
* `-sV` Scans the discovered services for their versions.
* `-sC` Perform a Script Scan with scripts that are categorized as "default".
* `--script <script>`	Performs a Script Scan by using the specified scripts.
* `-O` Performs an OS Detection Scan to determine the OS of the target.
* `-A` Performs OS Detection, Service Detection, and traceroute scans.
* `-D RND:5` Sets the number of random Decoys that will be used to scan the target.
* `-e` Specifies the network interface that is used for the scan.
* `-S 10.10.10.200` Specifies the source IP address for the scan.
* `-g` Specifies the source port for the scan.
* `--dns-server <ns>`	DNS resolution is performed by using a specified name server.

## Output Options
Nmap Option	Description
* `-oA filename` Stores the results in all available formats starting with the name of "filename".
* `-oN filename` Stores the results in normal format with the name "filename".
* `-oG filename` Stores the results in "grepable" format with the name of "filename".
* `-oX filename` Stores the results in XML format with the name of "filename".

## Performance Options
Nmap Option	Description
* `--max-retries <num>`	Sets the number of retries for scans of specific ports.
* `--stats-every=5s` Displays scan's status every 5 seconds.
* `-v/-vv` Displays verbose output during the scan.
* `--initial-rtt-timeout 50ms` Sets the specified time value as initial RTT timeout.
* `--max-rtt-timeout 100ms` Sets the specified time value as maximum RTT timeout.
* `--min-rate 300`	Sets the number of packets that will be sent simultaneously.
* `-T <0-5>` Specifies the specific timing template.


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


