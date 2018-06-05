"use strict"

var WebSocket = require('ws');
var Common = require('./common.js').Common;
var TmcCodec = require('./tmcCodec.js').TmcCodec;
var util = require('../topUtil.js');

var codec = new TmcCodec();
var TmcClient = function TmcClient(appkey,appsecret,groupName) {
    this._appkey = appkey;
    this._appsecret = appsecret;
    this._groupName = groupName;
    this._uri = 'ws://mc.api.taobao.com/';
    this._ws = null;
    this.isReconing = false;
    this._callback = null;
    this._interval = null;
}


TmcClient.prototype.createSign = function(timestamp){
    var basestring = this._appsecret;
    basestring += 'app_key' + this._appkey;
    basestring += 'group_name' + this._groupName;
    basestring += 'timestamp' + timestamp;
    basestring += this._appsecret;
    return util.md5(basestring).toUpperCase();
}

TmcClient.prototype.createConnectMessage = function() {
    var msg = {};
    msg.messageType = Common.enum.MessageType.CONNECT;
    var timestamp = Date.now();
    var content = {
        'app_key':this._appkey,
        'group_name':this._groupName,
        'timestamp':timestamp+'',
        'sign':this.createSign(timestamp),
        'sdk':'NodeJS-2.0.0',
        'intranet_ip':util.getLocalIPAdress()
    };
    msg.content = content;
    var buffer = codec.writeMessage(msg);
    return buffer;
}

TmcClient.prototype.createPullMessage = function() {
    var msg = {};
    msg.protocolVersion = 2;
    msg.messageType = Common.enum.MessageType.SEND;
    var content = {
        '__kind':Common.enum.MessageKind.PullRequest
    };
    msg.token = this._token;
    msg.content = content;
    var buffer = codec.writeMessage(msg);
    return buffer;
}

TmcClient.prototype.createConfirmMessage = function(id) {
    var msg = {};
    msg.protocolVersion = 2;
    msg.messageType = Common.enum.MessageType.SEND;
    var content = {
        '__kind':Common.enum.MessageKind.Confirm,
        'id':id
    };
    msg.token = this._token;
    msg.content = content;
    var buffer = codec.writeMessage(msg);
    return buffer;
}

TmcClient.prototype.autoPull = function () {
    if(this._ws){
        this._ws.send(this.createPullMessage(), { binary: true, mask: true });
    }
}

TmcClient.prototype.reconnect = function (duration) {
    if(this.isReconing)
        return;

    this.isReconing = true;
    let _this=this;
    setTimeout(function timeout() {
        _this.connect(_this._uri,_this._callback);
    }, duration);
}

TmcClient.prototype.connect = function(uri,callback) {
    let _this=this;
    if (uri!==undefined) this._uri = uri;
    if (callback!==undefined) this._callback = callback;

    if(_this._ws != null){
        _this._ws.close();
    }

    var ws = new WebSocket(this._uri);

    ws.on('open', function open() {
        _this._ws = ws;
        this.send(_this.createConnectMessage(), { binary: true, mask: true });
        if(!_this._interval){
            _this._interval = setInterval(_this.autoPull.bind(_this), 5000);
        }
    });

    ws.on('message', function(data, flags) {
        if(flags.binary){
            var message = codec.readMessage(data);
            if(message != null && message.messageType == Common.enum.MessageType.CONNECTACK){
                if(message.statusCode){
                    throw new Error(message.statusPhase);
                }else{
                    _this._token = message.token;
                    if (!message.token){
                        console.error(data.slice(14).toString()); //dbit
                        return;
                    }
                    console.log(_this._groupName,"top message channel connect success, token = "+message.token);
                }
            }else if(message != null && message.messageType == Common.enum.MessageType.SEND){
                _this._callback(message,(err)=>{
                    if(!err){
                        ws.send(_this.createConfirmMessage(message.id), { binary: true, mask: true });
                    }
                });
            }else{
                console.log(message);
            }
        }
    });

    ws.on('ping',function(data, flags) {
        ws.pong(data,{mask: true },true);
    });

    ws.on('error',function(reason, errorCode) {
        console.log('tmc client error,reason : '+ reason + ' code : '+ errorCode);
        console.log('tmc client channel closed begin reconnect');
        _this._ws = null;
        _this.reconnect(15000);
    });

    ws.on('close', function close() {
        console.log('tmc client channel closed begin reconnect');
        _this._ws = null;
        _this.reconnect(3000);
    });
    this.isReconing = false;
}

exports.TmcClient = TmcClient;