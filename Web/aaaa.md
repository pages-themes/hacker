# Gestión de permisos en Linux.

Si hay un aspecto que destaca de Linux respecto a otros sistemas, como Windows, es la seguridad. Y no solo hablamos de vulnerabilidades
y privacidad, sino también de la forma en la que gestiona los archivos personales de sus usuarios. ``Cada archivo y cada carpeta cuenta
con unos permisos definidos, sin los cuales nadie podrá acceder al archivo en cuestión``. Y, si estamos aprendiendo a usar Linux, los 
permisos es uno de los aspectos que debemos conocer y aprender.

El sistema de archivos que utiliza Linux es mucho más avanzado, y a la vez sencillo, que el que utilizan otros sistemas, como Windows. Este se 
basa en especificar si el propietario, el grupo de usuarios o cualquiera puede leer, escribir o ejecutar el archivo. Sin duda, es una forma muy 
eficaz de mantener a cada usuario del sistema controlado, evitando que este pueda acceder a los datos de los demás sin permiso.

# ¿Qué son los permisos en Linux?

Los permisos ``son la manera de restringir las funciones que un usuario tiene permitido realizar sobre un archivo``.
Los tres parámetros básicos que se regulan a través de los permisos son la ``lectura(r)``, la ``escritura(w)`` y la ``ejecución(x)`` de los archivos.

A cada archivo se aplican estos permisos y cada archivo tienen divididos estos permisos en tres secciones, una para los ``Usuarios``, otra para los
``Grupos`` y una para ``Otros``. Dentro de cada uno de estos se especifican cuáles de los tres permisos se aplican.






La estructura básica de los permisos es:

    ---/---/---
    
    Usuarios/Grupos/Otros
    
Son tres niveles (Usuarios/Grupos/Otros) y dentro de cada uno especificaremos los permisos:

    LecturaUsuario,EscrituraUsuario,EjecuciónUsuario / LecturaGrupos,EscrituraGrupos,EjecuciónGrupos / LecturaOtros,EscrituraOtros,EjecuciónOtros  


# ¿Gestión de permisos en Linux?

Podemos especificar si queremos aplicar estos permisos de manera independiente entre Usuarios, Grupos y Otros: 

``Usuario:`` Eres Tú, por ejemplo, cuando inicias tu sistema Linux. Ingresas al iniciar sesión con el usuario que creaste, ese nombre de usuario se
puede usar como el “propietario” de un archivo y corresponde a este tipo: “usuario”.

``Grupo:`` Es el grupo al que pertenece el archivo y cualquier usuario que pertenezca a ese grupo (incluido tal vez el usuario) tiene los permisos
asignados sobre ese archivo.

``Otros:`` Se refiere a cualquier otro usuario que no corresponda al “usuario” ni al “Grupo”, incluso aquellos que no son usuarios del sistema
como por ejemplo un usuario anónimo que lee un archivo por medio de una página web (y que accede desde fuera, por internet) tiene que tener
permisos para poder leer ese archivo, este usuario anónimo corresponde a este tipo: “otros”

# Tipos de permisos en Linux.

 A su vez, cada uno de estos niveles puede tener 3 valores diferentes en función del grado de privilegios que especifiquemos en el sistema. Estos
 valores podemos especificarlos por las siguientes letras:

``r:`` Permiso de lectura (permite abrirlo, copiarlo, etc).
``w:`` Permiso de escritura (permite modificarlo, borrarlo, etc).
``x:`` Permiso de ejecución (si es binario, permite ejecutarlo).

Los permisos en Linux se pueden reflejar tanto con letras como con números. Ambas formas son correctas e igual de funcionales. Sin embargo, lo más
intuitivo son las letras, ya que nos permiten comprender mejor de qué permiso se trata. Los números son más usados por usuarios avanzados, al ser
más rápido de especificar.

# ¿Cómo ver los permisos de un archivo?

Podemos ver los permisos que tiene los archivos situados en el directorio actual utilizando el comando ``ls -l``.

En el siguiente ejemplo, podemos ver con ``ls`` que dentro del directorio existe el archivo ``prueba1.txt``:

