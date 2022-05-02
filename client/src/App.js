import Login from './Login.js'
// import MyProfile from './components/MyProfile.js';
import { useState, useEffect } from 'react';
import Signup from './Signup';
import Logout from './Logout.js';
import MyProfile from './MyProfile.js'
// import NavBar from './components/NavBar.js';
import { Route, Switch, useHistory, Link } from "react-router-dom";
import FeedPage from './FeedPage.js'
import MakePost from './MakePost.js'
import UserPage from './UserPage';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([])
  const history = useHistory();
  

  // const handleReroute = () => {
  //   console.log("Reroute!")
  //   history.push("/");
  //   }

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((data) => setUser(data));
      }
    });
  }, []);



  
    

  function login (username, password){
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => r.json())
      .then((data) => (user.username ? setUser(data) : null))
  }

  function handleDeleteUser(id){
    const updatedUsers =profiles.filter(p=>p.id!==id)
    setProfiles(updatedUsers)
  }

  function handleAddPost(newPost){
    setPosts([...posts, newPost])
 }


 useEffect(() => {
  fetch("/posts")
.then((res) => res.json())
.then((data) => setPosts(data))}, 
[])


useEffect(() => {
  fetch("/users")
.then((res) => res.json())
.then((data) => setUsers(data))}, 
[])


  function handleLogout() {
    fetch("/logout", {
        method: "DELETE",
        }).then(() => setUser())
        // .then(()=>handleReroute())
      }

  function handleDeleteProfile() {
    fetch(`/users/${user.id}`, {
      method: "DELETE",
    }).then(() => setUser())
    .then(()=>handleReroute())
  }


  return (
    
    <div>
      <div >
        <div>
      {user ? null : <Signup onLogin={setUser} login={login} /> }
      <nav className="nav-container">
      {user ? <Logout handleLogout={handleLogout}/> : <Login onLogin={setUser}/> }
       </nav> 
        </div>
       </div>
      <Switch>
      <Route exact path="/">
        <div>
      <h1 className="welcomeBanner">Welcome</h1>
      </div>
      {user ? <MakePost handleAddPost={handleAddPost} user={user} setUser={setUser} /> : null}
      {user ? <FeedPage user={user} setUser={setUser} posts={posts} users={users} /> : null}
      </Route>
      <Route exact path="/MyProfile">
        <MyProfile user={user} setUser={setUser} handleDeleteProfile={handleDeleteProfile} />
      </Route>
      <Route exact path={`/users/:username`} >
              <UserPage users={users}/>
            </Route>

      </Switch>
    </div>
  );
}

export default App;