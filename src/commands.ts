import { AppError } from "./app.error";
import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  if (args) {
    console.log(`The "list" command doesn't need any arguments!`);
    return;
  }
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}

export async function details(store: Store<RecipeType[]>, input: string[]) {
  if (typeof parseInt(input[0]) !== 'number') {
    throw new AppError()
  }
  const id = parseInt(input[0]);
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const searchedRecipe = recipes.find((item) => {item.id === id});

  console.log(`Your recipe:\nID: ${searchedRecipe?.id}\nName: ${searchedRecipe?.name}`);
}