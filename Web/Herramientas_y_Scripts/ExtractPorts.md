# ExtractPorts

ExtractPorts es una función creada por S4vitar.

Esta herramienta nos mostrará en formato bat y los puertos encontrados.
Mediante `Cntrl + Shift + v` podremos pegar los puertos a la terminal automáticamente.

![Captura de pantalla -2022-04-10 23-00-33](https://user-images.githubusercontent.com/103068924/162639641-48c8aea9-d14a-4ea2-a38b-cefa0447ffdf.png)

    extractPorts allPorts
   
 allPorts : Archivo previamente definido.
 
 ![Captura de pantalla -2022-04-10 23-01-09](https://user-images.githubusercontent.com/103068924/162639721-fab103c8-7fc9-46b7-ab9d-4536ab84a708.png)

 `Cntrl + Shift + v` : Para pegar los puertos a la terminal.
 
## Instalación:
 
 Para la instalación de esta herramienta previamente se recomienda tener instalado 'bat' que es una mejora del comando 'cat'.
 
 Para poder tener está función activa, simplemente nos dirigiremos a la carpeta .bashrc o .zshrc (la que utilicéis) y pegaremos la función.
 
 ```
 # Extract nmap information:
function extractPorts(){
        ports="$(cat $1 | grep -oP '\d{1,5}/open' | awk '{prin>
        ip_address="$(cat $1 | grep -oP '\d{1,3}\.\d{1,3}\.\d{>
        echo -e "\n[*] Extracting information...\n" > extractP>
        echo -e "\t[*] IP Address: $ip_address"  >> extractPor>
        echo -e "\t[*] Open ports: $ports\n"  >> extractPorts.>
        echo $ports | tr -d '\n' | xclip -sel clip
        echo -e "[*] Ports copied to clipboard\n"  >> extractP>
        cat extractPorts.tmp; rm extractPorts.tmp
}

 ```

Esta función la podéis encontrar también en el perfil de S4vitar.
 
S4vitar: [https://github.com/s4vitar](https://github.com/s4vitar)
 
 Mi repositorio: [https://github.com/F1r0x/ExtractPorts/blob/main/extractPorts](https://github.com/F1r0x/ExtractPorts/blob/main/extractPorts)
 
 ![Captura de pantalla -2022-04-10 23-42-26](https://user-images.githubusercontent.com/103068924/162641184-dd48ed25-c547-4350-a201-de89d0d849e6.png)
 
## Menciones:

Esta función está creada por el creador de contenido S4vitar, podéis encontrar una gran cantidad de información sobre ciberseguridad en
sus canales de Youtube y Twitch.

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

