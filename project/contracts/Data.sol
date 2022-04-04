pragma solidity >=0.5.16;

contract Data {
  mapping (address => mapping (string => string)) data;

  function setData(string memory field, string memory value) public returns(bool)
  {
    data[msg.sender][field] = value;
    return true;
  }

  // use current address
  function getData(string memory field) public view returns(string memory) {
    return data[msg.sender][field];
  }
}
