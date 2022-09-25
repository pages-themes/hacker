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

Podemos ver los permisos que tiene los archivos situados en el directorio actual utilizando el comando ``ls -l``:

Cada archivo o carpeta que nos encontremos al listar el contenido de un directorio irá indicado con un símbolo:

``–``o ``.``: Indica que se trata de un archivo.
``d``: Indica que se trata de un directorio.
``l``: Indica que se trata de un enlace (acceso directo, por ejemplo).

Seguido veremos los tres niveles de permisos. Los permisos están definidos por las letras (r,w,x) y cuando el permiso no está aplicado se sustituye la
letra por ``-``.


# Formatear/Borrar Windows 10 por Completo:

Existen varias formas de formatear el sistema en Windows o de volver a una copia de seguridad realizada en el pasado. No obstante, no son las formas más seguras, ya que mucho malware se aloja en las carpetas y en los archivos que se ocupan de reinstalar o volver a un punto anterior.

La solución es borrar por completo todo lo que hay dentro del sistema y volver a instalar otro sistema operativo, de esta manera no arrastraremos ningún malware
que nos haya infectado en el pasado. El nuevo sistema lo tendremos que instalar vía UBS o cd y asegurarnos de que la fuente de descarga es la oficial del sistema.

El siguiente paso será borrarlo todo, obviamente si existen archivos que queráis conservar tendréis que guardarlos previamente en algún USB o disco duro. 

Para borrarlo todo, simplemente tendremos que ejecutar el UBS con el nuevo sistema, acceder a la BIOS y ejecutar el PC para que arranque desde el USB con el sistema
nuevo. 

Una vez se inicie la instalación, nos mostrará los discos duros o espacio de almacenamiento del PC y donde queremos instalar el nuevo sistema. Aquí es donde 
borraremos todo lo existente en nuestro ordenador, debemos formatear todos los discos que nos muestre dejándolo completamente vacío. Una vez formateado todo ya
podremos proceder a la instalación del nuevo sistema operativo (o del mismo en caso de que solo queramos sanearlo).

Existen varios métodos para preparar nuestro USB booteable. Windows por ejemplo, nos facilitará el sistema operativo y un programa para preparar el USB (a prueba de 
tontos), tan solo hay que seguir las instrucciones y en cuestión de minutos tendremos nuestro USB booteable con nuestro nuevo Windows.

Para instalar distribuciones basadas en Linux y Unix suelo utilizar el programa Ventoy.










