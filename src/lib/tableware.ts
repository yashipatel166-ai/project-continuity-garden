export type Category = "Plates" | "Meal Trays" | "Clamshells" | "Bowls";
export type Product = {
  name: string;
  category: Category;
  image: string;
  qty: string;
  weight: string;
  container: string;
  unbleached?: boolean;
};

const R = "On request";
const p = (name: string, category: Category, img: string, qty: string, weight: string, container: string, unbleached = false): Product => ({
  name, category, image: `/tableware/${img}.jpg`, qty, weight, container, unbleached,
});

export const CATEGORIES: Category[] = ["Plates", "Meal Trays", "Clamshells", "Bowls"];

export const PRODUCTS: Product[] = [
  p('7" Round Plate', "Plates", "plain-round-plate", "1500", "9 gram", "1029"),
  p('9" Round Plate', "Plates", "white-plate-stack", "500", "14 gram", "1925"),
  p('9" 3CP Round Plate', "Plates", "3cp-round-plate", "500", "14 gram", "2275"),
  p('10" Round Plate', "Plates", "white-plate-large", "500", "19 gram", "1596"),
  p('10" 3CP Round Plate', "Plates", "plate-3cp-angle", "500", "20 gram", "1596"),
  p('12" Round Plate', "Plates", "plate-12", "500", "26 gram", "972"),
  p("3CP Meal Tray", "Meal Trays", "tray-3cp", R, R, R),
  p("4CP Meal Tray", "Meal Trays", "tray-4cp", "500", "30 gram", "1565"),
  p("5CP Meal Tray", "Meal Trays", "meal-tray", "500", "36 gram", "1380"),
  p("6CP Meal Tray", "Meal Trays", "tray-6cp", "300", "38 gram", "1190"),
  p("9CP Meal Tray", "Meal Trays", "tray-9cp", "200", "58 gram", "1164"),
  p("2CP Chips Tray", "Meal Trays", "tray-2d", "2400", "11 gram", "869"),
  p("6×6 Clamshell", "Clamshells", "clamshell-small-closed", "500", "22 gram", "1596"),
  p("8×8 Clamshell", "Clamshells", "clamshell", "500", "35 gram", "1796"),
  p("8×8 3CP Clamshell", "Clamshells", "3cp-clamshell", "200", "38 gram", "1769"),
  p("9×6 Clamshell", "Clamshells", "clamshell-rect-open", "250", "30 gram", "1575"),
  p("9×9 Clamshell", "Clamshells", "clamshell-9x9", R, R, R),
  p("9×9 3CP Clamshell", "Clamshells", "3cp-clamshell-top", "200", "44 gram", "1430"),
  p("6 oz Bowl · 180 ml", "Bowls", "white-bowl-small", "1000", "4.5 gram", "2928"),
  p("8 oz Bowl · 240 ml", "Bowls", "soup-bowl", "1000", "7 gram", "1380"),
  p("12 oz Bowl · 350 ml", "Bowls", "white-bowl-stack", "1000", "8 gram", "1120"),
  p("24 oz Bowl · 750 ml", "Bowls", "nat-bowl-a", "600", "20 gram", "850", true),
  p("32 oz Bowl · 1000 ml", "Bowls", "nat-bowl-b", "600", "20 gram", "850", true),
];
