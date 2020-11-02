# Jsframework-finalproject-backend

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ollebergkvist/jsframework-project-backend/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/ollebergkvist/jsframework-project-backend/?branch=main)
[![Code Coverage](https://scrutinizer-ci.com/g/ollebergkvist/jsframework-project-backend/badges/coverage.png?b=main)](https://scrutinizer-ci.com/g/ollebergkvist/jsframework-project-backend/?branch=main)
[![Build Status](https://scrutinizer-ci.com/g/ollebergkvist/jsframework-project-backend/badges/build.png?b=main)](https://scrutinizer-ci.com/g/ollebergkvist/jsframework-project-backend/build-status/main)
[![Build Status](https://travis-ci.com/ollebergkvist/jsframework-project-backend.svg?branch=main)](https://travis-ci.com/ollebergkvist/jsframework-project-backend)

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Redovisning

Krav 1: Backend

Gällande det första kravet och allmänt gällande utförandet utav detta projekt så ville jag utmana mig själv, jag ville inte endast kopiera koden från tidigare kursmoment och sen anpassa koden för projektet. Därmed gjorde jag ett medvetet val att utforska nya tekniker som jag ville lära mig, jag valde att endast arbeta med mongoDB framför en kombination utav mongoDB och SQLite samt att använda Mongoose för som är ett verktyg för objektmodellering för MongoDB. Med hjälp av Mongoose kan en användare definiera ett schema för dokumenten i en särskild kollektion samt levererar Mongoose en hel del bekvämligheten för hantering av data i MongoDB. Jag fann nämligen synthaxen från att skriva queries med MongoDB något märklig och det var svårt att minnas alla hooks och metoder, jag känner att språket i Mongoose har gjorts mer humant. Med hjälp utav Mongoose var det även väldigt lätt att lägga till validering, en definierar ett json schema och för varje property kan en lägga till type, required, minlength etc. En funktion jag verkligen gillade som Mongoose tillandhåller är att en kan lägga till en timestamp property i schemat, på så sätt skapar mongoose automatiskt en timestamps.createdAt och en timestamps.updatedAt stämpel, varav den sistnämnda uppdateras varje gång en poplulerar kollektionen med data, väldigt smidigt och enkelt att sätta upp med andra ord. Ett annat val jag gjorde rörande databasen var att arbeta med MongoDB atlas, som är den officiella multi-cloud databas tjänsten från MongoDB framför att arbeta med MongoDB lokalt. Detta val baserades framför allt på att jag ville prova att lagra data i molnet men även pga. att jag inte har lyckats få MongoDB att rulla i min Debian terminal vilket gör att jag måste använda command prompten i windows, jag är inte särskilt förtjust i windows terminalen så att kunna logga in på MongoDB Atlas och få en överblick över min databas kändes som ett mycket bättre val. Utöver databaserade tekniker, så ville jag även implementera gzip kompression på serversidan samt hitta ett sätt för att undvika brute force och DDoS attacker i Node.
Den förstnämda löste jag med npm modulen "compression" som jag satte upp som en middleware i mitt API, modulen krävde i stort sätt inga options utan det var bara att importera modulen i stort sätt så var gzip kompression aktiverat. Det sistnämnda löste jag genom att göra research på Medium först, genom olika artiklar upptäckte jag två npm moduler som rekommenderades för uppdraget, rate-limiter-flexible samt express-rate-limit. Jag valde att implementera den sistnämnda modulen, jag la till även denna modulen som en middleware i mitt API och valde att limitera inte enbart enstaka routes med hela API:t. Jag satte upp en uppsättning regler, som säger att en ip-address kan maximimalt göra 100 requests under 15 minuter, om en server eller en användare går över denna gräns skickar API:t en 429 http status samt meddelandet "Too many requests. Try again later". Slutligen valde jag även att skriva mina loggfiler till fil med hjälp utav Morgan, istället för att endast skriva ut i terminal konsolen. Detta löste jag genomatt använda modulen fs (file-system).

### Krav 4: Tester Backend

Angående testmiljön för min backend valde jag att gå samma väg som vi hade gått i tidigare kursmoment, dvs. en test svit bestående av chai, chai-http, mocha och nyc. Jag baserade delvis mitt val på att jag ville befästa mina kunskaper gällande denna metod som lärts ut under kursens gång samt att det var relativt felfritt att få testsviten att fungera, jag kunde fokusera på att skriva testfall till fullu. Jag tycker även att kombinationen utav Mocha och Chai fungerar väldigt bra samt att den visuella representationen utav kodtäckningen utav Istanbul ger en bra översikt. Innan testerna körs så implementerade jag ett script i ett pretest scrip i programmets package.json, "node db/reset.js", en version på bash scriptet från tidigare kmom men nu som node. Då jag bestämt mig för att använda endast Mongoose för projektet, så fick jag även sätta mig in i synthaxen för att tömma en databas med den nämda tekniken. Mongoose har fungerat suveränt i alla aspekter, förutom i just denna. Det var inte lätt att få Mongoose att ta bort en databas, efter många timmars felsökning kom jag framtill en kombination mellan att ta bort en databas och därefter dess kollektioner, vilket gav önskat resultat. Men envis som jag är så ville jag försöka hitta en lösning för att endast behöva ta bort databasen (vilket logiskt sätt borde ta bort innehållet utav kollektioner också). Jag fick rätt på det till slut, det känns som en väldigt enkel sak att uträtta, men officiell dokumentation och diverse forumtrådar verkar vara oense om hur en ska gå till väga med Mongoose. Med andra ord råder det en hel motstridighet om tillvägagångssättet och det verkar skilja sig från fall till fall vad som faktiskt fungerar.

Backendens CI-kedja består utav två tekniker, först ut är Travis som är ett byggsystem för att checka ut kod och för att köra tester automatiskt varje gång en pushar kod till tillhörande github repo, då Travis är kopplat till varje version en checkar ut av sin kod blir det även tydligt att se vilka commits som passerade och vilka som fallerade, med andra ord väldigt fördelaktigt. För att få uppgifter om kodtäckning och kodkvalitet implementerade jag Scrutinizer, som även det är kopplat till Github.
I båda fallen aktiverade jag notifikationer via email, på så sätt behöver en inte logga in på hemsidan för att se om testerna gick igenom, utan en får ett mail om det fungerade eller inte. Scrutinizer ger även hintar om variabler som inte används eller kod som saknar syfte, på så sätt är det även ett bra verktyg för att refaktorera.

Gällande kodkvalitet och uppnåd kodtäckning, så fick min backend applikation högsta betyg samt en kodtäckning om 75 %, hade gärna spenderat mer tid på att skriva fler testfall men jag fick göra en prioritera pga. sjukdom.

Koden för de invididuella testfallen är visserligen snarlik, givetvis beroende på hur komplext en vill göra testfallen, men jag upplever det åtminstone i detta fall att det är relativt enkelt att uppnå 100 % kodtäckning om en har det som mål. På det stora hela rör det sig om integrationstester, det hade dock varit intressant att prova E2E (end to end testing), vad jag känner till så kan Supertest användas för detta syfte men en kan även använda newman tillsammans med Postman (där en kan använda sina sparade kollektioner för att sakapa end-to-end flow tests), den sistnämnda metoden vore intressant att utforska då åtminstone jag brukar först och främst testa API:r med Postman och då en kan återanvända sparade requests så behöver en inte skriva ny kod. Anser att jag är nöjd med uppnått resultat, skulle dock som sagt vilja prova på andra tekniker också.
