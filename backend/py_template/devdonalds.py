from dataclasses import dataclass
from typing import List, Dict, Union
from flask import Flask, request, jsonify
import re

# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
	name: str

@dataclass
class RequiredItem():
	name: str
	quantity: int

@dataclass
class Recipe(CookbookEntry):
	required_items: List[RequiredItem]

@dataclass
class Ingredient(CookbookEntry):
	cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook = []

# Task 1 helper (don't touch)
@app.route("/parse", methods=['POST'])
def parse():
	data = request.get_json()
	recipe_name = data.get('input', '')
	parsed_name = parse_handwriting(recipe_name)
	if parsed_name is None:
		return 'Invalid recipe name', 400
	return jsonify({'msg': parsed_name}), 200

# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that 
def parse_handwriting(recipeName: str) -> Union[str | None]:
  recipeName = recipeName.replace("-", " ").replace("_", " ")

  cleaned_chars = []
  for char in recipeName:
    if char.isalpha() or char.isspace():
      cleaned_chars.append(char)  
  recipeName = ''.join(cleaned_chars)

  words = recipeName.split()
  recipeName = ' '.join(words)

  recipeName = recipeName.title()

  if not recipeName:
    return None
  
  return recipeName


# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route('/entry', methods=['POST'])
def create_entry():
  data = request.get_json()

  entry_type = data.get('type')
  if entry_type not in ['recipe', 'ingredient']:
    return jsonify({'error': 'Invalid type, must be "recipe" or "ingredient"'}), 400

  if entry_type == 'ingredient':
    name = data.get('name')
    cook_time = data.get('cookTime')

    if not isinstance(cook_time, int) or cook_time < 0:
      return jsonify({'error': 'Invalid cookTime, must be >= 0'}), 400

    if any(entry['name'] == name for entry in cookbook):
      return jsonify({'error': f'Entry with name "{name}" already exists'}), 400

    ingredient = {'type': 'ingredient', 'name': name, 'cookTime': cook_time}
    cookbook.append(ingredient)

  elif entry_type == 'recipe':
    name = data.get('name')
    required_items = data.get('requiredItems')

    if not isinstance(required_items, list):
      return jsonify({'error': 'requiredItems must be a list'}), 400

    item_names = set()
    for item in required_items:
      item_name = item.get('name')
      if item_name in item_names:
        return jsonify({'error': f'Duplicate item name "{item_name}" in requiredItems'}), 400
      item_names.add(item_name)

      if not isinstance(item.get('quantity'), int) or item.get('quantity') <= 0:
        return jsonify({'error': 'Quantity must be a positive integer'}), 400

    if any(entry['name'] == name for entry in cookbook):
      return jsonify({'error': f'Entry with name "{name}" already exists'}), 400

    recipe = {'type': 'recipe', 'name': name, 'requiredItems': required_items}
    cookbook.append(recipe)

  return jsonify({}), 200

# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route('/summary', methods=['GET'])
def summary():
  recipe_name = request.args.get('name')
  
  recipe = next((entry for entry in cookbook if entry['name'] == recipe_name and entry['type'] == 'recipe'), None)
  
  if not recipe:
    return jsonify({'error': 'Recipe not found'}), 400

  def get_base_ingredients_and_time(item: RequiredItem):
    base_ingredients = []
    cook_time = 0

    recipe_item = next((entry for entry in cookbook if entry['name'] == item.name and entry['type'] == 'recipe'), None)
    if recipe_item:
      for req_item in recipe_item['requiredItems']:
        ing, time = get_base_ingredients_and_time(req_item)
        base_ingredients.extend(ing)
        cook_time += time * req_item.quantity

    else:
      ingredient_item = next((entry for entry in cookbook if entry['name'] == item.name and entry['type'] == 'ingredient'), None)
      if ingredient_item:
        base_ingredients.append({
          'name': item.name,
          'quantity': item.quantity
        })
        cook_time += ingredient_item['cookTime'] * item.quantity
      else:
        raise ValueError(f"Ingredient or recipe '{item.name}' not found.")
    
    return base_ingredients, cook_time

  all_ingredients = []
  total_cook_time = 0
  for required_item in recipe['requiredItems']:
    ingredients, time = get_base_ingredients_and_time(required_item)
    all_ingredients.extend(ingredients)
    total_cook_time += time

  return jsonify({
    'name': recipe_name,
    'cookTime': total_cook_time,
    'ingredients': all_ingredients
  }), 200


# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == '__main__':
	app.run(debug=True, port=8080)
