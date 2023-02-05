import styled from "styled-components";

export const Container = styled.div`
    background-color: ${({ theme } ) => theme.COLORS.backgroundHeader};
    display: flex;
    justify-content: center;
    height: 30rem;

    > div{
        padding-top: 5rem;
        display: flex;
        justify-content: center;
        align-items: start;
        gap: 2rem;

        h1{
            color: ${({ theme } ) => theme.COLORS.textWhite};
            font-size: 3.5rem;
        }

        img{
            padding-top: 1.4rem;
        }
    }
    
`;