# Buffer Overflow


## ¿Qué es un  Buffer?

El buffer es un espacio temporal de memoria física el cual se usa para almacenar información mientras se envía de un lado a otro. Los buffers se pueden
encontrar en todo tipo de dispositivos electrónicos, desde el nivel de circuitos hasta el nivel de la comunicación entre dispositivos como por ejemplo 
en el funcionamiento de internet. 

Los buffers son tan comunes por su función, que es paliar la diferencia de velocidad de transmisión o procesamiento entre dos dispositivos o procesos 
por eso están por todos lados en un ordenador: en discos duros, procesadores, RAM, impresoras… y su tamaño y características pueden afectar al
rendimiento del dispositivo.

## ¿Para qué sirve el Buffer?

Un buffer suele utilizarse para transmitir información en sistemas en los cuales la velocidad a la que se obtiene o se manda la información es diferente
a la velocidad a la que se procesa, y no deben confundirse con la memoria cache, ya que tienen funciones muy diferentes: los buffers almacenan información
sin mantenerla más tiempo del que tarda en mandarse, pero la memoria cache almacena información durante un periodo de tiempo para que diferentes procesos
o aplicaciones puedan acceder a ella rápidamente.

## ¿Qué es Buffer Overflow?

El Buffer Overflow o desbordamiento de búfer es un error de codificación de software o una vulnerabilidad que los piratas informáticos pueden explotar
para obtener acceso no autorizado a los sistemas corporativos. Es una de las vulnerabilidades de seguridad de software más conocidas, pero sigue siendo
bastante común. Esto se debe en parte a que los desbordamientos de búfer pueden ocurrir de varias maneras y las técnicas utilizadas para evitarlos suelen 
ser propensas a errores.

### Ejemplo:

Se podría entender el funcionamiento de un buffer haciendo una analogía con dos tuberías de agua y entre ellas un deposito, que funcionaría
como el buffer de este sistema. 

La tubería A vierte agua al depósito y tiene una capacidad máxima de 20L a la hora, mientras que la tubería B puede vaciar
el deposito a un ritmo variable según se necesite con una capacidad máxima de 10L a la hora. Pongamos que en situación normal entran 8L al depósito
por la tubería A, de forma que nada más entrar en él puede salir por la tubería B, pasando por el deposito que funcionaría como un buffer un
tiempo mínimo.

Pero imaginémonos que excepcionalmente entran 12L por la tubería A, ahora parte de esa agua se quedaría en el deposito llenándolo ya que solo podrán 
salir por la tubería B 10L, esperando a que el flujo de agua baje y puedan salir, pero si pasa demasiado tiempo este se acabará llenando y se 
desbordará (buffer overflow) y eliminando del sistema el excedente, es decir, parte de los datos nuevos que entren.
