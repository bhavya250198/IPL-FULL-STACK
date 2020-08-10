const express = require('express');
const app = express();
const cors=require('cors')
const  Pool  = require("pg").Pool;
const bodyParser = require("body-parser");
 app.use(cors());
app.use(bodyParser.json());

const path = require('path')

require("dotenv").config();
const devConfig={
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "IPL-Dashboard",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
}
const proConfig = {
  connectionString: process.env.DATABASE_URL
}
const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig:devConfig);

 app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req,res) =>{
   res.sendFile(path.join(__dirname+'/client/build'));
});
// app.get('/api/getList', (req,res) => {
//   var list = ["item1", "item2", "item3"];
//   res.json(list);
//   console.log('Sent list of items');
// });

app.get("/batsmanstats", async (req, res) => {
  //return all rows
  const results = await pool.query(
    "select bbb.striker_id,sum(batsman_scored)as scores,p.player_name,p.player_id from ball_by_ball_ipl bbb inner join player p on bbb.striker_id = p.player_id group by bbb.striker_id,p.player_name,p.player_id order by scores desc limit 10"
  );
  console.log(results);
  console.table(results.rows);
  res.send({ rows: results.rows, method: "pool" });
});

app.get("/bowlerstats", async (req, res) => {
  //return all rows
  const results = await pool.query(
    "(select count(wicketsbowler) as wickets,p.player_id,p.player_name,tableA.bowler_id from (select count(ball_by_ball_ipl.player_dismissal_id)as wicketsbowler,ball_by_ball_ipl.bowler_id from ball_by_ball_ipl where  ball_by_ball_ipl.player_dismissal_id != 0 and ball_by_ball_ipl.player_dismissal_type != 'run out' group by ball_by_ball_ipl.player_dismissal_id, ball_by_ball_ipl.bowler_id) tableA inner join player p on p.player_id = tableA.bowler_id group by tableA.bowler_id,p.player_id,p.player_name order by wickets desc limit 10)"
  );
  console.log(results);
  console.table(results.rows);
  res.send({ rows: results.rows, method: "pool" });
});
app.get("/totalwickets", async (req, res) => {
  const results = await pool.query(
    "select count(ball_by_ball_ipl.player_dismissal_id) as Total_Wickets from ball_by_ball_ipl inner join match on match.match_id =ball_by_ball_ipl .match_id where  ball_by_ball_ipl.player_dismissal_id != 0 and ball_by_ball_ipl.player_dismissal_type != 'run out'"
  );
  console.table(results.row);
  console.log(results);
  res.send({ rows: results.rows, method: "pool" });
});
app.get("/batproportions", async (req, res) => {
  const results = await pool.query(
    "select  distinct batsman_scored,count( batsman_scored ) from ball_by_ball_ipl group by batsman_scored;"
  );
  console.table(results.row);
  console.log(results);
  res.send({ rows: results.rows, method: "pool" });
});
app.get("/seasons", async (req, res) => {
  const results = await pool.query(
    "select count(season_id) as seasons from season"
  );
  console.log(results);
  console.table(results.row);

  res.send({ rows: results.rows, method: "pool" });
});
app.get("/matches", async (req, res) => {
  const results = await pool.query(
    "select count(match_id) from match"
  );
  console.table(results.row);

  res.send({ rows: results.rows, method: "pool" });
});
app.get("/typesofdismissal", async (req, res) => {
  const results = await pool.query(
    "select  distinct player_dismissal_type, count(player_dismissal_type) from ball_by_ball_ipl where player_dismissal_type ='bowled' or player_dismissal_type ='caught' or player_dismissal_type ='caught and bowled'  or player_dismissal_type ='lbw' or player_dismissal_type ='run' or player_dismissal_type ='hit wicket' or player_dismissal_type ='obstructing the field' or player_dismissal_type ='stumped' group by player_dismissal_type"
  );
  console.table(results.row);

  res.send({ rows: results.rows, method: "pool" });
});

