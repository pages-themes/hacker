![john-the-ripper](https://user-images.githubusercontent.com/103068924/165256644-634b06fa-bd19-4238-8f4f-00bf93aa165e.png)

# JOHN THE RIPPER

John the Ripper es una herramienta de software gratuita para descifrar contraseñas. Originalmente desarrollado 
para el sistema operativo Unix, puede ejecutarse en quince plataformas diferentes (once de las cuales son versiones
específicas de la arquitectura de Unix, DOS, Win32, BeOS y OpenVMS). Es uno de los programas de prueba y ruptura de 
contraseñas más utilizados, ya que combina una serie de crackers de contraseñas en un solo paquete, detecta 
automáticamente los tipos de hash de contraseña e incluye un cracker personalizable. Se puede ejecutar en varios
formatos de contraseña cifrada, incluidos varios tipos de hash de contraseña cifrada que se encuentran más comúnmente
en varias versiones de Unix (basadas en DES, MD5 o Blowfish), Kerberos AFS y Windows NT/2000/XP/2003 LM hash.

Los módulos adicionales han ampliado su capacidad para incluir hash de contraseñas basadas en MD4 y contraseñas
almacenadas en LDAP, MySQL y otros.

## Instalación:

John the Ripper viene preinstalado con Parrot OS y Kali Linux, sin embargo, si no lo tiene, puedes instalarlo desde 
el repositorio:

    sudo apt install john
    

## Instrucciones de uso:

Para utilizar John, primero debemos de entender bien como funciona el sistema de hash y de contraseñas. 

Antes de ejecutrar John, tendremos que extraer el hash del archivo que queremos descifrar. Para posteriormente saber
que algoritmo de hash utiliza, y luego, por medio de un diccionario, utilizar fuerza bruta hasta descibrar el hash.

Las funciones más típicas de hash de contraseñas son MD5, SHA-1, SHA2-256, SHA2-512 entre otras.

Actualmente los algoritmos más comunes para proteger las contraseñas son KDF: Argon2 (KDF) scrypt (KDF) bcrypt PBKDF2
(KDF). 

La principal diferencia entre un KDF y una función de hash de contraseñas, es que la longitud con los KDF
es arbitraria, y en las típicas funciones hash tienen una salida de longitud fija.

No obstante, se siguen utilizando mucho las funciones de hash.

### Extraer hash de un .zip:

    zip2john [archivo.zip] > hash1
    
De está manera extraeremos el hash del archivo .zip en el archivo 'hash1' para posteriormente poder trabajar con él.

### Ejecutar John y el diccionario rockyou.txt:

    john --wordlist=/usr/share/wordlists/rockyou.txt hash1

![Captura de pantalla -2022-04-26 11-07-52](https://user-images.githubusercontent.com/103068924/165265458-aef0e310-ff62-4057-90ce-be6f8a65c45c.png)

El archivo rockyou.txt es un diccionario con mas de 14 millones de contraseñas. En caso de no tenerlo, podeis
descargarlo y guardarlo en la ruta /usr/share/wordlists/

Muy bien, ahora para poder ver la contraseña descifrada:

    john --show hash
    
 ![Captura de pantalla -2022-04-26 11-10-46](https://user-images.githubusercontent.com/103068924/165265589-818f0f4e-9b0b-42fa-ad8d-250a3a585601.png)

