import styled from '@emotion/styled';

const Root = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${props => props.theme.root.background};
    color: ${props => props.theme.colors.text};
    ${props => props.theme.root.extend.trim()};
`;

export default Root;
