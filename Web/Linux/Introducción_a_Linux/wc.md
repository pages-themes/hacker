
# Cómo contar líneas, palabras o bytes de un archivo con el comando WC

## ¿Qué es WC?

El comando `wc` muestra información estadística sobre un archivo, como el número de líneas, palabras y caracteres.

## Cómo se utiliza:

Para utilizar el comando `wc` debemos de respetar la siguiente sintaxis:

    wc [Opciones] [Archivos]

El comando wc tiene las siguientes opciones:

* `-l, –lines`: Imprime solo el número de líneas.
* `-w, –words`: Imprime solo el número de palabras.
* `-c, –bytes`: Imprime solo el número de bytes.
* `-m, –chars`: Imprime el número de caracteres (diferente del número de bytes para los archivos que no son de texto).
* `-L, –max-line-length`: Imprime la longitud de la línea más larga del fichero.
* `–files0-from=F`: Obtiene los nombres de los archivos del archivo F (los nombres de los archivos deben estar separados por el carácter NULL).

## Ver el número de líneas de un archivo:

    wc -l archivo
    
## Ver el número de palabras de un archivo:

    wc -w archivo
    
## Ver el número de bytes de un archivo:

    wc -c archivo
