![zsh](https://user-images.githubusercontent.com/103068924/166144730-96ded5b4-0042-4452-a281-d93b804ec151.png)

# ¿Qué es ZSH?

ZSH es un poderoso interprete de comandos  para sistemas Unix. Construido sobre el popular shell bash. Es, gratuito, de código abierto  y se
actualiza periodicamente.

Ventas:

1. Altamente personalizable.
2. Proporciona herramientas interactivas.
3. Utiliza el lenguaje de comandos bash.
4. Admite marcos adicionales como oh-my-zsh.
5. Más fácil y con gran comunidad.

## Instalación:
Para poder instalarlo en una distribución Debian (ParrotOS o Kali) primero actualizamos el sistema:

    sudo apt-get update

Luego iniciamos la instalación:

    sudo apt-get install zsh -y
    
## Ejecutar ZSH como shell predeterminada:
Para ejecutar ZSH de forma automatica cada vez que iniciemos sesión y establecerla podemos hacerlo de dos maneras.
La primera es ejecutando el siguiente comando:

    sudo chsh -s $(wich zsh)
    
Una vez hecho esto, reiniciamos el sistema y comprobamos que funcione. En caso de no funcionar, tendremos que hacerlo de forma manual.
Para ello abrimos el archivo `.bashrc` con el siguiente comando:

    sudo nano ~/.bashrc
    
Una vez abierto el arhcivo `.bashrc` escribiremos `exec zsh` en la parte superior del archivo. De esta manera se ejecutará el comando `zsh`
cada vez que se cargue la terminal.

**Nota**: Se debe de terner mucho cuidado al realizar esta instalación y no realizarlo durante otros procesos ya que al realizar estos cambios
puede que se interrumpan todos los trabajos interactivos.

## Versión:
Para asegurarnos que tenemos la ZSH instalada podemos comprobarlo y ver la versión exacta mediante el comando:

    zsh --version
    
## Configuración de la ZSH:

ZSH tiene cinco archivos de configuración principales. Esos archivos son: `.zshenv`, `.zprofile`, `.zshrc`, `.zlogin` y `.zlogout`.

La ZSH funciona leyendo el archivo `.zshenv` a menos que se especifique el argumento `-f` al iniciar la sesión del shell.

`.zshenv` : Solo debe contener las variables  de entorno del usuario. No debe contener comandos que adjunten sescuencias de entrada/salida estandar (TTY). 

`.zprofile` : Contiene comando ejecutados en el inicio de sesión del shell. Solo debe usarse para ejecutar comandos externos.

`.zshrc` : Contiene las configuraciones y los comandos del shell. Se obtiene en shells interactivos y contien alias, enlaces de taclas, variables y funciones. 

`.zlogin` : Este archivo es similar a .zprofile. No debe contener ningún comando que altere el entorno. 

`.zlogout` : Se lee cuando se cierra la sesión de la shell. Puede usarse para configurar los comandos que se ejecutan cuando se cierra el shell.

# Funciones:

### [Función SetTarget](../Linux/ZSH/Settarget.html)
    
