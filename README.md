# Routr #
Routr is a simple routing library that enables you to listen to url patters you difine. This library was started as an experiment after been inspired by alot of popular libraries.

Routr is  powerful and flexible routing engine and if used properly it can reduce code complexity by decoupling objects and also by abstracting navigation paths and server requests.

## USAGE ##

- [API Documentation](#api)
- [Example](#examples)


### API Documentation ###

- **change(callback)** [Event]
Event dispatched when there is a change in url hash
- **addRoute(pattern,callback)** [Method]
Method allows us to add url pattern to the Route engine.

### Examples 1 ####

Callback function gets triggered everytime there is a change in the hash tag.

```html
  <!html>
  <html>
    <head>
      <script src="/js/libs/routes.debug.js"></script>
      <script>

        G.Routes.change(function(data){
          document.getElementById('main').innerHTML += "<br>" + data + " Selected";
        });
      </script>
    </head>
    <body>
    </body>
  </html>
```

### Examples 2 ####

You can also declare a routes pattern with one or more parameters. Everytime there is a change in the url string a callback function is triggers and a object with url params is returned. 

```html
  <!html>
  <html>
    <head>
      <script src="/js/libs/routes.debug.js"></script>
      <script>

        G.Routes.addRoute('/news/:title/:id/:slug',function(data){
          document.getElementById('main').innerHTML += "<br>News with id " + data.id + "and Title " + data.title + " selected";
        });


        G.Routes.addRoute('/news/:id',function(data){ 
          document.getElementById('main').innerHTML += "<br>News with id " + data.id + " selected";
        });
      </script>
    </head>
    <body>
    </body>
  </html>
```