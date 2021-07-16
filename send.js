function getURL(URL, SendData) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open("post", URL, true);
    setHead(req);
    req.timeout = 6000;
    req.onload = function () {
      console.log(req.status);
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject('请求失败~~~');
      }
    };
    req.onerror = function () {
      reject('请求异常~~~');
    };
    req.send(SendData);
  });
}

function timeoutPromise(promise, ms) {
  var timeout = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("请求超时~~~");
    }, ms);
  });
  return Promise.race([promise, timeout]);
}

// //运行实例
// var taskPromise = new Promise(function (resolve) {
//   //随便一些什么处理
//   var delay = Math.random() * 2000;
//   setTimeout(function () {
//     resolve(delay + "ms");
//   }, delay);
// });

// timeoutPromise(taskPromise, 1000)
//   .then(function (value) {
//     console.log("taskPromise在规定时间内结束：" + value);
//   })
//   .catch(function (error) {
//     if (error) {
//       console.log(error);
//     }
//   });

// 头部
function setHead(hr) {
  hr.setRequestHeader("ContentType", "application/x-www-form-urlencode");
  hr.setRequestHeader("Content-Type", "application/json");
}

//   发送数据
function send(URL, SendData) {
  timeoutPromise(getURL(URL, SendData), 6000)
    .then(function (value) {
      console.log("taskPromise在规定时间内结束：" + value);
      console.log(value);
      document.getElementById("receive").value = value;
      document.getElementById("json-input").value = value;
      praseJson();
    })
    .catch(function (error) {
      if (error) {
        console.log(error);
        alert(error);
      }
    });

  // getURL(URL, SendData)
  //   .then(function onFulfilled(value) {
  //     console.log(value);
  //     document.getElementById('receive').value = value;
  //     document.getElementById('json-input').value = value;
  //     praseJson ();
  //   })
  //   .catch(function onRejected(error) {

  //     console.error(error);

  //   });
}

//   body体
// function setBody() {
//   var sendData = {
//     sss: "ssss",
//     aaaa: "aaaa",
//     bbbb: "bbbb",
//   };
//   return JSON.stringify(sendData);
// }

function syntaxHighlight(json) {
  if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}

function do_js_beautify() {
  // $("#fjs").html("");
var js_source =$('#json-input').val().replace(/^\s+/, '');
if(js_source.length==0)
return;
  // var tabsize = $('#tabsize').val();
  tabchar = ' ';
  // if (tabsize == 1)
  //   tabchar = '\t';
var tabsize =4;
  var fjs = js_beautify(js_source, tabsize, tabchar);
// $("#json-renderer").val(fjs);
$('#json-renderer').html(syntaxHighlight(fjs));
// document.getElementById('json-renderer').innerText=fjs;
}