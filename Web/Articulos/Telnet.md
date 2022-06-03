# Telnet

# ¿Qué es Telnet?

Telnet es el nombre de un protocolo de red que nos permite acceder a otra máquina para manejarla remotamente como si estuviéramos sentados delante 
de ella. También es el nombre del programa informático que implementa el cliente. 

Para que la conexión funcione, como en todos los servicios de Internet, la máquina a la que se acceda debe tener un programa especial que 
reciba y gestione las conexiones. El puerto que se utiliza generalmente es el 23/TCP.

# Funcionamiento:

Telnet solo sirve para acceder en modo terminal, es decir, sin gráficos, pero es una herramienta muy útil para arreglar fallos a distancia, sin necesidad 
de estar físicamente en el mismo sitio que la máquina que los tenga. También se usaba para consultar datos a distancia, como datos personales
en máquinas accesibles por red, información bibliográfica, etc.

Aparte de estos usos, en general telnet se ha empleado (y aún hoy se puede utilizar en su variante SSH) para abrir una sesión con una 
máquina UNIX, de modo que múltiples usuarios con cuenta en la máquina, se conectan, abren sesión y pueden trabajar utilizando esa máquina. 
Es una forma muy usual de trabajar con sistemas UNIX.

# Ejecución:

Podemos conectarnos a un cliente con el servicio Telnet activo utilizando el comando `telnet` seguido del `host` o de la `Ip` de equipo que establece
el servicio Telnet a través del puerto 23 TCP.

    telnet http://ejemplo.com/
    
    telnet 10.10.10.10
    
Una vez establecida la conexión nos pedirá un `Usuario` pulsamos `Enter` y una `Contraseña` y volvemos a pulsar `Enter` para finalizar. Una vez hecho esto tendremos acceso al equipo.

# Seguridad:

Hay 3 razones principales por las que el telnet no se recomienda para los sistemas modernos desde el punto de vista de la seguridad:

1. Los dominios de uso general del telnet tienen varias vulnerabilidades descubiertas a lo largo de los años, y varias más que podrían aún existir.  

2. Telnet, por defecto, no cifra ninguno de los datos enviados sobre la conexión (contraseñas inclusive), así que es fácil interferir y grabar las
   comunicaciones, y utilizar la contraseña más adelante para propósitos maliciosos.

3. Telnet carece de un esquema de autenticación que permita asegurar que la comunicación esté siendo realizada entre los dos anfitriones deseados, 
   y no interceptada entre ellos.
   
En ambientes donde es importante la seguridad, por ejemplo en el Internet público, telnet no debe ser utilizado. Las sesiones de telnet no son cifradas.
Esto significa que cualquiera que tiene acceso a cualquier router, switch, o gateway localizado en la red entre los dos anfitriones donde se está 
usando telnet puede interceptar los paquetes de telnet que pasan cerca y obtener fácilmente la información de la conexión y de la contraseña 
(y cualquier otra cosa que se mecanografía) con cualesquiera de varias utilidades comunes como `tcpdump` y `Wireshark`.

Estos defectos han causado el abandono y depreciación del protocolo telnet rápidamente, a favor de un protocolo más seguro y más funcional llamado SSH.

# Activar/Descativar Telnet en Windows:

Para activar Telnet en Windows 10, abre el menú de inicio y busca el término `características`. 

En los resultados, pulsa sobre `Activar o desactivar las características de Windows`, que es una de las opciones que puedes encontrarte en el 
antiguo panel de control heredado de versiones anteriores de Windows.

Se abrirá directamente una ventana en la que puedes activar características avanzadas de Windows que suelen estar ocultas. En ella, `activa` la 
opción de `Cliente Telnet` y pulsa en el botón `Aceptar`. 

Windows se tomará unos segundos para buscar los archivos necesarios, y al terminar ya estará activada la función en el ordenador. Esto lo 
tienes que hacer tanto en el equipo al que te quieres conectar como ese desde el que te conectarás.

# Activar/Descativar Telnet en Windows:

El archivo de configuración de telnet es `/etc/xinetd.d/telnet`. Para habilitar el servidor telnet, debe abrir este archivo y asegurarse de que
`Deshabilitar = No` está como `Deshabilitar = Sí`.

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
