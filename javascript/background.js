chrome.browserAction.onClicked.addListener(function(){
  var newURL = chrome.extension.getURL('views/new.html');
  chrome.tabs.create({ url: newURL });
});

function httpRequest(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      callback(xhr.responseText);
    }
  };
  xhr.send();
}

function getLastestTopics(){
  httpRequest('http://v2ex.com/api/topics/latest.json', function(result){
    topics = JSON.parse(result);
    content = [];
    maxID = 0;
    for(var i in topics){
      id = topics[i].id;
      if (id <= window.localStorage.getItem("maxNum")) continue;
      title = topics[i].title;
      url = topics[i].url;
      content.push([title, url]);
      if (maxID < id) maxID = id;
    }
    if ((window.localStorage.v2ex) !== undefined){
      content = content.concat(JSON.parse(window.localStorage.v2ex));
    }
    window.localStorage.v2ex = JSON.stringify(content);
    if (window.localStorage.getItem("maxNum") < maxID){
      window.localStorage.maxNum = maxID;
    }
  });
}

if ((window.localStorage.v2ex) === undefined){
  getLastestTopics();
}

setInterval(getLastestTopics, 60000);
