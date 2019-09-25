import React from 'react';
import Amplify from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
  }
});

Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: process.env.REACT_APP_REGION,
  aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`,
}));

class SubWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mqtt: 'no message',
      imagePath: '/img/token-card-back.jpg'
    };

    Amplify.PubSub.subscribe('iot-demo-reader').subscribe({
      next: data => {
        console.log('Message received', data);
        if (data.value) {
          switch(data.value) {
            case 70:
              this.setState({imagePath: '/img/token-elemental.jpg'});
              break;
            case 198:
              this.setState({imagePath: '/img/token-centaur.jpg'});
              break;
            case 230:
              this.setState({imagePath: '/img/token-angel.jpg'});
              break;
            default:
              break;
          }
          this.setState({message: data.value});
        }
      },
      error: error => console.error(error),
      close: () => console.log('Done'),
    });
    console.log('subscribed');
  }
  render() {
    return(
      <div>
        <img src={this.state.imagePath} alt="selected token" width="300px"/>
        <p>{this.state.imagePath}</p>
      </div>
    )
  }

}

export default SubWindow;
