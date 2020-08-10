import axios from "axios";
import React from "react";
import {withRouter} from "react-router-dom";
import FontAwesome from "react-fontawesome";
import {Nav} from "react-bootstrap";
import {Grid,Typography,Paper} from '@material-ui/core'
import * as ReactBootstrap  from "react-bootstrap";
import history from '../History/history';
import "../Seasons/Season.scss"
// import { Paper, Typography } from "@material-ui/core";
// import {Kolkata} from "../Teams/Images/KKR.png";
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

class Seasons extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.state={
        
              }
              this.onClick= this.onClick.bind(this);
  }


onClick=(value)=>{
  window.sessionStorage.setItem('season_id', value);
  
  this.props.history.push('/teams');
  
};
    render()
    {
        return(
            <div className="season-cards">
                <span className="seasons">Seasons</span>
            
            <Grid>
           
  <Grid item xs={2} style={back1} className="grids ">
  
    <Paper className="season-one"> 
      <Typography>
    <Nav.Link className="years" onClick={(value) =>{
      this.onClick(value=1) }}>1</Nav.Link> 
    </Typography>
    </Paper>
    
  </Grid>
              
  <Grid  className="season-grid" item xs={2} style={back2} >
   
    <Paper className="season-two">
    <Nav.Link className="years" onClick={(value) =>{
      this.onClick(value=2) }}>2</Nav.Link>
    </Paper>
    
    
  </Grid>
  <Grid item xs={2} style={back3}>
  
    <Paper className="season-three">
    <Nav.Link className="years" onClick={(value) =>{
      this.onClick(value=3) }}>3</Nav.Link>
    </Paper>

  </Grid>
  <Grid item xs={2} style={back4}>
    <Paper className="season-four">    
    <Nav.Link className="years" onClick={(value) =>{
      this.onClick(value=4) }}>4</Nav.Link>
    </Paper>
   
    
  </Grid>
  <Grid item xs={2} style={back5}>
    <Paper className="season-five"> 
    <Nav.Link className="years"onClick={(value) =>{
      this.onClick(value=5) }}>5</Nav.Link>
    </Paper>
    
  </Grid>
  <Grid item xs={2} style={back5}>
    <Paper className="season-six">
    <Nav.Link className="years" onClick={(value) =>{
      this.onClick(value=6) }}>6</Nav.Link>
    </Paper>
    
  </Grid>
  <Grid item xs={2} style={back5}>
    <Paper className="season-seven" >
    <Nav.Link className="years"onClick={(value) =>{
      this.onClick(value=7) }}>7</Nav.Link>
    </Paper>
    
    
  </Grid>
  <Grid  item xs={2} style={back5}>
    <Paper className="season-eight">
    <Nav.Link className="years" onClick={(value) =>{
      this.onClick(value=8) }}>8</Nav.Link>
    </Paper>
    
  </Grid>
  <Grid item xs={2} style={back5}>
    <Paper className="season-nine">
    <Nav.Link className="years" onClick={(value) =>{
      this.onClick(value=9) }}>9</Nav.Link>
    </Paper>
   
    
  </Grid>

</Grid>
</div>
        );
    }
}
export default withRouter(Seasons);