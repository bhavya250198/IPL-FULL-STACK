import axios from "axios";
import React from "react";
import FontAwesome from "react-fontawesome";
import {Nav} from "react-bootstrap";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import * as ReactBootstrap  from "react-bootstrap";
import "../Overall Stats/Stats.scss";
import { Typography } from "@material-ui/core";
const back1
={
  backgroundColor:'white'
};
const back2
={
  backgroundColor:'white'
}
const back3
={
  backgroundColor:'white'
}
const back4
={
  backgroundColor:'white'
}
const back5
=
{
  backgroundColor:'white'
}


class Stats extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.state={
            
            sixes:'',
            fours:'',
            matches:'',
            seasons:'',
            wickets:''
              }
  }

  

componentDidMount()
{
  
  
}
  
    render()
    {
        return(
            <div className="ipl-stats">
              <Grid>
                <Grid item xs={6}>
          <Paper className="paper">
           <span class="session"> Seasons </span>
            <br/>
             <span className="season-count">{this.props.seasons}</span>
          </Paper>
         
        </Grid>
        <Grid item xs={6}>
          <Paper className="matches" >
          <span className="session-champions"> Champions</span>
          <br/>
          <span className="season-count" >6</span>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="matches" >
          <span className="session-matches">Matches </span>
          <br/>
          <span className="season-count-matches">{this.props.matches}</span>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="matches" >
          <span className="session-fours"> Fours</span>
          <br/>
          <span className="season-count-fours">{this.props.fours}</span>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="matches" >
          <span className="session-sixes">Sixes</span>
          <br/>
          <span className="season-count-sixes" >{this.props.sixes}</span>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="matches" >
          <span className="session">Wickets</span>
          <br/>
          <span className="season-count-wickets">{this.props.wickets}</span>
          </Paper>
        </Grid>
        </Grid>
          </div>
        );
    }
}
export default Stats;