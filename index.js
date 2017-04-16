#!/usr/bin/env node

var axios = require('axios');

var word = '';

var lineArr = process.argv;
var wordArr = lineArr.slice(2, lineArr.length);

word = encodeURIComponent( wordArr.join('+') );

axios.get('http://fanyi.youdao.com/openapi.do?keyfrom=yy-fanyi&key=1825926262&type=data&doctype=json&version=1.1&q=' + word)
	 .then(function(response) {
	 	console.log();
	 	if(typeof response.data.basic.phonetic === 'undefined'){
	 		console.log(response.data.query + '   ~ 有道翻译');
	 	}else {
	 		console.log(response.data.query + '	 ' + '[' + response.data.basic.phonetic + ']' + '   ~ 有道翻译');
	 	}
	 	console.log();
	 	for(var i = 0; i < response.data.basic.explains.length; i++){
	 		console.log( '-  ' + response.data.basic.explains[i]);
	 	}
	 	console.log();
	 	for(var i = 0; i < response.data.web.length; i++){
	 		console.log( '  ' + (i+1) + '. ' + response.data.web[i].key);
	 		console.log( '     ' + response.data.web[i].value);
	 		console.log();
	 	}
	 })
	 .catch(function(response) {
	 	console.log(error);
	 })

axios.get('http://dict-co.iciba.com/api/dictionary.php?key=A9ECFC93EA715621444A18FDEA7F56C0&type=json&w='+word)
	 .then(function(response) {
	 	var wordData = response.data.symbols[0].word_symbol || response.data.symbols[0].ph_am;
	 	if(typeof wordData === 'undefined'){
	 		console.log(response.data.word_name + '   ~ 爱词霸翻译');
	 	}else {
	 		console.log(response.data.word_name + '	 ' + '[' + wordData + ']' + '   ~ 爱词霸翻译');
	 	}
	 	console.log();
	 	if(typeof response.data.symbols[0].parts[0].means[0] === 'object'){
	 		// 查询内容为英文
	 		for(var i = 0; i < response.data.symbols[0].parts[0].means.length; i++){
		 		console.log( '  ' + (i+1) + '. ' + response.data.symbols[0].parts[0].means[i].word_mean);
		 		console.log();
	 		}
	 	}else {
	 		// 查询内容为中文
	 		for(var i = 0; i < response.data.symbols[0].parts[0].means.length; i++){
		 		console.log( '  ' + (i+1) + '. ' + response.data.symbols[0].parts[0].means[i]);
		 		console.log();
	 		}
	 	}
	 })
	 .catch(function(response) {
	 	console.log(error);
	 })