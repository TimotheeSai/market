import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle  from '@material-ui/core/DialogTitle';
import ButtonGroup from "@material-ui/core/es/ButtonGroup/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";


import ProductTable from "./ProductTable"


const market = [
    {city: "Vincennes", days:["mardi", "vendredi", "dimanche"], hours: ["07:30", "13:30"], location: "Rue de Fontenay"},
    {city: "Montrouge", days:["jeudi", "dimanche"], hours: ["08:00", "13:00"], location: "Victor Hugo"},
    {city: "Joinville-Le-Pont", days:["jeudi", "dimanche"], hours: ["08:00", "13:00"], location: "Place du 8 Mai 1945"},
]


class EmailField extends Component {
    static defaultProps = {
        name: 'email',
        placeholder: 'exemple@mail.com',
        required: true,
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
    }

    constructor(props) {
        super(props)
        this.state = { value: '' }
    }

    handleChange = ({ target: { value } }) => {
        // value = value
        //     // Remove all non-digits, turn initial 33 into nothing
        //     .replace(/\D+/, '')
        //     .replace(/^330?/, '0')
        //     // Stick to first 10, ignore later digits
        //     .slice(0, 10)
        //     // Add a space after any 2-digit group followed by more digits
        //     .replace(/(\d{2})(?=\d)/g, '$1 ')
        this.setState({ value })
    }

    render() {
        const { name, placeholder, required } = this.props
        return (
            // <input
            //     autocomplete="tel"
            //     name={name}
            //     onChange={this.handleChange}
            //     placeholder={placeholder}
            //     required={required}
            //     type="tel"
            //     value={this.state.value}
            // />
            <TextField
                autoComplete="email"
                label="Email"
                value={this.state.value}
                onChange={this.handleChange}
                required={required}
                placeholder={placeholder}
                name={name}
                type="email"
                style={{flex:1, minWidth: 200, paddingBottom: 24}}
            />
        )
    }

}

function UserInfo (props) {
    const defaultMarket = props.markets[0];
    const [market, setMarket] = React.useState(defaultMarket);
    const [place, setPlace] = React.useState(defaultMarket.city);
    const [day, setDay] = React.useState(defaultMarket.days[0]);
    const [time, setTime] = React.useState(defaultMarket.hours[1]);
    const [mail, setEmail] =  React.useState("");

    const handleChange = (event) => {
        let value = event.target.value

        switch (event.target.name) {
            case "market":
                setMarket(props.markets.filter(m => m.city === value)[0]);
                setPlace(market.city)
                break
            case "day":
                setDay(value);
                break
            case "time":
                setTime(value);
                break
            case "email":
                setEmail(value);
                break
            default:
                return
        }
        props.setUserInfo({place, day, time, mail, market})

    };

    return (
        <div style={{flex: 1, paddingBottom: 30}}>
            <DialogContentText>Renseignez votre email</DialogContentText>
            <EmailField value={mail}/>
            <DialogContentText>Selectionnez la date et le lieu de récupération</DialogContentText>
            <TextField
                select
                label="Marché"
                value={market.city}
                onChange={handleChange}
                name={"market"}
                style={{flex:2, minWidth: 200}}
            >
                {props.markets.map((option) => (
                    <MenuItem key={option.city} value={option.city}>
                        {option.city}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Jour"
                value={day}
                onChange={handleChange}
                name={"day"}
                style={{flex:2, minWidth: 200}}
            >
                {market.days.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                id="time"
                label="Alarm clock"
                type="time"
                name={"time"}
                defaultValue={time}
                style={{flex:1, minWidth: 200}}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
        </div>
    )
}

class CartModal extends Component {
    constructor (props) {
        super(props);
        this.table = React.createRef();
        this.userInfo = React.createRef();
        this.state = {
            cartList: this.props.productList,
            cartValue: this.props.cartValue,
            userInfo: {market: market, email: ""},
            remark: "",
            open: false,
        };
    }


    handleClickOpen = () => {
        this.setState({
            cartList: this.props.productList,
            open: true,
        });
        // this.table.current.setState({rows: this.props.productList})
    };

    handleClose = () => {
        this.setState({
            open: false,
        })
    };

    setUserInfo = (info) => {
        this.setState({userInfo: info})
    }

    sendInfo = () => {
        console.log(this.state.userInfo)
        console.log(this.state.cartList)
        console.log(this.state.cartValue)
        this.handleClose()
    }

    render () {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth={"md"}
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-slide-title"  onClose={this.handleClose}>
                        Valider mon panier
                    </DialogTitle>
                    <DialogContent >
                        {/*<DialogActions style={{flex: 1}}>*/}
                           {/*<UserInfo markets={market}*/}
                           {/*          setUserInfo={this.setUserInfo}/>*/}
                        {/*</DialogActions>*/}

                        <DialogContentText>
                            Recapitulatif de la commande
                        </DialogContentText>

                        {/*<ProductTable*/}
                        {/*    ref={this.table}*/}
                        {/*    rows={this.state.cartList}*/}
                        {/*    removeFromCart={this.props.removeFromCart}*/}
                        {/*/>*/}

                        <DialogContentText variant={'h5'} style={{paddingTop: 24,  textAlign: "right",}}>
                            Total {this.props.cartValue} €
                        </DialogContentText>
                    </DialogContent>


                    <DialogActions style={{flexDirection: 'column'}}>
                        {/*<TextField*/}
                        {/*    label="Remarque"*/}
                        {/*    style={{ margin: 15 }}*/}
                        {/*    placeholder="Remarque"*/}
                        {/*    helperText="Remarque pour le producteur"*/}
                        {/*    fullWidth*/}
                        {/*    margin="normal"*/}
                        {/*    InputLabelProps={{*/}
                        {/*        shrink: true,*/}
                        {/*    }}*/}
                        {/*    variant="outlined"*/}
                        {/*    multiline*/}
                        {/*    rows={3}*/}
                        {/*/>*/}
                        <ButtonGroup variant="contained"
                                     color="primary"
                                     aria-label="contained primary button group"
                                     fullWidth
                        >
                            <Button onClick={this.handleClose} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={this.sendInfo} color="primary">
                                Valider
                            </Button>
                        </ButtonGroup>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CartModal