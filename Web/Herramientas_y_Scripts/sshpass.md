# SSHPASS

`Sshpass` es una herramienta de líneas de comandos que nos permite proporcionar una contraseña junto con el nombre de usuario de `SSH`.

Ssh usa el acceso TTY directo para asegurarse de que la contraseña realmente la proporcione un usuario de teclado interactivo. Sshpass ejecuta ssh en 
un tty dedicado, lo engaña para que crea que está recibiendo la contraseña de un usuario interactivo.

El uso de sshpass se considera menos seguro, ya que revela la contraseña a todos los usuarios del sistema en la línea de comandos con el simple comando `ps` .
Es mucho más seguro utilizar la autenticación sin contraseña previa SSH.

# Instalar SSHPASS:

Normalmente, Sshpass suele venir instalado de serie en sistemas preparados para el pentesting como Kali o Parrot, para instalar la herramienta simplemente
ejecutar el siguiete comando en la terminal (Esto es válido para sistemas basados en Debian): 

    sudo apt install sshpass

Sshpass se usa junto con ssh , puede ver todas las opciones de uso de sshpass con descripciones completas emitiendo el siguiente comando:

    sshpass -h
    
# Incluir contraseña en SSH mediante SSHPASS:

Para poder introducir la contraseña junto con el nombre de usuario para iniciar una conexión ssh debemos cumplir la siguiente sintaxis:

    sshpass -p "Mi_Contraseña" ssh usuario@[Dirección_Ip] 
    
`Ejemplo:`

    sshpass -p "12345" ssh Manolo@10.10.10.10 

 Aquí, la contraseña se proporciona en la línea de comando, que es prácticamente insegura y no se recomienda usar esta opción.


# Incluir contraseña guardada en un archivo con SSHPASS:

También podemos utilizar la opción `-f` y poner la contraseña en un archivo. De esta manera, puede leer la contraseña del archivo de la siguiente manera:
 
    sshpass -f [ArchivoConLaContraseña] ssh usuario@[Dirección_Ip] 
    

# Evitar mostrar la contraseña por pantalla con SSHPASS:

Para evitar mostrar la contraseña en la pantalla, puede usar la -ebandera e ingresar la contraseña como un valor de la variable de entorno `SSHPASS`
como se muestra a continuación:

    exportar SSHPASS= 'Mi_Contraseña'
    echo $SSHPASS
    sshpass -e ssh usuario@[Dirección_Ip]  

La variable de entorno `SSHPASS` es solo para fines temporales y se eliminará durante el reinicio.
    
---
---
  
    
<html lang="en">
<head>
  
</head>
<body>

<script src="https://utteranc.es/client.js"
    repo="F1r0x/gestion-comentarios"
    issue-term="pathname"
    theme="github-light"
    crossorigin="anonymous"
    async>
</script>
          
    
  </body>
</html>
  
  
---
---







