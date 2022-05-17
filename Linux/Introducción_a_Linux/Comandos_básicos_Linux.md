# Comandos Básicos de Linux

Linux es una familia completa de sistemas operativos Unix de código abierto, que se basan en el kernel de Linux. Esto incluye todos los sistemas
basados en Linux más populares como Ubuntu, Fedora, Mint, Debian y otros. Más exactamente, se llaman distribuciones o versiones.

Al operar un sistema operativo Linux, debes usar un shell, una interfaz que te da acceso a los servicios del sistema operativo. La mayoría de
las distribuciones de Linux utilizan una interfaz gráfica de usuario (GUI) como shell, principalmente para proporcionar facilidad de uso a sus usuarios.

## Aquí hay una lista de comandos básicos de Linux:

### pwd  
Usa el comando pwd para encontrar la ruta del directorio (carpeta) de trabajo actual en el que te encuentras. El comando devolverá una ruta absoluta
(completa), que es básicamente una ruta de todos los directorios que comienzan con una barra diagonal (/) Un ejemplo de una ruta absoluta es
`/home/nombredeusuario`.

### cd  
Para navegar por los archivos y directorios de Linux, usa el comando cd. Te pedirá la ruta completa o el nombre del directorio, dependiendo del
directorio de trabajo actual en el que te encuentres.

Supongamos que estás en `/home/nombredeusuario/Documentos` y deseas ir a `Fotos`, un subdirectorio de `Documentos`. Para hacerlo, simplemente escribe el siguiente comando: 

    cd Fotos

Otro escenario es si deseas ir a un directorio completamente nuevo, por ejemplo, `/home/nombredeusuario/Peliculas`. En este caso, debes escribir `cd` seguido de la ruta absoluta del directorio: 

    cd /home/ nombredeusuario/Peliculas.

Hay algunos atajos para ayudarte a navegar rápidamente:

`cd ..` : (Con dos puntos) Para ir un directorio hacia arriba.     
`cd ` : Para ir directamente a la carpeta de inicio.    
`cd-` :  (Con un guión) Para ir al directorio anterior.  

Como nota al margen, el shell de Linux distingue entre mayúsculas y minúsculas. Por lo tanto, debes escribir el nombre del directorio de forma exacta.

### ls  
El comando ls se usa para ver el contenido de un directorio. Por defecto, este comando mostrará el contenido de tu directorio de trabajo actual.

Si deseas ver el contenido de otros directorios, escribe ls y luego la ruta del directorio. Por ejemplo, ingresa `ls /home/nombredeusuario/Documentos`
para ver el contenido de Documentos.

Hay variaciones que puedes usar con el comando `ls`:

`ls -R` : También listará todos los archivos en los subdirectorios.  
`ls -a` : Mostrará los archivos ocultos.  
`ls -al` : Listará los archivos y directorios con información detallada como los permisos, el tamaño, el propietario, etc.

### cat
cat (abreviatura de concatenate, en inglés) es uno de los comandos más utilizados en Linux. Se utiliza para listar el contenido de un archivo en la
salida estándar (sdout). Para ejecutar este comando, escribe cat seguido del nombre del archivo y su extensión. Por ejemplo: 

    cat archivo.txt.

Aquí hay otras formas de usar el comando cat:

`cat > nombredearchivo` : Crea un nuevo archivo.  
`cat nombredearchivo1 nombredearchivo2>nombredearchivo3` : Une dos archivos (1 y 2) y almacena la salida de ellos en un nuevo archivo (3).  
`cat nombredearchivo | tr a-z A-Z> salida.txt` : Convertir un archivo a mayúsculas o minúsculas.  

### cp
Usa el comando cp para copiar archivos del directorio actual a un directorio diferente. Por ejemplo, el comando `cp escenario.jpg
/home/nombredeusuario/Imagenes` crearía una copia de escenario.jpg (desde tu directorio actual) en el directorio de **Imagenes**.

### mv
El uso principal del comando mv es mover archivos, aunque también se puede usar para cambiar el nombre de los archivos.

