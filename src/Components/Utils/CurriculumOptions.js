import { rebuildFullOptions } from '../Utils/Help.js'

let fullVocalOptions = {
	fieldName: 'school_vocal_options',
	prefix: 'Vocal Options',
	options: [
		'A Capella Singers',
		'Chapel Choir',
		'Choirs',
		'Gospel Singing Group',
		'Vocal'
	]
}

let fullInstrumentOptions = {
	fieldName: 'school_instrument_options',
	prefix: 'Instrument Options',
	options: [
		'Brass',
		'Cello',
		'Clarinet',
		'Drum',
		'Flute',
		'Guitar',
		'Percussion',
		'Piano',
		'Saxophone',
		'String',
		'Violin',
		'Woodwind',
		'Oboe',
		'Double Bass',
		'French Horn',
		'Trombone',
		'Trumpet',
		'Tuba'
	]
}

export const musicOptions = [
	rebuildFullOptions(fullVocalOptions),
	rebuildFullOptions(fullInstrumentOptions)
]
