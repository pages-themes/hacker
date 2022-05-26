# Tratamiento de la TTY

## ¿Qué es la TTY?

En la terminología de Unix, un tty es un tipo particular de archivo de dispositivo que implementa una cantidad de comandos proporcionados por el hardware
de nuestro equipo.

También otros TTYs llamados, en ocasiones, pseudo-tty se proporcionan (a través de una delgada capa de kernel) mediante programas llamados emuladores de 
terminal, como `xterm`, `termite`,`gnome-terminal`, `konsole`.

## ¿Para qué sirve el tratamiento de la TTY?

Cuando nos conectamos mediante una `reverse-shell` con otro equipo, en muchas ocasiones nos encontraremos con que la Shell de la que disponemos no son
prácticas, las proporciones no son correctas, no podemos utilizar atajos de teclado, al pulsar (Cntrl + L) perdemos la terminal y una larga serie de 
inconvenientes.

Para evitar todos estos problemas, una vez hemos establecido la Shell inversa, podemos realizar lo que se conoce como un tratamiento de la TTY, para 
poder disponer de una Shell completamente funcional.

Para saber si nos encontramos en una TTY:

    tty
    
Si nos reporta `not a tty` introducimos los siguientes comandos:

    script /dev/null -c bash
    
Luego, pulsamos `Cntrl + z` para salir de la terminal e introducimos el segundo comando:

    stty raw echo; fg
    
Y debajo de este comando a la derecha, escribimos `reset xterm` para volver a la terminal ya lista.

    reset xterm
    
    
    





