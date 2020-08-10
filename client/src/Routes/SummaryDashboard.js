import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrimarySearchAppBar from "../Components/NavigationBar/NavigationBar";
import SideNavigationMenu from "../Components/Sidebar/Sidebar";
import Seasons from "../Components/Seasons/Seasons";
import Cards from "../Components/Teams/Teams";
import Stats from "../Components/Overall Stats/OverallStats";
import BatsmanStats from "../Components/BatsmanCharts/BatsmanCharts";
import axios from 'axios';

class SummaryRoutes extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      data:[],
      bowlerdata:[],
      wickets:'250',
      fours:'',
      sixes:'',
      
      

    }
  }
  
  fetchBattingProportions()
  {
    axios.get('/batproportions')
    .then(response => {
        console.log(response);
        let blind = [["RUNS", "Proprtions"]];
        let mappedData = response.data.rows.map(function (currentData, i) {
          return [currentData.batsman_scored.toString(), 1 * currentData.count];
        });
        blind = blind.concat(mappedData);
        this.setState({ 
                          fours:response.data.rows[4].count,
                          sixes:response.data.rows[6].count},()=>{
            console.log(this.state.batpropotions);
        });
    })
    .catch(function (error){
        console.log(error);
    });
  
  }
  fetchBatsmanData(){
    axios.get('/batsmanstats')
        .then(response => {
            console.log(response);
            let blind = [["Batsman", "Runs"]];
            let mappedData = response.data.rows.map(function (currentData, i) {
              return [currentData.player_name, 1 * currentData.scores];
            });
            blind = blind.concat(mappedData);
            this.setState({ data: blind });
        })
        .catch(function (error){
            console.log(error);
        });
}
fetchWickets()
{
  axios.get('/totalwickets')
  .then(response => {
      console.log(response);
      
      this.setState({ wickets: response.data.rows[0].total_wickets},()=>{
        
      });
  })
  .catch(function (error){
      console.log(error);
  });
}

fetchSeasons()
{
  axios.get('/seasons')
  .then(response => {
      console.log(response);
      
      this.setState({ seasons: response.data.rows[0].seasons},()=>{
        console.log(this.state.seasons);
      }
      );
  })
  .catch(function (error){
      console.log(error);
  });
}

fetchWickets()
  {
    axios.get('/totalwickets')
    .then(response => {
        console.log(response);
        
        this.setState({ wickets: response.data.rows[0].total_wickets},()=>{
          console.log(this.state.wickets);
        }
        );
    })
    .catch(function (error){
        console.log(error);
    });
  }
  fetchMatches()
  {
    axios.get('/matches')
    .then(response => {
        console.log(response);
        
        this.setState({ matches: response.data.rows[0].count},()=>{
          console.log(this.state.matches);
        }
        );
    })
    .catch(function (error){
        console.log(error);
    });
  }


componentDidMount()
{
  this.fetchBatsmanData();
 
 this.fetchBattingProportions();
 this.fetchSeasons();
 this.fetchWickets();
 this.fetchMatches();
 
}
  render() {
    return (
      <React.Fragment>
        <SideNavigationMenu />
        <PrimarySearchAppBar />
        <Stats seasons={this.state.seasons} wickets={this.state.wickets} matches={this.state.matches} fours={this.state.fours}
        sixes={this.state.sixes}/>
        <BatsmanStats data={this.state.data} />
        <Seasons/>
      </React.Fragment>
    );
  }
}
export default SummaryRoutes;
