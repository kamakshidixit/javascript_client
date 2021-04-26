/* eslint-disable */

 import React from 'react';
 import { makeStyles } from '@material-ui/core/styles';
 import AppBar from '@material-ui/core/AppBar';
 import Toolbar from '@material-ui/core/Toolbar';
 import Typography from '@material-ui/core/Typography';
 import Button from '@material-ui/core/Button';
 import IconButton from '@material-ui/core/IconButton';
 import MenuIcon from '@material-ui/icons/Menu';
 import jwt_decode from 'jwt-decode';

 const useStyles = makeStyles((theme) => ({
   root: {
     flexGrow: 1,
   },
   menuButton: {
     marginRight: theme.spacing(2),
   },
   title: {
     flexGrow: 1,
   },
 }));

 export default function home() {
   const classes = useStyles();

   const a = localStorage.getItem('token');
   if(a) {
     var decoded = jwt_decode(a);
   }

  return (
     <div className={classes.root}>
       <AppBar position="static">
         <Toolbar>
       <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
             <MenuIcon />
           </IconButton>
           <Typography variant="h6" className={classes.title}>
             Trainee Details
           </Typography>
           <Button
             color="inherit"
             href="/login"
             onClick={() => { localStorage.clear('duplicateToken'); }}
           >
             LOGOUT
           </Button>
         </Toolbar>
       </AppBar>
       <br></br>
       <br></br>
       <br></br>
       <div>
   <pre><h3 style ={{marginLeft: '500px'}}>Name:   {decoded.name}</h3></pre>
         <br></br>
   <pre><h3 style ={{marginLeft: '500px'}}>Email:  {decoded.email}</h3></pre>
         <br></br>
   <pre><h3 style ={{marginLeft: '500px'}}>Role:   {decoded.role}</h3></pre>
   <br></br>
   <pre><h3 style ={{marginLeft: '500px'}}>OriginalId:   {decoded.originalId}</h3></pre>
       </div>
     </div>
   );
 }
