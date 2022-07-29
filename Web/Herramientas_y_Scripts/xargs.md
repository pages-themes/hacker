# Manual de Comandos Generales XARGS

# NOMBRE

`xargs`: Crea y ejecuta líneas de comando desde la entrada estándar.

# SINOPSIS   

xargs [opciones] [comando [argumentos]]
       
# DESCRIPCIÓN         
       
Esta página del manual documenta la versión GNU de `xargs`. Xargs lee elementos de la entrada estándar, delimitados por espacios en blanco (que se pueden
protegido con comillas simples o dobles o una barra invertida) o saltos de línea y ejecuta el comando (el valor predeterminado es echo ) uno o más
veces con cualquier argumento inicial seguido de elementos leídos de entrada estándar. Las líneas en blanco en la entrada estándar se ignoran.

La línea de comando para el comando se construye hasta que llega a un límite definido por el sistema (a menos que se utilicen las opciones -n y -L ).El comando 
especificado se invocará tantas veces como sea necesario para utilizar la lista de elementos de entrada. En general, habrá
muchas menos invocaciones de mando que elementos en el aporte. Esto normalmente tendrá importantes beneficios de rendimiento.
Algunos comandos también se pueden ejecutar en paralelo; Para ello se utiliza la opción `P`.

Debido a que los nombres de archivo de Unix pueden contener espacios en blanco y saltos de línea, este el comportamiento predeterminado suele ser
problemático; nombres de archivos que contienen xargs procesa incorrectamente los espacios en blanco y/o las nuevas líneas . En
estas situaciones es mejor usar la opción `-0` , que previene este tipo de problemas. Al usar esta opción, deberá asegúrese de que el programa que produce
la entrada para xargs también utiliza un carácter nulo como separador. Si ese programa es GNU encuentre, por ejemplo, la opción `-print0` hace esto por usted.

Si alguna invocación del comando sale con un estado de 255, xargs se detendrá inmediatamente sin leer más entradas. Se emite un mensaje de error en 
stderr cuando esto sucede.

# OPCIONES    

