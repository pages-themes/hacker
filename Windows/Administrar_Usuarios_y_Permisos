# Administrar Usuarios y Permisos Windows

En este artículo se muestra como crear o eliminar usuarios y administrar permisos de usuarios desde la shell de Windows.

## Abrir la Terminal:

Para abrir la terminal en Windows podemos escribir en el buscador `cmd` o presionar `Tecla Windows + R` y luego escribimos `cmd` o `símbolo del sistema`.
Lo ideal para no tener problemas, es abrir la Terminal como Administrador, para ello la buscamos mediante el buscador y escribimos `cmd`, luego presionamos
clic Derecho y `Abrir como Administrador`.

## Listar Usuarios:
Mediante este comando podremos ver todos los usuarios registrados en el sistema:

    net user

## Crear un Nuevo Usuario:
Para crear un Usuario Nuevo sin permisos de Administrador podemos utilizar los siguientes comandos. Debemos tener en cuenta que el Usuario creado no
tendrá contraseña y que tenemos que definirla nosotros una vez creado.

    net user 'nombre de usuario' /add

Otro comando para crear un Usuario es el siguiente:

    adduser 'nombre de usuario'
    
## Establecer Contraseña a un Usuario:

Una vez tenemos el Usuario creado, vamos a establecer una contraseña. Para ello introducimos el siguiente comando y se nos desplegará en la terminal la 
opción de introducir una contraseña. 

    net user 'nombre usuario' *

En caso de querer eliminar la contraseña, simplemente usamos el mismo comando, pero en este caso en vez de introducir una contraseña nueva, solo 
pulsamos dos veces `Enter` dejando los parámetros en blanco.

## Ver Permisos:
Mediante el siguiente comando podremos ver que tipo de permisos le podemos dar a cada usuario. La lista que muesta el siguiente comando, muestra todos
los permisos.

    net localgroup
    
## Dar Permisos a un Usuario:
Para poder dar permisos a un Usuario, como por ejemplo como `Administrador`, realizamos lo siguiente:

    net localgroup administrador 'nombre de usuario' /add
    
 En caso de desear otro tipo de permiso, simplemente cambiamos `administrador` por el permiso que le queramos dar.
 
 ## Eliminar Permisos a un Usuario:
 La sintaxis es casi igual que para dar permisos, solo cambiamos la variable final por `/delete`:
 
     net localgroup administrador 'nombre de usuario' /delete
     
 ## Eliminar Usuarios:
 
     net user 'nombre de usuario' /delete
     
 ## Habilitar cuenta de Administrador Oculta:
 Este comando activa o habilita la cuenta de administrador oculta del sistema Windows. Esto se utiliza normalmente cuando no tenemos permisos de
 administrador, y por tanto, no podemos realizar cambios:
 
     net user administrador /active:yes

Para comprobar que estamos utilizando el nombre correcto del permiso (en este caso `administrador`), podemos revisarlo mediante el comando mencionado
anteriormente `net localgroup`.

Para desactivar la cuenta de administrador oculta:

    net user administrador /active:no
