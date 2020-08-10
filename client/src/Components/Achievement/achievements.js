import React from 'react';
import {Grid,Typography,Paper} from '@material-ui/core';
import '../Achievement/achievements.css';
class Achievements extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            orange_cap:'',
            purple_cap:'',
            man_of_the_series:'',
        }

    }
    render()
    {
        return(
            <div className="achievements">
                <b className="season">Season's Achiever's</b>
            <Grid>
                <Grid item xs={4}>
                <Paper className="orange-cap">
                 <b className="orange">Orange-Cap</b>
                 <br></br>
                 <br></br>
                    <span className="o-cap">{this.props.orange_cap}</span>
                </Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className="purple-cap">
                 <b className="purple">Purple-Cap</b>
                 <br></br>
                 <br></br>
                    <span className="p-cap">{this.props.purple_cap}</span>
                </Paper>
                </Grid>
                <Grid item xs={4}>
                <Paper className="man-of-the-series">
                 <b className="man">Man of the series</b>
                 <br></br>
                 <br></br>
                    <span className="series">{this.props.man_of_the_series}</span>
                </Paper>
                </Grid>
            </Grid>
            </div>
        );
    }
}
export default Achievements;