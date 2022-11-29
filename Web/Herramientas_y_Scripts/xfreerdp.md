
    # xFreeRDP

`xfreerdp` es un cliente X11 Remote Desktop Protocol (RDP) que forma parte de FreeRDP
proyecto. Un servidor RDP está integrado en muchas ediciones de Windows. Servidores alternativos
incluido xrdp y VRDP (VirtualBox).

## Instalación:

Para instalarlo a través de la terminal en sistemas basados en Debian podemos utilizar el siguiente comando:

    sudo apt install freerdp2-x11
    
## Sintaxis:

La sintaxis es muy básica, debemos añadir al comando el `Host` al que queremos conectarnos, el `Usuario` y una `Contraseña`

    sudo xfreerdp /v:[HOST] /u:[Usuario] /p:[Contraseña]
    
`Ejemplo:`

    sudo xfreerdp /v:10.10.10.10 /u:f1r0x /p:12345
    

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
