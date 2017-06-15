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
        users[`user-${pseudo}`] = user;
        this.setState({ users });
        this.goToChat(event);
    };

    render() {
        return (
            <div className="connexionBox" onSubmit={e => this.verification(e)} >
                <form className="connexion">
                    <div className="center image-logo">
                        <img src="logo.png" alt="logo" height="75%" width="75%"/>
                    </div>
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-user"></i>
                        <input
                            className="input"
                            type="text"
                            placeholder="Pseudo"
                            required
                            ref={input => {this.pseudoInput = input}} />
                    </div>
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                        <input
                            className="input"
                            type="password"
                            placeholder="Password (Not Protected)"
                            required
                            ref={input => {this.pwInput = input}} />
                    </div>
                    <button type="submit">
                        <div className="inner-addon right-addon">
                        <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                        </div>Sign In</button>
                </form>
            </div>
        )
    }

    static contextTypes = {
        router: React.PropTypes.object
    }
}

export default Connexion;
