# Como codificar y descodificar texto en hexadecimal con xxd.

El comando xxd en Linux puede convertir un archivo dado o una entrada estándar en forma hexadecimal, y también puede convertir
hexadecimal de nuevo a forma binaria.

## Convertir un texto en hexadecimal con xxd.

    echo "[Texto]" | xxd

    echo "Hola Mundo" | xxd
    
Vemos como nos reporta una cadena en hexadeciaml. Para ver unicamente la cadena hexadecimal podemos añadir la opción `-ps`:

    echo "[Texto]" | xxd -ps

    echo "Hola Mundo" | xxd -ps
    
## Convertir de hexadecimal a texto plano:

Para pasar de hexadecimal a texto plano utilizaremos la opción `-r` para el cambio y `-ps` para mostrar el texto por consola.

   echo "486f6c61204d756e646f0a" | xxd -ps -r

