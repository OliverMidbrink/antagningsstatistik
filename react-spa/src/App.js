import logo from './logo.svg';
import './App.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#282c34",
    //height: "100vh",
  },  
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    maxWidth: 600,
    margin: "auto",
    marginTop:"2em",
    marginBottom:"2em",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    align: "right",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  table: {
    width: "100%",
    maxWidth: "1500px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
    paddingLeft:"0.2em",
    paddingRight:"0.2em",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function App() {
  const classes = useStyles();

  const [allValues, setAllValues] = React.useState({
    queryString: '',
    queryResults: []
  });

  const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //alert('A name was submitted: ' + queryString);

    var queryURL = new URL('http://127.0.0.1:5002/query');
    queryURL.searchParams.append('q', allValues.queryString);

    fetch(queryURL)
    .then(response => response.json())
    .then(function(data) {
      const results = JSON.parse(data).queryResults;
      setAllValues({...allValues, ["queryResults"]: results})
      console.log(results);
      console.log(allValues.queryResults[0].program);
    }).catch(function(err) {
      console.log('Fetch problem: ' + err.message);
    });
  };

  return (
    <div className={classes.root}>
      <Container>
        <header className="App-header">
          <h3 style={{textAlign:"center", margin:0, padding:"1em",}}>
            Se dina chanser att komma in!
          </h3>
        </header>
        
        <form onSubmit={handleSubmit}>
        <Paper className={classes.searchBar}>
          
            <InputBase
              className={classes.input}
              placeholder="Läkarprogrammet Karolinska"
              value={allValues.queryString}
              name="queryString"
              onChange={changeHandler}
              inputProps={{ 'aria-label': 'sök efter utbildningar' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
        </Paper>
        </form>
      </Container>
      


      <TableContainer component={Paper} className={classes.table}>
        <Table size="small" aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Program</StyledTableCell>
              <StyledTableCell align="left">Skola</StyledTableCell>
              <StyledTableCell align="right">BI</StyledTableCell>
              <StyledTableCell align="right">BII</StyledTableCell>
              <StyledTableCell align="right">HP</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allValues.queryResults.map((item, index) => (
              <StyledTableRow key={item.name}>
                <StyledTableCell component="th" scope="row">
                  {item.program}
                </StyledTableCell>
                <StyledTableCell align="left">{item.school}</StyledTableCell>
                <StyledTableCell align="right">{item.BI}</StyledTableCell>
                <StyledTableCell align="right">{item.BII}</StyledTableCell>
                <StyledTableCell align="right">{item.HP}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
