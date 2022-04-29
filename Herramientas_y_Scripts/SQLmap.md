![sqlmap5](https://user-images.githubusercontent.com/103068924/165548242-89c75a3a-585f-4081-9289-93d2b9c9ed8e.png)

# SQLMAP

## ¿Qué es SQLMAP?

Sqlmap es un software de código abierto que se utiliza para detectar y explotar las vulnerabilidades de las bases de datos y brinda opciones para 
inyectarles códigos maliciosos. Viene con un potente motor de detección al cual le podemos especificar distintas variables.

### Características:

Soporte completo para MySQL, Oracle, PostgreSQL y Microsoft SQL. Además de estos cuatro sistemas de gestión de bases de datos, sqlMap también puede
identificar Microsoft Access, DB2, Informix, Sybase e Interbase.

Amplia base de datos de sistema de gestión de huellas dactilares basadas en inband error messages, analizar el banner, las funciones de salida de
comparación y características específicas tales como MySQL comment injection.

También es posible forzar a la base de datos de sistema de gestión de nombre si ya lo saben.
Soporte completo para 2 técnicas de SQL injection: blind SQL injection y inband SQL injection.

### Instalando SQLMAP:

SQLMAP viene preinstalado con kali linux, que es la opción preferida de la mayoría de los probadores de penetración. Sin embargo, puede instalar sqlmap 
en otros sistemas Linux basados en Debian usando el comando:
 
    sudo apt-get install sqlmap
      
# Ejecución de SQLMap:

### Paso 1: Enumere información sobre las bases de datos existentes:

    sqlmap -u [Url Víctima] --dbs

Primero, debemos ingresar la URL web que queremos verificar junto con el parámetro `-u`. También podemos usar el parámetro `–tor` si deseamos probar el 
sitio web usando proxies. Ahora, por lo general, nos gustaría probar si es posible obtener acceso a una base de datos. Así que usamos la opción `–dbs` para hacerlo. `–dbs` enumera todas las bases de datos disponibles. 

Ejemplo: `sqlmap -u http://testphp.vulnweb.com/listproducts.php?cat=1 --dbs`
