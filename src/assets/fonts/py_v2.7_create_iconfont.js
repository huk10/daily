var map = {
	"comment": "58880",
	"share": "58912",
	"add": "58952",
	"info": "59584",
	"list-more": "58957",
	"home": "59118",
	"append": "59279",
	"good": "58897",
	"stars": "58904",
	"list-row": "58937",
	"download": "58938",
	"return": "58908",
};
;module.exports = ( name ) => String.fromCharCode( map[ name ] );
;module.exports.map = map;
