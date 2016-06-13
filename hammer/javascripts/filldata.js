$( document ).ready(init);

function init(){
    $("#srchbar").keyup(function(event){
        if(event.keyCode == 13){
            search("everywhere")
        }
    });
    data = {}
    $.getJSON("https://raw.githubusercontent.com/r-public/HammeR/master/Canonicals.json",
    	       function json(tempdata){
    	       	    data = tempdata;
                    $("#data").html('');
                    display(tempdata)
                })
}

function display(data){
    fillstr = ""; 
    for (i in data){
        fillstr+= "<p>"
        fillstr+= "<div class='head'><div class='scorecard'><span class='score'>"+data[i]['score']+"</span><span class='scorevotes'>votes</span></div>"
        fillstr+= "<div class='questiontitle'><h3><a href='"+data[i]['question']+"'>"+data[i]['title']+"</a></h3></div></div>"
        fillstr+= "<div>"+data[i]['desc']+"</div><div>"
        for(j in data[i]["tags"]){
            tagname = data[i]['tags'][j]
            fillstr+= "<span class='tags' onclick='search(\""+tagname+"\")'>"+tagname+"</span>"
        }
        fillstr+= "</div><br /><hr />"
        fillstr+= "</p>"
    }
    $("#data").append(fillstr)
}

function search(where){
    searchphrase = ""
    if (where=="everywhere")
        searchphrase = $("#srchbar").val()
    if (searchphrase.indexOf("in:title") >= 0){
        where = "title"
    }
    else if (searchphrase.indexOf("in:desc") >= 0){
        where = "desc"
    }    
    if(where=="everywhere"){        
        $("#data").html("<h2>Search Results for <i>"+searchphrase+"</i></h2>")
        searchphrase = searchphrase.trim().toLowerCase()
        for (j in data){
            var titleindex = data[j]['title'].toLowerCase().indexOf(searchphrase)
            var descindex = data[j]['desc'].toLowerCase().indexOf(searchphrase)
            if (titleindex>0 || descindex>0){
                var tempdata = JSON.parse(JSON.stringify(data[j])) 
                tempdata['desc'] = tempdata['desc'].toLowerCase().split(searchphrase).join("<span class='matched'>"+searchphrase+"</span>")
                tempdata['title'] = tempdata['title'].toLowerCase().split(searchphrase).join("<span class='matched'>"+searchphrase+"</span>")
                display([tempdata])
                
            }
            else{
                searchterms = searchphrase.split(' ')
                for (k in searchterms){
                    var tempdata = JSON.parse(JSON.stringify(data[j])) 
                    var flagged = false;
                    titleindex = data[j]['title'].toLowerCase().indexOf(searchterms[k])
                    descindex = data[j]['desc'].toLowerCase().indexOf(searchterms[k])
                    if (titleindex>0 || descindex>0){
                        flagged = true;
                        tempdata['desc'] = tempdata['desc'].toLowerCase().split(searchterms[k]).join("<span class='matched'>"+searchterms[k]+"</span>")
                        tempdata['title'] = tempdata['title'].toLowerCase().split(searchterms[k]).join("<span class='matched'>"+searchterms[k]+"</span>")
                        
                    }
                }
                if (flagged)
                    display([tempdata])
            }
        }
    }
    else if (where=="title" || where == "desc"){
        searchphrase = searchphrase.replace("in:"+where,"").trim().toLowerCase()
        $("#data").html("<h2>Search Results for <i>"+searchphrase+"</i> in the "+where+"</h2>")
        for (j in data){
            if (data[j][where].toLowerCase().indexOf(searchphrase)>=0){
                var tempdata = JSON.parse(JSON.stringify(data[j])) 
                tempdata[where] = tempdata[where].toLowerCase().split(searchphrase).join("<span class='matched'>"+searchphrase+"</span>")
                display([tempdata])
            }
            else{
                searchterms = searchphrase.split(' ')
                var flagged = false;
                var tempdata = JSON.parse(JSON.stringify(data[j]))
                for (k in searchterms){
                    if (data[j][where].toLowerCase().indexOf(searchterms[k])>=0){
                        flagged = true;
                        tempdata[where] = tempdata[where].toLowerCase().split(searchterms[k]).join("<span class='matched'>"+searchterms[k]+"</span>")
                    }
                }
                if (flagged)
                    display([tempdata])
            }
        }
    }
    else{        
        $("#data").html("<h2>Search Results for posts tagged <i>"+where+"</i></h2>")
        for (j in data){
            tags = data[j]['tags']
            if ($.inArray(where,tags)>-1){
                display([data[j]])
            }
        }        
    }
}