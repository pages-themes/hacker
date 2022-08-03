# Escalada de privilegios en Windows

## Listar nivel de privilegios del Usuraio:

    whoami /priv
    
## Reconocimiento de privilegios con Icacls:

Para poder ver los privilegios que tiene nuestro usurio sobre un direcctorio o archivo en especifico podemos utilizar la herramiente `icacls`.

    icacls [Nombre del Archivo/Directorio]
    
`Ejemplos:`

    icacls Desktop
    
    icacls user.txt
    
En caso de tener privilegiios full `F` de algún archivo, lo podremos modificar para darnos permisos y de esta forma intectuar con un archivo con el que antes
no nos estaba permitido.

Esto puede ser útil en las máquinas de HTB en el caso de tener privilegios sobre el directorio `root` pero los cuales aún no han sido incorporados a la flag y 
por tanto no podemos leerla.

Para aplicar estos privilegios a un archivo y poder leerlo y interactuar con él, utilizaremos el siguiente comando:

    icacls [Nombre del Archivo] /grant [Usuario]:[Privilegio]
    
`Ejemplo:`

    icacls root.txt /grant John:F
    
`F`: Nos indica los máximos privilegios.
