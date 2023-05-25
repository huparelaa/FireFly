import Post from "../post/Post";
import PostText from "../post/PostText";
import "./feed.css";
import Share from "../share/Share";
import UserGames from "../../profile/UserGames";

export default function Feed({ changeState, disableShare, viewData, usuario, id, itsMe }) {
  return (
    <div className="feed">
      <div className="feedWrapper">
        {!disableShare&&<Share changeState={changeState} />}
        <PostText key={2} title={viewData.title} description={viewData.data} />
        <UserGames usuario={usuario} itsMe={itsMe} id={id}/>
        {/* <Post key={1} post={{
          id: 1,
          desc: "Wanna Orange Juice?",
          photo: "https://i.pinimg.com/736x/f6/c7/e0/f6c7e0aadc9f10362ba25a2f2bff6544.jpg",
          date: "5 mins ago",
          userId: 8,
          like: 32,
          comment: 9,
        }} /> */}
      </div>
    </div>
  );
}
