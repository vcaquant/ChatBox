import React from 'react';

class Connexion extends React.Component {
    goToChat = event => {
        event.preventDefault();
        const pseudo = this.pseudoInput.value;
        this.context.router.transitionTo(`/pseudo/${pseudo}`);
    };

    render() {
        return (
            <div className="connexionBox" onSubmit={e => this.goToChat(e)} >
                <form className="connexion">
                    <div className="center">
                        <img src="logo.png" alt="logo" height="200" width="200"/>
                    </div>
                    <input
                        type="text"
                        placeholder="Pseudo"
                        required
                        ref={input => {this.pseudoInput = input}}/>
                    <input type="password" placeholder="Password" required/>
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
