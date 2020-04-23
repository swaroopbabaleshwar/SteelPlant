import React, { Component } from 'react';
import RestAPI from '../api';

import { Buttons } from './Main';
import MasterTable from './EditableTable';

import { Row, Col, Card, Select, Button, Modal, Input } from 'antd';
const { Option } = Select;
let  STAND = [
	{
		"Description of Parameter": "- Stand No Control",
		"System Tag Name": "RACS.Mac[1].P.b No Control",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Stand Inserted in Recipe",
		"System Tag Name": "RACS.Mac[1].P.bInsert",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Horizontal (0) / Vertical (1) Selection",
		"System Tag Name": "RACS.Mac[1].P.bIsVertical",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "Upstream HMD Interlock Enabled",
		"System Tag Name": "RACS.Mac[1].P.bHmdIntlkEn",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- HMD Load IN Enabled ( OFF = current )",
		"System Tag Name": "RACS.Mac[1].P.bMdHmdEn",
		"Gr1": "Rolling Mill",
		"Gr2": "Current",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Speed Coefficients Load From Recipe Enabled",
		"System Tag Name": "RACS.Mac[1].P.bRecipeCoeffEn",
		"Gr1": "Rolling Mill",
		"Gr2": "Speed",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Delta V Enabled",
		"System Tag Name": "RACS.Mac[1].P.bDvEn",
		"Gr1": "Rolling Mill",
		"Gr2": "DeltaV",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Looper Enabled",
		"System Tag Name": "RACS.Mac[1].P.bLcRegulatorEn",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Temporary Looper Enabled",
		"System Tag Name": "RACS.Mac[1].P.bLcTemporaryRegEn",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Fixed Looper Enabled",
		"System Tag Name": "RACS.Mac[1].P.bLcPermanentRegEn",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Upstream HMD Looper Sequence End Enabled ( 0 = Load IN )",
		"System Tag Name": "RACS.Mac[1].P.bLcEndByHMDEn",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Looper Correction Propagation Enabled",
		"System Tag Name": "RACS.Mac[1].P.bLcCorrectionPropagEn",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Tension / Push Measure Enabled",
		"System Tag Name": "RACS.Mac[1].P.bTcMeasureEn",
		"Gr1": "Rolling Mill",
		"Gr2": "Tension",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Tension / Push Adjustment Enabled",
		"System Tag Name": "RACS.Mac[1].P.bTcRegulatorEn",
		"Gr1": "Rolling Mill",
		"Gr2": "Tension",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Tension / Push Current Values Bond Check Enabled",
		"System Tag Name": "RACS.Mac[1].P.bTcCurrentCheckEn",
		"Gr1": "Rolling Mill",
		"Gr2": "Tension",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Stand Index Speed Reference",
		"System Tag Name": "RACS.Mac[1].P.diIdRef",
		"Gr1": "Rolling Mill",
		"Gr2": "Speed",
		"Type": "int32",
		"Unit": "N",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Stand Type",
		"System Tag Name": "RACS.Mac[1].P.diType",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "int32",
		"Unit": "N",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Next Stand Distance [mm]",
		"System Tag Name": "RACS.Mac[1].P.diNextMacDist",
		"Gr1": "Rolling Mill",
		"Gr2": "Distance",
		"Type": "int32",
		"Unit": "m",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Upstream Stand Distance [mm]",
		"System Tag Name": "RACS.Mac[1].P.diUpStrMacDist",
		"Gr1": "Rolling Mill",
		"Gr2": "Distance",
		"Type": "int32",
		"Unit": "m",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Downstream Stand Distance [mm]",
		"System Tag Name": "RACS.Mac[1].P.diDnStrMacDist",
		"Gr1": "Rolling Mill",
		"Gr2": "Distance",
		"Type": "int32",
		"Unit": "m",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Load IN Threshold [A]",
		"System Tag Name": "RACS.Mac[1].P.diDrvCurLoadTh",
		"Gr1": "Rolling Mill",
		"Gr2": "Current",
		"Type": "int32",
		"Unit": "A",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Torque Load IN Threshold [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diDrvTorqueLoadTh",
		"Gr1": "Rolling Mill",
		"Gr2": "Current",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Roller External Diameter [mm*100]",
		"System Tag Name": "RACS.Mac[1].P.diRollExternDiam",
		"Gr1": "Rolling Mill",
		"Gr2": "Diameter",
		"Type": "int32",
		"Unit": "mm",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Channel Groove [mm*100]",
		"System Tag Name": "RACS.Mac[1].P.diRollGroove",
		"Gr1": "Rolling Mill",
		"Gr2": "Diameter",
		"Type": "int32",
		"Unit": "mm",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Gear Ratio [mm*100]",
		"System Tag Name": "RACS.Mac[1].P.diGear Ratio",
		"Gr1": "Rolling Mill",
		"Gr2": "Diameter",
		"Type": "int32",
		"Unit": "mm",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Stand Speed ",
		"System Tag Name": "RACS.Mac[1].P.diVoutLinIni",
		"Gr1": "Rolling Mill",
		"Gr2": "Speed",
		"Type": "int32",
		"Unit": "m/s",
		"Comments": " "
	},
	{
		"Description of Parameter": "- First Stand Outgoing Lin. Speed [mm/s]",
		"System Tag Name": "RACS.Mac[1].P.diVoutLinIni",
		"Gr1": "Rolling Mill",
		"Gr2": "Speed",
		"Type": "int32",
		"Unit": "m/s",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Starting SpeedOUT/SpeedIN Ratio [N*100000]",
		"System Tag Name": "RACS.Mac[1].P.diKvrIni",
		"Gr1": "Rolling Mill",
		"Gr2": "Speed",
		"Type": "int32",
		"Unit": "N",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Delta V Insertion Delay [ms]",
		"System Tag Name": "RACS.Mac[1].P.diDvOnDelay",
		"Gr1": "Rolling Mill",
		"Gr2": "DeltaV",
		"Type": "int32",
		"Unit": "s",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Delta V Disconnection Delay [ms]",
		"System Tag Name": "RACS.Mac[1].P.diDvOffDelay",
		"Gr1": "Rolling Mill",
		"Gr2": "DeltaV",
		"Type": "int32",
		"Unit": "s",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Delta V Insertion Ramp Duration [ms]",
		"System Tag Name": "RACS.Mac[1].P.diDvOnRamp",
		"Gr1": "Rolling Mill",
		"Gr2": "DeltaV",
		"Type": "int32",
		"Unit": "s",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Delta V Disconnection Ramp Duration [ms]",
		"System Tag Name": "RACS.Mac[1].P.diDvOffRamp",
		"Gr1": "Rolling Mill",
		"Gr2": "DeltaV",
		"Type": "int32",
		"Unit": "s",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Lead Speed [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diLead Speed ",
		"Gr1": "Rolling Mill",
		"Gr2": "Leasd Sp",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Loop Scanner Offset [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diLcScannerOffset",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Looper Height Reference [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diLcSetPoint",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Initial Length -> Ejector Command [mm]",
		"System Tag Name": "RACS.Mac[1].P.diLcKickRaiseSpace",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "int32",
		"Unit": "m",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Ejector Command Length -> Ref. Curve Unblock)   [mm]",
		"System Tag Name": "RACS.Mac[1].P.diLcKickToRifSpace",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "int32",
		"Unit": "m",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Adjustment Enabling Delay  [ms]",
		"System Tag Name": "RACS.Mac[1].P.diLcRegEnableDelay",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "int32",
		"Unit": "s",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Distance Lost (P.C. Mount -> Curve Recovery)  [mm]",
		"System Tag Name": "RACS.Mac[1].P.diLcTailSeqSpace",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "int32",
		"Unit": "m",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Distance Lost (Curve Recovery -> Ejector Fall)  [mm]",
		"System Tag Name": "RACS.Mac[1].P.diLcKickLowerSpace",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "int32",
		"Unit": "m",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Distance Lost (Curve Recovery -> Curve Regulation End)  [mm]",
		"System Tag Name": "RACS.Mac[1].P.diLcRegEndSpace",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "int32",
		"Unit": "m",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Balance Ejector Delay [ms]",
		"System Tag Name": "RACS.Mac[1].P.diLcKickBalanceDelay",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "int32",
		"Unit": "s",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Permanent Curve Regulator Reference [mm/s]",
		"System Tag Name": "RACS.Mac[1].P.diLcPermRegSetPoint",
		"Gr1": "Rolling Mill",
		"Gr2": "Looper",
		"Type": "int32",
		"Unit": "cm/s",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Tension Offset [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diLcTensionOffset",
		"Gr1": "Rolling Mill",
		"Gr2": "Tension",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Tension Reference [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diLcSetPoint",
		"Gr1": "Rolling Mill",
		"Gr2": "Tension",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Load IN Threshold  Hysteresys[A]",
		"System Tag Name": "RACS.Mac[1].P.diDrvCurLoadHyst",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "int32",
		"Unit": "A",
		"Comments": " "
	}];
let TB = [
	{
		"Description of Parameter": "- TB Select ",
		"System Tag Name": "RACS.Mac[1].P.b PR SELECT",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Roller External Diameter [mm*100]",
		"System Tag Name": "RACS.Mac[1].P.diRollExternDiam",
		"Gr1": "Rolling Mill",
		"Gr2": "Diameter",
		"Type": "int32",
		"Unit": "mm",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Channel Groove [mm*100]",
		"System Tag Name": "RACS.Mac[1].P.diRollGroove",
		"Gr1": "Rolling Mill",
		"Gr2": "Diameter",
		"Type": "int32",
		"Unit": "mm",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Main Torque Limit [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diDrv Main Torque Limit",
		"Gr1": "Rolling Mill",
		"Gr2": "Current",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Reduced Torque Limit [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diDrv Reduced Torque Limit",
		"Gr1": "Rolling Mill",
		"Gr2": "Current",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Head Over Speed [%oo]",
		"System Tag Name": "RACS.Mac[1].P.di Head Over Speed ",
		"Gr1": "Rolling Mill",
		"Gr2": "Leasd Sp",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Tail Over Speed [%oo]",
		"System Tag Name": "RACS.Mac[1].P.di Tail Over Speed ",
		"Gr1": "Rolling Mill",
		"Gr2": "Leasd Sp",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
    }
];
let PR = [
	{
		"Description of Parameter": "- PR Select ",
		"System Tag Name": "RACS.Mac[1].P.b PR SELECT",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- PR Head Pinch ",
		"System Tag Name": "RACS.Mac[1].P.b Head Pinch",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- PR Tail Pinch ",
		"System Tag Name": "RACS.Mac[1].P.Tail Pinch",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- PR Contnous  Pinch ",
		"System Tag Name": "RACS.Mac[1].P.Contnous  Pinch",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Roller External Diameter [mm*100]",
		"System Tag Name": "RACS.Mac[1].P.diRollExternDiam",
		"Gr1": "Rolling Mill",
		"Gr2": "Diameter",
		"Type": "int32",
		"Unit": "mm",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Channel Groove [mm*100]",
		"System Tag Name": "RACS.Mac[1].P.diRollGroove",
		"Gr1": "Rolling Mill",
		"Gr2": "Diameter",
		"Type": "int32",
		"Unit": "mm",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Main Torque Limit [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diDrv Main Torque Limit",
		"Gr1": "Rolling Mill",
		"Gr2": "Current",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Reduced Torque Limit [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diDrv Reduced Torque Limit",
		"Gr1": "Rolling Mill",
		"Gr2": "Current",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Head Over Speed [%oo]",
		"System Tag Name": "RACS.Mac[1].P.di Head Over Speed ",
		"Gr1": "Rolling Mill",
		"Gr2": "Leasd Sp",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Tail Over Speed [%oo]",
		"System Tag Name": "RACS.Mac[1].P.di Tail Over Speed ",
		"Gr1": "Rolling Mill",
		"Gr2": "Leasd Sp",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
    }
];
let RT = [
	{
		"Description of Parameter": "- RT Enable",
		"System Tag Name": "RACS.Mac[1].P.b RT Enable",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
    },
	{
		"Description of Parameter": "- Roller External Diameter [mm*100]",
		"System Tag Name": "RACS.Mac[1].P.diRollExternDiam",
		"Gr1": "Rolling Mill",
		"Gr2": "Diameter",
		"Type": "int32",
		"Unit": "mm",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Stand Speed ",
		"System Tag Name": "RACS.Mac[1].P.diVoutLinIni",
		"Gr1": "Rolling Mill",
		"Gr2": "Speed",
		"Type": "int32",
		"Unit": "m/s",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Lead Speed [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diLead Speed ",
		"Gr1": "Rolling Mill",
		"Gr2": "Leasd Sp",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
    }
];
let SH = [
	{
		"Description of Parameter": "- SH  Enable",
		"System Tag Name": "RACS.Mac[1].P.b  SH Enable",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- SH Head Enable",
		"System Tag Name": "RACS.Mac[1].P.b Head cut Enable",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- SH Tail Enable",
		"System Tag Name": "RACS.Mac[1].P.b Tail Cut Enable",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- SH DIV CUT Enable",
		"System Tag Name": "RACS.Mac[1].P.b Div Cut Enable",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Lead Speed [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diLead Speed ",
		"Gr1": "Rolling Mill",
		"Gr2": "Leasd Sp",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
    }
];
let Apron= [
	{
		"Description of Parameter": "- Apron Enable",
		"System Tag Name": "RACS.Mac[1].P.b Apron  Enable",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Apron Lead Speed [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diL Apron Lead Speed ",
		"Gr1": "Rolling Mill",
		"Gr2": "Leasd Sp",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
    }
];
let TC = [
	{
		"Description of Parameter": "- TC Enable",
		"System Tag Name": "RACS.Mac[1].P.b  TC Enable",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- TC Lead Speed [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diL TC ead Speed ",
		"Gr1": "Rolling Mill",
		"Gr2": "Leasd Sp",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
    }
];
let Rake = [
	{
		"Description of Parameter": "- Rake Enable",
		"System Tag Name": "RACS.Mac[1].P.b  Rake Enable",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- RakeCycle",
		"System Tag Name": "RACS.Mac[1].P.b  Rake Cycle",
		"Gr1": "Rolling Mill",
		"Gr2": "General",
		"Type": "bit",
		"Unit": "--",
		"Comments": " "
	},
	{
		"Description of Parameter": "- Rake Pickup Correction  [%oo]",
		"System Tag Name": "RACS.Mac[1].P.diL Rake Pick up Correction",
		"Gr1": "Rolling Mill",
		"Gr2": "Leasd Sp",
		"Type": "int32",
		"Unit": "%",
		"Comments": " "
	},
];

STAND = STAND.map((s, index) => {
    s['key'] = index;
    return s;
});
TB = TB.map((s, index) => {
    s['key'] = index;
    return s;
});
PR = PR.map((s, index) => {
    s['key'] = index;
    return s;
});
RT = RT.map((s, index) => {
    s['key'] = index;
    return s;
});
SH = SH.map((s, index) => {
    s['key'] = index;
    return s;
});
Apron = Apron.map((s, index) => {
    s['key'] = index;
    return s;
});
TC = TC.map((s, index) => {
    s['key'] = index;
    return s;
});
Rake = Rake.map((s, index) => {
    s['key'] = index;
    return s;
});

class DeviceType extends Component {
    constructor(props) {
        super();
        this.state = {
            // types: [{ type: 'STAND', desc: 'stand' },
            //         {type: 'PR', desc: 'PinchRoll'},
            //         {type: 'SH', desc: 'shear'},
            //         {type: 'TB', desc: 'TailBreaker'}
            //     ],
			selectedDeviceType: '',
			key: '',
			type: '',
			input: '',
			fieldType: {},
			fieldTypes: []
        }
    }

    onChange = (type, key, e) => {
		if (type === 'fieldType') {
			this.setState({ fieldType: {Id: e.key, Name: e.value} });
			return;
		}
		let parentThis = this.props.self;
        let index =  e.children.indexOf(' ');
		this.setState({ selectedDeviceType: e.children.substr(0, index), key });
		parentThis.setState({ selectedDeviceType: e.children.substr(0, index), key });
	}
	
	componentDidMount() {
		this.getFieldTypes();
	}

	getFieldTypes = () => {
		RestAPI.getFieldTypes()
        .then(resp => {
            if (resp && resp.data) {
				this.setState({ fieldTypes: resp.data, input: '', type: '', fieldType: {Id: '', Name: ''} });
			}
            console.log(resp);
        }).catch(err => {
            console.log(err);
        });
	}

	addDevice = (device) => {
		RestAPI.addDeviceType({
			params: {
				name: device
			}
		}).then(resp => {
			console.log(resp);
			this.props.self.getDeviceaTypes();
		}).catch(err => {
			console.log(err);
		});
	}

	addDeviceparameterList = (item) => {
		RestAPI.addDeviceparameters({
			params: {
				...item
			}
		});
		// RestAPI.addDeviceParameters({
		// 	params: {
		// 		...item
		// 	}
		// }).then(resp => {
		// 	console.log(resp);
		// }).catch(err => {
		// 	console.log(err);
		// });
	}

	editDevice = (key, name) => {
		RestAPI.editDeviceType({
			params: {
				id: key,
				name: name
			}
		}).then(resp => {
			this.props.self.getDeviceaTypes();
			console.log(resp);
		}).catch(err => {
			console.log(err);
		})
	}
	deleteDevice = (key) => {
		RestAPI.deleteDeviceType({
			params: {
				id: key
			}
		}).then(resp => {
			this.props.self.getDeviceaTypes();
			console.log(resp);
		}).catch(err => {
			console.log(err);
		});
	}
	openModal = (type, e) => {
		if (type === 'Delete') {
			this.deleteFieldType();
			return;
		}
		let input = type ===  'Edit' ? this.state.fieldType.Name : '' ;
		this.setState({ type, input });
	}
	handleInput = (e) => {
		this.setState({ input: e.target.value });
	}
	handleCRUD = () => {
		if (this.state.type === 'Add' && (this.state.input !== '')) {
			this.addFieldType();
		}
		if (this.state.type === 'Edit' && (this.state.input !== '')) {
			this.editFieldTyoe();
		}
	}
	addFieldType = () => {
		RestAPI.addFieldType({
			params: {
				type: this.state.input
			}
		}).then(resp => {
			this.getFieldTypes();
			console.log(resp);
		}).catch(err => {
			console.log(err);
		});
	}
	editFieldTyoe = () => {
		RestAPI.editFieldTyoe({
			params: {
				id: this.state.fieldType.Id,
				type: this.state.input
			}
		}).then(resp => {
			this.getFieldTypes();
			console.log(resp);
		}).catch(err => {
			console.log(err);
		})
	}
	deleteFieldType = () => {
		RestAPI.deleteFieldType({
			params: {
				id: this.state.fieldType.Id
			}
		}).then(resp => {
			this.getFieldTypes();
			console.log(resp)
		}).catch(err => {
			console.log(err);
		})
	}

    render() {
		let parentThis = this.props.self;
		let deviceTypekey = this.state.key;
        return(
            <div>
				<Row style={{ backgroundColor: '#037832'}}>
					<Col span={3} style={{ padding: '1rem 0', 'color': 'white' }}>Select Equipment :</Col>
					<Col span={5} style={{ padding: '12px 0' }}>
						<Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Device Type"
                            optionFilterProp="children"
                            onChange={this.onChange.bind(this, 'deviceType')}
                            value={this.state.selectedDeviceType}
                            showSearch showArrow allowClear={false}
                        >
                            {parentThis.state.types.map(device => <Option key={device.Id} value={device.Key}>{device.Name + ' - ' + device.Description}</Option>)}
                        </Select>
					</Col>
					<Col span={4}>
						<Buttons self={this} type='Device'/>
					</Col>
					<Col span={3} style={{ padding: '1rem 0', 'color': 'white' }}>Select Field Type :</Col>
					<Col span={5} style={{ padding: '12px 0' }}>
						<Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Field Type"
                            optionFilterProp="children"
                            onChange={this.onChange.bind(this, 'fieldType')}
                            value={this.state.fieldType.Name}
                            showSearch showArrow allowClear={false}
                        >
                            {this.state.fieldTypes.map(field => <Option key={field.Id} value={field.Name}>{field.Name}</Option>)}
                        </Select>
					</Col>
					<Col span={4} style={{ padding: '12px 0' }}>
						<Button type='primary' onClick={this.openModal.bind(this, 'Add')}>Add</Button>
						<Button type='primary' onClick={this.openModal.bind(this, 'Edit')}>Edit</Button>
						<Button type='danger' onClick={this.openModal.bind(this, 'Delete')}>Delete</Button>
					</Col>
				</Row>
				<div>
					{this.state.key && <MasterTable deviceTypekey={deviceTypekey} />}
				</div>
				<Modal
                    title={this.state.type + ' Field Type'}
                    visible={this.state.type}
                    onCancel={this.handleClose}
                    footer={null}
                >
                    <div>
                        <Input placeholder='Type Here' onChange={this.handleInput} value={this.state.input} />
                        <Button onClick={this.handleCRUD}>{this.state.type}</Button>
                    </div>
                </Modal>            

                {/* <Col span={6} className='col'>
                    <Card title="Type">
                        <Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Device Type"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            value={this.state.deviceType}
                            showSearch showArrow allowClear={false}
                        >
                            {parentThis.state.types.map(device => <Option key={device.Id} value={device.Key}>{device.Name + ' - ' + device.Description}</Option>)}
                        </Select>	
                        <Buttons self={this} type='Device'/>
                    </Card>
                </Col>
                <Col span={18}>
                    {this.state.selectedDeviceType && <MasterTable self={this} data={this.state.deviceParamsData} />}
                </Col> */}
                {/* <Col span={4} className='col'>
                    <Card title="Description">
                        <Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Plant Type"
                            optionFilterProp="children"
                            onChange={this.onChange.bind(this, 'plantType')}
                            value={this.state.plantType}
                            showSearch showArrow allowClear={false}
                        >
                            {this.state.plantTypes.map(type => <Option key={type} value={type}>{type}</Option>)}
                        </Select>
                        <Buttons self={this} type='Plant Type'/>
                    </Card>
                </Col> */}
            </div>
        );
    }
}

export default DeviceType;