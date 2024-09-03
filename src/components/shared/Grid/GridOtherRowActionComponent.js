import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import KTooltip from "../Tooltip";
function GridRowOtherActionComponent(props) {
    let mustShow = true;
    let musDisable = false;
    if (props.action.showField !== undefined) {
        let field = props.action.showField;
        const invert = field.includes("!");
        if (invert) {
            field = field.slice(1);
            mustShow = !props.row.data[field];
        }
        else {
            mustShow = !!props.row.data[field];
        }
    }
    if (props.action.disableField !== undefined) {
        let field = props.action.disableField;
        const invert = field.includes("!");
        if (invert) {
            field = field.slice(1);
            musDisable = props.row.data[field];
        }
        else {
            musDisable = !props.row.data[field];
        }
    }
    return mustShow ? (props.action.descriptions ? (_jsx(KTooltip, { content: props.action.descriptions, trigger: "hover", placement: "bottom", children: _jsx("button", { onClick: (event) => {
                event.stopPropagation();
                props.action.onClick(props.row.data);
            }, disabled: musDisable, className: "disabled:opacity-70 disabled:cursor-not-allowed", children: props.action.icon }) })) : (_jsx("button", { onClick: (event) => {
            event.stopPropagation();
            props.action.onClick(props.row.data);
        }, disabled: musDisable, className: "disabled:opacity-70 disabled:cursor-not-allowed", children: props.action.icon }))) : (_jsx(_Fragment, {}));
}
export default GridRowOtherActionComponent;
