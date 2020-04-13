import React, { useState, Component, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal, Row, Col, Checkbox } from 'antd';

// const originData = [];
var originData = [
    {
        "Description of Parameter": "System - Recipe Download correctly finished",
        "System Tag Name": "@SYS_Recipe_Download_Ok",
        "Gr1": "System",
        "Gr2": "System",
        "Item": "System",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACSProductRecipe.bDownloadCorrect",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "System - Recipe Download correctly finished"
    },
    {
        "Description of Parameter": "System - Recipes Download Enable",
        "System Tag Name": "@SYS_Recipe_Download_Enable",
        "Gr1": "System",
        "Gr2": "System",
        "Item": "System",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACSProductRecipe.bDownloadEnable",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "System - Recipes Download Enable"
    },
    {
        "Description of Parameter": "System - Recipe Download Error",
        "System Tag Name": "@SYS_Recipe_Download_Error",
        "Gr1": "System",
        "Gr2": "System",
        "Item": "System",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACSProductRecipe.bDownloadError",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "System - Recipe Download Error"
    },
    {
        "Description of Parameter": "System - Recipe Downloading",
        "System Tag Name": "@SYS_Recipe_Downloading",
        "Gr1": "System",
        "Gr2": "System",
        "Item": "System",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACSProductRecipe.bDownloadIp",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "System - Recipe Downloading"
    },
    {
        "Description of Parameter": "System - Recipe Active",
        "System Tag Name": "@SYS_Recipe_Active",
        "Gr1": "System",
        "Gr2": "System",
        "Item": "System",
        "Type": "int32",
        "Unit": "nd",
        "Scale": "1",
        "Base Limit": "0",
        "High Limit": "32000",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACSProductRecipe.diRecipeNumber",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "System - Recipe Active"
    },
    {
        "Description of Parameter": "System - Recipe Description",
        "System Tag Name": "@SYS_Recipe_Description",
        "Gr1": "System",
        "Gr2": "System",
        "Item": "System",
        "Type": "str255",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACSProductRecipe.sRecipeDescription",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "System - Recipe Description"
    },
    {
        "Description of Parameter": "System - Recipe Name",
        "System Tag Name": "@SYS_Recipe_Name",
        "Gr1": "System",
        "Gr2": "System",
        "Item": "System",
        "Type": "str255",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACSProductRecipe.sRecipeName",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "System - Recipe Name"
    },
    {
        "Description of Parameter": "- Stand Inserted in Recipe",
        "System Tag Name": "RACS.Mac[1].P.bInsert",
        "Gr1": "Rolling Mill",
        "Gr2": "General",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bInsert",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Stand Inserted in Recipe"
    },
    {
        "Description of Parameter": "- Horizontal (0) / Vertical (1) Selection",
        "System Tag Name": "RACS.Mac[1].P.bIsVertical",
        "Gr1": "Rolling Mill",
        "Gr2": "General",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bIsVertical",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Horizontal (0) / Vertical (1) Selection"
    },
    {
        "Description of Parameter": "Upstream HMD Interlock Enabled",
        "System Tag Name": "RACS.Mac[1].P.bHmdIntlkEn",
        "Gr1": "Rolling Mill",
        "Gr2": "General",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bHmdIntlkEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Upstream HMD Interlock Enabled"
    },
    {
        "Description of Parameter": "- HMD Load IN Enabled ( OFF = current )",
        "System Tag Name": "RACS.Mac[1].P.bMdHmdEn",
        "Gr1": "Rolling Mill",
        "Gr2": "Current",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bMdHmdEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- HMD Load IN Enabled ( OFF = current )"
    },
    {
        "Description of Parameter": "- Speed Coefficients Load From Recipe Enabled",
        "System Tag Name": "RACS.Mac[1].P.bRecipeCoeffEn",
        "Gr1": "Rolling Mill",
        "Gr2": "Speed",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bRecipeCoeffEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Speed Coefficients Load From Recipe Enabled"
    },
    {
        "Description of Parameter": "- Delta V Enabled",
        "System Tag Name": "RACS.Mac[1].P.bDvEn",
        "Gr1": "Rolling Mill",
        "Gr2": "DeltaV",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bDvEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Delta V Enabled"
    },
    {
        "Description of Parameter": "- Looper Enabled",
        "System Tag Name": "RACS.Mac[1].P.bLcRegulatorEn",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bLcRegulatorEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Looper Enabled"
    },
    {
        "Description of Parameter": "- Temporary Looper Enabled",
        "System Tag Name": "RACS.Mac[1].P.bLcTemporaryRegEn",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bLcTemporaryRegEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Temporary Looper Enabled"
    },
    {
        "Description of Parameter": "- Fixed Looper Enabled",
        "System Tag Name": "RACS.Mac[1].P.bLcPermanentRegEn",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bLcPermanentRegEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Fixed Looper Enabled"
    },
    {
        "Description of Parameter": "- Upstream HMD Looper Sequence End Enabled ( 0 = Load IN )",
        "System Tag Name": "RACS.Mac[1].P.bLcEndByHMDEn",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bLcEndByHMDEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Upstream HMD Looper Sequence End Enabled ( 0 = Load IN )"
    },
    {
        "Description of Parameter": "- Looper Correction Propagation Enabled",
        "System Tag Name": "RACS.Mac[1].P.bLcCorrectionPropagEn",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bLcCorrectionPropagEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Looper Correction Propagation Enabled"
    },
    {
        "Description of Parameter": "- Tension / Push Measure Enabled",
        "System Tag Name": "RACS.Mac[1].P.bTcMeasureEn",
        "Gr1": "Rolling Mill",
        "Gr2": "Tension",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bTcMeasureEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Tension / Push Measure Enabled"
    },
    {
        "Description of Parameter": "- Tension / Push Adjustment Enabled",
        "System Tag Name": "RACS.Mac[1].P.bTcRegulatorEn",
        "Gr1": "Rolling Mill",
        "Gr2": "Tension",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bTcRegulatorEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Tension / Push Adjustment Enabled"
    },
    {
        "Description of Parameter": "- Tension / Push Current Values Bond Check Enabled",
        "System Tag Name": "RACS.Mac[1].P.bTcCurrentCheckEn",
        "Gr1": "Rolling Mill",
        "Gr2": "Tension",
        "Item": "S01",
        "Type": "bit",
        "Unit": "--",
        "Scale": "0",
        "Base Limit": "0",
        "High Limit": "0",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.bTcCurrentCheckEn",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Tension / Push Current Values Bond Check Enabled"
    },
    {
        "Description of Parameter": "- Stand Index Speed Reference",
        "System Tag Name": "RACS.Mac[1].P.diIdRef",
        "Gr1": "Rolling Mill",
        "Gr2": "Speed",
        "Item": "S01",
        "Type": "int32",
        "Unit": "N",
        "Scale": "1",
        "Base Limit": "0",
        "High Limit": "31",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diIdRef",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Stand Index Speed Reference"
    },
    {
        "Description of Parameter": "- Stand Type",
        "System Tag Name": "RACS.Mac[1].P.diType",
        "Gr1": "Rolling Mill",
        "Gr2": "General",
        "Item": "S01",
        "Type": "int32",
        "Unit": "N",
        "Scale": "1",
        "Base Limit": "0",
        "High Limit": "99",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diType",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Stand Type"
    },
    {
        "Description of Parameter": "- Next Stand Distance [mm]",
        "System Tag Name": "RACS.Mac[1].P.diNextMacDist",
        "Gr1": "Rolling Mill",
        "Gr2": "Distance",
        "Item": "S01",
        "Type": "int32",
        "Unit": "m",
        "Scale": "0.001",
        "Base Limit": "0.001",
        "High Limit": "100",
        "Default Value": "0.001",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diNextMacDist",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Next Stand Distance [mm]"
    },
    {
        "Description of Parameter": "- Upstream Stand Distance [mm]",
        "System Tag Name": "RACS.Mac[1].P.diUpStrMacDist",
        "Gr1": "Rolling Mill",
        "Gr2": "Distance",
        "Item": "S01",
        "Type": "int32",
        "Unit": "m",
        "Scale": "0.001",
        "Base Limit": "0.001",
        "High Limit": "100",
        "Default Value": "0.001",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diUpStrMacDist",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Upstream Stand Distance [mm]"
    },
    {
        "Description of Parameter": "- Downstream Stand Distance [mm]",
        "System Tag Name": "RACS.Mac[1].P.diDnStrMacDist",
        "Gr1": "Rolling Mill",
        "Gr2": "Distance",
        "Item": "S01",
        "Type": "int32",
        "Unit": "m",
        "Scale": "0.001",
        "Base Limit": "0.001",
        "High Limit": "100",
        "Default Value": "0.001",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diDnStrMacDist",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Downstream Stand Distance [mm]"
    },
    {
        "Description of Parameter": "- Load IN Threshold [A]",
        "System Tag Name": "RACS.Mac[1].P.diDrvCurLoadTh",
        "Gr1": "Rolling Mill",
        "Gr2": "Current",
        "Item": "S01",
        "Type": "int32",
        "Unit": "A",
        "Scale": "1",
        "Base Limit": "1",
        "High Limit": "2000",
        "Default Value": "1",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diDrvCurLoadTh",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Load IN Threshold [A]"
    },
    {
        "Description of Parameter": "- Torque Load IN Threshold [%oo]",
        "System Tag Name": "RACS.Mac[1].P.diDrvTorqueLoadTh",
        "Gr1": "Rolling Mill",
        "Gr2": "Current",
        "Item": "S01",
        "Type": "int32",
        "Unit": "%",
        "Scale": "0.01",
        "Base Limit": "0",
        "High Limit": "100",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diDrvTorqueLoadTh",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Torque Load IN Threshold [%oo]"
    },
    {
        "Description of Parameter": "- Roller External Diameter [mm*100]",
        "System Tag Name": "RACS.Mac[1].P.diRollExternDiam",
        "Gr1": "Rolling Mill",
        "Gr2": "Diameter",
        "Item": "S01",
        "Type": "int32",
        "Unit": "mm",
        "Scale": "0.01",
        "Base Limit": "50",
        "High Limit": "2000",
        "Default Value": "50",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diRollExternDiam",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Roller External Diameter [mm*100]"
    },
    {
        "Description of Parameter": "- Channel Groove [mm*100]",
        "System Tag Name": "RACS.Mac[1].P.diRollGroove",
        "Gr1": "Rolling Mill",
        "Gr2": "Diameter",
        "Item": "S01",
        "Type": "int32",
        "Unit": "mm",
        "Scale": "0.01",
        "Base Limit": "0",
        "High Limit": "1000",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diRollGroove",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Channel Groove [mm*100]"
    },
    {
        "Description of Parameter": "- First Stand Outgoing Lin. Speed [mm/s]",
        "System Tag Name": "RACS.Mac[1].P.diVoutLinIni",
        "Gr1": "Rolling Mill",
        "Gr2": "Speed",
        "Item": "S01",
        "Type": "int32",
        "Unit": "m/s",
        "Scale": "0.001",
        "Base Limit": "0.01",
        "High Limit": "150",
        "Default Value": "0.01",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diVoutLinIni",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- First Stand Outgoing Lin. Speed [mm/s]"
    },
    {
        "Description of Parameter": "- Starting SpeedOUT/SpeedIN Ratio [N*100000]",
        "System Tag Name": "RACS.Mac[1].P.diKvrIni",
        "Gr1": "Rolling Mill",
        "Gr2": "Speed",
        "Item": "S01",
        "Type": "int32",
        "Unit": "N",
        "Scale": "0.00001",
        "Base Limit": "0.1",
        "High Limit": "10",
        "Default Value": "0.1",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diKvrIni",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Starting SpeedOUT/SpeedIN Ratio [N*100000]"
    },
    {
        "Description of Parameter": "- Delta V Insertion Delay [ms]",
        "System Tag Name": "RACS.Mac[1].P.diDvOnDelay",
        "Gr1": "Rolling Mill",
        "Gr2": "DeltaV",
        "Item": "S01",
        "Type": "int32",
        "Unit": "s",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "10",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diDvOnDelay",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Delta V Insertion Delay [ms]"
    },
    {
        "Description of Parameter": "- Delta V Disconnection Delay [ms]",
        "System Tag Name": "RACS.Mac[1].P.diDvOffDelay",
        "Gr1": "Rolling Mill",
        "Gr2": "DeltaV",
        "Item": "S01",
        "Type": "int32",
        "Unit": "s",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "10",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diDvOffDelay",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Delta V Disconnection Delay [ms]"
    },
    {
        "Description of Parameter": "- Delta V Insertion Ramp Duration [ms]",
        "System Tag Name": "RACS.Mac[1].P.diDvOnRamp",
        "Gr1": "Rolling Mill",
        "Gr2": "DeltaV",
        "Item": "S01",
        "Type": "int32",
        "Unit": "s",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "10",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diDvOnRamp",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Delta V Insertion Ramp Duration [ms]"
    },
    {
        "Description of Parameter": "- Delta V Disconnection Ramp Duration [ms]",
        "System Tag Name": "RACS.Mac[1].P.diDvOffRamp",
        "Gr1": "Rolling Mill",
        "Gr2": "DeltaV",
        "Item": "S01",
        "Type": "int32",
        "Unit": "s",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "10",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diDvOffRamp",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Delta V Disconnection Ramp Duration [ms]"
    },
    {
        "Description of Parameter": "- Loop Scanner Offset [%oo]",
        "System Tag Name": "RACS.Mac[1].P.diLcScannerOffset",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "int32",
        "Unit": "%",
        "Scale": "0.01",
        "Base Limit": "0",
        "High Limit": "100",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diLcScannerOffset",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Loop Scanner Offset [%oo]"
    },
    {
        "Description of Parameter": "- Looper Height Reference [%oo]",
        "System Tag Name": "RACS.Mac[1].P.diLcSetPoint",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "int32",
        "Unit": "%",
        "Scale": "0.01",
        "Base Limit": "0",
        "High Limit": "100",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diLcSetPoint",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Looper Height Reference [%oo]"
    },
    {
        "Description of Parameter": "- Initial Length -> Ejector Command [mm]",
        "System Tag Name": "RACS.Mac[1].P.diLcKickRaiseSpace",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "int32",
        "Unit": "m",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "50",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diLcKickRaiseSpace",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Initial Length -> Ejector Command [mm]"
    },
    {
        "Description of Parameter": "- Ejector Command Length -> Ref. Curve Unblock)   [mm]",
        "System Tag Name": "RACS.Mac[1].P.diLcKickToRifSpace",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "int32",
        "Unit": "m",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "50",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diLcKickToRifSpace",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Ejector Command Length -> Ref. Curve Unblock)   [mm]"
    },
    {
        "Description of Parameter": "- Adjustment Enabling Delay  [ms]",
        "System Tag Name": "RACS.Mac[1].P.diLcRegEnableDelay",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "int32",
        "Unit": "s",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "10",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diLcRegEnableDelay",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Adjustment Enabling Delay  [ms]"
    },
    {
        "Description of Parameter": "- Distance Lost (P.C. Mount -> Curve Recovery)  [mm]",
        "System Tag Name": "RACS.Mac[1].P.diLcTailSeqSpace",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "int32",
        "Unit": "m",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "50",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diLcTailSeqSpace",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Distance Lost (P.C. Mount -> Curve Recovery)  [mm]"
    },
    {
        "Description of Parameter": "- Distance Lost (Curve Recovery -> Ejector Fall)  [mm]",
        "System Tag Name": "RACS.Mac[1].P.diLcKickLowerSpace",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "int32",
        "Unit": "m",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "50",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diLcKickLowerSpace",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Distance Lost (Curve Recovery -> Ejector Fall)  [mm]"
    },
    {
        "Description of Parameter": "- Distance Lost (Curve Recovery -> Curve Regulation End)  [mm]",
        "System Tag Name": "RACS.Mac[1].P.diLcRegEndSpace",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "int32",
        "Unit": "m",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "50",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diLcRegEndSpace",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Distance Lost (Curve Recovery -> Curve Regulation End)  [mm]"
    },
    {
        "Description of Parameter": "- Balance Ejector Delay [ms]",
        "System Tag Name": "RACS.Mac[1].P.diLcKickBalanceDelay",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "int32",
        "Unit": "s",
        "Scale": "0.001",
        "Base Limit": "0",
        "High Limit": "10",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diLcKickBalanceDelay",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Balance Ejector Delay [ms]"
    },
    {
        "Description of Parameter": "- Permanent Curve Regulator Reference [mm/s]",
        "System Tag Name": "RACS.Mac[1].P.diLcPermRegSetPoint",
        "Gr1": "Rolling Mill",
        "Gr2": "Looper",
        "Item": "S01",
        "Type": "int32",
        "Unit": "cm/s",
        "Scale": "0.1",
        "Base Limit": "-100",
        "High Limit": "100",
        "Default Value": "-100",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diLcPermRegSetPoint",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Permanent Curve Regulator Reference [mm/s]"
    },
    {
        "Description of Parameter": "- Load IN Threshold  Hysteresys[A]",
        "System Tag Name": "RACS.Mac[1].P.diDrvCurLoadHyst",
        "Gr1": "Rolling Mill",
        "Gr2": "General",
        "Item": "S01",
        "Type": "int32",
        "Unit": "A",
        "Scale": "1",
        "Base Limit": "0",
        "High Limit": "200",
        "Default Value": "0",
        "OPC PLC": "L10_RACS.RACS_CPU.",
        "OPC Item": "RACS.Mac[1].P.diDrvCurLoadHyst",
        "OPCServer": "OPC.SimaticNET",
        "Node": "localhost",
        "Comments": "- Load IN Threshold  Hysteresys[A]"
    }
];
originData = originData.map((d, index) => {
    d['key'] = index;
    return d;
})

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0 }}
                    rules={[
                    {
                        required: true,
                        message: `Please Input ${title}!`,
                    },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
            children
            )}
        </td>
    );
};


  
const EditableTable = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(props.data);
    const [editingKey, setEditingKey] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedParams, setSelectionParams] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState([]);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const isEditing = record => record.Id === editingKey;

    const edit = record => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.Id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async key => {
        let parentThis = props.self;
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                parentThis.editDeviceParameter(item, row);
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteRecord = (record) => {
        console.log(record);
        let filteredData = data.filter(d => d.key !== record.key);
        setData(filteredData);
        console.log(filteredData.length);
    }

    const onCheckboxToggle = (record) => {
        let key = record.key;
        let pos = selectedParams.indexOf(key);
        let selectedParams1 = [...selectedParams];
        let selRecords = [...selectedRecords];

        if (pos === -1) {
            selectedParams1.push(key);
            selRecords.push(record);
        } else {
            selectedParams1.splice(pos, 1);
            selRecords.splice(pos, 1);
        }
        setSelectionParams(selectedParams1);
        setSelectedRecords(selRecords);
    }

    const addDeviceParams = (item) => {
        props.addDeviceparameterList(item);
    }

    const columns = [
        {
            key: 'Id',
            dataIndex: "check",
            render: (text, record) => {
                return <Checkbox name={record.orderId} checked={selectedParams.indexOf(record.key) > -1 ? 1 : 0} onChange={onCheckboxToggle.bind(this, record)} />;
            }
        },
        // {
        //     title: <div>Serial No</div>,
        //     dataIndex: "Id",
        //     render: (text, record) => {
        //         return <div className="textCenter">{record.key + 1}</div>;
        //     }
        // },
        {
            title: 'Description of Parameter',
            dataIndex: 'Description',
            width: '35%',
            editable: true,
        },
        {
            title: 'System Tag Name',
            dataIndex: 'SystemTagName',
            width: '10%',
            editable: true,
        },
        {
            title: 'Gr1',
            dataIndex: 'Gr1',
            width: '10%',
            editable: true,
        },
        {
            title: 'Gr2',
            dataIndex: 'Gr2',
            width: '10%',
            editable: true,
        },
        // {
        //     title: 'Item',
        //     dataIndex: 'Item',
        //     width: '10%',
        //     editable: true,
        // },
        {
            title: 'Type',
            dataIndex: 'Type',
            width: '10%',
            editable: true,
        },
        {
            title: 'Unit',
            dataIndex: 'Unit',
            width: '10%',
            editable: true,
        },
        // {
        //     title: 'Scale',
        //     dataIndex: 'Scale',
        //     width: '10%',
        //     editable: true,
        // },
        // {
        //     title: 'Base Limit',
        //     dataIndex: 'Base Limit',
        //     width: '10%',
        //     editable: true,
        // },
        // {
        //     title: 'High Limit',
        //     dataIndex: 'High Limit',
        //     width: '10%',
        //     editable: true,
        // },
        // {
        //     title: 'Default Value',
        //     dataIndex: 'Default Value',
        //     width: '10%',
        //     editable: true,
        // },
        // {
        //     title: 'OPC PLC',
        //     dataIndex: 'OPC PLC',
        //     width: '10%',
        //     editable: true,
        // },
        // {
        //     title: 'OPC Item',
        //     dataIndex: 'OPC Item',
        //     width: '10%',
        //     editable: true,
        // },
        // {
        //     title: 'Node',
        //     dataIndex: 'Node',
        //     width: '10%',
        //     editable: true,
        // },
        {
            title: 'Comments',
            dataIndex: 'Comments',
            width: '10%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            fixed: "right",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                        <span>
                            <a href="javascript:;" onClick={() => save(record.key)} style={{ marginRight: 8 }} > Save </a>
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <>
                            <a disabled={editingKey !== ''} onClick={() => edit(record)}> Edit </a>
                            <a onClick={() => deleteRecord(record)}> Delete </a>
                        </>
                );
            },
        },
    ];
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
        ...col,
        onCell: record => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
        };
    });

    return (
        <>
            <Row style={{ paddingBottom: '1rem' }}>
                <Col span={18} style={{ color: 'red', fontWeight: 'bold', 'alignItems': 'center' }} >Device Parameter list</Col>
                <Col span={6}>
                    <Button type='primary' onClick={() => setOpen(true)}>Add Device Parameter</Button>
                </Col>
            </Row>
            <Form form={form} component={false}>
                <Table scroll={{ x: true }} size='small'
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered dataSource={data} columns={mergedColumns} rowClassName="editable-row"
                    pagination={false}
                    //     onChange: cancel,
                    // }}
                />
            </Form>
            <Modal
                centered={true}
                title='Device Parameter'
                visible={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <DeviceParameter data={data} addDeviceParams={addDeviceParams} setData={setData} closeModal={() => setOpen(false)} />
            </Modal>
        </>
    );
};

