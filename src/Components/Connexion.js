import React from 'react';
import base from '../Base';

class Connexion extends React.Component {

    state = {
        users: {}
    }

    componentWillMount() {
        this.ref = base.syncState('/Users', {
            context: this,
            state: 'users'
        });
    }

    goToChat = event => {
        event.preventDefault();
        const pseudo = this.pseudoInput.value;
        this.context.router.transitionTo(`/pseudo/${pseudo}`);
    };

    verification = event => {
        const pseudo = this.pseudoInput.value;
        const pw = this.pwInput.value;
        const users = {...this.state.users};
        const timestamp = Date.now();
        for (var key in users) {
            if (pseudo === users[key].pseudo) {
                if (users[key].pw === pw) {
                    this.goToChat(event);
                    return;
                }
                else {
                    alert('Mot de passe incorrect');
                    return;
                }
            }
        }
        const user = {
            pseudo: pseudo,
            pw: pw
        };
        users[`user-${timestamp}`] = user;
        this.setState({ users });
        this.goToChat(event);
    };

    render() {
        return (
            <div className="connexionBox" onSubmit={e => this.verification(e)} >
                <form className="connexion">
                    <div className="center">
                        <img src="logo.png" alt="logo" height="200" width="200"/>
                    </div>
                    <input
                        type="text"
                        placeholder="Pseudo"
                        required
                        ref={input => {this.pseudoInput = input}} />
                    <input
                        type="password"
                        placeholder="Password (Non protégé)"
                        required
                        ref={input => {this.pwInput = input}} />
                    <button type="submit">OK</button>
                </form>
            </div>
        )
    }

    static contextTypes = {
        router: React.PropTypes.object
    }
}

export default Connexion;
