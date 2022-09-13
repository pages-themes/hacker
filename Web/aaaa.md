# Qué es un directorio?

En informática, un directorio o ``carpeta`` es un contenedor virtual en el que se almacenan una agrupación 
de archivos informáticos y otros subdirectorios, atendiendo a su contenido, a su propósito o a cualquier criterio que decida el usuario.

En linux los directorios siguen siendo las carpetas de toda la vida, pero en este curso trataremos unicamente la gestión de directorios a traves
de la terminal, ya que nuestra finalidad es poder gestionar cualquier cosa a traves de líneas de comandos.

# Estructura de directorios de Linux

El estándar de jerarquía del sistema de archivos, también conocido como FHS (Filesystem Hierarchy Standard), es la norma creada por la 
comunidad que define los directorios y el contenido de los directorios en los sistemas operativos GNU/Linux y Unix.

GNU-Linux dispone de un sistema de directorios completamente estructurado, coherente y estandarizado obteniendo así las siguiente ventajas:

* El software que tenemos instalado en nuestro ordenador sabe en todo momento las carpetas y los permisos de las carpetas de nuestro ordenador. Por 
  lo tanto nuestro software en todo momento sabe donde encontrar y almacenar la información que necesita para su funcionamiento.
* Los usuarios saben en todo momento el contenido que hay en cada una de las carpetas del ordenador.
* Ayuda a la hora de realizar el mantenimiento de un sistema operativo.
* Ayuda a otorgar los permisos pertinentes a cada uno de los archivos de nuestro sistema operativo.

El estándar de jerarquía del sistema de archivos es flexible y existe cierta libertad a la hora de aplicar las normas. De hecho ciertas distribuciones 
GNU-Linux introducen modificaciones a la estructura de directorios estándar para adaptarla a sus necesidades.

# Directorio Raíz (/)

El directorio raíz, simbolizado por el símbolo (``/``), ``es el directorio principal`` a partir del cual se ramifican todo el resto de directorios.

Por lo tanto, podemos decir que el directorio raíz es el contenedor de nuestro sistema operativo, ya que ``de él nacen el resto de directorios`` que
tendrá nuestro sistema operativo.

![Captura de pantalla -2022-09-13 23-46-29](https://user-images.githubusercontent.com/103068924/190015184-ca69f912-79d4-4162-9e95-7dd90804e897.png)

Como todos los demás directorios o archivos descienden de la raíz, la ruta absoluta de cualquier archivo pasa por la raíz. Por ejemplo, si tienes 
un archivo en ``/home/user/documents``, puedes adivinar que la estructura de directorios va desde ``root->home->user->documents``.


# Tipos de directorio en Linux:

En GNU-Linux existen distintos tipos de directorios. Los distintos tipos de directorios existentes según su uso son los siguiente:

## Directorios compartibles

Los directorios compartidos son aquellos directorios que se pueden acceder desde distintos equipos. Por lo tanto los directorios compartibles son
aquellos que contienen archivos que se pueden usar desde otros equipos.

Algunos ejemplos de directorios compartibles son:

``/var/mail``, ``/opt``, ``/home``, ``/var/www/html``, ``/usr``, etc.

## Directorios no compartibles

Al contrario que los directorios compartibles, los directorios no compartibles son aquellos directorios que no se pueden compartir y su acceso y
modificación están limitados al administrador del sistema. Por lo tanto los directorios no compartibles contienen archivos que solo puedes ser 
accesibles y modificados por el administrador del sistemas.

Algunos ejemplos de directorios no compartibles son:

``/etc``, ``/boot``, ``/var/run``, etc.

## Directorios variables

Son aquellos directorios que contienen archivos que pueden ser modificados y pueden variar su contenido sin la intervención del administrador del
sistema.

Algunos ejemplos de directorios variables son:

``/var/log/messages``, ``/var/mail``, ``/var/spool/news``, ``/home``, ``/var/run``, etc.

## Directorios estáticos

Son aquellos directorios que contienen archivos que solo pueden ser modificados con la intervención del administrador del sistema.

Algunos ejemplos de directorios estáticos son:

``/etc/password``, ``/etc/shadow``, ``/usr``, ``/opt``, ``/etc``, ``/boot``, ``/bin``, ``/sbin``, etc.









