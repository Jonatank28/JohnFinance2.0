import styled from "styled-components";

export const Container = styled.div`
    >div{
        display: inline-flex;
        align-items: center;
        margin: 3rem 0 2rem;
        gap: .7rem;
        cursor: pointer;
            span{
                color: ${({ theme }) => theme.COLORS.textDecorationPositive};
                font-size: 1.5rem;
            }
    }

    > table{
        width: 100%;
        border-spacing: 0 0.9rem;
            th, td{
                font-size: 1.6rem;
                text-align: left;
            }

            th{
                color: ${({ theme }) => theme.COLORS.text};
                font-weight: 400;
                padding: 0.7rem 0.6rem;
                background-color: ${({ theme }) => theme.COLORS.textWhite};
                border-radius: 3px;
            }

            td{
                background-color: ${({ theme }) => theme.COLORS.textWhite};
                border-radius: 3px;
                padding: 0.6rem;
                color: ${({ theme }) => theme.COLORS.title};
            }

            td:nth-child(4){
                color: ${({ theme }) => theme.COLORS.text};
            }

            td:nth-child(5), td:nth-child(6){
                cursor: pointer;
            }
    }
    
    @media (max-width: 500px){
        tbody tr td{
            font-size: 1.2rem;
        }
    }
`;

