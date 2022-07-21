# GoBuster

## ¿Qué es GoBuster?

Gobuster es una herramienta open source que permite la identificación de contenido web como directorios o ficheros que pudiesen estar
accesibles u ocultos en un portal web. Esto lo realiza a través de solicitudes http con un diccionario o por fuerza bruta, y detectará
la existencia de las mismas en función del código de respuesta obtenido.

GoBuster tiene la capacidad de realizar las siguientes enumeraciones:

* URIs (directorios y ficheros) en portales web.
* Subdominios DNS con soporte para wildcard.
* Nombres de virtual hosts en servidores web.
* Buckets S3 de Amazon públicos.

## ¿Como instala GoBuster?

En caso de tener una distribución basada en Debian podeís instalarlo directamente desde la terminal mediante le siguiente comando:

    sudo apt install gobuster
    
# Tipos de enumeraciones:

Como ya indicábamos se pueden hacer 4 tipos de enumeraciones, de `URIs`, `DNS`, `vhosts` y `buckets S3` así que vamos a ver cada una de ellas.

### Escaneo de Directorios:

    gobuster dir -u http://www.ejemplo.com/ -w /ruta/del/diccionario
    
* `dir`: Indica que vamos a enumerar directorios.     
* `-u`: Especifica la targeta URL.
* `-w`: Especifica la ruta del diccionario.

Más información acerca de goBuster --> <a href="https://byte-mind.net/enumeracion-por-fuerza-bruta-con-gobuster/" style="text-decoration:none">Link</a>





