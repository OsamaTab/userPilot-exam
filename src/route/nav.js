import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PieChartIcon from '@material-ui/icons/PieChart';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import PersonIcon from '@material-ui/icons/Person';
import Icon from '../assets/icon.png'

const drawerWidth = 255;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    position:'fixed',
    marginTop:5,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#263740",
    color: '#A4A6B3'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    minHeight:'100vh'
  },
  icon:{
    color: "#9FA2B4",
  },
  item:{
    marginBottom:10,
  }
}));

export default function Nav(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.appBar}>
        <Toolbar >
          <Typography variant="h5" noWrap>
           Users
          </Typography>
          <Typography variant="body1" noWrap style={{right:30,position:'absolute',display:'flex',alignItems:'center'}}>Jones Ferdinond <Avatar src={'https://randomuser.me/api/portraits/men/36.jpg'} style={{ height: 44, width: 44,marginLeft:5 }} /></Typography>
        </Toolbar>
      </div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <img src={Icon} width={'60%'} style={{marginTop:30,marginLeft:40,marginBottom:30}}/>
        <List>
          <ListItem button className={classes.item}>
            <ListItemIcon className={classes.icon}><PieChartIcon /></ListItemIcon>
            <ListItemText primary={'OverView'} />
          </ListItem>
          <ListItem button className={classes.item}>
            <ListItemIcon className={classes.icon}><ConfirmationNumberIcon /></ListItemIcon>
            <ListItemText primary={'Tikets'} />
          </ListItem> 
          <ListItem button className={classes.item} >
            <ListItemIcon className={classes.icon}><EmojiObjectsIcon /></ListItemIcon>
            <ListItemText primary={'Ideas'} />
          </ListItem > 
          <ListItem button className={classes.item} style={{backgroundColor:'#9FA2B433' }}>
            <ListItemIcon className={classes.icon}><PersonIcon /></ListItemIcon>
            <ListItemText primary={'Users'}/>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content} >
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}