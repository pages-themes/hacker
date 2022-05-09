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
palabras de dinstintos tamaños. Este repositorio se encuentra en el direcctorio `/usr/share/wordlists`. 

![Captura de pantalla -2022-05-09 06-58-59](https://user-images.githubusercontent.com/103068924/167343931-14b023c8-3260-44da-9b50-62586e56db8f.png)

![Captura de pantalla -2022-05-09 07-01-52](https://user-images.githubusercontent.com/103068924/167344140-af2eb436-c3ab-4204-8f9f-121c306782bc.png)

![Captura de pantalla -2022-05-09 07-02-21](https://user-images.githubusercontent.com/103068924/167344168-2b83b1e0-0854-4421-82e9-9b9242dca851.png)

![Captura de pantalla -2022-05-09 07-03-15](https://user-images.githubusercontent.com/103068924/167344175-48c8a65e-f043-4efc-9c4d-a00d97b83830.png)

Para descargar el repositorio con todos los diccionarios simplemente ejecutamos lo sisguiente:

    sudo apt install wordlists
    
## Optener ayuda:

Use el interruptor `–h` y `–help` para obtener el uso de ayuda básica y avanzada respectivamente.

Wfuzz es un marco completamente modular, puede verificar los módulos disponibles usando el interruptor `-e iterators`:

![Captura de pantalla -2022-05-09 07-18-22](https://user-images.githubusercontent.com/103068924/167345166-41e40d2a-98fd-4747-9d25-c7ba9c89d95c.png)

Las categorías válidas son: ´cargas útiles´, ´codificadores´, ´iteradores´, ´impresoras´ o ´scripts´.
    

## Ejecución Básica:

Una ejecución de línea de comando típica de Wfuzz, que especifica una carga de diccionario y una URL, se ve así:

    wfuzz -w [Ruta del Diccionario] [Url Víctima]
    
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
    

