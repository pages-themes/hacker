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
    
En caso de no funcionar aún el `Ctrl + l` para limpiar la terminal, realizamos tambien lo siguiente:

    export SHELL=bash  
    export TERM=xterm

## Ajustar Proporciones:

Para que las proporciones de la terminal sean iguales a las de nuestro sistema debemos ajustar tanto las filas como las columnas. Por ejemplo si abrimos 
o creamos un archivo con `nano` este se verá pequeño. Para ajustar estas proporciones primero debemos ir a una de nuestras ventas y ver que proporciones tiene:

    stty size
    
![Captura de pantalla 2022-07-22 133406](https://user-images.githubusercontent.com/103068924/180431036-3ba25039-39d1-41ea-909c-271142b6b96d.png)

En mi caso mi terminal tiene 52 filas y 189 columnas. Ahora ajustaremos con estos parámetros nuestra Reverse Shell. Para ello escribimos lo siguiente en la
terminal de la Reverse Shell:

    stty rows 52 columns 189
    
 ![Captura de pantalla 2022-07-22 133922](https://user-images.githubusercontent.com/103068924/180431795-5130fda6-f528-4574-a9a9-82832e22ba17.png)
   


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



