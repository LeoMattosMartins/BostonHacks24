import styled from "styled-components";


const Page = styled.div`
    display: flex;
    flex-direction: column;
    background-color: gray;
    align-items: center;
`
const Details = styled.div`

`

export default function Profile(){
    const item = localStorage.getItem('username')
    return(
        <Page>
            <h1>Welcome to the Space Race {item}!</h1>

            <h3>How many reps do you want to do?</h3>
            <input type="number"></input>

        </Page>
    );
}