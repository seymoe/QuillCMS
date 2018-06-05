# Taobao TOP API Node SDK

[淘宝开放平台](http://open.taobao.com/doc2/api_list.htm) API Node SDK

## Get Started

#### Rest API Demo
```js
ApiClient = require('../index.js').ApiClient;

var client = new ApiClient({
                            'appkey':'4272',
                            'appsecret':'0ebbcccfee18d7ad1aebc5b135ffa906',
                            'url':'http://api.daily.taobao.net/router/rest'
                            });

client.execute('taobao.user.get',
              {
                  'fields':'nick,type,sex,location',
                  'nick':'sandbox_c_1'
              },
              function (error,response) {
                  if(!error)
                    console.log(response);
                  else
                    console.log(error);
              })
```

#### Top Message Demo

```js

var TmcClient = require('../index.js').TmcClient;

var tmcClient = new TmcClient('453509','5642f38e5840714d77beb0574447f204','default');

tmcClient.connect('ws://mc.api.daily.taobao.net/',
    function (message,status) {
        console.log(message);
    });

```