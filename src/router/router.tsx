import { Routes, Route } from "react-router-dom";
import GetMarkers from "../page/getMarkers";
import Body from "../page/body";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Body />}></Route>
      <Route path="/markers" element={<GetMarkers />}></Route>
    </Routes>
  );
}
