/**
 * Module dependencies.
 */

ApiClient = require('../index.js').ApiClient;

const client = new ApiClient({
    'appkey':'23897902',
    'appsecret':'26657347b25d2e4bb454696ae717f988',
    'url':'http://gw.api.taobao.com/router/rest2'
});

client.execute('alibaba.aliqin.fc.sms.num.send',
    {
        'rec_num':'17612345678',
        'sms_free_sign_name':'就业指导中心',
        'sms_param': '{"name":"姓名"}',
        'sms_template_code': 'SMS_70135147',
        'sms_type': 'normal'
    },
    function (error,response) {
        if(!error)
            console.log(response);
        else
            console.log(error);
    }
);