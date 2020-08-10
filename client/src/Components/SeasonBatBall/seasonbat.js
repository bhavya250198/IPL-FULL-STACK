import React, { Component } from "react";
import {Grid,Paper,Typography} from '@material-ui/core';
import {Chart}  from 'react-google-charts';
import axios from "axios";
import "../SeasonBatBall/batball.css"
class Seasonbatball extends React.Component
{
 constructor(props)
 {
     super(props);
     this.state={
         topbatsman:[],
         topbowler:[],
         season_id:''
     }
 }
 fetchtopBatsman=()=>{
    let value = sessionStorage.getItem("season_id");
    console.log(value);
    this.setState({
        season_id:value
      })
      const  matches= {
        season_id:value
        
      }
    axios.post('/season-batting',matches)
    .then((res) => {
        console.log(res.data.rows);
        let blind = [["Batsman", "Runs"]];
      let mappedData = res.data.rows.map(function (currentData, i) {
        return [currentData.player_name, 1 * currentData.season_score];
      });
      blind = blind.concat(mappedData);
        this.setState({
            topbatsman:blind
        })
    }
    )
 }

 fetchtopBowler=()=>{
    let value = sessionStorage.getItem("season_id");
    console.log(value);
    this.setState({
        season_id:value
      })
      const  matches= {
        season_id:value
        
      }
    axios.post('/season-bowling',matches)
    .then((res) => {
        console.log(res.data.rows);
        let blind = [["Bowlers", "Wickets"]];
      let mappedData = res.data.rows.map(function (currentData, i) {
        return [currentData.player_name, 1 * currentData.wickets];
      });
      blind = blind.concat(mappedData);
        this.setState({
            topbowler:blind
        })
    }
    )
 }
 
 componentDidMount()
 {
 this.fetchtopBatsman();
 this.fetchtopBowler();
 }
 render()
 {
     return(
         <div className="stats">
             <b className="player-stats">Player-Stats</b>
             <Grid>
                 <Grid item xs={6}>
                 
                      
                    
                     <Paper className="data-batsman">
                     
                         <div className="batsman">
                     <span class="top">Top 10 batsman </span>
                     </div>
                     <div className="charts-1">
                    <Chart
                      
                      width={"1000px"}
                      height={"240px"}
                      chartType="ColumnChart"
                      loader={<div>Loading Chart</div>}
                      data={this.state.topbatsman}
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
                 <Grid item xs={6}>
                 
                      
                    
                 <Paper className="data-batsman-1">
                 
                     <div className="batsman-1">
                 <span class="top">Top 10 Bowlers </span>
                 </div>
                 <div className="charts-1">
                <Chart
                  
                  width={"1000px"}
                  height={"240px"}
                  chartType="ColumnChart"
                  loader={<div>Loading Chart</div>}
                  data={this.state.topbowler}
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
         </div>
     )
 }
}
export default Seasonbatball;