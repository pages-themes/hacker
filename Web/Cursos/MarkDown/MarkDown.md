# Curso de MarkDown.

## ¿ Qué es MarkDown ?

Markdown es un lenguaje de marcado ligero creado por John Gruber y Aaron Swartz que trata de conseguir la máxima legibilidad y facilidad de publicación
tanto en su forma de entrada como de salida.

En principio, fue pensado para elaborar textos cuyo destino iba a ser la web con más rapidez y sencillez que si estuviésemos empleando directamente HTML. 
Markdown es realmente dos cosas: por un lado, el lenguaje; por otro, una herramienta de software que convierte el lenguaje en HTML válido.

## Sintaxis:

La sintaxis es muy sencilla y cuenta con varias opciones diferentes para algunos de sus elementos. Básicamente, se trata de añadir ciertos caracteres al
inicio de la línea o antes y después de los elementos a los que vamos a aplicar el formato.

## Comandos Básicos:

### Espacios:
Los espacios en el leguaje MarkDown tienen gran importacia. Un espacio se comportará de manera normal, dos espacio es el máximo que podemos separar dos
elementos ya que a partir de dos espacios, todos los restantes se anula.

Si al terminar una línea no incorporamos ningún espacio, MarkDown interpreta que debe solaparlo con la siguiente línea e introduce un espacio. Para realizar
un `salto de página` y que los elementos permanezcan en distintas líneas simplemente introducimos `dos espacios al final de la línea`.

### Encabezados:

`#` : Encabezado Grande.  
`##` : Encabezado Medio.  
`###` : Encabezado Pequeño.

### Marcar Textos:
Para marcar un texto, introducimos el texto entre comillas cerradas. ``Ejemplo`` 

### Escribir texto en Cursiva o Negrita:
Usaremos un asterisco antes y después para las cursivas y dos asteriscos para las negritas, ambos sin espacios.

`*cursiva*` : *cursiva*   
`**negrita**` : **negrita**  

### Crear Listas:
En MarkDown podremos crear dos tipos de listas, `numeradas` y `sin numerar`. Para crear listas numeradas usaremos números
seguidos de un punto y un espacio, una vez hemos escrito el primero (`1. ` Por ejemplo.), simplemente al terminar pulsamos
`enter` y automaticamente creará el siguiente:

1. Ejemplo1  
2. Ejemplo2 
3. Ejemplo3

Para crear listas sín numerar el proceso es el mismo, simplemente escribimos asrterisco `*` al inicio de cada línea seguido
de un espacio. Tras escribir el elemento listado pulsamos `enter` y saltara a la siguiente línea ehecutando el asterisco 
automáticamente:

* Ejemplo1
* Ejemplo2
* Ejemplo3

### Crear Hipervínculos:
Para poder introducir hipervinculos tanto en textos, enunciados o imagenes, podemos utilizar el siguiente parametro
`[]()`. Algo que debemos tener en cuenta es que si queremos redirigirnos a un archivo `.md` (MarkDown) pero que se nos
muestre en HTML, debemos escribirlo con la extension `.html` para que se nos mueste correctamente.

    [Texto](Ruta del hipervínculo)
    
    [Ejemplo](https://ejemplo.com)
 
 En la ruta del hipervínculo podemos tanto introducir el dominio de una página (como el ejemplo anterior) o redirigir
 a un archivo local. Para ello simplemente establecemos la ruta desde el archivo desde el que nos encontremos.
 
     [Ejemplo](./Ejemplo1.html)
     
 De esta forma nos redirije al archivo `Ejemplo1.html` situado en el mismo directorio que en el que nos encontramos `./` .
 
     [Ejemplo2](../Ejemplo2.html)
     
 En este caso retrocedemos un directorio con `../` y nos lleva al arhivo `Ejemplo2.html`.

### Mostrar texto o comandos en Bloque Básico:
Para poder mostrar informcación dentro de un bloque de forma que resalte y se pueda copiar su contenido de manera más eficiente,
simplemente pulsamos cuatro veces espacio, una vez tengamos cuatro espacios desde el inicio de la línea MarkDown interpretará
que todo el contenido posterior va dentro de un bloque:

    Ejemplo
    


    




