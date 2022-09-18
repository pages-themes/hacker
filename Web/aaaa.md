# Gestión de permisos en Linux.

Si hay un aspecto que destaca de Linux respecto a otros sistemas, como Windows, es la seguridad. Y no solo hablamos de vulnerabilidades
y privacidad, sino también de la forma en la que gestiona los archivos personales de sus usuarios. ``Cada archivo y cada carpeta cuenta
con unos permisos definidos, sin los cuales nadie podrá acceder al archivo en cuestión``. Y, si estamos aprendiendo a usar Linux, los 
permisos es uno de los aspectos que debemos conocer y aprender.

El sistema de archivos que utiliza Linux es mucho más avanzado, y a la vez sencillo, que el que utilizan otros sistemas, como Windows. Este se 
basa en especificar si el propietario, el grupo de usuarios o cualquiera puede leer, escribir o ejecutar el archivo. Sin duda, es una forma muy 
eficaz de mantener a cada usuario del sistema controlado, evitando que este pueda acceder a los datos de los demás sin permiso.

# ¿Qué son los permisos en Linux?

Los permiso ``son la manera de restringir las funciones que un usuario tiene permitido realizar sobre un archivo``.
Los tres parámetros básicos que se regulan a traves de los permisos son la ``lectura(r)``, la ``escritura(w)`` y la ``ejecución(x)`` de los archivos.

A cada archvio se aplicán estos permisos y cada archivo tienen divididos estos permisos en tres secciones, una para los ``Usurios``, otra para los
``Grupos`` y una para ``Otros``. Dentro de cada uno de estos se especifican cuales de los tres permisos se aplican.

La estructura básica de los permisos es:

    ---/---/---
    
    Usuarios/Grupos/Otros
    
Son tres secciones (Usuarios/Grupos/Otros) y dentro de cada uno especificaremos los permisos:

    LecturaUsuario,EscrituraUsuario,EjecuciónUsuario/LecturaGrupos,EscrituraGrupos,EjecuciónGrupos/LecturaOtros,EscrituraOtros,EjecuciónOtros)    






