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

El directorio raíz, simbolizado por el símbolo (``/``), es el directorio principal a partir del cual se ramifican todo el resto de directorios.

Por lo tanto, podemos decir que el directorio raíz es el contenedor de nuestro sistema operativo, ya que de él nacen el resto de directorios que tendrá
nuestro sistema operativo.

![FHS-2574955839](https://user-images.githubusercontent.com/103068924/190015004-2f8f1535-f5b3-42e2-9745-bfbef66e219d.png)










