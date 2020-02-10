const yaml = require("js-yaml")
const fs = require("fs")
const { titleCase } = require("title-case")

let resources = (file => yaml.safeLoad(fs.readFileSync(file)))('./resources.yaml');

// get all of the tags used, sort them

let tags = [...new Set(resources.map(e => e.tags).flat())].sort()


// get a list of resources by tag (duplicate for all tags used in a resource)
let directory = []

tags.forEach(tag => { 
	process.stdout.write(`## ${titleCase(tag)}\n\n`)

	let resourcesByTag = resources.filter(e => e.tags.indexOf(tag) !== -1) 
	
	resourcesByTag.forEach(r => {
		process.stdout.write(`### ${r.organization}\n`)
		process.stdout.write(`Note: ${r.note}\n`)
	})
})


