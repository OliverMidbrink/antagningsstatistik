import logo from './logo.svg';
import './App.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import React from "react";
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
import MyLineChart from './components/MyLineChart';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {teal, } from '@material-ui/core/colors/blue';
import CloseIcon from '@material-ui/icons/Close';


const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#00b2b8",
    },
  },
});


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#00686e",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
    paddingLeft:"1.34em",
    paddingRight:"0.2em",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#f0f0f0",
    },
  },
}))(TableRow);

const useStyles2 = theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    minHeight: "100vh",
    display: "flex",
    flexFlow: "column",
    height: "100%",
  },  
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    maxWidth: 600,
    marginRight: "auto",
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
    padding:0,
    maxWidth: "100%",
    overflow: "auto",
    maxHeight: "80%",
    outline: 'none',
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
      userHP: "",
      userBI: "", 
      userBII: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleTextFieldChangeHP = this.handleTextFieldChangeHP.bind(this);
    this.handleTextFieldChangeBI = this.handleTextFieldChangeBI.bind(this);
    this.handleTextFieldChangeBII = this.handleTextFieldChangeBII.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //alert('A name was submitted: ' + queryString);

    var queryURL = new URL('http://68.183.10.8:5002/query');
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
    var queryURL = new URL('http://68.183.10.8:5002/program_data');
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
        const programData = [[rawData.comment.length > 0? (rawData.comment):""], rawData.HT.length > 0? rawData.HT:["Ingen statistik"], rawData.VT.length > 0? rawData.VT:["Ingen statistik"]];

        that.setState({programData: programData, kurskod: kurskod, program: program, school: school, loading: false});

        console.log(programData);
        setTimeout(() => {  console.log(that.state.programData); }, 1000);
      }).catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    }));

  }

  handleTextFieldChangeHP(event) {
    this.setState({"userHP": event.target.value});
  }

  handleTextFieldChangeBI(event) {
    this.setState({"userBI": event.target.value});
  }

  handleTextFieldChangeBII(event) {
    this.setState({"userBII": event.target.value});
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
      <ThemeProvider theme={myTheme}>
        <div className={classes.root}>
          <div style={{padding:"1em", backgroundColor: "#00686e", paddingBottom:0,}} elevation={2}>   
          <Container id="header">
              <header className="App-header">                  
                <h3 style={{textAlign:"left", margin:0, padding:0, color: "white",}}>Se dina chanser att bli antagen!</h3>                
                <h5 style={{textAlign:"left", margin:0, padding:0, paddingTop:"0.5em", color: "#f5f5f5", fontWeight: "normal",}}>
                  Sök ett program, klicka och se dina chanser. </h5>
              </header>

            <form onSubmit={this.handleSubmit}>
              <Paper className={classes.searchBar} style={{textAlign:"left", marginTop: "1em",}} elevation={2}>
                  <InputBase
                    className={classes.input}
                    placeholder="T.ex. Läkarprogrammet Karolinska"
                    
                    name="queryString"
                    onChange={this.handleSearchBarChange}
                    inputProps={{ 'aria-label': 'sök efter utbildningar' }}
                  />
                  <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
              </Paper>
              <Button type="submit" variant="contained" style={{backgroundColor:"#00796e", color:"white", marginTop: "1em",}}>
                <b>Sök</b>
              </Button>
            </form>
    
          </Container>
          </div>
          
          <div id="resultsBox" style={{ flex: "1 1 auto", marginBottom: "3em"}}>
            <Container>
            {this.state.queryResults.length > 0 &&
            <div>
              <h2>Sökresultat</h2>
                <TableContainer className={classes.table} display="false">
                  <Table size="small" aria-label="customized table">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>Program</StyledTableCell>
                        <StyledTableCell align="left">Skola</StyledTableCell>
                        <StyledTableCell align="left">Termin</StyledTableCell>
                        <StyledTableCell align="left">Program/Kurs</StyledTableCell>
                        <StyledTableCell align="left">Kod</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.queryResults.map((item, index) => (
                        <StyledTableRow className="TableRowHover" key={index} onClick={() => this.handleSelection(item[3], item[2], item[4])}>
                          <StyledTableCell component="th" scope="row">
                            {item[2]}
                          </StyledTableCell>
                          <StyledTableCell align="left">{item[4]}</StyledTableCell>
                          <StyledTableCell align="left">{item[0]}</StyledTableCell>
                          <StyledTableCell align="left">{item[1]}</StyledTableCell>
                          <StyledTableCell align="left">{item[3]}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            }
            </Container>
          </div>
          
    
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
              <div style={{maxHeight: "100%", overflow: "auto",}}>
                <LoadingIndicator/>
              <Paper square className={classes.paper}>
              <IconButton aria-label="delete" style={{position:"absolute", right:"5px", top:"5px", background:"white",}} onClick={this.handleModalClose}>
                <CloseIcon />
              </IconButton>
                {!this.state.loading &&
                <div>
                  <Container>
                    <h2 style={{marginBottom:"0.1em"}}>Statistik</h2>
                    <h5 style={{marginTop:"0.1em", color:"gray",}}>{this.state.program} vid {this.state.school}</h5>
                    <Divider />
                    <h3 style={{marginBottom:"0.2em"}}>Senaste antagningsgränserna</h3>
                    <h5 style={{marginTop:"0.1em", color:"gray",}}>Höstterminen urval 2</h5>
                    {
                        this.state.programData.slice(1, 2).map((item, index) => {
                          return (
                            <div>
                              {
                                item.slice(0, 1).map(row => {
                                  if(row.length < 6) {
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
                      <p>Skrolla om du vill se äldre antagningsstatistik</p>
                    <Divider />
                    <h4 style={{marginBottom:"0.2em"}}>Fyll i rutorna för att se dina chanser</h4>
                    <i style={{marginTop:"0.1em",}}>{this.state.programData[0]}</i>
                  </Container>
                  
                  
                  <div style={{display: "flex", flexWrap: "wrap", paddingTop:"2em",paddingBottom:"1em",}}>
                    <div style={{border:"1px solid gray", margin:"0.5em", alignItems: "center", display: "flex", justifyContent: "center", flexWrap:"wrap", maxWidth:"400px",}}>
                      <TextField label="Snittbetyg från gymnasiet" style={{margin:"1em",}} variant="outlined"
                      placeholder="T.ex. 15,20" className={classes.textField} value={this.state.userBI} onChange={this.handleTextFieldChangeBI} />

                      <MyLineChart programData={this.state.programData} displayFilter={["BI"]} width={300}
                      userBI={this.state.userBI}/>
                    </div>
                    
                    <div style={{border:"1px solid gray", margin:"0.5em", alignItems: "center", display: "flex", justifyContent: "center", flexWrap:"wrap", maxWidth:"400px",}}>
                      <TextField label="Ditt HP" style={{margin:"1em",}} placeholder="T.ex. 1,2" variant="outlined"
                      className={classes.textField} name="userHP" value={this.state.userHP} onChange={this.handleTextFieldChangeHP} />

                      <MyLineChart programData={this.state.programData} displayFilter={["HP"]} 
                      userHP={this.state.userHP} width={300}/>
                    </div>

                    <div style={{border:"1px solid gray", margin:"0.5em", alignItems: "center", display: "flex", justifyContent: "center", flexWrap:"wrap", maxWidth:"400px",}}>
                      <TextField label="Betyg efter komvux" style={{margin:"1em",}} variant="outlined"
                      placeholder="T.ex. 17,1" className={classes.textField} value={this.state.userBII} onChange={this.handleTextFieldChangeBII} />
                      
                      <MyLineChart programData={this.state.programData} displayFilter={["BII"]} width={300}
                      userBII={this.state.userBII}/>
                    </div>
                  </div>
                  
                  
                  <Container>
                    <Divider />
                    <h4>Förklaring av kvoterna BI, BII och HP</h4>
                    <p>Kvoten BI är till för dig som söker med dina gymnasiebetyg, BII för dig som har 
                      kompletterat ditt gymnasiebetyg och HP är för de som har gjort högskoleprovet. 
                      (PS. fler betygskvoter finns men dessa är inte vanliga bland dagens gymnasieelever). 
                      Siffrorna nedan visar statistik för Urval 2 visas. </p>
                    
                    <div>
                      <Divider />
                      <h3 style={{marginBottom:0,}}>Tabelldata</h3>
                      {
                        this.state.programData.slice(1, 3).map((item, index) => {
                          return (
                            <div>
                              <h4>{["HT", "VT"][index]}</h4>
                              {
                                item.map(row => {
                                  if(row.length < 6) {
                                    return(<p><b>{row[0]}</b>: &nbsp;&nbsp;BI {row[2]} &nbsp;&nbsp;&nbsp; BII {row[3]} &nbsp;&nbsp;&nbsp; HP {row[4]}</p>)
                                  } else {
                                    return(<p>{row}</p>)
                                  }
                                })
                              }
                              <br></br>
                            </div>
                          )
                        })
                      }
                    </div>
                    </Container>
                      <Divider />  
                    <Container>
                    <p>Tänk på att detta bara är en indikation. Gör ditt bästa för att höja betygen och 
                      maximera dina chanser!</p>
                  </Container>
                  </div>
                }
              </Paper>
              </div>
            </Fade>
          </Modal>
        
          <footer style={{color: "#ededed", backgroundColor: "#00686e", alignItems: "center", display: "flex", justifyContent: "center", padding: "0.3em", paddingBottom: "0.5em",}}>
            <p style={{padding: 0, margin:0}}>&copy; {new Date().getFullYear()} minachanser.se</p>
          </footer>
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles2)(App);
/*export default withStyles(useStyles2)(MyLineChart);*/