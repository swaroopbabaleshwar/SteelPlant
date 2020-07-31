import React, { Component } from 'react';

import MainReason from './MainReason';
import SubReason from './SubReason';

class DelayCodes extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className='DelayCodes'>
                <MainReason />
                {/* <SubReason /> */}
            </div>
        );
    }
}

export default DelayCodes;
