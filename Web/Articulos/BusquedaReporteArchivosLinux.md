# Búsqueda y reporte de archivos en Linux.

En el siguiente artíuculo vamos a ver distintas formas de como buscar archivos y como reportar la información de los mismos. Utilizaremos distintas
herramientas y diferentes formas de representación de la data.

# Locate

La primera que vamos a ver para buscar archivos en linux es `locate`. Esta herramientas nos permite realizar busquedas de archivos utilizando dintintos
parametros. Posteriormente, podremos filtrar sus resultados utilizando otras herramientas como `xargs`, `wc`, etc.

## Buscar archivos por su nombre con Locate en Linux:

La sintaxis es muy simple, el comando seguido del archivo que vamos a buscar:

    locate [archivo]
    
`Ejemplos:`

    locate home
    locate users

## Buscar archivos por su extensión con Locate en Linux:
Podemos buscar por extensiones:
 
    locate [.extensión]
    
`Ejemplos:`    

    locate .jpg
    locate .txt
    
# Listar por Categorias los Scripts de un programa:




   
