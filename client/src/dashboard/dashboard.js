import React,{Component} from 'react';
import axios from 'axios';
import './dashboard.css';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import MaterialTable from "material-table";
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AllSongs from '../all_songs_page/allSongs.js'
import PlaylistPage from '../playlistPage/playlistPage.js'
import $ from 'jquery';


class Dashboard extends Component{
    componentWillMount(){
        this.setState({
            showAllSongs: true,
            showPlaylists: false
        })
    }
    
    render(){
        return(
            <div>
                <Container maxWidth="lg">
                    <div className="primary_button_group">
                        <Button className="primary_button" onClick={() => { this.setState({showAllSongs: true,showPlaylists: false}) }} variant="contained" color="primary">All Songs</Button>
                        <Button className="primary_button" onClick={() => { this.setState({showAllSongs: false,showPlaylists: true}) }} variant="contained" color="primary">Playlists</Button>
                    </div>
                    <div>
                        {this.state.showAllSongs && !this.state.showPlaylists &&
                            (<div>
                                <div className="search_bar_div"></div>
                                <AllSongs/>
                            </div>)}
                        {this.state.showPlaylists && !this.state.showAllSongs &&
                            (<PlaylistPage/>)}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Dashboard;