import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import React from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function App() {
  const classes = useStyles();

  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('A name was submitted: ' + value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Sök en utbildning och se dina chanser att komma in!</p>
        <form className={classes.root} onSubmit={handleSubmit}>
          <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Läkarprogrammet Karolinska"
              value={value}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'sök efter utbildningar' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
      </header>
    </div>
  );
}

export default App;
