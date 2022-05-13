# Metasploit

# ¿Qué es Metasploit?

Metasploit es un proyecto de código abierto para la seguridad informática, que proporciona información acerca de vulnerabilidades de seguridad y ayuda en 
tests de penetración `Pentesting` y el desarrollo de firmas para sistemas de detección de intrusos.

Su subproyecto más conocido es el `Metasploit Framework`, una herramienta para desarrollar y ejecutar exploits contra una máquina remota.

Otros subproyectos importantes son las bases de datos de opcodes (códigos de operación), un archivo de shellcodes, e investigación sobre seguridad. 
Inicialmente fue creado utilizando el lenguaje de programación de scripting Perl aunque actualmente el Metasploit Framework ha sido escrito de nuevo 
completamente en el lenguaje Ruby.

# ¿Como funciona Metasploit?

Los pasos básicos para la explotación de un sistema que utiliza el Sistema incluyen:

1.La selección y configuración de un código el cual se va a explotar . El cual entra al sistema objetivo, mediante el aprovechamiento de una de 
bugs; Existen cerca de 900 exploits incluidos para Windows, Unix / Linux y Mac OS X.   
2.Opción para comprobar si el sistema destino es susceptible a los bugs elegidos.  
3.La técnica para codificar el sistema de prevención de intrusiones (IPS) e ignore la carga útil codificada.   
4.Visualización a la hora de ejecutar el exploit.

Metasploit se ejecuta en Unix (incluyendo Linux y Mac OS X) y en Windows. El Sistema Metasploit se puede extender y es capaz utilizar complementos 
en varios idiomas.

Para elegir un exploit y la carga útil, se necesita un poco de información sobre el sistema objetivo, como la versión del sistema operativo y los
servicios de red instalados. Esta información puede ser obtenida con el escaneo de puertos y "OS fingerprinting", puedes obtener esta información 
con herramientas como Nmap, NeXpose o Nessus, estos programas, pueden detectar vulnerabilidades del sistema de destino. Metasploit puede importar
los datos de la exploración de vulnerabilidades y comparar las vulnerabilidades identificadas.
