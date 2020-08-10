import {
    Chart,
    chartWrapper,
    google,
    visualization,
  } from "react-google-charts";
  import * as React from "react";
  import FontAwesome from "react-fontawesome";
  import { BrowserRouter as Router, Route, Link } from "react-router-dom";
  import { render } from "react-dom";
  import axios from 'axios';
  import * as ReactBootstrap from "react-bootstrap";
  import '../BatsmanCharts/BatsmanCharts.css'; 
import { Grid, Paper } from "@material-ui/core";
  class BatsmanStats extends React.Component
  {
      constructor(props)
      {
          super(props);
          this.state={
              data:[],
              bowlerdata:[],
              batpropotions:[],
              dismissalproportions:[],
              teamwins:[],
              overallwins:[]
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
      this.setState({ batpropotions: blind,
                        fours:response.data.rows[4].count,
                        sixes:response.data.rows[6].count},()=>{
          console.log(this.state.batpropotions);
      });
  })
  .catch(function (error){
      console.log(error);
  });

}
      fetchBowlerData()
{
  axios.get('/bowlerstats')
  .then(response => {
      console.log(response);
      let blind = [["Bowler", "Wickets"]];
      let mappedData = response.data.rows.map(function (currentData, i) {
        return [currentData.player_name, 1 * currentData.wickets];
      });
      blind = blind.concat(mappedData);
      this.setState({ bowlerdata: blind });
  })
  .catch(function (error){
      console.log(error);
  });

}
fetchtypesofDismissals(){
    axios.get('/typesofdismissal')
  .then(response => {
      console.log(response);
      let blind = [["types of dismissal", "Proprtions"]];
      let mappedData = response.data.rows.map(function (currentData, i) {
        return [currentData.player_dismissal_type, 1 * currentData.count];
      });
      blind = blind.concat(mappedData);
      this.setState({ dismissalproportions: blind,
                },()=>{
          console.log(this.state.dismissalpropotions);
      });
  })
  .catch(function (error){
      console.log(error);
  });

  }
  fetchTeamWins()
  {
      axios.get('/teams-wins')
      .then(response=>{
          console.log(response);
          let blind = [["Teams", "Batting-First","Fielding-First"]];
      let mappedData = response.data.rows.map(function (currentData, i) {
        return [currentData.team_short_code, 1 * currentData.batfirst,1*currentData.fieldedfirst];
      });
      blind = blind.concat(mappedData);
      this.setState({ teamwins: blind,
      },()=>{
                console.log(this.state.teamwins);
});

      })
      .catch(function (error){
        console.log(error);
    });
  }
  fetchOverallWins()
  {
      axios.get('/overall-matches')
      .then(response=>{
          console.log(response);
          let blind = [["Teams", "Overall Matches"]];
      let mappedData = response.data.rows.map(function (currentData, i) {
        return [currentData.team_short_code, 1 * currentData.matcheswon];
      });
      blind = blind.concat(mappedData);
      this.setState({ overallwins: blind,
      },()=>{
                console.log(this.state.overallwins);
});

      })
      .catch(function (error){
        console.log(error);
    });
  }

      componentDidMount()
      {
        this.fetchBowlerData();
        this.fetchBattingProportions();
        this.fetchtypesofDismissals();
        this.fetchTeamWins();
        this.fetchOverallWins();
      }
      render()
      {
          return(
            <React.Fragment>
            <Grid>
              <Grid item xs={2}>
                <Paper className="top-batsmen">
               
                    <div className="compounds">
                      <span class="Rabi">Top 10 batsman </span>
                    </div>
                  
                    <div className="charts">
                    
                      <Chart
                        
                        width={"1000px"}
                        height={"240px"}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={this.props.data}
                        options={{
                          explorer: { axis: "vertical", keepInBounds: true },
                          bar: { groupWidth: "80%" },
                          // colors: ['rgb(51,102,204)','green'],
                          chartArea: { width: "90%" },
                          series: {
                            1: {
                              
                              color: "00A0D0",
    
                              visibleInLegend: false,
                            },
                            hAxis: {
                              title: "Compounds",
                              minValue: 0,
                              slantedText: true,
                              slantedTextAngle: 90,
                            },
                            vAxis: {
                              title: "Trials",
                            },
                          },
                        }}
    
    
                        rootProps={{ "data-testid": "1" }}
                      />
                    </div>
                  </Paper>
                  </Grid>
              <Grid item xs={2}>
                <Paper className="top-bowler">
                    <div className="compounds-1">
                      <span class="Rabi">Top 10 bowlers </span>
                    </div>
                 
                    <div className="charts">
                    
                      <Chart
                        
                        width={"1000px"}
                        height={"240px"}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.bowlerdata}
                        options={{
                          explorer: { axis: "vertical", keepInBounds: true },
                          bar: { groupWidth: "80%" },
                          // colors: ['rgb(51,102,204)','green'],
                          chartArea: { width: "90%" },
                          series: {
                            1: {
                              
                              color: "00A0D0",
    
                              visibleInLegend: false,
                            },
                            hAxis: {
                              title: "Compounds",
                              minValue: 0,
                              slantedText: true,
                              slantedTextAngle: 90,
                            },
                            vAxis: {
                              title: "Trials",
                            },
                          },
                        }}
    
    
                        rootProps={{ "data-testid": "1" }}
                      />
                    </div>
                  </Paper>
                          </Grid>
              </Grid>

              <Grid>
              <Grid item xs={2}>
              <Paper className="dotballs">
                    <div className="Runs">
                      <span class="Rabi">Runs vs Dot-Balls</span>
                    </div>
                  
                    <div className="runs-vs">
                      <Chart
                        
                        width={"500px"}
                        height={"280px"}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.batpropotions}
                        options={{
                         
                          pieHole: 0.4,
                        
                          chartArea: { width: "90%" },
                          
                        }}
    
    
                        rootProps={{ "data-testid": "1" }}
                      />
                    
                  </div>
              </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className="bowling-types">
                    <div className="dismissal">
                      <span class="bowling">Types of Dismissals in bowling </span>
                    </div>
                
                   <div className="dismissal-types">
                      <Chart
                        
                        width={"500px"}
                        height={"280px"}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.dismissalproportions}
                        options={{
                         
                          pieHole:0.4,
                        
                          chartArea: { width: "200%" },
                          
                        }}
    
    
                        rootProps={{ "data-testid": "1" }}
                      />
                   </div>
                 </Paper>
              </Grid>
              </Grid>
              <div className="deck">
              <Grid>
              
                <Grid item xs={6}>
                  <Paper className="matches-won">
                      
                    <div className="won-toss">
                      <span class="bowling">Matches won by teams based on toss </span>
                    </div>
                  
                  <div class="toss">
                      <Chart
                        
                        width={"1000px"}
                        height={"270px"}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.teamwins}
                        options={{
                    
                            explorer: { axis: "vertical", keepInBounds: true },
                            bar: { groupWidth: "80%" },
                        
                          chartArea: { width: "85%" },
                          
                        }}
    
    
                        rootProps={{ "data-testid": "1" }}
                      />
                   </div>
                 </Paper>
                 </Grid>
                 <Grid item xs={6}>
            
              <Paper className="overall-matches">
                      
                    <div className="overall">
                      <span class="bowling">Overall matches won by teams </span>
                    </div>
                        <div className="bowl-charts">
                 
                      <Chart
                        
                        width={"400px"}
                        height={"270px"}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.overallwins}
                        options={{
                                
                        
                          chartArea: { width: "85%" },
                          
                        }}
    
                        
                        rootProps={{ "data-testid": "1" }}
                      />
                    </div>
                 
                </Paper>
              </Grid>
              </Grid>
              </div>
              </React.Fragment>
              
          );

      }
  }
export default BatsmanStats;
