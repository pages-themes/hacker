# Cómo listar Privilegios en Linux.

## Listar Privilegios SUID:

Para listar los privilegios `SUID` debemos ejecutar el fomando `find` seguido de las siguientes opciones:

    find \-perm -4000 2>/dev/null
    
    
