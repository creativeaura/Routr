# Routr #
Routr is a simple routing library that enables you to listen to url patters you difine. This library was started as an experiment after been inspired by alot of popular libraries.

Routr is  powerful and flexible routing engine and if used properly it can reduce code complexity by decoupling objects and also by abstracting navigation paths and server requests.

## Features ##
- [Client-side Routing](#features)

## USAGE ##

- [API Documentation](#api)
- [Example](#examples)


### Examples ####

```html
  <!html>
  <html>
    <head>
      <script src="/director.js"></script>
      <script>

        var author = function () { /* ... */ },
            books = function () { /* ... */ },
            viewBook = function(bookId) { /* bookId is populated. */ };

        var routes = {
          '/author': author,
          '/books': [books, function() { /* An inline route handler. */ }],
          '/books/view/:bookId': viewBook
        };

        var router = Router(routes);
        router.init();

      </script>
    </head>
    <body>
    </body>
  </html>
```

## Frequently Asked Questions ##


## Licence ##

(The MIT License)

Copyright (c) 2012 [@CreativeAura](http://www.twitter.com/nodejitsu).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.