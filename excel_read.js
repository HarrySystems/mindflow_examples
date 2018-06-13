require("../mindflow")

module.exports = MindFlow.node({
	about: {
		name: "excel_read",
		description: `
			open an excel file
			validate columns and convert to a json file
		`
	},
	
	format: {
		input: [
			{
				name: "input_file",
				description: "File path to the xls",
				type: "string"
				required: true
			},
			{
				name: "output_file",
				description: "File path to the json",
				type: "string"
				required: true
			},
			{
				name: "fields",
				type: "array",
				required: false
			},
			{
				name: "parser",
				type: "string",
				required: true
			},
			{
				name: "stringifier",
				type: "string",
				required: true
			},
			{
				name: "spreadsheet",
				description: ""
				type: "string",
				required: false
			}
		],
		output: [
		]
	}
	
	execute: {
		node: "pipeline",
		
		input: {
			steps: [
				{
					execute: {
						node: "extract",
						input: {
							type: "file",
							path: function({ data, input }) {
								return input.input_file
							}
						}
					}
				},
				{
					about: {
						name: "parse file.xls",
						description: ""
					},
					execute: {
						node: "parse",
						input: {
							type: function({ data, input }) {
								return input.parser
							}
						}
					}
				},
				{
					about: {
						name: "get plan1",
						description: ""
					},
					execute: {
						node: "transform",
						input: {
							callback: function({ data, input }) {
								return data[input.parser]
							}
						}	
					}
				},
				{
					about: {
						name: "validate columns",
						description: "check if the file contains "
					},
					execute: {
						node: "validate",
						input: {
							type: "columns",
							names: function({ data, input }) {
								return input.fields
							} 
						}
					}
				},
				{
					about: {
						name: "convert data to json",
						description: "",
					},
					execute: {
						node: "stringify",
						input: {
							type: function({ data, input }) {
								return input.stringifier
							}
						}
					}
				},
				{
					about: {
						name: "convert data to json",
						description: "",
					},
					execute: {
						node: "load",
						input: {
							type: "file",
							path: function({ data, input }) {
								return input.output_file
							}
						}
					}
				}
			]
		}
	}
})

// execute
MindFlow.execute({
		node: "excel_read",
		input: {
			input_file: "./file.xls",
			output_file: "./file.json",
			fields: [
				"test",
				"b",
				"c"
			],
			parser: "xls",
			stringifier: "json",
			spreadsheet: "plan1"
		}
	})
