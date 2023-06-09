import styled from 'styled-components';

export const Container = styled.header`
    background: var(--blue);
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    padding: 2rem 1rem 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
        gap: .5rem;

        img {
            height: 2rem;
        }

        h1 {
            color: var(--white);
            font-size: 1.5rem;
        }
    }

    button {
        font-size: 1rem;
        color: var(--white);
        background: var(--blue-light);
        border: 0;
        padding: 0 2rem;
        border-radius: .25rem;
        height: 3rem;

        transition: filter .2s;

        &:hover {
            filter: brightness(.9);
        }
    }
`;