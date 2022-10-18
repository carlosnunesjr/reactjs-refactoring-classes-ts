import { useEffect, useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import { Modal } from "../Modal";
import { Input } from "../Input";

interface FoodInput {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: FoodInput) => Promise<void>;
  editingFood: FoodInput;
}

export function ModalEditFood({
  isOpen,
  setIsOpen,
  handleUpdateFood,
  editingFood
}: ModalEditFoodProps) {
  const formRef = useRef(null);

  const handleSubmit = async (data: FoodInput) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  useEffect(() => {
    console.log("ModalEditFood -> editingFood", editingFood);
  });
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input
          name="image"
          placeholder="Cole o link aqui"
          value={editingFood.image}
        />

        <Input
          name="name"
          placeholder="Ex: Moda Italiana"
          value={editingFood.name}
        />
        <Input name="price" placeholder="Ex: 19.90" value={editingFood.price} />

        <Input
          name="description"
          placeholder="Descrição"
          value={editingFood.description}
        />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
