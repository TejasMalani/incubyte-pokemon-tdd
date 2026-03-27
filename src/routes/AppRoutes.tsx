import { Routes, Route } from "react-router-dom";

const Home = () => <h1>Pokemon List Page</h1>;
const Detail = () => <h1>Pokemon Detail Page</h1>;

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:name" element={<Detail />} />
        </Routes>
    );
}