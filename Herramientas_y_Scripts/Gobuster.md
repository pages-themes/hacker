# Gobuster

## Instalción:

    sudo apt install gobuster
    
## Ejecución:

### Busqueda de subdominios:

    gobuster vhost -u [Dominio de la página] -w [Directorio del diccionario] -t 200

Ejemplo:

    gobuster vhost -u http://pandora.htb -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -t 200


### Busqueda de directorios por fuerza bruta:

    gobuster dir -u [Dominio] -w [Directorio del Diccionario] -t 200

Ejemplo:

    gobuster dir -u http://pandora.htb -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -t 200
    
