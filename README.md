# Seminario de analista 🤓


## Instalación


- [ ] **Configurar git**

```cd ~/.ssh

 ssh-keygen -t rsa -C 'email@gmail.com'
<enter>
<enter>
<enter>
 cat id_rsa.pub
 ```
(copiar clave publica y guardarla en settings de github)
```
eval "$(ssh-agent)"
ssh-add ~./id_rsa
```
Probar conexión
```
ssh -T git@github.com
git clone git@github.com:pet-finder-seminario/pet-finder.git
git remote set-url origin git@github.com:pet-finder-seminario/pet-finder.git
git checkout algun-branch
git commit -m "algun comentario"
git push -u origin algun-branch
```
   **Y hacer pull request desde github**
   

### Backend

- [ ] **Descargar e instalar lo siguiente**
* python 2.7 o superior https://www.python.org/download/releases/2.7/
* pip --version o descargar https://www.liquidweb.com/kb/install-pip-windows/
* google cloud sdk https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe
* git CLI https://git-scm.com/download/win o UI https://www.sourcetreeapp.com/
* Algún IDE o Text Editor (Pycharm, Sublime, etc) https://www.jetbrains.com/pycharm/download/#section=windows


- [ ] **Instalar dependencias**
```
pip install flask
pip install virtualenv
virtualenv venv
(navegar hasta /backend/ y probar localmente)
python main.py
```
probar localmente http://127.0.0.1:5000/
Versionar localmente 
(commits atómicos y mantener branchs sin conflictos con master)
**Y hacer pull request desde github**

- [ ] **desde CMD**
```
(navegar hasta /backend/venv/script/activate)
ejecutar activate
(activate) aparece en el CLI
(navegar hasta /backend)

pip install -t lib -r requirements.txt
```



- [ ] **Deploy a Cloud**

 >   gcloud app deploy

loguearse y elegir proyecto

 >   gcloud app browse
