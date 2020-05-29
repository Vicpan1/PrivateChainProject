var fs=require("fs");
var Web3 = require("web3");
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.personal.unlockAccount(web3.eth.accounts[0],"123456",300);

fs.readdir("../transhash", function(err, files)
{  //讀取根目錄下子目錄的檔案列表

  if (err) throw err
  for (var i = 0; i < files.length; i++)

  { //目錄下有幾個檔案，就執行幾次

    console.log('check=>'+i);

    Filehandle(i, files[i]);

})

function Filehandle(i, FileName) {
  fs.readFile("../transhash/transhash"+i+".txt", function (error, data)
    {
    // 讀取檔案內容
      if (error)
      {
        console.log('讀取檔案失敗');
        return;
      }

      console.log(data.toString());
      var take = web3.eth.getTransaction(data.toString()).input;//利用交易hash獲取區塊鏈上的metadata
      var download = web3.toAscii(take);//將資料由16進制轉乘Ascii
        fs.writeFile( '../EdgeOBU/DownloadFromBlockchain/metadata'+i+'.txt' , download ,function (error)
            {//在指定的目錄下，生成一個檔案，並將指定的資料寫入
              console.log(error);
              console.log('文件寫入成功');
            });
    });

}

