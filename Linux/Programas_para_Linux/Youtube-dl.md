# Descargar contenido de YouTube desde la Terminal

Para poder Descargar tanto los videos como el audio directamente desde YouTube a la Terminal, utilizaremos la herramienta `youtube-dl`. Para poder 
usarla primero tendremos que descargarla. En mi caso utilizo ParrotOS, por tanto, estos comandos solo valdrán para sistemas operativos basados en 
Debian.

# Instalación:

    sudo apt-get install youtube-dl
    
# Ejecución:
Para descargar los archivos copiamos la URL de los videos que queramos de YouTube y ejecutamos los siguientes comandos. Los archivos se descargarán en 
el directorio en el que nos encontremos.

### Descargar Video:

    youtube-dl 'URL del Video'
    
### Descargar solo Audio:

    youtube-dl -x --audio-format mp3 'URL del Video'
