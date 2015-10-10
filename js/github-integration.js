$(document).ready(function(){
   var getOrgEvents = function(){
     $('#last-events').html("<p  class='loading'>Cargando...</p>");
     $.getJSON("https://api.github.com/orgs/Ambienta2MX/events", function(json) {
       if (json.message != "Not Found"){
         var output = "<table class='table table-hover table-striped'><tr><th>Evento</th><th>Realizado por</th><th>Módulo</th><th>Fecha</th></tr>";
         for( i = 0; i < 7 ; i++){
           //if(json[i].actor.login == 'jresendiz27' || json[i].actor.login == 'egjimenezg'){
             switch (json[i].type) {
              case "CommitCommentEvent":
                output += "<tr><td>Commented a commit. <i>\""+json[i].payload.comment.body+"\"</i>";
                break;
              case "CreateEvent":
                output += "<tr><td>Created the "+json[i].payload.ref_type+" <b>"+json[i].payload.ref+"</b>";
                break;
              case "DeleteEvent":
                output += "<tr><td>Deleted a "+json[i].payload.ref_type;
                break;
              case "DeploymentEvent":
                output += "<tr><td>Deployment";
                break;
              case "DeploymentStatusEvent":
                output += "<tr><td>Deployment status: "+json[i].payload.deplyment_status.state;
                break;
              case "DownloadEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "FollowEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "ForkEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "ForkApplyEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "GistEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "GollumEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "IssueCommentEvent":
                output += "<tr><td>Commented the issue <b>"+json[i].payload.issue.title+"</b> <i>\""+json[i].payload.comment.body+"\"</i>";
                break;
              case "IssuesEvent":
                output += "<tr><td>The issue <b>"+json[i].payload.issue.title+"</b> was "+json[i].payload.action;
                break;
              case "MemberEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "MembershipEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "PageBuildEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "PublicEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "PullRequestEvent":
                output += "<tr><td>A pull request was "+json[i].payload.action+": <i>\""+json[i].payload.pull_request.title+"\"</i>";
                break;
              case "PullRequestReviewCommentEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "PushEvent":
                output += "<tr><td>Pushed on <b>"+json[i].payload.ref.replace('refs/heads/','')+"</b> Last commit: <i>\""+json[i].payload.commits[0].message+"\"</i>";
                break;
              case "ReleaseEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "RepositoryEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "StatusEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "TeamAddEvent":
                output += "<tr><td>"+json[i].type;
                break;
              case "WatchEvent":
                output += "<tr><td>"+json[i].type;
                break;
              default:
                output += "<tr><td>"+json[i].type;
                break;
             }
             output +="</td><td><a href='"+json[i].actor.url.replace('api.','').replace('users/','')+"'>"+
             json[i].actor.login+"</a></td><td><a href='"+json[i].repo.url.replace('api.','').replace('repos/','')+"'>"+json[i].repo.name.replace('Ambienta2MX/','')+"</a></td><td>"+new Date(json[i].created_at).toLocaleString()+"</td></tr>";
          //}
         }
         output += "</table>";
         $('#last-events').html(output);
       } else {
         $('#last-events').html("<p>No se encontraron registros.</p>");
       }
     });
     return false;
   }

   var getIssues = function(){
     $('#issues').html("<p  class='loading'>Cargando...</p>");
     var output = "";
     var no = 0;
     //FastEagle
     $.getJSON("https://api.github.com/repos/Ambienta2MX/FastEagle/issues", function(json) {
       if (json.message != "Not Found"){
        output += "<table class='table table-hover table-striped'>"+
         "<tr><th>Título</th><th>Módulo</th><th>Estado</th><th>Creado</th><th>Asignado</th></tr>";
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/FastEagle'>FastEagle</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //SmartOwl
     $.getJSON("https://api.github.com/repos/Ambienta2MX/SmartOwl/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/SmartOwl'>SmartOwl</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //FastEagleMod
     $.getJSON("https://api.github.com/repos/Ambienta2MX/FastEagleMod/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/FastEagleMod'>FastEagleMod</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //FriendlyDolphin
     $.getJSON("https://api.github.com/repos/Ambienta2MX/FriendlyDolphin/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/FriendlyDolphin'>FriendlyDolphin</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //Ambienta2MX-Docs
     $.getJSON("https://api.github.com/repos/Ambienta2MX/Ambienta2MX-Docs/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/Ambienta2MX-Docs'>Ambienta2MX-Docs</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //AncientTortoise
     $.getJSON("https://api.github.com/repos/Ambienta2MX/AncientTortoise/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/AncientTortoise'>AncientTortoise</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //CuteBunny
     $.getJSON("https://api.github.com/repos/Ambienta2MX/CuteBunny/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/CuteBunny'>CuteBunny</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //CleverBeaver
     $.getJSON("https://api.github.com/repos/Ambienta2MX/CleverBeaver/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/CleverBeaver'>CleverBeaver</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
         output += "</table>";
         $('#issues').html(output);
       } else {
         if(no==7)
          $('#issues').html("<p>No se encontraron registros.</p>");
       }
     });
     return false;
   }
   getIssues();
   getOrgEvents();
});
