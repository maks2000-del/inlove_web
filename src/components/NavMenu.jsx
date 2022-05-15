import { AiFillHome } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { BiBookHeart, BiCalendarHeart } from "react-icons/bi";
import { FaHandHoldingHeart } from "react-icons/fa";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function NavMenue() {

  return (
    <List>
      <SLink to={"/home"}>
        <AiFillHome />
        <h4>Home</h4>
      </SLink>
      <SLink to={"/complimentConstructor/"}>
        <FaHandHoldingHeart />
        <h4>Compliment</h4>
      </SLink>
      <SLink to={"/memoryConstructor/"}>
        <BiBookHeart />
        <h4>Memory</h4>
      </SLink>
      <SLink to={"/spacialDateConstructor/"}>
        <BiCalendarHeart />
        <h4>Date</h4>
      </SLink>
      <SLink to={`/settings/`}>
        <IoMdSettings />
        <h4>Settings</h4>
      </SLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1rem;
  margin-left: 1rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);

  h4 {
    color: white;
    font-size: 0.8rem;
  }
  svg {
    color: white;
    font-size: 1.5rem;
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
  }
`;

export default NavMenue;
