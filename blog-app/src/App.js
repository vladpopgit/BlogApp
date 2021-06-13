import './App.css';
import LoginButton from "./components/LoginButton";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Loader from "./components/home/Loader/Loader";
import BlogHeader from "./components/header/BlogHeader";
import BlogFooter from "./components/footer/BlogFooter";
import HomeComponent from "./components/home/HomeComponent";
import { useEffect, useState } from 'react';

function App() {

  const [isSignedIn, setSignIn] = useState(false);
  const [isLoading, setLoader] = useState(true);
  const [postItems, setPostItems] = useState([]);
  const getPostsUrl = new URL("https://www.googleapis.com/blogger/v3/blogs/1619808215032981870/posts")
  const myKey = "AIzaSyDnd0083ibcmEQ445IZnVgONShVol8ezaQ";
  
  
  function getAllPosts() {
    getPostsUrl.searchParams.set("key", myKey);
    getPostsUrl.searchParams.set("maxResults", 500);
    fetch(
      getPostsUrl, {
      method: "GET"
    }
    ).then(response => response.json()
    ).then((result) => {
      console.log(result)
      setPostItems(result.items);
      setLoader(false);
    })
  }
  
  function sliceItems(array) {
    const sliced = [];
    for (let i = 0; i<array.length; i += 10) {
      let temporary = array.slice(i, i+10);
      sliced.push(temporary);
    }
    console.log(sliced);
  }

  useEffect(getAllPosts, []);

  if (!isLoading) {
    return (
      <div id="root">
        <BrowserRouter>
          <BlogHeader></BlogHeader>
          <Switch>
            <Route>
              <HomeComponent sliceItems={sliceItems} postItems={postItems} isSignedIn={isSignedIn} />
            </Route>
          </Switch>
          <BlogFooter></BlogFooter>
        </BrowserRouter>
      </div>
    )
  } else {
    return (
      <Loader></Loader>
    )
  }
}

export default App;
