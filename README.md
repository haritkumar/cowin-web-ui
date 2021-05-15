# CoWin Tracker
[https://haritkumar.github.io/cowin-tracker/](https://haritkumar.github.io/cowin-tracker/)

CoWin tracker continuously checks for slot availability on CoWin open APIs and presents them in a beautiful table grid.

![cowin](src/assets/img/sample.PNG)

## Build
```sh
ng build --prod --base-href "https://haritkumar.github.io/cowin-tracker/"
```

### Handle 404 on gihub pages
Create a copy of index.html and rename it 404.html, so that when it doesn't find the page, it goes on 404.