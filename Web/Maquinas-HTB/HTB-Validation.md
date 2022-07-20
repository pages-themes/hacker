
# HTB-Validation

En primer lugar, nos creamos un directorio con el nombre de la máquina desde el que trabajaremos:

    sudo mkdir Validation
    
Ahora, mediante la función <a href="../Web/Herramientas_y_Scripts/mkt.html" style="text-decoration:none">`mkt`</a> que tengo previamente definida en la `.zhshrc` crearemos nuestros directorios de trabajo:

    sudo mkt

Esta función está definida para crearnos cuatro directorios (`nmap`, `content`, `exploits` y `scripts`) desde los cuales poder trabajar a la hora de
realizar las máquinas de HTB.

## Fase de Reconocimiento:

Ejecutamos un `ping` y vemos como nos reporta un ttl=63, por tanto, ya sabemos que estamos frente una máquina Linux.

    ping -c 1 10.10.11.116
    
![Captura de pantalla -2022-07-20 10-30-17](https://user-images.githubusercontent.com/103068924/180005076-f47e79bb-ef02-40a7-8b6a-07fd7ac0f0bf.png)
    
Ahora vamos a ver mediante `whatweb` que más podemos ver:

    whatweb 10.10.11.116
    
![Captura de pantalla -2022-07-20 10-34-08](https://user-images.githubusercontent.com/103068924/180005282-38818870-b4d1-4b7e-9ab1-2212b9c86537.png)

Aquí en primer lugar nos muestra un codigo 200 de confirmación, el cual nos indica que la petición se ha realizado correctamente y tengamos un
servicio web activo. Tambien vemos que nos encontramos frente un sistema
Apache de versión 2.4.48.

Podemos ver tambien como utilizael framework de desarrollo wep `Bootstrap`.

* ¿Qué es Bootstrap? --> <a href="https://www.hostinger.mx/tutoriales/que-es-bootstrap" style="text-decoration:none">Link</a> 
    
Finalmente podemos ver que utiliza la biblioteca de JavaScript `jQuery` y utiliza la versión 7.4.23 del lenguaje de programación PHP.

Vamos a tratar de averiguar que puertos se encuentran abiertos utilizando la 
herramienta `nmap`.

# Nmap






