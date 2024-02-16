import Schedules from "../pages/Schedules"
import Queries from "../pages/Queries"
import Peoples from "../pages/Peoples"
import Doctors from "../pages/Doctors"
import Home from "../pages/Home"

import { Route, Routes } from "react-router-dom"

export function Router() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/queries" element={<Queries />} />
            <Route path="/peoples" element={<Peoples />} />
            <Route path="/doctors" element={<Doctors />} />
        </Routes>
    )
}