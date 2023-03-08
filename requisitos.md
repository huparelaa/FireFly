# Requisitos para FireFly


## Para el backend con django

Escribir en la línea de comandos: pip install -r requirements.txt

* env --- python3 -m venv venv

Esto es para instalar un entorno virtual, el cual permitirá instalar librerias en diferentes versiones y no afectar otros proyectos (opcional)

* Django==3.2
* pymongo==3.12.1
* djongo==1.3.6
* sqlparse==0.2.4
* djangorestframework==3.14.0

Para la api rest

* djangorestframework-simplejwt==4.8.0

Para usar jwt en la autenticacion del usuario

* djoser

Para la autenticación


## Para el frontend con react

Esto se hace con el comando npm install <cosaAInstalar>

* react-router-dom
* react-redux
* axios
* redux
* redux-thunk
* redux-devtools-extension