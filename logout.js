import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn:false
        }
        }
loggedIn = () => {
this.setState({loggedIn:true});
}
callAxios = (payload, callback) => {
     var loggedIn = false;
     var apiBaseUrl = "http://localhost:8080/auth/";
     axios.post(apiBaseUrl+'login', payload)
     .then(function (response) {
     console.log(response);
     if(response.status === 200){
         if(response.data === false){
              console.log("Username does not exists");
              alert("Username does not exist");
         }
         else{
            document.getElementById('loginform').style.visibility = 'hidden'
            document.getElementById('logoutform').style.visibility = 'visible'
            console.log("Login successful");
            console.log(response.data);
            window.localStorage.setItem("token", response.data);
            console.log(window.localStorage);
            loggedIn = true;
            callback();
         }
     //var uploadScreen=[];
     //uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
     //self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
     }
     else if(response.status === 204){
     console.log("Username password do not match");
     alert("username password do not match")
     }
     else{
     console.log("Username does not exists");
     alert("Username does not exist");
     }
     })
     .catch(function (error) {
     console.log(error);
     });
     }
handleClick = (event) => {
 if(this.state.username === "" || this.state.password === "") {
      alert("Please fill all the fields");
 }
 else{

     var payload={
     "userName":this.state.username,
     "password":this.state.password
     }
     console.log(payload);
    var loggedIn = this.callAxios(payload, () => {
        this.setState({loggedIn: true});
    }
    );
console.log(loggedIn);
      }
 }
    render(){
      const { classes } = this.props;
      return (
        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
             <div id="loginform">
             <Paper className={classes.paper}>
             <Avatar className={classes.avatar}>
             <LockIcon />
             </Avatar>
              <Typography variant="headline">Login</Typography>

              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">User Name</InputLabel>
                  <Input id="username" name="username" autoComplete="username" value={this.state.username} onChange={(event) => this.setState({username: event.target.value})} autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange = {(event) => this.setState({password:event.target.value})}  />
                </FormControl>
                <Button
                  fullWidth
                  variant="raised"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => this.handleClick(event)}
                >
                  Login
                </Button>
              </form>
            </Paper>
            </div>
             <div id="logoutform">
         {this.state.loggedIn && <Paper>{<div align="center"><br/><h2>WELCOME</h2></div>}
         <Button
                           fullWidth
                           variant="raised"
                           color="primary"
                           className={classes.submit}
                           onClick={(event) => this.logOut(event)}
                         >
                           Logout
         </Button>
         </Paper>}
         </div>
         </main>
        </React.Fragment>
      );
      }

    logOut = (event) => {
    //backende istek gönder oradan da silinsin token
    var token= window.localStorage.getItem("token");
    var apiBaseUrl = "http://localhost:8080/auth/";
         var ax = axios.create({
                              headers: {
                                AUTHORIZATION: {
                                  toString () {
                                    return `Bearer ${token}`
                                  }
                                }
                              }
                            });
         ax.post(apiBaseUrl+'logout')
          .then(function (response) {
              console.log(response);
               if(response.status === 200 ) {
                 if(response.data === false){
                  console.log("User does not exists"); }
                  else{
                 console.log("logged out in back-end successfully");
                 }
                 }
                 })
                      .catch(function (error) {
                      console.log(error);
                      });
    window.localStorage.removeItem("token");
    console.log("Logged out in front-end successfully");
    document.getElementById('logoutform').style.visibility = 'hidden'
    document.getElementById('loginform').style.visibility = 'visible'
      }
      }
SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
