pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract Posts {
  struct Post {
    uint id;
    address author;
    string img_path;
    string title;
    string content;
    uint post_time;
  }

  uint current_id = 0;
  mapping (uint => Post) posts;

  function addPost(string memory img_path, string memory title, 
    string memory content, uint post_time) public returns(bool)
  {
    current_id += 1;
    posts[current_id] = Post(
      current_id,
      msg.sender,
      img_path,
      title,
      content,
      post_time
    );
    return true;
  }

  function editPost(uint post_id, string memory img_path,
    string memory title, string memory content, uint post_time) public returns(bool)
  {
    posts[post_id].img_path = img_path;
    posts[post_id].title = title;
    posts[post_id].content = content;
    posts[post_id].post_time = post_time;
    return true;
  }

  function getPost(uint post_id) public view returns(Post memory) {
    return posts[post_id];
  }
}
