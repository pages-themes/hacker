# ¿Qué es un proceso?

Un proceso ``es simplemente un programa en ejecución``. También se define como una ``entidad que representa la unidad de trabajo más básica que se 
implementa en un sistema``. Cuando queremos realizar una tarea en nuestro ordenador, ejecutamos un programa. Este programa acaba convirtiéndose
en un proceso que ejecutará todas las funciones que se definen en el programa en cuestión.

Del mismo modo, cuando un programa se convierte en un proceso, este también pasa a dividirse en cuatro secciones diferentes:

* ``Stack``: Contiene la información temporal que se almacena al ejecutar las funciones que se definen en el programa, como por ejemplo sus parámetros,
             sus valores de retorno y sus variables locales.
* ``Heap``: Memoria dinámica reservada por el proceso.
* ``Text``: Información del estado actual del programa, incluyendo la información almacenada en los registros.
* ``Data``: Información almacenada en variables globales y variables estáticas.


# Concatenar varios comandos en Linux

Una vez sabemos como funciona la dínamica de los comandos, podemos ejecutar varios al mismo tiempo utilizando las distintas
variables según la acción que vayamos a realizar.

A la acción de colocar distintos comandos concatenados en la misma línea de comando se le conoce como ``one-liner``.

Cada variable concatena los conmandos de una forma partícular:

# ;

Con ``;`` el segundo comando se ejecutará sin importar el resultado del segundo. Esto quiere decir, que aúnque el primer comando nos reportará
un codigo de error, el segundo se ejecurtará independientemente monstrando el resultado.

    whoami ; ls

# &&

Con ``&&`` el segundo comando se ejecutará solo si el primero termina con éxito. En caso de el primer comando reportar un error el siguiente comando no
se ejecutará.

    whoami && ls
    
# ||

Con ``||`` el segundo comando solo se ejucutará si el primero termina sin éxito. Si el primer comando se realiza de manera exitosa el siguinete
no se ejecutará.

    whoami || ls
    
    
# &

Con ``&```hará que los dos (o más) comandos se ejecuten de manera simultanea.

    whoami & ls
    
# |

Con ``|`` la salida del primer comando se convierte en la entrada del segundo.



# Descriptores de archivos:
 
Un descriptor de archivos (``file descriptor`` o ``fd``) ``es un número entero positivo que utiliza un proceso para identificar un archivo abierto dentro
del sistema``. 

Cuando un programa quiere acceder a un archivo abierto, el kernel le devuelve un descriptor de archivos. Este ``fd`` apunta a una entrada específica
dentro de la tabla de archivos del kernel. Esta tabla contiene información sobre el archivo al que hace referencia el descriptor de archivos. Entre esta
información se especifican las propiedades read-only(solo lectura), write-only(solo escritura), read-write(escritura/lectura), etc.

Tres de los descriptores de archivos más importantes y con los que más se trabaja son:

* ``Standard Input (fd = 0)``: Los datos se mandan por la entrada estándar. Por defecto, son los datos que se envían cuando escribimos por teclado.
* ``Standard Output (fd = 1)``: Los datos se mandan por la salida estándar. Por defecto, son los datos que se muestran por la pantalla.
* ``Standard Error (fd = 2)``: Los datos se mandan por la salida de error. Por defecto, son los datos que se mandan por la pantalla para indicar que un
                                programa ha fallado.

# Entrada (stdin) y Salida (stdout) estandar del sistema:

Como usuarios, para poder comunicarnos con nuestro ordenador necesitamos de una serie de herramientas que nos permitan establecer tal comunicación.
Además, una vez se ha establecido la comunicación, el usuario tiene que ser capaz de enviar la información al ordenador y tiene que ser capaz de recibir
la información que el ordenador le proporciona.

Estas herramientas son comúnmente conocidas como dispositivos de entrada/salida. Así, ``al dispositivo de entrada se le llama entrada estándar o stdin y
al dispositivo de salida se le llama salida estándar o stdout``. 


## ¿Qué es la entrada estándar (stdin)?

El término ``stdin`` hace referencia a un ``flujo de entrada a donde se envían los datos y de donde un programa recibe la información que necesita para
poder ejecutarse``. 

``Se entiende como flujo una transferencia de datos``. En el caso de la entrada estándar, será texto lo que se envíe como información a través 
de este flujo.

``Cuando un programa requiere que el usuario le proporcione información``, como un nombre, un número, un día, etc., ``el usuario le proporcionará esta
información a través de la entrada estándar`` utilizando el teclado. No obstante, esta entrada de datos no siempre proviene del teclado. Hay ocasiones
en las que se toman los datos de un archivo o el retorno de un programa como información de entrada para que otro programa pueda ejecutarse. Sin embargo,
a no ser que se produzca alguna modificación, ``la entrada estándar siempre estará asociada al descriptor de archivos 0 (fd = 0)``.

# ¿Qué es la salida estandar (stdout)?

 
# STDERR
 
El ``stderr`` también conocido como  error estándar, es el descriptor de archivo predeterminado donde un proceso puede escribir mensajes de error. 


