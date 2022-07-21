![wfuzz_Kali_Linux](https://user-images.githubusercontent.com/103068924/165838186-e7b3bb1d-8340-4609-93ce-acb30229cb66.png)

# ¿Qué es Wfuzz?

WFuzz es una herramienta y biblioteca de fuzzer de seguridad de aplicaciones web para Python.

# Cómo funciona:

Wfuzz se basa en un concepto simple: reemplaza cualquier referencia a la palabra clave FUZZ por el valor de una carga útil determinada.

Una carga útil en Wfuzz es una fuente de datos.

Este concepto simple permite inyectar cualquier entrada en cualquier campo de una solicitud HTTP, lo que permite realizar complejos ataques
de seguridad web en diferentes componentes de la aplicación web, como: parámetros, autenticación, formularios, directorios/archivos, encabezados, etc.

## Diccionarios y Listas de Palabras:

En caso de utilizar Kali Linux o ParroOS suelen tener incluidos el repositorio `wordlists` el cual incluye una variedad de diccionarios o listas de
palabras de distintos tamaños. Este repositorio se encuentra en el directorio `/usr/share/wordlists`. 

![Captura de pantalla -2022-05-09 06-58-59](https://user-images.githubusercontent.com/103068924/167343931-14b023c8-3260-44da-9b50-62586e56db8f.png)

![Captura de pantalla -2022-05-09 07-01-52](https://user-images.githubusercontent.com/103068924/167344140-af2eb436-c3ab-4204-8f9f-121c306782bc.png)

![Captura de pantalla -2022-05-09 07-02-21](https://user-images.githubusercontent.com/103068924/167344168-2b83b1e0-0854-4421-82e9-9b9242dca851.png)

![Captura de pantalla -2022-05-09 07-03-15](https://user-images.githubusercontent.com/103068924/167344175-48c8a65e-f043-4efc-9c4d-a00d97b83830.png)

Para descargar el repositorio con todos los diccionarios simplemente ejecutamos lo siguiente:

    sudo apt install wordlists
    
## Payloads/Cargas Útiles:

Wfuzz se basa en un concepto simple: reemplaza cualquier referencia a la palabra clave FUZZ por el valor de una carga útil determinada. Una `carga útil` más conocida como `payload` en Wfuzz es una fuente de datos de entrada y se especifica mediante `-z`:

Las cargas útiles disponibles se pueden listar ejecutando:

    wfuzz -e payloads
     
![Captura de pantalla -2022-05-09 07-30-49](https://user-images.githubusercontent.com/103068924/167346305-cd82d0a9-b840-4944-9237-2f27be89c565.png)
    
Se puede obtener información detallada sobre las cargas útiles ejecutando:

    wfuzz -z help
    
Este último se puede filtrar usando el parámetro `--slice`:

    wfuzz -z help --slice "dirwalk"
    
![Captura de pantalla -2022-05-09 07-34-57](https://user-images.githubusercontent.com/103068924/167346718-14049e7c-e687-4376-bc97-21fa0a000df2.png)
    
## Obtener ayuda:

Use el interruptor `–h` y `–help` para obtener el uso de ayuda básica y avanzada respectivamente.

Wfuzz es un marco completamente modular, puede verificar los módulos disponibles usando el interruptor `-e iterators`:

![Captura de pantalla -2022-05-09 07-18-22](https://user-images.githubusercontent.com/103068924/167345166-41e40d2a-98fd-4747-9d25-c7ba9c89d95c.png)

Las categorías válidas son: ´cargas útiles´, ´codificadores´, ´iteradores´, ´impresoras´ o ´scripts´.

## Filtros:

Filtrar resultados en Wfuzz es primordial:

Los diccionarios grandes pueden generar una gran cantidad de resultados y pueden ahogar fácilmente los resultados válidos legítimos.
La clasificación de las respuestas HTTP es clave para realizar algunos ataques, por ejemplo, para verificar la presencia de una vulnerabilidad de inyección SQL, debemos distinguir una respuesta legítima de la que genera un error o datos diferentes.
Wfuzz permite filtrar según el código de respuesta HTTP y la longitud de la información recibida (en forma de palabras, caracteres o líneas). También se pueden utilizar expresiones regulares. Se pueden tomar dos enfoques: mostrar u ocultar los resultados que coinciden con un filtro determinado.


## Ocultar respuestas 

Los siguientes parámetros de la línea de comandos se pueden usar para ocultar ciertas respuestas HTTP `–hc`, `–hl`, `–hw`, `–hh`. 

El comando `--hc` filtra los recursos web desconocidos por el servidor web ( http://en.wikipedia.org/wiki/HTTP_404 ), básicamente suprime las páginas 
que reportar `error 404`:

    wfuzz -w wordlist/general/common.txt --hc 404 http://testphp.vulnweb.com/FUZZ
    
Se pueden especificar múltiples valores, por ejemplo, la siguiente ejecución de wfuzz agrega los recursos prohibidos al filtro:

    wfuzz -w wordlist/general/common.txt --hc 404,403 http://testphp.vulnweb.com/FUZZ
    
Las líneas, palabras o caracteres son útiles cuando buscamos recursos con el mismo código de estado HTTP.

Por ejemplo, es un comportamiento común (a veces debido a una configuración incorrecta) que los servidores web devuelvan una página de error personalizada con un código de respuesta 200, esto se conoce como `soft 404`.

# Ejecución Básica:

Una ejecución de línea de comando típica de Wfuzz, que especifica una carga de diccionario y una URL, se ve así:

    wfuzz -w [Ruta del Diccionario] [Url Víctima]/FUZZ
    
    wfuzz -w wordlist/general/common.txt http://testphp.vulnweb.com/FUZZ
    
`-w` : Especifica un diccionario (Lista de palabras).
      
![Captura de pantalla -2022-05-09 06-45-44](https://user-images.githubusercontent.com/103068924/167342418-da9eb2b7-3f2a-446b-b5af-5892d1da0fd6.png)

Podemos ver los siguientes parámetros en la respuesta:

![Captura de pantalla -2022-05-09 06-46-33](https://user-images.githubusercontent.com/103068924/167342497-c9bf20af-e69b-4515-92e5-3ed86fe922d1.png)

La salida de Wfuzz permite analizar las respuestas del servidor web y filtrar los resultados deseados en función del mensaje de respuesta HTTP obtenido, por ejemplo, códigos de respuesta, longitud de respuesta, etc.

Cada línea proporciona la siguiente información:

`ID` : El número de solicitud en el orden en que se realizó.

`Respuesta:` muestra el código de respuesta HTTP.

`Líneas:` Muestra el número de líneas en la respuesta HTTP.

`Palabra:` Muestra el número de palabras en la respuesta HTTP.

`Chars:` Muestra el número de caracteres en la respuesta HTTP.

`Carga útil:` Muestra la carga útil utilizada.

# Ejecución Carga Útil:

Cada palabra clave FUZZ debe tener su carga útil (payload) correspondiente. Hay varias formas equivalentes de especificar una `payload`:

### Ejecución Básica:

    wfuzz -w [Ruta del Diccionario] [URL Víctima]/FUZZ
    
`-w` : Especifica un diccionario (Lista de palabras).
    
### Ejecución definiendo el valor del Payload:

    wfuzz -z [Ruta del Diccionario] [URL Víctima]/FUZZ

`-z` : Especifica el valor del parámetro predeterminado del payload.

### Ejecución fuzzeando cabezaras.
Esto nos permite la opción de repetir varios encabezados. Para ello se emplea la etiqueta `-H` de header seguida de la especificación entre comillas dobles. 

    wfuzz -w [Ruta del Diccionario] -H "Host: FUZZ.ejemplo.com" http://ejemplo.com
   
* `Ejemplo:` 
 
    wfuzz -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -H "Host: FUZZ.nunchuks.htb" http://nunchuks.htb


### Ejecución filtrada omitiendo servicios web desconocidos:

    wfuzz -w [Ruta del Diccionario] --hc 404,403 [URL Víctima]
    
`-w` : Especifica un diccionario (Lista de palabras).

`--hc` : Omite los resultados HTTP especificados, en este caso las páginas con servicios 404 (servidor no encontrado) y 403 (sin permisos de acceso).

Se puede encontr mucha más información sobre esta herramienta en su página: [https://wfuzz.readthedocs.io/en/latest/user/getting.html](https://wfuzz.readthedocs.io/en/latest/user/getting.html)
   
### Ejecución filtrada omitiendo servicios con caracteres repetidos:

En algunas ocasiones al ejecutar Wfuzz veremos como empieza a reportar resultados inconcluyentes con el mismo número de caracteres. Al igual que los servicios web
estos resultados pueden ser filtrados para que sean omitidos y que solo nos devuelva los resultados que nos interesan.

Para omitir los caracteres o chars específicos se usa la instrucción `--hh=[Nº Chars]`. Veamos como sería su sintaxis:

    wfuzz --hh=[Nº Chars] -w [Ruta del Diccionario] [URL Víctima]
    
Vamos a ver un ejemplo para que quede más claro, para ello primero vamos a realizar un escaneo simple sin filtrar ningún resultado para que veáis como se repiten
las peticiones con el mismo número de caracteres.

Para este ejemplo usaremos la máquina `Nunchucks` de HTB con la Ip 10.10.11.122 y como diccionario utilizaremos uno de la librería `Seclists`.

    wfuzz -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -H "Host: FUZZ.nunchucks.htb" http://nunchucks.htb
    
![Captura de pantalla 2022-07-21 172614](https://user-images.githubusercontent.com/103068924/180252687-7037a5b5-add2-4744-8491-e5d2a1f88f5d.png)

![Captura de pantalla 2022-07-21 172633](https://user-images.githubusercontent.com/103068924/180252698-c7432676-681d-486a-9307-502475e7c986.png)

Como podéis ver nos reporta un montón de resultados con el mismo número de `chars`:

![Captura de pantalla 2022-07-21 172657](https://user-images.githubusercontent.com/103068924/180252935-a968d55d-776f-4f62-87d4-0d0fd9f2b255.png)

Vamos a intentar aplicar el filtro a ver que sucede:

    wfuzz --hh=30587 -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-20000.txt -H "Host: FUZZ.nunchucks.htb" http://nunchucks.htb
    
![Captura de pantalla 2022-07-21 173038](https://user-images.githubusercontent.com/103068924/180253429-4f39c317-b4ac-40a5-b32a-eef79b67b0f2.png)

![Captura de pantalla 2022-07-21 173652](https://user-images.githubusercontent.com/103068924/180254604-38dff995-7ae1-489b-8794-79913b3d2b0a.png)

Una vez especificado, solo nos muestra los resultados con un número de caracteres diferente a 30587.



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





    


    

