$( document ).ready(init);

function init(){
	$("#srchbar").keyup(function(event){
        if(event.keyCode == 13){
            search()
        }
    });
	$.getJSON("https://raw.githubusercontent.com/r-public/HammeR/master/Canonicals.json",display)
}

function display(data){
	fillstr = ""; 
	for (i in data){
		fillstr+= "<p>"
		fillstr+= "<h3><a href='"+data[i]['question']+"'>"+data[i]['title']+"</a></h3>"
		fillstr+= "<div>"+data[i]['desc']+"</div><div>"
		for(j in data[i]["tags"]){
			tagname = data[i]['tags'][j]
			fillstr+= "<span class='tags'><a href='http://stackoverflow.com/questions/tagged/"+tagname+"'>"+tagname+"</a></span>"
		}
		fillstr+= "</div><br /><hr />"
		fillstr+= "</p>"
	}
	$("#data").html(fillstr)
}

function search(){
	$("#data").html("<h3>SEARCH FUNCTIONALITY IS YET TO BE DONE</h3>"+$("#data").html())
}