import Alter from "../cda/Alter";
import Create from "../cda/Create";
import Display from "../cda/Display";
import Home from "../Home";
import Navbar from "../navbar/Navbar";

const routeConfig = [
    { path: '/', element: <Home /> },
    { path: 'nav/:navbar', element: <Navbar /> },
    { path: 'menu/:type', element: <Create /> },
    { path: '/:type/display', element: <Display /> },
    { path: '/:type/alter', element: <Alter /> },
];

export default routeConfig;