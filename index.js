const API_KEY = "4152f4d3d94a4491b7c977c606012179";
//const GSC_SEARCH_URL =`https://api.data.gov/gsa/auctions?api_key=${DEMO_KEY}&format=JSON`;
////url: 'http://api.football-data.org/v1/fixtures?timeFrame=n1',
let SeasonComp = 2017;
//let compId = 0;


function renderResult(result) {
    let len = result.length;
    let html =` 
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <h1>List of Competitions </h1>
    <ol class="carousel-indicators competition" >`
    for(let i=0; i<len; i++) {
        if (i === 0) {
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
                <h2>${result[i].caption}</h2>
                <ul>
                  <li class="list-group-item">Season: <span class="badge">${result[i].year}</span></li>
                  <li class="list-group-item">Name:<span class="badge">${result[i].caption}</li>
                  <li class="list-group-item">League:<span class="badge">${result[i].league}</span></li>
                  <li class="list-group-item">Numbers of Teams:<span class="badge">${result[i].numberOfTeams}</span></li>
                  <li class="list-group-item">Number of Games:<span class="badge">${result[i].numberOfGames}</span></li>
                  <li class="list-group-item">Number of Match days:<span class="badge">${result[i].numberOfMatchdays}</span></li>
                  <li class="list-group-item">Curent Match  day:<span class="badge">${result[i].currentMatchday}</span></li>
                </ul>
                <a href="#" class="list-group-item js-listTeams" data-id=${result[i].id}>List of Teams</a>
                <a href="#" class="list-group-item js-leagueTable" data-id=${result[i].id}>League Table</a>
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

function displayCompetitionData(data){
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
        displayCompetitionData(response);
        //console.log(response);
    }); 
}

/*List of the Teams of a sepecific competition and season*/
function renderListTeam(result) {
    let len = result.teams.length;
    let html =` 
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <h1>List of Teams </h1>
    <ol class="carousel-indicators competition" >`
    for(let i=0; i<len; i++) {
        if (i === 0) {
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
            html += `<div class="item active" style="background:url(${result.teams[i].crestUrl});">`
        }
        else{
            html += `<div class="item ">`
        }
        html += `
            <div class="list-group">
                <h2>${result.teams[i].name}</h2>
                <ul>
                  <li class="list-group-item">Team Short Name: <span class="badge">${result.teams[i].shortName}</span></li>
                  <li class="list-group-item">Squad Market Value:<span class="badge">${result.teams[i].squadMarketValue}</span></li>
                  <a href="#" class="list-group-item js-listFixtures" data-id=${result.teams[i].id}>List of Fixtures</a> 
                  <a href="#" class="list-group-item js-listPlayers" data-url=${result.teams[i]._links.players.href} 
                  name=${result.teams[i].name} url= ${result.teams[i].crestUrl}>Players of this Team</a>
                </ul>
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

function displayTeamsData(data){
    let list_Teams = renderListTeam(data);
    $('#js_search_results').html(list_Teams);
}
//request list of teams form the server; 
//paramns: compId: competition Id 
function getListTeamsFromApi(compId){
    $.ajax({
      headers: { 'X-Auth-Token': API_KEY },
      url: `http://api.football-data.org/v1/competitions/${compId}/teams`,
      dataType: 'json',
      type: 'GET',
    }).done(function(response) {
        //control check on data
        displayTeamsData(response);
        //console.log(response);
    }); 
}