app.get("/teams-wins", async (req, res) => {
  const results = await pool.query(
    "Select tableC.team_name_id,tableC.fieldedfirst,tableC.batfirst,t.team_short_code,t.team_id from (Select tableA.team_name_id,tableA.fieldedfirst,tableB.batfirst from (select team_name_id,toss_decision,count(match_winner_id) fieldedfirst  from match where toss_decision='field' group by team_name_id,toss_decision) tableA INNER JOIN (select team_name_id,toss_decision,count(match_winner_id)batfirst from match where toss_decision='bat' group by team_name_id,toss_decision) tableB on tableA.team_name_id = tableB.team_name_id) tableC inner join team t on t.team_id=tableC.team_name_id;"
  );
  console.table(results.row);

  res.send({ rows: results.rows, method: "pool" });
});

app.get("/overall-matches", async (req, res) => {

  const results = await pool.query(
    "select tableC.team_name_id,tableC.matcheswon, t.team_short_code from (select team_name_id, (count(match_winner_id))as matcheswon from match group by team_name_id) tableC inner join team t on t.team_id=tableC.team_name_id "
  );
  console.table(results.row);

  res.send({ rows: results.rows, method: "pool" });
});
app.post("/finaldetails", async (req, res) => {
  console.log(req.body.season_id);
  const results = await pool.query(
    "SELECT finale.Team_A,finale.Team_B,finale.Winner,finale.win_type,finale.won_by, finale.win_type,finale.venue,finale.city_name,finale.man_of_the_match_id,p.player_name,finale.match_date FROM (Select theTable.Team_A,theTable.Team_B,team.team_short_code as Winner, theTable.win_type,theTable.won_by,theTable.venue,theTable.city_name,theTable.man_of_the_match_id , theTable.match_date from team inner join (Select finalTable.team_short_code Team_A,Team.team_short_code Team_B ,finalTable.match_winner_id,finalTable.man_of_the_match_id,finalTable.win_type,finalTable.venue,finalTable.city_name,finalTable.match_date, finalTable.won_by from team inner join(Select team.team_short_code, tableA.opponent_team_name_id,tableA.match_winner_id,tableA.venue,tableA.man_of_the_match_id, tableA.city_name,tableA.match_date ,tableA.win_type,tableA.won_by from team inner join (select match.team_name_id, match.opponent_team_name_id,  match.match_winner_id,match.man_of_the_match_id, match.won_by ,match.win_type,match.venue,match.city_name,match.match_date from match where match.match_id =  (select Max(match.match_id)  from match where match.season_id = $1 )) tableA on tableA.team_name_id = team.team_id) finalTable on team.team_id = finalTable.opponent_team_name_id)  theTable on team.team_id= theTable.match_winner_id) finale inner join player p on finale.man_of_the_match_id = p.player_id ",[req.body.season_id]);
  console.table(results);

  res.send({ rows: results.rows, method: "pool" });
});

app.get("/topbatsmenperseason", async (req, res) => {
  const results = await pool.query(
    "select tableC.Season_score,tableC.striker_id,p.player_name from (select sum(ball_by_ball_ipl.batsman_scored) as Season_Score,ball_by_ball_ipl.striker_id from ball_by_ball_ipl inner join match on match.match_id = ball_by_ball_ipl.match_id where match.season_id =1 group by ball_by_ball_ipl.striker_id order by Season_Score desc limit 10)tableC inner join player p on tableC.striker_id= p.player_id order by tableC.Season_Score desc"
  );
  console.table(results.row);

  res.send({ rows: results.rows, method: "pool" });
});

