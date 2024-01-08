# uek_335

## Installationsanleitung

- Android Studio installieren
  
  https://developer.android.com/studio

- Android SDK in den Enviroment Variablen, als Path Variable hinterlegen
  
   > Preferences > Appearance & Behavior > System > Settings > Android SDK > SDK Tools
  
   > Sicherstellen, dass mindestens eine Version der Android SDK Build-Tools installiert ist.
  
   > Pfad der Box Android SDK Location kopieren
  
   > Folgende Pfade zu PFAD-Variable hinzufügen:
  
        Android SDK Location\platform-tools
  
        Android SDK Location\emulator
  
   > PFAD-Variable in den System-Umgebungsvariablen ergänzen (permanent, global)

      
 ![image](https://github.com/sandkohler/uek_335/assets/113603587/23348f92-735e-4750-bca2-a55495c6fa14)
 
![image](https://github.com/sandkohler/uek_335/assets/113603587/5907154e-0594-4fb1-b2f1-c342a86638dc)

![image](https://github.com/sandkohler/uek_335/assets/113603587/65c22e77-2a3a-4e17-87de-a5a31645a014)


   > PFAD-Variable manuell in einer Konsole, z.B. PowerShell, ergänzen (lokal, temporär):

        $env:Path += ";«Android SDK Location.»\platform-tools"
        
        $env:Path += ";«Android SDK Location.»\emulator"
        
        
   > Prüfen, dass der Befehl adb von einer Konsole, z.B. PowerShell, ausführbar ist

   
- Android Emualtor erstellen
   > Android Studio öffnen -> Configure

  
 ![image](https://github.com/sandkohler/uek_335/assets/113603587/422101cb-97db-4815-88aa-1607f6126e7f)


   >  "Create Device"

    
 ![image](https://github.com/sandkohler/uek_335/assets/113603587/cf64f302-5369-4e81-bb1f-028eb07676fa)


   > Art der Hardware wählen
   > Betriebssystemversion auswählen
   > "Fertigstellen" drücken


- Erstellte AVD auflisten
  > emulator.exe -list-avds


- Emulator starten 
  > emulator.exe -avd [AVD name]


- Git Repository Clonen __
  >  git clone https://github.com/sandkohler/uek_335.git


- Ordner im VSCode öffnen 


- Yarn installieren 
  >  yarn install


- Projekt starten
  >  yarn android
  > (falls es nicht funktioniert, "a" drücken, um die App auf Android zu öffnen)
