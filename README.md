# PonteFotoBot

En mi antiguo trabajo (Tecnilógica / LiquidSquad / Accenture), cada vez que alguien se daba de alta en Yammer, Slack o cualquier otra red interna, le freíamos a peticiones de "ponte foto", para  saber de quién se trataba. Manías nuestras 🤷🏻‍♀️.

He montado un bot en Discord que hace exactamente lo mismo. PonteFotoBot se conecta a un canal determinado todos los días a la misma hora, mira  la lista de usuarios humanos (vamos, los que no son bots) que no tienen foto de perfil y les avisa.

![PonteFotoBot en funcionamiento](https://user-images.githubusercontent.com/1846199/99850924-87412800-2b7e-11eb-8aee-1457106e96f9.png)

## Cómo funciona

El bot se conecta al servidor y se baja la información del canal que se haya indicado en el fichero de configuración (`getChannelInfo`). Con esa información se hace una segunda llamada para obtener la lista de miembros (`getMembers`). Esa lista se analiza miembro a miembro (`processMembers`), y compone un mensaje con la lista de usuarios. Si la variable `debug_mode` –también definida en el fichero de configuración– es `true`, saca la lista por pantalla. Si es `false`, envía el mensaje. Finalmente, el bot corta la conexión.

**⚠️⚠️⚠️OJO: el bot está probado lo justo, tampoco lo soltéis a lo loco en un servidor con 20.000 usuarios.⚠️⚠️⚠️**

## Puesta en marcha

### 0.- Requisitos

Tener node instalado en el ordenador (yo estoy tirando de 14.15.x) y una cuenta en Discord.

### 1.- Crear una app en Discord

Lo primero es crear una app de Discord, en [https://discord.com/developers/applications](https://discord.com/developers/applications) y apuntar el **CLIENT ID** en algún lado. No hace falta rellenar ningún campo más.

### 2.- Crear el bot asociado a la app

El siguiente paso es seleccionar Bot en el menú de la izquierda. Aquí tenemos que hacer tres cosas:

1. Ponerle un nombre al bot.
2. Apuntar el **TOKEN** en algún lado.
3. Activar el switch "**Server members intent**". En otro caso, no se puede acceder a la lista de usuarios, pero no da error y es un quebradero de cabeza hasta que te das cuenta. A lo mejor me pasó a mí.

![Server Members Intent](https://user-images.githubusercontent.com/1846199/99850931-890aeb80-2b7e-11eb-8414-d57bb275e0d0.png)


### 3.- Autorizar el bot en un servidor

Esto es un poco mágico, y seguro que hay un sitio desde donde se puede hacer directamente, el caso es que hay que poner esta URL en el navegador, sustutuyendo CLIENTID por el número que apuntamos en el paso 1.

```markdown
https://discord.com/oauth2/authorize?client_id=**CLIENTID**&scope=bot
```

Se abrirá una página de Discord preguntándonos a qué servidor queremos asociar el bot. Hay que elegir uno del desplegable. Si más adelante queremos asociarlo a más servidores, volvemos a abrir la página y vamos seleccionando de uno en uno.

### 4.- Obtener el ID del canal donde se va a ejecutar el bot

También necesitamos el ID del canal donde se va a ejecutar el bot. Lo más cómodo es, en la aplicación de escritorio, ir a **Ajustes de usuario / apariencia / Avanzado** y activar el switch "**Modo desarrollador**". Una vez activado, haciendo clic derecho sobre el nombre de un canal, de un usuario o de un servidor, aparece una opción más para obtener el ID de ese objeto.

![Modo Desarrollador](https://user-images.githubusercontent.com/1846199/99850919-85776480-2b7e-11eb-9fd5-83de9a8be385.png)


### 5.- Configurar los parámetros

Con el código descargado, hay que ejecutar `npm install` para descargar los módulos correspondientes. Además, en el fichero `config_example.js` hay que hacer los siguientes cambios:

1. Renombrar el fichero como `config.js`
2. Rellenar el campo `config.bot_token` con el valor que copiamos en el punto 2.2
3. Rellenar el campo `config.valid_channel` con el ID del canal que copiamos en el punto 4.

Inicialmente, el bot está en modo debug  (`config.debug_mode = true;` en el fichero `config.js` ) para comprobar el funcionamiento sin sembrar el caos en el canal.

### 6.- Probar que el bot funciona

Al ejecutar `node pontefotobot.js`, deberíamos obtener una salida como esta: la lista de usuarios humanos (no bots) que están en el canal indicado y que no han cambiado el avatar por defecto. 

![Captura-de-pantalla-2020-11-19-a-las-13 46 10](https://user-images.githubusercontent.com/1846199/99850928-87d9be80-2b7e-11eb-8918-3802303ba704.png)

Una vez que hemos comprobado que todo funciona, basta con cambiar desactivar el modo debug (`config.debug_mode = false;`) para que cada vez que ejecutemos el bot, aparezca la información en el canal.

### 7.- Hacer que el bot se ejecute a una hora determinada

Para no tener que ejecutar el bot manualmente –y teniendo acceso a un servidor Unix– bastaría con añadir una línea como ésta. 

```bash
35 14 * * * node /ruta/al/fichero/pontefotobot.js
```

En este caso, el bot se ejecutaría todos los días a las 14:35.

## Agradecimientos

El empujón para hacer el bot viene de Daniel Shiffman y su serie "How to make a Discord bot with discord.js"

[https://www.youtube.com/watch?v=7A-bnPlxj4k&list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4](https://www.youtube.com/watch?v=7A-bnPlxj4k&list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4)
