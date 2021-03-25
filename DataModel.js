class DataModel {
	constructor() {}
}

let theDataModel = undefined;

export function getDataModel() {
	if (!theDataModel) {
		theDataModel = new DataModel();
	}
	return theDataModel;
}