class DeviceParameter extends Component {
    constructor() {
        super();
        this.state = {
            'Description of Parameter': '',
            'System Tag Name': '',
            'Gr1': '',
            'Gr2': '',
            // 'Item': '',
            'Type': '',
            'Unit': '',
            // 'Scale': '',
            // 'Base Limit': '',
            // 'High Limit': '',
            // 'Default Value': '',
            // 'OPC PLC': '',
            // 'OPC Item': '',
            // 'OPCServer': '',
            // 'Node': '',
            'Comments': ''
        }
    }

    updateDesc = (e) => {
        this.setState({ 'Description of Parameter': e.target.value });
    }
    updateTagname = (e) => {
        this.setState({'System Tag Name': e.target.value });
    }
    updateGr1 = (e) => {
        this.setState({ 'Gr1': e.target.value });
    }
    updateGr2 = (e) => {
        this.setState({ 'Gr2': e.target.value });
    }
    // updateItem = (e) => {
    //     this.setState({ 'Item': e.target.value });
    // }
    updateType = (e) => {
        this.setState({ 'Type': e.target.value });
    }
    updateUnit = (e) => {
        this.setState({ Unit: e.target.value });
    }
    updateScale = (e) => {
        this.setState({ Scale: e.target.value });
    }
    // updateBaseLimit = (e) => {
    //     this.setState({ 'Base Limit': e.target.value });
    // }
    // updateHignLimit = (e) => {
    //     this.setState({ 'High Limit': e.target.value });
    // }
    // updateDefaultValue = (e) => {
    //     this.setState({ 'Default Value': e.target.value });
    // }
    // updateOpcPlc = (e) => {
    //     this.setState({ 'OPC PLC': e.target.value });
    // }
    // updateOpcItem = (e) => {
    //     this.setState({ 'OPC Item': e.target.value });
    // }
    // updateOpcServer = (e) => {
    //     this.setState({ 'OPCServer': e.target.value });
    // }
    // updateNode = (e) => {
    //     this.setState({ Node: e.target.value });
    // }
    updateComments = (e) => {
        this.setState({ Comments: e.target.value });
    }

