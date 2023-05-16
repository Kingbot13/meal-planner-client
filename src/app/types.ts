export type ButtonEvent = (e: React.MouseEvent<HTMLButtonElement>) => void;

export type Ingredient = {
    name: string,
    measurement: string
};

export type Recipe = {
    name: string,
    ingredients: Ingredient[],
    steps: {value: string}[]
};

type addField = () => void;

type removeField = (i: number) => void;

type RecipeIngredientChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => void

export type RecipeFormProps = {
    ingredientValues: Ingredient[],
    recipeValues: {value: string}[],
    handleIngredientChange: RecipeIngredientChange,
    handleRecipeChange: RecipeIngredientChange,
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addIngredientFields: addField,
    addRecipeFields: addField,
    removeIngredientFields: removeField,
    removeRecipeFields: removeField,
    submit: () => void
}

export type IngredientInputProps = {
    number: number,
    value: {name: string, measurement: string}
    onChange: RecipeIngredientChange,
    removeFields: removeField
}