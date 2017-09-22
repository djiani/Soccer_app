const API_KEY = "4152f4d3d94a4491b7c977c606012179";
//const GSC_SEARCH_URL =`https://api.data.gov/gsa/auctions?api_key=${DEMO_KEY}&format=JSON`;
////url: 'http://api.football-data.org/v1/fixtures?timeFrame=n1',


function renderResult(result) {
	let len = result.length;
	let html =` 
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators competition" >`
    for(let i=0; i<len; i++){
    	if (i === 0){
    		html += `<li data-target="#myCarousel" data-slide-to=${i} class="active"></li>`
    	}
    	else{
    		html += `<li data-target="#myCarousel" data-slide-to=${i}></li>`
    	}
    }
    html += `</ol>
    <div class="carousel-inner" >`

    for(let i=0; i<len; i++){
     	if (i == 0){
     		html += `<div class="item active">`
     	}
     	else{
     		html += `<div class="item ">`
     	}
     	html += `
        	<div class="list-group">
	          	<h2>List of Comnpetitions </h2>
	            <ul>
	              <li class="list-group-item">Season: <span class="badge">${result[i].year}</span></li>
	              <li class="list-group-item">Name:<span class="badge">${result[i].caption}</li>
	              <li class="list-group-item">League:<span class="badge">${result[i].league}</span></li>
	              <li class="list-group-item">Naumbers of Teams:<span class="badge">${result[i].numberOfTeams}</span></li>
	              <li class="list-group-item">number of Games:<span class="badge">${result[i].numberOfGames}</span></li>
	              <li class="list-group-item">Number of Match days:<span class="badge">${result[i].numberOfMatchdays}</span></li>
	              <li class="list-group-item">Curent Match  day:<span class="badge">${result[i].currentMatchday}</span></li>
	            </ul>
	            <a href="#" class="list-group-item" data-id=${result[i].id}>List of Teams</a>
	            <a href="#" class="list-group-item" data-id=${result[i].id}>List of Games</a>
	            <a href="#" class="list-group-item" data-id=${result[i].id}>20 First best teams</a>
          	</div>
        </div>`
    }

    html +=`
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
        <span class="sr-only">Next</span>
    </a>
</div>`; // close <div class="carousel-inner" > 


  return html;
    
}

function displayYoutubeSearchData(data){
	let list_competition = renderResult(data);
  	$('#js_search_results').html(list_competition);


}

function getListCompetitionFromApi(year){
	$.ajax({
	  headers: { 'X-Auth-Token': API_KEY },
	  url: `http://api.football-data.org/v1/competitions/?season=${year}`,
	  dataType: 'json',
	  type: 'GET',
	}).done(function(response) {
		//control check on data
	 	displayYoutubeSearchData(response);
	  	//console.log(response);
	}); 
}

function watchSubmit(){
	$('.js_search_form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('#season');
   	 	const season = queryTarget.val();
   	 	console.log(season);
   	 	//$('#js_search_results').html(`<p> test displayed</p>`);
   	 	getListCompetitionFromApi(season);
   	 			
		
	});
}


$(function(){
	watchSubmit();
})