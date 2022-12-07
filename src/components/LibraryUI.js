import React, {useState } from 'react'
import {
    Button,
    Grid,
    makeStyles,
    TextField,
    
  } from "@material-ui/core";
  import axios from "axios";
import MagazineTable from './MagazineTable';
import BooksTable from './BooksTable';
import SearchIsbn from './SearchIsbn';

  const useStyles=makeStyles((theme)=>({
    mainContainer:{
        margin:"1%"
    }
  }))
function LibraryUI() {

    const [showMagazineTable,setShowMagazineTable]=useState(false)
    const [magazineData,setMagazineData]=useState([])

    const [showBooksTable,setShowBooksTable]=useState(false)
    const [booksData,setBooksData]=useState([])

    const [isbnNo,setIsbnNo]=useState('')
    const [showIsbnResult,setShowIsbnResult]=useState(false)
    const [isbnResult,setIsbnResult]=useState({})
    const classes=useStyles()

    async function listMagazine(){
        let response=()=>{
            return new Promise((resolve, reject) => {
                axios
                  .post('http://localhost:3000/library/readFiles', {
                    fileName:"magazines.csv"
                  })
                  .then((response) => {
                    resolve(response.data);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
        }
        await response()
        .then((res)=>{
            setShowMagazineTable(true)
            setMagazineData(res)
            setShowBooksTable(false)
            setBooksData([])
            setShowIsbnResult(false)
            setIsbnResult({})
            setIsbnNo('')
        }).catch((err)=>{
            setShowMagazineTable(false)
            setMagazineData([])
        }) 

    }

    async function listBooks(){
        let response=()=>{
            return new Promise((resolve, reject) => {
                axios
                  .post('http://localhost:3000/library/readFiles', {
                    fileName:"books.csv"
                  })
                  .then((response) => {
                    resolve(response.data);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
        }
        await response()
        .then((res)=>{
            setShowBooksTable(true)
            setBooksData(res)
            setShowMagazineTable(false)
            setMagazineData([])
            setShowIsbnResult(false)
            setIsbnResult({})
            setIsbnNo('')
        }).catch((err)=>{
            setShowBooksTable(false)
            setBooksData([])
        }) 

    }

    async function searchIsbn(e){
        e.preventDefault()
        let response=()=>{
            return new Promise((resolve, reject) => {
                axios
                  .post('http://localhost:3000/library/isbn', {
                    isbnNo
                  })
                  .then((response) => {
                    resolve(response.data);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              });
        }
        await response()
        .then((res)=>{
            setShowIsbnResult(true)
            setIsbnResult(res)
            setShowBooksTable(false)
            setBooksData([])
            setShowMagazineTable(false)
            setMagazineData([])
        }).catch((err)=>{
            setShowIsbnResult(false)
            setIsbnResult({})
        }) 
    }

    const hideMagazine=(e)=>{
        e.preventDefault()
        setShowMagazineTable(false)
        setMagazineData([])

    }

    const hideBooks=(e)=>{
        e.preventDefault()
        setShowBooksTable(false)
        setBooksData([])
    }

    const hideIsbn=(e)=>{
        e.preventDefault()
        setShowIsbnResult(false)
        setIsbnResult({})
        setIsbnNo('')
    }
  return (
    <React.Fragment>
        <Grid container className={classes.mainContainer} spacing={2}>
            <Grid item xs={4}>
                <Button
                variant='contained'
                onClick={listMagazine}
                >List Magazines</Button>
            </Grid>

            <Grid item xs={4}>
            <Button
                variant='contained'
                onClick={listBooks}
                >List Books</Button>
            </Grid>

            <Grid item xs={4}>
            <TextField variant="standard" 
            name="isbn"
            label="Search by isbno"
            value={isbnNo}
            onChange={e=>setIsbnNo(e.target.value)}
            />

                <Button
                variant='contained'
                onClick={searchIsbn}
                >Search</Button>
            </Grid>
        </Grid>
        {showMagazineTable ? <MagazineTable magazineData={magazineData} hideMagazine={hideMagazine}/> :null}
        {showBooksTable ? <BooksTable booksData={booksData} hideBooks={hideBooks}/> :null}

        {showIsbnResult ? <SearchIsbn isbnResult={isbnResult} hideIsbnResult={hideIsbn}/> :null}
    </React.Fragment>
  )
}

export default LibraryUI