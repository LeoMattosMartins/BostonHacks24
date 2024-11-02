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

    return(
        <Page>
            <h1>Welcome to Space [Your Name]</h1>

            <h3>What exercise would you like to do?</h3>
            <select name="exercises" id="exercises">
                <option value="exercise1">exercise1</option>
                <option value="exercise2">exercise2</option>
                <option value="exercise3">exercise3</option>
                <option value="exercise4">exercise4</option>
            </select>


        </Page>
    );
}