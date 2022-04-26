![vaccine_banner](https://user-images.githubusercontent.com/103068924/165231176-ea7b6551-bdd2-4f3a-a5ba-5117de037506.png)

# HTB - Vaccine

Resolución del starting poing de Hack the Box Vaccine.

## Fase de Reconocimiento:

### Ping:

En primer lugar, vamos a comprobar si tenemos conexión con la máquina. Y si podemos averiguar el sistema 
operativo que utiliza mediante el ttl.

    ping [Ip Víctima]

Podemos observar que tiene un ttl=63, por tanto, ya sabemos que estamos frente a una máquina Linux.

### Nmap - Primer escaneo:

Ahora podemos escanear los puertos mediante nmap.
  
    nmap -p- --open -T5 -n -v [Ip Víctima] -oG allPorts
    
Esto nos guardará los puertos abiertos en el archivo 'allPorts' por si posteriormente queremos revisarlos 
de manera rápida accediendo al archivo guardado en nuestro directorio mediante la herramienta 'extractPorts'.

 Puedes encontrar la descripción y la herramienta extractPorts creada por S4vitar en mi repositorio: 
 [ExtractPorts](https://f1r0x.github.io/ExtractPorts.html)
 
 Es este caso podemos observar los siguientes puertos abiertos por el protocolo TCP:
 
### Nmap -Segundo escaneo:

Ahora pasaremos a realizar un escaneo más exhaustivo:
 
    nmap -sC -sV -v -p22,80 [Ip Víctima] -oN target
    
 -sC : Lanza scrips básicos de reconocimiento.
 
 -sV : Localiza la versión y servicio de los puertos
       definidos. 
       
 -p : Puertos a escanear.    Ej:  -p22,80
 
 -oN : Reporta los resultados en formato nmap al archivo
       targed.
 
 Este escaneo, al igual que el anterior, nos guardará los resultados en nuestro directorio en el archivo 'target'.
 
 
        
