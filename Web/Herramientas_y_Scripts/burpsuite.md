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

Una vez instalado FoxyProxy en el navegador, simplemente pulsamos sobre él y luego pulsamos el botón `Options`. Tras abrirse el programa, en la parte izquierda, nos
dirigimos a la opción `Add`.

De Título podemos poner `BurpSuite` para poder identificarlo, el color que deseamos (En mi caso verde, que es más vistoso) y ahora vamos a lo importante.

Para poder establecer conexión con BurpSuite vamos a usar un Proxy de tipo `HTTP` y una dirección Ip `127.0.0.1` (Esta dirección Ip es nuestro localhost) por
el puerto 8080. 

`Nota:` En caso de tener problemas a la hora de capturar el tráfico, tener en cuenta de que no estáis usando el puerto 8080 para otros procesos. En tal caso
emplear un puerto distinto o matar el proceso.

Con esto ya tendríamos FoxyProxy configurado, pulsamos guardar `save` y veremos tras guardas como ya nos aparece nuestro nuevo Proxy en el icono de la extensión
si pulsamos encima con el ratón.

### Configuración de BurpSuite:

Para configurar el proxy debemos acceder a la pestaña `Proxy` -> `Options` y nos aseguramos que la opción `Running` esté marcada. Luego introducimos en la columna 
`Interface` los mismos datos con los que hemos configurado FoxyProxy, que en nuestro caso es nuestro localhost por el puerto 8080 (127.0.0.1:8080).

Ya tendríamos configurado BurpSuite y listo para su funcionamiento.

### Como Interceptar peticiones básicas.



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

