"use strict";var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};return __assign.apply(this,arguments)};var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){if(k2===undefined)k2=k;Object.defineProperty(o,k2,{enumerable:true,get:function(){return m[k]}})}:function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k]});var __setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:true,value:v})}:function(o,v){o["default"]=v});var __importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod)if(k!=="default"&&Object.prototype.hasOwnProperty.call(mod,k))__createBinding(result,mod,k);__setModuleDefault(result,mod);return result};var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:true});exports.sortTableVersion=void 0;var jsx_runtime_1=require("react/jsx-runtime");var react_1=__importDefault(require("react"));var SortIcons_1=__importDefault(require("./SortIcons"));require("./sortTable.css");var TableSummary_1=__importDefault(require("./TableSummary"));var SortDropDown_1=__importDefault(require("./SortDropDown"));var sortUtils_1=require("./sortUtils");var Pagination=react_1.default.lazy(function(){return Promise.resolve().then(function(){return __importStar(require("./Pagination"))})});var Filter=react_1.default.lazy(function(){return Promise.resolve().then(function(){return __importStar(require("./Filter"))})});var Loading=react_1.default.lazy(function(){return Promise.resolve().then(function(){return __importStar(require("./Loading"))})});var List=react_1.default.lazy(function(){return Promise.resolve().then(function(){return __importStar(require("./List"))})});var ResponsiveCss=react_1.default.lazy(function(){return Promise.resolve().then(function(){return __importStar(require("./ResponsiveCss"))})});exports.sortTableVersion=process.env.REACT_APP_VERSION;var SortTable=function(props){var _a,_b;var headers=props.headers,tableData=props.tableData,allDataFilteredMessage=props.allDataFilteredMessage,caption=props.caption,_c=props.initialFilter,initialFilter=_c===void 0?"":_c,initialPage=props.initialPage,initialRowsDisplayed=props.initialRowsDisplayed,initialSort=props.initialSort,initialSortDsc=props.initialSortDsc,isLoadingMessage=props.isLoadingMessage,noDataMessage=props.noDataMessage,viewSteps=props.viewSteps,caseSensitiveFilter=props.caseSensitiveFilter,dangerouslySetInnerHTML=props.dangerouslySetInnerHTML,defaultToAll=props.defaultToAll,emptyCellClassName=props.emptyCellClassName,headerClassName=props.headerClassName,id=props.id,isLoading=props.isLoading,isResponsive=props.isResponsive,isResponsiveList=props.isResponsiveList,showFilter=props.showFilter,showPagination=props.showPagination,sortedCellClass=props.sortedCellClass,tableClassName=props.tableClassName,useFuzzySearch=props.useFuzzySearch,_d=props.onChange,onChange=_d===void 0?function(){}:_d,debounceTimeout=props.debounceTimeout,isResponsiveListAlwaysShow=props.isResponsiveListAlwaysShow,_e=props.maxFuzzyDistance,maxFuzzyDistance=_e===void 0?3:_e;var rowsDisplayed=defaultToAll||!viewSteps?null:viewSteps[0];if(initialRowsDisplayed&&viewSteps){rowsDisplayed=viewSteps.includes(initialRowsDisplayed)?initialRowsDisplayed:rowsDisplayed}var sortTableId=id!==null&&id!==void 0?id:"sortTable";var _f=react_1.default.useState(tableData),tableDisplayRows=_f[0],setTableDisplayRows=_f[1];var _g=react_1.default.useState(""),sortCol=_g[0],setSortCol=_g[1];var _h=react_1.default.useState(true),sortAscending=_h[0],setSortAscending=_h[1];var _j=react_1.default.useState(""),filterValue=_j[0],setFilterValue=_j[1];var _k=react_1.default.useState(rowsDisplayed),maxNumber=_k[0],setMaxNumber=_k[1];var _l=react_1.default.useState(initialPage!==null&&initialPage!==void 0?initialPage:1),activePage=_l[0],setActivePage=_l[1];var filteredRows=react_1.default.useCallback(function(){return tableDisplayRows.filter(function(row){return!row.hide})},[tableDisplayRows]);var numberOfPages=Math.ceil(maxNumber&&maxNumber>0&&filteredRows().length>0?filteredRows().length/maxNumber:1);var sortTableRows=function(col,ascending,initialRows){if(initialRows===void 0){initialRows=tableDisplayRows}var rows=(0,sortUtils_1.sortRows)({rows:initialRows,sortCol:col,sortAscending:ascending});setTableDisplayRows(rows);setSortCol(col);setSortAscending(ascending)};var filterTableRows=function(filter){setTableDisplayRows((0,sortUtils_1.filterRows)({rows:tableDisplayRows,filterValue:filter,caseSensitiveFilter:caseSensitiveFilter,headers:headers,useFuzzySearch:useFuzzySearch,maxFuzzyDistance:maxFuzzyDistance}));setFilterValue(filter)};var startRow=maxNumber?(activePage-1)*maxNumber:1;var noData=noDataMessage!==null&&noDataMessage!==void 0?noDataMessage:(0,jsx_runtime_1.jsx)("p",__assign({"data-sort-no-data-message":true},{children:"No data is available"}),void 0);var allFiltered=allDataFilteredMessage!==null&&allDataFilteredMessage!==void 0?allDataFilteredMessage:(0,jsx_runtime_1.jsx)("p",__assign({"data-sort-all-data-filtered":true},{children:"No data meets filtering criteria"}),void 0);react_1.default.useEffect(function(){var _a;var initialSortColumn=initialSort?headers.find(function(header){return header.key===initialSort}):undefined;if(initialSortColumn){var col_1=(_a=initialSortColumn.sortKey)!==null&&_a!==void 0?_a:initialSortColumn.key;(0,sortUtils_1.sortRows)({rows:tableDisplayRows,sortCol:col_1,sortAscending:!initialSortDsc,onSort:function(sortedRows){setSortCol(col_1);setSortAscending(!initialSortDsc);if(initialFilter&&initialFilter!==""){var fRows=(0,sortUtils_1.filterRows)({rows:sortedRows,filterValue:initialFilter,caseSensitiveFilter:caseSensitiveFilter,headers:headers,useFuzzySearch:useFuzzySearch,maxFuzzyDistance:maxFuzzyDistance});setTableDisplayRows(fRows);setFilterValue(initialFilter)}else{setTableDisplayRows(sortedRows)}}})}},[]);react_1.default.useEffect(function(){onChange({sortedColumn:sortCol,sortedAscending:sortAscending,rowsShown:maxNumber,filter:filterValue,page:activePage,pages:numberOfPages,totalFiltered:filteredRows().length})},[activePage,filterValue,filteredRows,maxNumber,numberOfPages,onChange,sortAscending,sortCol]);var headerButton=function(header){if(header.noSort!==undefined&&header.noSort===true){return header.name}var buttonIconType=header.key===sortCol||header.sortKey===sortCol?header.type:"sortable";var buttonIconColor=buttonIconType==="sortable"?"#ccc":undefined;return(0,jsx_runtime_1.jsxs)("button",__assign({type:"button",onClick:function(){var _a;var col=(_a=header.sortKey)!==null&&_a!==void 0?_a:header.key;var isSortAscending=col!==sortCol||!sortAscending;sortTableRows(col,isSortAscending)},style:{border:"none",padding:"none",background:"none",width:"100%",textAlign:"left"}},{children:[(0,jsx_runtime_1.jsx)(SortIcons_1.default,{sortAsc:sortAscending,type:buttonIconType,color:buttonIconColor},void 0),header.name]}),void 0)};var setAriaSort=function(col){if(col!==sortCol){return undefined}return sortAscending?"ascending":"descending"};var buildHeaders=(0,jsx_runtime_1.jsx)("tr",__assign({"aria-rowindex":showPagination?1:undefined,role:isResponsive&&!isResponsiveList?"row":undefined},{children:headers.map(function(header){return(0,jsx_runtime_1.jsx)("th",__assign({scope:"col","aria-sort":setAriaSort(header.key),style:header.style,className:header.className+" "+(header.key===sortCol||header.sortKey===sortCol?sortedCellClass:""),role:isResponsive&&!isResponsiveList?"columnheader":undefined},{children:headerButton(header)}),header.key)})}),void 0);var buildDataRow=function(rowData){return(0,jsx_runtime_1.jsx)("tr",__assign({"aria-rowindex":showPagination?rowData.rowindex:undefined,role:isResponsive&&!isResponsiveList?"row":undefined},{children:headers.map(function(header){var data=dangerouslySetInnerHTML?(0,jsx_runtime_1.jsx)("span",{dangerouslySetInnerHTML:{__html:rowData[header.key]}},void 0):rowData[header.key];var className=(!data?emptyCellClassName:"")+" "+(header.key===sortCol||header.sortKey===sortCol?sortedCellClass:"");if(header.rowheader){return(0,jsx_runtime_1.jsx)("th",__assign({scope:"row","data-sorttable-data-cell":true,role:isResponsive&&!isResponsiveList?"rowheader":undefined,className:className},{children:data}),""+rowData.id+header.key)}return(0,jsx_runtime_1.jsxs)("td",__assign({"data-sorttable-data-cell":true,role:isResponsive&&!isResponsiveList?"cell":undefined,className:className},{children:[isResponsive&&!isResponsiveList?(0,jsx_runtime_1.jsx)("span",__assign({"aria-hidden":true,"data-responsive-header":true},{children:header.name}),void 0):null,data]}),""+rowData.id+header.key)})}),rowData.id)};var displayRows=function(){return!showPagination||!maxNumber?filteredRows():filteredRows().slice(startRow,startRow+maxNumber)};var buildData=function(){return displayRows().map(function(row){return buildDataRow(row)})};var showNumberInput=function(){return(0,jsx_runtime_1.jsxs)("div",__assign({"data-sort-number-of-inputs":true},{children:["Show",(0,jsx_runtime_1.jsxs)("select",__assign({className:"form-control form-select","aria-label":"Number of items shown",value:maxNumber||"",style:{width:"75px",display:"inline-block",marginLeft:"0.75em",marginRight:"0.75em"},onChange:function(e){var _a;setActivePage(1);setMaxNumber((_a=parseInt(e.target.value,10))!==null&&_a!==void 0?_a:null)}},{children:[viewSteps===null||viewSteps===void 0?void 0:viewSteps.map(function(step){return(0,jsx_runtime_1.jsx)("option",__assign({value:step},{children:step}),step)}),(0,jsx_runtime_1.jsx)("option",__assign({value:""},{children:"All"}),void 0)]}),void 0),"results"]}),void 0)};if(tableDisplayRows.length===0){return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:noData},void 0)}return(0,jsx_runtime_1.jsx)("div",__assign({className:"container-fluid"},{children:(0,jsx_runtime_1.jsxs)(react_1.default.Suspense,__assign({fallback:(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{},void 0)},{children:[isResponsive&&!isResponsiveList?(0,jsx_runtime_1.jsx)(ResponsiveCss,{},void 0):null,(0,jsx_runtime_1.jsxs)("div",__assign({className:"row",style:{marginBottom:showPagination||showFilter?"15px":"0"}},{children:[showPagination?(0,jsx_runtime_1.jsx)("div",__assign({className:"col-sm"},{children:showNumberInput()}),void 0):null,showFilter?(0,jsx_runtime_1.jsx)("div",__assign({className:"col-sm",style:{textAlign:"right"}},{children:(0,jsx_runtime_1.jsx)(Filter,{value:filterValue,onChange:function(a){filterTableRows(a.target.value)},label:"Filter",id:sortTableId,debounceTimeout:debounceTimeout},void 0)}),void 0):null]}),void 0),(0,jsx_runtime_1.jsxs)("div",__assign({className:"row"},{children:[isResponsive||isResponsiveList?(0,jsx_runtime_1.jsx)(SortDropDown_1.default,{headers:headers,selected:sortCol,sortAscending:sortAscending,onChange:function(col,sortAsc){sortTableRows(col,sortAsc)}},void 0):null,(0,jsx_runtime_1.jsxs)("table",__assign({className:"table "+tableClassName,id:sortTableId,"aria-describedby":sortTableId+"RowsShownSummary","aria-rowcount":showPagination||showFilter?tableDisplayRows.length+1:undefined,"data-sort-responsive":(_a=isResponsive&&!isResponsiveList)!==null&&_a!==void 0?_a:undefined,"data-sort-responsive-has-list":isResponsiveList!==null&&isResponsiveList!==void 0?isResponsiveList:undefined,"data-sort-responsive-has-list-always-hide":isResponsiveListAlwaysShow!==null&&isResponsiveListAlwaysShow!==void 0?isResponsiveListAlwaysShow:undefined,role:isResponsive&&!isResponsiveList?"table":undefined},{children:[caption?(0,jsx_runtime_1.jsx)("caption",{children:caption},void 0):null,(0,jsx_runtime_1.jsx)("thead",__assign({className:headerClassName,role:isResponsive&&!isResponsiveList?"rowgroup":undefined},{children:buildHeaders}),void 0),!isLoading?(0,jsx_runtime_1.jsx)("tbody",__assign({role:isResponsive&&!isResponsiveList?"rowgroup":undefined,"data-testid":"sortTableBody"},{children:buildData()}),void 0):null]}),void 0),isResponsiveList?(0,jsx_runtime_1.jsx)(List,{headers:headers,tableData:displayRows(),isResponsiveListAlwaysShow:isResponsiveListAlwaysShow},void 0):null,tableDisplayRows.findIndex(function(row){return!row.hide})===-1?allFiltered:null,isLoading&&!isLoadingMessage?(0,jsx_runtime_1.jsx)(Loading,{},void 0):null,isLoading&&isLoadingMessage?isLoadingMessage:null]}),void 0),(0,jsx_runtime_1.jsxs)("div",__assign({className:"row"},{children:[(0,jsx_runtime_1.jsx)("div",__assign({className:"col-sm",id:sortTableId+"RowsShownSummary","data-pagination-summary":true},{children:!isLoading?(0,jsx_runtime_1.jsx)(TableSummary_1.default,{totalEntries:tableData.length,startRow:maxNumber?startRow+1:0,endRow:maxNumber?startRow+maxNumber:filteredRows().length,filteredTotal:filteredRows().length,sortColumn:(_b=headers.find(function(header){return header.key===sortCol||header.sortKey===sortCol}))===null||_b===void 0?void 0:_b.name,sortDirection:sortAscending?"ascending":"descending"},void 0):null}),void 0),showPagination?(0,jsx_runtime_1.jsx)("div",__assign({className:"col-sm"},{children:(0,jsx_runtime_1.jsx)(Pagination,{numberOfPages:numberOfPages,activePage:activePage,id:sortTableId,onPageChange:function(page){setActivePage(page)}},void 0)}),void 0):null]}),void 0)]}),void 0)}),void 0)};exports.default=SortTable;