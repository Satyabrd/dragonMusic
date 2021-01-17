import React,{Component} from 'react';
import axios from 'axios';
import './songsList.css';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import MaterialTable from "material-table";
import { DataGrid } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
//import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import apiConfigs from '../restApis/apiList'
import $ from 'jquery';
import AudioPlayer from "react-h5-audio-player";
import { blue } from '@material-ui/core/colors';



class SongsList extends Component{
    componentWillMount(){
        this.setState({
            songs_list : [],
            rowList : [],
            showTable : false,
            showAddToPlaylist : false,
            modalOpen: false
        })
    }
    async componentDidMount(){
        var response,rowList = await this.getSongsList();
        console.log("response2 is::")
        console.log(response)
        console.log("rowList2 is::");
        console.log(rowList)
        if(this.props.showPlaylist){
            this.setState({
                ...this.state,
                songs_list : rowList,
                showTable: true,
                showAddToPlaylist: true,
                rowList: rowList
            });
        }else{
            this.setState({
                ...this.state,
                songs_list : rowList,
                showTable: true,
                rowList : rowList
            });
        }
    }

    getSongsList = async ()=>{
        var response,rowList = await axios.get(apiConfigs.getMusicTracks.url, {
            headers: {
                "x-rapidapi-key": "a014d49485msh878bb65b238d18ap158704jsnd8edc9264167",
                "x-rapidapi-host": "shazam.p.rapidapi.com",
                "useQueryString": true
            }
        }).then(response => {
            var count = 0
            var valList = []
            response.data.tracks.map(track=>{
                count = count + 1;
                track.id = count
                track.uri = track.hub.actions[1].uri
                valList.push({
                    id : track.id,
                    images : track.images,
                    uri : track.uri,
                    title : track.title,
                    subtitle: track.subtitle
                })
            })
            console.log("valList is::");
            console.log(valList)
            return response.data.tracks,valList
        })
        .catch(response => {
            return response.data.tracks
        });
        console.log("response is::")
        console.log(response);
        return response,rowList
    }

    handleOpen = () => {
        this.setState({
            ...this.state,
            modalOpen: true,
            showAddToPlaylist : false
        });
    };
    
    handleClose = () => {
        $(".satya_modal").css("dispaly","none")
        this.setState({
            ...this.state,
            modalOpen: false,
            showAddToPlaylist : true,
        });
    };

    addToPlayList = () => {
        var selectedRows = []
        var allCheckBoxes = document.querySelectorAll("input[type='checkbox']")
        for(let i=0;i<allCheckBoxes.length;i++){
            if(i-1 >= 0){
                if(allCheckBoxes[i].checked){
                    selectedRows.push(this.state.rowList[i]);
                }
            }
        }
        console.log("selected rows are::");
        console.log(selectedRows)
        return new Promise(async (resolve,reject)=>{
            axios
                .post("http://localhost:5000/api/playlists",selectedRows)
                .then(response => {
                    console.log("response is:::",response);
                    resolve(response);
            }).catch(err => {
                    reject(err)
            });
        });
    }
    addDataToDB = async () => {
        //document.querySelector("#modal_button").innerText = "Adding..."
        //document.getElementById("modal_err_msg").style.display = "none"
        const resp = await this.addToPlayList();
        console.log("posted data is::");
        console.log(resp)
        this.setState({
            ...this.state,
            showTable: resp,
        });
        this.handleClose();
    }
    onRowSelected = () => {
        
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
                title: "Image",
                field: "images.background",
                render: (data)=>{
                    return <div>
                               <img src={data.images.background} width="50" height="70"></img>
                               <span className="songTitle">{data.title}</span>
                            </div>
                }
              },
            {
              title: "Name",
              field: "title",
            },
            {
              title: "Artist",
              field: "subtitle",
            },
            {
                title: "Play",
                render: (data)=>{
                    return  <audio controls>
                                <source src={data.uri} />
                            </audio>
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
        /*const rows = data.reduce((result, filter) => {
            result[filter.id] = filter.value;
            result[filter.images] = filter.value;
            result[filter.title] = filter.value;
            return result;
        },{});*/
        const tableConfig = {
            title:"Student Marksheet Table",
            data,
            rows : data,
            columns,
            //actions,
            options,
            //icons: {...tableIcons},
            //selection: true
        }
        return tableConfig;
    }

    getTablePropsV2=()=>{
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
                title: "Image",
                field: "images.background",
                render: (data)=>{
                    return <div>
                               <img src={data.images.background} width="50" height="70"></img>
                               <span className="songTitle">{data.title}</span>
                            </div>
                }
              },
            {
              title: "Name",
              field: "title",
            },
            {
              title: "Artist",
              field: "subtitle",
            },
            {
                title: "Play",
                render: (data)=>{
                    return  <audio controls>
                                <source src={data.uri} />
                            </audio>
                }
            },
            {
                render: (data)=>{
                    return  <Button className="primary_button" onClick={this.handleOpen} variant="contained" color="primary">Add To Playlist</Button>
                }
            }
        ];
        const options = { 
            search: true, 
            paging: true, 
            filtering: true, 
            exportButton: true ,
            rowLength: 6,
            maxColumns: 4,
            headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF'
            },
            rowStyle: {
                backgroundColor: '#EEE',
            }
        }

        const tableConfig = {
            title:"Welcome to DragonMusic",
            data,
            rows : data,
            columns,
            rowLength: 6,
            maxColumns: 4,
            //actions,
            options,
            //icons: {...tableIcons},
            //selection: true
        }
        return tableConfig;
    }
    
    render(){
        var tableProps = this.getTableProps();
        if(this.state.showAddToPlaylist){
            tableProps = this.getTablePropsV2()
        }
        const rows =this.state.rowList
        const columns = [
            {
                title: "Image",
                field: "images.background",
                flex: 1,
                render: (data)=>{
                    return <div>
                               <img src={data.images.background} width="50" height="70"></img>
                               <span className="songTitle">{data.title}</span>
                            </div>
                }
              },
            {
              title: "Name",
              field: "title",
              flex: 1,
            },
            {
              title: "Artist",
              field: "subtitle",
              flex: 1,
            },
            {
                title: "Play",
                flex: 1,
                render: (data)=>{
                    return  <audio controls>
                                <source src={data.uri} />
                            </audio>
                }
            }
        ];
        /*const { datav2 } = useDemoData({
            dataSet: 'Commodity',
            rowLength: 6,
            maxColumns: 4,
          });*/
        console.log("tableProps is::")
        console.log(tableProps)
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
        console.log("props is::")
        console.log(this.props)
        return(
            <div>
                <Container maxWidth="lg">
                    {this.state.showTable &&(
                        <div className="satya_table" style={{ height: 400, width: '100%' }}>
                            <MaterialTable icons={tableIcons} {...tableProps} pageSize={5} checkboxSelection/>
                        </div>
                    )}
                    {!this.state.showTable &&(
                        <div className="spinnerStyle">
                            <CircularProgress />
                        </div>
                    )}
                    {this.state.modalOpen && (
                        <Modal
                        className="modal_styles"
                        open={this.handleOpen}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                      ><div>
                            <div style={{ height: 400, width: '100%', backgroundColor: "whiteSmoke" }}>
                                <DataGrid rows={rows} columns={columns} onRowSelction={this.onRowSelected} pageSize={10} checkboxSelection/>
                            </div>
                            
                            <Button className="primary_button modal_footer_btn" onClick={this.addToPlayList} variant="contained" color="primary">Add</Button>
                            
                      </div>
                      </Modal>
                    )}
                </Container>
            </div>
        )
    }
}

export default SongsList;