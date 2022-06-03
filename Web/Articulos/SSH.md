# SSH  

# ¿Qué es SSH?

SSH o Secure Shell, es un protocolo de administración remota que le permite a los usuarios controlar y modificar sus servidores remotos a través 
de Internet a través de un mecanismo de autenticación.

Proporciona un mecanismo para autenticar un usuario remoto, transferir entradas desde el cliente al host y retransmitir la salida de vuelta al 
cliente. El servicio se creó como un reemplazo seguro para el Telnet sin cifrar y utiliza técnicas criptográficas para garantizar que todas las 
comunicaciones hacia y desde el servidor remoto sucedan de manera encriptada.

# ¿Cómo funciona SSH?

Si usas Linux o Mac, entonces usar el protocolo SSH es muy fácil. Si utilizas Windows, deberás utilizar un cliente SSH para abrir conexiones SSH.
Para iniciar un servicio SSH en Linux ejecutamos el comando `ssh`, donde especificamos el `usurio` y el `host` separados por `@`.  

    ssh [Usuario]@[Host]
    
`ssh` : Le indica a tu sistema que desea abrir una Conexión de Shell Segura y cifrada. 

`Usuario` : Representa la cuenta a la que deseas acceder. Podemos acceder como `root` si queremos tener máximos privilegios en el equipo cliente.

`Host` :  Hace referencia al equipo al que quieres acceder. Esto puede ser una dirección IP (10.10.10.10) o un nombre de 
          dominio (www.ejemplo.com).   

Una vez establecida la conexión nos pedira la contraseña de la cuenta solicitada. La introducimos, pulsamos `Enter` y finalmente tendremos control
del equipo.

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
