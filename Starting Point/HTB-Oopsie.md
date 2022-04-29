# HTB-Oopsie

![background2](https://user-images.githubusercontent.com/103068924/162303201-c75e17fd-4e23-40e4-845a-c7c40e6ed3ed.png)

![Captura de pantalla -2022-04-12 20-08-28](https://user-images.githubusercontent.com/103068924/163026464-d0c81cf4-ce40-4fcc-9369-082a366558cf.png)

En primer lugar, vamos a comprobar si tenemos conexión
 con la máquina. Y si podemos averiguar el sistema
 operativo que utiliza mediante el ttl.

    ping [Ip Víctima]

![Captura de pantalla -2022-04-12 20-04-31](https://user-images.githubusercontent.com/103068924/163026403-f74332d1-582a-43d0-9cb5-6dc1f4b170dc.png)

 Podemos observar que tiene un ttl=63, por tanto, ya 
 sabemos que estamos frente a una máquina Linux.
 
 Ahora podemos escanear los puertos mediante nmap.
  
    nmap -p- --open -T5 -n -v [Ip Víctima] -oG allPorts
       
![Captura de pantalla -2022-04-12 20-11-38](https://user-images.githubusercontent.com/103068924/163026657-0e7a094b-7f45-44ef-9fec-33bd43400f94.png)
 
 Esto nos guardará los puertos abiertos en el archivo 
 'allPorts' por si posteriormente queremos revisarlos
 de manera rápida accediendo al archivo guardado en 
 nuestro directorio mediante la herramienta 'extractPorts'.
 
 Puedes encontrar la descripción y la herramienta extractPorts
 creada por S4vitar en mi repositorio: [ExtractPorts](https://f1r0x.github.io/Herramientas_y_Scripts/ExtractPorts.html)
 
 Es este caso podemos observar los siguientes puertos 
 abiertos por el protocolo TCP:
 
 
 ![Captura de pantalla -2022-04-12 20-16-22](https://user-images.githubusercontent.com/103068924/163027420-450280c2-ee41-4331-845e-0374bc6a8836.png)

    PORT  STATE SERVICE
    
    22/tcp open  ssh
    
    80/tcp open  http


 Ahora pasaremos a realizar un escaneo más exhaustivo:
 
     nmap -sC -sV -v -p22,80 [Ip Víctima] -oN target
        
 ![Captura de pantalla -2022-04-12 20-18-19](https://user-images.githubusercontent.com/103068924/163027847-ca47db77-4fdc-4852-ab48-049a2185332e.png)

 
 -sC : Lanza scrips básicos de reconocimiento.
 
 -sV : Localiza la versión y servicio de los puertos
       definidos. 
       
 -p : Puertos a escanear.    Ej:  -p22,80
 
 -oN : Reporta los resultados en formato nmap al archivo
       targed.
 
 Este escaneo, al igual que el anterior, nos guardará los 
 resultados en nuestro directorio en el archivo 'target'.
 
 ![Captura de pantalla -2022-04-12 20-18-36](https://user-images.githubusercontent.com/103068924/163027908-147fd6e0-e6fb-45bd-83c2-5cc108baa84f.png)
 
 Como podemos observar, obtenemos la siguiente información:
 
 -Puerto 22 corre un servicio ssh con la versión
  OpenSSH 7.6p1.
  
 -Puerto 80 corre un servicio http operativo con la versión Apache httpd 2.4.29.
     
 Nos dirigimos al buscador y trataremos de introducir la Ip como host para ver si nos redirige hacia alguna
 página web.
 
 Efectivamente, la dirección http://[Ip Víctima] nos muestra una página web sobre vehículos eléctricos.
 
![Captura de pantalla -2022-04-12 20-21-26](https://user-images.githubusercontent.com/103068924/163028827-497c18bd-3434-4e4a-9d65-0d21f6d8de26.png)

 Bueno, tras investigar un poco la página podemos ver como ningúna de las pestañas esta activa, tambien podemos 
 ver en la parte inferior de la página, en un apartado llamado Services, nos indica que porfavor nos registremos
 para tener acceso al servicio.

![Captura de pantalla -2022-04-12 20-29-57](https://user-images.githubusercontent.com/103068924/163029501-1f3ee38d-5925-4505-a8f3-f44d4ec1c65c.png)

 Por lo que podemos suponer que tiene que existir alguna página de registro por la que poder acceder.
 Visto esto vamos a echar un vistazo al código fuente de la página para ver si encontramos alguna dirección
 de registro.
 
 Para ver el código fuente de una página, clic derecho sobre la página y luego 'Ver código fuente de la página'.
 
 ![Captura de pantalla -2022-04-12 20-35-40](https://user-images.githubusercontent.com/103068924/163030380-53f4419e-6e68-472d-bc81-be3d9d2f3477.png)

 En la parte final del ćodigo podemos ver como muestra un directorio login. Vamos a tratar de acceder a él mediante
 el buscador para ver que nos reporta.
 
 ![Captura de pantalla -2022-04-12 20-38-21](https://user-images.githubusercontent.com/103068924/163030801-b7d8df3d-38b9-4d0f-83ee-55ed33284cef.png)

 Ahora tenemos un sitio desde el que acceder. Ya que desconocemos el usuario y la contraseña (yo he probado los
 más comunes y no he tenido suerte) vamos a acceder como invitados. Para ello le daremos a la opción Login as
 Gues y tendremos acceso como invitados.
 
![Captura de pantalla -2022-04-12 20-43-14](https://user-images.githubusercontent.com/103068924/163031583-c15f6fe6-be42-4aa0-89e0-44a906660539.png)

Podemos ver que tenemos diferentes pestañas, vamos a revisarlas una por una para ver la información que nos 
aportan:

# Account

![Captura de pantalla -2022-04-12 20-46-08](https://user-images.githubusercontent.com/103068924/163032093-35422154-b58a-4d74-8fd1-9eb8540f9f82.png)

Dentro de account tenemos información sobre el usuario guest, un Access Id, su nombre y un correo electrónico.
Luego he revisado el código fuente, pero en este caso no me ha reportado mucha información. 

También es interesante ver la url de la página, ya que nos asigna una id=2.

![Captura de pantalla -2022-04-12 20-48-35](https://user-images.githubusercontent.com/103068924/163032502-688b1ca0-e809-4327-b327-9fe966096fca.png)

Tras inspeccionar las cookies es donde encontramos algo interesante.

![Captura de pantalla -2022-04-12 20-54-39](https://user-images.githubusercontent.com/103068924/163033432-4fbc584c-ec0d-42c1-bc50-709e6d8bc50d.png)

Podemos ver como está página utiliza cookies de inicio de sesión, en caso de tener otro role y otro user, podríamos
intentar cambiarlos y ganar acceso a otra cuenta.

Bien, ahora pasaremos a la siguiente pestaña a ver que más nos puede reportar.

# Branding

![Captura de pantalla -2022-04-12 21-39-41](https://user-images.githubusercontent.com/103068924/163040582-9d571a01-4f86-49ce-9c5f-75d654c9cf40.png)

Aquí podemos ver como se nos asigna una Brand Id = 2 y también podemos ver como las cookies de inicio de sesión
se mantienen. 

# Clients

![Captura de pantalla -2022-04-12 21-43-09](https://user-images.githubusercontent.com/103068924/163041152-679d8735-82e5-497b-a965-ab3de84a2654.png)

 Vemos como se nos continua asignando una ID = 2 y nos muestra un nombre 'client'.
 
# Uploads

![Captura de pantalla -2022-04-12 21-45-19](https://user-images.githubusercontent.com/103068924/163041448-d44b6a48-5073-45ff-bccb-7d51e39f892f.png)

Esta pestaña es muy interesante, ya que parece que sirve para subir archivos a la página. El único problema
es que no tenemos permisos de 'súper admin'.

En caso de tenerlos podríamos subir algún archivo para tratar de vulnerar la máquina o de escalar privilegios.

# Recopilación de toda la información:

Tras investigar por todas las pestañas, lo más interesante que he encontrado es que todos los id del usuario
actual son iguales a 2. 

También me llama la atención como en la url de la pestaña nos especifica la id=2
 
![Captura de pantalla -2022-04-12 21-54-39](https://user-images.githubusercontent.com/103068924/163042869-a1df4c54-f66a-4f39-b2dd-4bfc1e4bde75.png)

Y otra cosa importante, son las cookies de inicio de sesión que hemos encontrado.

Ahora, tras conocer toda esta información, lo que podemos hacer es probar otras 'id' en la url de la pestaña
'Account'. Simplemente, introducimos la misma url, pero probamos con otros valores (0,1,3,4,...).

![Captura de pantalla -2022-04-12 22-00-19](https://user-images.githubusercontent.com/103068924/163043808-0172257b-1519-45d8-8ed5-3752595187da.png)

El primer intento ha sido con 0 y vemos como no ha tenido resultado.

![Captura de pantalla -2022-04-12 22-01-14](https://user-images.githubusercontent.com/103068924/163044402-0c82b941-dab9-4211-803a-4cfe55d354a9.png)

Al segundo intento, mediante el número id=1 vemos como nos reporta información de un usuario llamado 'admin'. Pero
nosotros buscamos al usuario 'super admin', ya que es el que tiene pleno acceso a la carga de archivos de la 
pestaña Upload, así que seguimos probando.

![Captura de pantalla -2022-04-12 22-02-47](https://user-images.githubusercontent.com/103068924/163044418-a4cbd28f-f9a7-4069-a2c3-6ccb0a2e32c2.png)

Vemos como tras muchos intentos vacíos, nos muestra algunos usuarios.

![Captura de pantalla -2022-04-12 22-03-43](https://user-images.githubusercontent.com/103068924/163044454-f20e27ad-192f-455b-898a-bda8336c4bc3.png)

Finalmente, tras 30 intentos, lo conseguimos. El id=30 pertenece al usuario 'super admin'.

![Captura de pantalla -2022-04-12 22-04-28](https://user-images.githubusercontent.com/103068924/163044499-978e1f8c-f344-4231-95d0-c7b5b0727c06.png)

# Cookies de inicio de sesión:

Ya conoces el Acces ID (86575) y el Name (super admin), ahora tenemos que iniciar sesión como ese usuario.
Tras probar a iniciar sesión desde la página anterior de registro a la que accedimos como 'Gues', veo que
no me permite entrar, ya que aun desconocemos la contraseña.

Entonces utilizaremos las cookies de inicio de sesión para intentar acceder como super admin. Para ello, en la 
misma pestaña de Account, pulsamos clic derecho sobre la página y pulsamos 'Inspeccionar', dentro nos desplazaremos
hasta la pestaña 'Almacenamiento'.

![Captura de pantalla -2022-04-12 22-24-01](https://user-images.githubusercontent.com/103068924/163047604-4abab7f4-15bd-4755-8c02-8adcef856ced.png)

Dentro de 'Almacenamiento' veremos una pestaña llamada 'Cookies' y el dominio de la página. Bueno, pues el truco 
consiste en cambiar los parametros 'role' y 'user' actuales por los del super admin.

![Captura de pantalla -2022-04-12 22-25-21](https://user-images.githubusercontent.com/103068924/163047637-11e2b9cb-3cf8-46f4-9221-93a5c95f2696.png)

Una vez introducimos los nuevos datos, recargamos la página y ya tendríamos acceso como super admin. 
Para comprobarlo, nos vamos a la pestaña Uploads y vemos como ya nos permite subir archivos.

![Captura de pantalla -2022-04-12 22-26-27](https://user-images.githubusercontent.com/103068924/163048085-17970a2a-aef6-4511-893c-a0f7cc9a4ade.png)

# NetCat y Reverse-Shell

Bueno, ahora que ya podemos subir archivos al sistema, vamos a probar a crear una reverse-shell.php, ya que la 
url utiliza archivos '.php'.

![Captura de pantalla -2022-04-13 12-05-12](https://user-images.githubusercontent.com/103068924/163155180-2eef861b-2b0c-4134-9a93-7ce0c84388fb.png)

########################### php-reverse-shell.php ################################

En caso de utilizar Kali Linux o Parrot, lo más seguro es que ya tengáis una reverse-shell en vuestros repositorios.
En mi caso que utilizo parrot, si realizamos una búsqueda del archivo 'php-reverse-shell.php' podemos ver como se
aloja en los siguientes directorios:

![Captura de pantalla -2022-04-13 12-05-12](https://user-images.githubusercontent.com/103068924/163155773-14809f0c-7c41-40a0-93fc-7274badd19df.png)

En mi caso me aparece en dos repositorios y luego yo he realizado una copia en la carpeta Descargas para poder
configurar con nuestros datos nuestra reverse-shell. Es importante copiar el archivo en la carpeta 'Descargas',
ya que será difícil buscar nuestro archivo desde la página de Uploads a la hora de subirlo.

En caso de no tener el archivo php-reverse-shelll.php en vuestro sistema, lo podéis encontrar en mi repositorio
de GitHub mediante el siguiente enlace: [https://github.com/F1r0x/php-reverse-shell.php/blob/main/php-reverse-shell.php](./https://github.com/F1r0x/php-reverse-shell.php/blob/main/php-reverse-shell.php)

Para tenerlo, simplemente lo copiáis, abrís una terminal y crearemos el archivo mediante nano:

    nano php-reverse-shell.php
              
Pegamos todo el script, guardamos (Cntrl + o) y salimos (Cntrl + x).

# Configurar nuestra reverse-shell:

Ya tendríamos la reverse-shell, ahora solo faltaría configurarla. Para ello, desde el directorio en el que esté
el archivo php-reverse-shell.php (recomiendo que sea Descargas), mediante el comando nano cambiaremos la Ip por
la nuestra y estableceremos un puerto, desde el cual, posteriormente con NetCat nos pondremos en escucha. 

La configuración es muy simple, lo único que tenemos que hacer es cambiar la Ip 
por la de nuestro sistema y establecer el puerto por el que queremos ponernos
en escucha. 

Abrimos una terminar y modificamos el archivo php-reverse-shell.php

    sudo nano php-reverse-shell.php
          
          
![Captura de pantalla -2022-04-13 12-42-02](https://user-images.githubusercontent.com/103068924/163163832-7a4632e4-a547-4ac4-b3a2-24cb5c7075e7.png)
 
Establecemos nuestra Ip (tun0) y el puerto de escucha (en este ejemplo usaremos el 8080). Para saber 
cuál es nuestra Ip, podemos verlo mediante el comando 'ipconfig':
 
    sudo ifconfig
                                                 
![Captura de pantalla -2022-04-13 13-01-50](https://user-images.githubusercontent.com/103068924/163166666-8c4d0990-f186-4775-be03-71e20fc4cb32.png)

![Captura de pantalla -2022-04-13 12-42-15](https://user-images.githubusercontent.com/103068924/163163897-cf030c6f-617c-458e-b1ab-6f89c3ba5a25.png)

Guardamos (Cntrl + o) y salimos (Cntrl + x).

Ya tendríamos nuestro archivo php-reverse-shell.php preparado. Ahora lo siguiente seria tratar de subirlo a la
página desde la pestaña Uploads.

(NOTA: La Ip de la máquina que yo os muestro a lo largo del write-up va cambiando debido a que realizarlo
ha llevado horas y he tenido que reiniciar varias veces la máquina)

![Captura de pantalla -2022-04-13 13-05-15](https://user-images.githubusercontent.com/103068924/163167449-e3ecf585-c2b0-4ada-bf15-65948855ebc2.png)

Para ello simplemente vamos a la página, pulsamos examinar:

![Captura de pantalla -2022-04-13 13-05-24](https://user-images.githubusercontent.com/103068924/163167470-2f5b1a66-854f-411a-9dae-f41c159e3d27.png)

Seleccionamos nuestra reverse-shell:

![Captura de pantalla -2022-04-13 13-05-48](https://user-images.githubusercontent.com/103068924/163167513-4311b8e0-b094-4859-b917-2f6758945497.png)

Y finalmente pulsamos Upload:

![Captura de pantalla -2022-04-13 13-06-14](https://user-images.githubusercontent.com/103068924/163167561-97fb1091-3d56-46ef-991f-55f67084cf3c.png)

Perfecto, ya tendríamos nuestro archivo subido.

![Captura de pantalla -2022-04-13 13-06-42](https://user-images.githubusercontent.com/103068924/163167608-faa10f70-d676-44d5-b261-2b197eae910e.png)

 Ahora faltaría preparar nuestro NetCat para que se ponga en modo escucha por el puerto 8080.
 Antes de probar el 8080  probé otros con el cual no conseguí establecer conexión para que
 lo tengáis en cuenta.
 
 Para ponernos en escucha, abrimos una terminal y ejecutamos el siguiente comando:
 
     nc -lnvp 8080
                
  -l : Sirve para que Netcat abra un puerto y se mantenga ala escucha. Se aceptará una única conexión de un
       único cliente antes de cerrarse.
       
  -n : Direcciones IP solo numéricas, sin DNS.
  
  -v : Se usa para mostrar información acerca de la conexión.
  
  -p : Esta opción permite especificar el puerto al que conectarse.
                
![Captura de pantalla -2022-04-13 13-25-27](https://user-images.githubusercontent.com/103068924/163170156-2409012e-2a0e-4657-8d97-247bd3862179.png)

El siguiente paso sería ejecutar el archivo php-reverse-shell.php que hemos almacenado en la 
máquina víctima. El único problema es que no sabemos donde se ha almacenado nuestro archivo.
Para encontrar nuestro archivo utilizaremos la herramienta 'gobuester'.

# Gobuster

Gobuster es una herramienta utilizada para la fuerza bruta de búsqueda de URL, incluidos directorios y archivos,
así como subdominios DNS.

Para instalarlo simplemente ejecutamos:

    sudo apt install gobuster
             
  Y también tendremos que descargar los repositorios de direcciones, en esta ocasión utilizaremos un
  repositorio llamado 'wordlists' y en concreto la lista de directorios 'directory-list-2.3-small.txt.
  
  Podéis descargaros estas bibliotecas de directorios desde la misma página de github, existen un montón
  de variantes en función del sistema a explotar. De todas formas revisar primero si ya existe en
  vuestro sistema, ya que algunos SO traen repositorios instalados.
  
  Para descargar o copiar:
  
  [https://gist.github.com/sl4v/c087e36164e74233514b](./https://gist.github.com/sl4v/c087e36164e74233514b)
  
  En ese enlace encontraréis la biblioteca que vamos a utilizar, yo recomiendo instalarlo en el siguiente 
  directorio, si el directorio no existe crearlo.:
  
    /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt   
  
  
  Bien, ya tenemos nuestro Gobuster y nuestra biblioteca de directorios, ahora toca lanzar la herramienta a ver
  que nos reporta:
  
    gobuster dir --url http://[Ip Víctima]/ --wordlist /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt -x php
  
  Ahora gobuster empezará a realizar pruebas y a mostrarnos resultados a medida que avanza. No tenemos que esperar a
  que finalice, simplemente fijaros en cuales son los directorios que reporta y ir probando a ver cuáles son
  funcionales.
  
![Captura de pantalla -2022-04-13 13-56-08](https://user-images.githubusercontent.com/103068924/163174943-ef87aba2-a3da-4ede-aeae-447ea841f8ad.png)

  Para el proceso: Cntrl + c
  
  En este caso hemos tenido suerte, ya que al poco de buscar ha encontrado una ruta que nos dirige al directorio
  Uploads.
  
    http://[Ip Víctima]/uploads/
            
  Una vez hecho esto nos dirigiremos al navegador y trataremos de introducir la siguiente ruta:
   
    http://[Ip Víctima]/uploads/php-reverse-shell.php
            
![Captura de pantalla -2022-04-13 13-46-48](https://user-images.githubusercontent.com/103068924/163173691-3a6ffdf3-68f3-4118-af32-35aaba15b3a4.png)

  Una vez realizado esto, volvemos a la terminal donde se encontraba el 'netcat' y debería de haberse abierto 
  nuestra shell.  
  
![Captura de pantalla -2022-04-13 13-48-41](https://user-images.githubusercontent.com/103068924/163173725-66250263-5c8b-4878-8549-897c4cfb935b.png)

 Efectivamente, ya tenemos nuestra reverse-shell preparada y activa.
 
 # Búsqueda de la primera Flag:
 
 Una vez tengamos la shell activa, podemos ver los directorios mediante ls:
 
 ![Captura de pantalla -2022-04-13 14-59-23](https://user-images.githubusercontent.com/103068924/163187298-bce39584-72ea-45bd-83f0-e9dd8cf827cd.png)
 
 Vamos a ver que Usuarios tenemos registrados en el sistema, para ello nos dirigimos al directorio /home y vemos
 que existe el usuario 'robert'.
 
 ![Captura de pantalla -2022-04-13 15-00-24](https://user-images.githubusercontent.com/103068924/163187555-39762713-a2b8-494b-8119-3d63bf5243f1.png)

 Y bingo!! Dentro del directorio 'robert' podemos ver el archivo 'user.txt' que contiene la primera Flag.
 
 ![Captura de pantalla -2022-04-13 15-00-44](https://user-images.githubusercontent.com/103068924/163187928-3efd9b72-3992-4036-923d-d6ae79a7686a.png)

 Mediante el comando 'cat' podemos ver en la terminal el contenido del archivo:
 
     cat user.txt

 ![Captura de pantalla -2022-04-13 15-02-39](https://user-images.githubusercontent.com/103068924/163187942-4cde5ee7-b0eb-418c-b192-e719391765f7.png)

Ahora, para poder trabajar de manera más cómoda y tratar de escalarar privilegios, primero, abriremos una shell
más funcional. Para ello volvemos al directorio principal mediante cd y ejecutamos el siguiente comando:

    python3 -c 'import pty;pty.spawn("/bin/bash")' 
                   
![Captura de pantalla -2022-04-21 08-17-19](https://user-images.githubusercontent.com/103068924/164386987-26be3445-32af-43fe-86e4-cb706405152c.png)

![Captura de pantalla -2022-04-21 08-17-46](https://user-images.githubusercontent.com/103068924/164387012-eed5d362-cf52-4c9b-bbe8-dea4a252ab4a.png)

Bien, ahora ya tenemos una shell más segura y funcional. Ya hemos visto que con el usuario actual no podemos
hacer mucho más, ya que tenemos el acceso restringido al sistema. 

Ya que el sitio web utiliza PHP y SQL, podemos tratar de comprobar el directorio web en busca de posibles 
divulgaciones o configuraciones incorrectas.

Para ello revisamos los directorios situados en '/var/www/html/'. Tras revisar los distintos directorios, podemos
ver uno con el nombre 'login' (/var/www/html/cdn-cgi/login) que contiene distintos archivos.

![Captura de pantalla -2022-04-21 08-26-47](https://user-images.githubusercontent.com/103068924/164388471-47ec0d82-21a7-4605-add7-ad0acd87390e.png)

Aparecen tres archivos '.php' y uno '.js', el siguiente paso sería buscar información en el codigo fuente de cada
archivo. Para ello, buscaremos cadenas interesantes con el uso de la herramienta 'grep'.

Grep es una herramienta que busca patrones en cada archivo e imprime las líneas que coinciden con los patrones.
Junto a esta herramienta podemos utilizar el comanado 'cat' para leer todos los archivos filtrados por 'grep'.

Con grep utilizaremos el patrón 'passw' para tratar de roportar todas los resultados con ese inicio de palabra (como
passwd o password por ejemplo). También usaremos -i para ignorar las palabras sensibles a mayúsculas y minúsculas
como por ejemplo las contraseñas en este caso.

    cat * | grep -i passw*
                       
                       
 ![Captura de pantalla -2022-04-21 08-43-19](https://user-images.githubusercontent.com/103068924/164390666-8ff742dc-30ed-4147-b5f6-9bf5fd216792.png)
 
 Genial, podemos ver como nos reporta un username = "admin" y una password = "MEGACORP_4dm1n!!". 
 
 Para poder verificar los usuarios disponibles en el sistema, podemos leer el archivo  /etc/passwd y tratar
 de reutilizar la contrasña encontrada en alguna cuenta con altros privilegios.
 
    cat /etc/passwd
                        
 ![Captura de pantalla -2022-04-21 08-51-23](https://user-images.githubusercontent.com/103068924/164391835-0f93382c-112b-4f0d-ba0b-c2efab165c22.png)

Podemos ver como tenemos un usuario llamado 'robert'. Vamos a tratar de entrar como este usuario mediante el 
comando 'su' y con la contraseña previamente encontrada.

    su robert
                        
![Captura de pantalla -2022-04-21 08-56-29](https://user-images.githubusercontent.com/103068924/164392632-a0950c9a-d518-4ba7-a9a0-433173395c23.png)


Podemos ver que la contraseña no corresponde con este usuario. Como no nos sirve está contraseña, vamos a seguir
revisando los archivos ".php" y ".js" de manera manual en busca de algo más.

Tras revisar los cuatro archivos, vemos que en el archivo 'db.php' encontramos la siguiente información:

    cat db.php
                       
![Captura de pantalla -2022-04-21 09-02-58](https://user-images.githubusercontent.com/103068924/164393733-c692a948-0f9d-45ce-ac05-e7afab97ff00.png)

Como podéis ver aparecen cuatro palabras que podemos probar como contraseñas, tras probarlas vemos como la 
contraseña del usuario 'robert' es "M3g4C0rpUs3r!"

    su robert
                                     
![Captura de pantalla -2022-04-21 09-08-58](https://user-images.githubusercontent.com/103068924/164394920-e350b001-4047-4f76-9c31-6097ef72ea92.png)

Finalmente, estamos como el usuario 'robert', podemos comprobarlo utilizando el comando 'whoami':

![Captura de pantalla -2022-04-21 09-10-00](https://user-images.githubusercontent.com/103068924/164396131-26ff5453-22ee-48a5-9629-18f5b73e9be9.png)

Ahora podemos ir al directorio principal /home/robert y veremos como ahí está nuestro archivo user.txt con 
nuestra primera flag que ya habíamos visto anteriormente sin necesidad de ningún privilegio.

    cd /home/robert
                          
    cat user.txt
                          
![Captura de pantalla -2022-04-21 09-12-12](https://user-images.githubusercontent.com/103068924/164396519-93ccff49-d292-4047-9e64-2988711d5187.png)
                   
Pero nosotros lo que buscamos es la flag del super usuario y para ello debemos de escalar privilegios.

# Escalada de Privilegios.

En primer lugar, trataremos de iniciar sesión como super usuario mediante 'sudo':

    sudo su robert
            
![Captura de pantalla -2022-04-21 09-27-12](https://user-images.githubusercontent.com/103068924/164400159-7bc36117-61a0-4dc8-87c4-9e93ab5bb34c.png)

Tras probar las contraseñas previamente recopiladas vemos como ninguna parece funcionar. Vamos a seguir buscando 
información, está vez, vamos a revisar los grupos en los que forma parte el usuario 'robert', para ello
utilizaremos el comando 'id':

![Captura de pantalla -2022-04-21 09-33-56](https://user-images.githubusercontent.com/103068924/164402956-9fb36b29-d5cb-4e17-8efb-742d75145cd8.png)

Vemos como el usuario robert es parte del grupo 'bugtracker'. Ahora, intentemos ver si hay algún 
binario dentro de ese grupo:

    find / -group bugtracker 2>/dev/null
                     
![Captura de pantalla -2022-04-21 09-42-23](https://user-images.githubusercontent.com/103068924/164404634-e6d61c58-7fff-4e55-a6f7-b9a0a06aed99.png)

Nos ha reportado un archivo llamado 'bugtracker'. Ahora comprobamos qué privilegio y qué tipo de archivo es:

    ls -la /usr/bin/bugtracker && file /usr/bin/bugtracker

![Captura de pantalla -2022-04-21 09-47-02](https://user-images.githubusercontent.com/103068924/164405567-6055d680-b99b-4635-a3ad-a2c54ad77b82.png)

Podemos ver que existe un conjunto 'SUID' en ese binario, este es un buen camino de explotación para tratar de
escalar privilegios.

Un archivo SUID siempre se ejecuta como el usuario propietario del archivo, independientemente de que usuario 
pase el comando.

En nuestro caso, el 'butracker' binario es propiedad de 'root' y por tanto, podemos ejecutalo como root ya
que tiene configurado SUID.

Para ello ejecutamos 'bugtacker':

    /usr/bin/bugtracker 
            
![Captura de pantalla -2022-04-21 09-57-05](https://user-images.githubusercontent.com/103068924/164786353-6e21c5ef-1b8e-465b-808e-371ac1f3b293.png)

En mi caso probé con 'home' para ver que me reportaba:

![Captura de pantalla -2022-04-21 10-01-29](https://user-images.githubusercontent.com/103068924/164786858-de17dddb-948d-4cd9-82b6-0fb270d85340.png)

La herramienta acepta la entrada del usuario como nombre del archivo que se leerá con el comando 'cat'. Sin embargo, no especifica la ruta completa al archivo 'cat' y podríamos aprovechar esto.

Para ello nos dirigiremos al directorio '/tmp':
 
    cd /tmp
            
![Captura de pantalla -2022-04-21 10-49-05](https://user-images.githubusercontent.com/103068924/164787581-b841e8fc-9f0c-4d90-bc2c-22f9c44b40d3.png)


Y crearemos un archivo 'cat' que contenga la siguiente ruta '/bin/sh':

    echo '/bin/sh' > cat
            
 ![Captura de pantalla -2022-04-21 10-49-22](https://user-images.githubusercontent.com/103068924/164787634-3a48e291-f6e5-4415-8bbb-54f197c02657.png)
      
Ahora le tenemos que dar privilegios de ejecución:

    chmod +x cat
            
![Captura de pantalla -2022-04-21 10-49-52](https://user-images.githubusercontent.com/103068924/165099961-3373a75c-d7b5-4f97-b733-9df7805772fd.png)

            
Una vez preparado el archivo 'cat', debemos agregar el directorio /tmp a la variable ambiental PATH. 

PATH es una variable de entorno en sistemas operativos similares a Unix, DOS, OS/2 y Microsoft Windows, que especifica un conjunto de directorios donde se encuentran los programas ejecutables.

Por tanto, debemos introducir el directorio 'tmp' en el archivo PATH
para poder ejecutarlo correctamente. Para ello utilizamos el siguiente comando:

    export PATH=/tmp:$PATH

![Captura de pantalla -2022-04-21 10-48-24](https://user-images.githubusercontent.com/103068924/165100226-c25d5a72-39a6-4083-9aa4-1d58c4a85179.png)
 
Para confirmar que todo ha salido correctamente y verificar que el directorio 'tmp' está en PATH:

    echo $PATH
           

![Captura de pantalla -2022-04-25 15-40-24](https://user-images.githubusercontent.com/103068924/165100883-46db8497-56b3-4782-9343-7d6947b4a26d.png)

Ahora, volvemos a ejecutar 'bugtracker' desde el directorio '/tmp':

![Captura de pantalla -2022-04-25 15-46-04](https://user-images.githubusercontent.com/103068924/165101887-a7662ee4-3c1a-4a84-8302-cdd067ca5e3b.png)

Genial, ya estamos registrados como 'root'. Finalmente, nos dirigimos al directorio '/root' donde encontramos el archivo 'root.txt.'.

Para poder leer el archvio nos registramos como super usuarios:

    sudo su
          
Y abrimos el archivo con 'cat' donde encontramos la última Flag:

    cat root.txt
          
 
 ![background2](https://user-images.githubusercontent.com/103068924/165103059-55b4a1b6-f646-46aa-8b5a-47a804187541.png)

 
          
