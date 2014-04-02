function getTopicList(){
  obj = JSON.parse(window.localStorage.v2ex);
  for(var i in obj){
    var title = obj[i][0];
    var url = obj[i][1];
    var topic = url.split("/")[4];
    $(".topics").append(" \
      <tr> \
        <td>" + topic + "</td> \
        <td>" + title + "</td> \
        <td>" + "<a href='" + url + "' target='_blank'>View</a>" + "</td> \
      </tr>");
  }
}

function clear(){
  window.localStorage.removeItem("v2ex");
  window.location.reload();
}

getTopicList();

$("#clear").on("click", function(event){
  clear();
});