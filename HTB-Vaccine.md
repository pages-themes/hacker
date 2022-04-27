![vaccine_banner](https://user-images.githubusercontent.com/103068924/165231176-ea7b6551-bdd2-4f3a-a5ba-5117de037506.png)

![Captura de pantalla -2022-04-26 08-13-51](https://user-images.githubusercontent.com/103068924/165234105-c74265cb-61e5-4ae5-abe7-0ee2dd77343d.png)

# HTB-Vaccine

Resolución del starting poing de Hack the Box Vaccine.

## Fase de Reconocimiento:

### Ping:

![Captura de pantalla -2022-04-26 08-15-05](https://user-images.githubusercontent.com/103068924/165234174-ecb99114-7e36-4198-920b-d2b20f0397fd.png)

En primer lugar, vamos a comprobar si tenemos conexión con la máquina. Y si podemos averiguar el sistema 
operativo que utiliza mediante el ttl.

    ping [Ip Víctima]

Podemos observar que tiene un ttl=63, por tanto, ya sabemos que estamos frente a una máquina Linux.

### Nmap - Primer escaneo:

Ahora podemos escanear los puertos mediante nmap.
  
    nmap -p- --open -T5 -n -v [Ip Víctima] -oG allPorts
    
Esto nos guardará los puertos abiertos en el archivo 'allPorts' por si posteriormente queremos revisarlos 
de manera rápida accediendo al archivo guardado en nuestro directorio mediante la herramienta 'extractPorts'.

![Captura de pantalla -2022-04-26 08-27-45](https://user-images.githubusercontent.com/103068924/165235713-58183ec0-1a5a-47c7-bc14-280e3c01a3e5.png)

Puedes encontrar la descripción y la herramienta extractPorts creada por S4vitar en mi repositorio: 
 [ExtractPorts](https://f1r0x.github.io/ExtractPorts.html)
 
 ![Captura de pantalla -2022-04-26 08-28-45](https://user-images.githubusercontent.com/103068924/165235873-224f1a07-302a-44f8-9a98-1ed1fe43b982.png)
 
 Es este caso podemos observar los puertos 21, 22 y 80 abiertos por el protocolo TCP.
 
### Nmap -Segundo escaneo:

Ahora pasaremos a realizar un escaneo más exhaustivo utilizando una serie de scrips de reconocimiento:

 ![Captura de pantalla -2022-04-26 08-32-53](https://user-images.githubusercontent.com/103068924/165236651-4c5809ad-145d-46a0-8633-a73f39a7cc16.png)

    nmap -sC -sV -v -p21,22,80 [Ip Víctima] -oN target
    
 -sC : Lanza scrips básicos de reconocimiento.
 
 -sV : Localiza la versión y servicio de los puertos
       definidos. 
       
 -p : Puertos a escanear.    Ej:  -p21,22,80
 
 -oN : Reporta los resultados en formato nmap al archivo
       targed.
       
![Captura de pantalla -2022-04-26 08-33-37](https://user-images.githubusercontent.com/103068924/165236706-0e296151-667e-416a-aa1f-7ce1736086e7.png)

Este escaneo, al igual que el anterior, nos guardará los resultados en nuestro directorio en el archivo 'target'.
Para abrir este archivo podemos utilizar el comando 'cat'.

### Recopilación de los resultados:

- Puerto 21/tcp:

Algo interesante que podemos observar en el reporte de nmap es que el puerto 21/tcp permite el acceso mediante
el inicio de sesión Anonymous. Este inicio de sesión por defecto nos permite entrar con el usuario 'anonymous'
y sin necesidad de utilizar contraseña.

También podemos observar que se encuentra un archivo disponible 'backup.zip'.

- Puerto 22/tcp:

Aquí podemos ver que tenemos un servicio ssh activo, usando un sistema Ubuntu.

- Puerto 80/tcp: 

El puerto 80 tiene un servicio http activo, el cual, si nos dirigimos a firefox, podemos ver que nos reporta
hasta una página de registro:

![Captura de pantalla -2022-04-26 08-50-57](https://user-images.githubusercontent.com/103068924/165239253-c94d3b6a-b2eb-40d3-b146-a856f5a25a7c.png)

![Captura de pantalla -2022-04-26 08-51-56](https://user-images.githubusercontent.com/103068924/165239453-047552e4-a3da-4c9e-b7c0-1664b3d61ba8.png)

Tras probar los usuarios y contraseñas más comunes no conseguimos entrar, por tanto, seguiremos investigando.

En primer luegar, vamos a tratar de acceder como el usuario 'anonymous' por el puerto 80 que utiliza un servicio FTP
y descargar el archivo 'backup.zip'.

Para ello emplearemos el comando 'ftp' y especificando el usuario 'anonymous', luego nos pedirá una contraseña,
como este usuario no requiere de contraseñas, simplemente presionamos Enter.

    ftp [Ip Víctima]
    
![Captura de pantalla -2022-04-26 09-05-06](https://user-images.githubusercontent.com/103068924/165241789-d74af7bc-e2d4-447e-a14d-bb9ba38c8c62.png)

Ahora, mediante un 'ls' o un 'dir', vamos a tratar de ver que archivos encontramos:

![Captura de pantalla -2022-04-26 09-08-17](https://user-images.githubusercontent.com/103068924/165242129-6e01a7d9-8a34-4830-8d2d-fc048d9cb36b.png)

En mi caso no me permite ejecutar ninguno de los dos comandos. Pero como podemos ver nos reporta que consideremos
utilizar PASV. Para ello, debemos activar el modo pasivo:

    passive

![Captura de pantalla -2022-04-26 09-32-35](https://user-images.githubusercontent.com/103068924/165246354-7861cf17-7af4-46c5-aebf-27b9f840e97f.png)

Tras activar el modo activo ya podremos utilizar el comando 'ls':

![Captura de pantalla -2022-04-26 09-33-33](https://user-images.githubusercontent.com/103068924/165246513-1911dca6-689c-44c5-8276-04b01aab9b4d.png)

Podemos ver que tenemos aquí el archvivo 'backup.zip'. Para tratar de descargarlo utilizaremos el comando 'get'.
Recordar que podeis ver todos los comandos disponibles dentro se la shell de ftp utilizando el comando 'help'.

![Captura de pantalla -2022-04-26 09-37-02](https://user-images.githubusercontent.com/103068924/165247149-0af2a731-576c-45dd-9485-49d4e640cb10.png)

Para descargar el archivo.zip:

    get backup.zip

![Captura de pantalla -2022-04-26 09-39-21](https://user-images.githubusercontent.com/103068924/165247598-bf683380-5a76-4d0d-9859-c331c7d253f4.png)

Tener en cuenta que la shell está es muy inestable, en caso de error o de reportaros un 'Not Service' cerrar la shell
con el comando 'exit' y volver a iniciar la shell siguiendo todos los pasos de manera continua, ya que a los pocos 
minutos, se desconecta.

Una vez descargado el archivo.zip, cerramos la shell ftp y nos derigimos al directorio donde hemos descargado el 
arhcivo 'backup.zip'.

![Captura de pantalla -2022-04-26 09-44-48](https://user-images.githubusercontent.com/103068924/165248630-8bfff5ae-d750-441f-bedd-064368a699b0.png)

Como podeís ver, tenemos los dos archivos previamente creados con nmap (allPorts y target) y nuestro archivo .zip.
Vamos a crear un directorio mediante 'mkdir' llamado 'Backup' y vamos a introducir el archivo .zip para luego tratar
de descomprimirlo.

    mkdir Backup
    
    mv backup.zip ./Backup/
    
Una vez dentro del nuevo directorio, aplicaremos el comando 'unzip' para tratar de descomprimirlo:

    unzip backup.zip
    

![Captura de pantalla -2022-04-26 09-52-39](https://user-images.githubusercontent.com/103068924/165250029-0c343ba8-29ae-446e-91e7-87b7b2160eff.png)

Al intentar descomprimir el archivo nos pide una contraseña, como desconozco la contraseña, presionado 'Enter'
podemos ver como nos reporta que dentro del .zip contiene dos archivos (index.php y style.css):

![Captura de pantalla -2022-04-26 09-57-17](https://user-images.githubusercontent.com/103068924/165250925-0f1270d2-0200-426e-9f64-8c475f88bfde.png)

Como desconocemos la contraseña, vamos a utilizar la herramienta John the Ripper para tratar de descifrarla. En 
caso de no tener la herramienta instalada o queráis leer más sobre ella podréis encontrarlo en el siguiente enlace:

[John the Ripper](./john_the_ripper.html)

### John the Ripper:

Nos posicionamos en el directorio donde se encuentre el archivo backup.zip:

![Captura de pantalla -2022-04-26 11-34-30](https://user-images.githubusercontent.com/103068924/165270196-a2119a6d-fbf6-4446-abcc-8b80574b37ef.png)

En primer lugar, vamos a extraer el hash del archivo 'backup.zip', para ello utilizaremos el comando zip2john y 
guardaremos los resultados en un archivo nuevo que llamaremos 'hash1':

    zip2john 'backup.zip' > hash1
    
![Captura de pantalla -2022-04-26 11-35-49](https://user-images.githubusercontent.com/103068924/165270443-5ec033b6-43b8-4b81-97aa-a851d3fc2118.png)

Como podemos ver, se nos ha generado un nuevo archivo en nuestro directorio actual con el nombre de 'hash1'.

![Captura de pantalla -2022-04-26 11-38-15](https://user-images.githubusercontent.com/103068924/165270953-0592de7a-bf31-4e9b-b64c-3c65a8c3cd98.png)

Mediante 'cat' podemos ver su contenido, el hash extraído del archivo .zip.

    cat hash1
    
![Captura de pantalla -2022-04-26 11-39-08](https://user-images.githubusercontent.com/103068924/165271131-4fae266f-0d0e-4caa-87ec-3da52138de98.png)

Perfecto, ya tenemos nuestro hash listo para explotarlo, ahora mediante la herramienta John, vamos a tratar de
descifrar el 'hash' mediante un diccionario de fuerza bruta llamado rockyou.txt. Rockyou.txt es un diccionario
con más de 14 millones de contraseñas, el cual se puede encontrar por internet en distintos repositorios.

Es aconsejable alojar el archivo rockyou.txt en la ruta '/usr/share/wordlists/'.

Para ejecutar el ataque por diccionario con John, utilizaremos la variable '--wordlist' especificando la ruta del 
diccionario, y luego, también especificamos el archivo que queremos tratar de descifrar, en nuestro caso 'hash1':

    john --worlist=/usr/share/wordlists/rockyou.txt hash
     
![Captura de pantalla -2022-04-26 11-49-04](https://user-images.githubusercontent.com/103068924/165273100-baee1cfa-ed29-4ab1-beeb-a2cb3f2c66fb.png)

Como podemos ver, la herramienta John enseguida nos reporta que ha procesado 1 contraseña y que no quedan más hashes
que crackear.

Para poder ver la contraseña simplemente utilizamos John con la variable '--show' y especificar el archivo.

    john --show hash1
    
![Captura de pantalla -2022-04-26 11-55-53](https://user-images.githubusercontent.com/103068924/165274505-6168b701-cc37-4810-b0c1-0cab72b0ed91.png)

Ahora ya podemos copiar la contraseña y descomprimir el archivo .zip:

    unzip backup.zip
    

![Captura de pantalla -2022-04-26 11-59-18](https://user-images.githubusercontent.com/103068924/165275309-2f069ecc-67b7-47db-8f67-cff6f646babd.png)

Y podemos ver como ya tenemos los archivos index.php y style.css en nuestro direcctiorio:

![Captura de pantalla -2022-04-26 11-59-37](https://user-images.githubusercontent.com/103068924/165275404-435b6409-55fc-451c-bc57-c575d86991d7.png)

### Revisión del código fuente:

Tras revisar el archivo index.php, podemos ver como es una copia del código fuente de la página de inicio de sesión
anterior. 
Pero si nos fijamos, incluye unas líneas adicionales. Para ver el código fuente podemos abrir el archivo
index.php mediante 'cat' o dirigirnos a la url http://[Ip Víctima]/index.php (la página es visualmente es igual) y
con clic derecho sobre la página y 'ver código fuente'.

    cat index.php
    
![Captura de pantalla -2022-04-26 12-08-50](https://user-images.githubusercontent.com/103068924/165276973-60275a49-325c-4973-92d7-366a8dbb3faf.png)

El apartado que a nosotros nos interesa es el 'session_start', donde nos reporta un nombre de usuario 'admin' y un
hash de una contraseña.

![Captura de pantalla -2022-04-26 12-11-16](https://user-images.githubusercontent.com/103068924/165277394-c9f38ef0-efa2-4d65-8906-1b5d6a757b5c.png)

Para trabajar de manera más cómoda, crearemos un archivo llamado credentials.txt y guardaremos el usuario(admin) y
el hash encontrados.

    nano credentials.txt
    
![Captura de pantalla -2022-04-26 12-22-18](https://user-images.githubusercontent.com/103068924/165279384-03afa789-3a37-4376-8538-507d32c9a2c6.png)

Guardamos (Cntrl + o) y salimos (Cntrl + x).

![Captura de pantalla -2022-04-26 12-23-11](https://user-images.githubusercontent.com/103068924/165279549-74cbfada-16e8-4eac-9ef6-f29a9bc6fd44.png)

## Identificar algoritmo del Hash

### HashID: 

Tenemos un hash, pero aún no sabemos en qué tipo de algoritmo está basado. Para saberlo, utilizaremos la herramienta 
Hashid, la cual nos reportará el tipo de algoritmo más probable que se utilizó en su día para crear ese hash a 
partir de una contraseña.

Podéis encontrar más información aquí: [HashID](./HashId.html)

Para instalar la herramienta:

    sudo apt install hashid
    
Para ejecutarla:

    hashid [Hash Núm]

    hashid 2cb42f8734ea607eefed3b70af13bbd3

![Captura de pantalla -2022-04-26 12-33-14](https://user-images.githubusercontent.com/103068924/165281291-c32d3c2a-5ab4-441e-bb04-81190b786114.png)

Según la herramienta HashId el algoritmo de nuestro hash es un MD2, MD5 o MD4. Recordar que la aplicación nos
reporta los más probables, en ocasiones el primero en reportar no es el correcto. Para contrastar esta información
voy a mostraros otra herramienta que sirve para lo mismo, pero es un poco más precisa.

### Hash-Identifier:

Está herramienta hace básicamente lo mismo que HashId, nos reporta el algoritmo del hash deseado, con la diferencia
de que Hash-Identifier es algo más precisa a la hora de reportar los resusltados.
Podéis encontrar más información aquí: [Hash Identifier](./Hash-Identifier.html)

Para instalar:

    sudo apt install hash-identifier
    
 ![Captura de pantalla -2022-04-26 19-59-02](https://user-images.githubusercontent.com/103068924/165363111-7e273a59-44e3-4704-a4e8-67df02f36a22.png)

Para ejecutarlo:

    hash-identifier
   
![Captura de pantalla -2022-04-26 20-01-03](https://user-images.githubusercontent.com/103068924/165363442-be95e169-8cfe-49a1-813c-1176cac2a472.png)

Vemos como se nos despliega una interfaz gráfica donde pegaremos el hash que queremos analizar.

![Captura de pantalla -2022-04-26 20-04-12](https://user-images.githubusercontent.com/103068924/165363897-b100c21f-6d40-4f3f-bf24-4bdb4d763a16.png)

![Captura de pantalla -2022-04-26 20-05-15](https://user-images.githubusercontent.com/103068924/165363916-d09f8190-f21d-44ef-9c96-64180c87f0f0.png)

Una vez analizado el hash, vemos como en la parte superior nos reporta los algoritmos, en este caso MD5.

![Captura de pantalla -2022-04-26 20-04-59](https://user-images.githubusercontent.com/103068924/165364101-b7bf0c4b-99ca-4c02-93e3-fdbef75c8ff8.png)

Perfecto, ya tenemos un hash y conocemos el algoritmo en el que esta basado. El siguiente paso será crackear el hash.
Para ello, vamos a ver dos formas de crakear un hash, en primer lugar utilizaremos la herramienta HashCat.

## Crackear Hash

### HashCat:

[HashCat](./HashCAt.html) es un descifrador de contraseña popular y eficaz. Mediante esta herramienta trataremos de descifrar el hash, en  primer
lugar, crearemos un arhivo llamado `hash2` donde guardamos el hash a descifrar.

Para crear el archivo:

    echo 'Número de Hash' > hash2
    
En caso de no tener instalado HashCat:

    sudo apt install hashcat
    
Ahora debemos asegurarnos que tenemos el diccionario `rockyou.txt` en el direcctorio `/usr/share/wordlists/`.
Podemos descargarnos o copiar el diccionario `rockyou.txt` en el siguiente enlace:
https://www.kaggle.com/datasets/wjburns/common-password-list-rockyoutxt
    
Bien, ya lo tenemos todo preparado para ejecutar HashCat, para ello, ejecutamos el siguiente comando:

    hashcat -a 0 -m 0 'Número Hash' /usr/share/wordlists/rockyou.txt

-a : Attack-mode. El 0 representa el modo 'Straight'.

-m : Hash-type. El 0 representa MD5. Esto lo podemos ver con el comando ´hashcat --help´.

hash2 : Nombre del archivo que contiene el hash que queremos descifrar.

rockyou.txt : Es un diccionario con más de 14 millones de contraseñas y hashes.


Como podemos ver, Hashcat descifró la contraseña: qwerty789

## Acceso al Sistema:

Ya conocemos un usuario ´admin´ y una contraseña ´qwerty789´, con esta información vamos a volver a la página web donde nos 
aparecia una pagina de inicio de sesión y vamos a tratar de acceder utilizando estos datos.

Genial, podemos ver como tenemos acceso como el usuaio ´admin´.

Tras revisar el contenido de la página, vemos como el tablero no reporta nada especial, sin embargo, nos muestra un catálogo que
podría estar conectado con la base de datos.

Vamos a tratar de realizar algunas consultas y ver que ocurre:

Al verificar la URL, podemos ver que hay una variable ´$search´ que es responsable de buscar en el catálogo.

Tras ver esto, vamos a probar si es vulnerable a una inyeccion SQL, se puede hacer manualmente, pero para facilitarnos el trabajo
usaremos una herramienta llamada ´Sqlmap´.

## SQLMAP

SQLmap es una herramienta de código abierto utilizada en pruebas de penetración para detectar y explotar fallas de inyección SQL. SQLmap automatiza
el proceso de detección y explotación de inyección SQL. Los ataques de inyección de SQL pueden tomar el control de las bases de datos que utilizan SQL.
 
Viene preinstalado con Parrot OS y Kali Linux, sin embargo, puede instalarlo a través del repositorio si no lo tiene:

    vsudo apt install sqlmap
    
    
 
 
        
