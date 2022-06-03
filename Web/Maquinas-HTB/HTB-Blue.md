![Captura de pantalla -2022-05-13 11-40-50](https://user-images.githubusercontent.com/103068924/168258096-c362a48f-e5af-4500-822a-72db7894bbb1.png)

# Hack The Box-Blue

En primer lugar, nos creamos un directorio con el nombre de la máquina desde el que trabajaremos:

    sudo mkdir Blue
    
Ahora, mediante la función <a href="../Herramientas_y_Scripts/mkt.html" style="text-decoration:none">`mkt`</a> que tengo previamente definida en la `.zshrc` crearemos nuestros directorios
de trabajo:

    sudo mkt

Esta función está definida para crearnos cuatro directorios (`nmap`, `content`, `exploits` y `scripts`) desde los cuales poder trabajar a la hora de
realizar las máquinas de HTB.

## PING

Ejecutamos un `ping` y vemos como nos reporta un ttl=127, por tanto, ya sabemos que estamos frente una máquina Windows.

    ping -c 1 10.10.10.40
    
![Captura de pantalla -2022-05-13 02-23-49](https://user-images.githubusercontent.com/103068924/168258904-068e429f-b39a-4aa5-84f2-921190929c68.png)

## NMAP --> <a href="../Herramientas_y_Scripts/Nmap.html" style="text-decoration:none">Link</a>

Ahora mediante `nmap` realizaremos un escaneo de puertos:

    nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 10.10.10.40 -oG allPorts
    
`-p-` : Escanea todo el rango de puertos.
  
`--open` : Solo nos mostrará puertos con el estatus abierto.

`-sS` : El escaneo SYN realizar rápidamente, escaneando miles de puertos por segundo en una red rápida que no se ve obstaculizada por firewalls intrusivos.

`--min-rate` : Controla directamente la tasa de escaneo. Nmap intentará mantener la velocidad de envío en 5000 paquetes por segundo o más.

`-vvv` : Triple verbose. Recopila los puertos abiertos por TCP y los reporta por consola. Cuanto más verbose más información reporta mientras se realiza el escaneneo.

`-n` : Anula la resolución DNS.
    
![Captura de pantalla -2022-05-13 12-02-21](https://user-images.githubusercontent.com/103068924/168261222-f452e600-c30b-4d2b-b771-8fb42b8227b2.png)

![Captura de pantalla -2022-05-13 12-02-42](https://user-images.githubusercontent.com/103068924/168261243-724fd7e1-4fc9-44ea-8ccc-4ad16c25fa43.png)

Vemos como nos reporta los puertos 135,139,445 y 49157. Lo que de momento más me llama la atención es que por el puerto 445 corre un servicio
`microsoft-ds`. Vamos a realizr un segundo escaneo mediante `nmap` lanzado una serie de scripts de reconocimiento para ver si nos reporta algo más
de información de estos puertos en concreto.

    nmap -sC -sV -v -n -p135,139,445,49157 10.10.10.40 -oG target
    
![Captura de pantalla -2022-05-13 12-13-24](https://user-images.githubusercontent.com/103068924/168263122-4832c99c-8c10-447b-ae68-994e27bd978c.png)
   
`-sC` : Lanza scrips básicos de reconocimiento.
 
`-sV` : Localiza la versión y servicio de los puertos definidos. 
 
`-p` : Puertos a escanear. 
 
`-oN` : Reporta los resultados en formato nmap al archivo `target`.

![Captura de pantalla -2022-05-13 12-14-09](https://user-images.githubusercontent.com/103068924/168263141-ceb0d066-7c9b-4651-930e-08c0d33c0b85.png)

Vemos como nos da un poco más de información, pero lo más interesante es que nos reporta la versión exacta del sistema Windows, que este caso nos
reporta un `Windows 7 Professional 6.1`.

![Captura de pantalla -2022-05-13 12-23-13](https://user-images.githubusercontent.com/103068924/168264574-29ff87fd-bd2c-415a-83be-4726dd0798eb.png)

Ahora vamos utilizar `nmap` para lanzar un script más especifico y tratar de reportar alguna vunerabilidad para está version de Windows 7. Pero primero
vamos a comprobar que disponemos del script. Para poder ver todo los scripts de `nmap`, podemos utilizar el comando `locate .nse`, donde se nos desplegará
una lista de todos los disponibles.

    locate .nse
    
Ahora para poder filtrar un poco los resultados, de forma paralela concatenamos un `xargs grep "categories"` y de está forma filtraremos por todos
los resultados que incluyen la palabra `categories`.

    locate .nse | xargs grep "categories"
    
Y ahora para terminar de filtrar los resultados dentro de categories, vamos a quedarnos solo con los resultados que nos especifican los scripts entre
comillas, lo cual se conoce como `DATA`. Para poder filtrar pro data utilizaremos la expresión regular `'".*?"'` de la siguiente manera:

    locate .nse | xargs grep "categories" | grep -oP '".*?"'
    
Finalmente vamos a quitar las categorias que se repitan mediante `sort -u`:

    locate .nse | xargs grep "categories" | grep -oP '".*?"' | sort -u
    
Bien, ahora para lanzar los scripts que deseamos que son `vuln` y `safe`, básicamente estos scripts lanzan un chequeo para tratar de  reportar las vulnerabilidades 
conocidas del sistema y `safe` lo utilizamos para no causar ningún tipo de denegación de servicio en el sistema que vamos a escanear.

    nmap --script "vuln and safe" -p445 10.10.10.40 -oN smbScan

 `--script "vuln and safe"` : Especifica los scripts que vamos a utilizar.
 
 `-p445` : Especifica el puerto que vamos a chequear.
 
 `-oN smbScan` : Exporta los resultados en formato nmap al archivo smbScan.
 
 Vemos como nos reporta que este sistema es vulnerable al `ms17-010` más conocido como EthernalBlue. Ahora que ya conocemos una vulnerabilidad 
 vamos a tratar de buscar un exploit funcional.
 
     searchsploit ms17-010
     
![Captura de pantalla -2022-05-13 02-38-33](https://user-images.githubusercontent.com/103068924/168269407-839dd7e4-9274-4903-af8b-a65e20e8cb8a.png) 
     
 Vemos que `Metasploit` nos reporta el exploit `SMB Remote Code Execution Scanner (MS17-010) (Metasploit)`. Vamos abrir Metasploit y a buscar si 
 disponemos del exploit.
 
 ## Metasploit --> <a href="../Herramientas_y_Scripts/Metasploit.html" style="text-decoration:none">Link</a>
 
 Abrimos Metasploit:
 
     msfconsole
     
 ![Captura de pantalla -2022-05-13 02-39-06](https://user-images.githubusercontent.com/103068924/168270105-48d203d3-c899-4769-87ff-2700713fa253.png)
 
 Ahora buscamos filtrando por la vulnerabilidad `ms17-010`:
 
     search ms17-010
     
![Captura de pantalla -2022-05-13 13-05-57](https://user-images.githubusercontent.com/103068924/168271708-92c389f8-74c0-4f21-8970-d877a1b5b355.png)

Vemos como la vulnerabilidad EthernarBlue aparece la primera, para seleccionarla utilizamos el comando `use` y especificamos el número del `exploit` en
la lista, en este caso el `0`:

    use 0

![Captura de pantalla -2022-05-13 13-06-25](https://user-images.githubusercontent.com/103068924/168272058-197fb5f0-ff1e-4d58-b42f-3eefb77a5105.png)

Ahora que ya tenemos el exploit seleccionado, tenemos que configurarlo y preparado para el ataque. Para ver las opciones del exploit utilizamos el
comando `options`:

![Captura de pantalla -2022-05-13 13-06-45](https://user-images.githubusercontent.com/103068924/168272431-3800b374-8f02-418f-9d8b-9e4a66dc7227.png)

Para configurar el exploit debemos modificar el `RHOSTS` que es la Ip de la víctima, el `LHOST` que será nuestra Ip pública, en este caso la VPN de 
hack the box y finalmente, especificamos el puerto de escucha `LPORT`.

![Captura de pantalla -2022-05-13 13-25-31](https://user-images.githubusercontent.com/103068924/168273836-ea8929fd-7167-4988-ab1f-3b2378dce33d.png)

![Captura de pantalla -2022-05-13 13-26-24](https://user-images.githubusercontent.com/103068924/168273919-0f1bd7da-2bfb-406e-8fa1-069e84a26753.png)

Finalmete ejecutamos el exploit:

    exploit
    
![Captura de pantalla -2022-05-13 13-09-48](https://user-images.githubusercontent.com/103068924/168273321-abd7ac24-82f9-4e54-b183-6f2f70132efb.png)

Si todo funciona correctamente se nos tendría que abrir una shell. En caso de daros algún error, es posible que tengáis que reiniciar la máquina y
el Metasploit y volver a intentar el ataque.


![Captura de pantalla -2022-05-13 17-48-20](https://user-images.githubusercontent.com/103068924/168326527-fa31beac-78dc-4236-b075-22186c53a8b4.png)


Esta vulnerabilidad es muy grave, ya que mediante este exploit pasamos a tenerlos máximos privilegios, por tanto, podemos ver todos los archivos, 
incluida la flaf de `root`.

Para encontrar la primera flag simplemente nos dirigimos al directorio `C:\Users\haris\Desktop`:

    cd /Users/haris/Desktop
    
Podemos listar los archivos del directorio mediante `ls` y mediante `cat` nos reportará por consola el contenido.

![Captura de pantalla -2022-05-13 17-50-12](https://user-images.githubusercontent.com/103068924/168327189-8d5ecd5b-e4f5-47fb-815d-3d6ecae6851a.png)

Finalmente, la flag del usuario `root` la podemos encontrar en el directorio `C:\Users\Administrator\Desktop\`.

![Captura de pantalla -2022-05-13 17-50-59](https://user-images.githubusercontent.com/103068924/168327406-bb7a2c94-5b04-4219-ac01-ec0a2b6219ec.png)

![Captura de pantalla -2022-05-13 17-51-26](https://user-images.githubusercontent.com/103068924/168327424-9413230b-de79-4710-9efc-140e15dad727.png)

![Captura de pantalla -2022-05-13 11-40-500](https://user-images.githubusercontent.com/103068924/168327730-476d67f7-5298-41f3-8f38-c92a0bb8fbff.png)

  
 ---
---
  
    
<html lang="en">
<head>
  
</head>
<body>

<script src="https://utteranc.es/client.js"
    repo="F1r0x/gestion-comentarios"
    issue-term="pathname"
    theme="github-light"
    crossorigin="anonymous"
    async>
</script>
          
    
  </body>
</html>
  
  
---
--- 
  
 
 



    