/*List League Table */
function renderLeagueTable(result) {
    let len = result.standing.length;
    let html =` 
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <h1>League Table </h1>
    <ol class="carousel-indicators competition" >`
    for(let i=0; i<len; i++) {
        if (i === 0) {
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
            html += `<div class="item active" style="background:url(${result.standing[i].crestUrl}')">`
        }
        else{
            html += `<div class="item ">`
        }
        html += `
            <div class="list-group">
                <h2>${result.leagueCaption} Match Day: ${result.matchday}</h2>
                <ul>
                  <li class="list-group-item">position: <span class="badge">${result.standing[i].position}</span></li>
                  <li class="list-group-item">team Name:<span class="badge">${result.standing[i].teamName}</li>
                  <li class="list-group-item">Played Games:<span class="badge">${result.standing[i].playedGames}</span></li>
                  <li class="list-group-item">Points:<span class="badge">${result.standing[i].points}</span></li>
                  <li class="list-group-item">Goals:<span class="badge">${result.standing[i].goals}</span></li>
                  <li class="list-group-item">Goals Against:<span class="badge">${result.standing[i].goalsAgainst}</span></li>
                  <li class="list-group-item">goal Difference:<span class="badge">${result.standing[i].goalDifference}</span></li>
                  <li class="list-group-item">Number of Games win:<span class="badge">${result.standing[i].wins}</span></li>
                  <li class="list-group-item">Number of Games draws:<span class="badge">${result.standing[i].wins}</span></li>
                  <li class="list-group-item">Number of Games losses:<span class="badge">${result.standing[i].losses}</span></li>
                  </ul>
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
    
    </div>
    <button type="button" class="buttonLeague">Go Back </button>`; // close <div class="carousel-inner" > 

  return html;    
}

function displayLeagueTableData(data){
    let list_league = renderLeagueTable(data);
    $('#js_search_results').html(list_league);
}


function getLeagueTableFromApi(compId){
    $.ajax({
      headers: { 'X-Auth-Token': API_KEY },
      url: `http://api.football-data.org/v1/competitions/${compId}/leagueTable`,
      dataType: 'json',
      type: 'GET',
    }).done(function(response) {
        //control check on data
        displayLeagueTableData(response);
        //console.log(response);
    }); 
}

/*List of Players */
function renderPlayers(result, teamName, imgTeam) {
    let len = result.players.length;
    let html =` 
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <h1>List of Players </h1>
    <ol class="carousel-indicators competition" >`
    for(let i=0; i<len; i++) {
        if (i === 0) {
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
            html += `<div class="item active" style="background:url(${imgTeam}')">`
        }
        else{
            html += `<div class="item ">`
        }
        html += `
            <div class="list-group">
                <h2>${teamName}</h2>
                <ul>
                  <li class="list-group-item">name: <span class="badge">${result.players[i].name}</span></li>
                  <li class="list-group-item">Position:<span class="badge">${result.players[i].position}</li>
                  <li class="list-group-item">Jersey Number:<span class="badge">${result.players[i].jerseyNumber}</span></li>
                  <li class="list-group-item">dateOfBirth:<span class="badge">${result.players[i].dateOfBirth}</span></li>
                  <li class="list-group-item">nationality:<span class="badge">${result.players[i].nationality}</span></li>
                  <li class="list-group-item">contractUntil:<span class="badge">${result.players[i].contractUntil}</span></li>
                  <li class="list-group-item">marketValue:<span class="badge">${result.players[i].marketValue}</span></li>
                  </ul>
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

function displayListPlayersData(data, teamName, imgTeam){
    let list_Players = renderPlayers(data, teamName, imgTeam);
    $('#js_search_results').html(list_Players);
}
//request list of teams form the server; 
//paramns: compId: competition Id 
function getListPlayersFromApi(teamUrl, teamName, imgTeam){
    $.ajax({
      headers: { 'X-Auth-Token': API_KEY },
      url: teamUrl,
      dataType: 'json',
      type: 'GET',
    }).done(function(response) {
        //control check on data
        displayListPlayersData(response, teamName, imgTeam);
        //console.log(response);
    }); 
}

function watchSubmit(){
    $('.js_search_form').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('#season');
        SeasonComp = queryTarget.val();
        console.log(SeasonComp);
        //$('#js_search_results').html(`<p> test displayed</p>`);
        getListCompetitionFromApi(SeasonComp);      
    });

    $("#js_search_results").on("click", ".js-listTeams" , function(event){
        let compId = $(event.currentTarget).attr("data-id");
        getListTeamsFromApi(compId);
    });

    $("#js_search_results").on("click", ".js-leagueTable" , function(event){
        let compId = $(event.currentTarget).attr("data-id");
        getLeagueTableFromApi(compId);
    });

     $("#js_search_results").on("click", ".js-listPlayers" , function(event){
        let playersUrl = $(event.currentTarget).attr("data-url");
        let teamName = $(event.currentTarget).attr("name");
        let ImgTeam = $(event.currentTarget).attr("url");
        console.log(teamName);
        console.log(ImgTeam);
        getListPlayersFromApi(playersUrl, teamName, ImgTeam);
    });

     $("#js_search_results").on("click", ".buttonLeague" , function(event){
        getListCompetitionFromApi(SeasonComp);
    });
}


$(function(){
    watchSubmit();
});