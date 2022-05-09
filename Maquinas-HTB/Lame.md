# HTB-Lame


## Fase de Reconocimiento

En primer lugar, debemos asegurar que estamos conectados a la víctima y tratar de recopilar la máxima información posible.

 Para verificar la conexión y tener una primera toma de contacto utilizaremos el comando `ping`.
 
    ping 10.10.10.3

 Mediante este comando podemos obtener la siguiente información:
 
 - Verificar la conexión.
 - La latencia. Podemos observar el tiempo de recorrido
   de un paquete.  
 - Podemos obtener la Ip de un dominio.
 - Determinar si estamos frente a un SO Linux o Windows:
     Windows ttl = 128
     Linux ttl = 64
     
    nmap -p- --open -T5 -v -n 10.10.10.3 -oG allPorts
  
![Captura de pantalla -2022-05-07 17-30-56](https://user-images.githubusercontent.com/103068924/167393165-e89c0c25-6ae5-48d4-b779-db308bad145f.png)
  
`-p-` : Escanea todo el rango de puertos.
  
`--open` : Solo nos mostrará puertos con el estatus abierto.
             
`-T5` : Controla el tiempo y el rendimiento del escaneo donde 1 es el más lento  y 5 el más rápido.
             
`-v` : Verbose. Recopila los puertos abiertos por TCP y los reporta por consola.
           
`-n` : Anula la resolución DNS.
    
`-oG` : Exportar los resultados en formato grepeable.
  
`allPorts` : Nombre del archivo. Si no existe lo creará.
  
 De esta manera podremos revisar los puertos que estaban abiertos en cualquier momento.  
  
![Captura de pantalla -2022-05-07 17-32-33](https://user-images.githubusercontent.com/103068924/167393202-bf6a1888-3079-4e22-a786-3a2ac8c9592f.png)

  Tras conocer los puertos TCP abiertos, realizaremos un segundo escaneo enfocado en los puertos abiertos para ver la información que nos reportan y
  exportarlo en formato nmap al archivo 'targed'.
 
    nmap -sC -sV -n -v -p21,,22,139,445,3632 -oN target

![Captura de pantalla -2022-05-07 17-34-44](https://user-images.githubusercontent.com/103068924/167393674-9798ac56-230c-4ad8-99cd-4f385aff6c07.png)
   
`-sC` : Lanza scrips básicos de reconocimiento.
 
`-sV` : Localiza la versión y servicio de los puertos definidos. 
 
`-p` : Puertos a escanear.    
 
`-oN` : Reporta los resultados en formato nmap al archivo `target`.
  
  
![Captura de pantalla -2022-05-07 17-52-38](https://user-images.githubusercontent.com/103068924/167393829-bc058509-3ec1-4eab-8997-57e2afb97bc7.png)

Vemos que en el puerto 21/tcp corre un servicio ftp con la versión `vsftpd 2.3.4`. Vamos a tratar de buscar alguna vulnerabilidad para está versión 
en concreto. Para realizar la busqueda utilizaremos la herramienta `searchsploit`. En caso de no tenerlo lo instalamos:

    sudo apt install searchsploit
    
Luego lo ejecutamos y le especificamos la versión para que nos busque el `exploit` adecudo:    

    searchsploit vsftpd
    
![Captura de pantalla -2022-05-07 17-52-16](https://user-images.githubusercontent.com/103068924/167394414-f5e72232-7c5b-44bb-8326-7b580addf1b0.png)

Vemos como para la versión 2.3.4 existe una herramienta llamada `Backdoor Command Execution (Metasploit)` alojado en el PATH `unix/remote/17491.rb`.
Veamos el código a ver que información utiliza para vulnerar está versio:

    searchsploit -x unix/remote/17491.rb
    
`-x` : Para examinar un archivo.

![Captura de pantalla -2022-05-09 13-07-04](https://user-images.githubusercontent.com/103068924/167397809-ad87df83-57fe-40c4-a481-05d6e80623a5.png)

![Captura de pantalla -2022-05-09 13-07-35](https://user-images.githubusercontent.com/103068924/167397813-ccae4253-80e9-43c6-aea4-28fa99ef8efc.png)

Esta herramienta por lo que parece, utiliza una serie de cadenas en el usuario para tratar de ganar acceso por el puerto 6200. Yo lo he intentado 
manualmente y mediante `Metasploit` y no he podido acceder mediante está herramienta.

![Captura de pantalla -2022-05-09 13-01-26](https://user-images.githubusercontent.com/103068924/167398192-d205b407-614e-439e-aa2c-e18d3a6060e3.png)

Al ver que esto no funcionaba, busque otro vector de ataque y vemos que por los puertos 139 y 445 corre un servicio `Samba`.

![Captura de pantalla -2022-05-09 13-17-47](https://user-images.githubusercontent.com/103068924/167399970-c676bcde-785d-4bea-936f-eaed02ccc5dc.png)

Vemos tambien que en el puerto 445 nos indiaca la versión `3.0.20`, así que buscamos sobre este servicio:

    searchsploit samba 3.0.20
        
![Captura de pantalla -2022-05-09 13-22-01](https://user-images.githubusercontent.com/103068924/167399895-d6be29db-a564-4d30-894b-78efb0a9dec4.png)

## Metasploit

Vamos a tratar de acceder mediante `Metasploit` utilizando la herramienta reportada anteriormente. En primer lugar ejecutamos `metasploit`:

    msfconsole
    
Buscamos la versión de Samba para asegurarnos que tenemos la herramienta y ver donde se aloja:

    search samba 3.0.20
    
![Captura de pantalla -2022-05-09 13-30-56](https://user-images.githubusercontent.com/103068924/167402968-186b60cc-f240-4690-9d65-74faea05daa5.png)

Ahora mediante la variable `options` podemos ver los campos que tenemos que rellenar para poder realizar el ataque.

![Captura de pantalla -2022-05-09 13-32-08](https://user-images.githubusercontent.com/103068924/167403226-78c7e9b2-a4ab-48a2-b9bd-c0cff8e697e5.png)

Para cambiar los campos utilizamos la variable `set` y el campo que deseamos cambiar. Primero introduciremos el localhost `LHOST`, es nuestra IP o en este caso
la IP de la VPN de Hack the Box:

![Captura de pantalla -2022-05-09 13-35-27](https://user-images.githubusercontent.com/103068924/167403416-26917d45-b54e-4539-90d9-1d40a43bc32e.png)

Ahora especificamos el puero de escucha, yo voy a utilizar el `8080`:

![Captura de pantalla -2022-05-09 13-33-13](https://user-images.githubusercontent.com/103068924/167403656-cf7c6037-69b3-46f5-92cc-69c1d2d6126f.png)

Ahora especificaremos de la misma manera el remote host `RHSOT` en este caso la Ip de la máquina:

![Captura de pantalla -2022-05-09 13-34-53](https://user-images.githubusercontent.com/103068924/167403867-17ecf37e-5e8a-4e41-9403-ff6d701b08b2.png)

Y finalmente el puerto abierto `RPORT` por el que corre el servicio Samba, en este caso el puerto `139`, este campo se suele
rellenar de forma autimática.

![Captura de pantalla -2022-05-09 13-52-53](https://user-images.githubusercontent.com/103068924/167404426-44f0a7d5-57c6-475a-9c11-8079cb1492b4.png)

Y finalmente ejecutamos Metasploit:

    exploit

![Captura de pantalla -2022-05-09 13-36-49](https://user-images.githubusercontent.com/103068924/167404633-ab7437bf-1c2d-43a3-8c9e-ee57d00c5337.png)

Vemos como nos crea la shell y que a de más estamos registrados como `root`.

Finalmente como estamos registrados como `root` podemos buscar las flags sin ningún problema. Vemos que la flag del usuario la 
podemos encontrar en el directorio `/home/makis/user.txt`.

![Captura de pantalla -2022-05-09 13-39-09](https://user-images.githubusercontent.com/103068924/167404984-24576d4e-346f-4162-9f66-57510b3f9616.png)

Y que la flag del usuario `root` lo podemos encontrar en el directorio `/root/root.txt`.

![Captura de pantalla -2022-05-09 13-37-35](https://user-images.githubusercontent.com/103068924/167405126-6bd4e482-5ba2-4c22-b5b3-a88cf3733ecd.png)

![Captura de pantalla -2022-05-07 18-32-07](https://user-images.githubusercontent.com/103068924/167405180-12c27e0a-f370-4788-baeb-6b725da56e99.png)

  
  
  
