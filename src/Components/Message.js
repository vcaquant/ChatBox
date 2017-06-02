import React from 'react';
import marked from 'marked';

class Message extends React.Component {

    renderText = (text) => {
        const renderText = marked(text, {sanitize: true});
        return { __html: renderText };
    };

    preRender = isUser => {
        if (isUser) {
            return (
                <p className="user-message" dangerouslySetInnerHTML={this.renderText(this.props.details.message)} />
            )
        }
        else {
            return (
                <p className="not-user-message">
                    <strong>{this.props.details.pseudo}</strong>:
                        <p dangerouslySetInnerHTML={this.renderText(this.props.details.message)} />
                </p>
            )
        }
    };

    render() {
        return this.preRender(this.props.isUser(this.props.details.pseudo));
    }

    static propTypes = {
        details: React.PropTypes.object.isRequired
    }
}

export default Message;
