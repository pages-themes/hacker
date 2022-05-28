# Como Buscar Archivos en Linux
   
## Buscar archivos por nombre o extensión:

Esta es la parte más esencial del uso del comando Find y para ello se requiere bien sea saber el nombre del objeto o su extensión (.mp4, .txt, . jpg, etc) 
con el fin de obtener un resultado directo.

    find -name 'Nombre del Archivo'
    
Esta busqueda nos repotará el dirctorio que contiene el archivo en caso de que exista.
 
En caso de desear buscar unicamente por una extensión concreta como por ejemplo `.jpg` podemos realizar lo siguiente:
 
    find -name "*.jpg"
    
    
    
    
