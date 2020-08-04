# Webprogramozás laborfeladatok
**Adatbazis elkeszitese**  
Az adatbazis elkeszitese a [userkeszites](userkeszites.sql) fajl futtatasaval lehetseges.  


**Userek beszurasa tablaba**  
A belepeshez:  
az [adminkeszites](adminkeszites.sql) fajl futtatasaval ket user jon letre a tablakban,  
egyik az admin masik a user, mindekettonek ugyanaz a jelszava.  


| user   | password |  
| ------ | -------- |  
| admin  | admin    |  
| user   | user     | 



**Dummy adatok**  
Az adatbazist a [hirdeteskeszites](hirdeteskeszites.sql) fajlal lehet feltolteni egy par dummy adattal.  



**Uj user letrehozasa/ sign up**  
A signup endpointon lehet uj usereket kesziteni, de ezeknek **nem** lesz admin joguk.  



**Jogok**  
Az adminnak minden endpointhoz joga van, a usernek csak a kereses endpointhoz.  
Az endpointok amelyeket mindeki lathat: login/signup.  


| user   | permissions    |  
| ------ | -------------- |  
| admin  | all            |  
| user   | /kereses       |  
| guest  | /login, /signup|


