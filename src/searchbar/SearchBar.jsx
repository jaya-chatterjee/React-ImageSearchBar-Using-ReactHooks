import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import CloseIcon from '@material-ui/icons/Close';
import GridView from '../reactsearchbar/GridView'
import React, { useState, useEffect, useRef } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        left: '50%',
        marginLeft: '-200px',
        position: 'relative',
        borderRadius: '28px',
        marginTop: "4em",
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


export default function SearchBar() {
    const classes = useStyles();
    const initialState = {
        serchItem: ""
    }

    const initialState1 = []

    const [searchimage, setSearchImage] = useState(initialState)
    const [imageslist, setImagesList] = useState(initialState1)
    const [counter, setCounter] = useState(0)

    const globalSearch = e => {
        e.preventDefault()
        setCounter(counter + 1);
    }


    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            fetch(
                `https://api.unsplash.com/search/photos?page=1&query=${searchimage}&client_id=zk8fqRV854hxRcSCYVHcKb0rywVnyBbfJ-_EtDQQEwU`,
                {
                    method: "GET",
                    headers: new Headers({
                        Accept: "application/json"
                    })
                }
            )
                .then(res => res.json())
                .then(response => {
                    setImagesList(response.results);
                })
                .catch(error => console.log(error));
        }
    }, [counter]);
    return (
        <div style={{ overflow: "hidden" }}>
            <Paper component="form" className={classes.root} onSubmit={globalSearch} style={{ marginBottom: "1em" }}>
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    placeholder="Search Images"
                    className={classes.input}
                    inputProps={{ 'aria-label': 'search Images' }}
                    onChange={e => setSearchImage(e.target.value)}
                />
                <CloseIcon />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                    <SettingsVoiceIcon />
                </IconButton>
            </Paper>
            <div>
                <Grid container spacing={0}>
                    {imageslist.map(imageitems => (
                        <Grid item xs={12} sm={4} lg={2} xl={2} key={imageitems.id}>
                            <GridView
                                urls={imageitems.urls.regular} alt_description={imageitems.alt_description}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>


    );
}
