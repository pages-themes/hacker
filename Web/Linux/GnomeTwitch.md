# Como Instalar Gnome Twitch en ParrotOS o Kali Linux mediante Flatpak.

En este artículo se mostrará como instalar `Gnome Twitch` a través de sus repositorio oficiales para poder operar
comodamente desde nuestra distribución Linux.

Para poder descargarnos Gnome Twitch  vamos a necesitar la herramienta `flatpak`. Flatpak es una tecnología para 
crear, distribuir, instalar y ejecutar aplicaciones. Para instalarnos flatpak simplemente ejecutamos el siguiente comando:

    sudo apt install flatpak
    
![Captura de pantalla -2022-05-11 10-41-34](https://user-images.githubusercontent.com/103068924/167813368-e40bcfdd-0367-4c10-96dc-8f2bd8125f1c.png)
    
Una vez instalado ya podemos pasar a descargarnos Gnome Twithc, para ello ejecutamos los siguientes comandos:

    flatpak remote-add flathub https://flathub.org/repo/flathub.flatpakrepo

    flatpak install flathub com.vinszent.GnomeTwitch
    
![Captura de pantalla -2022-05-11 10-42-58](https://user-images.githubusercontent.com/103068924/167813428-e038ab7c-894a-4c11-b118-4d0c62d9da96.png)
   
Tras realizar la intalación tendremos que reiniciar el equipo para que Twitch nos aparezca en nuestro directorio 
y podamos ejecutarlo de forma eficiente. Una vez reiniciado el equipo, para ejecutarlo utilizaremos `flatpak` 
seguida de la opciòn `run` y el nombre del programa:

    flatpak run com.vinszent.GnomeTwitch
    
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

    
    
