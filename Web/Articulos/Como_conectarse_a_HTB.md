# Como conectarse a las máquinas de Hack the Box por VPN:

<a href="https://www.hackthebox.com/" style="text-decoration:none">https://www.hackthebox.com/</a> 

En este artículo os mostraré como conectarse a cualquier servicio de HTB (Hack The Box) a través de sus VPN.
HTB utiliza VPN para los distintos servicios que se utilizan. Resumiendo, las `starting_points`  utilizan una VPV, las `máquinas` usan otras
y así con cada uno de los distintos grupos de servicio que ofrecen, como su `academia`, los `battlegrounds`, etc.

En primer lugar, debemos estar registrados en la plataforma, la plataforma ofrece una gran cantidad de máquinas gratuitas, y luego, también nos ofrece
distintas versiones de pago, las cuales ofrecen grandes ventajas, mayor número de máquinas, nos da la opción de realizar máquinas retiradas, más clases
y muchas otros productos. Todo esto lo podemos ver en la misma página de inicio de Hack the Box.

Para conectarnos con HTB primero tendremos que descargarnos un archivo .ovpn que HTB nos proporcionará. Para ello, desde nuestra página, una vez hemos
ingresado, nos dirigimos al boton que se encuentra arriba a la derecha que pone `Connect to HTB`:

![Captura de pantalla -2022-04-28 18-51-22](https://user-images.githubusercontent.com/103068924/165812472-cdb9d43e-6d38-4b5a-a0bb-ec6a693ff456.png)

Dependiendo del tipo de servicio que queremos realizar, nos descargamos una u otra, en el caso de querer realizar una máquina nos descargaremos
el archivo de la pestaña `máquinas`, en nuestro caso, como estamos empezando, primero realizaremos las máquinas de introducción que son las
`starting_points`, para ello entramos en su pestaña:

![Captura de pantalla -2022-04-28 18-51-59](https://user-images.githubusercontent.com/103068924/165812514-d2253d16-2e15-406c-b542-32a1c105d596.png)

Si disponemos de una máquina Linux o de algún entorno virtual (Virtual Box, VMware,etc) desde el cual vamos a acceder (ya sea con ParrotOS, Kali, Arch o
cualquier distribución Linux) nos descargaremos la versión `OpenVPN`: 

![Captura de pantalla -2022-04-28 18-53-02](https://user-images.githubusercontent.com/103068924/165812546-e2978df3-8819-4df2-a43c-34e70224e983.png)

Aquí simplemente establecemos nuestra región, que nos conectamos a través de una VPN y que vamos a utilizar el protocolo `UDP` (En caso de no funcionaros 
probar el protocolo TCP), luego presionamos `Download VPN`:

![Captura de pantalla -2022-04-28 18-53-31](https://user-images.githubusercontent.com/103068924/165812567-2c3715ba-0f4f-44c1-9c34-d6fee4ca88f8.png)

Una vez descargado nuestro archivo `.ovpn`, abrimos una terminal, nos dirigimos al directorio donde se nos haya descargado el archivo, y yo aconsejo
crearse un directorio específico para los distintos archivos `.ovpn` que HTB nos va proporcionando para los distintos servicios.

Ahora solo faltaría ejecutar el siguiente comando:

    sudo openvpn starting_Ponint_Firox.ovpn
    
sudo :  Nos permite actuar como root, y por tanto, tenemos todos los privilegios.

openvpn : Ejecuta la orden de abrir la VPN

starting_point_firox.ovpn : Es el archivo que nos hemos descargado.

![Captura de pantalla -2022-04-28 18-55-55](https://user-images.githubusercontent.com/103068924/165812615-c019f96b-b8af-4de5-87e9-2dba400611bd.png)

![Captura de pantalla -2022-04-28 18-56-46](https://user-images.githubusercontent.com/103068924/165812637-ffc50713-0add-4623-8a12-9be4142545c7.png)

En la parte final, nos reporta que la conexión se ha realizado de forma correcta. No debemos cerrar esta terminal mientras estemos trabajando con 
la máquina, ya que si cerramos la terminal perdemos la conexión con la VPN y, por tanto, no podremos comunicarnos con la máquina.

![Captura de pantalla -2022-04-28 18-57-09](https://user-images.githubusercontent.com/103068924/165812667-5ce72375-b7db-48bc-96ae-6461639984a1.png)

Veremos que el botón anterior se nos abra puesto en verde indicándonos a que servicio de VPN estamos conectados:

![Captura de pantalla -2022-04-28 18-57-29](https://user-images.githubusercontent.com/103068924/165812691-802d5ceb-41cf-40e8-b1de-d9c790a89081.png)

Finalmente, par iniciar una máquina, simplemente pulsamos la `máquina` o `startging_point` que queramos realizar, comprobamos que la VPN está bien 
conectada (Primer tick verde) y luego pulsamos `Spawn Machine`. 

![Captura de pantalla -2022-04-28 18-58-18](https://user-images.githubusercontent.com/103068924/165812720-dde2f00b-839a-4341-a4c9-466e18c2d703.png)

Una vez realizada la conexión, nos reportará la `Ip` de la máquina que vamos a explotar.

![Captura de pantalla -2022-04-28 19-00-08](https://user-images.githubusercontent.com/103068924/165812758-4e6bdec9-f163-42b0-b1ab-a3f7a19a5822.png)

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
