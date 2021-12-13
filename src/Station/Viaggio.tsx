import React, { Component } from "react";

import './ViaggioStyle.css';

class Viaggio extends Component {

    biglietto: any = [
        {Partenza: '', Arrivo: '', Classe: 0, NumeroPass: 0, Pagamento: '', PrezzoBiglietto: 0}
    ]
    
    state: any = {
        newticket: this.biglietto,
        part: '',
        arr: '',
        cls: 0,
        pass: 0,
        pay: 0,
        price: 0,
        valorestation: 0,
        valoreclasse: 0,
        divmedia: '',
        media: 0,
        bigliettostampato: '',
        station: ['Genova', 'Teramo', 'Catania'],
        classe: ['1', '2'],
        paytype: ['Bancomat', 'Contanti', 'Bitcoin'],
    }


    cambiapartenza(ogg: any) {
        this.setState({ part: ogg.target.value })

        switch(ogg.target.value) {

            case "Genova":   return this.state.valorestation = 160;
            case "Teramo":   return this.state.valorestation = 110;
            case "Catania": return this.state.valorestation = 345;
        }
    }

    cambiaarrivo(ogg: any) {
        this.setState({ arr: ogg.target.value })
    }

    cambiaclasse(ogg: any) {
        this.setState({ cls: ogg.target.value })

        switch(ogg.target.value) {

            case "1":   return this.state.valoreclasse = 90;
            case "2":   return this.state.valoreclasse = 0;
        }
    }

    
    cambiapasseg(ogg: any) {
        this.setState({ pass: parseInt(ogg.target.value)  })
    }
    
    cambiamedia(ogg: any) {
        this.setState({ media: ogg.target.value})
    }

    cambiapay(ogg: any) {

        // let tipipag = ''

        // for (var oggetto of ogg.target) {

            

        //     tipipag += ("-" + oggetto);

        // }

        // Da risolvere il concatenamento dei tipi di pagamento

        this.setState({ pay: ogg.target.value })
    }

    addticket(elem: any) {

        if (this.state.part == this.state.arr) {
            alert("Attenzione, la stazione di arrivo e la stazione di partenza sono identiche");
        }else {

            elem.preventDefault();

            this.state.price = (this.state.valorestation * this.state.pass) + this.state.valoreclasse
            
            let nuovviaggio = {
                Partenza: this.state.part,
                Arrivo: this.state.arr,
                Classe: this.state.cls,
                NumeroPass: this.state.pass,
                Pagamento: this.state.pay,
                PrezzoBiglietto: this.state.price,
            }

            //effettua il vero inserimento nell'archivio dello state
            let viaggicopia = this.state.newticket;
            viaggicopia.push(nuovviaggio);
            this.setState({ newticket: viaggicopia });

            let sommacosti = 0;

            let arraylenght = 0;

            for (let bigl in this.state.newticket) {

                arraylenght = parseInt(bigl);
                
                sommacosti += this.state.price;
            }

            this.state.media = sommacosti / arraylenght;

            this.state.divmedia = <h3>La media dei Biglietti acquistati è: {this.state.media}</h3>


            
        }
        
       
    }


    printTicket(ogg: any) {


        this.setState({ bigliettostampato: <table>
            <tr>
                <td>
                    Partenza
                </td>
                <td>
                    Arrivo
                </td>
                <td>
                    Classe
                </td>
                <td>
                    Passeggieri
                </td>
                <td>
                    Costo Biglietto
                </td>
                <td>
                    Pagamento
                </td>
            </tr>
            <tr>
            {
                this.state.newticket.map(
                    (st: string, index: number) => {

                        return console.log()
                    }
                )
            }
            </tr>
        </table>})
        

    }

    render() {

    return <div>
                <div>
                    
                    <table>
                        <tr>
                            <td>
                                <label >Stazione di partenza</label>
                            </td>
                            <td>
                                <select name="" id="partenza" onChange={this.cambiapartenza.bind(this)}>
                                {
                                    this.state.station.map(
                                        (st: string, index: number) => {
                                            return <option value={st} key={index}>{st}</option>
                                        }
                                    )
                                }
                                </select>
                            </td>
                            <td>
                                <label>Stazione di arrivo</label>
                            </td>
                            <td>
                                <select name="" id="arrivo" onChange={this.cambiaarrivo.bind(this)}>
                                {
                                    this.state.station.map(
                                        (st: string, index: number) => {
                                            return <option value={st} key={index}>{st}</option>
                                        }
                                    )
                                }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Classe</label>
                            </td>
                            <td>
                                <label>1</label>
                                {
                                    this.state.classe.map(
                                        (cl: string, index: number) => {
                                            return <input onChange={this.cambiaclasse.bind(this)} key={index} type="radio" value={cl} name="classe" /> 
                                        }
                                    )
                                }
                                <label>2</label>
                            </td>
                            <td>
                                <label>Numero Passegieri</label>
                            </td>
                            <td>
                                <input type="number" min='1' onChange={this.cambiapasseg.bind(this)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Tipologia Pagamento</label>
                            </td>
                            <td>
                                <label>Bancomat</label>
                                <input type="checkbox" name="pagamento" onChange={this.cambiapay.bind(this)} value='Bancomat' />

                                <label>Contanti</label>
                                <input type="checkbox" name="pagamento" onChange={this.cambiapay.bind(this)} value='Contanti' /> <br />

                                <label>Bitcoin</label>
                                <input type="checkbox" name="pagamento" onChange={this.cambiapay.bind(this)} value='Bitcoin' />
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button  onClick={this.addticket.bind(this)}>Acquista biglietto</button>
                            </td>
                        </tr>
                    </table>

                    <br />

                    <div>
                        {this.state.divmedia}
                    </div>
                    
                    <br />

                    <button onClick={this.printTicket.bind(this)}>Visualizza tutti i Biglietti</button>

                    <div>
                        {this.state.bigliettostampato}
                    </div>
                
                </div>
            </div>
    }

}

export default Viaggio