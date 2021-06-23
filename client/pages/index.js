import Head from 'next/head'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CandidatesDetails from '../components/CandidatesDetails';


export default function Home() {

    const [data, setDate] = useState([]);




    
    useEffect(async () => {

        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("http://localhost:5000/getData", requestOptions).then(fetchData => {
            
            fetchData.json().then(parsedJSON => {
                setDate(parsedJSON);
            })

        }, err => {
            console.error(err);
        });

    }, [])

    const Container = styled.div`
    width: 80%;
    padding: 20px 0;
    background-color: #8893b3;
    margin: 20px auto;
    color: white;
    max-height: calc(100vh - 50px);
    overflow: auto;
    transition: 0.2s background-color ease-in-out;
    display: flex;
    justify-content: center;
    `;
    

    return (
        <Container>
            <CandidatesDetails candidates={data}></CandidatesDetails>
        </Container>
    )
}
