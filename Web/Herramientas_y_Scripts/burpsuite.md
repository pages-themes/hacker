# BurpSuite

## ¿Qué es BurpSuite?

Burp Suite, también conocida como `la navaja suiza del pentester`, es una herramienta multifunción para realizar auditorías de seguridad a aplicaciones Web.
Integra diferentes componentes de pentesting y funcionalidades para realizar las pruebas y permite combinar pruebas tanto automáticas como manuales. La herramienta
Burp Suite está desarrollada y mantenida por la empresa `PortSwigger`, y cuenta con dos versiones: Burp Free (gratuita) y Burp Professional (de pago). La versión gratuita 
se puede encontrar ya instalada en Kali Linux, la distribución de Linux diseñada para auditorías y seguridad informática.

`Podeís Descargas BurpSuite en su págian Oficial` --> [Link](https://portswigger.net/burp/communitydownload)

Para instalar BurpSuite directamente desde la terminal (para sistemas como Parrot o Kali):

    sudo apt install burpsuite

## Herramientas Necesarias:

Para poder trabajar con BurpSuite vamos a necesitar otras dos herramientas imprescindibles, primero necesitaremos un navegador (preferentemente firefox) y luego 
también necesitaremos la aplicación o extensión llamada `Foxy Proxy`. Esta extensión también existe para Chrome.

`Descargas Foxy Proxy` --> [Link](https://addons.mozilla.org/es/firefox/addon/foxyproxy-standard/)

La dinámica será la siguiente, BurpSuite intercepta los datos del Navegador utilizando Foxy Proxy, de esta forma podremos trabajar con estos paquetes 
interceptados.

Para ello tendremos que configurar BurpSuite y FoxyProxy para establecer entre ellos una comunicación.

### Configuración de FoxyProxy:

Una vez instalado FoxyProxy en el navegador, simplemente pulsamos sobre él y luego pulsamos el botón `Options`.

![Captura de pantalla 2022-07-21 004025](https://user-images.githubusercontent.com/103068924/180094673-c0c8a26e-e183-4195-845d-de45fb2a6565.png)


Tras abrirse el programa, en la parte izquierda, nos dirigimos a la opción `Add`.

![Captura de pantalla 2022-07-21 003734](https://user-images.githubusercontent.com/103068924/180094303-6b18acaa-9fa0-4cba-9949-effbb85b68f9.png)

De Título podemos poner `BurpSuite` para poder identificarlo, el color que deseamos (En mi caso verde, que es más vistoso) y ahora vamos a lo importante.

Para poder establecer conexión con BurpSuite vamos a usar un Proxy de tipo `HTTP` y una dirección Ip `127.0.0.1` (Esta dirección Ip es nuestro localhost) por
el puerto 8080. 

![Captura de pantalla 2022-07-21 003827](https://user-images.githubusercontent.com/103068924/180094382-b78d1d9d-9db3-410d-9591-a99c8e266a43.png)

`Nota:` En caso de tener problemas a la hora de capturar el tráfico, tener en cuenta de que no estáis usando el puerto 8080 para otros procesos. En tal caso
emplear un puerto distinto o matar el proceso.

Con esto ya tendríamos FoxyProxy configurado, pulsamos guardar `save` y veremos tras guardas como ya nos aparece nuestro nuevo Proxy en el icono de la extensión
si pulsamos encima con el ratón.

![Captura de pantalla 2022-07-21 003510](https://user-images.githubusercontent.com/103068924/180094697-283b86e6-2f86-4d80-8653-b0e034ca1eeb.png)


### Actualizar BurpSuite:

Es recomendable borrar previamente la versión anterior de BurpSuite y instalar la nueva versión en su directorio `/opt/BurpSuiteCommunity/`.
Descargar el archivo `.sh` desde su página principal. Luego lo ejecutamos como administrador:
  
  sudo chmod +X BurpSuite.sh
    
Luego con el siguiente comando procedemos a su instalación:

    ./BurpSuite.sh

Una vez intalado para ejecutarlo escribimos `BurpSuiteCommunity`.


### Configuración de BurpSuite:

Para configurar el proxy debemos acceder a la pestaña `Proxy` -> `Options` y nos aseguramos que la opción `Running` esté marcada. Luego introducimos en la columna 
`Interface` los mismos datos con los que hemos configurado FoxyProxy, que en nuestro caso es nuestro localhost por el puerto 8080 (127.0.0.1:8080).

Ya tendríamos configurado BurpSuite y listo para su funcionamiento.

### Como Interceptar peticiones básicas.

Para interceptar una petición con BurpSuite, una vez tenemos el FoxyProxy configurado, preparamos la petición que queramos capturar, y activamos FoxyProxy.
Luego desde BurpSuite nos dirigimos al apartado `Proxy` y activamos la casilla en modo `Intercept is on`.

Finalmente realizamos la petición que queriamos capturar en el navegador y veremos como BupSuite la interceptará.



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

