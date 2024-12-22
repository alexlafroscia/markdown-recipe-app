import { addFullAST } from './fields/add-full-ast.js';
import { addTitleField } from './fields/add-title.js';
import { addIngredients } from './fields/add-ingredients.js';

export default {
	computedFields: [addFullAST, addTitleField, addIngredients],
};
