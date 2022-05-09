![Snoop-on-Bluetooth-Devices-Using-Kali-Linux-Tutorial-1200x1200](https://user-images.githubusercontent.com/103068924/166144285-23e8c170-fb23-48b5-8e1c-28789962e43f.jpg)

# Administrador Bluetooth de Linux.

Para poder abrir el gestor de bluetooth desde la terminal de Linux, utilizaremos el siguiente comando:

    bluetoothctl
    
![Captura de pantalla -2022-05-01 13-33-44](https://user-images.githubusercontent.com/103068924/166144293-751d6490-cb12-48af-bffe-a258dbf4b8a3.png)

![Captura de pantalla -2022-05-01 13-34-37](https://user-images.githubusercontent.com/103068924/167509081-4b8466f9-5b40-4b67-9804-5694653dfff8.png)

Para ver todos los comandos disponibles podemos ejecutar el siguiente comando o una vez dentro de la shell de bluetoothctl escribir `help`:

    bluetoot help

![Captura de pantalla -2022-05-01 13-35-26](https://user-images.githubusercontent.com/103068924/166144307-4459feee-09cc-4493-af0e-1844e7393329.png)

![Captura de pantalla -2022-05-01 13-35-57](https://user-images.githubusercontent.com/103068924/166144311-5f84a69f-eead-489c-bb4c-6f160451375b.png)

Para poder ver las epecificaciones de nuestro administrador Bluetooth:

    show
    
![Captura de pantalla -2022-05-01 13-45-24](https://user-images.githubusercontent.com/103068924/167509402-bffae03e-221f-4892-b29d-b283207ba20f.png)

Para realizar una búsqueda de los dispositivos:

    scan on
    
![Captura de pantalla -2022-05-01 13-50-29](https://user-images.githubusercontent.com/103068924/166144508-d2f2a074-ff6a-4aaf-bdc1-12a4f6dd0483.png)
    
Para detener la búsqueda:

    scan off
   
Para conectarnos con un dispositivo:

    connect [Núm. MAC]
    
El `número MAC` es el número que corresponde con el dispositivo que se nos muestra en el escaneo.

Una vez conectados podemos salir de la shell simplemente escribiendo `exit`.

### Failed to start discovery: org.bluez.Error.NotReady

Para solucionar este error simplemente volvemos activar el controlador:

    bluetoothctl power on
    



