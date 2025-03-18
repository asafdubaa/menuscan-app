import React, { createContext, useState, useContext } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './AuthContext';
import { Alert } from 'react-native';

type CategoryType = {
  id: string;
  name: string;
  menu_items?: MenuItemType[];
};

type MenuItemType = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category_id?: string;
};

type MenuItem = {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  category_id?: string;
};

type Menu = {
  id?: string;
  title: string;
  restaurant_name?: string;
  restaurant_location?: string;
  restaurant_phone?: string;
  restaurant_logo_url?: string;
  items: MenuItem[];
  categories: string[];
};

type MenuContextType = {
  currentMenu: Menu | null;
  savedMenus: Menu[];
  setCurrentMenu: React.Dispatch<React.SetStateAction<Menu | null>>;
  saveMenu: () => Promise<string | undefined>;
  loadSavedMenus: () => Promise<void>;
  loadMenu: (id: string) => Promise<void>;
  deleteSelectedMenu: (id: string) => Promise<void>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);
  const [savedMenus, setSavedMenus] = useState<Menu[]>([]);
  const { user } = useAuth();

  const saveMenu = async () => {
    if (!currentMenu || !user) {
      console.log("Cannot save: No current menu or user");
      return;
    }

    try {
      console.log("Saving menu:", currentMenu.title);
      let menuId = currentMenu.id;

      // If we have an existing menu, update it
      if (menuId) {
        console.log("Updating existing menu:", menuId);
        const { error } = await supabase
          .from('menus')
          .update({
            title: currentMenu.title,
            restaurant_name: currentMenu.restaurant_name,
            restaurant_location: currentMenu.restaurant_location,
            restaurant_phone: currentMenu.restaurant_phone,
            restaurant_logo_url: currentMenu.restaurant_logo_url,
            updated_at: new Date(),
          })
          .eq('id', menuId);

        if (error) {
          console.error("Error updating menu:", error);
          throw error;
        }
      } 
      // Otherwise create a new menu
      else {
        console.log("Creating new menu");
        const { data, error } = await supabase
          .from('menus')
          .insert({
            user_id: user.id,
            title: currentMenu.title,
            restaurant_name: currentMenu.restaurant_name,
            restaurant_location: currentMenu.restaurant_location,
            restaurant_phone: currentMenu.restaurant_phone,
            restaurant_logo_url: currentMenu.restaurant_logo_url,
          })
          .select();

        if (error) {
          console.error("Error creating menu:", error);
          throw error;
        }
        
        if (data && data.length > 0) {
          menuId = data[0].id;
          console.log("New menu created with ID:", menuId);
        }
      }

      console.log("Menu saved successfully:", menuId);
      return menuId;
    } catch (error: any) {
      console.error('Error saving menu:', error.message);
      Alert.alert("Error", "Failed to save menu. Please try again.");
      throw error;
    }
  };

  const loadSavedMenus = async () => {
    if (!user) {
      console.log("Cannot load menus: No user logged in");
      return;
    }

    try {
      console.log("Loading menus for user:", user.id);
      const { data, error } = await supabase
        .from('menus')
        .select(`
          *,
          menu_categories (
            *,
            menu_items (*)
          )
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error("Error loading menus:", error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} menus`);
      
      // Transform data to match our Menu type
      const menus = (data || []).map((menu: any) => {
        const categories = menu.menu_categories || [];
        const items = categories.flatMap((cat: CategoryType) => cat.menu_items || []);
        
        return {
          id: menu.id,
          title: menu.title,
          restaurant_name: menu.restaurant_name,
          restaurant_location: menu.restaurant_location,
          restaurant_phone: menu.restaurant_phone,
          restaurant_logo_url: menu.restaurant_logo_url,
          categories: categories.map((cat: CategoryType) => cat.name),
          items: items.map((item: MenuItemType) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            category_id: item.category_id,
          })),
        };
      });

      setSavedMenus(menus);
    } catch (error: any) {
      console.error('Error loading menus:', error.message);
      Alert.alert("Error", "Failed to load menus. Please try again.");
      throw error;
    }
  };

  const loadMenu = async (id: string) => {
    try {
      console.log("Loading menu with ID:", id);
      const { data, error } = await supabase
        .from('menus')
        .select(`
          *,
          menu_categories (
            *,
            menu_items (*)
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error loading menu:", error);
        throw error;
      }

      const categories = data.menu_categories || [];
      const items = categories.flatMap((cat: CategoryType) => cat.menu_items || []);
      
      const loadedMenu = {
        id: data.id,
        title: data.title,
        restaurant_name: data.restaurant_name,
        restaurant_location: data.restaurant_location,
        restaurant_phone: data.restaurant_phone,
        restaurant_logo_url: data.restaurant_logo_url,
        categories: categories.map((cat: CategoryType) => cat.name),
        items: items.map((item: MenuItemType) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          category_id: item.category_id,
        })),
      };

      console.log("Menu loaded successfully");
      setCurrentMenu(loadedMenu);
    } catch (error: any) {
      console.error('Error loading menu:', error.message);
      Alert.alert("Error", "Failed to load menu. Please try again.");
      throw error;
    }
  };

  const deleteSelectedMenu = async (id: string) => {
    try {
      console.log("Deleting menu with ID:", id);
      const { error } = await supabase
        .from('menus')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting menu:", error);
        throw error;
      }
      
      // Update local state
      setSavedMenus(savedMenus.filter(menu => menu.id !== id));
      console.log("Menu deleted successfully");
    } catch (error: any) {
      console.error('Error deleting menu:', error.message);
      Alert.alert("Error", "Failed to delete menu. Please try again.");
      throw error;
    }
  };

  return (
    <MenuContext.Provider
      value={{
        currentMenu,
        savedMenus,
        setCurrentMenu,
        saveMenu,
        loadSavedMenus,
        loadMenu,
        deleteSelectedMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}; 