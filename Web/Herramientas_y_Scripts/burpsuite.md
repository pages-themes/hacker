# BurpSuite

## ¿Qué es BurpSuite?

Burp Suite, también conocida como `la navaja suiza del pentester`, es una herramienta multifunción para realizar auditorías de seguridad a aplicaciones Web.
Integra diferentes componentes de pentesting y funcionalidades para realizar las pruebas y permite combinar pruebas tanto automáticas como manuales. La herramienta
Burp Suite está desarrollada y mantenida por la empresa `PortSwigger`, y cuenta con dos versiones: Burp Free (gratuita) y Burp Professional (de pago). La versión gratuita 
se puede encontrar ya instalada en Kali Linux, la distribución de Linux diseñada para auditorías y seguridad informática.

`Podeís Descargas BurpSuite en su págian Oficial` --> [Link](https://portswigger.net/burp/communitydownload)

## Herramientas Necesarias:

Para poder trabajar con BurpSuite vamos a necesitar otras dos herramientas imprescindibles, primero necesitaremos un navegador (preferentemente firefox) y luego 
tambien necesitaremos la apliocción o extensión llamada `Foxy Proxy`. Está extensión tambien existe para Chrome.

`Descargas Foxy Proxy` --> [Link](https://addons.mozilla.org/es/firefox/addon/foxyproxy-standard/)

La dinámica será la siguiente, BurpSuite intercepta los datos del Navegador utilizando Foxy Proxy, de esta forma podremos trabajar con estos paquetes 
interceptados.

Para ello tendrémos que configurar BurpSuite y FoxyProxy para establecer entre ellos una comunicación.

### Configuración de FoxyProxy:

Una vez intalado FoxyProxy en el navegador, simplemente pulsamos sobre el y luego pulsamos el botón `Options`. Tras abrirse el programa, en la parate izquierda, nos
dirigimos a la opción `Add`.

De Título podemos poner `BurpSuite` para poder indentificarlo, el color que deseamos (En mi caso verde que es más vistoso) y ahora vamos a lo impornte.

Para poder establecer conexión con BurpSuite vamos a utilizar un Proxy de tipo `HTTP` y una dirección Ip `127.0.0.1` (Está dirección Ip es nuestro localhost) por
el puerto 8080. 

`Nota:` En caso de tener problemas a la hora de capturar el tráfico, tener en cuenta de que no estais utilizando el puerto 8080 para otros procesos. En tal caso
utilizar un puerto distinto o matar el proceso.

Con esto ya tendríamos FoxyProxy configurado, pulsamos guardar `save` y veremos tras guardas como ya nos aparece nuestro nuevo Proxy en el icono de la extensión
si pulsamos encima con el ratón.

### Configuración de BurpSuite:






