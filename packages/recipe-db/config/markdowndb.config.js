import { addTitleField } from './fields/add-title.js';
import { addIngredients } from './fields/add-ingredients.js';

export default {
	computedFields: [addTitleField, addIngredients],
};
