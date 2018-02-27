var fs=require('fs');
var express=require('express');
var app=express();
app.use(express.static(__dirname));//застосовує стилі і скріпт
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function(req,res){
	res.sendFile(__dirname+'/main.html');
});

app.get('/getfile',function(req,res){
	fs.readFile('data.json','utf-8',function(err,data){
		if (err)
			console.error(err);
		else
			res.send(data);
	})
});

app.post('/rowindex',function(req,res){
	console.log(req.body)
	fs.readFile('data.json','utf-8',function(err,data){
		if (err)
			console.error(err);
		else{
			data=JSON.parse(data);
			data.splice(req.body.index,1);
			data=JSON.stringify(data);
			fs.writeFile('data.json',data,function(err){});
		}
	});
			res.send('User removed')
});

app.post('/adduser',function(req,res){
	console.log(req.body)
	var user=req.body;
	fs.readFile('data.json','utf-8',function(err,data){
		if (err)
			console.error(err);
		else{
			data=JSON.parse(data);
			data.push(user)
			data=JSON.stringify(data);
			fs.writeFile('data.json',data,function(err){});
		}
	});
	res.send('User Added');
});

app.listen(process.env.PORT||8080);
console.log('Server running');
//Сортування обєктів по кліку mas.sort(function(a,b)){if (a.first>b.first) return 1}
