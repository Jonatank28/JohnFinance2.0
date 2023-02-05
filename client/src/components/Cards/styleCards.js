import styled from "styled-components";

export const Container = styled.div`
    margin-top: -60px;
    display: flex;
    gap: 2rem;

    > div:nth-child(1), div:nth-child(2), div:nth-child(3) {
        background-color: ${({ theme}) => theme.COLORS.textWhite};
        padding: 2.7rem;
        border-radius: 5px;
        width: 100%;
        position: relative;
            h2{
                font-size: 2rem;
                margin-bottom: 2rem;
                font-weight: 400;
            }
            p{
                font-size: 2.6rem;
            }
            img{
                position: absolute;
                top: 20px;
                right: 20px;
            }
    }

    div:nth-child(2){
        h2{
            color: ${({ theme}) => theme.COLORS.text};
        }
    }

    div:nth-child(3){
        background-color: ${({ theme}) => theme.COLORS.textDecorationPositive};
        color: ${({ theme}) => theme.COLORS.textWhite};
    }

    /* Mobile */

    @media (max-width: 500px){
        flex-direction: column;
    }
`;