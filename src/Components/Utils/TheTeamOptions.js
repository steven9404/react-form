import { rebuildFullOptions } from '../Utils/Help.js'

let fullWellbeingOptions = {
	fieldName: 'school_wellbeing_options',
	prefix: 'Wellbeing options',
	options: [
		'Career Teacher',
		'Extension and Enrichment Coordinator',
		'Extension and Enrichment Program Staff',
		'Student Leadership Coordinator',
		'Uniform Shop',
		'VET/Pathways Coordinator',
		'VET/VCE Coordinator',
		'Integration Aide'
	]
}

let fullAcademicSupportOptions = {
	fieldName: 'school_academic_support_options',
	prefix: 'Academic support options',
	options: [
		'Academic Extension Support Teacher',
		'Classroom Support',
		'Disability Support Aides',
		'Education Support Teachers',
		'Homework Club',
		'Laboratory Assistant',
		'Laboratory Technician',
		'Librarian',
		'Library Support',
		'Literacy & Numeracy Intervention Yr 7',
		'Literacy and Numeracy Specialist',
		'Literacy Support',
		'Mathematician',
		'Numeracy Support',
		'Reading Recovery Teacher',
		'Remedial Support Teacher',
		'Science Support',
		'Teacher Aid',
		'Teacher Librarian',
		"Teachers' Assistant",
		'Teaching Support for Gifted Students',
		'Visual Arts Support',
		'Wood and Metals Technology Support',
		'Year Level Coordinators',
		'Year Level Student Managers'
	]
}

export const theTeamOptions = [
	rebuildFullOptions(fullWellbeingOptions),
	rebuildFullOptions(fullAcademicSupportOptions)
]
