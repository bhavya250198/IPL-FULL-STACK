import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrimarySearchAppBar from "../Components/NavigationBar/NavigationBar";
import SideNavigationMenu from "../Components/Sidebar/Sidebar";
import Cards from "../Components/Teams/Teams";
import Stats from "../Components/Overall Stats/OverallStats";
import SeasonDetails from "../Components/OverallDetailsofSeason/SeasonDetails";
import FinalDetails from "../Components/FinalDetails/FinalDetails";
import axios from "axios";
import Achievements from "../Components/Achievement/achievements";
import Seasonbatball from "../Components/SeasonBatBall/seasonbat";
import SeasonAnalysis from "../Components/NavigationBar/SeasonAnalysis";
class Team extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      season_id:'',
      seasonmatches:'',
      seasonnumber:'',
      seasonteams:'',
      seasonfours:'',
      seasonsixes:'',
      seasonwickets:'',
      matchdate:'',
      team_a:'',
      team_b:'',
      matchvenue:'',
      matchcity:'',
      winner:'',
      win_type:'',
      won_by:'',
      man_of_the_match:'',
      man_of_the_series:'',
      orange_cap:'',
      purple_cap:'',
      data:[]
      
    };
  }
  fetchMatches=()=>{
    let value = sessionStorage.getItem("season_id");
    console.log(value);
    this.setState({
      seasonnumber:value
    })
    const  matches= {
      season_id:value
      
    }
    axios.post('/season-matches',matches)
    .then((res) => {
      console.log(res.data.rows);
      this.setState({
        seasonmatches:res.data.rows[0].total_matches
      },()=>{
        console.log(this.state.seasonmatches);
      })

    });

  }
  fetchTeams=()=>{
    let value = sessionStorage.getItem("season_id");
    const teams={
      season_id:value
    }
    axios.post('/season-team-count',teams)
    .then((res) => {
      console.log(res.data.rows);
      this.setState({
        seasonteams:res.data.rows[0].teams
      },()=>{
        console.log(this.state.seasonteams);
      })

    });

  }
  fetchFours=()=>{
    let value = sessionStorage.getItem("season_id");
    const fours={
      season_id:value
    }
    axios.post('/seasonfours',fours)
    .then((res) => {
      console.log(res.data.rows);
      this.setState({
        seasonfours:res.data.rows[0].total_fours
      },()=>{
        console.log(this.state.seasonfours);
      })

    });
  
    
  }
  fetchSixes=()=>{
    let value = sessionStorage.getItem("season_id");
    const fours={
      season_id:value
    }
    axios.post('/seasonsixes',fours)
    .then((res) => {
      console.log(res.data.rows);
      this.setState({
        seasonsixes:res.data.rows[0].total_sixes
      },()=>{
        console.log(this.state.seasonsixes);
      })

    });
  }
  fetchWickets =()=>{
    let value = sessionStorage.getItem("season_id");
    const fours={
      season_id:value
    }
    axios.post('/seasons-wickets',fours)
    .then((res) => {
      console.log(res.data.rows);
      this.setState({
        seasonwickets:res.data.rows[0].total_wickets
      },()=>{
        console.log(this.state.seasonwickets);
      })

    });
  }
  fetchTeamNames=()=>{
    let value = sessionStorage.getItem("season_id");
    const fours={
      season_id:value
    }
    axios.post('/teams-parts',fours)
    .then((res)=>{
      console.log(res.data.rows);
      this.setState({
                data:res.data.rows

      })
    })

  }
  fetchfinalDetails=()=>{
    let value = sessionStorage.getItem("season_id");
    const fours={
      season_id:value
    }
    axios.post('/finaldetails',fours)
    .then((res)=>{
      console.log(res.data.rows);
      this.setState({
                matchdate:res.data.rows[0].match_date,
                team_a:res.data.rows[0].team_a,
                team_b:res.data.rows[0].team_b,
                matchcity:res.data.rows[0].city_name,
                matchvenue:res.data.rows[0].venue,
                winner:res.data.rows[0].winner,
                won_by:res.data.rows[0].won_by,
               win_type:res.data.rows[0].win_type.substring(3),
               man_of_the_match:res.data.rows[0].player_name

      })
    })

  }
  fetchAchievements=()=>{
    let value = sessionStorage.getItem("season_id");
    const fours={
      season_id:value
    }
    axios.post('/achievements',fours)
    .then((res)=>{
      console.log(res.data.rows);
      this.setState({
                man_of_the_series:res.data.rows[0].man_of_the_series,
                purple_cap:res.data.rows[0].purple_cap,
                orange_cap:res.data.rows[0].orange_cap

      })
    })
  }
  componentDidMount()
  {
      this.fetchMatches();
      this.fetchTeams();
      this.fetchFours();
      this.fetchSixes();
      this.fetchWickets();
      this.fetchfinalDetails();
      this.fetchAchievements();
      this.fetchTeamNames(); }
  render() {
    return (
      <React.Fragment>
        <SideNavigationMenu />
        <SeasonAnalysis/>
        <SeasonDetails seasonteams={this.state.seasonteams} seasonfours={this.state.seasonfours}
        seasonnumber={this.state.seasonnumber}seasonmatches={this.state.seasonmatches} seasonsixes={this.state.seasonsixes}
         seasonwickets={this.state.seasonwickets}/>
        <FinalDetails matchvenue={this.state.matchvenue} matchcity={this.state.matchcity}
        matchdate={this.state.matchdate} team_a={this.state.team_a} team_b={this.state.team_b}
        winner={this.state.winner} win_type={this.state.win_type} man_of_the_match={this.state.man_of_the_match}
        won_by={this.state.won_by} data={this.state.data}/>
        <Achievements orange_cap={this.state.orange_cap} purple_cap={this.state.purple_cap} man_of_the_series={this.state.man_of_the_series}/>
        <Seasonbatball/>
      </React.Fragment>
    );
  }
}
export default Team;