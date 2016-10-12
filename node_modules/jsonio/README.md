```
npm install jsonio --save
```

```
var jsonio=require('jsonio');

jsonio.write('test.json',{
    name:'tom',
    age:18
});

jsonio.append('test.json',{
    name:'jerry',
    age:21
});


jsonio.read('test.json',function(json){
    console.log(json);
})
```