import React,{Component} from 'react';
import axios from 'axios';
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
import SongsList from '../songsList/songsList';
import $ from 'jquery';


class PlaylistPage extends Component{
    componentWillMount(){
        this.setState({
            showBtn : true,
            showAllSongs: false
        })
    }

    createPlaylists = () => {
        this.setState({
            ...this.state,
            showBtn : false,
            showAllSongs: true
        });
    }

    getTableProps=()=>{
        const data = this.state.songs_list;
        console.log("data is::");
        console.log(data)
        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };
        const actions=[
            {
              icon: tableIcons.Delete,
              tooltip: 'Delete Row',
              onClick: (event, rowData) => {
                // Do save operation
              }
            }
        ]
        const columns = [
            {
              title: "Name",
              field: "playlist",
            },
            {
                title: "songNumbers",
                render: (data)=>{
                    return  data.songs.length
                }
            }
        ];
        const options = { 
            search: true, 
            paging: true, 
            filtering: true, 
            exportButton: true ,
            headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF'
            },
            rowStyle: {
                backgroundColor: '#EEE',
            }
        }
        const rows = data.reduce((result, filter) => {
            result[filter.id] = filter.value;
            result[filter.images] = filter.value;
            result[filter.title] = filter.value;
            return result;
        },{});
        const tableConfig = {
            title:"Student Marksheet Table",
            data,
            //rows,
            columns,
            //actions,
            options,
            //icons: {...tableIcons},
            //selection: true
        }
        return tableConfig;
    }
    
    render(){
        return(
            <div>
                <Container maxWidth="lg">
                    {this.state.showBtn &&(
                        <Button className="primary_button" onClick={this.createPlaylists} variant="contained" color="primary">Create Playlist</Button>
                    )}
                    {this.state.showAllSongs && (
                        <SongsList showPlaylist="true"/>
                    )}
                </Container>
            </div>
        )
    }
}

export default PlaylistPage;