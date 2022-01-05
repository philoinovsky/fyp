pragma solidity >=0.5.16;

contract Data {
  address public owner;
  mapping (address => string) data_path;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() public {
    owner = msg.sender;
    data_path[msg.sender] = "user.json";
  }

  // use current address
  function getDataPath(address addr) public view returns(string memory) {
    return data_path[addr];
  }
}