    addDeviceParam = () => {
        // let parentThis = this.props.self;
        // let parentThis = this.props.self;
        let newItem = {...this.state};
        this.props.addDeviceParams(newItem);

        // let data = [...this.props.data];
        // newItem['key'] = data.length;
        // data.push(newItem);
        this.props.closeModal();
        // this.props.setData(data);
    }

    render(){
       
        return(
            <>
                <div className="UpdateUserDetails">
                    <Row>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Description of Parameter</Col>
                                <Col span={14}><Input placeholder="Description of Parameter" onChange={this.updateDesc} value={this.state['Description of Parameter']} /></Col>
                            </Row>
                        </Col>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>System Tag Name</Col>
                                <Col span={14}><Input placeholder="System Tag Name" onChange={this.updateTagname} value={this.state['System Tag Name']} /></Col>
                            </Row>
                        </Col>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Gr1</Col>
                                <Col span={14}><Input placeholder="Gr1" onChange={this.updateGr1} value={this.state['Gr1']} /></Col>
                            </Row>
                        </Col>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Gr2</Col>
                                <Col span={14}><Input placeholder="Gr2" maxlength="10" onChange={this.updateGr2} value={this.state.Gr2} /></Col>
                            </Row>
                        </Col>
                        {/* <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Item</Col>
                                <Col span={14}><Input placeholder="Update Item" onChange={this.updateItem} value={this.state.Item} /></Col>
                            </Row>
                        </Col> */}
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Type</Col>
                                <Col span={14}><Input placeholder="Type" onChange={this.updateType} value={this.state.Type} /></Col>
                            </Row>
                        </Col>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Unit</Col>
                                <Col span={14}><Input placeholder="Update Unit" onChange={this.updateUnit} value={this.state.Unit} /></Col>
                            </Row>
                        </Col>
                        {/* <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Scale</Col>
                                <Col span={14}><Input placeholder="Scale" onChange={this.updateScale} value={this.state.Scale} /></Col>
                            </Row>
                        </Col>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Base Limit</Col>
                                <Col span={14}><Input placeholder="Base Limit" onChange={this.updateBaseLimit} value={this.state['Base Limit']} /></Col>
                            </Row>
                        </Col>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Hign Limit</Col>
                                <Col span={14}><Input placeholder="Hign Limit" onChange={this.updateHignLimit} value={this.state['High Limit']} /></Col>
                            </Row>
                        </Col> */}
                        {/* <Col span={24} className="?assignCol">
                            <Row>
                                <Col span={10}>Default value</Col>
                                <Col span={14}><Input placeholder="Default value" onChange={this.updateDefaultValue} value={this.state['Default Value']} /></Col>
                            </Row>
                        </Col>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>OPC PLC</Col>
                                <Col span={14}><Input placeholder="OPC PLC" onChange={this.updateOpcPlc} value={this.state['OPC PLC']} /></Col>
                            </Row>
                        </Col>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>OPC Item</Col>
                                <Col span={14}><Input placeholder="OPC Item" onChange={this.updateOpcItem} value={this.state['OPC Item']} /></Col>
                            </Row>
                        </Col>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>OPC Server</Col>
                                <Col span={14}><Input placeholder="OPC Server" onChange={this.updateOpcServer} value={this.state.OPCServer} /></Col>
                            </Row>
                        </Col>
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Node</Col>
                                <Col span={14}><Input placeholder="Node" onChange={this.updateNode} value={this.state.Node} /></Col>
                            </Row>
                        </Col> */}
                        <Col span={24} className="assignCol">
                            <Row>
                                <Col span={10}>Comments</Col>
                                <Col span={14}><Input placeholder="Comments" onChange={this.updateComments} value={this.state.Comments} /></Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div style={{'display': 'flex', 'justifyContent': 'flex-end', marginTop: '5px'}}>
                    <Button type='danger' onClick={this.addDeviceParam} >Add</Button>
                </div>
            </>
        );
    }
}
export default EditableTable;