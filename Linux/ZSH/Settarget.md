# SetTarget

![Captura de pantalla -2022-05-10 14-01-28](https://user-images.githubusercontent.com/103068924/167631023-2bf197b3-153d-460a-b149-15af88aabb85.png)


Mediante la siguiente función podremos colocar el nombre y la Ip de las máquinas que estamos realizando en la polybar.

    function settarget(){
        ip_address=$1
        machine_name=$2
        echo "$ip_address $machine_name" > /home/tuUsuario/.config/bin/target
    }


Para poder tener esta funcion activa simpmente tendremos que pegar la funcion en el archivo `.bashrc` o `.zshrc` dependiendo de si estamos utilizando 
una shell Bash o Zsh. En mi caso utilizo Zsh, asi que nos dirigimos al archivo `.zshrc`.

![Captura de pantalla -2022-05-10 14-44-40](https://user-images.githubusercontent.com/103068924/167631309-be10052c-e0a7-4e4e-8e0f-914022cd9e80.png)

Copiamos la función. Nos dirigimos hasta nuestro directorio de usuario `/home/Usuario` (Usuario es el vuestro) y mediante el comando `nano` abrimos el archivo y lo pegamos.

    nano .zshrc
    
Una vez pegado, guardamos con `Cntrl + o` y salimos `Cntrl + x`.

Para poder mostrar la función en la Polybar, agregaremos el siguiente script `target_to_hack` al direcorio `~/.config/bin/`:

***

#!/bin/zsh
 
ip_address=$(cat ~/.config/bin/target | awk '{print $1}')
machine_name=$(cat ~/.config/bin/target | awk '{print $2}')
 
if [ $ip_address ] && [ $machine_name ]; then
    echo "%{F#000000} ${F#ffffff}$ip_address%{u-}  $machine_name"
else
    echo "${F#000000} %{u-}%{F#000000} No target"
fi

***



Para ejecutar la función simplemente le especificamos la Ip y el nombre de la máquina de Hack the Box:

    settarget [Ip Máquina] [Nombre de la Máquina]
    
![Captura de pantalla -2022-05-10 14-46-25](https://user-images.githubusercontent.com/103068924/167631648-0bcd0756-f7a4-4ad0-a10b-06bf53e9d882.png)

En caso de no ejecutarse mediante `root`. Nos registramos como `root` y repetimos la misma operación.


    
