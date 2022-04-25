![ImageToStl com_1_znvi3p8txmgcsmmnxqa0ig](https://user-images.githubusercontent.com/103068924/165158987-4aa056d7-3c42-431c-ae7a-7a5f7f9e771e.png)

# Fase de Reconocimiento - HTB
             
 Aquí trato de mostrar unas pautas muy básicas de 
 reconocimiento. El reconocimiento es una parte
 fundamental, ya que necesitamos conocer a lo que
 nos enfrentamos para poder buscar vulnerabilidades.
 
 En primer lugar, debemos asegurar que estamos conectados
 a la víctima y tratar de recopilar la máxima información
 posible.

## PING 

![Captura de pantalla -2022-04-11 18-56-44](https://user-images.githubusercontent.com/103068924/165159179-2e3ba6e6-84b8-42d8-a2c0-817beac98552.png)


 Para verificar la conexión y tener una primera toma de
 contacto utilizaremos el comando 'ping'.
 
           ping [Ip Víctima]

 Mediante este comando podemos obtener la siguiente
 información:
 
 - Verificar la conexión.
 - La latencia. Podemos observar el tiempo de recorrido
   de un paquete.  
 - Podemos obtener la Ip de un dominio.
 - Determinar si estamos frente a un SO Linux o Windows:
     Windows ttl = 128
     Linux ttl = 64
     
     
## NMAP 
  
  Tras conocer la máquina a la que nos enfrentamos
  pasaremos analizar los protocolos tcp/udp.
  
  Primero analizaremos los puertos tcp ya que son los más
  utilizados y los más rápidos de escanear.
  
  Mediante nmap realizaremos varios escaneos, el primero 
  será un análisis de todos los puertos abiertos del
  protocolo tcp.
  
            nmap -p- --open -T5 -v -n [Ip]
  
  -p- :        Escanea todo el rango de puertos.
  
  --open :     Solo nos mostrará puertos con el estatus
               abierto.
             
  -T5 :        Controla el tiempo y el rendimiento del
               escaneo donde 1 es el más lento  y 5 el
               más rápido.
             
  -v :         Verbose. Recopila los puertos abiertos por 
               TCP y los reporta por consola.
             
  -n :         Anula la resolución DNS.
  
  Ahora para poder trabajar mejor, exportaremos una lista
  en formato Grepeable al archivo 'allPorts'
  
             nmap -p- --open -T5 -v -n [Ip] -oG allPorts
  
  -oG :         Exportar los resultados en formato grepeable.
  
  allPorts :    Nombre del archivo. Si no existe lo creará.
  
  De esta manera podremos revisar los puertos que estaban
  abiertos en cualquier momento.  
  
## NMAP 

ESCANEO EXHAUSTIVO: 
 
 Tras conocer los puertos TCP abiertos, realizaremos un 
 segundo escaneo enfocado en los puertos abiertos para ver
 la información que nos reportan y exportarlo en formato
 nmap al archivo 'targed'.
 
           nmap -sC -sV -p[Port1,Port2] -oN targed  
   
 -sC :   Lanza scrips básicos de reconocimiento.
 
 -sV :   Localiza la versión y servicio de los puertos definidos. 
 
 -p :    Puertos a escanear.    Ej:  -p22,80
 
 -oN :   Reporta los resultados en formato nmap al archivo 'targed'.
 
 
## WHATWEB  
 
  Es una herramienta  que se utiliza  para tratar de
  averiguar
  el gestor de contenido de la Ip. Nos reportará
  información varia del sistema.
  
          whatweb http://[Ip]
  
          whatweb http://[Host]
  
  
  