![Captura de pantalla -2022-09-26 00-16-26](https://user-images.githubusercontent.com/103068924/192168621-e73775d2-4c6a-4f63-b952-1562f0eba30b.png)

Para poder ver sus permisos simplemente añadimos la opción ``-l`` al comando ``ls``. Ahora vemos como nos reporta mucha
más información que antes:

![Captura de pantalla -2022-09-26 00-17-20](https://user-images.githubusercontent.com/103068924/192168403-7dd48e02-e6a2-4e11-b47c-a56f12dd06ba.png)

En primer lugar nos muetra el tipo de archivo y sus permisos:

![Captura de pantalla -2022-09-26 00-17-39](https://user-images.githubusercontent.com/103068924/192168531-14e37480-b619-4f8e-b012-4cd8d6c55557.png)

Seguido nos muestra el ``nombre del propietario`` del archivo y del ``grupo``, el tamaño del archivo y su fecha
de creación. El tema de los usuarios y los grupos lo iremos desarrollando poco a poco más adelante.

Cada archivo o carpeta que nos encontremos al listar el contenido de un directorio irá indicado con un símbolo:

``–``o ``.``: Indica que se trata de un archivo.
``d``: Indica que se trata de un directorio.
``l``: Indica que se trata de un enlace (acceso directo, por ejemplo).

Seguido veremos los tres niveles de permisos. Los permisos están definidos por las letras (r,w,x) y cuando el permiso no está aplicado se sustituye la
letra por ``-``.

















---


# Formatear/Borrar Windows 10 por Completo:

Existen varias formas de formatear el sistema en Windows o de volver a una copia de seguridad realizada en el pasado. No obstante, no 
son las formas más seguras, ya que mucho malware se aloja en las carpetas y en los archivos que se ocupan de reinstalar o volver a un 
punto anterior.

La solución es borrar por completo todo lo que hay dentro del sistema y volver a instalar otro sistema operativo, de esta manera no arrastraremos 
ningún malware que nos haya infectado en el pasado. El nuevo sistema lo tendremos que instalar vía UBS o cd y asegurarnos de que la fuente
de descarga es la oficial del sistema.

El siguiente paso será borrarlo todo, obviamente si existen archivos que queráis conservar tendréis que guardarlos previamente 
en algún USB o disco duro. 

Para borrarlo todo, simplemente tendremos que ejecutar el UBS con el nuevo sistema, acceder a la BIOS y ejecutar el PC 
para que arranque desde el USB con el sistema nuevo.

Una vez se inicie la instalación, nos mostrará los discos duros o espacio de almacenamiento del PC y donde queremos instalar el nuevo 
sistema. Aquí es donde borraremos todo lo existente en nuestro ordenador, debemos formatear todos los discos que nos muestre dejándolo
completamente vacío. Una vez formateado todo ya podremos proceder a la instalación del nuevo sistema operativo (o del mismo en caso de
que solo queramos sanearlo).

Existen varios métodos para preparar nuestro USB booteable. Windows por ejemplo, nos facilitará el sistema operativo y un programa para
preparar el USB (a prueba de tontos), tan solo hay que seguir las instrucciones y en cuestión de minutos tendremos nuestro USB booteable
con nuestro nuevo Windows.

Para instalar distribuciones basadas en Linux y Unix suelo utilizar el programa Ventoy.


# Como acceder a la BIOS en Windows 10

Existen dos formas genericas de acceder a la BIOS de nuestro sistema, una será particular de cada marca y se accedera tras realizar el arranque
de la compurtadora, pulsado normalte F2 (suele aparecer escrito durante la carga del sistema una vez encendemos el pc) accederemos directamente
a la BIOS. Esto lo podemos realizarlo aún que no tengamos ningún sistema operativo instalado.

La segunda manera de acceder a la BIOS es desde el mismo Windows10, simplemente nos dirigimos al buscador del sistema y escribimos BIOS, nos 
aparecera la opción ``Cambias opciones avanzadas de inicio``, una vez dentro, veremos la opción de ``Inicio avanzado`` y pulsamos ``Reiniciar ahora``,
esto reiniciara el sistema entrando automaticamente en la BIOS.











