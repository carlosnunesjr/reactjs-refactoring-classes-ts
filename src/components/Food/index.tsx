import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../services/api";

interface FoodInput {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface FoodProps {
  available?: boolean;
  food: FoodInput;
  handleEditFood: (food: FoodInput) => void;
  handleDelete: (foodId: number) => void;
}

export function Food({
  available,
  food,
  handleEditFood,
  handleDelete
}: FoodProps) {
  const [state, setState] = useState<boolean>(available ?? false);

  const toggleAvailable = async () => {
    const isAvailable = state;

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable
    });

    setState(!isAvailable);
  };

  const setEditingFood = () => {
    console.log("setEditingFood", food);
    handleEditFood(food);
  };

  return (
    <Container available={state}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{state ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={state}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
