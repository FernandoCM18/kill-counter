import styled from 'styled-components';


export const WrapperForm = styled.form`
  display: grid;
  gap: 10px;
  grid-template-rows: auto;
  align-items: center;
  margin-top: 100px;
  padding: 100px 20px;
  margin: 0px auto;
  max-width: 370px;
`;


export const Legend = styled.legend`
  font-size: 30px;
  font-weight: bold;
  color: ${({theme}) => theme.dark.text1};
`;

export const Label = styled.label`
  font-size: 18px;
  color: ${({theme}) => theme.dark.input.labelColor};
  text-align: left;
`

export const Input = styled.input`
  border: 1px solid ${({theme}) => theme.dark.border};
  border-radius: 15px;
  background-color: ${({theme}) => theme.dark.input.backgroundColor};
  height: 48px;
  color: ${({theme}) => theme.dark.text1};
  padding: 0px 10px;

  ::placeholder {
    color: ${({theme}) => theme.dark.input.labelColor};
  }
`;

export const Button = styled.button`
  background-color: ${({theme}) => theme.dark.primary};
  border-radius: 10px;
  border: none;
  color: ${({theme}) => theme.dark.text1};
  padding: 10px 20px;
  height: 48px;
  font-size: 18px;
  margin-top: 10px;
  width: 100%;
`;

export const ParragraphLink = styled.p`
  font-size: 18px;
  font-weight: 500;

  a {
    color: ${({theme}) => theme.dark.primary};
    text-decoration: none;
  }
`;

export const ErrorText = styled.p`
  color: red;

`;

export const Textarea =  styled.textarea`
  border: 1px solid ${({theme}) => theme.dark.border};
  border-radius: 15px;
  background-color: ${({theme}) => theme.dark.input.backgroundColor};
  height: 48px;
  color: ${({theme}) => theme.dark.text1};
  padding: 10px;

  ::placeholder {
    color: ${({theme}) => theme.dark.input.labelColor};
  }
`;