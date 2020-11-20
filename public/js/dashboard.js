

$( document ).ready(function() {
console.log("dashboard");    
a();
});


 
  

  function a()
  {
    $.get("/getlist", function(data,status){ 
   data=$.parseJSON(data);
              
              console.log(data);
      if(data.docs.length==0){
          console.log("no data")
      }
      else{
    
          data.docs.forEach((val,index)=>{
   $("#tablelist").append("<tr><td>"+val.task+"</td><td>"+val.deadline+
   "</td><td><button class=\"btndel btn-secondary\"onclick=\"Edit(\'"+val._id+"\')\">Edit</button>"+"<button class=\"btndel btn-secondary\"onclick=\"deleteaccount(\'"+val._id+"\')\">Delete</button>"
    +"</td></tr>")       
      });
      
    }
    });
  }

  function Edit(id) {
    // body...
    $("#edittask").show();
    $("#addtask").hide();
      console.log("id is",id);
    var TaskId = { "id" : id };
    
      $.post('/edittask',TaskId).then((res,status)=>{
        console.log(res.deadline);
        console.log(status);
        $("#task").val();
        $("#edittaskname").attr("value",res.task);
        $("#editdeadline").attr("value",res.deadline);
        
      });
  
  }


  

  function deleteaccount(_id){
    console.log("delete click");
  var TaskId = { "id" : _id };
  console.log(TaskId);
  $.post('/delete',TaskId).then((res,status)=>{
console.log(status);
});
  }



