# Python

<center><img src="https://user-images.githubusercontent.com/103068924/172474820-95cf1d8b-ae86-4d28-94b3-023153e3f204.png" ...></center>


# Índice:
* [1.1 ¿Qué es Python?](#item1)  
* [1.2 Ventajas de programar en Python.](#item2)  
* [1.3 Programas Necesarios para programar en Python.](#item3)  
* [1.3.1 Interprete de Python.](#item4)  
* [1.3.2 Editor de Código.](#item5) 
* [1.4 Dinámica de trabajo.](#item6)
* [2.1 Crear Nuestro Primer Programa: Hello World.](#item7)
* [2.2 Tipos de Data en Python: Datatypes.](#item8)    


---
<a name="item1"></a>
## ¿Qué es Python?

Es un lenguaje de programación multiplataforma, que se destaca por su código legible y limpio. Su licencia es de código abierto y
permite su utilización en cualquier escenario. Esto hace que sea uno de los lenguajes de iniciación de muchos programadores. Permite y agiliza, entre otras de
sus características, la automatización de procesos y ejecución de tareas tanto en entorno de cliente como de servidor.

Un lenguaje sencillo, legible y elegante que atiende a un conjunto de reglas que hacen muy corta su curva de aprendizaje. Esto hace de Python un lenguaje 
práctico que permite ahorrar mucho tiempo.

<a name="item2"></a>
## Ventajas de programar en Python:

* `Simplificado y rápido` : Este lenguaje simplifica mucho la programación, es un gran lenguaje para scripting.
* `Elegante y flexible` : El lenguaje ofrece muchas facilidades al programador al ser fácilmente legible e interpretable.
* `Programación productiva` : Es sencillo de aprender, con una curva de aprendizaje moderada. Es muy fácil comenzar a programar y fomenta la productividad.
* `Ordenado y limpio` : Es muy legible y sus módulos están bien organizados.
* `Portable` : Es un lenguaje muy portable. Podemos usarlo en prácticamente cualquier sistema de la actualidad.
* `Comunidad` : Cuenta con un gran número de usuarios. Su comunidad participa activamente en el desarrollo del lenguaje.

<a name="item3"></a>
## Programas Necesarios para programar en Python:

<a name="item4"></a>
### Interprete de Python:

Para poder programar en Python vamos a necesitar dos programas, primero vamos a necesitar un intérprete de Python, que es el encargado a que nuestro ordenador 
(o cualquier dispositivo compatible) pueda entender Python. Podemos descargarlo desde su página oficia.

* Descargar Intérprete de Python --> <a href="https://www.python.org" style="text-decoration:none">Link</a>

![Python](https://user-images.githubusercontent.com/103068924/172308453-711064dc-8f05-493c-aae0-35ec9ff0c91a.png)

![Python1](https://user-images.githubusercontent.com/103068924/172308502-1700286d-5bdf-43ee-9ef5-f8ffa710a10a.png)

![Screenshot 2022-06-07 080832](https://user-images.githubusercontent.com/103068924/172308571-f82b909d-8257-4007-a20e-c171fdd669fa.png)

Una vez descargado, ejecutamos el archivo de instalación `.exe`. La instalación es muy simple, lo primero que veremos al desplegarse la ventana de instalación
es el botón de `Install Now`, pero antes de pulsarlo debéis activar las casillas inferiores. Tanto la que nos permite utilizar el programa a todos los usuarios
(que viene activada de forma predeterminada) como la `Add Python to PATH` que nos permitira trabajar con python desde la Terminal.

![Screenshot 2022-06-07 081039](https://user-images.githubusercontent.com/103068924/172308587-e7df641c-27a2-47be-911c-5862ff6d56ee.png)

Para comprobar que la instalación se ha completado correctamente, abrimos la terminal de Windows (Cntl + r y escribimos `cmd`) y ejecutamos el siguiente
comando:

    python --version

![Screenshot 2022-06-07 081356](https://user-images.githubusercontent.com/103068924/172308937-2c0fa1f1-0db2-4daa-9f94-52f726fe9c03.png)

![Screenshot 2022-06-07 081534](https://user-images.githubusercontent.com/103068924/172308954-64a67a3b-0e13-4ae3-8e00-6961cedb114d.png)

Si la instalación se ha realizado correctamente, nos debería de mostrar la versión de Python instalada. También podemos comprobar que funciona correctamente 
ejecutando el mismo Python:

    python
 
 ![Screenshot 2022-06-07 081426](https://user-images.githubusercontent.com/103068924/172308797-7e9e4948-32d6-4803-9388-ab777e8bcff5.png)
 
Ahora nuestra terminal está lista para interpretar código Python. Podemos comprobarlo actuando algún cálculo simple. `Ej:` 2 + 2 y debería reportarnos 4.
Para volver a la Terminal de Windows introducimos el comando `exit()`.

![Screenshot 2022-06-07 081636](https://user-images.githubusercontent.com/103068924/172309096-65bee0fe-46ac-405c-a439-4d9033e45735.png)

<a name="item5"></a>
### Editor de Código:

El segundo programa que vamos a necesitar va a ser el encargado de ayudarnos a escribir el código de Python, estos programas se conocen como `editores de código`
y existe una gran variedad. Nosotros vamos a usar Visual Estudio Code, ya que es el editor más empleado actualmente.

* Descargar Editor de Código --> <a href="https://code.visualstudio.com" style="text-decoration:none">Link</a>

![Screenshot 2022-06-07 081905](https://user-images.githubusercontent.com/103068924/172309670-a8876ac3-f000-4a76-a14b-dacd01f490e2.png)

![Screenshot 2022-06-07 081932](https://user-images.githubusercontent.com/103068924/172309684-10c1bb86-6ec2-44f0-ba6d-a12b86671d96.png)

Al igual que la instalación anterior, esta también es muy sencilla y debemos de fijarnos básicamente en lo mismo. Una vez descargado el archivo de instalación
`.exe` simplemente lo ejecutamos, una vez inicie la instalación, pulsamos siguiente hasta llegar al apartado `Seleccione Tareas Adicionales` y debemos de 
activar la opción de `Agregar a PATH (disponible después de reiniciar)`, está opción nos permitirá trabajar desde la Terminal con el Editor de Código.

![Screenshot 2022-06-07 082001](https://user-images.githubusercontent.com/103068924/172309723-8a3cea41-73ff-42be-9228-e3c4178f5219.png)

<a name="item6"></a>
### Dinámica de trabajo:

Una vez tengamos los dos programas instalados ya podemos empezar a trabajar. Básicamente, escribiremos nuestro código mediante el `Editor de Código` (en este caso
mediante Visual Estudio Code) y lo ejecutaremos utilizando el `Interprete`.

<a name="item7"></a>
## Crear Nuestro Primer Programa: Hello World

Para empezar, vamos a crearnos una carpeta desde la cual trabajar. Creamos una carpeta llamada `Curso_Python` en nuestro escritorio. Tras crear la carpeta, abrimos
el Visual Estudio Code, y en la parte superior izquierda pulsamos `File` luego `Open Folder` y abrimos nuestra carpeta `Curso_Python`.

![Screenshot 2022-06-07 093039](https://user-images.githubusercontent.com/103068924/172322112-c71bfbf5-234b-427b-8673-ba4b92ad0158.png)

Una vez abierta la carpeta, veremos como se nos muestra en modo menú en la parte izquierda de la pantalla. Ahora vamos a generar un archivo dentro de nuestra
carpeta, para ello nos dirigimos al menú de nuestra carpeta (arriba izquierda) y pulsamos `New File`, llamaremos al archivo `helloworld.py`.

![Screenshot 2022-06-07 093905](https://user-images.githubusercontent.com/103068924/172323550-4e75bc78-2be4-44fb-8203-6bd7c72575d2.png)

![Screenshot 2022-06-07 093558](https://user-images.githubusercontent.com/103068924/172323598-87f8ddba-e724-4a17-815e-2bb410d3e5c8.png)

Para que nuestro programa funcione y que los dispositivos identifiquen que este archivo contiene código Python, debemos usar la extensión `.py`, ya que sin
ella los archivos no se ejecutaran.

Una vez creado nuestro archivo helloworld.py, vamos a tratar de crear un programa super simple que nos devuelva la frase `Hello World`. En primer lugar, vamos 
a introducir un comentario para en un futuro poder saber de qué trata el programa. Los comentarios son muy útiles para programas con códigos largos o cuando 
trabajamos con otras personas y queremos dejar notas sobre las cuestiones que veamos oportunas reportar. Los comentarios solo aparecen en el código, no serán 
interpretados al ejecutar el programa.

Para introducir un comentario simplemente colocamos el signo `#` seguido del comentario en cuestión. En nuestro caso vamos a especificar que es nuestro primer
programa, para ello escribimos `# Este es mi primer programa.`

![Screenshot 2022-06-07 094110](https://user-images.githubusercontent.com/103068924/172324207-560066ef-fa6a-40e8-8ad1-8bbd771681a3.png)

Bien, ya hemos visto como se incorporan los comentarios, ahora vamos con la sintaxis del código. La finalidad de nuestro programa es que cuando lo
ejecutemos, nos reporte la frase `Hello World`. Para ello vamos a ver nuestro primer concepto que son las palabras claves. Python utiliza estas palabras clave o
argumentos que tiene predefinidas para realizar una serie de acciones. El argumento que nosotros vamos a necesitar para `Imprimir` nuestra frase es `print()`.

`print()` : Se usa para imprimir en pantalla. En caso de no establecer nada, Python lo interpretará como un salto de línea (al igual que si pulsáramos Enter
en un editor de texto.).

```py
# Este es mi primer programa
print("Hello World")   
```

![Screenshot 2022-06-07 094243](https://user-images.githubusercontent.com/103068924/172324659-5ed6319d-a447-44e2-87d7-2d36295f1a84.png)

Finalmente, para guardar nuestro proyecto podemos dirigirnos a `File` y `Save` o utilizando el atajo `Ctrl + s`.

![Screenshot 2022-06-07 094551](https://user-images.githubusercontent.com/103068924/172325296-bb9cc111-561f-4551-9ae9-244d491be338.png)

Como veis debemos de introducir el texto entre comillas ya sean dobles o simples. ¿Ya tendríamos nuestro primer mini programa creado, fácil verdad? El siguiente
paso será ejecutarlo. 

Para ejecutar nuestro programa lo primero que debemos de hacer es abrir una Terminal. Para abrir la Terminal de Windows (Cntl + r y escribimos `cmd`). Una vez
abierta la Terminal debemos dirigirnos a la carpeta creada al principio, que es donde se encuentra nuestro programa `helloworld.py`. Para desplazarnos entre 
directorios empleamos el comando `cd` seguido de la ruta de nuestra carpeta.

    cd /Desktop/Curso_Python/
    
    cd /Escritorio/Curso_Python/

![Screenshot 2022-06-07 094954](https://user-images.githubusercontent.com/103068924/172326102-b18c884d-8f1d-4853-bd3c-11fab0bb6544.png)

Una vez estemos en nuestro directorio, podemos ver los archivos que contiene mediante el comando `dir` y vemos nuestro archivo `helloworld.py`. Para ejecutar el
programa, simplemente escribimos el comando `python` seguido de nuestro programa.

    python helloworld.py
    
![Screenshot 2022-06-07 095305](https://user-images.githubusercontent.com/103068924/172326672-f53e35aa-498d-49ae-81f4-f175400f30d6.png)
    
Como podéis ver nos reporta nuestra frase. En caso de tener dudas con los parámetros que vamos viendo, podéis revisarlos con el parámetro ayuda `-h`.

    python -h
    
Puede parecer muy confuso al principio, peró en un futuro puede resolverte pequeñas dudas. 

<a name="item8"></a>
# Tipos de Data en Python: Datatypes

Vamos a tratas de establecer algun concepto más, ya hemos visto la capacidad de imprimir frases como la de "Hello World", a cada letra o símbolo incluido dentro
de la frase (incluidos los espacios) se les conoce como `caracteres` y al conjunto de estos caracteres se le conoce como `string`. Cuando cambiamos cualquier 
carácter, ya sea un espacio, una letra minúscula por una mayúscula o incluir cualquier signo, Pyhton interpreta que es un string diferente.

`Por Ejemplo` : "Hello World" y "hello World" serían dos strings diferentes ya que la primerá letra no es igual.

Otra cosa que debemos tener en cuenta es que podemos establecer varios strings diferenciandolos uniucamente por el tipo de comillas. A continucion podemos ver 
ejemplos de diferentes strings en funcion del tipo de comillado.

    'Hello World'
    "Hello World"
    '''Helo World'''
    """Hello World"""

Como podeís ver existen varias formas de nombrar un `string`, pero como podemos saber que interpreta Pyhton como un string? Muy fácil, para ello volvemos a la 
Terminal, ejecutamos Python:

    python
    
Y vamos a suponer que queremos saber si `"Hello World"` es un string, para ello utilizaremos el argumento `type()`.

    type("Hello World")

Al ejecutarlo vemos como nos devulve `class 'str'`, donde `str` es el diminutivo de string. Vamos a ver otro ejemplo, esta vez con los numeros:

   type(100)

Esta vez vemos como nos reporta `int` (integral), indicandonos que se trata de un número entero.

Ahora vamo a tratar de incluir est en nuestro programita anterior, en primer luegar, el programa debe imprimir la frase "Hello World" y seguido debe de imprimir
el tipo de clase que es. Para ello realizamos lo siguiente:

```py
# Este es mi primer programa
print("Hello World")
print(type("Hello World"))
```

Guardamos (Cntrl + s) y desde la terminal lo ejecutamos.

Ahora, vemos como nos reporta la frase, y el tipo de clase que es.


