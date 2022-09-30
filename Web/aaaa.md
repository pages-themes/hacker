# Qué es una partición?

Una partición es el nombre que se le da a ``cada división presente en una sola unidad física de almacenamiento de datos``. Para que se entienda, ``tener 
varias particiones es como tener varios discos duros en un solo disco duro físico``, cada uno con su sistema de archivos y funcionando de manera diferente.

Las particiones pueden utilizarse para varios fines. Por una parte, puedes tener una dedicada a guardar datos sensibles con medidas de seguridad que no 
interfieran en el resto del sistema, así como copias de seguridad, aunque también puedes utilizarla para instalar diferentes sistemas operativos. En algunos de 
ellos, como los basados en GNU/Linux, también podrás estructurar el disco en particiones para los diferentes tipos de archivo que utilice el sistema operativo.

Existen tres tipos de particiones, ``las primarias``, las ``extendidas`` o ``secundarias``, y las ``lógicas``. A continuación tienes una descripción sobre cómo es cada una de ellas.

``Partición primaria``: Son las divisiones primarias del disco que dependen de una tabla de particiones, y son las que detecta el ordenador al arrancar, por 
lo que es en ellas donde se instalan los sistemas operativos. Puede haber un máximo de cuatro, y prácticamente cualquier sistema operativo las detectará
y asignará una unidad siempre y cuando utilicen un sistema de archivo compatible. Un disco duro completamente formateado contiene en realidad una partición
primaria ocupando todo su espacio.  

``Partición extendida`` o ``secundaria``: Fue ideada para poder tener más de cuatro particiones en un disco duro, aunque en ella no se puede instalar un
sistema operativo. Esto quiere decir que sólo la podremos usar para almacenar datos. Sólo puede haber una de ellas, aunque dentro podremos hacer
tantas otras particiones como queramos. Si utilizas esta partición, el disco sólo podrá tener tres primarias, siendo la extendida la que actúe como cuarta.  

``Partición lógica``: Son las particiones que se hacen dentro de una partición extendida. Lo único que necesitarás es asignarle un tamaño, un tipo 
de sistema de archivos (FAT32, NTFS, ext2,...), y ya estará lista para ser utilizada. Funcionan como si fueran dispositivos independientes, y
puedes utilizarla para almacenar cualqueir archivo.

# ¿Qué es una partición del sistema EFI?

La partición del sistema EFI (ESP), una pequeña partición formateada con FAT32, suele tener alrededor de 100 MB, aquí es donde se almacenan los 
cargadores de arranque EFI y las aplicaciones utilizadas por el firmware en el sistema durante el inicio. Si su disco duro está en el estilo de partición 
de la tabla de particiones GUID (GPT), generará automáticamente una partición del sistema EFI después de que haya instalado sus sistemas operativos. Se admiten
los sistemas operativos Windows y Mac.

Normalmente no puede ver la partición EFI a través del Explorador de archivos (o Finder para Mac OSX) ya que no tiene una letra de unidad asignada y 
si accidentalmente logra encontrar y eliminar la partición, entonces su sistema no podrá arrancar. Para proteger la partición EFI, Windows intentará 
evitar que la elimine.

# Configuración de discos de almacenamiento en Windows

En el siguiente artículo vamos a ver como administrar los discos de almacenamiento de nuestro sistema. Esto es importante conocerlo ya que de esta 
manera podremos formatear, añadir discos duros, realizar particiones y gestionar los ajustes de casa disco.

Para entrar en el ``Administrador de Discos`` en Windows 10 simplemente escribimos en el buscador de inicio ``Crear y formatear particiones del disco```:

![Captura de pantalla 2022-09-27 114950](https://user-images.githubusercontent.com/103068924/192494620-effa2a8a-4262-45ea-aeb0-8292c559f352.png)

Entramos y nos mostrará el siguiente panel, vuestra pantalla no será igual ya que dependiendo de los discos de almacenamiento y de sus ajustes se nos
representará uno o varios discos.

![Captura de pantalla 2022-09-27 115017](https://user-images.githubusercontent.com/103068924/192495280-e1d5e33a-3596-4c24-98a7-0d42a311a0e4.png)

Vamos a verlo por partes, en primer luegar, podemos ver la barra del menú, tambien algunas acciones, y debajo, cada una de la particiones actuales del
disco e información de cada uno de ellas.

![Captura de pantalla 2022-09-27 112250](https://user-images.githubusercontent.com/103068924/192495430-5993816e-2c72-4baf-b2ce-394963554f78.png)

En primer luegar debemos de aclarar que esto no quiere decir que este equipo disponga de 4 disco duros, lo que dispone es de 4 particiones. Para entenderlo un
disco duro puede tener varias particiones en función de como lo queramo administrar.

En este caso, nuestro equipo dispone de dos discos, ``Disco()```y ``Disco(1)```:

``Disc()``: Este disco cuenta con un total de 931,50 GB.

![Captura de pantalla 2022-09-27 112104](https://user-images.githubusercontent.com/103068924/192497815-d7117f32-0fa6-467d-8aa3-29971a74db63.png)

pero simplemente tiene una partición ``(D:)`` de 488,28GB.

![Captura de pantalla 2022-09-27 112120](https://user-images.githubusercontent.com/103068924/192497878-0af55185-64b3-45d6-891d-3550d73f19cf.png)

El resto al no estár adignado, es espacio que no se está utilizando, pero podemos utilizarlo en un futuro para crear una nueva partición o añadirla y crear una única.

![Captura de pantalla 2022-09-27 112135](https://user-images.githubusercontent.com/103068924/192497944-2d570eeb-e098-4bdb-a592-0b9b0e1f0463.png)

De momento quedate con que en este disco solo hay una partición, que es la que arriba esta representada como ``(D:)``. 

Ahora vamos a ver las tres particiones restantes (``C:``, ``Disco 1 Partición 1`` y ``Disco 1 Particion 4``), estas particiones se encuentran dentro del ``Disco 1``
de 931,50GB, y son las encargadas de funcionamiento básico del sistema de Windwos. Solo con el ``Disco 1`` ya podríamos tener un equipo eficiente, el ``Disco ()``
y sus particiones se añaden para tener mayor almacenamiente en el equipo.

Vamos a ver por parte las tres particiones del ``Disco (1)``:

![Captura de pantalla 2022-09-27 112156](https://user-images.githubusercontent.com/103068924/192499740-fbfba77a-5a66-455f-96a8-b6f6a34f8b6d.png)

``Disco 1 Partición 1``: La partición del sistema EFI (ESP), una pequeña partición formateada con FAT32, suele tener alrededor de 100 MB, aquí es donde
se almacenan los cargadores de arranque EFI y las aplicaciones utilizadas por el firmware en el sistema durante el inicio. 
Normalmente no puede ver la partición EFI a través del Explorador de archivos ya que no tiene una letra de unidad asignada.  


``(C:)``: Es donde guardaremos todos los datos de nuestro equipo, donde tendremos nuestro escritorio y donde guardamos la gran malloria de archivos. Esta partición
esta basado en un sistema de archivos ``NTFS`` y es el estándar obligatorio en los sitemas operativos Windows.  

``Disco 1 Parición 4``: Está partición recibe el nombre de ``partición de recuperación`` ya que es una pequeña partición en su disco duro que puede 
ayudarle a restaurar su Windows o solucionar problemas del sistema.
Esta partición de recuperación es para albergar el Entorno de Recuperación de Windows (WinRE), que puede ser explorado si le asignas manualmente una letra de 
unidad. Si elimina esta partición, no podrá utilizar las opciones de recuperación de Windows.



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

















