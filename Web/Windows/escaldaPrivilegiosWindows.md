# Escalada de privilegios en Windows


## Listar nivel de privilegios del Usuario:


    whoami /priv
    
## Reconocimiento de privilegios con Icacls:


Para poder ver los privilegios que tiene nuestro usuario sobre un directorio o archivo en específico podemos utilizar la herramienta `icacls`.


    icacls [Nombre del Archivo/Directorio]
    
`Ejemplos:`


    icacls Desktop
    
    icacls user.txt
    
![Captura de pantalla 2022-08-03 114112](https://user-images.githubusercontent.com/103068924/182577852-18696ff2-9eeb-4bae-b23e-367931f1bbda.png)

    
En caso de tener privilegios full `F` de algún archivo, lo podremos modificar para darnos permisos y de esta forma interactuar con un archivo con el que antes
no nos estaba permitido.


Esto puede ser útil en las máquinas de HTB en el caso de tener privilegios sobre el directorio `root`, pero los cuales aún no han sido incorporados a la flag y , por tanto, no podemos leerla.


Para aplicar estos privilegios a un archivo y poder leerlo e interactuar con él, utilizaremos el siguiente comando:


    icacls [Nombre del Archivo] /grant [Usuario]:[Privilegio]
    
`Ejemplo:`


    icacls root.txt /grant Alfred:F
    
`F`: Nos indica los máximos privilegios.

![Captura de pantalla 2022-08-03 114143](https://user-images.githubusercontent.com/103068924/182577927-775e56c8-47fe-4f52-9543-2bea2d6eac20.png)


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
