import React from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar.js'
import ProductContainer from "./components/ProductContainer.js";
import Presentation from "./components/Presentation.js";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import green from "@material-ui/core/colors/green";

// import ReactDOM from  "react-dom"

const imgFolder = process.env.PUBLIC_URL + "/img/"
const productList = [
    {
        id: 1,
        name: "Tomates",
        description: "Les bonnes tomates",
        imagePath: imgFolder +"tomates.jpg",
        category: "fruit",
        unitPrice: 2.50,
        quantity: 0,
        unit: "kg",
        price: 0,
    }, {
        id:2,
        name: "Courgettes",
        description: "Les bonnes courgettes",
        imagePath: imgFolder + "courgettes.jpg",
        category: "legume",
        unitPrice: 1.00,
        quantity: 0,
        unit: "kg",
        price: 0,

    },{
        id:3,
        name: "Bananes",
        description: "Banananananana",
        imagePath: imgFolder + "bananes.jpg",
        category: "fruit",
        unitPrice: 0.75,
        quantity: 0,
        unit: "kg",
        price: 0,
    },
]

const profile = {
    src: imgFolder + "jean-mi/profile.jpg",
    name: "Jean Michel Exemple",
    presentation: `Venez decouvrir les bon produits de Jean Mi, même pendant l'épidemie. \n 
    Cultivés par ses soins, ses légumes sont bios et responsables`
}

const background = imgFolder + "background_vert.jpg"

const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // opacity: 0.2
}


const theme = createMuiTheme({
    palette: {
        // primary: green,
        secondary: {main: "#6c5338"},
        primary: {
            main: '#689f38',
        },

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
