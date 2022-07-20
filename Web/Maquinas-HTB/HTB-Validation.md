
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
    
Ahora vamos a ver mediante `whatweb` que más podemos ver:

    whatweb 10.10.11.116
    
    