app.get("/topbowlersperseason", async (req, res) => {
  const results = await pool.query(
    "select tableC.wickets,tableC.bowler_id,p.player_name from (select count(ball_by_ball_ipl.player_dismissal_id) as wickets,ball_by_ball_ipl.bowler_id from ball_by_ball_ipl inner join match on match.match_id = ball_by_ball_ipl.match_id where match.season_id =1 and ball_by_ball_ipl.player_dismissal_id != 0 and ball_by_ball_ipl.player_dismissal_type != 'run out' group by ball_by_ball_ipl.bowler_id order by wickets desc limit 10)tableC inner join player p on tableC.bowler_id= p.player_id order by tableC.wickets desc "
  );
  console.table(results.row);
  res.send({ rows: results.rows, method: "pool" });
});

app.post("/seasonsixes", async (req, res) => {
  console.log(req.body.season_id);
  const results = await pool.query(
    "select count(ball_id) as total_sixes from (select ball_by_ball_ipl.ball_id,ball_by_ball_ipl.batsman_scored from (select match.match_id from match where match.season_id = $1) as resultTable inner join ball_by_ball_ipl on  ball_by_ball_ipl.match_id = resultTable.match_id) as finalTable where finalTable.batsman_scored = 6",[req.body.season_id]
  );
  console.table(results);
  res.send({ rows: results.rows, method: "pool" });
});
app.post("/seasonfours", async (req, res) => {
  console.log(req.body.season_id);
  const results = await pool.query(
    "select count(ball_id) as total_fours from (select ball_by_ball_ipl.ball_id,ball_by_ball_ipl.batsman_scored from ( select match.match_id from match where match.season_id = $1 )  as resultTable inner join ball_by_ball_ipl on  ball_by_ball_ipl.match_id = resultTable.match_id) as finalTable where finalTable.batsman_scored = 4",[req.body.season_id]
  );
  console.table(results);
  res.send({ rows: results.rows, method: "pool" });
});
app.post("/season-team-count",async (req,res)=>{
  console.log(req.body.season_id);
  const results= await pool.query( "select count(*) as teams from (select  distinct match.Team_Name_Id,team.Team_Short_Code ,team.Team_Name FROM match INNER JOIN team on match.Team_Name_Id = team.Team_Id  where match.Season_Id = $1 ) tableC",[req.body.season_id]);
  console.table(results);
  res.send({ rows: results.rows, method: "pool" });
});
app.get("/season-team-name", async (req, res) => {
  const results = await pool.query("select  distinct match.team_name_id,team.team_short_code ,team.team_name FROM match INNER JOIN team on match.team_name_id = team.team_id where match.season_id = 4");
  console.table(results.row);
  res.send({ rows: results.rows, method: "pool" });
});

app.post("/season-matches", async (req, res) => {
  console.log(req.body.season_id);
  const results = await pool.query(
    "select count(match_id) as Total_Matches from match where match.season_id = $1",[req.body.season_id]
  );
  console.table(results);

  res.send({ rows: results.rows, method: "pool" });
});

app.post("/seasons-wickets", async (req, res) => {
  console.log(req.body.season_id);
  const results = await pool.query(
    "select count(ball_by_ball_ipl.player_dismissal_id) as total_wickets from ball_by_ball_ipl inner join match on ball_by_ball_ipl.match_id = match.match_id where (match.season_id = $1 and ball_by_ball_ipl.player_dismissal_id !=0)",[req.body.season_id]
  );
  console.table(results);

  res.send({ rows: results.rows, method: "pool" });
});

