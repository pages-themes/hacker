# Fase de escalada de Privilegios en Linux

## Como listar Usuarios en Linux:

Una de las formas de ver los usuarios registrados en el sistema es leyendo el arcivo `/etc/passwd` a traves del comando `cat` por ejemplo. A traves de estos 
datos podemos obtener información de los usuarios:

    cat /etc/passwd
    
   
 ![Captura de pantalla 2022-08-01 103807](https://user-images.githubusercontent.com/103068924/182108836-2a50e47b-073d-48c9-985f-07809d27a2b1.png)
 
 
# Númera los comandos disponibles como SUDO de un Usuario:

Para poder ver que comandos puede ejecutar un usurio como super usuario `root` podemos utilizar el comando `sudo -l`:

    sudo -l
   
Esto es muy importante en la fase de escalada de privilegios ya que en caso de tener privilegios como root de algun comando o herramienta podríamos
utilizarlo para ganar acceso total a través de él.

![Captura de pantalla 2022-08-01 105300](https://user-images.githubusercontent.com/103068924/182111489-419c0c1b-66fe-4f39-9807-a8b437562cb1.png)

En está imagen por ejemplo, podemos ver como tenemos privilegios de root sobre el archivo `/usr/bin/snap`.
