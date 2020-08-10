import React from 'react';
import {Grid } from '@material-ui/core';
import  { Typography } from '@material-ui/core';
import {Paper} from '@material-ui/core';
import '../OverallDetailsofSeason/seasondetails.css';
class SeasonDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            seasonnumber:'1',
            seasonteams:'8',
            seasonwickets:'48',
            seasonmatches:'58',
            seasonfours:'500',
            seasonsixes:'100'

        }
        
    }
    render()
    {
        return(
            
            <Grid>
            <Grid item xs={6}>
      <Paper className="season-number">
        <span className="sseasons">Seasons</span>
        <br/>
         <span className="seas-number">{this.props.seasonnumber}</span>
      </Paper>
     
    </Grid>
    <Grid item xs={6}>
      <Paper className="season-teams" >
      <span className="steams"> Teams</span>
      <br/>
      <span className="seas-teams">{this.props.seasonteams}</span>
      </Paper>
    </Grid>
      <Grid item xs={6}>
      <Paper className="season-matches" >
        <span className="smatches">Matches</span>
        <br/>
      <span className="seas-matches">{this.props.seasonmatches}</span>
      </Paper>
    </Grid>
     <Grid item xs={6}>
      <Paper className="fours" >
        <span className="sfours">Fours</span>
        <br/>
      <span className="seas-fours">{this.props.seasonfours}</span>
      </Paper>
    </Grid>
    <Grid item xs={6}>
      <Paper className="sixes" >
        <span className="ssixes">Sixes</span>
        <br/>
      <span className="seas-sixes">{this.props.seasonsixes}</span>
      </Paper>
    </Grid>
    <Grid item xs={6}>
      <Paper className="wickets" >
        <span className="swickets">Wickets</span>
        <br/>
      <span className="seas-wickets">{this.props.seasonwickets}</span>
      </Paper>
     </Grid>    
    </Grid>
    


        );
    }

}
export default SeasonDetails;