app.post("/final-details", async (req, res) => {
  //return all rows
  console.log(req.body.season_id);
  const results = await pool.query(
    "select tableC.Team_A,tableC.Team_B,tableC.Winner, tableC.win_type,tableC.won_by,tableC.man_of_the_match_id,tableC.city_name,tableC.match_date, p.player_name from (Select theTable.Team_A,theTable.Team_B,team.team_short_code as Winner, theTable.win_type,theTable.won_by,theTable.man_of_the_match_id,theTable.city_name,theTable.match_date from team inner join  (Select finalTable.team_short_code  Team_A,Team.team_short_code Team_B , finalTable.match_winner_id,finalTable.win_type,finalTable.won_by,finalTable.man_of_the_match_id,finalTable.city_name,finalTable.match_date from team  inner join(Select team.team_short_code,tableA.opponent_team_name_id,tableA.match_winner_id, tableA.win_type,tableA.won_by, tableA.man_of_the_match_id,tableA.city_name,tableA.match_date from team inner join (select match.team_name_id,match.opponent_team_name_id, match.match_winner_id,match.won_by ,match.win_type, match.man_of_the_match_id,match.city_name,match.match_date from match where match.match_id =  (select Max(match.match_id) from  match where match.season_id = $1 )) tableA on  tableA.team_name_id = team.team_id)  finalTable on team.team_id = finalTable.opponent_team_name_id)  theTable on team.team_id= theTable.match_winner_id) tableC inner join player p on p.player_id = tableC.man_of_the_match_id",[req.body.season_id]
  );
  console.table(results);

  res.send({ rows: results.rows, method: "pool" });
});
app.post("/achievements", async (req, res) => {
  //return all rows
  console.log(req.body.season_id);
  const results = await pool.query(
    "select Player_Name as Man_of_the_Series,table_C.Purple_Cap,table_C.Orange_Cap from Player inner join (select Player_Name as Purple_Cap,table_B.Orange_Cap,table_B.Man_of_the_Series from Player inner join (select Player_Name as Orange_Cap,table_A.Purple_Cap_Id,table_A.Man_of_the_Series from Player inner join (select * from Season where Season.Season_Id = $1)as table_A on Player.Player_Id = table_A.Orange_Cap_Id) as table_B on table_B.Purple_Cap_Id = Player.Player_Id) as table_C on Player.Player_Id = table_C.Man_of_the_Series",[req.body.season_id]
  );
  console.table(results);

  res.send({ rows: results.rows, method: "pool" });
});
app.post("/season-batting", async (req, res) => {
  //return all rows
  console.log(req.body.season_id);
  const results = await pool.query(
    "select tableC.Season_score,tableC.striker_id,p.player_name from (select sum(ball_by_ball_ipl.batsman_scored) as Season_Score,ball_by_ball_ipl.striker_id from ball_by_ball_ipl inner join match on match.match_id = ball_by_ball_ipl.match_id where match.season_id = $1 group by ball_by_ball_ipl.striker_id order by Season_Score desc limit 10)tableC inner join player p on tableC.striker_id= p.player_id order by tableC.Season_Score desc ",[req.body.season_id]
  );
  console.table(results);

  res.send({ rows: results.rows, method: "pool" });
});

app.post("/season-bowling", async (req, res) => {
  //return all rows
  console.log(req.body.season_id);
  const results = await pool.query("select tableC.wickets,tableC.bowler_id,p.player_name from (select count(ball_by_ball_ipl.player_dismissal_id) as wickets,ball_by_ball_ipl.bowler_id from ball_by_ball_ipl  inner join match on match.match_id = ball_by_ball_ipl.match_id where match.season_id = $1 and ball_by_ball_ipl.player_dismissal_id != 0 and ball_by_ball_ipl.player_dismissal_type != 'run out' group by ball_by_ball_ipl.bowler_id order by wickets desc limit 10)tableC inner join player p on tableC.bowler_id= p.player_id order by tableC.wickets desc",[req.body.season_id]);
  console.table(results);

  res.send({ rows: results.rows, method: "pool" });
});
app.post("/teams-parts", async (req, res) => {
  //return all rows
  console.log(req.body.season_id);
  const results = await pool.query(
    "select distinct tableC.team_short_code,tableC.team_name, tableC.season_id from (select t.team_short_code,t.team_name,m.season_id, t.team_id from team t inner join match m  on m.team_name_id = t.team_id)tableC where tableC.season_id = $1 ",[req.body.season_id]
  );
  console.table(results);

  res.send({ rows: results.rows, method: "pool" });
});



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})