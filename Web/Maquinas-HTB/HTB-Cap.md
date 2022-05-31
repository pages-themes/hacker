![Captura de pantalla -2022-05-09 22-42-07](https://user-images.githubusercontent.com/103068924/167496487-a71ffc73-b5a5-40d0-af8d-09985c1c4af1.png)

# Hack The Box-Cap

En primer lugar, nos creamos un directorio con el nombre de la máquina desde el que trabajaremos:

    sudo mkdir Cap
    
Ahora, mediante la función [`mkt`](../Herramientas_y_Scripts/mkt.html) que tengo previamente definida en la `.zhshrc` crearemos nuestros directorios de trabajo:

    sudo mkt

Esta función está definida para crearnos cuatro directorios (`nmap`, `content`, `exploits` y `scripts`) desde los cuales poder trabajar a la hora de
realizar las máquinas de HTB.

## PING

Ejecutamos un `ping` y vemos como nos reporta un ttl=63, por tanto, ya sabemos que estamos frente una máquina Linux.

    ping -c 1 10.10.10.245
    
![Captura de pantalla -2022-05-09 22-50-48](https://user-images.githubusercontent.com/103068924/167497195-d69bd6ca-65fc-4ad6-97e9-7ba11627fdad.png)
 
Verificamos mediante la herramienta [WishSystem](../Herramientas_y_Scripts/WichSistem.html) que nos encontramos frente
a un sistema Linux.

## WhatWeb

Ahora vamos a ver mediante `whatweb` que más podemos ver:

    whatweb 10.10.10.245
    
![Captura de pantalla -2022-05-09 23-01-58](https://user-images.githubusercontent.com/103068924/167497948-0a37ea37-6d93-4b33-9ca9-c55c76d70e0a.png)

Vemos que no nos reporta nada interesante, así que vamos a proceder mediante [`Nmap`](../Herramientas_y_Scripts/Nmap.html) a tratar de reportar todos
los puertos abiertos.

## [留](../Herramientas_y_Scripts/Nmap.html) NMAP

Ahora mediante `nmap` realizaremos un escaneo de puertos:

    nmap -p- --open -sS --min-rate 5800 -vvv -n -Pn 10.10.10.245 -oG allPorts
    
`-p-` : Escanea todo el rango de puertos.
  
`--open` : Solo nos mostrará puertos con el estatus abierto.

`-sS` : El escaneo SYN actuar rápidamente, escaneando miles de puertos por segundo en una red rápida que no se ve obstaculizada por firewalls intrusivos.

`--min-rate` : Controla directamente la tasa de escaneo. Nmap intentará mantener la velocidad de envío en 5000 paquetes por segundo o más.

`-vvv` : Triple verbose. Recopila los puertos abiertos por TCP y los reporta por consola. Cuanto más verbose más información reporta mientras se ejecuta el escaneo.
             
`-n` : Anula la resolución DNS.
 
![Captura de pantalla -2022-05-07 13-52-00](https://user-images.githubusercontent.com/103068924/167500289-9afcfe91-4323-44cd-a5ad-8ca0edc08fca.png)

Vemos como los puertos 21,22 y 80 están abiertos y que en los tres corren servicios interesantes vamos a tratar de realizar mediante una serie de 
scripts básicos de reconocimiento un segundo escaneo enfocándonos en los puertos que hemos encontrado abiertos:

    nmap -sC -sV -p21,22,80 -oN targed  
   
`-sC` : Lanza scripts básicos de reconocimiento.
 
`-sV` : Localiza la versión y servicio de los puertos definidos. 
 
`-p` : Puertos a escanear.
 
`-oN` : Reporta los resultados en formato nmap al archivo `target`.


![Captura de pantalla -2022-05-07 13-54-13](https://user-images.githubusercontent.com/103068924/167502535-93afc986-095d-4786-8a59-728035938efc.png)

![Captura de pantalla -2022-05-07 13-55-15](https://user-images.githubusercontent.com/103068924/167502581-3cad0416-bc03-45f6-85ba-832dee935bb6.png)

![Captura de pantalla -2022-05-07 13-55-36](https://user-images.githubusercontent.com/103068924/167502619-5dd465e6-f94e-46d2-8869-c75cd24e9206.png)

Vemos que por el puerto 80 corre un servicio `http` con la versión `gunicorn`. Vamos a tratar de acceder al
dominio `http://10.10.10.245` utilizando el navegador, en mi caso Firefox.

![Captura de pantalla -2022-05-07 14-02-57](https://user-images.githubusercontent.com/103068924/167509698-bcb004cf-b653-4e2e-adc5-277990de1fe2.png)

![Captura de pantalla -2022-05-07 14-03-07](https://user-images.githubusercontent.com/103068924/167509714-b3cca34c-4442-4cf2-8718-0a61317323b0.png)

Vemos como el dominio nos lleva hasta un panel de gráficos de un usuario llamado `Nathan`. Tras investigar la página, vemos como arriba a la izquierda 
tenemos un menú desplegable y me llama especialmente la atención el apartado `Security Snapshot (5 Second PCAP + Analysis)`.
 
![Captura de pantalla -2022-05-07 14-03-40](https://user-images.githubusercontent.com/103068924/167510011-d6d88eeb-de95-47f3-908a-22139d617c63.png)

Vemos como nos muestra una página que parece contener archivos guardados y donde también tenemos un botón de `Download`. Algo que es interesante es ver como nos
indica el directorio actual mediante el número `3`. 

![Captura de pantalla -2022-05-10 00-46-06](https://user-images.githubusercontent.com/103068924/167511204-af909e73-082c-4807-ab48-82dcf377c0a2.png)

Tras probar otros números, veo que existen varias páginas de ficheros empezando desde el `0` que parece ser la página que más archivos tiene guardados.
Vamos a pulsar `Donwload` y descargarnos el archivo para ver que se trata.

![Captura de pantalla -2022-05-07 14-03-40](https://user-images.githubusercontent.com/103068924/167511798-87eca5db-67a7-4b8d-9ae2-566f7c8e1c29.png)

![Captura de pantalla -2022-05-10 00-47-49](https://user-images.githubusercontent.com/103068924/167511794-b5f0fc92-be67-44bd-b416-f25a6fec4e59.png)

Vamos a llevar el archivo al directorio `content` donde vamos a realizar primeramente un `cat` para ver que se trata y vemos que el archivo contiene un binario.

![Captura de pantalla -2022-05-10 01-02-17](https://user-images.githubusercontent.com/103068924/167512847-8dd4d2cc-9080-4e24-b393-b93972a6b6bf.png)

## TShark

Para poder ver el binario vamos a utilizar la herramienta `tshark`. En caso de no tenerla podéis descargarla utilizando el siguiente comando:

    sudo apt install tshark

Una vez instalado vamos a tratar de leer el archivo:

    tshark -r 0.pcap 2>/dev/null
     
![Captura de pantalla -2022-05-07 14-18-25](https://user-images.githubusercontent.com/103068924/167512794-c12ea3d8-7203-41be-8358-a7cd9ab0c864.png)

![Captura de pantalla -2022-05-07 14-18-38](https://user-images.githubusercontent.com/103068924/167512817-3c665977-b629-42e0-a2d5-c62c2ef9f88d.png)

Tras revisar el contenido vemos que por el centro del archivo se encuentran las credenciales de un usuario. Nos muestra un user `nathan` y una PASS `Buck3tH4TF0RM3!`.

![Captura de pantalla -2022-05-07 14-19-36](https://user-images.githubusercontent.com/103068924/167513339-64286ff5-a981-419b-94cc-6ff2effed285.png)

![Captura de pantalla -2022-05-07 14-21-26](https://user-images.githubusercontent.com/103068924/167513346-05d65360-adc1-4121-bc7a-84e8ff8e57cf.png)

![Captura de pantalla -2022-05-07 14-21-38](https://user-images.githubusercontent.com/103068924/167513350-3c956c7d-6230-40ad-bab6-4883e1b13c2c.png)

Mediante los siguientes parámetros podríamos filtrar el archivo para solo reportar la información interesante.

    tshark -r 0.pcap -Y "ftp" -Tfields -e tcp.payload 2>/dev/null | xxd -ps -r

![Captura de pantalla -2022-05-07 14-27-41](https://user-images.githubusercontent.com/103068924/167513759-253ccb44-6e98-4e92-b848-793aaab8db70.png)

## FTP Shell:

Visto esto, vamos a tratar de conectarnos mediante `ftp` con las credenciales que hemos encontrado.

    ftp 10.10.10.245
       
![Captura de pantalla -2022-05-07 14-29-55](https://user-images.githubusercontent.com/103068924/167513995-41825a15-bc30-4952-977a-7eba85e0b2bd.png)

Perfecto vemos como nos permite conectarnos como el usuario `nathan`. Lo primero que debemos hacer es activar el modo pasivo para no tener problemas con los comandos.

    passive
    
Ahora ejecutando un `ls` vemos como ahí se encuentra el archivo `user.txt` con la primera flag.

![Captura de pantalla -2022-05-07 14-32-01](https://user-images.githubusercontent.com/103068924/167514474-3015b4d9-f036-4091-804f-fe88709a3a20.png)

Al tratar de visualizar el archivo con `cat` vemos como no nos lo permite.

![Captura de pantalla -2022-05-07 14-33-10](https://user-images.githubusercontent.com/103068924/167514547-ec8af6cd-6570-4c17-8665-ad843774bf9f.png)

Al revisar mediante la variable `help` las opciones que podemos utilizar:

![Captura de pantalla -2022-05-07 14-33-24](https://user-images.githubusercontent.com/103068924/167514823-45792852-cd79-4a11-8874-52712fdf2523.png)

Vemos que está disponible el comando `get`, así que vamos a tratar de descargarnos el archivo 
hasta nuestro repositorio.

![Captura de pantalla -2022-05-07 14-33-52](https://user-images.githubusercontent.com/103068924/167514855-3749a186-347f-4a9e-9682-3e08ef3997a7.png)

Abrimos una terminal nueva y nos dirigimos a nuestro directorio `content`, si hemos ejecutado anteriormente la shell ftp desde aquí, vemos como se nos abra descargado en este directorio el archivo `user.txt`.

![Captura de pantalla -2022-05-07 14-34-30](https://user-images.githubusercontent.com/103068924/167515085-9308eeb3-3c49-470c-beab-bc7ccffd6da5.png)

![Captura de pantalla -2022-05-07 14-34-43](https://user-images.githubusercontent.com/103068924/167515100-2f0efbfd-5f1f-4761-9bcd-efc9c249af64.png)

## Shell SSH

Ahora, para tratar de conseguir la flag del `root`, como la shell por ftp nos ha estado dando problemas con algunos comandos, vamos a tratar de establecer conexión mediante el servicio `ssh` y utilizando las mismas credenciales:

    ssh nathan@10.10.10.245
    
![Captura de pantalla -2022-05-07 14-41-53](https://user-images.githubusercontent.com/103068924/167515375-f18a3637-d680-4f3a-95a7-e39fec5cb6b8.png)

![Captura de pantalla -2022-05-07 14-43-29](https://user-images.githubusercontent.com/103068924/167515428-dbc65421-8d8a-42c0-b7ca-d0eb4393c7b0.png)

Primero vamos a tratar de ver si tenemos algún tipo de privilegios:

![Captura de pantalla -2022-05-07 14-44-17](https://user-images.githubusercontent.com/103068924/167515911-dbd2791b-dfb6-44f4-835a-a28aaae4b1fd.png)

Vemos que nos pide un password y por desgracia no nos sirve la misma que hemos utilizado anteriormente.

### GetCap
  
Ahora, para tratar de enumerar archivos de interés usaremos `getcap` muestra el nombre y las capacidades de cada archivo especificado.
En el caso de no disponer de `getcap` podemos descargarlo de la siguiente manera:

    getcap -r / 2>/dev/null

![Captura de pantalla -2022-05-07 14-52-31](https://user-images.githubusercontent.com/103068924/167515850-8374e20f-b072-4f01-8b53-e0bf3beb8e85.png)

 Vemos como se nos reporta un archivo llamado `cap_setuid` y que está siendo ejecutado en `Python3.8`.
 
 ![Captura de pantalla -2022-05-07 14-53-07](https://user-images.githubusercontent.com/103068924/167516218-a13658d9-7756-425f-9ad9-3f0003d7e9d6.png)

Tras buscar información sobre vulnerabilidades bandas en Python3.8 y he encontrado los siguientes comandos que nos permite crear una shell en bash registrándonos automáticamente como `root`.
Para ello vamos a introducir los siguientes comandos:

    import os
    
![Captura de pantalla -2022-05-07 14-53-41](https://user-images.githubusercontent.com/103068924/167516619-1c9c3ac6-3d46-4cf4-81ec-0073e5e1a41b.png)
 
    os.setuid(0)
    
![Captura de pantalla -2022-05-07 14-54-29](https://user-images.githubusercontent.com/103068924/167516639-024bf781-d32c-4086-ae02-62cf686662ef.png)
    
    os.system("bash")
    
![Captura de pantalla -2022-05-07 14-54-58](https://user-images.githubusercontent.com/103068924/167516655-a20acc11-8352-4a4e-bc11-0ab7c7b2e02c.png)
   
![Captura de pantalla -2022-05-07 14-55-13](https://user-images.githubusercontent.com/103068924/167516669-79d3c0f6-cdc5-49a8-973f-7213ceb17d17.png)

Vemos como ha funcionado y ya tenemos nuestra shell en `bash` y si ejecutamos el comando `whoami` podemos ver como estamos registrados como `root`. Finalmente, podemos encontrar la flag del archivo root dentro del directorio
`/root/root.txt`.

![Captura de pantalla -2022-05-07 14-55-46](https://user-images.githubusercontent.com/103068924/167517012-2a3a59e2-936b-4d18-a8ca-dab713d8e85f.png)

![Captura de pantalla -2022-05-07 14-56-42](https://user-images.githubusercontent.com/103068924/167517029-673c71ca-21c2-4e7e-a8ee-b98ddbaedbd4.png)

 
    
