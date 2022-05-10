# SetTarget

Mediante la siguiente función podremos colocar el nombre y la Ip de las máquinas que estamos realizando en la polybar.

    function settarget(){
        ip_address=$1
        machine_name=$2
        echo "$ip_address $machine_name" > /home/tuUsuario/.config/bin/target
    }


Para poder tener esta funcion activa simpmente tendremos que pegar la funcion en el archivo `.bashrc` o `.zshrc` dependiendo de si estamos utilizando 
una shell Bash o Zsh. En mi caso utilizo Zsh, asi que nos dirigimos al archivo `.zshrc`.

Copiamos la función. Nos dirigimos hasta nuestro directorio de usuario `/home/Usuario` (Usuario es el vuestro) y mediante el comando `nano` abrimos el archivo y lo pegamos.

    nano .zshrc
    
Una vez pegado, guardamos con `Cntrl + o` y salimos `Cntrl + x`.

Para ejecutar la función simplemente le especificamos la Ip y el nombre de la máquina de Hack the Box:

    settarget [Ip Máquina] [Nombre de la Máquina]

En caso de no ejecutarse mediante `root`. Nos registramos como `root` y repetimos la misma operación.


    
