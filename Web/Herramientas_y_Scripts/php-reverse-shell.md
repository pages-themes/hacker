# php-reverse-shell.php

Este script realizará una conexión TCP saliente a una
IP y un puerto codificados.

El destinatario recibirá un shell ejecutándose como el
usuario actual (normalmente apache).

# Repositorio:

Desde aquí podréis copiar el script:
[php-reverse-shell.php](https://github.com/F1r0x/php-reverse-shell.php/blob/main/php-reverse-shell.php)

# Configuración:

La configuración es muy simple, lo único que tenemos que hacer es cambiar la Ip 
por la de nuestro sistema y establecer el puerto por el que queremos ponernos
en escucha. 

Abrimos una terminar y modificamos el archivo `php-reverse-shell.php`.

    sudo nano php-reverse-shell.php
          
          
![Captura de pantalla -2022-04-13 12-42-02](https://user-images.githubusercontent.com/103068924/163163832-7a4632e4-a547-4ac4-b3a2-24cb5c7075e7.png)
 
Establecemos nuestra Ip (tun0) y el puerto de escucha (en este ejemplo usaremos el 8080). Para saber cuál es nuestra Ip, podemos verlo mediante el
comando 'ipconfig':
 
    sudo ifconfig
                         

![Captura de pantalla -2022-04-13 12-42-15](https://user-images.githubusercontent.com/103068924/163163897-cf030c6f-617c-458e-b1ab-6f89c3ba5a25.png)

Guardamos (Cntrl + o) y salimos (Cntrl + x).

# Ejecución:

Primero cargamos el archivo php-reverse-shell.php a una máquina víctima. Luego, mediante la herramienta NetCat 
nos pondremos por escucha por el puerto previamente definido (en nuestro caso el 8080):

    nc -lnvp 8080

Ejecutamos el archivo php-reverse-shell.php (recargamos el navegado en la dirección en la que se encuentre el 
archivo). Si todo ha funcionado correctamente se nos tendría que abrir una shell en la terminal en la que estábamos 
en escucha.

![Captura de pantalla -2022-04-13 12-50-19](https://user-images.githubusercontent.com/103068924/163164862-0dba798c-7350-45be-a5d0-343ce80bed36.png)

En caso de no funcionaros un puerto, seguir probando, ya que en muchas ocasiones esos puertos están cerrados y no
se puede acceder a través de ellos. 

Otra causa de fallo habitual es que el sistema tenga algún firewall que no permita pasar a la reverse shell.
