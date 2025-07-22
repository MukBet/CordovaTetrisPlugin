Запусци эци команды в овновном репо приложения:
cordova plugin add ../TetrisPlugin
cordova prepare android
cordova run android

Если не заработало, более полный список команд:
cordova plugin remove cordova-plugin-tetris
cordova platform remove android
cordova platform add android
cordova plugin add ../TetrisPlugin
cordova prepare android
cordova run android

Логи
adb logcat | grep TetrisPlugin 