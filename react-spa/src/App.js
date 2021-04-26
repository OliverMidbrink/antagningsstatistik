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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Loader from "react-loader-spinner";
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";

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

const useStyles2 = theme => ({
  root: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
  },  
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    maxWidth: 600,
    marginRight: "auto",
    marginTop:"2em",
    marginBottom:"2em",
  },
  input: {
    marginLeft:0,
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2, 4, 3),
    maxWidth: "90%",
    overflow: "auto",
    maxHeight: "90%",
  },
});

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && 
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>
};


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queryString: '',
      queryResults: [],
      kurskod: '',
      open: false,
      programData: [],
      program: '',
      school: '',
      loading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //alert('A name was submitted: ' + queryString);

    var queryURL = new URL('http://127.0.0.1:5002/query');
    queryURL.searchParams.append('q', this.state.queryString);

    var that = this;

    fetch(queryURL)
    .then(response => response.json())
    .then(function(data) {
      const results = JSON.parse(data).results;
      console.log(results);

      that.setState({queryResults: results});
    }).catch(function(err) {
      console.log('Fetch problem: ' + err.message);
    });
  }

  handleSelection(kurskod, program, school) {
    var queryURL = new URL('http://127.0.0.1:5002/program_data');
    queryURL.searchParams.append('q', kurskod);
    queryURL.searchParams.append('school', school);
    queryURL.searchParams.append('program', program);
    console.log(queryURL);

    var that = this;
    this.setState({open: true, loading: true});

    trackPromise(
      fetch(queryURL)
      .then(response => response.json())
      .then(function(data) {
        const rawData = JSON.parse(data);
        
        const programData = [[rawData.comment.length > 0? rawData.comment:"Ingen kommentar"], rawData.HT.length > 0? rawData.HT:["Ingen statistik"], rawData.VT.length > 0? rawData.VT:["Ingen statistik"]];

        that.setState({programData: programData, kurskod: kurskod, program: program, school: school, loading: false});

        console.log(programData);
        setTimeout(() => {  console.log(that.state.programData); }, 1000);
      }).catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    }));

  }

  handleSearchBarChange(event) {
    this.setState({queryString: event.target.value});
  }

  handleModalClose() {
    this.setState({open: false});
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Container style={{padding:"2em", paddingTop:"2em",}}>
          <header className="App-header">
            <h3 style={{textAlign:"left", margin:0, padding:0}}>Se dina chanser att bli antagen!</h3>
            <h6 style={{textAlign:"left", margin:0, padding:0, paddingTop:"0.5em", color: "gray",}}>
              Sök efter ett program eller en kurs. Klicka sedan på programmet för att se dina chanser att bli antagen. 
              Tips: skriv utbildningens namn och sedan skolan i sökrutan för ännu bättre sökresultat. </h6>
          </header>
          
          <form onSubmit={this.handleSubmit}>
          <Paper className={classes.searchBar} style={{textAlign:"left",}}>
              <InputBase
                className={classes.input}
                placeholder="Läkarprogrammet Karolinska"
                value={this.state.queryString}
                name="queryString"
                onChange={this.handleSearchBarChange}
                inputProps={{ 'aria-label': 'sök efter utbildningar' }}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
          </Paper>
          </form>
  
        </Container>
        
        {this.state.queryResults.length > 0 &&
          <TableContainer component={Paper} className={classes.table} display="false">
            <Table size="small" aria-label="customized table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Program</StyledTableCell>
                  <StyledTableCell align="left">Skola</StyledTableCell>
                  <StyledTableCell align="right">Termin</StyledTableCell>
                  <StyledTableCell align="right">Program/Kurs</StyledTableCell>
                  <StyledTableCell align="right">Kod</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {this.state.queryResults.map((item, index) => (
                  <StyledTableRow key={index} onClick={() => this.handleSelection(item[3], item[2], item[4])}>
                    <StyledTableCell component="th" scope="row">
                      {item[2]}
                    </StyledTableCell>
                    <StyledTableCell align="left">{item[4]}</StyledTableCell>
                    <StyledTableCell align="right">{item[0]}</StyledTableCell>
                    <StyledTableCell align="right">{item[1]}</StyledTableCell>
                    <StyledTableCell align="right">{item[3]}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
        
  
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            
            <Paper className={classes.paper}>
              <LoadingIndicator/>

              {!this.state.loading &&
                <Container>
                  <h2 style={{marginBottom:"0.1em"}}>Statistik</h2>
                  <h5 style={{marginTop:"0.1em", color:"gray",}}>{this.state.program} vid {this.state.school}</h5>
                  


                  <div>
                    {
                      this.state.programData.map((item, index) => {
                        return (
                          <div>
                            <br></br>
                            <h4>{["Kommentar", "HT", "VT"][index]}</h4>
                            {
                              item.map(row => {
                                if(row !== "Ingen statistik" && row !== "Ingen kommentar") {
                                  return(<p><b>{row[0]}</b>: &nbsp;&nbsp;BI {row[2]} &nbsp;&nbsp;&nbsp; BII {row[3]} &nbsp;&nbsp;&nbsp; HP {row[4]}</p>)
                                } else {
                                  return(<p>{row}</p>)
                                }
                              })
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                </Container>
              }
            </Paper>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default withStyles(useStyles2)(App);
