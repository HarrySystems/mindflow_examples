require("mindflow_suite")

MindFlow.node({
	// what it is
	about: {
		name: "increase",
		description: "Increade"
	},
	
	format: {
		input:[
			{
				name: "variable",
				description: "variable name to be increased",
				required: true
			},
			{
				name: "step",
				description: "",
				default: 1,
				required: false
			}
		]
	},
	
	// what it executes
	execute: function({ data, input }) {
		input = Object.assign(
			{
				step: 1
			},
			input
		)
		
		data[input.variable] += input.step;
		
		return data
	}
})

MindFlow.execute({
	node: 'pipeline',
	input: {
		steps: [
			{
				node: 'input',
				data: {
					value: 0
				}
			},
			{
				node: 'increase',
				input: {
					variable: "value"
				}
			},
			{
				node: 'input',
				data: {
					value2: 5
				}
			},
			{
				node: 'log'
			},
			{
				node: 'log',
				input: {
					beautify: true
				}
			},
			{
				node: 'increase',
				input: {
					variable: "value"
				}
			},
			{
				node: 'increase',
				input: {
					variable: "value"
				}
			},
			{
				node: 'increase',
				input: {
					variable: "value2"
				}
			},
			{
				node: 'log',
				input: {
					beautify: true
				}
			},
		]
	}
})
