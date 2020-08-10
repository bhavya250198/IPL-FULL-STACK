import React from "react";
import ReactTable from "react-table-6";
import {withRouter} from "react-router-dom";
 import 'react-table-6/react-table.css';
import {Grid,Paper,Typography, RootRef } from '@material-ui/core';
import '../FinalDetails/finaldetails.css';
import trophy from "../Teams/Images/Trophy.JPG";
const back1
={
  backgroundColor:'white'
};
class FinalDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            team_a:'RR',
            team_b:'CSK',
            matchdetails:'RR WON FROM CSK BY 3 WICKETS',
            matchvenue:'DY Patil Stadium',
            matchdate:'24-May-09',
            matchcity:'Mumbai',
            winner:'',
            won_by:'',
            win_type:'',
            man_of_the_match:'',
            data:[],
            sortable:true,
            resizable:true,
            columns:[

                  
                {
            
                  Header: "Teams",
                  accessor: "team_short_code",
                  width:70
                },
                {
                  Header: "Names",
                  accessor: "team_name",
                  width:200
                  
                }
            

            ]

        }
    }
    render()
    {
        return(
            <Grid>
            <Grid item xs={6} >
                <Paper className="final-details" style={back1}>
                    <span className="finale">FINALE</span>
                      <br></br>
                      <br></br>
                      <img className="trophy" src={trophy} alt="KKR" />
                      <br></br>
                      <span className="details">Final-Details</span>
                      <br></br>
                      <br></br>
                     <span className="date"> {this.props.matchdate}</span>
                        <br></br>
                        <br></br>
       <span className="team-a">{this.props.team_a} vs {this.props.team_b}</span>
                        <br></br>
        <span className="matchvenue">{this.props.matchvenue}</span>
        <br></br>
    <span className="matchcity">{this.props.matchcity}</span> 
                            <br></br>
    <span className="winning-stats">{this.props.winner} won by {this.props.won_by} {this.props.win_type}</span>
                            <br></br>
                    <b className="head-mom">Man of the Match:</b>
                    <br></br>
                    <span className="mom">{this.props.man_of_the_match}</span> 
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className="participation">
                    <span className="participating-teams">
                        TEAMS
                    </span>
                    <ReactTable
                    className="team-table"
                    
                    data={this.props.data}
                    pageSize={(this.props.data.length > 10) ? 10 : this.props.data.length}
                    columns={this.state.columns}
                    resizable= {this.state.resizable}
            sortable={this.state.sortable}/>
                </Paper>
            </Grid>
        </Grid> 
        )
    }


}
export default FinalDetails;