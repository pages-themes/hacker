# Ventoy 

# ¿Qué es Ventoy?

Ventoy es un utilitario libre y de código abierto que se utiliza para escribir archivos de imagen como.iso,.wim,.img,.vhd y.efi en medios 
de almacenamiento para crear unidades flash USB de arranque.

# Instalación:

Para proceder con la instalación, en primer lugar, debemos descargarnos el programa, podemos hacerlo desde su web oficial
[`https://ventoy.net/en/download.html`](https://ventoy.net/en/download.html) o si estamos utilizando Linux podemos clonarlo directamente de GitHub
mediante el comando:

    git clone https://github.com/ventoy/Ventoy.git
    
Una vez descargado, creraremos un directorio llamado `Ventoy` y movemos el archivo descargado para luego proceder a descomprimirlo:

    mkdir Ventoy & mv ventoy-1.0.74-linux.tar.gz ./Ventoy
    
![Captura de pantalla -2022-05-14 13-42-15](https://user-images.githubusercontent.com/103068924/168425974-fbf6b698-db6a-41e0-9451-94742987fdc4.png)

![Captura de pantalla -2022-05-14 13-42-50](https://user-images.githubusercontent.com/103068924/168425978-60adeed7-791a-4d9c-b2c0-cc7dcca00c02.png)

Descomprimimos el archivo. Para ello nos dirigimos al directorio donde se encuentre el archivo descargado y ejecutamos el siguiente
comando:

    tar -xf [Archivo.tar.gz]

![Captura de pantalla -2022-05-14 13-44-58](https://user-images.githubusercontent.com/103068924/168425984-0aee4b1c-34a5-46a6-9c20-f46e238b224e.png)

Una vez descomprimido, vemos que nos aparece una carpeta nueva en el mismo directorio. Ya disponemos de Ventoy y podemos borrar el archivo `.tar.gz` que
hemos descomprimido. Finalmente, para instalarlo ejecutamos:

    ./VentoyGUI.x86_64
    
Se nos abrirá una interfaz gráfica desde la cual realizamos la instalación de Ventoy en cualquier USB.

# Bootear USB con Ventoy:

Una vez tenemos Ventoy instalado y un USB listo en nuestro PC, lo primero que tendremos que hacer es formatear y montar el USB. Para ello en primer lugar
identificamos su directorio:

    fdisk -l
    
Vemos que el directorio de nuestro USB es el `/dev/sdb`. El siguiente paso será abrir una terminal desde el directorio que contiene el programa Ventoy,
(la carpeta descomprimida anteriormente) y proceder a montar Ventoy mediante el siguiente comando:

    sudo sh Ventoy2Disk.sh -i /dev/sdb
    
Al terminar se nos avisará de que la instalación se ha ejecutado correctamente o de si debemos realizar algún procedimiento adicional.

Una vez montado Ventoy en nuestro USB, veremos que el nombre de nuestro dispositivo USB abra pasado a llamarse Ventoy.

Ahora, para montar un archivo `.iso` lo único que debemos hacer es copiarlo dentro del USB. Podemos copiar varios archivos `.iso`, ya que antes
de realizar el arranque nos preguntara que Sistema Operativo deseamos ejecutar. Es importante que el dispositivo USB tenga espacio de sobra para
poder almacenar los distintos archivos.iso.

Finalmente, una vez copiadas las .iso podemos arrancar el PC desde la Bios y seleccionar el Sistema Operativo que queramos.

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




 

