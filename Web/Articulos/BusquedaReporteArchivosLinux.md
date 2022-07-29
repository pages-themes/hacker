# Búsqueda y reporte de archivos en Linux.


En el siguiente artículo vamos a ver distintas formas de como buscar archivos y como reportar la información de los mismos. Utilizaremos distintas
herramientas y diferentes formas de representación de la data.


* <a href="#item1" style="text-decoration:none">Búsqueda de archivos con Locate.</a>
* <a href="#item2" style="text-decoration:none">Buscar archivos por su extensión con Locate en Linux.</a>
* <a href="#item3" style="text-decoration:none">Listar por Categorías los Scripts de Nmap.</a>
* <a href="#item4" style="text-decoration:none">Ver únicamente las categorías de Nmap.</a>


<a name="item1"></a>
# Búsqueda de archivos con Locate:


La primera que vamos a ver para buscar archivos en linux es `locate`. Esta herramienta nos permite realizar búsquedas de archivos usando distintos
parámetros. Posteriormente, podremos filtrar sus resultados empleando otras herramientas como `xargs`, `wc`, etc.


## Buscar archivos por su nombre con Locate en Linux:


La sintaxis es muy simple, el comando seguido del archivo que vamos a buscar:


    locate [archivo]
    
`Ejemplos:`


    locate home
    locate users


<a name="item2"></a>
## Buscar archivos por su extensión con Locate en Linux:
Podemos buscar por extensiones:
 
    locate [.extensión]
    
`Ejemplos:`    


    locate .jpg
    locate .txt


<a name="item3"></a>
## Listar por Categorías los Scripts de Nmap:


Vamos a ver como listar por `Categorías` los Scripts de un programa, en este caso, como ejemplo, usaremos `Nmap`. Para ello vamos a usar la herramienta
`locate` para buscar por extensiones, ya que todos los scripts de Nmap contienen la extensión `.nse`.


    locate .nse
    
Ahora, concatenando un `xargs`, vamos a ejecutar un `grep` y le especificamos el argumento `"categories"`, de esta manera xargs nos listará las categorias 
correspondientes a cada script encontrado con `locate`.


   locate .nse | xargs grep "categories"
   
* `grep "categories"`: Exporta las categorías de los archivos listados.   
   
Vemos como a la derecha nos reporta entre corchetes las `categorías` a las que corresponde cada script de Nmap.


<a name="item4"></a>
### Ver únicamente las categorías de Nmap:


Ahora vamos a quitar todo el ruido de fondo y únicamente vamos a filtrar los tipos de categorías que existen. Para ello vamos a usar otra vez el 
comando `grep` para crear una expresión regular `-oP` que nos permita capturar la data `".*?"` que existe entre el doble comillado.


    locate .nse | xargs grep "categories" | grep -oP '".*?"'
    
* `-oP '".*?"'`: Exporta la `data` que hay entre el comillado de las categorías listadas. `-oP ''`
* `.*?`: Es como se representa la `data`.     


Vemos como ya nos reporta únicamente las categorías, pero algunas se muestran repetidas, para evitar esto, podemos utilizar la herramienta `sort` seguida de
la opción `-u`:


    locate .nse | xargs grep "categories" | grep -oP '".*?"' | sort -u
    
* `-u`: Muestra únicamente una palabra de cada grupo repetido.
    
Vemos como ya nos muestra las categorías de una forma más limpia y sin repeticiones.    




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






   
