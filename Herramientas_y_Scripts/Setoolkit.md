![PicsArt_07-15-08 46 53](https://user-images.githubusercontent.com/103068924/167248447-1a933ca8-3d5c-426a-8450-c7595ee5b7cd.png)


# Setoolkit


## ¿Qué es Setoolkit?


 Se trata de un kit de herramientas de ingeniería social (SET) creado por Devid Kennedy. El equipo de Devid mantiene muy activo su set de herramientas
 de forma que siempre se agregan nuevas funciones y ataques. Más recientemente, también se agregaron varias herramientas de ingeniería no social a SET, 
 lo que la convierte en una herramienta de ataque muy sólida.
 
## Instalación:


Para instalar esta herramienta realizaremos lo siguiente, primero vamos a nuestro escritorio y creamos una carpeta llamada `SEToolkit`:


    cd Desktop
    
    mkdir SEToolkit


    cd SEToolkit
    
Ahora nos clonaremos el siguiente repositorio de GitHub en el directorio `SEToolkit`:


    git clone https://github.com/trustedsec/social-engineer-toolkit setoolkit/
    
Una vez clonado, entramos en el directorio `setoolkit`:


    cd setoolkit
    
Podemos ver mediante `ls` todos los archivos clonados. Ahora procederemos a la instalación de todos los
requisitos necesarios para Setoolkit:


    sudo pip3 install -r requirements.txt
    
Y finalmente realizamos la instalación de la herramienta:


    sudo python setup.py


Con esto ya tendríamos instalada nuestra herramienta. Importante, si el usuario
normal no os permite utilizarla es porque os faltan permisos de ejecución y, por tanto,
tendréis que utilizar la herramienta como `root`.


## Ejecución:

Para ejecutarlo y poder acceder a sus múltiples herramientas, simplemente ejecutamos lo siguiente:

    sudo setoolkit
    
 ![Captura de pantalla -2022-05-07 11-59-13](https://user-images.githubusercontent.com/103068924/167250786-283ec573-70f5-4078-a2f2-d91efb79ab8a.png)
   
La interfaz de SET es muy intuitiva, simplemente tendremos que marcar el número del panel en función del tipo de ataque que
queramos realizar, y también, proporciona mucha información mediante en cada uno de sus paneles de opciones guiándote durante todo
el proceso.

![Captura de pantalla -2022-05-07 12-01-03](https://user-images.githubusercontent.com/103068924/167250791-12fd0a22-0e19-4bde-a4a0-87794bba7b38.png)


# Crear una página falsa para capturar credenciales:

En este ejemplo, voy a mostrar como crear mediante la herramienta SEToolkit como crear una página falsa de autentificación de Google, también
es posible aplicarlo a infinidad de páginas de registro o de relleno de credenciales, pero para el ejemplo usaremos una que viene
predefinida en la herramienta.

Empleando estos metedos, los cibercriminales engañan a sus víctimas haciéndose pasar por cualquier tipo de servicio o entidad y de esta
forma robarles todos los datos posibles, desde nombres o usuarios, hasta cuentas bancarias, números de tarjetas de crédito, contraseñas, etc,
interdependientemente de la longitud o dificultad de la contraseña, ya que simplemente se reporta al atacante cuando se ingresa dicha información.

En primer lugar, vamos a comprender como se realiza el ataque:

 1. Primero generaremos mediante `Setoolkit` una página falsa se inició de sesión de Google.
 2. Esta página quedará registrada en nuestra `localhost`.
 3. Finalmente, cuando se introduzcan las credenciales en la página, se nos reportaran en la terminal del programa.

Esto es un ejemplo muy simple que voy a mostrar como prueba, se puede realizar este ataque de maneras mucho más complejas y difíciles de detectar.
Recalco que emplear está herramienta con alguien que no te lo haya autorizado es completamente ilegal y que este artículo esta escrito con la 
finalidad de mostrar como actúan los cibercriminales. Dicho esto vamos a ver el ejemplo.

### Crear página de inicio de sesión de Google:

Ejecutamos la herramienta y seguimos los siguientes pasos:

    sudo setoolkit
    
![Captura de pantalla -2022-05-07 11-59-13](https://user-images.githubusercontent.com/103068924/167250804-90bf9142-c2a1-4b1e-985d-14566ee0b982.png)


La herramienta que vamos a utilizar es la `Social-Engienering Attacks` que corresponde al número `1`. Tener en cuenta que los números pueden 
variar en función de la versión, ya que periódicamente se incluyen herramientas y funciones. Introducimos `1` y pulsamos `Enter`:

    1

![Captura de pantalla -2022-05-07 12-03-51](https://user-images.githubusercontent.com/103068924/167250899-22e40731-f986-49bb-8770-fc69cc8c116b.png)

Ahora vamos a seleccionar el método de ataque `Website Attack Vectors` que me corresponde con el número `2`:

    2

![Captura de pantalla -2022-05-07 12-04-11](https://user-images.githubusercontent.com/103068924/167250973-973ac307-8a93-45c4-87b6-41c3513bc368.png)

Lo siguiente que le debemos de indicar, es el tipo de ataque web que vamos a utilizar, en este caso, que lo que queremos es robar sus credenciales,
utilizaremos el modo `Credential Harvester Attack Method` que corresponde con el número `3`:

    3

![Captura de pantalla -2022-05-07 12-05-00](https://user-images.githubusercontent.com/103068924/167251054-2845cb88-ef30-4c65-b09d-b16145fae9f1.png)

Ya lo tenemos casi, solo nos queda especificar que clase de página vamos a mostrar. Como veis también nos da la opción `2` que es la de clonar
algún sitio web y así ajustarse más al tipo de víctima. En nuestro caso vamos a seleccionar la opción `1` que ya nos muestra algunas páginas web
que la herramienta nos muestra de serie, así que seleccionaremos `Web Templates`:

    1
    
![Captura de pantalla -2022-05-07 12-06-26](https://user-images.githubusercontent.com/103068924/167251456-d2a336e5-e0af-4c42-a658-febfdfe64f0f.png)

Vemos como la misma herramienta nos muestra tres opciones predefinidas, `Java`, `Google` y `Twitter`. Vamos a utilizar la de `Google` así que marcamos
la `2`. 

![Captura de pantalla -2022-05-07 12-06-43](https://user-images.githubusercontent.com/103068924/167251217-4f4929d6-6c91-43fe-971c-9c5e069937e1.png)

En caso de preguntarnos si utilizamos NAT se lo indicamos y luego simplemente presionamos `enter` y veremos como el sistema se quedará a la escucha:

![Captura de pantalla -2022-05-07 12-08-14](https://user-images.githubusercontent.com/103068924/167251508-2b5246f0-f6fc-4ed3-a212-375c66b1b88b.png)

La página ya está completamente funcional, ahora simplemente nos dirigimos a un navegador, en mi caso Firefox y para ejecutar la página escribimos 
`localhost` o `127.0.0.1` que es donde se aloja la página de forma predeterminada. Esto podemos cambiarlo, pero para este tutorial nos sobrará.
Vamos al navegador y abrimos la página:

![Captura de pantalla -2022-05-07 12-08-42](https://user-images.githubusercontent.com/103068924/167251622-431634e3-348c-4e9a-83d2-61c668831ec9.png)


![Captura de pantalla -2022-05-07 12-08-56](https://user-images.githubusercontent.com/103068924/167251629-6efa83d6-019c-4535-a55e-a7b4ef96d17f.png)


![Captura de pantalla -2022-05-07 12-09-11](https://user-images.githubusercontent.com/103068924/167251634-4a089f24-3f1a-4fb4-86a9-67dbc21332f1.png)


Como vemos la página es muy realista, ahora simplemente escribimos unas credenciales (no tienen por qué ser válidas, el programa nos reportara todo
lo que se escriba). Para que se vea que esto funciona independientemente de la dificultad de la contraseña, hemos introducido un password con 
variedad de caracteres.

![Captura de pantalla -2022-05-07 12-10-00](https://user-images.githubusercontent.com/103068924/167251722-c20563b1-2765-41fc-a781-8ec01110a1b4.png)

![Captura de pantalla -2022-05-07 12-10-17](https://user-images.githubusercontent.com/103068924/167251727-335e63bb-4617-4f40-9d80-132528b28293.png)

Y finalmente podemos ver como se nos reporta todo en la terminal desde la cual ejecutamos el ataque:

![Captura de pantalla -2022-05-07 12-10-37](https://user-images.githubusercontent.com/103068924/167251748-0c989b4d-453f-4849-8508-71b0b71283e1.png)


    
