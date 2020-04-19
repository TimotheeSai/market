import React from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar.js'
import ProductContainer from "./components/ProductContainer.js";
import Presentation from "./components/Presentation.js";
import Background from "./img/background_vert.jpg"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import green from "@material-ui/core/colors/green";

// import ReactDOM from  "react-dom"


const productList = [
    {
        id: 1,
        name: "Tomates",
        description: "Les bonnes tomates",
        imagePath: "market/img/tomates.jpg",
        category: "fruit",
        unitPrice: 2.50,
        quantity: 0,
        unit: "kg",
        price: 0,
    }, {
        id:2,
        name: "Courgettes",
        description: "Les bonnes courgettes",
        imagePath: "market/img/courgettes.jpg",
        category: "legume",
        unitPrice: 1.00,
        quantity: 0,
        unit: "kg",
        price: 0,

    },{
        id:3,
        name: "Bananes",
        description: "Banananananana",
        imagePath: "market/img/bananes.jpg",
        category: "fruit",
        unitPrice: 0.75,
        quantity: 0,
        unit: "kg",
        price: 0,
    },
]

const profile = {
    src: "market/img/jean-mi/profile.jpg",
    name: "Jean Michel Exemple",
    presentation: `Venez decouvrir les bon produits de Jean Mi, même pendant l'épidemie. \n 
    Cultivés par ses soins, ses légumes sont bios et responsables`
}


const style = {
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // opacity: 0.2
}


const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

function App() {
    return (
        <div style={style}>
            <ThemeProvider theme={theme}>
                <NavBar />
                <Presentation profile={profile}/>
                <ProductContainer productList={productList}/>
            </ThemeProvider>
        </div>
    );
}

export default App;
