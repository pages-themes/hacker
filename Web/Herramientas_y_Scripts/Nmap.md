<center><img src="https://user-images.githubusercontent.com/103068924/172614528-6ceb9b92-6089-4530-8c16-1dabf3c33b8f.png"></center>

# NMAP

Nmap es un programa de código abierto que sirve para efectuar rastreo de puertos y cuyo desarrollo se encuentra hoy a cargo de una comunidad. Fue creado originalmente para Linux aunque actualmente es multiplataforma. Se usa para evaluar la seguridad de sistemas informáticos, así como para descubrir servicios o servidores en una red informática, para ello Nmap envía unos paquetes definidos a otros equipos y analiza sus respuestas.

Este software posee varias funciones para sondear redes de computadores, incluyendo detección de equipos, servicios y sistemas operativos. Estas funciones son extensibles mediante el uso de scripts para proveer servicios de detección avanzados, detección de vulnerabilidades y otras aplicaciones. Además, durante un escaneo, es capaz de adaptarse a las condiciones de la red incluyendo latencia y congestión de la misma.

### Escaneo Básico:

    nmap -p- --open -T5 -v -n [Ip]
  
`-p-` : Escanea todo el rango de puertos.
  
`--open` : Solo nos mostrará puertos con el estatus abierto.
             
`-T5` : Controla el tiempo y el rendimiento del escaneo donde 1 es el más lento  y 5 el más rápido.
             
`-v` : Verbose. Recopila los puertos abiertos por TCP y los reporta por consola.
             
`-n` : Anula la resolución DNS.
  
  
### Escaneo Básico Guardando los resultados:
  
    nmap -p- --open -T5 -v -n [Ip] -oG allPorts
  
`-oG` : Exportar los resultados en formato grepeable.
  
`allPorts` : Nombre del archivo. Si no existe lo creará.
  
De esta manera podremos revisar los puertos que estaban abiertos en cualquier momento.

### Escaneo exahustivo de Puertos definidos:

    nmap -sC -sV -n -v -p[Port1,Port2] [Ip Víctima] -oN targed  
   
`-sC` : Lanza scrips básicos de reconocimiento.
 
`-sV` : Localiza la versión y servicio de los puertos definidos. 
 
`-p` : Puertos a escanear.    Ej:  -p22,80
 
`-oN` : Reporta los resultados en formato nmap al archivo `targed`.

### Escaneo Rápido Completo:

    nmap -p- --open -sS --min-rate 5800 -vvv -n -Pn [Ip Vícitma] -oG allPorts
     
`-p-` : Escanea todo el rango de puertos.
  
`--open` : Solo nos mostrará puertos con el estatus abierto.

`-sS` : El escaneo SYN realizar rápidamente, escaneando miles de puertos por segundo en una red rápida que no se ve obstaculizada por firewalls intrusivos.

`--min-rate` : Controla directamente la tasa de escaneo. Nmap intentará mantener la velocidad de envío en 5000 paquetes por segundo o más.

`-vvv` : Triple verbose. Recopila los puertos abiertos por TCP y los reporta por consola. Cuanto más verbose más información reporta mientras se realiza el escaneneo.

`-n` : Anula la resolución DNS.

`-Pn` : Omite el descubrimiento de Hosts.


# Escalada de privilegios con Nmap:

En multiples ocasiones, una vez realizada la intrusión en el sistema, veremos como algunos de los equipos o sistemas tienen `nmap` instalado. En caso de que los
privilegios sean los adecuados, se pueden utilizar para ganar acceso como root.

Para esto en primer lugar, debe de tratarse de una versión de nmap que contenga el parámetro `--interactive`. Ahora, mediante el comando `sudo -l` podemos ver los
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


