import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Item {
  id: string;
  title: string;
  completed: boolean;
}

interface ItemsContextType {
  items: Item[];
  addItem: (title: string) => void;
  toggleCompleted: (id: string) => void;
  clearCompletedItems: () => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const loadItemsFromStorage = async (): Promise<Item[]> => {
  try {
    const storedItems = await AsyncStorage.getItem("@items");
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (e) {
    console.error("Erro ao carregar dados do AsyncStorage", e);
    return [];
  }
};

const saveItemsToStorage = async (items: Item[]) => {
  try {
    await AsyncStorage.setItem("@items", JSON.stringify(items));
  } catch (e) {
    console.error("Erro ao salvar dados no AsyncStorage", e);
  }
};

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const storedItems = await loadItemsFromStorage();
      setItems(storedItems);
    };
    fetchItems();
  }, []);

  const addItem = (title: string) => {
    const newItem: Item = {
      id: Math.floor(100000000 + Math.random() * 900000000).toString(),
      title,
      completed: false,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    saveItemsToStorage(newItems);
  };

  const toggleCompleted = (id: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems);
    saveItemsToStorage(newItems);
  };

  const clearCompletedItems = () => {
    const newItems = items.filter((item) => !item.completed);
    setItems(newItems);
    saveItemsToStorage(newItems);
  };

  return (
    <ItemsContext.Provider
      value={{ items, addItem, toggleCompleted, clearCompletedItems }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = (): ItemsContextType => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems deve ser usado dentro de um ItemsProvider");
  }
  return context;
};
