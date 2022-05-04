![host-1](https://user-images.githubusercontent.com/103068924/166836563-b92de273-b0a8-44e3-9796-e0b7aa071b96.png)


# SwagShop

En primer luegar nos creamos un directorio con el nombre de la máquina desde el que trabajaremos:

    sudo mkdir SwagShop
    
Ahora mediante la función `mkt` que tengo previamente definida en la `zhshrc` crearemos nuestros directorio de trabajo:

    sudo mkt   

Realizamos un `ping` y vemos como nos reporta un ttl=63, por tanto ya sabemos que estamos frente una máquina Linux.

    ping -c 1 10.10.10.140
        
![Captura de pantalla -2022-05-04 21-37-17](https://user-images.githubusercontent.com/103068924/166835523-17862ac7-0b11-48f6-8675-44e7ebbcee95.png)


Ahora mediante `nmap` realizaremos un escaneo de puertos:

    nmap -p- --open -sS --min-rate 5800 -vvv -n -Pn 10.10.10.140 -oG allPorts2

![Captura de pantalla -2022-05-04 21-47-39](https://user-images.githubusercontent.com/103068924/166835539-0b60bbd9-0d97-401e-bf58-95cf18c3b16b.png)

Vemos como nos reporta el puerto 80 y el puerto 20.

![Captura de pantalla -2022-05-04 21-48-00](https://user-images.githubusercontent.com/103068924/166835551-74619704-5005-4bfa-8a8e-ada9c5b248f1.png)

Intentamos ver el dominio `http://10.10.10.140/` y vemos como nos redirige hasta `swagshop.htb` pero no nos permite ver la página. Para ello vamos
a registrar el dominio en nuestra carpeta `/etc/hosts` e introducimos la Ip de la máquina víctima y el host `swagshop.htb`:

![Captura de pantalla -2022-05-05 00-29-52](https://user-images.githubusercontent.com/103068924/166835861-a5bb2cab-8754-4ba7-a402-d8e06a4da5fe.png)

![Captura de pantalla -2022-05-05 00-31-02](https://user-images.githubusercontent.com/103068924/166835950-11b74920-c3be-4e09-9479-2852ca6de8f0.png)

![Captura de pantalla -2022-05-04 21-51-26](https://user-images.githubusercontent.com/103068924/166836019-63d932b1-f316-4008-8556-2e534a149e80.png)

    sudo nano /etc/hosts
    
![Captura de pantalla -2022-05-05 00-33-07](https://user-images.githubusercontent.com/103068924/166836367-a0023b47-bba6-49ae-90b6-dc134d54563a.png)

 ![Captura de pantalla -2022-05-05 00-34-01](https://user-images.githubusercontent.com/103068924/166836400-df5e6f85-f7ff-4a41-8a44-1ef99793fa23.png)
    
Ahora volvemos a nuestro buscador y vemos como ya nos muestra la página.

![Captura de pantalla -2022-05-05 00-34-40](https://user-images.githubusercontent.com/103068924/166836426-d24198d0-c201-4f08-8389-160da3d98691.png)

Pasamos a revisar la página.

    gobuster dir -u http://10.10.10.140 -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt
    

    sudo searchsploit -m xml/webapps/37977.py
    
    


    
