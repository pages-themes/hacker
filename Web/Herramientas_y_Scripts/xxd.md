# Cómo codificar y descodificar texto en hexadecimal con xxd.

El comando xxd en Linux puede convertir un archivo dado o una entrada estándar en forma hexadecimal, y también puede convertir
hexadecimal de nuevo a forma binaria.

## Convertir un texto en hexadecimal con xxd.

    echo "[Texto]" | xxd

    echo "Hola Mundo" | xxd
    
![Captura de pantalla 2022-07-29 184955](https://user-images.githubusercontent.com/103068924/181807685-861a5bd8-9f82-411e-9be0-865c57a84fcf.png)
      
Vemos como nos reporta una cadena en hexadecimal. Para ver únicamente la cadena hexadecimal podemos añadir la opción `-ps`:

    echo "[Texto]" | xxd -ps

    echo "Hola Mundo" | xxd -ps
    
![Captura de pantalla 2022-07-29 185048](https://user-images.githubusercontent.com/103068924/181807753-d1370d41-9bec-4a2d-aca3-b3d4d0a3bd59.png) 
  
## Convertir de hexadecimal a texto plano:

Para pasar de hexadecimal a texto plano utilizaremos la opción `-r` para el cambio y `-ps` para mostrar el texto por consola.

    echo "486f6c61204d756e646f0a" | xxd -ps -r

![Captura de pantalla 2022-07-29 185105](https://user-images.githubusercontent.com/103068924/181807787-f9b4db41-ad04-4cd1-b395-256e2ec819cb.png)



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
