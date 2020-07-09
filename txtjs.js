var fs=require("fs");
fs.readdir("../Server/UserRequest", function(err, files)
{  //讀取根目錄下子目錄的檔案列表
  if (err) throw err
  for (var i = 0; i < files.length; i++)
  { //設立迴圈，目錄下有幾個檔案，就執行幾次
    console.log('check=>'+i);
    Filehandle(i, files[i]);
  }
})
console.log("讀取目錄操作中 ... ");
function Filehandle(i, FileName) {
  fs.readFile("../Server/UserRequest/"+FileName, function (error, data)//要讀取的目錄
  { //讀取檔案內容
    if (error)
    {
      console.log('讀取檔案失敗');
      return;
    }
    var string = data.toString();
    var newdata = string.substr(0,data.length);
    var writejs = 'var metadata = '+'\''+newdata+'\''+'\r\n';
    var js0 = 'var fs=require("fs");'+'\r\n'
    var js1 = 'var Web3 = require("web3");'+'\r\n'
    var js2 = 'var web3 = new Web3();'+'\r\n';
    var js3 = 'web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));'+'\r\n';
    var js4 = 'web3.personal.unlockAccount(web3.eth.accounts[0],"123456",300);'+'\r\n';
    var js5 = 'var metadata = '+'\''+newdata+'\''+'\r\n';
    var js6 = 'var hexdata = web3.toHex(metadata);'+"\r\n";
    var js7 = 'var up'+i+' = web3.eth.sendTransaction({from:web3.eth.accounts[0],data:hexdata,gas:7654321});'+"\r\n";
    var js8 = 'fs.writeFile( "../Server/UserRequest/Transactionhash.txt" , up'+i+' ,function (error){'+"\r\n";
    var js9 = 'console.log(error);'+"\r\n";
    var js10 = 'console.log("文件上傳成功'+i+'");'+"\r\n";
    var js11 = '});'+"\r\n";
    fs.writeFile( "../eth-netstats/metadata"+i+'.js' , js0+js1+js2+js3+js4+js5+js6+js7+js8+js9+js10+js11 ,function (error)//要讀取的檔案

    {//在指定的目錄下，生成一個檔案，並將指定的資料寫入
      console.log(error);
      console.log('文件寫入成功'+i);
    });
  });
}
