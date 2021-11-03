"use strict";var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};return __assign.apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:true});var jsx_runtime_1=require("react/jsx-runtime");var react_debounce_input_1=require("react-debounce-input");var Filter=function(props){var label=props.label,onChange=props.onChange,value=props.value,id=props.id,_a=props.debounceTimeout,debounceTimeout=_a===void 0?200:_a;return(0,jsx_runtime_1.jsx)("div",__assign({className:"form-inline justify-content-end","data-filter":true},{children:(0,jsx_runtime_1.jsxs)("div",__assign({className:"form-group"},{children:[(0,jsx_runtime_1.jsx)("label",__assign({htmlFor:id+"FilterInput"},{children:label}),void 0),(0,jsx_runtime_1.jsx)(react_debounce_input_1.DebounceInput,{style:{marginLeft:"0.75em",display:"inline-block",width:"250px"},id:id+"FilterInput",className:"form-control",onChange:function(event){return onChange(event)},value:value,debounceTimeout:debounceTimeout,"data-filter-input":true},void 0)]}),void 0)}),void 0)};exports.default=Filter;