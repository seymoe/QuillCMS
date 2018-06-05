var TmcClient = require('../index.js').TmcClient;

var tmcClient = new TmcClient('23021137','2092fca6ee2d8613ad79dcf44b60630e','default');

tmcClient.connect('ws://mc.api.taobao.com/',
    function (message,confirmCb) {
        console.log(message);
	    //如果处理失败,不用调用confirmCb
	    //如果处理成功
        confirmCb();
    });