# WichSystem

![WichSystem01](https://user-images.githubusercontent.com/103068924/162618801-255da24f-3973-4699-a964-1923a82d393d.png)

Esta herramienta es un pequeño script en python creado por S4vitar que sirve para saber si estamos frente un sistema operativo Windows o Linux. 
 
 El script básicamente diferencia entre el ttl de Linux y el de Windows de forma automáticamente.
 
 Recordemos que Windows tiene un ttl=128 mientras que Linux tiene un ttl=65.
 
 # Ejecución:
  
    wichSystem.py [Ip Víctima]
        
![WichSystem2](https://user-images.githubusercontent.com/103068924/162619301-1d8543a0-4089-49b1-a675-98f096684de6.png)
      
![WichSystem3](https://user-images.githubusercontent.com/103068924/162619303-e3a46ad0-a3a1-493e-9d84-0dda0ab5fedf.png)


## Instalación:

Para instalar esta herramienta simplemente nos descargamos o copiamos el archivo `wichSystem.py` y lo creamos en el directorio `/usr/bin/`.

En caso de descargarlo, simplemente lo depositamos en ese directorio.
En caso de crearlo:

![Captura de pantalla -2022-04-10 15-05-52](https://user-images.githubusercontent.com/103068924/162619644-e78cd89e-28d3-4b20-b190-ea5e62eeffac.png)

Vamos al directorio:

    cd /usr/bin/

Creamos el archivo wichSystem.py:

    sudo nano wichSystem.py
              
Copiamos y pegamos el script.

```py
#!/usr/bin/python3
#coding: utf-8

import re, sys, subprocess

# python3 wichSystem.py 10.10.10.188 

if len(sys.argv) != 2:
    print("\n[!] Uso: python3 " + sys.argv[0] + " <direccion-ip>\n")
    sys.exit(1)

def get_ttl(ip_address):

    proc = subprocess.Popen(["/usr/bin/ping -c 1 %s" % ip_address, ""], stdout=subprocess.PIPE, shell=True)
    (out,err) = proc.communicate()

    out = out.split()
    out = out[12].decode('utf-8')

    ttl_value = re.findall(r"\d{1,3}", out)[0]

    return ttl_value

def get_os(ttl):

    ttl = int(ttl)

    if ttl >= 0 and ttl <= 64:
        return "Linux"
    elif ttl >= 65 and ttl <= 128:
        return "Windows"
    else:
        return "Not Found"

if __name__ == '__main__':

    ip_address = sys.argv[1]

    ttl = get_ttl(ip_address)

    os_name = get_os(ttl)
    print("\n%s (ttl -> %s): %s\n" % (ip_address, ttl, os_name))
```

Guardamos : Cntrl + o

Salimos : Cntrl + x

Ya tendriamos listo nuestra nueva herramienta WichSystem.

# Menciones:

Esta herramienta no la he creado yo, solo la recopilo y comparto su instalación. 
El creador de esta herramienta es el creador de contenido S4vitar, tiene diversos canales en YouTube y retransmite en Twitch sobre temas de ciber
seguridad y resolución de máquinas de Hack the Box. 

S4vitar: [https://github.com/s4vitar](https://github.com/s4vitar)


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
