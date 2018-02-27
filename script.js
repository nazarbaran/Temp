window.onload=function(){
	GetFile();
	getfile.onclick=GetFile;
	function GetFile(){
		var xhr=new XMLHttpRequest();
		xhr.open('get','/getfile',true)
		xhr.send();
		xhr.onreadystatechange=function(){
			if(xhr.readyState!==4)
				return;
			if (xhr.status!==200) 
				console.log(xhr.status+':'+xhr.statusText);
			else{
				var data=xhr.responseText;
				data=JSON.parse(data);
				filedata.innerHTML="";
				var table=document.createElement('table');
				table.classList.add('table');
				filedata.appendChild(table);
			for (var i=0;i<data.length;i++){
				var tr=document.createElement('tr');
				tr.classList.add('tr');
				table.appendChild(tr);
					for (var key in data[i]) {
						var td=document.createElement('td');
						tr.appendChild(td);
						td.innerHTML=data[i][key];
					}
				var td=document.createElement('td');
				tr.appendChild(td);
				var btn=document.createElement('input');
				btn.setAttribute('type','button');
				btn.setAttribute('value','Delete');
				td.appendChild(btn);
					table.onmouseover=function(event){
							var target=event.target;
							if (target.tagName=='INPUT')
							target.classList.add('btn')
					}
					table.onmouseout=function(event){
							var target=event.target;
							target.classList.remove('btn')
					}
			}
					table.onclick=function(event){
						var target=event.target;
							if (target.tagName!=='INPUT') return;
							var tr=target.parentNode.parentNode;
							var xhr=new XMLHttpRequest();
							var obj=JSON.stringify({
								index:tr.rowIndex
							});
							xhr.open('post','/rowindex',true);
							xhr.setRequestHeader('content-Type','application/json');
							xhr.send(obj);
							xhr.onreadystatechange=function(){
								if(xhr.readyState!==4)
									return;
								if (xhr.status!==200) 
									console.log(xhr.status+':'+xhr.statusText);
								else{
									console.log(xhr.responseText);
									GetFile();
								}
								
						}
					}
			}
		}
	}
	adduser.onclick=function(){
		var xhr=new XMLHttpRequest();
		var obj=JSON.stringify({
			first:first.value,
			last:last.value,
			age:age.value
		});
		xhr.open('post','/adduser',true)
		xhr.setRequestHeader('content-Type','application/json');
		xhr.send(obj);
		xhr.onreadystatechange=function(){
			if(xhr.readyState!==4)
				return;
			if (xhr.status!==200) 
				console.log(xhr.status+':'+xhr.statusText);
			else{
				console.log(xhr.responseText)
			}
			GetFile();
	}
}
}
