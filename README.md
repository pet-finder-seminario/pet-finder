# Seminario de analista 🤓

## Instalación

### Pre-requisitos

- [Python 3.7](https://www.python.org/downloads/) 🐍
- pip (administrador de paquetes)
- [Google Cloud SDK](https://cloud.google.com/sdk/)
- git
- [Node.js v10+](https://nodejs.org/en/download/)
- Algún IDE o Text Editor (Pycharm, Sublime, VSCode, etc)

### Clonar repositorio

```bash
$ git clone git@github.com:pet-finder-seminario/pet-finder.git
```

### Back end

#### Opción 1 (con Docker)

- Pre-requisito extra: tener instalado Docker localmente
- Docker levantará la base de datos, instalará las dependencias y arrancará la app automáticamente

```bash
$ cd back-end
$ docker ps
$ docker-compose up
```

#### Opción 2 (Manual)

- Pre-requisito extra: tener instalado PostgreSQL previamente. Para conectarse a la base de datos en development usa este connection string (verificar que así lo tengamos configurado): `postgresql://testusr:password@127.0.0.1:5432/testdb`
- Debemos crear el directorio de virtualenv fuera de `back-end` para que Google Cloud no lo suba
- [Leer mas sobre Virtual Envs](https://docs.python-guide.org/dev/virtualenvs/)

```bash
# Mac/Linux
$ python3 -m venv venv
$ source venv/bin/activate
$ cd back-end
$ pip install -r requirements.txt
$ python manage.py recreate_db
$ python manage.py runserver

# Windows
> pip install virtualenv
> virtualenv venv
> venv\Scripts\activate # (activate) aparece en el CLI
> cd back-end
> pip install -t lib -r requirements.txt
> python manage.py recreate_db
> python manage.py runserver
```

### Front end

```bash
$ cd front-end
$ npm i && npm start
```

### Desplegar a Google Cloud

```bash
$ gcloud app deploy
```
