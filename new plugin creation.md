# в папке где хочу создать проект плагина:
plugman create --name TetrisPlugin --plugin_id cordova-plugin-tetris --plugin_version 1.0.0 cordova_plugin_tetris
# создай package.json
{
    "name": "cordova-plugin-tetris",
    "version": "0.0.1",
    "cordova": {
        "id": "com.example.plugin.tetris",
        "platforms": ["android", "ios", "browser"]
    }
}

# добавляем плагин с основного Кордова проекта 
cordova plugin add ../TetrisPlugin
cordova prepare browser
cordova run browser

# если нужно обновить кодовую базу плагина
cordova plugin rm cordova-plugin-tetris
и опять добавляем, собираем

Я думаю что для разработки плагинов правильно наверное их отлаживать отдельно, а подключать уже когда основная отладка произведена, а то я уже устал постоянно удалять и добавлять плагин к основному проекту что бы код обновился.