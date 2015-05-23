  var idBuscat="";

  function busqueda1(){
       $("li").remove(); // Remove any existing li elements
       $("ul>p").remove();
       $(this).addClass("btn-primary"); // Switch to default grey
       $(this).html("Carregant"); // Change text of button
       var id= $("#valorinput").val();
       var idBuscat=id;
       $.ajax({
            url: "https://api.flickr.com/services/feeds/photos_public.gne?format=json&id="+id+"&jsoncallback=?",
            dataType: "json",
            complete: function(jqXHR, textStatus) {
                console.log("Completed: "+textStatus);
                 $("#buscar").html("Torna a buscar"); // Change back text of button
                 $("#buscar").addClass("btn-primary"); // Revert back to default grey
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //$("#novaBusquedaTag").empty();
                console.log("Error: "+jqXHR.status+" "+errorThrown);
                $("#imagenes").append("<p>"+jqXHR.status+"</p>");
            },
            success: function(jsonflikr) {
                //$("#novaBusquedaTag").empty();
                console.log(jsonflikr);
                   $.each(jsonflikr.items, function (i,newsItem) {
                       
                       $("#imagenes").append("<li class='contentimg' style='float:left;' ><img  style=' width: 150px; height: 200px; margin: 5px;' src='"+newsItem.media.m+"'></img><br> <p>"+newsItem.tags+"</p> </li>");
                       //$("#imagenes").append("<p>"+newsItem.tags+"</p>");
                   });

                    $("#buscarTag").prop('disabled',false);

            }
       });

  }
   
  function busqueda2(){
      
      
       $("li").remove(); // Remove any existing li elements
       $("ul>p").remove();
       $(this).addClass("btn-primary"); // Switch to default grey
       $(this).html("Carregant"); // Change text of button
       var tags= $("#valorinput2").val();
       var id= $("#valorinput").val();
       console.log(tags);
       $.ajax({
            url: "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="+tags+"&id="+id+"&jsoncallback=?",
            dataType: "json",
            complete: function(jqXHR, textStatus) {
                console.log("Completed: "+textStatus);
                 $("#buscarTag").html("Trona a buscar"); // Change back text of button
                 $("#buscarTag").addClass("btn-primary"); // Revert back to default grey
                 $("#valorinput").prop('disabled',false);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Error: "+jqXHR.status+" "+errorThrown);
                $("#imagenes").append("<p>"+jqXHR.status+"</p>");
            },
            success: function(jsonflikr) {
                console.log(jsonflikr);
                   $.each(jsonflikr.items, function (i,newsItem) {
                       $("#imagenes").append("<li style='float:left;' ><img style='width: 150px; height: 200px; margin: 5px;' src='"+newsItem.media.m+"'></img> </li>");
                       //$("#imagenes").append("<p>"+newsItem.title+"</p>");
                   }); 
            }
       });
  }