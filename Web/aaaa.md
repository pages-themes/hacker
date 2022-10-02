# Instalar Archivos .SH en Linux

Muchos programas utilizan como archivo de instalación un ``.SH``, lo suelen llamar ``install.sh`` o algo por el estilo.

Primero tendremos que darles permisos de ejecución al archivo .SH:

    sudo chmod +x archivo.sh
    
Luego simplemente ejecutamos el instalador:

    ./archivo.sh



# Configuración de Parrot en VirtualBox:

Está es la configuración básica que se utiliza para configurar Parrot en VirtualBox, cabe destacar que se puede realizar modificaciones en funcion del equipo
en el que lo instalemos. En un ordenador más potente podremos añadir más capacidad y mejor rendimiento.

En primer lugar, abrimos el VirtualBox y creamos una nueva máquina:

![Captura de pantalla 2022-09-28 020947](https://user-images.githubusercontent.com/103068924/192658885-e6ee03a5-64f0-4776-aedc-79037af7df6c.png)

Especificamos un nombre para la máquina, en este caso la llamaremos ``Parrot``, luego en Carpeta de máquina, dejamos la ruta por defecto.

![Captura de pantalla 2022-09-28 020643](https://user-images.githubusercontent.com/103068924/192658811-8a93db5d-42ef-45df-95a9-77a98bcc3761.png)



### Configuración de Parrot una vez instalado:

Abrimos una Terminal y nos registramos como ``root```, para ello escribimos el comando siguiente:

    sudo su
   
![Captura de pantalla 2022-09-28 023902](https://user-images.githubusercontent.com/103068924/192661776-c625436d-e4dd-4c29-8a0b-500f24bca67d.png)
    
Nos pedirá la contraseña, está contraseña es la misma que hemos especificado durante la instalación.    
Una vez estemos como ``root``, realizaremos un ``apt update`` para actualizar el sistema:

    apt update
    
![Captura de pantalla 2022-09-28 023943](https://user-images.githubusercontent.com/103068924/192661845-3493740c-ae69-492d-b36b-258a5c8e0811.png)

Nota: Nunca realiceis un ``apt upgrade`` en Parrot. Este comando es utilizado en sistemas basados en Debian
para actualizar todos paquetes que tengan una nueva versión. En Parrot creará conflictos en sus librerias y
a la larga nos dará problemas al ejecutar muchas aplicaciones.

En caso de querer actualizar en Parrot todos los paquetes a la última versión, Parrot tiene su propio
comando para realizr el upgrade:

    parrot-upgrade

![Captura de pantalla 2022-09-28 024757](https://user-images.githubusercontent.com/103068924/192662666-3ce9a614-0bdc-4474-bbcd-1fe1f5af4086.png)

Ahora vamos a proceder a instalar algunas herramientas y librerias, para que sea más fácil, se han compactado
todos los archivos que vamos a intalar en un solo comando. Para instalarlos simplemete copia el siguiente comando y ejecutalo:

    apt install build-essential git vim xcb libxcb-util0-dev libxcb-ewmh-dev libxcb-randr0-dev libxcb-icccm4-dev libxcb-keysyms1-dev libxcb-xinerama0-dev libasound2-dev libxcb-xtest0-dev libxcb-shape0-dev

![Captura de pantalla 2022-09-28 032346](https://user-images.githubusercontent.com/103068924/192666282-1e93eac5-2d31-4369-987b-cbd272e9d855.png)

No pedirá una confirmación, aceptamos escribiendo ``S`` y pulsado ``Enter``.

![Captura de pantalla 2022-09-28 032413](https://user-images.githubusercontent.com/103068924/192666361-6f8caead-20d3-4e2d-8d73-b2ebcbf00a29.png)

![Captura de pantalla 2022-09-28 032736](https://user-images.githubusercontent.com/103068924/192666783-5c1663b2-d469-48ac-91f0-a89676d19311.png)

Si todo a salido bien veremos un reporte final como el de la imagen anterior. Ahora volvemos a realizar
otro ``apt update``, por si queda algún paquete por instalar:

    apt update
    
Y con esto ya tendríamos el sistema listo y actualizado. Está es la isntalación básica del sistema en la que
se traba desde una Interfaz gráfica parecida al estilo de Windows con sus carpetas, su barra de tareas, etc.

El siguiente paso, sería preparar nuestro entorno de trabajo para poder operar de manera eficiente utilizando
como base un interprete de comandos y no una interfaz gráfica.

Esto lo veremos en el artículo de ``configuración de un entorno de trabajo en Parrot``.

# Instalar BSPWM y SXHKD:

En primer lugar debemos de descargarnos los siguientes repositorios, recomiendo ir al direcotior Descargas
y descargarlos ahí:

 git clone https://github.com/baskerville/bspwm.git
 git clone https://github.com/baskerville/sxhkd.git

Ahora debemos de entrar en cada uno de los directorio creados ``bspwm`` y ``sxhkd`` y ejecutar el comando
``make`` para montar la isntalción y ``sudo make install`` para iniciar la instalción. Esto debemos de 
realizarlo en los dos directorios.

    cd bswpm 
    make 
    sudo make install 
    cd.. 
    cd sxhkd  
    make 
    sudo make install 

Una vez finalizado instalamos el ``bspwm`` ejecutando els siguiente comando desde el directorio ``Descargas``:

    sudo apt install bspwm



# Requisitos mínimos del sistema para la instalación de Kali o Parrot:

Para ejecutar Parrot o Kali con normalidad los documentos oficiales indican los siguientes requerimientos:

* ``Espacio en disco duro``: 20 GB
* ``Memoria RAM``: 1 GB mínimo 2 o más recomendado
* ``Hardware y periféricos``: Unidad óptica y puerto(s) USB

En cuanto al procesador no hay requerimientos precisos, Kali soporta arquitecturas ARM, i386 y x64.
En general puede decirse cualquier procesador moderno es capaz de ejecutar esta distribución.

Aunque Parrot y Kali, al igual que muchas otras distribuciones no es muy exigente en cuanto a hardware, algunas herramientas como las de auditoria de redes
requieren que la tarjeta de red wifi pueda cambiarse de modo (por ejemplo modo monitor o promiscuo). 



# Como instalar Kitty

Para instalar la ``kitty`` desde la terminal ejecutamos el siguiente comando: 

    sudo apt install kitty -y

Una vez instalada nos dirigimos al archivo ``sxxhkdrc`` que se encuentra en el directorio
``/home/user/.config/sxhkd/sxhkdrc`` y dentro de este archivo tendremos que modificar el 
apartado ``terminal emulator`` y cambiar ``urxvt`` por ``kitty``.

Podemos modificar el archivo utilizando la herramieta ``nano``:

    nano sxhkdrc

![Captura de pantalla 2022-09-28 043752](https://user-images.githubusercontent.com/103068924/192675024-25e8efff-7b18-4dbe-a5b0-cc63f36e53e4.png)

![Captura de pantalla 2022-09-28 043700](https://user-images.githubusercontent.com/103068924/192675008-07a12df8-db17-4f0f-a9fe-1f3885650533.png)

![Captura de pantalla 2022-09-28 043843](https://user-images.githubusercontent.com/103068924/192675098-afcad7ea-50ad-4151-b073-f9e54ac855bb.png)

Pulsamos ``Ctrl + o`` para guarda y ``Ctrl + x`` para salir.



# Instalar Bundler para modificar Jekyll GitHub pages.

Instalar Bundler:

    sudo apt install bundler

Actualizar Bundler:

    bundle update

## Modificar Archivos en Local y publicar modificaciones. 

En primer lugar debemos descargarnos el repositorio donde hemos creado nuestra web con Jekyll. Da igual la plantilla utilizada siempre 
y cuado este basada en Jekyll. Para descargar el repositorio utilizamos el comando siguiente:

    git clone [URL del Repositorio_Github_pages]

Para mostrar nuestra web en local, desde el directorio principal del repositorio, ejecutamos el siguiente comando:

    bundle exec jekyll serve

Una vez establecida la conexión, nos reportará un mensaje del puerto que podemos utilizar para ver la web en local, por lo general suele utilizar 
el puerto 4000. Para ver la página, vamos a culquier navergador (Chrome, Firefox, etc) y escribimos ``localhost:4000``. Si todo está configurado
correctamente deberíamos de ver nuestra página web. 

Esto es una manera muy práctica de trabajar ya que nos mostrará los cambios al instante, sin tener que esperar a que el servidor lo cargue, tambien
permite trabajar con los archivos sin disponer de internet y otra ventaja es que no tendremos que estar refrescando la página constantemente, publicando
directamente trabajos ya terminados.

Para publicar los archivos una vez los hemos modificado debemos ejecutar los siguientes comandos:

    git add ..

Podemos añadir un ``commit`` a nuestra publicación para añadir iformación o una descripción. Para ello, utilizamos el siguiente comando y escribimos
entre las comillas lo que queramos publicar:

    git commit -m 'Publicación Nueva'

Finalmente para subir y puablicar los cambios utilizamos el comando:

    git push

Nos pedira nuestro nombre de Usuario de la cuenta Github y un códido de verificación llamado ``token``, este código debemos de generarlo desde la página de Github.
Para ello nos dirigimos a la página principal de nuestro perfil de Github, nos dirigimos a ``Settings`` y luego a ``Personal access tokens`` y generamos un token
nuevo en ``Generate new token``.

Ya tendríamos nuestros cambios locales publicados en el repositorio de Github.


---

# Capturar o interceptar Peticiones con Burpsuite

Para aplicar este ajuste, en primer lugar debemos de tener el ``Foxyproxy`` enlazado con ``Burpsuite``. Una vez establecido el túner a través del proxy, 
capturamos la petición de la página deseada como hemos visto anteriormente.

Para capturar la petición, con Burpsuite nos dirigimos al apartado ``Proxy`` y luego a ``Inetecept``. Recargamos el navegador con el Foxyproxy activado y ya
deberiamos de tener la petición capturada. 

# Capturar o interceptar Respuesta a las peticiones con Burpsuite

Como hemos visto anteriormente, podemos capturar las peticiones de una página web con Burpsuite, pero, y si queremos enviar nuestra petición y capturar la
respuesta por parte del servidor? Esto puede ser muy útil a la hora de módificar las peticiones capturadas y ver que respuestas nos reporta el servidor.

Para activar está funcion y poder capturar esas peticiones debemos dirigirnos a ``Proxy``>``Options``>``Intercep Server Responses``  y marcar la casilla 
superior que dice ``Intercep responses based on the following rules:`` y desmarcamos la opcion marcada que dice ``Content type header``.

Ahora simplemente capturamos una petición, como hemos visto anteriomente, pulsamos ``Fordwar`` y nos devolverá la respuesta de nuestra petición.

# Evitar Redirects con Burbpsuite

En oscasiones nos encontraremos páginas con vínculos o redirecciones a otras páginas (código de estado 302), esto suele pasar cuando, en vez de utilizar
 cookies de sesion, nos encontramos con que la página se gestiona a través de redirects.

Con está tecnica evitaremos esas nuevas direcciones, forzando al sistema a devolver un código de estado 200 (código de estado exitoso).En ocasiones al 
aplicar este cambio, podremos ver partes de la página web que antes no eran posibles.

Para aplicar este ajuste, en primer lugar debemos de tener el ``Foxyproxy`` enlazado con ``Burpsuite``. Una vez establecido el túner a través del proxy, 
capturamos la petición de la página deseada con el ``Intercept`` como hemos visto anteriormente.

Realizamos un ``Forward`` y veremos la respuesta. Al tratarse de una redirección, veremos como
el primer parametro ``HTTP/1.1`` nos reporta el código de estado ``302 Found``. Para anular la
redirección debemos cambiar este parámetro por el de ``200 OK``.

![Captura de pantalla -2022-10-03 00-14-38](https://user-images.githubusercontent.com/103068924/193480138-38ffa0f7-586f-466b-aa47-8b4d2a0ffc67.png)

Finalmente aplicamos un ``Forward`` y veremos como en el navegador se nos despliega una página
diferente.

Vamos a tratar de mostrar un ejemplo utilizando la máquina Previse de Hack The Box.

### Ejemplo:

En la siguiente demostración, utilizaremos la máquina Previse de Hack The Box para tratar de mostrar
como una página que nos redirige con un código de estado 302 a una página, nos puede redirigir a 
otra evitando ese redirect y cambiandolo por un código de estado 200. 

En primer lugar, vamos a listar con ``Wfuzz`` los ditintos archivos alojados en el servidor para
ver el código de estado de cada archivo:

![Captura de pantalla -2022-10-02 20-06-45](https://user-images.githubusercontent.com/103068924/193480048-7fbd2ad8-c545-4452-b60f-1b0497e341a1.png)

Para este ejemplo vamos a utilizar dos de los archivos aquí expuestos, podemos ver como el payload 
``status`` nos devuelve un código de estado ``302`` y al introducirlo en el navegador nos redirige
al payload ``login`` que si tiene un código de estado ``200`` y nos reporta una página de registro.

![Captura de pantalla -2022-10-03 00-58-34](https://user-images.githubusercontent.com/103068924/193480093-0eaf88cc-c3f7-471a-8bb5-ded62b22560b.png)

![Captura de pantalla -2022-10-03 00-58-09](https://user-images.githubusercontent.com/103068924/193480099-2098e0bb-dcf5-48fd-beb0-1f2ca8d6a094.png)


Abrimos ``Burpsuite``, configuramos ``Foxyproxy`` y realizamos una captura de la ruta 
``http://10.10.11.104/status.php``:


![Captura de pantalla -2022-10-03 00-13-41](https://user-images.githubusercontent.com/103068924/193480114-79f3d051-c761-46cf-944f-e78ca917f0e0.png)

Ahora aplicamos un ``Fordward``:


![Captura de pantalla -2022-10-03 00-14-17](https://user-images.githubusercontent.com/103068924/193480129-b2160fff-a551-4008-a343-c3d60efb953c.png)

Vemos como arriba de todo nos muestra el código de estado, en este caso un ``302 Found``:

![Captura de pantalla -2022-10-03 00-15-46](https://user-images.githubusercontent.com/103068924/193480154-681bb28b-75b5-4262-9148-3948cf7ae6bb.png)

![Captura de pantalla -2022-10-03 00-16-12](https://user-images.githubusercontent.com/103068924/193480160-606c0fcd-8bb9-44ae-aca7-9c3b862f3833.png)

Cambiamos el código de estado por un ``200 OK``:

![Captura de pantalla -2022-10-03 00-16-48](https://user-images.githubusercontent.com/103068924/193480165-aa24ec95-5c9a-4377-96cf-dc1e0742b3a4.png)

![Captura de pantalla -2022-10-03 00-17-02](https://user-images.githubusercontent.com/103068924/193480172-bf71c479-8abd-43c5-9428-d22f0ac23534.png)

Y realizamos un nuevo ``Forward`` para ver la nueva página:

![Captura de pantalla -2022-10-03 00-17-38](https://user-images.githubusercontent.com/103068924/193480183-d9684f64-381a-41ab-bae9-5f52d8081ac3.png)

Vemos como ya no nos reporta la página de registro, ahora nos muestra una página de información
con el título ``Status``. 


![Captura de pantalla -2022-10-03 01-02-06](https://user-images.githubusercontent.com/103068924/193480200-bb7748cc-d418-4b07-9278-f3f0085e2e65.png)
























