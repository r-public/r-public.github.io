$( document ).ready(init);

function init(){
    $("#srchbar").keyup(function(event){
        if(event.keyCode == 13){
            search()
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
        fillstr+= "<h3><a href='"+data[i]['question']+"'>"+data[i]['title']+"</a></h3>"
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

function search(where = "everywhere"){
    if(where=="everywhere"){
        searchphrase = $("#srchbar").val()
        $("#data").html("<h2>Search Results for <i>"+searchphrase+"</i></h2>")
        searchterms = searchphrase.split(' ')
        for (i in searchterms){
            word = searchterms[i]
            for (j in data){
                titleindex = data[j]['title'].indexOf(word)
                descindex = data[j]['desc'].indexOf(word)
                if (titleindex>0 || descindex>0){
                    var tempdata = JSON.parse(JSON.stringify(data[j])) //Best Way to Clone! 
                    tempdata['desc'] = tempdata['desc'].split(word).join("<span class='matched'>"+word+"</span>")
                    tempdata['title'] = tempdata['title'].split(word).join("<span class='matched'>"+word+"</span>")
                    display([tempdata])
                }
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