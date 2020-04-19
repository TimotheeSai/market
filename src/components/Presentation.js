import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import Market from "./Market";

const market = [
    {city: "Vincennes", days:["mardi", "vendredi", "dimanche"], hours: ["7h30", "13h30"], location: "Rue de Fontenay"},
    {city: "Montrouge", days:["jeudi", "dimanche"], hours: ["8h00", "13h00"], location: "Victor Hugo"},
    {city: "Joinville-Le-Pont", days:["jeudi", "dimanche"], hours: ["8h00", "13h00"], location: "Place du 8 Mai 1945"},
]

export default function Presentation(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" style={{ backgroundColor: 'white'}}>
                <Grid container spacing={1} style={{padding: 40}}>
                    <Grid item xs={12} sm={4} lg={4} xl={4}>
                        <Card style={{maxWidth: 500}}>
                            <CardMedia
                                image={props.profile.src}
                                title={props.profile.name}
                                style={{height:0, paddingTop: "100%"}}
                            />
                        </Card>
                        {/*<img src={props.picture.src} alt={props.picture.name} />;*/}
                        {/*<Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '30vh' }} />*/}
                    </Grid>
                    <Grid item xs={12} sm={8} lg={8} xl={8}
                          style={{ backgroundColor: 'white',
                              padding: 10,
                              // position: "relative",
                              flex: 1,
                              display: 'flex',
                              flexDirection: "column",
                          }}>
                        <Typography gutterBottom variant="h4">{props.profile.name}</Typography>

                        <Typography component="p"
                                    style={{
                                        backgroundColor: 'white',
                                        // height: '30vh',
                                        padding: 10,
                                        flex: 1,
                                    }}
                                    variant="h5" >
                            {props.profile.presentation}
                        </Typography>
                        <Typography gutterBottom variant="h4">Les Marchés</Typography>

                        <div
                            style={{
                                // position: 'absolute',
                                flex: 1,
                                backgroundColor: "white",
                                alignItems: "center"
                                // bottom: 0
                            }}
                        >
                            {market.map((m, index) => {
                                return <Market key={index} market={m}/>
                            })}
                        </div>
                    </Grid>

                </Grid>
            </Container>
        </React.Fragment>
    );
}