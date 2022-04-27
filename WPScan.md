![wpscan_logo1](https://user-images.githubusercontent.com/103068924/165412933-412b8027-f44d-47b2-a742-5b7c2a58d1ea.png)


# WPScan

WPScan es un escaner de vulnerabilidades enfocado en página WordPress. Escanea y encuentra fallas y vulnerabilidades en el código, los módulos y temas
utilizados.

## Instalación:

Para instalar en sistemas Debian:

    sudo apt-get install wpscan

## Actualizar base de datos:

Debido a las multiples actualizaciones, tanto por parte de wordpress como por WPScan, debemos tener actualizada nuesta base de datos para estar 
preparado frente a las nuevos ataques y vulnerabilidades.

    wpscan --update

## Ver Información de la Herramienta:

Aquí podemos ver todas las opciones y funciones que nos ofrece WPScan.

    wpscan -h
    
## Escaneo Básico:

Ejemplo 1:

    wpscan --url http://wordpress.local

Ejemplo 2:

    wpscan --url http://10.10.11.143
   
