import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContextCustom } from '../context/theme/ThemeContextCustom';

export const ToggleSwitch = () => {
  const {toggleTheme, theme} = useContext(ThemeContextCustom);
  console.log(theme)

  return (
    <WrapperLabel onChange={toggleTheme}>
      <input type="checkbox" />
      <div className="slider"></div>
    </WrapperLabel>
  )
}

const WrapperLabel = styled.label`
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    :checked + .slider {
      background-color: #23242A;
    }

    :checked + .slider::before {
      transform: translateX(100%);
      box-shadow: inset 15px -4px 0px 15px #fff000;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #23242A;
    transition: .5s;
    border-radius: 30px;

    ::before {
      position: absolute;
      content: "";
      height: 1.4em;
      width: 1.4em;
      border-radius: 50%;
      left: 10%;
      bottom: 15%;
      box-shadow: inset 8px -4px 0px 0px #fff000;
      background: var(--background);
      transition: .5s;
    }
  }

`;
