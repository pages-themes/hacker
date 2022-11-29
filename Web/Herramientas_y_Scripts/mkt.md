# Función MKT:

Esta función está definida para crearnos cuatro directorios (`nmap`, `content`, 
`exploits` y `scripts`) desde los cuales poder trabajar a la hora de realizar
las máquinas de HTB.

![Captura de pantalla -2022-05-05 08-41-27](https://user-images.githubusercontent.com/103068924/166874377-678da3d9-a60b-4910-ba2b-e73d5f378dd0.png)


    # Función para crear directorios:
    function mkt(){
        mkdir {nmap,content,exploits,scripts}
    }


![Captura de pantalla -2022-05-05 08-42-15](https://user-images.githubusercontent.com/103068924/166874371-472c7706-b34e-4712-b270-c26447eb49ad.png)


Simplemente copiamos la función y la pegamos dentro del archivo `~/.zshrc`:

    nano ~/.zshrc
    
Pegamos la función. `Cntrl + o` para guardar y `Cntrl + x` para salir. 

Ahora para ejecutarlo, simplemente desde la carpeta en la que queramos crear
los directorios de trabajo, usamos el comando `mtk`:

    mtk
    
![Captura de pantalla -2022-05-05 08-43-11](https://user-images.githubusercontent.com/103068924/166874403-66f732eb-5180-48b4-b6a4-940873c411fb.png)

![Captura de pantalla -2022-05-05 08-43-34](https://user-images.githubusercontent.com/103068924/166874405-6d25c2c6-b415-4bc4-8ac6-4af143715b19.png)


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
