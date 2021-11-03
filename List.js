"use strict";var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};return __assign.apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:true});var jsx_runtime_1=require("react/jsx-runtime");require("./responsivelist.css");var ListRow=function(props){var header=props.header,tableData=props.tableData;return(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,jsx_runtime_1.jsx)("dt",{children:header.name},void 0),(0,jsx_runtime_1.jsx)("dd",{children:tableData[header.key]},void 0)]},void 0)};var List=function(props){var headers=props.headers,tableData=props.tableData,isResponsiveListAlwaysShow=props.isResponsiveListAlwaysShow;return(0,jsx_runtime_1.jsx)("div",__assign({"data-sort-responsive-list":true,"data-sort-responsive-list-always-show":isResponsiveListAlwaysShow},{children:tableData.map(function(row){return(0,jsx_runtime_1.jsx)("dl",{children:headers.map(function(header){return(0,jsx_runtime_1.jsx)(ListRow,{header:header,tableData:row},header.key)})},row.id)})}),void 0)};exports.default=List;