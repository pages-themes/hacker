![searchsploit-kali-linux](https://user-images.githubusercontent.com/103068924/170473716-7ad5193c-3a45-43f5-a916-0c3c7fa605bc.jpg)

# SearchSploit

## ¿Qué es SearchSploit?

Searchsploit es una herramienta de búsqueda de línea de comandos para Exploit-DB que te permite llevar contigo una copia de Exploit DataBase
(la base de datos más extensa de exploits), muy útil cuando no tienes acceso a Internet.

Básicamente, busca exploits relacionados con las palabras que le proporcionemos, que pueden ser, nombres del sistema, versiones, servicios, programas que se 
estén ejecutando,etc. Contiene exploits para tanto para sistemas Windows como para Linux y muchas de sus distribuciones.

## Instalación:

Si estás utilizando la versión estándar de Kali Linux, el paquete `exploitdb` ya está incluido de forma predeterminada. Sin embargo, si estás utilizando otro,
puedes instalar el paquete manualmente de la siguiente manera:

    apt update && apt -y install exploitdb
    
También puedes clonarte la herramienta desde los repositorios de GitHub:

    git clone https://github.com/offensive-security/exploit-database.git

## Ejecución:

### Opciones:

Podemos ver todas las funciones de este comando utilizando la opción `--help`:

    searchsploit --help

### Búsqueda General:

Para realizar una búsqueda global de algo que nos llame la atención simple meten ejecutamos el comando `searchsploit` seguido de la palabra que deseamos buscar:

    searchsploit [Palabra a Buscar]
    
Ejemplo:

    searcsploit Explore
    
### Búsqueda por Títulos:

El uso de la opción `-t` habilita el parámetro `título` para buscar un exploit con un título específico. Porque por defecto, searchsploit intentará tanto el título 
del exploit como la ruta. La búsqueda de un exploit con un título específico da resultados rápidos y ordenados.

    searchsploit -t [Palabra a Buscar]
    
### Distinguir Mayúsculas y Minúsculas:

Al usar la opción `–c`, se puede realizar una búsqueda que distingue entre mayúsculas y minúsculas. Esto permite descubrir la vulnerabilidad relacionada con la
mención de caracteres específicos en el comando, de manera predeterminada hace una `búsqueda insensitive`.

### Copiar ruta del Exploit al portapapeles:

Al emplear la opción `-p`, se muestra la ruta completa de un exploit. Esta opción proporciona más información relacionada con el exploit, así como también copia 
la ruta completa del exploit al portapapeles, todo lo que se necesita es presionar las teclas `Ctrl + v` para pegar.

    searchsploit 39166
    
    searchsploit -p 39166

### Excluir Resultados:

Al utilizar la opción `--exclude`, se habilita el parámetro de exclusión para eliminar los resultados no deseados dentro de la lista de exploits.

    searchsploit [Palabra a Buscar] -w --exclude="[Palabra Excluida]"

### Copiar Exploit al directorio actual:

La opción `-m` copia un exploit en el directorio de trabajo actual. Esta opción proporciona la misma información que la anterior relacionada con el 
exploit, pero también copia la vulnerabilidad en tu directorio actual de trabajo.

    searchsploit -m [Nombre del Exploit]

    searchsploit -m 39166
    
### Examinar resultados de NMAP:

Como todos sabemos, Nmap tiene una característica muy notable que te permite guardar el resultado de salida en formato `.xml` y podemos identificar 
cada vulnerabilidad asociada con el archivo xml de nmap.

La forma recomendada de realizar la lectura con `nmap` es la siguiente:

    nmap -sV [Ip Víctima] -oX resultado.xml
    
Ya tenemos los resultados de `nmap` guardados en el archivo `resultado.xml`, ahora con `searchsploit`, empleando la opción `-x` podemos examinar y con
la opción `-nmap` comprobar todos los resultados en la salida XML de Nmap para averiguar el exploit relacionado con ello.
 
    searchsploit -x --nmap resultado.xml
    

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
    
