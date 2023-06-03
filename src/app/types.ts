export type ButtonEvent = (e: React.MouseEvent<HTMLButtonElement>) => void;

export type Ingredient = {
    name: string,
    measurement: string
};

export interface User {
    firstName: string,
    lastName: string,
    recipes: Recipe[],
    shuffledRecipes: Recipe[],
    _id: string
}

export interface GuestRecipe {
    name: string,
    description?: string,
    ingredients: Ingredient[],
    steps: {value: string}[],
    
};

export interface Recipe extends GuestRecipe {
    _id: string
};

type AddField = () => void;

type RemoveField = (i: number) => void;

type RecipeIngredientChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => void

export type RecipeFormProps = {
    ingredientValues: Ingredient[],
    recipeValues: {value: string}[],
    handleIngredientChange: RecipeIngredientChange,
    handleRecipeChange: RecipeIngredientChange,
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addIngredientFields: AddField,
    addRecipeFields: AddField,
    removeIngredientFields: RemoveField,
    removeRecipeFields: RemoveField,
    submit: () => void
}

export type IngredientInputProps = {
    number: number,
    value: Ingredient
    onChange: RecipeIngredientChange,
    removeField: RemoveField,
    addField: AddField
}

export type RecipeInputProps = {
    number: number,
    value: string,
    onChange: RecipeIngredientChange,
    removeField: RemoveField,
    addField: AddField
}

export type RecipeCardProps = {
    recipeName: string,
    id: string,
    recipeUpdate: ButtonEvent,
    deleteRecipe: ButtonEvent
}