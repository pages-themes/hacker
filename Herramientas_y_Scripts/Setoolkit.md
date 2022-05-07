![PicsArt_07-15-08 46 53](https://user-images.githubusercontent.com/103068924/167248447-1a933ca8-3d5c-426a-8450-c7595ee5b7cd.png)

# Setoolkit

## ¿Qué es Setoolkit?

 Se trata de un kit de herramientas de ingeniería social (SET) creado por Devid Kennedy. El equipo de Devid mantiene muy activo su set de herramientas
 de forma que siempre se agregan nuevas funciones y ataques. Más recientemente, también se agregaron varias herramientas de ingeniería no social a SET, 
 lo que la convierte en una herramienta de ataque muy sólida.
 
## Instalación:

Para instalar esta herramienta realizaremos lo siguiente, primero vamos a nuestro escritorio y creamos una carpeta llamada `SEToolkit`:

    cd Desktop
    
    mkdir SEToolkit

    cd SEToolkit
    
Ahora nos clonaremos el siguiente repositorio de GitHub en el directorio `SEToolkit`:

    git clone https://github.com/trustedsec/social-engineer-toolkit setoolkit/
    
Una vez clonado, entramos en el directorio `setoolkit`:

    cd setoolkit
    
Podemos ver mediante `ls` todos los archivos clonados. Ahora procederemos a la instalación de todos los
requisitos necesarios para Setoolkit:

    sudo pip3 install -r requirements.txt
    
Y finalmente realizamos la intalación de la herramienta:

    sudo python setup.py

Con esto ya tendríamos instalada nuestra herramienta. Importante, si el usuario
normal no os permite utilizarla es porque os faltan permisos de ejecución y por tanto
tendreís que utilizar la herramienta como `root`.


## Ejecución:

    sudo setoolkit
    
