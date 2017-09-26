const API_KEY = "4152f4d3d94a4491b7c977c606012179";
//const GSC_SEARCH_URL =`https://api.data.gov/gsa/auctions?api_key=${DEMO_KEY}&format=JSON`;
////url: 'http://api.football-data.org/v1/fixtures?timeFrame=n1',
let SeasonComp = 2017;
let competitionId = 444;


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
                <h3>${result[i].caption}</h3>
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

function fails(data){
    alert("error list of Competitions");    
}

function getListCompetitionFromApi(year){
    $.ajax({
      headers: { 'X-Auth-Token': API_KEY },
      url: `http://api.football-data.org/v1/competitions/?season=${year}`,
      dataType: 'json',
      type: 'GET',
      success: function(response){
        console.log("list of Competitions");
        console.log(response);
        displayCompetitionData(response);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
           alert("textStatus:"+textStatus +" errorThrown:"+ errorThrown);
        }
    }); 
}

/*List of the Teams of a sepecific competition and season*/
function renderListTeam(result) {
    let len = result.teams.length;
    if(len === 0){
        let html =`
        <h1></h1>
        <h3>List of Teams is empty at this time</h3>
        <button type="button" class="GoBackToCompetitions">List of Teams</button>;`
        return html;
    }
    let html =` 
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <h1>List of Teams </h1>
    <ol class="carousel-indicators competition" >`
    for(let i=0; i<len; i++) { 
        $(".js_search_results").attr("style",`background:url(${result.teams[i].crestUrl})`);
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
                <h3>${result.teams[i].name}</h3>
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
    <button type="button" class="GoBackToCompetitions">List of Competitions</button>
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
        success:function(response) {
            console.log("list of Teams");
            console.log(response);
            displayTeamsData(response);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
           alert("textStatus:"+textStatus +" errorThrown:"+ errorThrown);
        }

    }); 
}

/*List League Table */
function renderLeagueTable(result) {
    let len = result.standing.length;
    if(len === 0){
        let html =`
        <h1> ${result.leagueCaption}</h1>
        <h3>League Table is empty at this time</h3>
        <button type="button" class="GoBackToCompetitions">List of Teams</button>;`
        return html;
    }

    let html =` 
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <h1>${result.leagueCaption}:League Table </h1>
        <ol class="carousel-indicators competition" >`
        for(let i=0; i<len; i++) {
            if (i === 0) {
                html += `<li data-target="#myCarousel" data-slide-to=${i} class="active"></li>`
            }
            else{
                html += `<li data-target="#myCarousel" data-slide-to=${i}></li>`
            }
        }
        html += `
        </ol>
        <div class="carousel-inner" >`

        for(let i=0; i<len; i++){
            $(".js_search_results").attr("style",`background:url(${result.standing[i].crestUrl})`);
            if (i == 0){
                html += `
            <div class="item active" )">`
            }
            else{
                html += `
                <div class="item ">`
            }
            html += `
                <div class="list-group">
                    <h3>${result.standing[i].position}.) ${result.standing[i].teamName} ** ${result.matchday}th Match day</h3>
                    <ul>
                      <li class="list-group-item">PlayedGames<span class="badge"> ${result.standing[i].playedGames}</span></li>
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

        <button type="button" class="GoBackToCompetitions">List of Competitions</button>
    </div>`; // close <div class="carousel-inner" > 
    
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
      success: function(response) {
        console.log("Table League");
        console.log(response);
        displayLeagueTableData(response);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
           alert("textStatus:"+textStatus +" errorThrown:"+ errorThrown);
        }
    }); 
}

/*List of Players */
function renderPlayers(result, teamName, imgTeam) {
    let len = result.players.length;
    if(len === 0){
        let html =`
        <h1> ${teamName}</h1>
        <h3>List of players for this team is empty at this time</h3>
        <button type="button" class="GoBackToTeams">List of Teams</button>;`
        return html;
    }

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
                <h3>${teamName}</h3>
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
     <button type="button" class="GoBackToTeams">List of Teams</button>
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
      success: function(response) {
        console.log("List of Players");
         console.log(response);
        displayListPlayersData(response, teamName, imgTeam);
        },
      error: function(XMLHttpRequest, textStatus, errorThrown){
            alert("textStatus:"+textStatus +" errorThrown:"+ errorThrown);
        }
    }); 
}

function getCompettion(response){
    console.log("list of Competitions");
    console.log(response);
    displayCompetitionData(response);
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
        competitionId = $(event.currentTarget).attr("data-id");
        getListTeamsFromApi(competitionId);
    });

    $("#js_search_results").on("click", ".js-listFixtures" , function(event){
        competitionId = $(event.currentTarget).attr("data-id");
        alert("The List of Fixtures is not yet implemnted");
        //getListTeamsFromApi(competitionId);
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

    $("#js_search_results").on("click", ".GoBackToCompetitions" , function(event){
        getListCompetitionFromApi(SeasonComp);
    });

    $("#js_search_results").on("click", ".GoBackToTeams" , function(event){
        getListTeamsFromApi(competitionId);
    });
     
}


$(function(){
    watchSubmit();
});