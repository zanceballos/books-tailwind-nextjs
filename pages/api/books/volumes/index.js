import axios from "axios"

export default async function handler(req, res){
    const data = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&orderBy=newest&startIndex=0&maxResults=6&key=AIzaSyC-123qM3DWjNCd22SXuyaqTXwVW3uswkY&country=SG')
    const json = await data.json()
    res.status(200).json(json)
    

    

}

//https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&orderBy=newest&startIndex=0&maxResults=6&key=AIzaSyC-123qM3DWjNCd22SXuyaqTXwVW3uswkY