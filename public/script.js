$(document).ready(function () {
  let API_KEY = null;

  $.get("/config", function (config) {
    API_KEY = config.API_KEY;
  });

  $("#loadBtn").on("click", function () {
    const start = $("#startDate").val();
    const end = $("#endDate").val();

    if (!start || !end) {
      alert("Please select both start and end dates");
      return;
    }

    $("#results").html('<li class="result">Loading…</li>');

    fetchGames(start, end);
  });

  function fetchGames(start, end) {
    const url = `https://api.balldontlie.io/v1/games?start_date=${start}&end_date=${end}&per_page=100`;

    $.ajax({
      url,
      method: "GET",
      headers: { Authorization: API_KEY },
      success: function (data) {
        const games = data.data;

        if (!games.length) {
          $("#results").html(
            '<li class-"result">No games in this period.</li>'
          );
          return;
        }

        processGames(games);
      },
      error: function () {
        $("#results").html('<li class="result">Failed to load data.</li>');
      },
    });
  }

  function processGames(games) {
    const counts = {};

    games.forEach((game) => {
      const home = game.home_team.full_name;
      const away = game.visitor_team.full_name;

      counts[home] = (counts[home] || 0) + 1;
      counts[away] = (counts[away] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    $("#results").empty();

    sorted.forEach(([team, games]) => {
      $("#results").append(`
  <li class="result">
    <span>${team}</span>
    <span>${games}</span>
  </li>
`);
    });
  }
});
