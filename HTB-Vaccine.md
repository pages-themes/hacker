![vaccine_banner](https://user-images.githubusercontent.com/103068924/165231176-ea7b6551-bdd2-4f3a-a5ba-5117de037506.png)

![Captura de pantalla -2022-04-26 08-13-51](https://user-images.githubusercontent.com/103068924/165234105-c74265cb-61e5-4ae5-abe7-0ee2dd77343d.png)

# HTB - Vaccine

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

Al intentar descomprimir el arhcivo nos pide una contraseña, como desconozco la contraseña, presionado 'Enter'
podemos ver como nos reporta que dentro del .zip contiene dos archivos (index.php y style.css):

![Captura de pantalla -2022-04-26 09-57-17](https://user-images.githubusercontent.com/103068924/165250925-0f1270d2-0200-426e-9f64-8c475f88bfde.png)

Como desconocemos la contraseña, vamos a utilizar la herramienta John the Ripper para tratar de descifrarla. En 
caso de no tener la herramienta instalada o queráis leer más sobre ella podréis encontrarlo en el siguiente enlace:

[John the Ripper](./john_the_ripper.html)









 
 
 
 
        
