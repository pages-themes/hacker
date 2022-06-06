# Python

## ¿Qué es Python?

Es un lenguaje de programación multiplataforma, que se destaca por su código legible y limpio. Su licencia es de código abierto y
permite su utilización en cualquier escenario. Esto hace que sea uno de los lenguajes de iniciación de muchos programadores. Permite y agiliza, entre otras de
sus características, la automatización de procesos y ejecución de tareas tanto en entorno de cliente como de servidor.

Un lenguaje sencillo, legible y elegante que atiende a un conjunto de reglas que hacen muy corta su curva de aprendizaje. Esto hace de Python un lenguaje 
práctico que permite ahorrar mucho tiempo.


## Ventajas de programar en Python:

* `Simplificado y rápido` : Este lenguaje simplifica mucho la programación, es un gran lenguaje para scripting.
* `Elegante y flexible` : El lenguaje ofrece muchas facilidades al programador al ser fácilmente legible e interpretable.
* `Programación productiva` : Es sencillo de aprender, con una curva de aprendizaje moderada. Es muy fácil comenzar a programar y fomenta la productividad.
* `Ordenado y limpio` : Es muy legible y sus módulos están bien organizados.
* `Portable` : Es un lenguaje muy portable. Podemos usarlo en prácticamente cualquier sistema de la actualidad.
* `Comunidad` : Cuenta con un gran número de usuarios. Su comunidad participa activamente en el desarrollo del lenguaje.

## Programas Necesarios para programar en Python:

### Interprete de Python:

Para poder programar en Python vamos a necesitar dos programas, primero vamos a necesitar un intérprete de Python, que es el encargado a que nuestro ordenador 
(o cualquier dispositivo compatible) pueda entender Python. Podemos descargarlo desde su página oficia.

* Descargar Intérprete de Python --> <a href="https://www.python.org" style="text-decoration:none">Link</a>

Una vez descargado, ejecutamos el archivo de instalación `.exe`. La instalación es muy simple, lo primero que veremos al desplegarse la ventana de instalación
es el botón de `Install Now`, pero antes de pulsarlo debéis activar las casillas inferiores. Tanto la que nos permite utilizar el programa a todos los usuarios
(que viene activada de forma predeterminada) como la `Add Python to PATH` que nos permitira trabajar con python desde la Terminal.

Para comprobar que la instalación se ha completado correctamente, abrimos la terminal de Windows (Cntl + r y escribimos `cmd`) y ejecutamos el siguiente
comando:

    python --version
    
Si la instalación se ha realizado correctamente, nos debería de mostrar la versión de Python instalada. También podemos comprobar que funciona correctamente 
ejecutando el mismo Python:

    python
    
Ahora nuestra terminal está lista para interpretar código Python. Podemos comprobarlo actuando algún cálculo simple. `Ej:` 2 + 2 y debería reportarnos 4.
Para volver a la Terminal de Windows introducimos el comando `exit()`.

### Editor de Código:

El segundo programa que vamos a necesitar va a ser el encargado de ayudarnos a escribir el código de Python, estos programas se conocen como `editores de código`
y existe una gran variedad. Nosotros vamos a usar Visual Estudio Code, ya que es el editor más empleado actualmente.

* Descargar Editor de Código --> <a href="https://code.visualstudio.com" style="text-decoration:none">Link</a>

Al igual que la instalación anterior, esta también es muy sencilla y debemos de fijarnos básicamente en lo mismo. Una vez descargado el archivo de instalación
`.exe` simplemente lo ejecutamos, una vez inicie la instalación, pulsamos siguiente hasta llegar al apartado `Seleccione Tareas Adicionales` y debemos de 
activar la opción de `Agregar a PATH (disponible después de reiniciar)`, está opción nos permitirá trabajar desde la Terminal con el Editor de Código.

### Dinámica de trabajo:

Una vez tengamos los dos programas instalados ya podemos empezar a trabajar. Básicamente, escribiremos nuestro código mediante el `Editor de Código` (en este caso
mediante Visual Estudio Code) y lo ejecutaremos utilizando el `Interprete`.

## Crear Nuestro Primer Programa: Hello World

Para empezar, vamos a crearnos una carpeta desde la cual trabajar. Creamos una carpeta llamada `Curso_Python` en nuestro escritorio. Tras crear la carpeta, abrimos
el Visual Estudio Code, y en la parte superior izquierda pulsamos `File` luego `Open File` y  abrimos nuestra carpeta `Curso_Python`.

Una vez abierta la carpeta, veremos como se nos muestra en modo menu en la parte izquierda de la pantalla. Ahora vamos a crear un archivo dentro de nuestrea
carpeta, para ello nos dirigimos al menu de nuestra carpeta (arriba izquierda) y pulsamos `New File`, llamaremos al archivo `helloworld.py`.

Para que nuestro programa funcione y que los dispositivos identifiquen que este arhivo contiene código Python, debemos utilizar la extensión `.py` ya que sin
ella los archivos no se ejecutaran.

Una vez creado nuestro archivo helloworld.py, vamos a tratar de crear un programa super simple que nos devuelva la frase `Hello World`. En primer luegar, vamos 
a introducir un comentario para en un futuro poder saber de que trata el programa. Los comentarios son muy utilies para programas con códigos largos o cuando 
trabajamos con otras personas y queremos dejar notas sobre las cuestiones que veamos oportunas reportar. Los comentarios solo aparecen en el código, no serán 
interpretado al ejecutar el programa.

Para introducir un comentario simplemten colocamos el signo `#` seguido del comentario en cuestión. En nuestro caso vamos a especificar que es nuestro primer
programa, para ello escribimos `# Este es mi primer programa.`

Bien ya hemos visto como se incoporan los comentarios, ahora vamos con la sintaxis del código. La finalidad de nuestro programa es que cuando lo
ejecutemos, nos reporte la frase `Hello World`. Para ello vamos a ver nuestro primer concepto que son las palabras claves. Python utiliza estas palabras clave o
argumentos que tiene predefinidas para realizar una serie de acciones. El argumento que nosotros vamos a necesitar para `Imprimir` nuestra frase es `print()`.

`print()` : Se utiliza para imprimir en pantalla. En caso de no establecer nada Python lo interpretara como un salto de línea (al igual que si pulsaramos Enter
en un editor de texto.).

```py
print("Hello World")   
```






