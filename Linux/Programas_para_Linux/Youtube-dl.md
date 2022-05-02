# Descargar contenido de YouTube desde la Terminal

Para poder Descargar tanto los videos como el audio directamente desde YouTube a la Terminal, utilizaremos la herramienta `youtube-dl`. Para poder 
usarla primero tendremos que descargarla. En mi caso utilizo ParrotOS, por tanto, estos comandos solo valdrán para sistemas operativos basados en 
Debian.

# Instalación:

    sudo apt-get install youtube-dl
    
![Captura de pantalla -2022-05-02 09-26-55](https://user-images.githubusercontent.com/103068924/166200218-ec2457be-ca78-4b34-8d0e-2f821a4be467.png)
    
# Ejecución:
Para descargar los archivos copiamos la URL de los videos que queramos de YouTube y ejecutamos los siguientes comandos. Los archivos se descargarán en 
el directorio en el que nos encontremos.

### Descargar Video:

    youtube-dl 'URL del Video'
    
![Captura de pantalla -2022-05-02 09-32-29](https://user-images.githubusercontent.com/103068924/166200252-d1f5d77c-6ca0-466a-87cd-d25d007bc227.png)

![Captura de pantalla -2022-05-02 09-30-17](https://user-images.githubusercontent.com/103068924/166200269-4a78207d-9805-4ecd-ac4c-0b5484065fb8.png)
    
### Descargar solo Audio:

    youtube-dl -x --audio-format mp3 'URL del Video'
    
`-x` : Convierte los archivos en archivos solo de audio.

`--audio-format` : Para poder especificar el formato de audio en el que descargaremos el archivo.

`mp3` : Formato en el que se descargará el archivo. 

![Captura de pantalla -2022-05-02 09-31-43](https://user-images.githubusercontent.com/103068924/166200319-033b31d2-5449-424c-8d5f-48825f2a7ab6.png)

![Captura de pantalla -2022-05-02 09-31-26](https://user-images.githubusercontent.com/103068924/166200328-7fde4817-aa25-4184-ab00-4fbc6caa8af0.png)