```
       -0, --null
              Los elementos de entrada terminan con un carácter nulo en lugar de
              por espacios en blanco, y las comillas y la barra invertida no son
              especial (cada carácter se toma literalmente). Desactiva
              el final de la cadena del archivo, que se trata como cualquier otro
              argumento. Útil cuando los elementos de entrada pueden contener blanco
              espacio, comillas o barras invertidas. El GNU encuentra -print0
              La opción produce una entrada adecuada para este modo.

       -a archivo , --arg-file= archivo 
              Leer elementos del archivo en lugar de la entrada estándar. Si usted
              use esta opción, stdin permanece sin cambios cuando los comandos son
              correr. De lo contrario, stdin se redirige desde /dev/null .

       --delimiter= dividir , -d dividir
              Los elementos de entrada terminan con el carácter especificado.
              El delimitador especificado puede ser un solo carácter, una C-
              escape de carácter de estilo como \n , o un octal o
              código de escape hexadecimal. Escape octal y hexadecimal
              los códigos se entienden como para el comando printf .
              Los caracteres multibyte no son compatibles. Al procesar
              la entrada, las comillas y la barra invertida no son especiales; cada
              carácter en la entrada se toma literalmente. La opción -d
              deshabilita cualquier cadena de fin de archivo, que se trata como cualquier
              otro argumento. Puede utilizar esta opción cuando la entrada
              consiste simplemente en elementos separados por saltos de línea, aunque es
              casi siempre es mejor diseñar su programa para usar --null
              donde esto es posible.

       -E eof-str 
              Establece el final de la cadena del archivo en eof-str . Si el final del archivo
              cadena se produce como una línea de entrada, el resto de la entrada es
              ignorado Si no se usa ni -E ni -e , no hay fin de archivo
              se utiliza una cuerda.

       -e [ eof-str ], --eof [ =eof-str ]
              Esta opción es sinónimo de la opción -E . Usa -E
              en cambio, porque es compatible con POSIX mientras que esta opción
              no es. Si se omite eof-str , no hay fin de archivo
              cuerda. Si no se usa ni -E ni -e , no hay fin de archivo
              se utiliza una cuerda.

       -I replace-str 
              Reemplaza las ocurrencias de replace-str en la inicial-
              argumentos con nombres leídos de la entrada estándar. También,
              los espacios en blanco sin comillas no terminan los elementos de entrada; en cambio el
              separador es el carácter de nueva línea. Implica -x y -L 1.

       -i [ reemplazar-cadena ], --reemplazar [ =reemplazar-cadena ]
              Esta opción es un sinónimo de -I replace-str si 
              se especifica replace-str . Si falta el argumento replace-str , el
              el efecto es el mismo que -I {}. Esta opción está en desuso;
              use -I en su lugar.

       -L max-lines 
              Use como máximo max-lines líneas de entrada que no estén en blanco por comando
              línea. Los espacios en blanco finales hacen que una línea de entrada sea lógicamente
              continúa en la siguiente línea de entrada. Implica -x .

       -l [ líneas máximas ], --líneas máximas [= líneas máximas ]
              Sinónimo de la opción -L . A diferencia de -L , el argumento max-lines 
              es opcional. Si no se especifica max-lines ,
              por defecto es uno. La opción -l está en desuso ya que el
              El estándar POSIX especifica -L en su lugar.

       -n max-args , --max-args = max-args 
              Utilice como máximo argumentos max-args por línea de comando. MenosSe usarán argumentos
               
              que max-args si se excede el tamaño (consulte la opción -s ), a menos que se proporcione la opción -x , en
              en cuyo caso saldrán xargs.

       -P max- procs , --max-procs = max-procs 
              Ejecuta hasta max-procs procesos a la vez; el valor predeterminado es 1.
              Si max-procs es 0, xargs ejecutará tantos procesos como
              posible a la vez. Use la opción -n o la opción -L
              con -P ; de lo contrario, es probable que solo un ejecutivo sea
              hecho. Mientras se ejecuta xargs , puede enviar a su proceso un
              Señal SIGUSR1 para aumentar el número de comandos a ejecutar
              simultáneamente, o un SIGUSR2 para disminuir el número. Tú
              no puede aumentarlo por encima de un límite definido por la implementación
              (que se muestra con --show-limits). no puedes disminuir
              está debajo de 1.   xargs nunca finaliza sus comandos; cuando
              se le pide que disminuya, simplemente espera más de una
              comando existente para terminar antes de iniciar otro.

              Tenga en cuenta que depende de los procesos llamados
              gestionar adecuadamente el acceso paralelo a los recursos compartidos. Para
              ejemplo, si más de uno de ellos intenta imprimir a
              stdout, la salida se producirá en un indeterminado
              orden (y muy probablemente mezclado) a menos que los procesos
              colaborar de alguna manera para evitarlo. Usando algún tipo
              del esquema de bloqueo es una forma de prevenir tales problemas. En
              En general, el uso de un esquema de bloqueo ayudará a garantizar la correcta
              salida pero reduce el rendimiento. si no quieres
              tolerar la diferencia de rendimiento, simplemente haga arreglos para
              cada proceso para producir un archivo de salida separado (o
              de lo contrario, use recursos separados).

       -o, --open-tty 
              Vuelva a abrir stdin como /dev/tty en el proceso secundario anterior
              ejecutando el comando. Esto es útil si quieres xargs
              para ejecutar una aplicación interactiva.

       -p, --interactivo
              Preguntar al usuario si debe ejecutar cada línea de comando y
              leer una línea de la terminal. Solo ejecuta la línea de comando
              si la respuesta comienza con 'y' o 'Y'. Implica -t .

       --process-slot-var = nombre 
              Establezca el nombre de la variable de entorno en un valor único en
              cada proceso hijo en ejecución. Los valores se reutilizan una vez que el niño
              los procesos salen. Esto se puede utilizar en una carga rudimentaria.
              esquema de distribución, por ejemplo.

       -r, --no-ejecutar-si-vacío
              Si la entrada estándar no contiene espacios que no sean espacios en blanco, no
              no ejecutar el comando. Normalmente, el comando se ejecuta una vez
              incluso si no hay entrada. Esta opción es un GNU
              extensión.

       -s max-chars , --max-chars =max-chars 
              Usar como máximo caracteres max-chars por línea de comando,
              incluyendo el comando y los argumentos iniciales y el
              terminando nulos al final de las cadenas de argumentos.
              El mayor valor permitido depende del sistema y es
              calculado como el límite de longitud del argumento para exec, menos el
              tamaño de su entorno, menos 2048 bytes de headroom. Si
              este valor es más de 128KiB, 128Kib se utiliza como el
              valor por defecto; de lo contrario, el valor predeterminado es el
              máximo. 1 KiB son 1024 bytes.  xargs se adapta automáticamente
              a restricciones más estrictas.

       --mostrar-límites
              Mostrar los límites en la longitud de la línea de comandos que son
              impuesto por el sistema operativo, xargs 'elección de búfer
              tamaño y la opción -s . Canalice la entrada desde /dev/null 
              (y tal vez especifique --no-run-if-empty ) si no quiere
               que xargs haga nada.

       -t, --verbose
              Imprima la línea de comando en la salida de error estándar antes
              ejecutándolo

       -x, --exit 
              Salir si se excede el tamaño (ver la opción -s ).

       --help Imprime un resumen de las opciones para xargs y sale.

       --version 
              Imprime el número de versión de xargs y sale.

       Las opciones --max-lines ( -L , -l ), --replace ( -I , -i ) y --max- 
       args ( -n ) son mutuamente excluyentes. Si se especifican algunos
       al mismo tiempo, xargs generalmente usará la opción
       especificado en último lugar en la línea de comando, es decir, restablecerá el valor
       de la opción infractora (dada antes) a su valor predeterminado.
       Además, xargs emitirá un diagnóstico de advertencia en stderr .
       La excepción a esta regla es que el valor especial max-args 1 
       (' -n 1 ') se ignora después de la opción --replace y sus alias -I 
       y -i , porque en realidad no entraría en conflicto.
       
       ```
