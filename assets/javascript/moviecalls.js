function restart() {

  var wellSection;
  var data;
  var url;
  var name = [];
  var genre = [];
  var name;
  var popularity;
  var posterPath;
  var release;
  var voteAverage;
  var voteCount;
  var releaseDate;

  $()

  $("#clear").on("click", function(event) {
    event.preventDefault();
    $("#results").empty();
    restart();
  });

  $("#search").on("click", function(event) {
    event.preventDefault();
    $("wellSection").empty();
    var term = $("#term").val().trim();

    // var movie = "star wars";
    //      var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

    var base = "https://api.themoviedb.org/3/";
    // var movie = 
    // var movie=
    var search = "search/movie?query='" + term + "'&";
    var genre = "genre/movie/list?";
    var keywordID = "/keyword/{14644}?";
    var keyword = "search/keyword?query='" + term + "'&";
    var key = "api_key=b287a269fa3356a822e8c1b358a6f0fc";
    var searchURL = base + search + key;
    var genreURL = base + genre + key;
    var keywordURL = base + keywordID + key;
    var finalGenre = [];
    var ge = [];
    var genreObj = {};
    var movieObj = {};
    var allMoviesObj = {};

    $.ajax({
      url: genreURL,
      method: "GET"
    }).done(function(response) {
      var articleCounter = 0;
      data = response;
      console.log(data);

      for (i = 0; i < data.genres.length; i++) {
        var genreK = data.genres[i].id
        console.log(genreK);
        var genreV = data.genres[i].name
        console.log(genreV);
        genreObj[genreK] = genreV;
      }
      console.log(genreObj);

      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
          url: searchURL,
          method: "GET"
        }).done(function(response) {
          var articleCounter = 0;
          data = response;

          console.log(data.results)
            // console.log(data.genres[0]);
          for (i = 0; i < data.results.length; i++) {

            movieObj["popularity"] = (data.results[i].popularity).toFixed(2);
            console.log(movieObj.popularity);
            popularity = (data.results[i].popularity).toFixed(2);
            movieObj["posterPath"] = "https://image.tmdb.org/t/p/w92" + data.results[i].poster_path;
            movieObj["releaseDate"] = data.results[i].release_date;
            movieObj["voteAverage"] = data.results[i].vote_average;
            movieObj["voteCount"] = data.results[i].vote_count;
            genres = data.results[i].genre_ids; // genres is an array with all genre ids.

            console.log(genres);
            for (var j = 0; j < genres.length; j++) { //loop to translate genres
              console.log(genres.length);
              console.log("genrej" + genres[j]);
              genres[j] = genres[j].toString();
              finalGenre.push(genreObj[genres[j]]); // placing genre values into final 
              movieObj["genres"] = finalGenre;

              // name = data.results[i].title;
              movieObj["name"] = data.results[i].title;
              allMoviesObj["name"] = movieObj;
              console.log(allMoviesObj.name.genres);
              // movieObjs["name"]; 
            }
            finalGenre = [];
            // console.log(finalGenre);

            //display
            articleCounter++;
            wellSection = $("<div>").addClass("container");
            $("#results").append(wellSection);
            wellSection = $("<div>").addClass("jumbotron");
            $("#results").append(wellSection);
            var wellSection1 = $("<button>");
            wellSection1.attr("type", "button").addClass("btn btn-primary").text(articleCounter);
            // wellSection.append(wellSection1);
            // wellSection1=$("<p>").append(data3.substring(0, 10));
            // wellSection.append(wellSection1);
            var wellSection2 = $("<p>").prepend(allMoviesObj.name.name + "<br>").append("  Release Date: " + allMoviesObj.name.releaseDate + "  Popularity: " + allMoviesObj.name.popularity + "% " + "  Vote Average: " + allMoviesObj.name.voteAverage + "  Vote Count: " + allMoviesObj.name.voteCount + "  Genres: " + allMoviesObj.name.genres);

            var wellSection3 = $("<img>")
            wellSection3.attr("src", allMoviesObj.name.posterPath);

            // wellSection.append(wellSection1);
            // wellSection1=$("<a>").attr("href", data2).text(data2).append("<br><br>");

            wellSection.append(wellSection1);
            wellSection.append(wellSection2);
            wellSection.append(wellSection3);
          } // closes if
        }) //coses function (results)

    }); //closes function event
  });
}; //restart

restart();