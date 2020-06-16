import React, { Component } from 'react';

import ProjectEquipment from './ProjectEquipment';
import ProjectFields from './ProjectFields';

class ProjectData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRecord: {}
        }
    }

    onRowSelect = (selectedRecord) => {
        this.setState({ selectedRecord });
    }
    render() {
        return(
            <div style={{ display: 'flex', margin: '5px' }}>
                <ProjectEquipment onRowSelect={this.onRowSelect} />
                <ProjectFields selectedRecordId={this.state.selectedRecord.Id} />
            </div>
        );
    }
}

export default ProjectData;