Los argumentos en mv son similares al comando cp. Debes escribir `mv`, el `nombre del archivo` y el `directorio destino`.  
Por ejemplo: 

    mv archivo.txt /home/nombredeusuario/Documentos.

Para **cambiar el nombre** de los archivos, el comando de Linux es:

    mv nombreviejo.ext nombrenuevo.ext

### mkdir
Usa el comando mkdir para crear un nuevo directorio: si escribes `mkdir Musica`, creará un directorio llamado Musica.

También hay comandos adicionales de mkdir:

Para generar un nuevo directorio dentro de otro directorio, usa este comando básico de Linux `mkdir Musica/Nuevoarchivo`.  
Usa la opción `p` (padres) para crear un directorio entre dos directorios existentes.   
Por ejemplo, `mkdir -p Musica/2020/Nuevoarchivo` creará el nuevo archivo **2020**.

### rmdir
Si necesitas eliminar un directorio, usa el comando rmdir. Sin embargo, rmdir solo te permite eliminar directorios vacíos.

### rm
El comando rm se usa para eliminar directorios y el contenido dentro de ellos. Si solo deseas eliminar el directorio, como alternativa a rmdir,
usa `rm -r`.

**Nota:** Ten mucho cuidado con este comando y verifica en qué directorio te encuentras. Este comando elimina todo y no se puede deshacer.

### touch
El comando touch te permite crear un nuevo archivo en blanco a través de la línea de comando de Linux.  
Como ejemplo, ejecuta `touch /home/nombredeusuario/Documentos/Web.html` para crear un archivo HTML titulado **Web** en el directorio **Documentos**.

### locate
Puedes usar este comando para localizar un archivo, al igual que el comando de búsqueda en Windows. Además, el uso del argumento `-i` junto con este
comando hará que no distinga entre mayúsculas y minúsculas, por lo que puedes buscar un archivo incluso si no recuerdas su nombre exacto.

Para buscar un archivo que contenga dos o más palabras, usa un asterisco `*`.  
Por ejemplo, el comando `locate -i escuela*nota` buscará cualquier archivo que contenga la palabra `escuela` y `nota`, ya sea en mayúsculas o minúsculas.

### find
Similar al comando locate, usando find también buscas archivos y directorios. La diferencia es que usas el comando find para ubicar archivos dentro
de un directorio dado.

Como ejemplo, el comando `find /home/ -name notas.txt` buscará un archivo llamado **notas.txt** dentro del directorio de inicio y sus subdirectorios.

Otras variaciones al usar find son:

Para buscar archivos en el directorio actual, `find . -name notas.txt`.  
Para buscar directorios, `find / -type d -name notes.txt`.

### grep
Otro comando básico de Linux que sin duda es útil para el uso diario es grep. Te permite buscar a través de todo el texto en un archivo dado.

Para ilustrar, `grep azul notepad.txt` buscará la palabra **azul** en el archivo del bloc de notas. Las líneas que contienen la palabra buscada
se mostrarán.

### sudo
Abreviatura de «SuperUser Do» (SuperUsuario hace), este comando te permite realizar tareas que requieren permisos administrativos o raíz.
Sin embargo, no es aconsejable usar este comando para el uso diario, ya que podría ser fácil que ocurra un error si haces algo mal.

### df
Usa el comando df para obtener un informe sobre el uso del espacio en disco del sistema, que se muestra en porcentaje y KB. Si deseas ver el informe
en megabytes, escribe `df -m`.

### du
Si deseas verificar cuánto espacio ocupa un archivo o un directorio, el comando du (Uso del disco, en inglés) es la respuesta. Sin embargo, el 
resumen de uso del disco mostrará números de bloque de disco en lugar del formato de tamaño habitual. Si deseas verlo en bytes, kilobytes y 
megabytes, agrega el argumento `-h` a la línea de comando.

### head
El comando head se usa para ver las primeras líneas de cualquier archivo de texto. De manera predeterminada, mostrará las primeras diez líneas,
pero puedes cambiar este número a tu gusto.  
Por ejemplo, si solo deseas mostrar las primeras cinco líneas, escribe:

     head -n 5 nombredearchivo.ext.
     
     
