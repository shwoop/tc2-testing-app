Requirements
===
Install cordova
---
```
sudo apt-get install node npm
npm install cordova
```

Currently relies on `cordova-plugin-inappbrowser` installed by running:
```
cd <project dir>
cordova plugin add cordova-plugin-inappbrowser
```

Building for android
===
android sdk
---
Install the android [sdk](https://developer.android.com/sdk/index.html#Other).  Currently [this](http://dl.google.com/android/android-sdk_r24.1.2-linux.tgz) gzip.
```
sudo tar zxvf ~/Downloads/android-sdk_r24.1.2-linux.tgz /opt/android-sdk
sudo chown <your username> /opt/android-sdk
```
Update your paths (replace `~/.bashrc` with `~/.zshrc` if you use zsh).
```
echo 'export ANDROID_HOME="/opt/android-sdk-linux"\r\nexport PATH="$PATH:/opt/android-sdk-linux/tools:export PATH="$PATH:/opt/android-sdk-linux/platform-tools:/opt/android-sdk-linux/build"' > ~/.bashrc
echo 'export JAVA_HOME="/usr/lib/jvm/java-7-openjdk-amd64"\r\nexport PATH="$PATH:/usr/lib/jvm/java-7-openjdk-amd64/bin"' > ~/.bashrc
```

Once opening a new terminal you should be able to access the android sdk manager by running `android`.
*Begin downloading tools and the latest api immediately as it's a multi GB download*

Set up a virtual device by running `android avd` and selecting a phone.


Building apk
---
To test in the emulator:
```
cd <project dir>
cordova emulate android
```
To create a debug build without using the emulator run:
```
cd <project dir>
cordova build android
```
To create a release build signing and aligning the release apk:
```
cd <project dir>
cordova build android --release
```
This should generate
```
<project dir>/platforms/android/build/outputs/apk/android-release-unaligned.apk
```
Finalising release build
---
The release build must be signed by the author to run on android (debug builds sign with a generic debug key).
To publish to the app store the apk must also be aligned along zip blocks.

Align with the below, substitute the appropriate api version for `22.0.1` if different:
```
cd /opt/android-sdk/build-tools/22.0.1
./zipalign -v 4 <project dir>/platforms/android/build/outputs/apk/android-release-unaligned.apk <project dir>/platforms/android/build/outputs/apk/android-release-aligned.apk
```

To sign with the tc2 keystore:
```
cd <project dir>/platforms/android/build/outputs/apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore <path to>/tc_mobile_app.keystore android-release-aligned.apk tc2_mobile
```
This should generate a file named `android-relaase-aligned-signed.apk`.
the file tc_mobile_app.keystore contains our signing keys, `tc2_mobile` is the identity of the key in question, and the password you will be prompted for is ...
