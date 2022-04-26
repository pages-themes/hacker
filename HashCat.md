![hashcat](https://user-images.githubusercontent.com/103068924/165367806-d273a082-b4ff-4208-a27d-67ebd83d4610.png)

### HashCat

# ¿Qué es HashCat?

Hashcat es un descifrador de contraseñas popular y eficaz ampliamente utilizado tanto por probadores de penetración
como por administradores de sistemas, así como por delincuentes y espías.

Su funcionamiento básicamente consiste en utilizar diccionarios precalculados, tablas y métodos de fuerza bruta 
para tratar de encontrar una forma eficaz y eficiente de descifrar contraseñas.

Estas contraseñas son procesadas por un algoritmo para crear los hash. Existen diversas clases de algoritmos, pero
lo que tenemos que tener en cuenta es que descifrar un hash es inviable, ya que se necesitaria una gran potencia 
computacional y mucho tiempo para tratar de descifrarlo. 

En cambio, HashCat no trata de descifrar el hash, simplemente comprueba las miles de palabras y hashes que tienen
guardados en su base de datos hasta dar con el mismo que le hemos introducido. Este proceso es mucho más rápido ya
que la herramienta cuenta con grandes librerias actualizadas.

# Instalación:

Para instalar en cualquier distribución debian:

    sudo apt install hashcat
    
![Captura de pantalla -2022-04-26 20-50-38](https://user-images.githubusercontent.com/103068924/165371300-6a365958-6308-4a7a-a490-7cc56deec53a.png)

En Kali Linux y ParrotOS suele venir instalada de forma predeterminada.

# Ejecución:

Para ver las distintas optiones y como ejecutar la herramienta:

    hashcat --help

Para ejecutar la herramienta, debemos especificar en que algoritmo esta basado el hash, esto podemos verlo meidante
la herramientas [HashID](./HashId.html) o [Hash-Identifier](./Hash-Identifier.html).

Crearemos un archivo, por ejemplo 'hash2' y pegamos el número hash que queremos descifrar.

    nano hash2
    
 Guardamos (Cntrl + o) y salimos (Cntrl + x).
 
 
 
 
